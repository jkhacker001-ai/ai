import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Users,
  Briefcase,
  Bot,
  Bell,
  TrendingUp,
  CreditCard,
  LogOut,
  Share2,
  Copy,
  Check,
  Award,
  DollarSign,
  LineChart,
  ShieldCheck,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  Wallet,
  Globe,
  Sliders,
  Zap,
  Activity,
  Flame,
  Download,
  Trash2,
  Plus,
  Play,
  Pause,
  SlidersHorizontal,
  QrCode,
  Send,
  X
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { SubIBAccount } from '../types';

interface AfterLoginDashboardProps {
  onOpenTerminal?: () => void;
  onOpenDeposit?: () => void;
  onOpenBots?: () => void;
  onOpenCopyTrading?: () => void;
  onViewPublicSite?: () => void;
}

export const AfterLoginDashboard: React.FC<AfterLoginDashboardProps> = ({
  onOpenTerminal,
  onOpenDeposit,
  onOpenBots,
  onOpenCopyTrading,
  onViewPublicSite
}) => {
  const {
    user,
    tickers,
    positions,
    tradeHistory,
    transactions,
    ibTree,
    botActive,
    botLogs,
    botRiskMode,
    totalFloatingPnl,
    totalNetworkFund,
    totalNetworkAccounts,
    totalNetworkLots,
    setBotActive,
    setBotRiskMode,
    triggerManualBotTrade,
    openTrade,
    closeTrade,
    closeAllPositions,
    addSubIBNode,
    deleteSubIBNode,
    updateSubIBFund,
    simulateClientTradeVolume,
    claimIBCommission,
    depositFunds,
    withdrawFunds,
    logout
  } = useTrading();

  // Active Main Panel
  const [activePanel, setActivePanel] = useState<'overview' | 'ib' | 'account' | 'bot'>('overview');

  // Copy Feedback
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedIBCode, setCopiedIBCode] = useState(false);
  const [copiedMT5, setCopiedMT5] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: string } | null>(null);

  // Quick Trade Widget state
  const [quickSymbol, setQuickSymbol] = useState<string>('XAUUSD');
  const [quickLots, setQuickLots] = useState<number>(0.10);
  const [quickSL, setQuickSL] = useState<string>('');
  const [quickTP, setQuickTP] = useState<string>('');

  // Filter & Search states for IB table
  const [ibSearch, setIbSearch] = useState('');
  const [ibRoleFilter, setIbRoleFilter] = useState<'ALL' | 'Sub-IB Partner' | 'Direct Trader' | 'VIP Client'>('ALL');
  const [collapsedTreeNodes, setCollapsedTreeNodes] = useState<Record<string, boolean>>({});

  // Add Sub-IB / Client Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccName, setNewAccName] = useState('');
  const [newAccEmail, setNewAccEmail] = useState('');
  const [newAccPhone, setNewAccPhone] = useState('');
  const [newAccRole, setNewAccRole] = useState<'Sub-IB Partner' | 'Direct Trader' | 'VIP Client'>('Sub-IB Partner');
  const [newAccType, setNewAccType] = useState('Pro ECN Account');
  const [newAccFund, setNewAccFund] = useState('10000');
  const [newAccCountry, setNewAccCountry] = useState('India 🇮🇳');
  const [parentTargetId, setParentTargetId] = useState<string>('');

  // Add Funds to existing client modal
  const [fundClientModal, setFundClientModal] = useState<{ isOpen: boolean; client: SubIBAccount | null; amount: string }>({
    isOpen: false,
    client: null,
    amount: '1000'
  });

  // Claim IB Commission Modal
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [claimTarget, setClaimTarget] = useState<'balance' | 'withdraw'>('balance');

  // Deposit/Withdraw Quick Modal
  const [quickDepositModal, setQuickDepositModal] = useState<{ isOpen: boolean; mode: 'deposit' | 'withdraw'; amount: string; method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire'; upiId: string; usdtAddr: string; txnHash: string; step: 'input' | 'qr' | 'success' }>({
    isOpen: false,
    mode: 'deposit',
    amount: '500',
    method: 'UPI',
    upiId: '',
    usdtAddr: '',
    txnHash: '',
    step: 'input'
  });

  // Toast Helper
  const showToast = (text: string, icon = '✅') => {
    setToastMessage({ text, icon });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const referralUrl = `https://theforexsystem2026.com/ref/${user.referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedReferral(true);
    showToast('Referral link copied to clipboard!', '📋');
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedIBCode(true);
    showToast(`Partner Code ${user.referralCode} copied!`, '📋');
    setTimeout(() => setCopiedIBCode(false), 2500);
  };

  const handleCopyMT5 = () => {
    const details = `Server: ${user.mt5Server}\nLogin: ${user.mt5Login}\nPassword: ${user.mt5Pass}`;
    navigator.clipboard.writeText(details);
    setCopiedMT5(true);
    showToast('MT5 login credentials copied!', '🔐');
    setTimeout(() => setCopiedMT5(false), 2500);
  };

  const toggleBot = () => {
    const nextState = !botActive;
    setBotActive(nextState);
    showToast(nextState ? 'FlipCycle EA Bot Activated!' : 'FlipCycle EA Bot Paused', nextState ? '🤖' : '⏸️');
  };

  const toggleTreeNode = (id: string) => {
    setCollapsedTreeNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Quick Trade execution
  const activeSelectedTicker = tickers.find((t) => t.symbol === quickSymbol) || tickers[0];

  const handleExecuteQuickTrade = (type: 'BUY' | 'SELL') => {
    openTrade(
      quickSymbol,
      type,
      Number(quickLots) || 0.10,
      activeSelectedTicker.price,
      quickSL ? Number(quickSL) : undefined,
      quickTP ? Number(quickTP) : undefined
    );
    showToast(`Executed ${type} ${quickLots} lot(s) ${quickSymbol} @ ${activeSelectedTicker.price}`, type === 'BUY' ? '🟢' : '🔴');
    setQuickSL('');
    setQuickTP('');
  };

  // Flatten IB nodes for table list
  const flattenNodes = (nodes: SubIBAccount[]): SubIBAccount[] => {
    let list: SubIBAccount[] = [];
    for (const node of nodes) {
      list.push(node);
      if (node.subAccounts && node.subAccounts.length > 0) {
        list = list.concat(flattenNodes(node.subAccounts));
      }
    }
    return list;
  };

  const allClients = useMemo(() => flattenNodes(ibTree), [ibTree]);

  const filteredClients = useMemo(() => {
    return allClients.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(ibSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(ibSearch.toLowerCase()) ||
        c.mt5Login.includes(ibSearch) ||
        c.sponsorCode.toLowerCase().includes(ibSearch.toLowerCase());
      const matchRole = ibRoleFilter === 'ALL' || c.role === ibRoleFilter;
      return matchSearch && matchRole;
    });
  }, [allClients, ibSearch, ibRoleFilter]);

  // Handle Add Account Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fundNum = Number(newAccFund) || 5000;
    const isSubIB = newAccRole === 'Sub-IB Partner';
    const lotsEstimated = Number((fundNum * 0.015).toFixed(1));
    const commission = Number((lotsEstimated * 15).toFixed(2));

    addSubIBNode(
      {
        name: newAccName || 'New Partner Account',
        email: newAccEmail || `trader-${Date.now()}@nexusfx.trade`,
        phone: newAccPhone || '+91 98000 11223',
        mt5Login: `709${Math.floor(10000 + Math.random() * 90000)}`,
        role: newAccRole,
        accountType: newAccType,
        level: parentTargetId ? 2 : 1,
        sponsorCode: parentTargetId ? 'IB-SUB' : user.referralCode,
        fundDeposited: fundNum,
        equity: fundNum,
        lotsTraded: lotsEstimated,
        commissionGenerated: commission,
        joinDate: new Date().toISOString().split('T')[0],
        country: newAccCountry,
        status: fundNum >= 25000 ? 'VIP' : 'Active',
        subAccounts: isSubIB ? [] : undefined
      },
      parentTargetId || undefined
    );

    setNewAccName('');
    setNewAccEmail('');
    setNewAccPhone('');
    setNewAccFund('10000');
    setIsAddModalOpen(false);
    showToast(`Account successfully added with $${fundNum.toLocaleString()} fund!`, '🎉');
  };

  // Handle Add Fund to Existing Client
  const handleFundClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fundClientModal.client) return;
    const added = Number(fundClientModal.amount) || 0;
    if (added <= 0) return;

    updateSubIBFund(fundClientModal.client.id, added);
    showToast(`Added $${added.toLocaleString()} to ${fundClientModal.client.name}! +$${(added * 0.025).toFixed(2)} commission earned!`, '💰');
    setFundClientModal({ isOpen: false, client: null, amount: '1000' });
  };

  // Handle Claim Commission Submit
  const handleClaimCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(claimAmount) || user.ibEarnings;
    if (amountNum <= 0 || amountNum > user.ibEarnings) {
      showToast('Please enter a valid amount within your available IB balance.', '⚠️');
      return;
    }

    const success = claimIBCommission(amountNum, claimTarget);
    if (success) {
      showToast(
        claimTarget === 'balance'
          ? `Transferred $${amountNum.toLocaleString()} into your MT5 Live Trading Balance!`
          : `Payout request of $${amountNum.toLocaleString()} submitted via Instant UPI/Crypto!`,
        '💸'
      );
      setClaimModalOpen(false);
      setClaimAmount('');
    }
  };

  // Handle Simulate Network Volume
  const handleSimulateLots = (lots: number) => {
    const res = simulateClientTradeVolume(lots);
    showToast(`Simulated ${lots} lots trading by client network. +$${res.rebateEarned.toFixed(2)} IB commission credited!`, '⚡');
  };

  // CSV Export for Clients
  const exportClientsCSV = () => {
    const headers = 'ID,Name,Email,MT5,Role,AccountType,Deposited,Commission,Joined,Status\n';
    const rows = allClients.map(c => `"${c.id}","${c.name}","${c.email}","${c.mt5Login}","${c.role}","${c.accountType}",${c.fundDeposited},${c.commissionGenerated},"${c.joinDate}","${c.status}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IB_Network_Clients_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Client directory exported to CSV!', '📥');
  };

  // CSV Export for Trade History
  const exportTradeCSV = () => {
    const headers = 'Ticket,Symbol,Type,Lots,OpenPrice,ClosePrice,Profit,OpenTime,CloseTime,Source,Reason\n';
    const rows = tradeHistory.map(t => `"${t.ticket}","${t.symbol}","${t.type}",${t.lots},${t.openPrice},${t.closePrice},${t.profit},"${t.openTime}","${t.closeTime}","${t.source}","${t.reason || 'N/A'}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Trade_History_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Trade history exported to CSV!', '📥');
  };

  // Quick Deposit/Withdraw Handler
  const handleProcessDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = Number(quickDepositModal.amount) || 100;

    if (quickDepositModal.mode === 'deposit') {
      if (quickDepositModal.step === 'input') {
        setQuickDepositModal(prev => ({ ...prev, step: 'qr' }));
      } else {
        depositFunds(amountVal, quickDepositModal.method, quickDepositModal.txnHash || `UPI/${Math.floor(600000000 + Math.random() * 300000000)}`);
        setQuickDepositModal(prev => ({ ...prev, step: 'success' }));
        showToast(`Successfully deposited $${amountVal.toLocaleString()}! Balance updated.`, '💳');
        setTimeout(() => {
          setQuickDepositModal({ isOpen: false, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' });
        }, 2200);
      }
    } else {
      const ok = withdrawFunds(amountVal, quickDepositModal.method, quickDepositModal.upiId || quickDepositModal.usdtAddr);
      if (ok) {
        setQuickDepositModal(prev => ({ ...prev, step: 'success' }));
        showToast(`Withdrawal of $${amountVal.toLocaleString()} processed!`, '💸');
        setTimeout(() => {
          setQuickDepositModal({ isOpen: false, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' });
        }, 2200);
      } else {
        showToast('Insufficient balance for withdrawal.', '⚠️');
      }
    }
  };

  // Total Real Closed Profit
  const totalClosedProfit = useMemo(() => {
    return tradeHistory.reduce((acc, t) => acc + t.profit, 0);
  }, [tradeHistory]);

  return (
    <div className="min-h-screen bg-[#050810] text-[#F0F6FF] flex flex-col md:flex-row relative selection:bg-[#0EA5E9] selection:text-black font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0D1526] border border-[#0EA5E9] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-[#0EA5E9]/25 flex items-center gap-3 text-sm font-semibold backdrop-blur-md"
          >
            <span className="text-xl">{toastMessage.icon}</span>
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─── */}
      <aside className="w-full md:w-64 bg-[#080D1A] border-r border-[#63B3FF]/10 flex flex-col justify-between shrink-0 p-5 md:min-h-screen z-30">
        <div>
          {/* Brand / Logo */}
          <div className="pb-6 mb-4 border-b border-[#63B3FF]/10 flex items-center justify-between">
            <div>
              <div className="font-serif font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                The<span className="text-[#0EA5E9]">Forex</span>System<span className="text-[#F59E0B]">2026</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-[#4A6080] uppercase mt-0.5">
                REAL ECN PRO TRADER
              </div>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 rounded-md animate-pulse">
              LIVE
            </span>
          </div>

          {/* Quick Account Header Pill */}
          <div className="p-3 bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl mb-5 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#8BA3C7]">
              <span>MT5 Live Balance:</span>
              <span className="text-[#10B981] font-mono font-bold">
                ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#4A6080]">
              <span>Floating P/L:</span>
              <span className={`font-mono font-bold ${totalFloatingPnl >= 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
                {totalFloatingPnl >= 0 ? `+$${totalFloatingPnl.toFixed(2)}` : `-$${Math.abs(totalFloatingPnl).toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* Nav Section: Main Panels */}
          <div className="space-y-1 mb-6">
            <div className="text-[10px] font-bold text-[#4A6080] uppercase tracking-widest px-3 mb-2 font-mono">
              Main Dashboard
            </div>

            <button
              onClick={() => setActivePanel('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePanel === 'overview'
                  ? 'bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30 shadow-md shadow-[#0EA5E9]/10'
                  : 'text-[#8BA3C7] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Overview</span>
              </div>
              {positions.length > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
                  {positions.length} Open
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePanel('ib')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePanel === 'ib'
                  ? 'bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30 shadow-md shadow-[#0EA5E9]/10'
                  : 'text-[#8BA3C7] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>IB Network</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0EA5E9] text-black">
                {totalNetworkAccounts}
              </span>
            </button>

            <button
              onClick={() => setActivePanel('account')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePanel === 'account'
                  ? 'bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30 shadow-md shadow-[#0EA5E9]/10'
                  : 'text-[#8BA3C7] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>My Account</span>
              </div>
            </button>

            <button
              onClick={() => setActivePanel('bot')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePanel === 'bot'
                  ? 'bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30 shadow-md shadow-[#0EA5E9]/10'
                  : 'text-[#8BA3C7] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4" />
                <span>Trading Bot</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                  botActive ? 'bg-[#10B981] text-black' : 'bg-[#4A6080] text-white'
                }`}
              >
                {botActive ? 'ACTIVE' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Nav Section: Trading Tools */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#4A6080] uppercase tracking-widest px-3 mb-2 font-mono">
              Live Tools
            </div>

            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8BA3C7] hover:text-white hover:bg-white/5 transition-colors"
              >
                <LineChart className="w-4 h-4 text-[#0EA5E9]" />
                <span>Web Terminal</span>
              </button>
            )}

            {onOpenBots && (
              <button
                onClick={onOpenBots}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8BA3C7] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Zap className="w-4 h-4 text-[#10B981]" />
                <span>Bot Manager</span>
              </button>
            )}

            {onOpenCopyTrading && (
              <button
                onClick={onOpenCopyTrading}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8BA3C7] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#F59E0B]" />
                <span>Copy Trading</span>
              </button>
            )}

            <button
              onClick={() => setQuickDepositModal({ isOpen: true, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8BA3C7] hover:text-white hover:bg-white/5 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-[#10B981]" />
              <span>Deposit / Payout</span>
            </button>

            {onViewPublicSite && (
              <button
                onClick={onViewPublicSite}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#8BA3C7] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#6366F1]" />
                <span>Public Broker Site</span>
              </button>
            )}
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-[#63B3FF]/10 space-y-3 mt-6">
          <div className="flex items-center gap-3 p-2.5 bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#6366F1] flex items-center justify-center font-bold text-black text-sm shrink-0">
              {user.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
              <div className="text-[10px] text-[#10B981] font-mono">MT5: {user.mt5Login} · VIP</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#63B3FF]/10">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              {activePanel === 'overview' && (
                <>
                  <span>Real Overview</span>
                  <span className="text-lg font-sans font-normal text-[#4A6080]">Live Terminal &amp; Metrics</span>
                </>
              )}
              {activePanel === 'ib' && (
                <>
                  <span>IB Network</span>
                  <span className="text-lg font-sans font-normal text-[#4A6080]">Multi-Tier Rebates &amp; Clients</span>
                </>
              )}
              {activePanel === 'account' && (
                <>
                  <span>My Account</span>
                  <span className="text-lg font-sans font-normal text-[#4A6080]">MT5 Live &amp; Trade History</span>
                </>
              )}
              {activePanel === 'bot' && (
                <>
                  <span>FlipCycle EA Bot</span>
                  <span className="text-lg font-sans font-normal text-[#4A6080]">v2.1 Pro · Live ECN Engine</span>
                </>
              )}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Ticker Feed Tag */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>XAUUSD: ${tickers.find(t => t.symbol === 'XAUUSD')?.price.toFixed(2) || '2374.50'}</span>
            </div>

            {/* IB Code Tag */}
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono font-bold hover:bg-[#F59E0B]/20 transition-colors"
              title="Click to copy IB Code"
            >
              <span>🔗 IB: {user.referralCode}</span>
              {copiedIBCode ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
            </button>

            {/* Deposit Button */}
            <button
              onClick={() => setQuickDepositModal({ isOpen: true, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
              className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-black font-extrabold text-xs shadow-lg shadow-[#10B981]/20 hover:bg-[#34D399] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>

            {/* Add Sub-IB Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-black font-extrabold text-xs shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/40 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Sub-IB</span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            PANEL 1: OVERVIEW (REAL-TIME ENGINE)
        ══════════════════════════════════════════ */}
        {activePanel === 'overview' && (
          <div className="space-y-6">
            {/* 4 Primary Live Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Balance */}
              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 hover:border-[#63B3FF]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">💰</div>
                  <button
                    onClick={() => setQuickDepositModal({ isOpen: true, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
                    className="text-[10px] text-[#0EA5E9] hover:underline font-bold"
                  >
                    + Add Funds
                  </button>
                </div>
                <div className="text-[11px] font-bold text-[#4A6080] uppercase tracking-wider mt-2">MT5 Live Balance</div>
                <div className="font-serif text-3xl font-black text-white mt-1">
                  ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-bold text-[#8BA3C7] mt-2 flex items-center gap-1">
                  <span>Equity:</span>
                  <span className="font-mono text-[#10B981]">${user.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Card 2: Total Closed Real Profit */}
              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 hover:border-[#63B3FF]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">📈</div>
                  <span className="text-[10px] font-mono text-[#10B981] font-bold">{tradeHistory.length} Trades</span>
                </div>
                <div className="text-[11px] font-bold text-[#4A6080] uppercase tracking-wider mt-2">Real Closed Profit</div>
                <div className="font-serif text-3xl font-black text-[#10B981] mt-1">
                  +${totalClosedProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-bold text-[#10B981] mt-2 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Win Rate: 92.4%</span>
                </div>
              </div>

              {/* Card 3: Network Fund */}
              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 hover:border-[#63B3FF]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">👥</div>
                  <span className="text-[10px] font-mono text-[#0EA5E9] font-bold">{totalNetworkAccounts} Clients</span>
                </div>
                <div className="text-[11px] font-bold text-[#4A6080] uppercase tracking-wider mt-2">Downline Network Funds</div>
                <div className="font-serif text-3xl font-black text-[#0EA5E9] mt-1">
                  ${totalNetworkFund.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-bold text-[#0EA5E9] mt-2 flex items-center gap-1">
                  <span>Volume:</span>
                  <span className="font-mono">{totalNetworkLots.toFixed(1)} Lots Traded</span>
                </div>
              </div>

              {/* Card 4: IB Commission Wallet */}
              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 hover:border-[#63B3FF]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">💎</div>
                  <button
                    onClick={() => setClaimModalOpen(true)}
                    className="px-2 py-0.5 text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg border border-[#F59E0B]/30 hover:bg-[#F59E0B]/30 transition-all"
                  >
                    Claim Payout
                  </button>
                </div>
                <div className="text-[11px] font-bold text-[#4A6080] uppercase tracking-wider mt-2">IB Commission Wallet</div>
                <div className="font-serif text-3xl font-black text-[#F59E0B] mt-1">
                  ${user.ibEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-bold text-[#10B981] mt-2 flex items-center gap-1">
                  <span>Rebate:</span>
                  <span className="font-mono">$15/Lot Direct Tier</span>
                </div>
              </div>
            </div>

            {/* 2-Column: Live Quick Trading Engine + Live Bot Controller */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Live Quick Order Placement Card */}
              <div className="lg:col-span-7 bg-[#0D1526] border border-[#63B3FF]/15 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#63B3FF]/10">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">⚡ 1-Click Live ECN Execution</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] rounded">
                      0.1 PIP SPREAD
                    </span>
                  </div>
                  {onOpenTerminal && (
                    <button
                      onClick={onOpenTerminal}
                      className="text-xs text-[#0EA5E9] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Full Terminal</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Symbol selector pill bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {tickers.slice(0, 6).map((t) => (
                    <button
                      key={t.symbol}
                      onClick={() => setQuickSymbol(t.symbol)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
                        quickSymbol === t.symbol
                          ? 'bg-[#0EA5E9] text-black shadow-md shadow-[#0EA5E9]/20'
                          : 'bg-[#080D1A] text-[#8BA3C7] hover:text-white border border-[#63B3FF]/10'
                      }`}
                    >
                      <span>{t.symbol}</span>
                      <span className={`ml-1.5 text-[10px] ${t.change >= 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
                        ${t.price}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Live Price Display & Lot Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#080D1A] rounded-xl border border-[#63B3FF]/10">
                  <div>
                    <label className="text-[10px] text-[#4A6080] uppercase font-bold">Lot Volume</label>
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => setQuickLots(Math.max(0.01, Number((quickLots - 0.05).toFixed(2))))}
                        className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-white"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={quickLots}
                        onChange={(e) => setQuickLots(Number(e.target.value))}
                        className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded px-2 py-1 text-xs text-center font-mono font-bold text-white focus:outline-none"
                      />
                      <button
                        onClick={() => setQuickLots(Number((quickLots + 0.05).toFixed(2)))}
                        className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#4A6080] uppercase font-bold">Stop Loss (Price)</label>
                    <input
                      type="number"
                      placeholder="Optional"
                      value={quickSL}
                      onChange={(e) => setQuickSL(e.target.value)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#4A6080] uppercase font-bold">Take Profit (Price)</label>
                    <input
                      type="number"
                      placeholder="Optional"
                      value={quickTP}
                      onChange={(e) => setQuickTP(e.target.value)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none mt-1"
                    />
                  </div>
                </div>

                {/* Instant BUY / SELL Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleExecuteQuickTrade('SELL')}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-extrabold text-sm shadow-lg shadow-red-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <span className="flex items-center gap-1.5">
                      <ArrowDownRight className="w-4 h-4" />
                      <span>SELL / SHORT</span>
                    </span>
                    <span className="text-[11px] font-mono opacity-90">${activeSelectedTicker.price}</span>
                  </button>

                  <button
                    onClick={() => handleExecuteQuickTrade('BUY')}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] text-black font-black text-sm shadow-lg shadow-[#10B981]/25 transition-all flex flex-col items-center justify-center"
                  >
                    <span className="flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>BUY / LONG</span>
                    </span>
                    <span className="text-[11px] font-mono opacity-90">${activeSelectedTicker.price}</span>
                  </button>
                </div>
              </div>

              {/* FlipCycle Bot Live Control Box */}
              <div className="lg:col-span-5 bg-[#0D1526] border border-[#63B3FF]/15 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#63B3FF]/10">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#0EA5E9]" />
                      <span className="font-bold text-white text-sm">FlipCycle EA Bot</span>
                    </div>
                    <button
                      onClick={toggleBot}
                      className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                        botActive
                          ? 'bg-[#10B981] text-black shadow-lg shadow-[#10B981]/20'
                          : 'bg-[#4A6080] text-white'
                      }`}
                    >
                      {botActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{botActive ? 'RUNNING' : 'PAUSED'}</span>
                    </button>
                  </div>

                  {/* Mode & Live Specs */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                    <div className="p-2.5 bg-[#080D1A] rounded-xl border border-[#63B3FF]/5">
                      <div className="text-[10px] text-[#4A6080] uppercase font-bold">Instrument</div>
                      <div className="font-mono text-[#0EA5E9] font-bold mt-0.5">BOOM 100 / GOLD</div>
                    </div>
                    <div className="p-2.5 bg-[#080D1A] rounded-xl border border-[#63B3FF]/5">
                      <div className="text-[10px] text-[#4A6080] uppercase font-bold">Strategy</div>
                      <div className="font-mono text-[#10B981] font-bold mt-0.5">Trailing Scalp EA</div>
                    </div>
                  </div>

                  {/* Real Bot Event Terminal */}
                  <div className="mt-3 bg-[#050810] border border-[#63B3FF]/10 rounded-xl p-3 h-28 overflow-y-auto font-mono text-[11px] space-y-1.5">
                    {botLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="flex items-start gap-2">
                        <span className="text-[#4A6080] text-[10px] shrink-0">[{log.timestamp}]</span>
                        <span
                          className={`truncate ${
                            log.type === 'profit'
                              ? 'text-[#10B981] font-bold'
                              : log.type === 'trade'
                              ? 'text-[#0EA5E9]'
                              : log.type === 'scan'
                              ? 'text-[#8BA3C7]'
                              : 'text-yellow-400'
                          }`}
                        >
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={triggerManualBotTrade}
                    className="flex-1 py-2 px-3 bg-[#0EA5E9]/15 hover:bg-[#0EA5E9]/25 text-[#0EA5E9] border border-[#0EA5E9]/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Trigger Test Bot Scalp</span>
                  </button>

                  <button
                    onClick={() => handleSimulateLots(5)}
                    className="py-2 px-3 bg-[#F59E0B]/15 hover:bg-[#F59E0B]/25 text-[#F59E0B] border border-[#F59E0B]/30 rounded-xl text-xs font-bold transition-all"
                    title="Simulate 5 Lots traded by downline clients to test rebate"
                  >
                    +5 Lots Rebate
                  </button>
                </div>
              </div>
            </div>

            {/* Open Positions Table */}
            <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">📊 Live Open Positions</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#0EA5E9]/20 text-[#0EA5E9] rounded">
                    {positions.length} Active
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      totalFloatingPnl >= 0 ? 'text-[#10B981]' : 'text-red-400'
                    }`}
                  >
                    Floating: {totalFloatingPnl >= 0 ? `+$${totalFloatingPnl.toFixed(2)}` : `-$${Math.abs(totalFloatingPnl).toFixed(2)}`}
                  </span>
                </div>

                {positions.length > 0 && (
                  <button
                    onClick={closeAllPositions}
                    className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
                  >
                    Close All ({positions.length})
                  </button>
                )}
              </div>

              {positions.length === 0 ? (
                <div className="py-8 text-center text-[#4A6080] text-xs">
                  No open positions currently. Use the 1-Click execution widget above or Web Terminal to open a trade.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] font-bold text-[#4A6080] uppercase border-b border-[#63B3FF]/10 pb-2">
                        <th className="py-2.5 px-3">Symbol</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Lots</th>
                        <th className="py-2.5 px-3">Open Price</th>
                        <th className="py-2.5 px-3">Current Price</th>
                        <th className="py-2.5 px-3">SL / TP</th>
                        <th className="py-2.5 px-3 text-right">Floating P/L</th>
                        <th className="py-2.5 px-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#63B3FF]/5 font-mono">
                      {positions.map((pos) => (
                        <tr key={pos.id} className="hover:bg-white/5">
                          <td className="py-3 px-3 font-bold text-white font-sans">{pos.symbol}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                pos.type === 'BUY' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {pos.type}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-white font-bold">{pos.lots}</td>
                          <td className="py-3 px-3 text-[#8BA3C7]">${pos.openPrice}</td>
                          <td className="py-3 px-3 text-[#0EA5E9] font-bold">${pos.currentPrice}</td>
                          <td className="py-3 px-3 text-[#4A6080] text-[11px]">
                            {pos.stopLoss ? `SL: ${pos.stopLoss}` : 'No SL'} · {pos.takeProfit ? `TP: ${pos.takeProfit}` : 'No TP'}
                          </td>
                          <td
                            className={`py-3 px-3 text-right font-bold text-sm ${
                              pos.pnl >= 0 ? 'text-[#10B981]' : 'text-red-400'
                            }`}
                          >
                            {pos.pnl >= 0 ? `+$${pos.pnl.toFixed(2)}` : `-$${Math.abs(pos.pnl).toFixed(2)}`}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => closeTrade(pos.id)}
                              className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-lg text-[11px] font-bold transition-all"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Real Closed Trades History */}
            <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>📜 Real Closed Trades ({tradeHistory.length})</span>
                </div>
                <button
                  onClick={exportTradeCSV}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#8BA3C7] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-bold text-[#4A6080] uppercase border-b border-[#63B3FF]/10 pb-2">
                      <th className="py-2.5 px-3">Ticket</th>
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Lots</th>
                      <th className="py-2.5 px-3">Open → Close</th>
                      <th className="py-2.5 px-3">Profit</th>
                      <th className="py-2.5 px-3">Source</th>
                      <th className="py-2.5 px-3 text-center">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#63B3FF]/5 font-mono">
                    {tradeHistory.slice(0, 8).map((t) => (
                      <tr key={t.id} className="hover:bg-white/5">
                        <td className="py-3 px-3 text-[#4A6080]">{t.ticket}</td>
                        <td className="py-3 px-3 font-sans font-bold text-white">{t.symbol}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                              t.type === 'BUY' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-white">{t.lots}</td>
                        <td className="py-3 px-3 text-[#8BA3C7]">
                          ${t.openPrice} → ${t.closePrice}
                        </td>
                        <td className={`py-3 px-3 font-bold ${t.profit >= 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
                          {t.profit >= 0 ? `+$${t.profit.toFixed(2)}` : `-$${Math.abs(t.profit).toFixed(2)}`}
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                              t.source === 'BOT'
                                ? 'bg-[#0EA5E9]/15 text-[#0EA5E9]'
                                : 'bg-[#6366F1]/15 text-[#6366F1]'
                            }`}
                          >
                            {t.source === 'BOT' ? '🤖 FlipCycle EA' : '👤 Manual'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-[#4A6080]">{t.closeTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            PANEL 2: IB NETWORK (SUB-IB ENGINE)
        ══════════════════════════════════════════ */}
        {activePanel === 'ib' && (
          <div className="space-y-6">
            {/* Referral Link Box */}
            <div className="bg-gradient-to-r from-[#0EA5E9]/10 via-[#6366F1]/10 to-[#0D1526] border border-[#0EA5E9]/30 rounded-2xl p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="text-3xl">🔗</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Your Real IB Referral Link</h4>
                  <p className="text-xs text-[#8BA3C7]">
                    Earn multi-tier commission rebates ($15/Lot Direct + $5/Lot Sub-IB) with instant wallet settlement
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  onClick={handleCopyReferral}
                  className="bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-4 py-2.5 text-xs text-[#0EA5E9] font-mono cursor-pointer w-full md:w-80 focus:outline-none"
                />
                <button
                  onClick={handleCopyReferral}
                  className="px-5 py-2.5 bg-[#0EA5E9] hover:bg-[#38BDF8] text-black font-extrabold text-xs rounded-xl shadow-lg shadow-[#0EA5E9]/25 transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedReferral ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* 6 IB Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Total Clients Referred</div>
                <div className="font-serif text-2xl font-black text-[#0EA5E9] mt-1">{totalNetworkAccounts}</div>
                <div className="text-xs text-[#4A6080] mt-1.5">{allClients.filter(c => c.status === 'Active' || c.status === 'VIP').length} active · {allClients.filter(c => c.status === 'Pending').length} pending</div>
              </div>

              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Total Client Deposits in Network</div>
                <div className="font-serif text-2xl font-black text-[#10B981] mt-1">
                  ${totalNetworkFund.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-[#4A6080] mt-1.5">Across all Sub-IBs &amp; direct accounts</div>
              </div>

              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">IB Commission Earned</div>
                  <button
                    onClick={() => setClaimModalOpen(true)}
                    className="text-[10px] text-[#F59E0B] font-bold hover:underline"
                  >
                    Claim Payout →
                  </button>
                </div>
                <div className="font-serif text-2xl font-black text-[#F59E0B] mt-1">
                  ${user.ibEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-[#4A6080] mt-1.5">Instant Rebate Settlement Wallet</div>
              </div>

              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Commission Rate</div>
                <div className="font-serif text-2xl font-black text-[#6366F1] mt-1">2.5% ($15/Lot)</div>
                <div className="text-xs text-[#4A6080] mt-1.5">Per deposit &amp; lot volume · Gold Tier</div>
              </div>

              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Test Simulator Volume</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleSimulateLots(5)}
                    className="px-2.5 py-1 bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#10B981] rounded-lg text-xs font-bold font-mono"
                  >
                    +5 Lots ($75)
                  </button>
                  <button
                    onClick={() => handleSimulateLots(20)}
                    className="px-2.5 py-1 bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9] rounded-lg text-xs font-bold font-mono"
                  >
                    +20 Lots ($300)
                  </button>
                </div>
              </div>

              <div className="bg-[#111D33] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Network Volume</div>
                <div className="font-serif text-2xl font-black text-white mt-1">
                  {totalNetworkLots.toFixed(1)} Lots
                </div>
                <div className="text-xs text-[#4A6080] mt-1.5">Total traded by client network</div>
              </div>
            </div>

            {/* Client Table */}
            <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">👥 My IB Clients ({filteredClients.length})</span>
                  <button
                    onClick={exportClientsCSV}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[#8BA3C7] rounded-lg text-[11px] font-bold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#4A6080] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Client or MT5..."
                      value={ibSearch}
                      onChange={(e) => setIbSearch(e.target.value)}
                      className="bg-[#050810] border border-[#63B3FF]/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-[#4A6080] focus:outline-none"
                    />
                  </div>

                  <select
                    value={ibRoleFilter}
                    onChange={(e) => setIbRoleFilter(e.target.value as any)}
                    className="bg-[#050810] border border-[#63B3FF]/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="Sub-IB Partner">Sub-IB Partners</option>
                    <option value="Direct Trader">Direct Traders</option>
                    <option value="VIP Client">VIP Clients</option>
                  </select>

                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3 py-1.5 bg-[#0EA5E9] text-black font-bold text-xs rounded-xl hover:bg-[#38BDF8] shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-bold text-[#4A6080] uppercase border-b border-[#63B3FF]/10 pb-2">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Client Name</th>
                      <th className="py-2.5 px-3">Joined</th>
                      <th className="py-2.5 px-3 text-right">Fund Deposited</th>
                      <th className="py-2.5 px-3 text-right">Commission Generated</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#63B3FF]/5 font-mono">
                    {filteredClients.map((client, idx) => (
                      <tr key={client.id} className="hover:bg-white/5">
                        <td className="py-3 px-3 text-[#4A6080]">{String(idx + 1).padStart(2, '0')}</td>
                        <td className="py-3 px-3 font-sans font-bold text-white">
                          <div>{client.name}</div>
                          <div className="text-[10px] text-[#4A6080] font-mono">MT5: {client.mt5Login} • {client.role}</div>
                        </td>
                        <td className="py-3 px-3 text-[#8BA3C7] font-sans">{client.joinDate}</td>
                        <td className="py-3 px-3 text-right text-[#10B981] font-bold">
                          ${client.fundDeposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-right text-[#F59E0B] font-bold">
                          ${client.commissionGenerated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-center font-sans">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                              client.status === 'VIP'
                                ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                                : client.status === 'Active'
                                ? 'bg-[#10B981]/15 text-[#10B981]'
                                : 'bg-[#4A6080]/20 text-[#8BA3C7]'
                            }`}
                          >
                            ● {client.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-sans">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setFundClientModal({ isOpen: true, client, amount: '1000' })}
                              className="px-2 py-0.5 bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] text-[10px] font-bold rounded"
                              title="Add Deposit to Client Account"
                            >
                              + Fund
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove client ${client.name}?`)) {
                                  deleteSubIBNode(client.id);
                                  showToast(`Removed client ${client.name}`, '🗑️');
                                }
                              }}
                              className="p-1 text-[#4A6080] hover:text-red-400 rounded"
                              title="Delete Client"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual IB Network Tree */}
            <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>🌳 IB Network Tree Hierarchy</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#6366F1]/15 text-[#6366F1] rounded">
                    Multi-Level Downlines
                  </span>
                </div>
              </div>

              {/* Tree Visual Container */}
              <div className="flex flex-col items-center justify-center p-4">
                {/* Root Node (User) */}
                <div className="bg-gradient-to-r from-[#0EA5E9]/20 to-[#6366F1]/20 border-2 border-[#0EA5E9] rounded-2xl px-6 py-4 text-center shadow-xl shadow-[#0EA5E9]/15">
                  <div className="font-bold text-white text-base">👑 Master IB: {user.fullName}</div>
                  <div className="text-xs font-mono text-[#F59E0B] font-bold mt-0.5">
                    Partner Code: {user.referralCode}
                  </div>
                  <div className="text-[11px] text-[#10B981] font-mono mt-1">
                    Total Network Pool: ${totalNetworkFund.toLocaleString()} USD
                  </div>
                </div>

                {/* Vertical Line */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-[#0EA5E9] to-[#63B3FF]/40 my-1" />

                {/* Level 1 Horizontal Branch Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-2 border-t border-[#63B3FF]/30">
                  {ibTree.slice(0, 4).map((node) => {
                    const isCollapsed = collapsedTreeNodes[node.id];
                    const hasSubs = node.subAccounts && node.subAccounts.length > 0;
                    return (
                      <div key={node.id} className="flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-[#63B3FF]/40 mb-1" />
                        <div className="w-full bg-[#111D33] border border-[#63B3FF]/20 rounded-xl p-3.5 text-center space-y-1">
                          <div className="text-xs font-bold text-white truncate">{node.name}</div>
                          <div className="text-[11px] font-mono text-[#10B981] font-bold">
                            ${node.fundDeposited.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-[#4A6080] font-mono">
                            MT5: {node.mt5Login}
                          </div>
                          {hasSubs && (
                            <button
                              onClick={() => toggleTreeNode(node.id)}
                              className="text-[10px] text-[#0EA5E9] hover:underline font-bold block mx-auto pt-1"
                            >
                              {isCollapsed ? `+ ${node.subAccounts!.length} Sub-clients` : `- Hide Sub-clients`}
                            </button>
                          )}
                        </div>

                        {/* Level 2 Sub-Branches */}
                        {hasSubs && !isCollapsed && (
                          <div className="w-full pl-3 pt-2 border-l border-[#0EA5E9]/40 mt-2 space-y-2">
                            {node.subAccounts!.map((sub) => (
                              <div key={sub.id} className="bg-[#080D1A] border border-[#63B3FF]/10 rounded-lg p-2 text-left text-[11px]">
                                <div className="font-bold text-white truncate">{sub.name}</div>
                                <div className="text-[#10B981] font-mono">${sub.fundDeposited.toLocaleString()}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            PANEL 3: MY ACCOUNT (CREDENTIALS & PAYOUTS)
        ══════════════════════════════════════════ */}
        {activePanel === 'account' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Account Balance Hero */}
              <div className="lg:col-span-7 bg-gradient-to-br from-[#0D2035] to-[#0A1528] border border-[#0EA5E9]/30 rounded-2xl p-6 relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#4A6080] uppercase tracking-wider">
                    💼 MetaTrader 5 Live Account
                  </div>
                  <button
                    onClick={handleCopyMT5}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-[#0EA5E9] border border-[#0EA5E9]/30 transition-all"
                  >
                    {copiedMT5 ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMT5 ? 'Copied' : 'Copy Credentials'}</span>
                  </button>
                </div>

                <div className="font-serif text-4xl sm:text-5xl font-black text-white">
                  ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <span className="text-[#10B981] font-bold">
                    Equity: ${user.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[#8BA3C7]">
                    Free Margin: ${(user.equity * 0.95).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[#F59E0B]">Leverage: {user.leverage}</span>
                </div>

                {/* MT5 Detail Credential Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#63B3FF]/10 font-mono text-xs">
                  <div className="p-3 bg-[#050810] rounded-xl border border-[#63B3FF]/10">
                    <div className="text-[10px] text-[#4A6080] uppercase font-sans font-bold">MT5 Server</div>
                    <div className="font-bold text-white text-sm mt-0.5">{user.mt5Server}</div>
                  </div>
                  <div className="p-3 bg-[#050810] rounded-xl border border-[#63B3FF]/10">
                    <div className="text-[10px] text-[#4A6080] uppercase font-sans font-bold">Login ID</div>
                    <div className="font-bold text-[#0EA5E9] text-sm mt-0.5">{user.mt5Login}</div>
                  </div>
                  <div className="p-3 bg-[#050810] rounded-xl border border-[#63B3FF]/10">
                    <div className="text-[10px] text-[#4A6080] uppercase font-sans font-bold">Trading Pass</div>
                    <div className="font-bold text-[#F59E0B] text-sm mt-0.5">{user.mt5Pass}</div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setQuickDepositModal({ isOpen: true, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
                    className="flex-1 py-3 bg-[#10B981] hover:bg-[#34D399] text-black font-extrabold text-xs rounded-xl shadow-lg shadow-[#10B981]/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Instant Deposit</span>
                  </button>

                  <button
                    onClick={() => setQuickDepositModal({ isOpen: true, mode: 'withdraw', amount: '200', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
                    className="flex-1 py-3 bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9] border border-[#0EA5E9]/40 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Withdraw Funds</span>
                  </button>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="lg:col-span-5 bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#63B3FF]/10">
                  <div className="font-bold text-white text-sm">💳 Transactions Ledger</div>
                  <span className="text-[10px] font-mono text-[#4A6080]">{transactions.length} Records</span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 bg-[#080D1A] rounded-xl border border-[#63B3FF]/5 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            tx.type === 'deposit'
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {tx.type === 'deposit' ? '+' : '-'}
                        </div>
                        <div>
                          <div className="font-sans font-bold text-white capitalize">{tx.type} via {tx.method}</div>
                          <div className="text-[10px] text-[#4A6080]">{tx.date} · {tx.txnHash}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-bold ${
                            tx.type === 'deposit' ? 'text-[#10B981]' : 'text-red-400'
                          }`}
                        >
                          {tx.type === 'deposit' ? `+$${tx.amount.toLocaleString()}` : `-$${tx.amount.toLocaleString()}`}
                        </div>
                        <span className="px-1.5 py-0.2 text-[9px] font-sans font-bold bg-[#10B981]/15 text-[#10B981] rounded">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            PANEL 4: TRADING BOT (FLIPCYCLE EA PRO)
        ══════════════════════════════════════════ */}
        {activePanel === 'bot' && (
          <div className="space-y-6">
            {/* Bot Hero Banner */}
            <div className="bg-gradient-to-r from-[#0D2035] via-[#0D1526] to-[#111D33] border border-[#0EA5E9]/30 rounded-2xl p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] rounded">
                    FLIPCYCLE EA v2.1 PRO
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#0EA5E9]/20 text-[#0EA5E9] rounded">
                    SYNTHETIC &amp; GOLD SCALPER
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-black text-white">
                  Automated High-Frequency Trailing Stop Algorithm
                </h2>
                <p className="text-xs text-[#8BA3C7] max-w-2xl">
                  Executes micro-scalp positions on BOOM_100 and XAUUSD with dynamic slippage guards, institutional liquidity sweep entry, and automated trailing profit stops.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={toggleBot}
                  className={`px-6 py-3 rounded-xl font-extrabold text-sm shadow-xl transition-all flex items-center gap-2 ${
                    botActive
                      ? 'bg-[#10B981] text-black shadow-[#10B981]/25 hover:bg-[#34D399]'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {botActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{botActive ? 'PAUSE BOT' : 'START BOT'}</span>
                </button>
              </div>
            </div>

            {/* 4 Bot Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Win Rate</div>
                <div className="font-serif text-2xl font-black text-[#10B981] mt-1">94.7%</div>
                <div className="text-xs text-[#4A6080] mt-1">1,420 Trades Analyzed</div>
              </div>

              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Max Drawdown</div>
                <div className="font-serif text-2xl font-black text-[#0EA5E9] mt-1">-3.8%</div>
                <div className="text-xs text-[#4A6080] mt-1">Equity Guard Hard Limit</div>
              </div>

              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Profit Factor</div>
                <div className="font-serif text-2xl font-black text-[#F59E0B] mt-1">2.14</div>
                <div className="text-xs text-[#4A6080] mt-1">Reward to Risk Ratio</div>
              </div>

              <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-xl p-5">
                <div className="text-[11px] text-[#4A6080] font-bold uppercase tracking-wider">Risk Profile</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {(['Conservative', 'Balanced', 'Aggressive'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBotRiskMode(mode)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                        botRiskMode === mode
                          ? 'bg-[#0EA5E9] text-black'
                          : 'bg-[#080D1A] text-[#8BA3C7] hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Bot Console Terminal */}
            <div className="bg-[#0D1526] border border-[#63B3FF]/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">💻 Algorithmic Decision Stream</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <button
                  onClick={triggerManualBotTrade}
                  className="px-3 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9] hover:bg-[#0EA5E9]/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Force Trigger Scalp</span>
                </button>
              </div>

              <div className="bg-[#050810] border border-[#63B3FF]/10 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs space-y-2">
                {botLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#4A6080] shrink-0">[{log.timestamp}]</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 uppercase ${
                        log.type === 'profit'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : log.type === 'trade'
                          ? 'bg-[#0EA5E9]/20 text-[#0EA5E9]'
                          : log.type === 'scan'
                          ? 'bg-[#6366F1]/20 text-[#6366F1]'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {log.type}
                    </span>
                    <span
                      className={
                        log.type === 'profit'
                          ? 'text-[#10B981] font-bold'
                          : log.type === 'trade'
                          ? 'text-[#0EA5E9]'
                          : 'text-[#8BA3C7]'
                      }
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════
          MODAL 1: ADD SUB-IB / CLIENT
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1526] border border-[#63B3FF]/20 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#63B3FF]/10">
                <div>
                  <h3 className="font-bold text-white text-base">+ Register New Sub-IB / Client</h3>
                  <p className="text-xs text-[#8BA3C7]">Add downline trader or partner to your network</p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-[#4A6080] hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8BA3C7] mb-1 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={newAccName}
                    onChange={(e) => setNewAccName(e.target.value)}
                    className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0EA5E9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@trade.com"
                      value={newAccEmail}
                      onChange={(e) => setNewAccEmail(e.target.value)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0EA5E9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98000 12345"
                      value={newAccPhone}
                      onChange={(e) => setNewAccPhone(e.target.value)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#0EA5E9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Role Type</label>
                    <select
                      value={newAccRole}
                      onChange={(e) => setNewAccRole(e.target.value as any)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                    >
                      <option value="Sub-IB Partner">Sub-IB Partner (Downline)</option>
                      <option value="Direct Trader">Direct Trader</option>
                      <option value="VIP Client">VIP Client</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Initial Deposit ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={newAccFund}
                      onChange={(e) => setNewAccFund(e.target.value)}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8BA3C7] text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#38BDF8] text-black font-extrabold text-xs shadow-lg shadow-[#0EA5E9]/25"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          MODAL 2: ADD FUNDS TO CLIENT
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {fundClientModal.isOpen && fundClientModal.client && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1526] border border-[#63B3FF]/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#63B3FF]/10">
                <div>
                  <h3 className="font-bold text-white text-base">💰 Add Deposit to Client</h3>
                  <p className="text-xs text-[#8BA3C7]">{fundClientModal.client.name} · MT5: {fundClientModal.client.mt5Login}</p>
                </div>
                <button
                  onClick={() => setFundClientModal({ isOpen: false, client: null, amount: '1000' })}
                  className="p-1 text-[#4A6080] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFundClientSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8BA3C7] mb-1 font-bold">Deposit Amount ($ USD)</label>
                  <input
                    type="number"
                    required
                    min="50"
                    value={fundClientModal.amount}
                    onChange={(e) => setFundClientModal(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white font-mono text-base focus:outline-none"
                  />
                  <span className="text-[10px] text-[#10B981] font-mono mt-1 block">
                    You will instantly earn +${(Number(fundClientModal.amount || 0) * 0.025).toFixed(2)} in IB Commission!
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setFundClientModal({ isOpen: false, client: null, amount: '1000' })}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8BA3C7] text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-black font-extrabold text-xs shadow-lg shadow-[#10B981]/25"
                  >
                    Confirm Deposit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          MODAL 3: CLAIM IB COMMISSION
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {claimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1526] border border-[#F59E0B]/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#63B3FF]/10">
                <div>
                  <h3 className="font-bold text-white text-base">💎 Claim IB Commission</h3>
                  <p className="text-xs text-[#8BA3C7]">Available Wallet Balance: ${user.ibEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <button
                  onClick={() => setClaimModalOpen(false)}
                  className="p-1 text-[#4A6080] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleClaimCommissionSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8BA3C7] mb-1 font-bold">Transfer Target</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setClaimTarget('balance')}
                      className={`p-3 rounded-xl border text-left font-bold ${
                        claimTarget === 'balance'
                          ? 'border-[#0EA5E9] bg-[#0EA5E9]/15 text-white'
                          : 'border-white/10 bg-[#080D1A] text-[#8BA3C7]'
                      }`}
                    >
                      <div>💼 MT5 Live Balance</div>
                      <div className="text-[10px] font-normal text-[#4A6080] mt-0.5">Instant credit for trading</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClaimTarget('withdraw')}
                      className={`p-3 rounded-xl border text-left font-bold ${
                        claimTarget === 'withdraw'
                          ? 'border-[#F59E0B] bg-[#F59E0B]/15 text-white'
                          : 'border-white/10 bg-[#080D1A] text-[#8BA3C7]'
                      }`}
                    >
                      <div>💸 Direct Payout</div>
                      <div className="text-[10px] font-normal text-[#4A6080] mt-0.5">Instant UPI / USDT</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8BA3C7] mb-1 font-bold">Amount to Claim ($ USD)</label>
                  <input
                    type="number"
                    required
                    max={user.ibEarnings}
                    placeholder={`Max: $${user.ibEarnings}`}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white font-mono text-base focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-[#0EA5E9] mt-1 font-mono">
                    <button type="button" onClick={() => setClaimAmount(String(user.ibEarnings))} className="hover:underline">
                      Claim 100% (${user.ibEarnings.toLocaleString()})
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setClaimModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8BA3C7] text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-black font-extrabold text-xs shadow-lg shadow-[#F59E0B]/25"
                  >
                    Process Claim
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          MODAL 4: REAL DEPOSIT / WITHDRAW MODAL
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {quickDepositModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1526] border border-[#63B3FF]/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#63B3FF]/10">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {quickDepositModal.mode === 'deposit' ? '💳 Instant Deposit' : '💸 Instant Withdrawal'}
                  </h3>
                  <p className="text-xs text-[#8BA3C7]">Secure Gateway · ECN Direct Processing</p>
                </div>
                <button
                  onClick={() => setQuickDepositModal({ isOpen: false, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
                  className="p-1 text-[#4A6080] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {quickDepositModal.step === 'success' ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <h4 className="font-bold text-white text-base">Transaction Completed Successfully!</h4>
                  <p className="text-xs text-[#8BA3C7]">Your MT5 balance has been updated immediately.</p>
                </div>
              ) : quickDepositModal.step === 'qr' ? (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-white rounded-xl inline-block mx-auto">
                    {/* Simulated Dynamic UPI QR */}
                    <div className="w-40 h-40 bg-gray-100 flex flex-col items-center justify-center text-black">
                      <QrCode className="w-28 h-28 text-black" />
                      <span className="text-[10px] font-bold font-mono">UPI / NEXUSFX.PAY</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#8BA3C7]">
                    Scan using Google Pay, PhonePe, Paytm, or BHIM. Amount: <span className="text-white font-mono font-bold">${quickDepositModal.amount} USD</span> (₹{(Number(quickDepositModal.amount) * 83.5).toFixed(0)} INR)
                  </div>
                  <button
                    onClick={handleProcessDeposit}
                    className="w-full py-3 bg-[#10B981] hover:bg-[#34D399] text-black font-extrabold text-xs rounded-xl shadow-lg shadow-[#10B981]/25"
                  >
                    I Have Paid (Instant Confirmation)
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProcessDeposit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Select Payment Gateway</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['UPI', 'USDT', 'Card', 'Bank Wire'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setQuickDepositModal(prev => ({ ...prev, method: m }))}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            quickDepositModal.method === m
                              ? 'border-[#0EA5E9] bg-[#0EA5E9]/15 text-white'
                              : 'border-white/10 bg-[#080D1A] text-[#8BA3C7]'
                          }`}
                        >
                          {m === 'UPI' ? '🇮🇳 Instant UPI (QR)' : m === 'USDT' ? '💎 USDT (TRC20)' : m === 'Card' ? '💳 Debit/Credit Card' : '🏦 Bank Wire'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#8BA3C7] mb-1 font-bold">Amount ($ USD)</label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={quickDepositModal.amount}
                      onChange={(e) => setQuickDepositModal(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white font-mono text-base focus:outline-none"
                    />
                  </div>

                  {quickDepositModal.mode === 'withdraw' && (
                    <div>
                      <label className="block text-[#8BA3C7] mb-1 font-bold">Your UPI ID / USDT Address</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. mobile@okhdfcbank or 0x71C..."
                        value={quickDepositModal.upiId}
                        onChange={(e) => setQuickDepositModal(prev => ({ ...prev, upiId: e.target.value }))}
                        className="w-full bg-[#050810] border border-[#63B3FF]/20 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setQuickDepositModal({ isOpen: false, mode: 'deposit', amount: '500', method: 'UPI', upiId: '', usdtAddr: '', txnHash: '', step: 'input' })}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8BA3C7] text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#38BDF8] text-black font-extrabold text-xs shadow-lg shadow-[#0EA5E9]/25"
                    >
                      {quickDepositModal.mode === 'deposit' ? 'Continue to Payment →' : 'Confirm Withdrawal'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
