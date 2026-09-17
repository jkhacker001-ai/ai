export type AccountTier = 'starter' | 'pro' | 'vip';

export interface MarketTicker {
  symbol: string;
  name: string;
  category: 'forex' | 'metals' | 'crypto' | 'indices' | 'commodities';
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  spread: number;
  digits: number;
  history: number[];
}

export interface TradePosition {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  openTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'trading' | 'ib' | 'funding';
}

export interface IBCalculatorState {
  clients: number;
  lotsPerClient: number;
  tierRate: number;
  tierName: AccountTier;
}

export interface ReferralLead {
  id: string;
  clientName: string;
  accountType: string;
  country: string;
  lotsTraded: number;
  commissionEarned: number;
  joinDate: string;
  status: 'Active' | 'Pending' | 'VIP';
}

export interface CopyMaster {
  id: string;
  name: string;
  avatar: string;
  strategy: string;
  winRate: number;
  totalReturn: number;
  drawdown: number;
  copiers: number;
  minDeposit: number;
  riskScore: 'Low' | 'Medium' | 'High';
  verified: boolean;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'AUD';
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  forecast: string;
  previous: string;
  actual?: string;
}

export interface PaymentTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  method: 'UPI' | 'USDT' | 'Card' | 'Bank Wire';
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending';
  date: string;
  txnHash?: string;
}

export interface SubIBAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  mt5Login: string;
  role: 'Sub-IB Partner' | 'Direct Trader' | 'VIP Client';
  accountType: string;
  level: number;
  sponsorCode: string;
  fundDeposited: number;
  equity: number;
  lotsTraded: number;
  commissionGenerated: number;
  joinDate: string;
  country: string;
  status: 'Active' | 'VIP' | 'Pending';
  subAccounts?: SubIBAccount[];
}

export interface UserAccountState {
  fullName: string;
  email: string;
  phone: string;
  accountMode: 'real' | 'demo';
  accountTier: AccountTier;
  mt5Login: string;
  mt5Server: string;
  mt5Pass: string;
  balance: number;
  equity: number;
  leverage: string;
  referralCode: string;
  sponsorIBCode: string;
  ibEarnings: number;
}

export interface TradingBot {
  id: string;
  name: string;
  version: string;
  category: 'Scalping' | 'Grid & Martingale' | 'Smart Money' | 'HFT Arbitrage' | 'Trend Following';
  symbol: string;
  timeframe: string;
  winRate: number;
  monthlyRoi: number;
  maxDrawdown: number;
  tradesExecuted: number;
  riskLevel: 'Conservative' | 'Moderate' | 'Aggressive';
  minCapital: number;
  status: 'ACTIVE' | 'PAUSED' | 'IDLE';
  description: string;
  algorithmSpecs: string[];
  recommendedPairs: string[];
}

export interface InvestorPackage {
  id: string;
  amount: number;
  dailyRoiPercent: number;
  dailyRoiAmount: number;
  activatedDate: string;
  txHash: string;
  status: 'Active' | 'Settled';
}

export interface ClosedTrade {
  id: string;
  ticket: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  openTime: string;
  closeTime: string;
  source: 'MANUAL' | 'BOT' | 'COPY';
  reason?: 'TP' | 'SL' | 'MANUAL' | 'TS_TRAIL' | 'FLIP_SELL' | 'FLIP_BUY';
}

export interface BotLogItem {
  id: string;
  timestamp: string;
  type: 'info' | 'trade' | 'profit' | 'warning' | 'scan';
  message: string;
  symbol?: string;
  profit?: number;
}


