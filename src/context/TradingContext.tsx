import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  AccountTier,
  UserAccountState,
  TradePosition,
  PaymentTransaction,
  ReferralLead,
  SubIBAccount,
  MarketTicker,
  ClosedTrade,
  BotLogItem
} from '../types';
import { SAMPLE_REFERRAL_LEADS, INITIAL_IB_TREE_STRUCTURE, INITIAL_TICKERS } from '../data/marketData';

interface TradingContextType {
  user: UserAccountState;
  isLoggedIn: boolean;
  tickers: MarketTicker[];
  positions: TradePosition[];
  tradeHistory: ClosedTrade[];
  transactions: PaymentTransaction[];
  referrals: ReferralLead[];
  ibTree: SubIBAccount[];
  copiedMasters: string[];
  deployedBots: string[];
  botActive: boolean;
  botLogs: BotLogItem[];
  botRiskMode: 'Conservative' | 'Balanced' | 'Aggressive';
  totalFloatingPnl: number;
  totalNetworkFund: number;
  totalNetworkAccounts: number;
  totalNetworkLots: number;
  login: (identifier: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  registerUser: (info: Partial<UserAccountState>) => void;
  addSubIBNode: (newNode: Omit<SubIBAccount, 'id'>, parentNodeId?: string) => void;
  deleteSubIBNode: (nodeId: string) => void;
  updateSubIBFund: (nodeId: string, addedFund: number) => void;
  simulateClientTradeVolume: (lots: number) => { rebateEarned: number };
  openTrade: (symbol: string, type: 'BUY' | 'SELL', lots: number, openPrice?: number, stopLoss?: number, takeProfit?: number) => void;
  closeTrade: (id: string, currentPrice?: number) => void;
  closeAllPositions: () => void;
  depositFunds: (amount: number, method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire', txnHash?: string) => void;
  withdrawFunds: (amount: number, method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire', destination?: string) => boolean;
  claimIBCommission: (amount: number, target: 'balance' | 'withdraw') => boolean;
  setBotActive: (active: boolean) => void;
  setBotRiskMode: (mode: 'Conservative' | 'Balanced' | 'Aggressive') => void;
  triggerManualBotTrade: () => void;
  addReferralLead: (lead: Omit<ReferralLead, 'id' | 'commissionEarned' | 'joinDate'>) => void;
  copyTrader: (masterId: string, allocationAmount: number) => void;
  toggleBotDeployment: (botId: string) => void;
  updateUserCredentials: (info: Partial<UserAccountState>) => void;
  resetAccount: () => void;
}

const DEFAULT_USER: UserAccountState = {
  fullName: 'Rajesh Kumar',
  email: 'rajesh@nexusfx.trade',
  phone: '+91 98765 43210',
  accountMode: 'real',
  accountTier: 'vip',
  mt5Login: '7098421',
  mt5Server: 'NexusFX-Live01',
  mt5Pass: 'Nx#9821!',
  balance: 25400.0,
  equity: 25400.0,
  leverage: '1:1000',
  referralCode: 'IB-RAJESH88',
  sponsorIBCode: 'IB-GLOBAL-MASTER01',
  ibEarnings: 18450.0
};

const DEFAULT_TRANSACTIONS: PaymentTransaction[] = [
  { id: 'tx-1', type: 'deposit', method: 'UPI', amount: 5000, status: 'Completed', date: '2026-08-10', txnHash: 'UPI/629014820192' },
  { id: 'tx-2', type: 'deposit', method: 'USDT', amount: 5000, status: 'Completed', date: '2026-08-01', txnHash: '0x8f2a...e91d' },
];

const INITIAL_TRADE_HISTORY: ClosedTrade[] = [
  { id: 'h-1', ticket: '#28845', symbol: 'XAUUSD', type: 'BUY', lots: 0.10, openPrice: 2365.20, closePrice: 2374.50, profit: 93.00, openTime: '12:10:05', closeTime: '13:45:20', source: 'MANUAL', reason: 'TP' },
  { id: 'h-2', ticket: '#28844', symbol: 'BOOM_100', type: 'BUY', lots: 0.10, openPrice: 8356.00, closePrice: 8420.50, profit: 64.50, openTime: '10:05:12', closeTime: '11:22:45', source: 'BOT', reason: 'TS_TRAIL' },
  { id: 'h-3', ticket: '#28843', symbol: 'EURUSD', type: 'BUY', lots: 0.50, openPrice: 1.0820, closePrice: 1.0842, profit: 110.00, openTime: '08:30:00', closeTime: '10:15:30', source: 'MANUAL', reason: 'TP' },
  { id: 'h-4', ticket: '#28842', symbol: 'BOOM_100', type: 'SELL', lots: 0.10, openPrice: 8398.00, closePrice: 8380.50, profit: 17.50, openTime: '07:15:00', closeTime: '08:02:10', source: 'BOT', reason: 'FLIP_SELL' },
  { id: 'h-5', ticket: '#28841', symbol: 'BTCUSD', type: 'BUY', lots: 0.05, openPrice: 66800.00, closePrice: 67420.00, profit: 31.00, openTime: 'Yesterday', closeTime: 'Yesterday', source: 'MANUAL', reason: 'TP' },
];

const INITIAL_BOT_LOGS: BotLogItem[] = [
  { id: 'log-1', timestamp: '14:32:05', type: 'scan', message: 'Algorithm scanning BOOM_100 & XAUUSD volatility channels...', symbol: 'BOOM_100' },
  { id: 'log-2', timestamp: '14:30:18', type: 'profit', message: 'Trailing Stop hit on BOOM_100. Trade closed with profit.', symbol: 'BOOM_100', profit: 48.50 },
  { id: 'log-3', timestamp: '14:26:40', type: 'trade', message: 'Signal: BUY 0.10 lots BOOM_100 at 8,372.00 (RSI Overbought Pullback)', symbol: 'BOOM_100' },
  { id: 'log-4', timestamp: '14:20:10', type: 'info', message: 'Dynamic Slippage Guard verified: 0.08 pips latency < 4ms' }
];

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_is_logged_in');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [user, setUser] = useState<UserAccountState>(() => {
    const saved = localStorage.getItem('nexus_user_account');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [accountsRegistry, setAccountsRegistry] = useState<UserAccountState[]>(() => {
    const saved = localStorage.getItem('nexus_accounts_registry');
    return saved ? JSON.parse(saved) : [DEFAULT_USER];
  });

  const [ibTree, setIbTree] = useState<SubIBAccount[]>(() => {
    const saved = localStorage.getItem('nexus_ib_tree');
    return saved ? JSON.parse(saved) : INITIAL_IB_TREE_STRUCTURE;
  });

  const [tickers, setTickers] = useState<MarketTicker[]>(() => {
    // Add synthetic crash/boom instruments if missing
    const hasBoom = INITIAL_TICKERS.some(t => t.symbol === 'BOOM_100');
    if (!hasBoom) {
      return [
        ...INITIAL_TICKERS,
        {
          symbol: 'BOOM_100',
          name: 'Boom 100 Index (Synthetic EA)',
          category: 'indices',
          price: 8420.50,
          change: 142.50,
          changePercent: 1.72,
          high: 8490.00,
          low: 8250.00,
          spread: 0.5,
          digits: 2,
          history: [8250, 8310, 8360, 8340, 8400, 8420.50]
        },
        {
          symbol: 'CRASH_1000',
          name: 'Crash 1000 Index (Synthetic EA)',
          category: 'indices',
          price: 5210.80,
          change: -88.20,
          changePercent: -1.66,
          high: 5320.00,
          low: 5180.00,
          spread: 0.6,
          digits: 2,
          history: [5300, 5280, 5240, 5260, 5220, 5210.80]
        }
      ];
    }
    return INITIAL_TICKERS;
  });

  const [positions, setPositions] = useState<TradePosition[]>(() => {
    const saved = localStorage.getItem('nexus_open_positions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'pos-init-1',
        symbol: 'XAUUSD',
        type: 'BUY',
        lots: 0.20,
        openPrice: 2370.10,
        currentPrice: 2374.50,
        stopLoss: 2355.00,
        takeProfit: 2390.00,
        pnl: 88.00,
        openTime: '13:14:20'
      },
      {
        id: 'pos-init-2',
        symbol: 'BOOM_100',
        type: 'BUY',
        lots: 0.10,
        openPrice: 8390.00,
        currentPrice: 8420.50,
        stopLoss: 8340.00,
        takeProfit: 8460.00,
        pnl: 30.50,
        openTime: '14:02:10'
      }
    ];
  });

  const [tradeHistory, setTradeHistory] = useState<ClosedTrade[]>(() => {
    const saved = localStorage.getItem('nexus_trade_history');
    return saved ? JSON.parse(saved) : INITIAL_TRADE_HISTORY;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('nexus_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [referrals, setReferrals] = useState<ReferralLead[]>(() => {
    const saved = localStorage.getItem('nexus_referrals');
    return saved ? JSON.parse(saved) : SAMPLE_REFERRAL_LEADS;
  });

  const [copiedMasters, setCopiedMasters] = useState<string[]>(() => {
    const saved = localStorage.getItem('nexus_copied_masters');
    return saved ? JSON.parse(saved) : ['master-1'];
  });

  const [deployedBots, setDeployedBots] = useState<string[]>(() => {
    const saved = localStorage.getItem('nexus_deployed_bots');
    return saved ? JSON.parse(saved) : ['bot-1'];
  });

  const [botActive, setBotActiveState] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_bot_active');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [botRiskMode, setBotRiskMode] = useState<'Conservative' | 'Balanced' | 'Aggressive'>('Conservative');
  const [botLogs, setBotLogs] = useState<BotLogItem[]>(INITIAL_BOT_LOGS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('nexus_accounts_registry', JSON.stringify(accountsRegistry));
  }, [accountsRegistry]);

  useEffect(() => {
    localStorage.setItem('nexus_user_account', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nexus_ib_tree', JSON.stringify(ibTree));
  }, [ibTree]);

  useEffect(() => {
    localStorage.setItem('nexus_open_positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('nexus_trade_history', JSON.stringify(tradeHistory));
  }, [tradeHistory]);

  useEffect(() => {
    localStorage.setItem('nexus_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nexus_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('nexus_bot_active', JSON.stringify(botActive));
  }, [botActive]);

  const setBotActive = (active: boolean) => {
    setBotActiveState(active);
    const timeStr = new Date().toLocaleTimeString();
    if (active) {
      addBotLog('info', `FlipCycle EA Bot initialized & connected to Live ECN Server. Risk Mode: ${botRiskMode}`);
    } else {
      addBotLog('warning', `FlipCycle EA Bot paused by user. Automated execution suspended.`);
    }
  };

  const addBotLog = (type: BotLogItem['type'], message: string, symbol?: string, profit?: number) => {
    const newLog: BotLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      symbol,
      profit
    };
    setBotLogs(prev => [newLog, ...prev.slice(0, 39)]);
  };

  // ─── REAL-TIME MARKET TICK ENGINE ───
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prevTickers => {
        return prevTickers.map(t => {
          // Dynamic jitter based on asset volatility
          const volFactor = t.symbol.includes('BOOM') || t.symbol.includes('CRASH')
            ? 0.0012
            : t.symbol === 'BTCUSD'
            ? 0.0008
            : 0.0003;

          const randomWalk = (Math.random() - 0.49) * (t.price * volFactor);
          const newPrice = Number((t.price + randomWalk).toFixed(t.digits));
          const newHistory = [...(t.history || []).slice(1), newPrice];
          const newHigh = Math.max(t.high, newPrice);
          const newLow = Math.min(t.low, newPrice);
          const changeVal = Number((newPrice - (t.history[0] || newPrice)).toFixed(t.digits));
          const changePct = Number(((changeVal / (t.history[0] || newPrice)) * 100).toFixed(2));

          return {
            ...t,
            price: newPrice,
            high: newHigh,
            low: newLow,
            change: changeVal,
            changePercent: changePct,
            history: newHistory
          };
        });
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // ─── RECALCULATE OPEN POSITIONS LIVE PNL ───
  useEffect(() => {
    if (positions.length === 0) return;

    setPositions(prevPositions => {
      let changed = false;
      const updated = prevPositions.map(pos => {
        const currentTicker = tickers.find(t => t.symbol === pos.symbol);
        if (!currentTicker) return pos;

        const currentPrice = currentTicker.price;
        const priceDiff = pos.type === 'BUY'
          ? currentPrice - pos.openPrice
          : pos.openPrice - currentPrice;

        const multiplier = pos.symbol === 'XAUUSD'
          ? 100
          : pos.symbol.includes('USD') && !pos.symbol.includes('BTC')
          ? 100000
          : pos.symbol === 'BTCUSD'
          ? 1
          : 10;

        const pnl = Number((priceDiff * pos.lots * multiplier).toFixed(2));

        if (pnl !== pos.pnl || currentPrice !== pos.currentPrice) {
          changed = true;
          return {
            ...pos,
            currentPrice,
            pnl
          };
        }
        return pos;
      });

      return changed ? updated : prevPositions;
    });
  }, [tickers]);

  // ─── CALCULATE TOTAL FLOATING PNL & UPDATE EQUITY ───
  const totalFloatingPnl = positions.reduce((acc, pos) => acc + (pos.pnl || 0), 0);

  useEffect(() => {
    const liveEquity = Number((user.balance + totalFloatingPnl).toFixed(2));
    if (user.equity !== liveEquity) {
      setUser(prev => ({
        ...prev,
        equity: liveEquity
      }));
    }
  }, [user.balance, totalFloatingPnl]);

  // ─── AUTOMATED FLIPCYCLE EA BOT ENGINE WORKER ───
  const botIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!botActive) {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
      return;
    }

    // Bot cycles every 14 seconds
    botIntervalRef.current = window.setInterval(() => {
      const symbols = ['BOOM_100', 'XAUUSD', 'EURUSD'];
      const chosenSym = symbols[Math.floor(Math.random() * symbols.length)];
      const currentT = tickers.find(t => t.symbol === chosenSym);
      if (!currentT) return;

      const actionDice = Math.random();

      // 40% chance: Algorithmic Scanner Scan Log
      if (actionDice < 0.40) {
        const indicators = ['RSI(14) Pullback', 'EMA(20)/SMA(50) Golden Cross', 'OrderBlock FVG Liquidity Sweep', 'Volatility Trail Band'];
        const chosenInd = indicators[Math.floor(Math.random() * indicators.length)];
        addBotLog('scan', `FlipCycle EA: Scanning ${chosenSym} · Signal indicator: ${chosenInd}. Price: ${currentT.price}`, chosenSym);
      }
      // 35% chance: Execute a Quick Automated Profit Scalp Trade
      else if (actionDice < 0.75) {
        const tradeType: 'BUY' | 'SELL' = Math.random() > 0.4 ? 'BUY' : 'SELL';
        const lots = botRiskMode === 'Conservative' ? 0.10 : botRiskMode === 'Balanced' ? 0.20 : 0.35;
        const profitAmount = Number((15 + Math.random() * (botRiskMode === 'Aggressive' ? 75 : 45)).toFixed(2));

        const openP = currentT.price;
        const closeP = tradeType === 'BUY'
          ? Number((openP + (profitAmount / (lots * 100))).toFixed(currentT.digits))
          : Number((openP - (profitAmount / (lots * 100))).toFixed(currentT.digits));

        const ticketNum = `#${Math.floor(28850 + Math.random() * 1000)}`;

        // Add to trade history
        const closed: ClosedTrade = {
          id: `bot-trade-${Date.now()}`,
          ticket: ticketNum,
          symbol: chosenSym,
          type: tradeType,
          lots,
          openPrice: openP,
          closePrice: closeP,
          profit: profitAmount,
          openTime: new Date(Date.now() - 120000).toLocaleTimeString(),
          closeTime: new Date().toLocaleTimeString(),
          source: 'BOT',
          reason: 'TS_TRAIL'
        };

        setTradeHistory(prev => [closed, ...prev.slice(0, 49)]);

        // Credit to balance
        setUser(prev => ({
          ...prev,
          balance: Number((prev.balance + profitAmount).toFixed(2)),
          equity: Number((prev.equity + profitAmount).toFixed(2))
        }));

        addBotLog('profit', `FlipCycle EA: ${tradeType} ${lots} lot ${chosenSym} hit Trailing Stop at ${closeP}. Closed with +$${profitAmount} profit!`, chosenSym, profitAmount);
      }
      // 25% chance: Automated IB Downline Trade Volume & Rebate Generation
      else {
        const rebate = Number((5 + Math.random() * 20).toFixed(2));
        setUser(prev => ({
          ...prev,
          ibEarnings: Number((prev.ibEarnings + rebate).toFixed(2))
        }));
        addBotLog('info', `Downline Partner trading activity generated +$${rebate} IB instant rebate commission!`);
      }
    }, 14000);

    return () => {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    };
  }, [botActive, botRiskMode, tickers]);

  // Manual Trigger for Immediate Bot Test
  const triggerManualBotTrade = () => {
    const boomTicker = tickers.find(t => t.symbol === 'BOOM_100') || tickers[0];
    const lots = 0.15;
    const profit = Number((35 + Math.random() * 40).toFixed(2));
    const ticket = `#${Math.floor(29000 + Math.random() * 900)}`;

    const closed: ClosedTrade = {
      id: `bot-manual-${Date.now()}`,
      ticket,
      symbol: boomTicker.symbol,
      type: 'BUY',
      lots,
      openPrice: boomTicker.price,
      closePrice: Number((boomTicker.price + 0.85).toFixed(boomTicker.digits)),
      profit,
      openTime: new Date(Date.now() - 60000).toLocaleTimeString(),
      closeTime: new Date().toLocaleTimeString(),
      source: 'BOT',
      reason: 'TS_TRAIL'
    };

    setTradeHistory(prev => [closed, ...prev]);
    setUser(prev => ({
      ...prev,
      balance: Number((prev.balance + profit).toFixed(2)),
      equity: Number((prev.equity + profit).toFixed(2))
    }));

    addBotLog('profit', `Manual FlipCycle Trigger: Closed +$${profit} on ${boomTicker.symbol}! Balance credited.`, boomTicker.symbol, profit);
  };

  // Calculate deep network totals
  const calculateDeepTotals = (nodes: SubIBAccount[]): { totalFunds: number; totalLots: number; count: number } => {
    let funds = 0;
    let lots = 0;
    let count = 0;

    for (const node of nodes) {
      funds += Number(node.fundDeposited || 0);
      lots += Number(node.lotsTraded || 0);
      count += 1;
      if (node.subAccounts && node.subAccounts.length > 0) {
        const sub = calculateDeepTotals(node.subAccounts);
        funds += sub.totalFunds;
        lots += sub.totalLots;
        count += sub.count;
      }
    }

    return { totalFunds: funds, totalLots: lots, count };
  };

  const networkMetrics = calculateDeepTotals(ibTree);
  const totalNetworkFund = networkMetrics.totalFunds;
  const totalNetworkLots = networkMetrics.totalLots;
  const totalNetworkAccounts = networkMetrics.count;

  // Add new Sub-IB / Client Account into the Network Tree
  const addSubIBNode = (newNodeData: Omit<SubIBAccount, 'id'>, parentNodeId?: string) => {
    const createdNode: SubIBAccount = {
      ...newNodeData,
      id: `acc-${Date.now()}`
    };

    if (!parentNodeId) {
      setIbTree((prev) => [createdNode, ...prev]);
    } else {
      const insertRecursive = (list: SubIBAccount[]): SubIBAccount[] => {
        return list.map((item) => {
          if (item.id === parentNodeId) {
            return {
              ...item,
              subAccounts: item.subAccounts ? [createdNode, ...item.subAccounts] : [createdNode]
            };
          }
          if (item.subAccounts && item.subAccounts.length > 0) {
            return {
              ...item,
              subAccounts: insertRecursive(item.subAccounts)
            };
          }
          return item;
        });
      };
      setIbTree((prev) => insertRecursive(prev));
    }

    if (createdNode.commissionGenerated > 0) {
      setUser((prev) => ({
        ...prev,
        ibEarnings: Number((prev.ibEarnings + createdNode.commissionGenerated).toFixed(2))
      }));
    }
  };

  const deleteSubIBNode = (nodeId: string) => {
    const deleteRecursive = (list: SubIBAccount[]): SubIBAccount[] => {
      return list
        .filter(item => item.id !== nodeId)
        .map(item => ({
          ...item,
          subAccounts: item.subAccounts ? deleteRecursive(item.subAccounts) : undefined
        }));
    };
    setIbTree(prev => deleteRecursive(prev));
  };

  const updateSubIBFund = (nodeId: string, addedFund: number) => {
    const updateRecursive = (list: SubIBAccount[]): SubIBAccount[] => {
      return list.map(item => {
        if (item.id === nodeId) {
          const newFund = Number(item.fundDeposited) + addedFund;
          const addedCommission = Number((addedFund * 0.025).toFixed(2));
          return {
            ...item,
            fundDeposited: newFund,
            equity: newFund,
            commissionGenerated: Number(item.commissionGenerated) + addedCommission
          };
        }
        if (item.subAccounts && item.subAccounts.length > 0) {
          return {
            ...item,
            subAccounts: updateRecursive(item.subAccounts)
          };
        }
        return item;
      });
    };

    setIbTree(prev => updateRecursive(prev));
    const extraComm = Number((addedFund * 0.025).toFixed(2));
    setUser(prev => ({ ...prev, ibEarnings: Number((prev.ibEarnings + extraComm).toFixed(2)) }));
  };

  const simulateClientTradeVolume = (lots: number) => {
    const rebate = Number((lots * 15.0).toFixed(2));
    setUser(prev => ({
      ...prev,
      ibEarnings: Number((prev.ibEarnings + rebate).toFixed(2))
    }));
    return { rebateEarned: rebate };
  };

  const claimIBCommission = (amount: number, target: 'balance' | 'withdraw'): boolean => {
    if (user.ibEarnings < amount || amount <= 0) return false;

    setUser(prev => ({
      ...prev,
      ibEarnings: Number((prev.ibEarnings - amount).toFixed(2)),
      balance: target === 'balance' ? Number((prev.balance + amount).toFixed(2)) : prev.balance,
      equity: target === 'balance' ? Number((prev.equity + amount).toFixed(2)) : prev.equity
    }));

    const newTx: PaymentTransaction = {
      id: `tx-ib-${Date.now()}`,
      type: target === 'balance' ? 'deposit' : 'withdrawal',
      method: 'UPI',
      amount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      txnHash: `IB-CLAIM/${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    setTransactions(prev => [newTx, ...prev]);
    return true;
  };

  const openTrade = (
    symbol: string,
    type: 'BUY' | 'SELL',
    lots: number,
    openPrice?: number,
    stopLoss?: number,
    takeProfit?: number
  ) => {
    const currentTicker = tickers.find(t => t.symbol === symbol);
    const execPrice = openPrice || currentTicker?.price || 2374.50;

    const newPos: TradePosition = {
      id: `pos-${Date.now()}`,
      symbol,
      type,
      lots,
      openPrice: execPrice,
      currentPrice: execPrice,
      stopLoss,
      takeProfit,
      pnl: 0,
      openTime: new Date().toLocaleTimeString()
    };

    setPositions((prev) => [newPos, ...prev]);
  };

  const closeTrade = (id: string, currentPrice?: number) => {
    const target = positions.find((p) => p.id === id);
    if (!target) return;

    const currentT = tickers.find(t => t.symbol === target.symbol);
    const execPrice = currentPrice || currentT?.price || target.currentPrice || target.openPrice;

    const priceDiff = target.type === 'BUY'
      ? execPrice - target.openPrice
      : target.openPrice - execPrice;

    const multiplier = target.symbol === 'XAUUSD'
      ? 100
      : target.symbol.includes('USD') && !target.symbol.includes('BTC')
      ? 100000
      : target.symbol === 'BTCUSD'
      ? 1
      : 10;

    const finalPnl = Number((priceDiff * target.lots * multiplier).toFixed(2));

    const closedItem: ClosedTrade = {
      id: `closed-${Date.now()}`,
      ticket: `#${Math.floor(29100 + Math.random() * 900)}`,
      symbol: target.symbol,
      type: target.type,
      lots: target.lots,
      openPrice: target.openPrice,
      closePrice: execPrice,
      profit: finalPnl,
      openTime: target.openTime,
      closeTime: new Date().toLocaleTimeString(),
      source: 'MANUAL',
      reason: 'MANUAL'
    };

    setTradeHistory(prev => [closedItem, ...prev]);

    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance + finalPnl).toFixed(2)),
      equity: Number((prev.equity + finalPnl).toFixed(2))
    }));

    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const closeAllPositions = () => {
    positions.forEach(pos => closeTrade(pos.id));
  };

  const depositFunds = (amount: number, method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire', txnHash?: string) => {
    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance + amount).toFixed(2)),
      equity: Number((prev.equity + amount).toFixed(2))
    }));

    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      method,
      amount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      txnHash: txnHash || `REF/${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const withdrawFunds = (amount: number, method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire', destination?: string): boolean => {
    if (user.balance < amount) return false;

    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance - amount).toFixed(2)),
      equity: Number((prev.equity - amount).toFixed(2))
    }));

    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      method,
      amount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      txnHash: destination ? `OUT/${destination.substring(0, 10)}...` : `OUT/${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const addReferralLead = (lead: Omit<ReferralLead, 'id' | 'commissionEarned' | 'joinDate'>) => {
    const newLead: ReferralLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      commissionEarned: Math.floor(50 + Math.random() * 300),
      joinDate: new Date().toISOString().split('T')[0]
    };
    setReferrals((prev) => [newLead, ...prev]);
    setUser((prev) => ({ ...prev, ibEarnings: prev.ibEarnings + newLead.commissionEarned }));
  };

  const copyTrader = (masterId: string, allocationAmount: number) => {
    if (!copiedMasters.includes(masterId)) {
      setCopiedMasters((prev) => [...prev, masterId]);
      depositFunds(allocationAmount, 'USDT', `COPY-ALLOCATE-${masterId}`);
    }
  };

  const toggleBotDeployment = (botId: string) => {
    setDeployedBots((prev) => {
      if (prev.includes(botId)) {
        return prev.filter((id) => id !== botId);
      } else {
        return [...prev, botId];
      }
    });
  };

  const login = (identifier: string, pass: string): { success: boolean; message?: string } => {
    const trimmedId = identifier.trim().toLowerCase();
    
    const found = accountsRegistry.find(
      (acc) =>
        acc.email.toLowerCase() === trimmedId ||
        acc.mt5Login.toLowerCase() === trimmedId
    );

    if (found) {
      setUser(found);
      setIsLoggedIn(true);
      return { success: true, message: `Welcome back, ${found.fullName}!` };
    }

    if (trimmedId.includes('@') || trimmedId.length >= 4) {
      const isDemo = trimmedId.includes('demo') || pass.toLowerCase().includes('demo');
      const newUser: UserAccountState = {
        fullName: identifier.includes('@') ? identifier.split('@')[0] : 'Trader Account',
        email: identifier.includes('@') ? identifier : `${identifier}@nexusfx.trade`,
        phone: '+91 98765 43210',
        accountMode: isDemo ? 'demo' : 'real',
        accountTier: 'pro',
        mt5Login: isDemo ? `909${Math.floor(10000 + Math.random() * 90000)}` : `709${Math.floor(10000 + Math.random() * 90000)}`,
        mt5Server: isDemo ? 'NexusFX-Demo01' : 'NexusFX-Live01',
        mt5Pass: pass || 'Nx#8821!',
        balance: isDemo ? 50000.0 : 10000.0,
        equity: isDemo ? 50000.0 : 10000.0,
        leverage: '1:1000',
        referralCode: `IB-${Math.floor(10000 + Math.random() * 90000)}`,
        sponsorIBCode: 'IB-GLOBAL-MASTER01',
        ibEarnings: 0
      };
      setAccountsRegistry((prev) => [newUser, ...prev]);
      setUser(newUser);
      setIsLoggedIn(true);
      return { success: true, message: `Logged in as ${newUser.fullName}` };
    }

    return { success: false, message: 'Invalid Email or MT5 Login ID.' };
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const registerUser = (info: Partial<UserAccountState>) => {
    const isDemo = info.accountMode === 'demo';
    const loginNum = info.mt5Login || `${isDemo ? '909' : '709'}${Math.floor(10000 + Math.random() * 90000)}`;
    const passVal = info.mt5Pass || `Nx#${Math.random().toString(36).substring(2, 7)}!`;
    const serverVal = info.mt5Server || (isDemo ? 'NexusFX-Demo01' : 'NexusFX-Live01');

    const newUserAcc: UserAccountState = {
      fullName: info.fullName || 'New Trader',
      email: info.email || `trader-${Date.now()}@nexusfx.trade`,
      phone: info.phone || '+91 98765 43210',
      accountMode: info.accountMode || 'real',
      accountTier: info.accountTier || 'pro',
      mt5Login: loginNum,
      mt5Server: serverVal,
      mt5Pass: passVal,
      balance: isDemo ? 50000.0 : (info.accountTier === 'vip' ? 5000.0 : info.accountTier === 'starter' ? 50.0 : 500.0),
      equity: isDemo ? 50000.0 : (info.accountTier === 'vip' ? 5000.0 : info.accountTier === 'starter' ? 50.0 : 500.0),
      leverage: info.leverage || '1:1000',
      referralCode: `IB-${Math.floor(100000 + Math.random() * 900000)}`,
      sponsorIBCode: info.sponsorIBCode || 'IB-GLOBAL-MASTER01',
      ibEarnings: 0
    };

    setAccountsRegistry((prev) => [newUserAcc, ...prev]);
    setUser(newUserAcc);
    setIsLoggedIn(true);
  };

  const updateUserCredentials = (info: Partial<UserAccountState>) => {
    setUser((prev) => {
      const updated = { ...prev, ...info };
      setAccountsRegistry((reg) => reg.map((acc) => acc.mt5Login === prev.mt5Login ? updated : acc));
      return updated;
    });
  };

  const resetAccount = () => {
    setUser(DEFAULT_USER);
    setIsLoggedIn(false);
    setPositions([]);
    setTradeHistory(INITIAL_TRADE_HISTORY);
    setTransactions(DEFAULT_TRANSACTIONS);
    setReferrals(SAMPLE_REFERRAL_LEADS);
    setIbTree(INITIAL_IB_TREE_STRUCTURE);
    setCopiedMasters(['master-1']);
    localStorage.clear();
  };

  return (
    <TradingContext.Provider
      value={{
        user,
        isLoggedIn,
        tickers,
        positions,
        tradeHistory,
        transactions,
        referrals,
        ibTree,
        copiedMasters,
        deployedBots,
        botActive,
        botLogs,
        botRiskMode,
        totalFloatingPnl,
        totalNetworkFund,
        totalNetworkAccounts,
        totalNetworkLots,
        login,
        logout,
        registerUser,
        addSubIBNode,
        deleteSubIBNode,
        updateSubIBFund,
        simulateClientTradeVolume,
        openTrade,
        closeTrade,
        closeAllPositions,
        depositFunds,
        withdrawFunds,
        claimIBCommission,
        setBotActive,
        setBotRiskMode,
        triggerManualBotTrade,
        addReferralLead,
        copyTrader,
        toggleBotDeployment,
        updateUserCredentials,
        resetAccount
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
