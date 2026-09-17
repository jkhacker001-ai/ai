import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, TrendingUp, DollarSign, 
  Users, Award, ChevronDown, CheckCircle2, Star, Clock, 
  Lock, RefreshCw, BarChart2, Globe, Sparkles, ExternalLink,
  Smartphone, Wallet, ArrowUpRight, Activity, Cpu, Check
} from 'lucide-react';
import { SmoothAnimatedBackground } from './SmoothAnimatedBackground';

interface TraderDaddyLandingPageProps {
  onLaunchDashboard: () => void;
  onSelectAmount?: (amt: number) => void;
}

export const TraderDaddyLandingPage: React.FC<TraderDaddyLandingPageProps> = ({ 
  onLaunchDashboard,
  onSelectAmount
}) => {
  // Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  
  // Live settlement countdown
  const [settlementTime, setSettlementTime] = useState('--:--:--');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date();
      end.setUTCHours(24, 0, 0, 0);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setSettlementTime('00 : 00 : 00');
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setSettlementTime(`${h} : ${m} : ${s}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live fluctuating markets
  const [markets, setMarkets] = useState([
    { sym: 'XAUUSD', name: 'Gold Spot', price: 2648.30, chg: '+0.45%', up: true },
    { sym: 'NAS100', name: 'Nasdaq 100', price: 29461.0, chg: '+0.02%', up: true },
    { sym: 'US30', name: 'Wall Street 30', price: 53454.5, chg: '-0.19%', up: false },
    { sym: 'EURUSD', name: 'Euro / US Dollar', price: 1.0842, chg: '+0.08%', up: true },
    { sym: 'BTCUSD', name: 'Bitcoin', price: 95230.0, chg: '+1.24%', up: true },
    { sym: 'GBPUSD', name: 'British Pound', price: 1.2718, chg: '-0.12%', up: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => {
        const delta = (Math.random() - 0.48) * 0.03;
        const currentNum = parseFloat(m.chg);
        const newNum = (currentNum + delta).toFixed(2);
        return {
          ...m,
          chg: (parseFloat(newNum) >= 0 ? '+' : '') + newNum + '%',
          up: parseFloat(newNum) >= 0
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic ROI
  const getRoiDetails = (amt: number) => {
    let pct = 0.8;
    let tierName = 'Starter Tier';
    if (amt >= 5000) {
      pct = 2.0;
      tierName = 'VIP Elite Tier';
    } else if (amt >= 2000) {
      pct = 1.5;
      tierName = 'Advanced Tier';
    } else if (amt >= 1000) {
      pct = 1.25;
      tierName = 'Executive Tier';
    } else if (amt >= 500) {
      pct = 1.0;
      tierName = 'Growth Tier';
    }

    const daily = (amt * pct) / 100;
    const weekly = daily * 5; // Mon-Fri
    const monthly = daily * 22; // 22 trading days
    const yearly = daily * 260; // 260 trading days

    return { pct, tierName, daily, weekly, monthly, yearly };
  };

  const currentRoi = getRoiDetails(calcAmount);

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is daily ROI generated from Forex trading?',
      a: 'TraderDaddy utilizes institutional quantitative EA algorithms and high-frequency trading (HFT) across major liquidity pairs (XAUUSD, EURUSD, US30) to capture spread arbitrage and intraday trends with strict risk mitigation. ROI is credited every Monday through Friday at 00:00 UTC.'
    },
    {
      q: 'Why is there no ROI on Saturday and Sunday?',
      a: 'Global interbank forex and institutional financial markets are officially closed on weekends. TraderDaddy trades real live market liquidity and operates with 100% transparency — no simulated weekend numbers.'
    },
    {
      q: 'When and how can I withdraw my principal investment?',
      a: 'Your initial investment capital is 100% liquid and withdrawable. When requested through the dashboard, capital release is processed and verified on-chain within 72 hours subject to market settlement protocols.'
    },
    {
      q: 'How does the 10% Direct Referral & 7-Level Affiliate income work?',
      a: 'When you share your personal referral link, you receive a 10% direct cash bonus once your referred partner maintains their package for 30 qualifying days. Additionally, you unlock up to 7 tiers of daily downline ROI royalties (20% at Level 1, 10% at L2 & L3, down to 2% at L7).'
    },
    {
      q: 'Which network is used for USDT deposits and withdrawals?',
      a: 'All deposits and payouts are processed via USDT on the BNB Smart Chain (BEP20) for lightning-fast blockchain confirmations and ultra-low gas fees (<$0.05).'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0F172A] font-sans relative antialiased selection:bg-[#0284C7] selection:text-white overflow-x-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════════
          ULTRA-SMOOTH ANIMATED BACKGROUND SYSTEM (CANVAS + AURORA + BADGES)
         ══════════════════════════════════════════════════════════════════════ */}
      <SmoothAnimatedBackground />

      {/* ══════════════════════════════════════════════════════════════════════
          TOP UTILITY & ANNOUNCEMENT BAR
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0F172A] text-white px-4 py-2.5 text-xs border-b border-white/10 sticky top-0 z-[60]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold text-[#38BDF8]">TraderDaddy Live Engine</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/80">BEP20 USDT Deposits &amp; 72h Principal Liquidity</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden md:flex items-center gap-1.5 text-white/70">
              <span>Next Settlement:</span>
              <span className="font-mono font-bold text-[#38BDF8]">{settlementTime}</span>
            </div>
            <button
              onClick={onLaunchDashboard}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN HEADER / NAVIGATION BAR
         ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-[37px] z-50 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] via-[#2563EB] to-[#4F46E5] flex items-center justify-center text-xl font-black shadow-lg shadow-[#0284C7]/25 text-white">
              📊
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-[#0F172A] flex items-center gap-1">
                Trader<span className="text-[#0284C7]">Daddy</span>
                <span className="text-[9px] uppercase tracking-widest bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 px-1.5 py-0.5 rounded font-bold ml-1">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-[#64748B] font-medium tracking-wider">
                Institutional Forex Engine
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-[#64748B]">
            <a href="#roi-plans" className="hover:text-[#0284C7] transition-colors">ROI Plans</a>
            <a href="#calculator" className="hover:text-[#0284C7] transition-colors">Earnings Calculator</a>
            <a href="#affiliate" className="hover:text-[#0284C7] transition-colors">7-Level Affiliate</a>
            <a href="#rewards" className="hover:text-[#0284C7] transition-colors">Rewards Ladder</a>
            <a href="#how-it-works" className="hover:text-[#0284C7] transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-[#0284C7] transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchDashboard}
              className="relative group overflow-hidden bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#4F46E5] text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-[#0284C7]/25 hover:shadow-xl hover:shadow-[#0284C7]/40 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0284C7]/10 border border-[#0284C7]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0284C7]">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Institutional Forex Algorithmic ROI Engine 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.12]">
              Grow Your Capital With <span className="bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Daily Automated ROI</span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
              Earn <strong className="text-[#0F172A] font-bold">0.8% to 2.0% daily returns (Monday through Friday)</strong> powered by institutional forex quantitative algorithms. Deposit easily via BEP20 USDT, keep full 72-hour principal liquidity, and earn 10% direct + 7-level team royalties.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onLaunchDashboard}
                className="bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#4F46E5] hover:opacity-95 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#0284C7]/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Launch Interactive Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#calculator"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] px-7 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <BarChart2 className="w-4 h-4 text-[#0284C7]" />
                <span>Calculate Earnings</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 text-xs">
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-2xl shadow-sm flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="font-bold text-[#334155]">BEP20 Verified</span>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-2xl shadow-sm flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span className="font-bold text-[#334155]">Mon–Fri Payout</span>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-2xl shadow-sm flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span className="font-bold text-[#334155]">Up to 2.0% Daily</span>
              </div>
              <div className="bg-white/80 border border-slate-200/80 p-3 rounded-2xl shadow-sm flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="font-bold text-[#334155]">10% Direct + 7 Levels</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hero Preview Card (Matches Dashboard Aesthetic) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Glow backdrop */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0284C7]/40 via-[#6366F1]/30 to-[#06B6D4]/30 rounded-[34px] blur-xl opacity-70 group-hover:opacity-100 transition duration-700" />
              
              {/* Main Card (Styled exactly like TraderDaddy Portfolio Card) */}
              <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-black text-[#0284C7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE PREVIEW DEMO
                    </div>
                    <h3 className="text-xl font-black text-[#0F172A] flex items-center gap-1.5">
                      <span>Forex Portfolio</span>
                      <span className="text-xs text-[#94A3B8] font-normal">ⓘ</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold mt-1">
                      <span>HIGH-FREQUENCY TRADING ACTIVE</span>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 flex items-center justify-center text-2xl shadow-sm">
                    📈
                  </div>
                </div>

                {/* Balance */}
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-slate-200/80 rounded-2xl p-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Sample Account Balance
                  </div>
                  <div className="text-4xl font-black font-mono text-[#0F172A]">
                    12,540.00 <span className="text-sm font-bold text-[#0284C7]">USDT</span>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-[9px] uppercase font-bold text-[#64748B]">Today's ROI</div>
                    <div className="text-sm font-black font-mono text-emerald-600 mt-0.5">+150.00</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-[9px] uppercase font-bold text-[#64748B]">Direct Bonus</div>
                    <div className="text-sm font-black font-mono text-[#D97706] mt-0.5">850.00</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-[9px] uppercase font-bold text-[#64748B]">Principal</div>
                    <div className="text-sm font-black font-mono text-[#0284C7] mt-0.5">Liquid 72h</div>
                  </div>
                </div>

                {/* Settlement Countdown */}
                <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#475569]">
                    <span>⏱</span>
                    <span>Next Settlement In</span>
                  </div>
                  <div className="font-mono text-base font-black text-[#0284C7]">
                    {settlementTime}
                  </div>
                </div>

                {/* Quick Launch inside hero card */}
                <button
                  onClick={onLaunchDashboard}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] hover:opacity-95 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0284C7]/20"
                >
                  <span>Experience Interactive Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          LIVE MARKETS TICKER RIBBON (LIGHT DASHBOARD THEME)
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-slate-200/80 bg-white/90 backdrop-blur-md py-3.5 overflow-hidden shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xs text-[#0284C7] whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE INTERBANK FEEDS</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar flex-1">
            {markets.map(m => (
              <div key={m.sym} className="flex items-center gap-2.5 whitespace-nowrap text-xs font-mono bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-xl">
                <span className="font-bold text-[#0F172A]">{m.sym}</span>
                <span className="text-[#64748B]">{m.price.toLocaleString()}</span>
                <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${m.up ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                  {m.chg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: ROI PLANS OVERVIEW
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="roi-plans" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3.5 py-1 rounded-full border border-[#0284C7]/20">
              Transparent Returns
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Forex Investment Return Tiers
            </h2>
            <p className="text-sm text-[#64748B]">
              Choose from 5 institutional algorithmic tiers. Every package connects directly to Tier-1 liquidity bridges with automatic daily ROI credit (Monday to Friday).
            </p>
          </div>

          {/* 5 Tier Cards in Light Mode Dashboard Palette */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Tier 1 */}
            <div className="bg-white border border-slate-200/90 hover:border-[#0284C7]/60 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
              <div>
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  Starter
                </span>
                <div className="text-3xl font-black font-mono text-[#0F172A] mt-2 mb-1">0.80%</div>
                <div className="text-xs text-[#0284C7] font-bold">Daily (Mon–Fri)</div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="text-xs text-[#64748B] space-y-2">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <strong className="text-[#0F172A]">50 – 499 USDT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly ROI:</span>
                    <strong className="text-emerald-600 font-bold">~17.6%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong className="text-[#0284C7]">Liquid 72h</strong>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { onSelectAmount?.(100); onLaunchDashboard(); }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-[#0F172A] font-bold text-xs transition-colors"
              >
                Select Starter
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-white border border-slate-200/90 hover:border-[#0284C7]/60 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
              <div>
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  Growth
                </span>
                <div className="text-3xl font-black font-mono text-[#0F172A] mt-2 mb-1">1.00%</div>
                <div className="text-xs text-[#0284C7] font-bold">Daily (Mon–Fri)</div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="text-xs text-[#64748B] space-y-2">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <strong className="text-[#0F172A]">500 – 999 USDT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly ROI:</span>
                    <strong className="text-emerald-600 font-bold">~22.0%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong className="text-[#0284C7]">Liquid 72h</strong>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { onSelectAmount?.(500); onLaunchDashboard(); }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-[#0F172A] font-bold text-xs transition-colors"
              >
                Select Growth
              </button>
            </div>

            {/* Tier 3 (Most Popular - High Contrast Highlight) */}
            <div className="bg-gradient-to-b from-[#E0F2FE]/60 via-white to-white border-2 border-[#0284C7] rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 relative shadow-xl shadow-[#0284C7]/15">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0284C7] text-white text-[9px] font-black uppercase px-3.5 py-0.5 rounded-full shadow">
                Most Popular
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0284C7] tracking-wider bg-sky-100 px-2 py-0.5 rounded-md">
                  Executive
                </span>
                <div className="text-3xl font-black font-mono text-[#0F172A] mt-2 mb-1">1.25%</div>
                <div className="text-xs text-emerald-600 font-bold">Daily (Mon–Fri)</div>
                <div className="h-px bg-sky-100 my-4" />
                <div className="text-xs text-[#64748B] space-y-2">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <strong className="text-[#0F172A]">1,000 – 1,999 USDT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly ROI:</span>
                    <strong className="text-emerald-600 font-bold">~27.5%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong className="text-[#0284C7]">Liquid 72h</strong>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { onSelectAmount?.(1000); onLaunchDashboard(); }}
                className="mt-6 w-full py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs transition-colors shadow-md shadow-[#0284C7]/30"
              >
                Select Executive
              </button>
            </div>

            {/* Tier 4 */}
            <div className="bg-white border border-slate-200/90 hover:border-[#0284C7]/60 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
              <div>
                <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  Advanced
                </span>
                <div className="text-3xl font-black font-mono text-[#0F172A] mt-2 mb-1">1.50%</div>
                <div className="text-xs text-[#0284C7] font-bold">Daily (Mon–Fri)</div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="text-xs text-[#64748B] space-y-2">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <strong className="text-[#0F172A]">2,000 – 4,999 USDT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly ROI:</span>
                    <strong className="text-emerald-600 font-bold">~33.0%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong className="text-[#0284C7]">Liquid 72h</strong>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { onSelectAmount?.(2500); onLaunchDashboard(); }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-[#0F172A] font-bold text-xs transition-colors"
              >
                Select Advanced
              </button>
            </div>

            {/* Tier 5 (VIP Elite) */}
            <div className="bg-gradient-to-b from-[#F5F3FF] via-white to-white border border-[#7C3AED]/40 hover:border-[#7C3AED] rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
              <div>
                <span className="text-[10px] font-black uppercase text-[#7C3AED] tracking-wider bg-purple-100 px-2 py-0.5 rounded-md">
                  VIP Elite
                </span>
                <div className="text-3xl font-black font-mono text-[#0F172A] mt-2 mb-1">2.00%</div>
                <div className="text-xs text-[#7C3AED] font-bold">Daily (Mon–Fri)</div>
                <div className="h-px bg-purple-100 my-4" />
                <div className="text-xs text-[#64748B] space-y-2">
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <strong className="text-[#0F172A]">5,000+ USDT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly ROI:</span>
                    <strong className="text-emerald-600 font-bold">~44.0%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong className="text-[#7C3AED]">Liquid 72h</strong>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { onSelectAmount?.(5000); onLaunchDashboard(); }}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 text-white font-bold text-xs transition-all shadow-md shadow-[#7C3AED]/25"
              >
                Select VIP Elite
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: INTERACTIVE ROI CALCULATOR (MATCHING DASHBOARD)
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="calculator" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3.5 py-1 rounded-full border border-[#0284C7]/20">
              Interactive Simulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Calculate Your Daily &amp; Monthly ROI
            </h2>
            <p className="text-sm text-[#64748B]">
              Slide or input any amount from 50 USDT to simulate your institutional forex earnings.
            </p>
          </div>

          {/* Calculator Card in Dashboard White & Slate Styling */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            
            {/* Input & Slider */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-xs font-bold uppercase text-[#64748B] tracking-wider">
                  Investment Capital (USDT)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#0284C7]">
                      $
                    </span>
                    <input 
                      type="number"
                      min="50"
                      max="100000"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Math.max(50, Number(e.target.value)))}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 font-mono font-bold text-lg text-[#0F172A] w-40 text-right outline-none focus:border-[#0284C7] focus:bg-white"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#64748B]">USDT</span>
                </div>
              </div>

              {/* Slider */}
              <input 
                type="range"
                min="50"
                max="25000"
                step="50"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
              />

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[100, 500, 1000, 2500, 5000, 10000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setCalcAmount(amt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      calcAmount === amt 
                        ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30' 
                        : 'bg-slate-100 text-[#475569] hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid in Clean White Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-bold uppercase text-[#64748B]">Active Rate</div>
                <div className="text-2xl font-black font-mono text-[#0284C7] mt-1">
                  {currentRoi.pct}% <span className="text-xs font-normal text-slate-500">/ day</span>
                </div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-1">{currentRoi.tierName}</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-bold uppercase text-[#64748B]">Daily Earnings</div>
                <div className="text-2xl font-black font-mono text-emerald-600 mt-1">
                  +${currentRoi.daily.toFixed(2)}
                </div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-1">Every Mon–Fri</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-bold uppercase text-[#64748B]">Weekly Yield</div>
                <div className="text-2xl font-black font-mono text-[#0F172A] mt-1">
                  +${currentRoi.weekly.toFixed(2)}
                </div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-1">5 trading days</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-bold uppercase text-[#64748B]">Monthly Profit</div>
                <div className="text-2xl font-black font-mono text-[#D97706] mt-1">
                  +${currentRoi.monthly.toFixed(2)}
                </div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-1">22 trading days</div>
              </div>
            </div>

            {/* Action Bar inside calculator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80">
              <div className="text-xs text-[#334155]">
                Ready to activate this package of <strong className="text-[#0F172A] font-mono">${calcAmount.toLocaleString()} USDT</strong>?
              </div>
              <button
                onClick={() => { onSelectAmount?.(calcAmount); onLaunchDashboard(); }}
                className="bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-[#0284C7]/20 flex items-center gap-2 hover:opacity-95"
              >
                <span>Activate Package in Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: 7-LEVEL TEAM AFFILIATE ECOSYSTEM
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="affiliate" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3.5 py-1 rounded-full border border-[#0284C7]/20">
              Multi-Tier Partner Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              10% Direct Bonus &amp; 7-Level Team Income
            </h2>
            <p className="text-sm text-[#64748B]">
              Build your community and receive recurring daily royalties on the profits your downline generates.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Direct Bonus Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-2xl font-bold shadow-sm">
                👥
              </div>

              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Direct Referral Bonus</span>
                <h3 className="text-3xl font-black text-[#0F172A] mt-1">10% Cash Commission</h3>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                Direct income is 10% of your referral's deposited amount. It becomes eligible once your personally referred partner maintains their qualifying package balance for 30 days (continuous or non-continuous).
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Example: $5,000 Direct Deposit</span>
                  <strong className="text-amber-600 font-mono font-bold">+$500.00 USDT</strong>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Qualifying Window</span>
                  <strong className="text-[#0F172A]">30 Days</strong>
                </div>
              </div>

              <button
                onClick={onLaunchDashboard}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-[#0284C7] hover:text-white text-[#0F172A] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Get Your Referral Link in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 7 Levels Table */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-[#0F172A] flex items-center gap-2">
                  <span>📊</span>
                  <span>7-Tier Team Daily ROI Override</span>
                </h4>
                <span className="text-[10px] font-bold text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-0.5 rounded-full border border-[#0284C7]/20">
                  Passive Daily Royalties
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { lvl: 'Level 1', pct: '20%', share: '20% of Member ROI', bar: 100 },
                  { lvl: 'Level 2', pct: '10%', share: '10% of Member ROI', bar: 50 },
                  { lvl: 'Level 3', pct: '10%', share: '10% of Member ROI', bar: 50 },
                  { lvl: 'Level 4', pct: '5%', share: '5% of Member ROI', bar: 25 },
                  { lvl: 'Level 5', pct: '5%', share: '5% of Member ROI', bar: 25 },
                  { lvl: 'Level 6', pct: '3%', share: '3% of Member ROI', bar: 15 },
                  { lvl: 'Level 7', pct: '2%', share: '2% of Member ROI', bar: 10 },
                ].map(item => (
                  <div key={item.lvl} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center font-mono font-bold text-xs text-[#0284C7]">
                      {item.lvl.replace('Level ', 'L')}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold text-[#0F172A] mb-1">
                        <span>{item.lvl}</span>
                        <span className="font-mono text-[#0284C7]">{item.pct}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0284C7] to-[#818CF8]" style={{ width: `${item.bar}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: REWARDS LADDER
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="rewards" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              Milestone Bonuses
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              TraderDaddy Executive Rewards
            </h2>
            <p className="text-sm text-[#64748B]">
              Achieve business volume targets across Power Leg 1, Power Leg 2, and other legs to unlock up to $16,000 USDT in milestone awards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: 'A', bonus: '1,000 USDT', pl1: '4,000', pl2: '4,000', other: '2,000' },
              { id: 'B', bonus: '2,000 USDT', pl1: '8,000', pl2: '8,000', other: '4,000' },
              { id: 'C', bonus: '4,000 USDT', pl1: '16,000', pl2: '16,000', other: '8,000' },
              { id: 'D', bonus: '8,000 USDT', pl1: '32,000', pl2: '32,000', other: '16,000' },
              { id: 'E', bonus: '16,000 USDT', pl1: '64,000', pl2: '64,000', other: '32,000' },
            ].map(r => (
              <div key={r.id} className="bg-white border border-slate-200/90 rounded-3xl p-5 hover:border-purple-400 transition-all shadow-sm hover:shadow-lg">
                <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                  REWARD {r.id}
                </span>
                <div className="text-2xl font-black font-mono text-[#0F172A] my-3">{r.bonus}</div>
                <div className="space-y-1.5 text-xs text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Power Leg 1</span>
                    <strong className="text-[#0F172A] font-mono">${r.pl1}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Power Leg 2</span>
                    <strong className="text-[#0F172A] font-mono">${r.pl2}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Legs</span>
                    <strong className="text-[#0F172A] font-mono">${r.other}</strong>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-bold text-[#0284C7]">
                  ⏱ Maintain for 30 days
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: HOW IT WORKS
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Start Earning in 4 Simple Steps
            </h2>
            <p className="text-sm text-[#64748B]">
              Seamless onboarding with instant BEP20 USDT detection and automated daily settlements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-black text-[#0F172A]">Create Account</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Open your dashboard in seconds. Receive your unique user ID and personal BEP20 deposit wallet address.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-black text-[#0F172A]">Deposit USDT</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Deposit minimum 50 USDT on BNB Smart Chain (BEP20). Smart contracts detect your payment automatically.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h4 className="text-base font-black text-[#0F172A]">Daily Forex ROI</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Algorithms trade Mon–Fri. Your 0.8% to 2.0% daily earnings credit automatically every day at 00:00 UTC.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h4 className="text-base font-black text-[#0F172A]">Withdraw Anytime</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Withdraw your accumulated profits anytime (min 10 USDT, 5% fee). Principal capital is fully liquid in 72 hours.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: FAQ
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-4 sm:px-8 border-b border-slate-200/80 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#64748B]">
              Clear, transparent answers on trading schedules, deposits, and principal withdrawals.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 font-bold text-sm text-[#0F172A] flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#0284C7] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#64748B] leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION: BOTTOM CALL TO ACTION
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-8 relative overflow-hidden text-center z-10">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-block text-xs font-bold text-[#0284C7] bg-[#0284C7]/10 border border-[#0284C7]/20 px-3.5 py-1.5 rounded-full">
            Ready to Begin?
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Start Earning Daily Forex ROI Today
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto">
            Experience the automated dashboard, activate your initial package from 50 USDT, and enjoy daily institutional forex yield.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchDashboard}
              className="bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#4F46E5] hover:opacity-95 text-white px-9 py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#0284C7]/25 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              <span>Launch Interactive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
         ══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-8 text-xs text-[#64748B] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#4F46E5] flex items-center justify-center text-white font-black text-sm">
              📊
            </div>
            <div>
              <div className="font-bold text-[#0F172A]">TraderDaddy Forex Platform</div>
              <div className="text-[10px] text-[#94A3B8]">© 2026 TraderDaddy Pro. All rights reserved.</div>
            </div>
          </div>

          <div className="text-center md:text-right max-w-md text-[11px] text-[#94A3B8] leading-relaxed">
            Risk Warning: Foreign exchange and quantitative margin operations involve substantial risk of loss. Daily ROI is generated Monday through Friday based on live market execution.
          </div>
        </div>
      </footer>

    </div>
  );
};
