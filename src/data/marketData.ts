import { MarketTicker, Testimonial, FAQItem, ReferralLead, CopyMaster, EconomicEvent, TradingBot } from '../types';

export const TRADING_BOTS: TradingBot[] = [
  {
    id: 'bot-1',
    name: 'Nexus Gold Bot Pro',
    version: 'v5.4 ECN',
    category: 'Scalping',
    symbol: 'XAUUSD',
    timeframe: 'M5',
    winRate: 92.4,
    monthlyRoi: 28.5,
    maxDrawdown: 3.8,
    tradesExecuted: 1420,
    riskLevel: 'Conservative',
    minCapital: 200,
    status: 'ACTIVE',
    description: 'High-frequency algorithmic EA built for XAUUSD Gold. Detects institutional liquidity spikes during London and NY session overlaps.',
    algorithmSpecs: [
      'Institutional Liquidity Pool Sweep Detection',
      'Dynamic Slippage & Spread Filter (<0.3 pips)',
      'Automated Trailing Stop Loss & Partial Take Profit',
      'ECN Direct Market Bridge Execution'
    ],
    recommendedPairs: ['XAUUSD', 'GBPUSD', 'EURUSD']
  },
  {
    id: 'bot-2',
    name: 'Quantum SMC Smart Money EA',
    version: 'v3.1 AI',
    category: 'Smart Money',
    symbol: 'EURUSD',
    timeframe: 'M15',
    winRate: 88.7,
    monthlyRoi: 22.0,
    maxDrawdown: 2.5,
    tradesExecuted: 890,
    riskLevel: 'Conservative',
    minCapital: 300,
    status: 'ACTIVE',
    description: 'Identifies Bank Order Blocks, Fair Value Gaps (FVG), and Asian Liquidity Sweeps with precise risk-reward entry limits.',
    algorithmSpecs: [
      'FVG & Imbalance Area Auto Mapping',
      'Bank Manipulation Volume Spike Analyzer',
      'Fixed 1:3 Minimum Risk-to-Reward Ratio',
      'No Martingale or Grid Risk'
    ],
    recommendedPairs: ['EURUSD', 'GBPUSD', 'USDJPY']
  },
  {
    id: 'bot-3',
    name: 'Martingale Shield EA',
    version: 'v4.0 Safety',
    category: 'Grid & Martingale',
    symbol: 'GBPUSD',
    timeframe: 'H1',
    winRate: 85.2,
    monthlyRoi: 35.0,
    maxDrawdown: 5.2,
    tradesExecuted: 2150,
    riskLevel: 'Moderate',
    minCapital: 500,
    status: 'IDLE',
    description: 'Smart Grid bot with strict Equity Stop Loss Protection. Combines RSI overbought/oversold levels with dynamic hedging.',
    algorithmSpecs: [
      'Hard Equity Safeguard Cutoff (Max 5% DD)',
      'Dynamic Volatility Grid Spacing',
      'RSI Multi-Timeframe Divergence Filter',
      'Automated Swap & Roll-over Defense'
    ],
    recommendedPairs: ['GBPUSD', 'AUDUSD', 'USDCAD']
  },
  {
    id: 'bot-4',
    name: 'HFT Crypto Arbitrage Bot',
    version: 'v2.8 Nano',
    category: 'HFT Arbitrage',
    symbol: 'BTCUSD',
    timeframe: 'M1',
    winRate: 94.1,
    monthlyRoi: 41.2,
    maxDrawdown: 1.9,
    tradesExecuted: 5600,
    riskLevel: 'Aggressive',
    minCapital: 100,
    status: 'ACTIVE',
    description: 'Ultra high-speed arbitrage engine that exploits microsecond price discrepancies across global crypto exchanges.',
    algorithmSpecs: [
      '< 5ms Low-Latency WebSocket Execution',
      'Cross-Exchange Price Spread Hunter',
      'Zero Overnight Exposure Safety Rule',
      'AI Volatility Trend Adaptation'
    ],
    recommendedPairs: ['BTCUSD', 'ETHUSD']
  },
  {
    id: 'bot-5',
    name: 'Alpha Trend Rider Bot',
    version: 'v6.0 Macro',
    category: 'Trend Following',
    symbol: 'NAS100',
    timeframe: 'H4',
    winRate: 86.8,
    monthlyRoi: 19.5,
    maxDrawdown: 3.2,
    tradesExecuted: 420,
    riskLevel: 'Conservative',
    minCapital: 250,
    status: 'IDLE',
    description: 'Macro momentum robot designed for US Stock Indices and Commodities. Trades strong breakouts with adaptive trailing stops.',
    algorithmSpecs: [
      'SuperTrend & Moving Average Ribbon Cross',
      'Economic News Risk Filter',
      'Volatility Stop Adjustment',
      'High Reward Factor Strategy'
    ],
    recommendedPairs: ['NAS100', 'WTI', 'XAUUSD']
  }
];

export const COPY_TRADING_MASTERS: CopyMaster[] = [
  {
    id: 'master-1',
    name: 'Alpha Gold FX Scalper',
    avatar: 'AG',
    strategy: 'XAUUSD High-Frequency London Breakout & Grid',
    winRate: 89.4,
    totalReturn: 342.8,
    drawdown: 4.2,
    copiers: 1240,
    minDeposit: 200,
    riskScore: 'Low',
    verified: true
  },
  {
    id: 'master-2',
    name: 'Sovereign EUR/USD Algo',
    avatar: 'SA',
    strategy: 'Smart Money Concepts & Liquidity Sweeps',
    winRate: 91.2,
    totalReturn: 512.0,
    drawdown: 3.1,
    copiers: 2890,
    minDeposit: 500,
    riskScore: 'Low',
    verified: true
  },
  {
    id: 'master-3',
    name: 'Crypto Momentum Alpha',
    avatar: 'CM',
    strategy: 'Bitcoin & ETH Trend-Following Volatility Arbitrage',
    winRate: 83.5,
    totalReturn: 280.4,
    drawdown: 6.8,
    copiers: 980,
    minDeposit: 100,
    riskScore: 'Medium',
    verified: true
  },
  {
    id: 'master-4',
    name: 'Asia Session Indices Hunter',
    avatar: 'AH',
    strategy: 'Nikkei & NASDAQ Range Trading Arbitrage',
    winRate: 87.8,
    totalReturn: 195.6,
    drawdown: 2.9,
    copiers: 1420,
    minDeposit: 300,
    riskScore: 'Low',
    verified: true
  }
];

export const ECONOMIC_CALENDAR_EVENTS: EconomicEvent[] = [
  {
    id: 'eco-1',
    time: '12:30 GMT',
    currency: 'USD',
    event: 'US Non-Farm Payrolls (NFP) Employment Report',
    impact: 'High',
    forecast: '185K',
    previous: '206K',
    actual: '215K'
  },
  {
    id: 'eco-2',
    time: '14:00 GMT',
    currency: 'USD',
    event: 'ISM Services Purchasing Managers Index (PMI)',
    impact: 'High',
    forecast: '52.5',
    previous: '50.8'
  },
  {
    id: 'eco-3',
    time: '18:00 GMT',
    currency: 'USD',
    event: 'Federal Open Market Committee (FOMC) Rate Statement',
    impact: 'High',
    forecast: '5.25%',
    previous: '5.25%'
  },
  {
    id: 'eco-4',
    time: '08:30 GMT',
    currency: 'EUR',
    event: 'ECB President Lagarde Speech on Inflation Targets',
    impact: 'Medium',
    forecast: '3.1%',
    previous: '3.3%'
  },
  {
    id: 'eco-5',
    time: '05:00 GMT',
    currency: 'INR',
    event: 'RBI Monetary Policy Interest Rate Decision',
    impact: 'High',
    forecast: '6.50%',
    previous: '6.50%',
    actual: '6.50%'
  }
];

export const INITIAL_TICKERS: MarketTicker[] = [
  {
    symbol: 'XAUUSD',
    name: 'Gold / US Dollar',
    category: 'metals',
    price: 2374.50,
    change: 28.90,
    changePercent: 1.24,
    high: 2382.10,
    low: 2345.80,
    spread: 0.1,
    digits: 2,
    history: [2350, 2355, 2362, 2358, 2368, 2371, 2374.50]
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    category: 'forex',
    price: 1.0842,
    change: 0.0019,
    changePercent: 0.18,
    high: 1.0860,
    low: 1.0815,
    spread: 0.2,
    digits: 4,
    history: [1.0820, 1.0825, 1.0831, 1.0828, 1.0838, 1.0842]
  },
  {
    symbol: 'GBPUSD',
    name: 'Great Britain Pound / USD',
    category: 'forex',
    price: 1.2691,
    change: -0.0011,
    changePercent: -0.09,
    high: 1.2720,
    low: 1.2675,
    spread: 0.4,
    digits: 4,
    history: [1.2710, 1.2705, 1.2698, 1.2695, 1.2691]
  },
  {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    price: 157.23,
    change: 0.48,
    changePercent: 0.31,
    high: 157.60,
    low: 156.70,
    spread: 0.3,
    digits: 2,
    history: [156.80, 156.95, 157.10, 157.05, 157.23]
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    category: 'crypto',
    price: 67420,
    change: 1410,
    changePercent: 2.14,
    high: 68100,
    low: 65900,
    spread: 12.0,
    digits: 0,
    history: [65800, 66200, 66900, 66500, 67100, 67420]
  },
  {
    symbol: 'NAS100',
    name: 'NASDAQ 100 Index',
    category: 'indices',
    price: 18940,
    change: -80,
    changePercent: -0.42,
    high: 19080,
    low: 18890,
    spread: 1.0,
    digits: 0,
    history: [19020, 19000, 18970, 18950, 18940]
  },
  {
    symbol: 'WTI',
    name: 'US Crude Oil',
    category: 'commodities',
    price: 78.45,
    change: 0.59,
    changePercent: 0.76,
    high: 79.10,
    low: 77.80,
    spread: 0.03,
    digits: 2,
    history: [77.90, 78.10, 78.30, 78.20, 78.45]
  },
  {
    symbol: 'USDINR',
    name: 'US Dollar / Indian Rupee',
    category: 'forex',
    price: 83.62,
    change: -0.10,
    changePercent: -0.12,
    high: 83.80,
    low: 83.55,
    spread: 0.02,
    digits: 2,
    history: [83.75, 83.70, 83.68, 83.65, 83.62]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    location: 'Mumbai, India',
    role: 'Pro IB Partner',
    rating: 5,
    text: 'Maine NexusFX ka IB program join kiya aur 6 mahine mein meri income ₹8 lakh per month ho gayi. Instant automated payouts and custom tracking links make client management seamless.',
    avatar: 'RK'
  },
  {
    id: 't2',
    name: 'Ahmed Al-Sayed',
    location: 'Dubai, UAE',
    role: 'VIP Trader & Wealth Manager',
    rating: 5,
    text: 'Spreads on Gold are genuinely 0.1 pips during London & NY sessions. My scalping EAs run flawlessly without slippage. The institutional ECN bridge execution speed is outstanding.',
    avatar: 'AS'
  },
  {
    id: 't3',
    name: 'Suresh Patel',
    location: 'Gujarat, India',
    role: 'Community Lead & IB Partner',
    rating: 5,
    text: 'As a Telegram community manager, NexusFX\'s IB program let me monetize my 15K trading community. I earn $3,500+ monthly in passive commissions without taking direct market risks.',
    avatar: 'SP'
  },
  {
    id: 't4',
    name: 'Elena Rostova',
    location: 'Limassol, Cyprus',
    role: 'Algorithmic Trader',
    rating: 5,
    text: 'Zero-fee deposits and withdrawals via Crypto and Bank Wire. The MT5 bridge integration with custom Python WebSockets allows seamless automated position management.',
    avatar: 'ER'
  },
  {
    id: 't5',
    name: 'David Chen',
    location: 'Singapore',
    role: 'Master IB Partner',
    rating: 5,
    text: 'Managing sub-IB networks across Southeast Asia is effortless with NexusFX. Multi-level commissions, customizable marketing kits, and 24/7 dedicated partner support.',
    avatar: 'DC'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What is an Introducing Broker (IB) Program?',
    answer: 'An Introducing Broker (IB) program allows partners to earn ongoing rebate commissions by referring new traders to NexusFX. Every time your referred client opens a trade on Forex, Gold, Crypto, or Indices, you earn a fixed rate per lot or a percentage revenue share, paid directly into your wallet.',
    category: 'ib'
  },
  {
    id: 'f2',
    question: 'How much can I earn as a NexusFX IB Partner?',
    answer: 'Earning potential is completely uncapped! Depending on your partner tier, you earn up to $15 per lot on Forex, $8 per lot on Gold, and up to 40% VIP revenue share. For example, 50 clients trading 20 lots each per month generates $12,000/month in passive income.',
    category: 'ib'
  },
  {
    id: 'f3',
    question: 'What are the minimum deposit requirements for trading accounts?',
    answer: 'NexusFX offers flexible account tiers: Starter Account starts at just $50, Pro Account at $500, and VIP Account at $5,000. All accounts come with negative balance protection and access to MetaTrader 5 & our Web Terminal.',
    category: 'trading'
  },
  {
    id: 'f4',
    question: 'How fast are withdrawals processed?',
    answer: 'Withdrawals are processed instantly for crypto e-wallets (USDT, BTC) and local banking methods (UPI, NetBanking, FAST). Bank wire transfers take 1-2 business days. NexusFX charges zero internal withdrawal fees.',
    category: 'funding'
  },
  {
    id: 'f5',
    question: 'Are client funds segregated and safe?',
    answer: 'Yes. All client funds are held in Tier-1 segregated bank accounts, separate from company operational capital. NexusFX is fully regulated across multiple jurisdictions with strict compliance and investor compensation insurance.',
    category: 'general'
  },
  {
    id: 'f6',
    question: 'Can I use Automated Trading & Expert Advisors (EAs)?',
    answer: 'Absolutely! All NexusFX account types support automated trading, EAs, high-frequency scalping, news trading, and hedging with ultra-low latency ECN execution.',
    category: 'trading'
  }
];

export const SAMPLE_REFERRAL_LEADS: ReferralLead[] = [
  { id: 'lead-1', clientName: 'Vikram Singh', accountType: 'Pro Account', country: 'India 🇮🇳', lotsTraded: 42.5, commissionEarned: 510, joinDate: '2026-08-01', status: 'Active' },
  { id: 'lead-2', clientName: 'Tariq Mansoor', accountType: 'VIP Account', country: 'UAE 🇦🇪', lotsTraded: 120.0, commissionEarned: 1800, joinDate: '2026-07-28', status: 'VIP' },
  { id: 'lead-3', clientName: 'Marco Rossi', accountType: 'Starter Account', country: 'Italy 🇮🇹', lotsTraded: 14.2, commissionEarned: 113.6, joinDate: '2026-08-05', status: 'Active' },
  { id: 'lead-4', clientName: 'Ananya Sharma', accountType: 'Pro Account', country: 'India 🇮🇳', lotsTraded: 88.0, commissionEarned: 1056, joinDate: '2026-07-15', status: 'Active' },
  { id: 'lead-5', clientName: 'Kenji Sato', accountType: 'VIP Account', country: 'Japan 🇯🇵', lotsTraded: 210.0, commissionEarned: 3150, joinDate: '2026-06-20', status: 'VIP' }
];

export const INITIAL_IB_TREE_STRUCTURE = [
  {
    id: 'sub-ib-1',
    name: 'Rohit Sharma (Apex Capital IB)',
    email: 'rohit.apex@nexusfx.trade',
    phone: '+91 98112 34567',
    mt5Login: '7091101',
    role: 'Sub-IB Partner' as const,
    accountType: 'Sub-IB Master Tier 1',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 35000,
    equity: 36850,
    lotsTraded: 340.5,
    commissionGenerated: 5107.5,
    joinDate: '2026-07-10',
    country: 'India 🇮🇳',
    status: 'VIP' as const,
    subAccounts: [
      {
        id: 'child-1-1',
        name: 'Aakash Verma',
        email: 'aakash.v@gmail.com',
        phone: '+91 98223 11223',
        mt5Login: '7092210',
        role: 'Direct Trader' as const,
        accountType: 'Pro ECN Account',
        level: 2,
        sponsorCode: 'IB-ROHIT01',
        fundDeposited: 15000,
        equity: 16200,
        lotsTraded: 110.0,
        commissionGenerated: 1650.0,
        joinDate: '2026-07-15',
        country: 'India 🇮🇳',
        status: 'Active' as const
      },
      {
        id: 'child-1-2',
        name: 'Pooja Singhania',
        email: 'pooja.s@finvest.in',
        phone: '+91 98771 99881',
        mt5Login: '7092215',
        role: 'VIP Client' as const,
        accountType: 'VIP Institutional',
        level: 2,
        sponsorCode: 'IB-ROHIT01',
        fundDeposited: 25000,
        equity: 27400,
        lotsTraded: 185.0,
        commissionGenerated: 2775.0,
        joinDate: '2026-07-22',
        country: 'India 🇮🇳',
        status: 'VIP' as const
      },
      {
        id: 'child-1-3',
        name: 'Vikram Malhotra',
        email: 'v.malhotra@yahoo.com',
        phone: '+91 99341 55667',
        mt5Login: '7092219',
        role: 'Direct Trader' as const,
        accountType: 'Pro ECN Account',
        level: 2,
        sponsorCode: 'IB-ROHIT01',
        fundDeposited: 8500,
        equity: 8900,
        lotsTraded: 45.5,
        commissionGenerated: 682.5,
        joinDate: '2026-08-01',
        country: 'India 🇮🇳',
        status: 'Active' as const
      }
    ]
  },
  {
    id: 'sub-ib-2',
    name: 'Tariq Al-Mansoor (Gulf Prime IB)',
    email: 'tariq.gulf@nexusfx.trade',
    phone: '+971 50 123 4567',
    mt5Login: '7091204',
    role: 'Sub-IB Partner' as const,
    accountType: 'Sub-IB Regional Hub',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 45000,
    equity: 48200,
    lotsTraded: 420.0,
    commissionGenerated: 6300.0,
    joinDate: '2026-07-02',
    country: 'UAE 🇦🇪',
    status: 'VIP' as const,
    subAccounts: [
      {
        id: 'child-2-1',
        name: 'Kareem Al-Hassan',
        email: 'kareem.h@dubaitrade.ae',
        phone: '+971 55 987 6543',
        mt5Login: '7093301',
        role: 'VIP Client' as const,
        accountType: 'VIP Institutional',
        level: 2,
        sponsorCode: 'IB-TARIQ01',
        fundDeposited: 30000,
        equity: 33100,
        lotsTraded: 210.0,
        commissionGenerated: 3150.0,
        joinDate: '2026-07-12',
        country: 'UAE 🇦🇪',
        status: 'VIP' as const
      },
      {
        id: 'child-2-2',
        name: 'Zayn Al-Bakri',
        email: 'zayn.bakri@investme.com',
        phone: '+971 52 443 2211',
        mt5Login: '7093305',
        role: 'Direct Trader' as const,
        accountType: 'Pro ECN Account',
        level: 2,
        sponsorCode: 'IB-TARIQ01',
        fundDeposited: 12000,
        equity: 12450,
        lotsTraded: 90.0,
        commissionGenerated: 1350.0,
        joinDate: '2026-07-28',
        country: 'UAE 🇦🇪',
        status: 'Active' as const
      }
    ]
  },
  {
    id: 'direct-trader-1',
    name: 'Suresh Patel (Algo Pro Trader)',
    email: 'suresh.algo@gmail.com',
    phone: '+91 94261 88990',
    mt5Login: '7091305',
    role: 'Direct Trader' as const,
    accountType: 'Pro ECN Account',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 18500,
    equity: 19800,
    lotsTraded: 135.0,
    commissionGenerated: 2025.0,
    joinDate: '2026-07-18',
    country: 'India 🇮🇳',
    status: 'Active' as const
  },
  {
    id: 'direct-trader-2',
    name: 'Ananya Mehta (Scalper VIP)',
    email: 'ananya.m@capitalgrowth.in',
    phone: '+91 98200 44556',
    mt5Login: '7091409',
    role: 'VIP Client' as const,
    accountType: 'VIP Institutional',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 28000,
    equity: 31200,
    lotsTraded: 195.0,
    commissionGenerated: 2925.0,
    joinDate: '2026-07-25',
    country: 'India 🇮🇳',
    status: 'VIP' as const
  },
  {
    id: 'direct-trader-3',
    name: 'Deepak Joshi',
    email: 'deepak.fx@outlook.com',
    phone: '+91 98980 12345',
    mt5Login: '7091512',
    role: 'Direct Trader' as const,
    accountType: 'Starter Account',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 3500,
    equity: 3750,
    lotsTraded: 32.5,
    commissionGenerated: 487.5,
    joinDate: '2026-08-04',
    country: 'India 🇮🇳',
    status: 'Active' as const
  },
  {
    id: 'direct-trader-4',
    name: 'Marco Rossi',
    email: 'marco.rossi@milanotrading.it',
    phone: '+39 02 1234 5678',
    mt5Login: '7091620',
    role: 'Direct Trader' as const,
    accountType: 'Pro ECN Account',
    level: 1,
    sponsorCode: 'IB-MASTER99',
    fundDeposited: 9500,
    equity: 9800,
    lotsTraded: 68.0,
    commissionGenerated: 1020.0,
    joinDate: '2026-08-08',
    country: 'Italy 🇮🇹',
    status: 'Active' as const
  }
];
