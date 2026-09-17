import React, { useState, useEffect } from 'react';
import { InvestorPackage } from '../types';
import { 
  Copy, Check, ExternalLink, ArrowRight, ShieldCheck, 
  Clock, TrendingUp, DollarSign, Users, Award, 
  Smartphone, Monitor, Sparkles, RefreshCw, AlertCircle,
  HelpCircle, ChevronRight, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { SmoothAnimatedBackground } from './SmoothAnimatedBackground';

interface TraderDaddyDashboardProps {
  onViewLandingPage?: () => void;
}

export const TraderDaddyDashboard: React.FC<TraderDaddyDashboardProps> = ({ onViewLandingPage }) => {
  // Navigation
  const [activePage, setActivePage] = useState<'home' | 'buy' | 'network' | 'info' | 'profile'>('home');
  const [activeTab, setActiveTab] = useState<'trading' | 'invest'>('trading');
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('desktop');

  // Modals & Toast
  const [modalType, setModalType] = useState<'activate' | 'withdraw' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  // Form states
  const [activateAmount, setActivateAmount] = useState<number | ''>(100);
  const [withdrawAmount, setWithdrawAmount] = useState<number | ''>('');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  // User Profile
  const [profileName, setProfileName] = useState('Ethical Hacker');
  const [profileMobile, setProfileMobile] = useState('+659876543210');
  const userEmail = 'xaxit40953@fanzher.com';
  const userId = 'TD262534';
  const referralUrl = `http://server.elevenverse.com/traderdaddy/register.php?ref=${userId}`;
  const depositAddress = '0xebD8572975875eEFfe1F179fd9A28e730AF72B85';

  // Live countdown to 00:00 UTC
  const [countdown, setCountdown] = useState('--:--:--');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date();
      end.setUTCHours(24, 0, 0, 0);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('00 : 00 : 00');
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h} : ${m} : ${s}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Market Tickers
  const [markets, setMarkets] = useState([
    { sym: 'XAUUSD', name: 'Gold / US Dollar', price: 2648.30, chg: -0.20, up: false },
    { sym: 'NAS100', name: 'Nasdaq 100', price: 29461.0, chg: +0.02, up: true },
    { sym: 'US30', name: 'Dow Jones 30', price: 53454.5, chg: -0.19, up: false },
    { sym: 'EURUSD', name: 'Euro / US Dollar', price: 1.0842, chg: +0.08, up: true },
    { sym: 'BTCUSD', name: 'Bitcoin / USDT', price: 95230.0, chg: +1.24, up: true },
    { sym: 'GBPUSD', name: 'British Pound / USD', price: 1.2718, chg: -0.12, up: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => {
        const delta = (Math.random() - 0.49) * 0.04;
        const newChg = parseFloat((m.chg + delta).toFixed(2));
        const priceVariance = (Math.random() - 0.49) * (m.price * 0.0006);
        const newPrice = parseFloat((m.price + priceVariance).toFixed(m.price < 5 ? 4 : 1));
        return {
          ...m,
          price: newPrice,
          chg: newChg,
          up: newChg >= 0
        };
      }));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // User Portfolio State with local storage or stateful defaults
  const [packages, setPackages] = useState<InvestorPackage[]>([
    {
      id: 'pkg-1',
      amount: 500,
      dailyRoiPercent: 1.0,
      dailyRoiAmount: 5.0,
      activatedDate: '2026-09-01',
      txHash: '0x8e92...4b10',
      status: 'Active'
    }
  ]);

  const [withdrawnTotal, setWithdrawnTotal] = useState(0);

  // Computed Portfolio values
  const totalInvested = packages.reduce((acc, p) => acc + p.amount, 0);
  const activePrincipal = packages.filter(p => p.status === 'Active').reduce((acc, p) => acc + p.amount, 0);
  const todayRoi = packages.filter(p => p.status === 'Active').reduce((acc, p) => acc + p.dailyRoiAmount, 0);
  const totalRoiIncome = todayRoi * 7; // demo simulation
  const directIncome = 85.00;
  const levelIncome = 42.50;
  const withdrawableIncome = (totalRoiIncome + directIncome + levelIncome) - withdrawnTotal;
  const totalBalance = withdrawableIncome + activePrincipal;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyToClipboard = (text: string, type: 'link' | 'addr') => {
    navigator.clipboard.writeText(text).catch(() => {});
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 2000);
    }
    showToast('✓ Copied to clipboard');
  };

  // Helper for ROI calculation
  const getRoiPercent = (amt: number) => {
    if (amt >= 5000) return 2.0;
    if (amt >= 2000) return 1.5;
    if (amt >= 1000) return 1.25;
    if (amt >= 500) return 1.0;
    return 0.8;
  };

  const handleConfirmActivate = () => {
    const amt = typeof activateAmount === 'number' ? activateAmount : parseFloat(activateAmount);
    if (!amt || amt < 50) {
      showToast('⚠️ Minimum activation is 50 USDT');
      return;
    }
    const roiPct = getRoiPercent(amt);
    const newPkg: InvestorPackage = {
      id: `pkg-${Date.now()}`,
      amount: amt,
      dailyRoiPercent: roiPct,
      dailyRoiAmount: (amt * roiPct) / 100,
      activatedDate: new Date().toISOString().split('T')[0],
      txHash: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6),
      status: 'Active'
    };

    setPackages(prev => [newPkg, ...prev]);
    setModalType(null);
    showToast(`✅ Package of ${amt} USDT activated successfully!`);
    setActiveTab('invest');
  };

  const handleConfirmWithdraw = () => {
    const amt = typeof withdrawAmount === 'number' ? withdrawAmount : parseFloat(withdrawAmount);
    if (!amt || amt < 10) {
      showToast('⚠️ Minimum withdrawal is 10 USDT');
      return;
    }
    if (amt > withdrawableIncome) {
      showToast(`⚠️ Insufficient withdrawable balance (${withdrawableIncome.toFixed(2)} USDT available)`);
      return;
    }
    if (!withdrawAddress || withdrawAddress.length < 15) {
      showToast('⚠️ Please enter a valid BEP20 USDT wallet address');
      return;
    }

    setWithdrawnTotal(prev => prev + amt);
    setModalType(null);
    setWithdrawAmount('');
    setWithdrawAddress('');
    showToast(`✅ Withdrawal request of ${amt} USDT submitted! (Net: ${(amt * 0.95).toFixed(2)} USDT after 5% fee)`);
  };

  // 7-Level Income structure
  const levels = [
    { n: 1, pct: 20, bar: 100 },
    { n: 2, pct: 10, bar: 50 },
    { n: 3, pct: 10, bar: 50 },
    { n: 4, pct: 5, bar: 25 },
    { n: 5, pct: 5, bar: 25 },
    { n: 6, pct: 3, bar: 15 },
    { n: 7, pct: 2, bar: 10 },
  ];

  // TraderDaddy Rewards
  const rewards = [
    { id: 'A', amt: '1,000', pl1: '4,000', pl2: '4,000', other: '2,000' },
    { id: 'B', amt: '2,000', pl1: '8,000', pl2: '8,000', other: '4,000' },
    { id: 'C', amt: '4,000', pl1: '16,000', pl2: '16,000', other: '8,000' },
    { id: 'D', amt: '8,000', pl1: '32,000', pl2: '32,000', other: '16,000' },
    { id: 'E', amt: '16,000', pl1: '64,000', pl2: '64,000', other: '32,000' },
  ];

  // Direct referrals mock data
  const [directs, setDirects] = useState([
    { id: 'TD10982', name: 'Rohit Sharma', date: '2026-09-02', deposit: 1000, status: 'Active (24 days)', earn: 100 },
    { id: 'TD10944', name: 'Vikram Mehta', date: '2026-08-28', deposit: 500, status: 'Active (30 days ✓)', earn: 50 },
  ]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0F172A] font-sans relative antialiased selection:bg-[#0284C7] selection:text-white pb-16">
      {/* Background Smooth Animations */}
      <SmoothAnimatedBackground />

      {/* Toast Notification */}
      <div 
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 pointer-events-none px-6 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 ${
          toastMessage 
            ? 'opacity-100 translate-y-0 scale-100 bg-gradient-to-r from-[#059669] to-[#10B981] text-white shadow-emerald-500/30' 
            : 'opacity-0 -translate-y-12 scale-90'
        }`}
      >
        <span>{toastMessage}</span>
      </div>

      {/* Top Banner Control Bar (World-Class Utility Header) */}
      <div className="bg-[#0F172A] text-white px-4 py-2.5 text-xs border-b border-white/10 sticky top-0 z-[210]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-bold text-[#38BDF8]">TraderDaddy Forex</span>
            <span className="hidden sm:inline text-white/50">|</span>
            <span className="hidden sm:inline text-white/70">Institutional BEP20 Engine</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport switch: Mobile Phone Frame vs Expanded Desktop */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-[11px] font-semibold">
              <button 
                onClick={() => setDeviceView('mobile')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                  deviceView === 'mobile' ? 'bg-[#0284C7] text-white' : 'text-white/60 hover:text-white'
                }`}
                title="View as Mobile App Frame"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile Frame</span>
              </button>
              <button 
                onClick={() => setDeviceView('desktop')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                  deviceView === 'desktop' ? 'bg-[#0284C7] text-white' : 'text-white/60 hover:text-white'
                }`}
                title="View as Expanded Responsive Screen"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Full Desktop</span>
              </button>
            </div>

            {/* Switch to Landing Page */}
            {onViewLandingPage && (
              <button
                onClick={onViewLandingPage}
                className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all text-[11px]"
              >
                <span>🌐 Public Landing Page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Outer Container: responsive width or locked 480px app-shell */}
      <div className={`mx-auto transition-all duration-300 ${
        deviceView === 'mobile' 
          ? 'max-w-[480px] bg-white border-x border-[#0284C7]/15 shadow-2xl min-h-[92vh] my-4 rounded-3xl overflow-hidden' 
          : 'max-w-4xl px-3 sm:px-6 pt-4'
      }`}>

        {/* ── TOP HEADER ── */}
        <header className="sticky top-[41px] z-[190] bg-white/90 backdrop-blur-xl border-b border-[#0284C7]/15 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] via-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-xl shadow-md shadow-[#0284C7]/30 text-white font-black">
              📊
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-[#0F172A] leading-none">
                Trader<span className="text-[#0284C7]">Daddy</span>
              </div>
              <div className="text-[10px] text-[#64748B] font-semibold tracking-wider mt-0.5">
                PREMIUM FOREX PLATFORM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-[#0F172A]">{profileName}</div>
              <div className="text-[11px] text-[#0284C7] font-mono font-semibold">{userId}</div>
            </div>
            <div 
              onClick={() => setActivePage('profile')}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#4F46E5] flex items-center justify-center text-white font-black shadow-md shadow-[#0284C7]/20 cursor-pointer hover:scale-105 transition-transform"
            >
              {profileName.charAt(0)}
            </div>
          </div>
        </header>

        {/* ── TOP CHIP MENU ── */}
        <div className="sticky top-[103px] z-[180] bg-white/80 backdrop-blur-md border-b border-[#0284C7]/10 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActivePage('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activePage === 'home' 
                ? 'bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/30 shadow-sm' 
                : 'bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7]'
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => { setActivePage('buy'); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activePage === 'buy' 
                ? 'bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/30 shadow-sm' 
                : 'bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7]'
            }`}
          >
            Activate Package
          </button>
          <button 
            onClick={() => { setActivePage('home'); setActiveTab('invest'); }}
            className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7] transition-all"
          >
            My Investments ({packages.length})
          </button>
          <button 
            onClick={() => setActivePage('network')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activePage === 'network' 
                ? 'bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/30 shadow-sm' 
                : 'bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7]'
            }`}
          >
            Referrals
          </button>
          <button 
            onClick={() => setModalType('withdraw')}
            className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7] transition-all"
          >
            Withdraw
          </button>
          <button 
            onClick={() => setActivePage('profile')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activePage === 'profile' 
                ? 'bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/30 shadow-sm' 
                : 'bg-white text-[#64748B] border border-[#0F172A]/5 hover:text-[#0284C7]'
            }`}
          >
            Profile
          </button>
          <button 
            onClick={() => showToast('Session active. Click profile to manage.')}
            className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white text-[#E11D48] border border-[#E11D48]/20 hover:bg-[#E11D48]/10 transition-all"
          >
            Logout
          </button>
        </div>

        {/* ── PAGE CONTENT ROUTER ── */}
        <div className="p-4 sm:p-5 space-y-4">

          {/* ======================================================== */}
          {/* ════════════════ PAGE: HOME / DASHBOARD ════════════════ */}
          {/* ======================================================== */}
          {activePage === 'home' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              {/* 1. PORTFOLIO CARD (3D Style) */}
              <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 shadow-xl shadow-[#0284C7]/5">
                {/* Background ambient orbs */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#0284C7]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#4F46E5]/10 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Forex Portfolio ⓘ</h3>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#64748B] mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#059669] shadow-sm shadow-[#059669]/50 animate-pulse" />
                        <span>YOUR PRIMARY TRADING PORTFOLIO</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0284C7]/15 to-[#4F46E5]/15 border border-[#0284C7]/20 flex items-center justify-center text-2xl shadow-sm">
                      📈
                    </div>
                  </div>

                  {/* Balance Display */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                      Total Balance
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-[#0F172A] to-[#0284C7] bg-clip-text text-transparent">
                        {totalBalance.toFixed(2)}
                      </span>
                      <span className="text-base font-bold text-[#64748B]">USDT</span>
                    </div>
                  </div>

                  {/* 3 ROI Pills */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    <div className="bg-white/80 backdrop-blur-sm border border-[#0F172A]/5 rounded-2xl p-3">
                      <div className="text-[9px] font-bold uppercase text-[#64748B] tracking-wider mb-1">
                        Today's Forex ROI
                      </div>
                      <div className="text-sm sm:text-base font-extrabold font-mono text-[#059669]">
                        +{todayRoi.toFixed(2)} <span className="text-[10px]">USDT</span>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm border border-[#0F172A]/5 rounded-2xl p-3">
                      <div className="text-[9px] font-bold uppercase text-[#64748B] tracking-wider mb-1">
                        Withdrawable Income
                      </div>
                      <div className="text-sm sm:text-base font-extrabold font-mono text-[#D97706]">
                        {withdrawableIncome.toFixed(2)} <span className="text-[10px]">USDT</span>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm border border-[#0F172A]/5 rounded-2xl p-3">
                      <div className="text-[9px] font-bold uppercase text-[#64748B] tracking-wider mb-1">
                        Last ROI Credit
                      </div>
                      <div className="text-sm sm:text-base font-extrabold font-mono text-[#64748B]">
                        {todayRoi.toFixed(2)} <span className="text-[10px]">USDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Settlement Countdown Bar */}
                  <div className="bg-white/90 border border-[#0F172A]/5 rounded-2xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
                      <span>⏱</span>
                      <span>Next Settlement In</span>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#0284C7] bg-[#0284C7]/10 px-3 py-1 rounded-xl border border-[#0284C7]/20 tracking-wider shadow-inner">
                      {countdown}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. ACTION BAR */}
              <div className="grid grid-cols-[auto_1fr_auto] gap-2.5 items-center">
                <div className="bg-white border border-[#0284C7]/15 rounded-2xl p-2.5 px-4 shadow-sm">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Balance</div>
                  <div className="text-sm font-extrabold font-mono text-[#0F172A]">
                    {withdrawableIncome.toFixed(2)} <span className="text-[10px] text-[#64748B]">USDT</span>
                  </div>
                </div>

                <button
                  onClick={() => setModalType('withdraw')}
                  className="bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-[#0284C7]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Withdraw</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => showToast('📢 Daily ROI is settled every Mon–Fri at 00:00 UTC!')}
                  className="bg-white border border-[#0284C7]/15 rounded-2xl p-2.5 px-3 text-xs font-bold text-[#64748B] hover:text-[#0284C7] shadow-sm flex flex-col items-center justify-center transition-colors"
                >
                  <span>📢</span>
                  <span className="text-[10px]">Updates</span>
                </button>
              </div>

              {/* 3. LIVE MARKETS */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                    <span>📊</span>
                    <span>Live Markets</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#64748B] bg-[#F0F4F8] px-2.5 py-0.5 rounded-full">
                    TradingView Data
                  </span>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  {markets.map(m => (
                    <div 
                      key={m.sym}
                      className="min-w-[125px] flex-shrink-0 bg-[#F8FBFF] border border-[#0284C7]/10 rounded-2xl p-3 shadow-xs hover:border-[#0284C7]/30 transition-all"
                    >
                      <div className="text-[10px] font-bold text-[#64748B] mb-1">{m.sym}</div>
                      <div className="text-sm font-bold font-mono text-[#0F172A]">{m.price.toLocaleString()}</div>
                      <div className={`text-xs font-bold ${m.up ? 'text-[#059669]' : 'text-[#E11D48]'}`}>
                        {m.up ? '+' : ''}{m.chg}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. CTA CARDS */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setModalType('activate')}
                  className="bg-gradient-to-br from-[#E0F2FE] via-[#DBEAFE] to-[#EDE9FE] border border-[#0284C7]/25 rounded-3xl p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] relative group"
                >
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">💼</span>
                  <h4 className="text-sm sm:text-base font-black text-[#0F172A] mb-0.5">Activate Package</h4>
                  <p className="text-[11px] text-[#64748B] font-medium">Min. 50 USDT</p>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#0284C7] font-bold opacity-70 group-hover:translate-x-1 transition-transform">
                    ›
                  </span>
                </div>

                <div 
                  onClick={() => setActivePage('network')}
                  className="bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FED7AA] border border-[#D97706]/25 rounded-3xl p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] relative group"
                >
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">👥</span>
                  <h4 className="text-sm sm:text-base font-black text-[#0F172A] mb-0.5">Refer &amp; Earn</h4>
                  <p className="text-[11px] text-[#78350F] font-medium">10% Direct Income</p>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#D97706] font-bold opacity-70 group-hover:translate-x-1 transition-transform">
                    ›
                  </span>
                </div>
              </div>

              {/* 5. ACCOUNT SUMMARY */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A] mb-3">
                  <span>ℹ️</span>
                  <span>Account Summary</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-[#F8FBFF] border border-[#0F172A]/5 rounded-2xl p-3">
                    <div className="text-[9px] font-bold uppercase text-[#64748B] mb-1">Total Invested</div>
                    <div className="text-sm sm:text-base font-black font-mono text-[#0F172A]">
                      {totalInvested.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-[#F8FBFF] border border-[#0F172A]/5 rounded-2xl p-3">
                    <div className="text-[9px] font-bold uppercase text-[#64748B] mb-1">Active Principal</div>
                    <div className="text-sm sm:text-base font-black font-mono text-[#0284C7]">
                      {activePrincipal.toFixed(2)} USDT
                    </div>
                    <div className="text-[9px] text-[#94A3B8] mt-1">Processed within 72 hrs</div>
                  </div>

                  <div className="bg-[#F8FBFF] border border-[#0F172A]/5 rounded-2xl p-3">
                    <div className="text-[9px] font-bold uppercase text-[#64748B] mb-1">Total Withdrawn</div>
                    <div className="text-sm sm:text-base font-black font-mono text-[#0F172A]">
                      {withdrawnTotal.toFixed(2)} USDT
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. INVESTMENT RETURN PLAN TABLE */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>📋</span>
                  <span>Investment Return Plan</span>
                </div>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#0F172A]/10 text-[10px] uppercase font-bold text-[#64748B]">
                      <th className="py-2">Investment (USDT)</th>
                      <th className="py-2 text-right">Daily ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0F172A]/5 font-medium">
                    <tr><td className="py-2.5 font-semibold text-[#0F172A]">50 – 499 USDT</td><td className="py-2.5 text-right font-mono font-bold text-[#0284C7]">0.8% daily</td></tr>
                    <tr><td className="py-2.5 font-semibold text-[#0F172A]">500 – 999 USDT</td><td className="py-2.5 text-right font-mono font-bold text-[#0284C7]">1% daily</td></tr>
                    <tr><td className="py-2.5 font-semibold text-[#0F172A]">1,000 – 1,999 USDT</td><td className="py-2.5 text-right font-mono font-bold text-[#0284C7]">1.25% daily</td></tr>
                    <tr><td className="py-2.5 font-semibold text-[#0F172A]">2,000 – 4,999 USDT</td><td className="py-2.5 text-right font-mono font-bold text-[#0284C7]">1.5% daily</td></tr>
                    <tr><td className="py-2.5 font-semibold text-[#0F172A]">5,000+ USDT</td><td className="py-2.5 text-right font-mono font-bold text-[#0284C7]">2% daily</td></tr>
                  </tbody>
                </table>

                <div className="h-px bg-[#0F172A]/10" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">ROI Days</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">Mon – Fri</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Activation Fee</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">3%</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Withdrawal Fee</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">5%</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Principal Release</div>
                    <div className="font-bold text-[#0F172A] mt-0.5">Within 72 Hrs</div>
                  </div>
                </div>

                <div className="bg-[#0284C7]/5 border-l-4 border-[#0284C7] p-3 rounded-r-xl text-xs text-[#64748B] leading-relaxed">
                  ROI is generated from Forex trading only on <strong className="text-[#0284C7]">Monday to Friday</strong>. No ROI is generated on Saturday or Sunday. Investment principal is withdrawable subject to processing rules.
                </div>
              </div>

              {/* 7. TABBED: TRADING STATUS VS MY INVESTMENTS */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex border-b border-[#0F172A]/10 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('trading')}
                    className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
                      activeTab === 'trading' 
                        ? 'border-[#0284C7] text-[#0284C7]' 
                        : 'border-transparent text-[#64748B] hover:text-[#0284C7]'
                    }`}
                  >
                    Trading Status
                  </button>
                  <button
                    onClick={() => setActiveTab('invest')}
                    className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
                      activeTab === 'invest' 
                        ? 'border-[#0284C7] text-[#0284C7]' 
                        : 'border-transparent text-[#64748B] hover:text-[#0284C7]'
                    }`}
                  >
                    My Investments ({packages.length})
                  </button>
                </div>

                {activeTab === 'trading' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                        <div className="text-[9px] font-bold uppercase text-[#64748B]">Active Investment</div>
                        <div className="text-sm sm:text-base font-black font-mono text-[#0F172A]">
                          {activePrincipal.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                        <div className="text-[9px] font-bold uppercase text-[#64748B]">Today's Reward</div>
                        <div className="text-sm sm:text-base font-black font-mono text-[#059669]">
                          {todayRoi.toFixed(2)} USDT
                        </div>
                      </div>
                      <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                        <div className="text-[9px] font-bold uppercase text-[#64748B]">Withdrawable</div>
                        <div className="text-sm sm:text-base font-black font-mono text-[#0F172A]">
                          {withdrawableIncome.toFixed(2)} USDT
                        </div>
                      </div>
                    </div>

                    {packages.length === 0 ? (
                      <div className="text-center py-8 text-[#64748B]">
                        <div className="text-4xl mb-2">📦</div>
                        <p className="text-xs">No active investment package yet.</p>
                        <button 
                          onClick={() => setModalType('activate')}
                          className="mt-2 text-xs font-bold text-[#0284C7] hover:underline"
                        >
                          Activate Package →
                        </button>
                      </div>
                    ) : (
                      <div className="bg-[#059669]/5 border border-[#059669]/20 p-3.5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
                          <div>
                            <div className="text-xs font-bold text-[#0F172A]">Automated EA Trading Active</div>
                            <div className="text-[11px] text-[#64748B]">Generating daily institutional return (Mon–Fri)</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded-lg">
                          Live Active
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="bg-[#F8FBFF] border border-[#0284C7]/15 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black font-mono text-[#0F172A]">{pkg.amount} USDT</span>
                            <span className="text-[10px] font-bold bg-[#0284C7]/10 text-[#0284C7] px-2 py-0.5 rounded-full">
                              {pkg.dailyRoiPercent}% Daily
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748B] mt-0.5">
                            Activated: {pkg.activatedDate} • Tx: <span className="font-mono text-[10px]">{pkg.txHash}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-[#059669]">+{pkg.dailyRoiAmount} USDT/day</div>
                          <span className="text-[9px] font-bold uppercase bg-[#059669]/10 text-[#059669] px-2 py-0.5 rounded-full">
                            {pkg.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => setModalType('activate')}
                      className="w-full py-2.5 rounded-xl border border-dashed border-[#0284C7]/30 text-xs font-bold text-[#0284C7] hover:bg-[#0284C7]/5 transition-colors"
                    >
                      + Activate Another Package
                    </button>
                  </div>
                )}
              </div>

              {/* 8. FOREX EARNINGS */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A] mb-3">
                  <span>📈</span>
                  <span>Forex Earnings</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#F8FBFF] p-3.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Total ROI Income</div>
                    <div className="text-base font-black font-mono text-[#0F172A] mt-1">
                      {totalRoiIncome.toFixed(2)} USDT
                    </div>
                  </div>

                  <div className="bg-[#F8FBFF] p-3.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Direct Income</div>
                    <div className="text-base font-black font-mono text-[#D97706] mt-1">
                      {directIncome.toFixed(2)} USDT
                    </div>
                  </div>

                  <div className="bg-[#F8FBFF] p-3.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Level Income</div>
                    <div className="text-base font-black font-mono text-[#0284C7] mt-1">
                      {levelIncome.toFixed(2)} USDT
                    </div>
                  </div>

                  <div className="bg-[#F8FBFF] p-3.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Last ROI Credit</div>
                    <div className="text-base font-black font-mono text-[#059669] mt-1">
                      {todayRoi.toFixed(2)} USDT
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. REFER & EARN WIDGET */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>👥</span>
                  <span>Refer &amp; Earn</span>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  Earn <strong className="text-[#0284C7]">10% direct income</strong> after your direct referral maintains the qualifying package balance for a total of 30 days (continuous or non-continuous).
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Direct Referrals</div>
                    <div className="text-sm font-black font-mono text-[#0F172A] mt-0.5">{directs.length}</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Direct Business</div>
                    <div className="text-sm font-black font-mono text-[#0F172A] mt-0.5">1,500.00</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-2.5 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B] uppercase">Your Income</div>
                    <div className="text-sm font-black font-mono text-[#D97706] mt-0.5">150.00 USDT</div>
                  </div>
                </div>

                <div className="bg-[#0284C7]/5 border border-dashed border-[#0284C7]/30 rounded-2xl p-3 flex items-center justify-between gap-2">
                  <div className="font-mono text-[11px] text-[#64748B] truncate flex-1">
                    {referralUrl}
                  </div>
                  <button
                    onClick={() => copyToClipboard(referralUrl, 'link')}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#4F46E5] text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 10. LEVEL INCOME (7 LEVELS) */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>📊</span>
                  <span>Level Income (7 Levels)</span>
                </div>

                <div className="space-y-2">
                  {levels.map(lv => (
                    <div key={lv.n} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FBFF] transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center font-mono font-bold text-xs text-[#0284C7]">
                        L{lv.n}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1">
                          <span>Level {lv.n}</span>
                          <span className="font-mono text-[#0284C7]">{lv.pct}% of ROI</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0F172A]/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#0284C7] to-[#06B6D4] rounded-full"
                            style={{ width: `${lv.bar}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0284C7]/5 border-l-4 border-[#0284C7] p-3 rounded-r-xl text-xs text-[#64748B]">
                  Level income is calculated as a percentage of the ROI generated by eligible team members.
                </div>
              </div>

              {/* 11. TRADERDADDY REWARDS */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>🏆</span>
                  <span>TraderDaddy Rewards</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Qualification uses Power Leg 1 + Power Leg 2 + combined business of all other legs. Each reward requires the qualifying business to be maintained for 30 days.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {rewards.map(r => (
                    <div 
                      key={r.id} 
                      className="min-w-[190px] flex-shrink-0 bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 rounded-2xl p-4 shadow-sm"
                    >
                      <span className="text-[9px] font-black uppercase text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded-md">
                        REWARD {r.id}
                      </span>
                      <div className="text-2xl font-black font-mono text-[#0F172A] my-2">
                        {r.amt} <span className="text-xs text-[#64748B]">USDT</span>
                      </div>
                      <div className="space-y-1 text-[11px] text-[#64748B]">
                        <div className="flex justify-between">
                          <span>Power Leg 1</span>
                          <strong className="text-[#0F172A] font-mono">{r.pl1}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Power Leg 2</span>
                          <strong className="text-[#0F172A] font-mono">{r.pl2}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Legs</span>
                          <strong className="text-[#0F172A] font-mono">{r.other}</strong>
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#0284C7]/10 text-[10px] font-bold text-[#0284C7] flex items-center gap-1">
                        <span>⏱</span>
                        <span>Maintain 30 days</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0284C7]/5 border-l-4 border-[#0284C7] p-3 rounded-r-xl text-xs text-[#64748B]">
                  After a reward is completed, qualification for the next reward is based on fresh business and is again subject to the 30-day maintenance condition.
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* ════════════════ PAGE: BUY / ACTIVATE ══════════════════ */}
          {/* ======================================================== */}
          {activePage === 'buy' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-[#0284C7]/10">
                <button 
                  onClick={() => setActivePage('home')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#0284C7]/15 flex items-center justify-center text-sm font-bold text-[#0F172A] hover:bg-[#0284C7]/5"
                >
                  ←
                </button>
                <div className="text-center">
                  <h2 className="text-base font-black text-[#0F172A]">Activate Forex Package</h2>
                  <p className="text-[11px] text-[#64748B]">TraderDaddy Forex Trading</p>
                </div>
                <div className="w-9" />
              </div>

              {/* Deposit USDT BEP20 Card */}
              <div className="bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#0284C7] px-3 py-1 rounded-full text-xs font-bold">
                    🔗 USDT · BEP20 (BNB Smart Chain)
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                    <span>Automatic Package Detection</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex justify-center py-2">
                  <div className="p-3.5 bg-white rounded-2xl shadow-md border border-[#0284C7]/15 flex flex-col items-center">
                    <svg width="140" height="140" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                      <rect width="150" height="150" fill="white"/>
                      <rect x="8" y="8" width="42" height="42" rx="4" fill="#0F172A"/>
                      <rect x="13" y="13" width="32" height="32" rx="2" fill="white"/>
                      <rect x="18" y="18" width="22" height="22" rx="1" fill="#0284C7"/>
                      <rect x="100" y="8" width="42" height="42" rx="4" fill="#0F172A"/>
                      <rect x="105" y="13" width="32" height="32" rx="2" fill="white"/>
                      <rect x="110" y="18" width="22" height="22" rx="1" fill="#0284C7"/>
                      <rect x="8" y="100" width="42" height="42" rx="4" fill="#0F172A"/>
                      <rect x="13" y="105" width="32" height="32" rx="2" fill="white"/>
                      <rect x="18" y="110" width="22" height="22" rx="1" fill="#0284C7"/>
                      <rect x="58" y="8" width="8" height="8" fill="#0F172A"/>
                      <rect x="70" y="8" width="8" height="8" fill="#0F172A"/>
                      <rect x="82" y="8" width="8" height="8" fill="#0F172A"/>
                      <rect x="58" y="58" width="12" height="12" fill="#0284C7"/>
                      <rect x="75" y="75" width="10" height="10" fill="#4F46E5"/>
                      <rect x="58" y="106" width="8" height="8" fill="#0F172A"/>
                      <rect x="70" y="106" width="8" height="8" fill="#0F172A"/>
                      <rect x="94" y="106" width="8" height="8" fill="#0F172A"/>
                      <rect x="118" y="106" width="8" height="8" fill="#0F172A"/>
                      <rect x="130" y="118" width="8" height="8" fill="#0F172A"/>
                    </svg>
                    <span className="text-[10px] font-mono text-[#64748B] mt-1.5">Scan with TrustWallet / Binance</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0F172A]">Deposit USDT</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Deposit USDT directly to your personal BEP20 deposit address.</p>
                  <div className="text-xs font-extrabold text-[#0284C7] mt-1">First package minimum: 50 USDT</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                    Your Personal BEP20 Deposit Address
                  </div>
                  <div className="bg-[#0284C7]/5 border border-dashed border-[#0284C7]/30 rounded-2xl p-3 flex items-center justify-between gap-2">
                    <div className="font-mono text-xs text-[#0F172A] break-all flex-1">
                      {depositAddress}
                    </div>
                    <button
                      onClick={() => copyToClipboard(depositAddress, 'addr')}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#4F46E5] text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      {copiedAddr ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-[#0284C7]/5 border-l-4 border-[#0284C7] p-3 rounded-r-xl text-xs text-[#64748B] leading-relaxed">
                  Send only <strong className="text-[#0284C7]">USDT on BNB Smart Chain (BEP20)</strong>. Minimum package: 50 USDT. Payment detection is automatic. Keep this page open while your transaction confirms.
                </div>

                {/* Instant Activate Simulation Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setModalType('activate')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#7C3AED] text-white font-extrabold text-sm shadow-md shadow-[#0284C7]/20 flex items-center justify-center gap-2 hover:opacity-95"
                  >
                    <span>Instant Package Activation Modal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ROI Plan Tiers Grid */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>📊</span>
                  <span>Forex ROI Plan</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FBFF] border border-[#0284C7]/15 rounded-2xl p-4 text-center">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">50 – 499 USDT</div>
                    <div className="text-2xl font-black font-mono text-[#0284C7] my-1">0.80%</div>
                    <div className="text-[9px] font-bold text-[#94A3B8]">DAILY ROI · MON–FRI</div>
                  </div>
                  <div className="bg-[#F8FBFF] border border-[#0284C7]/15 rounded-2xl p-4 text-center">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">500 – 999 USDT</div>
                    <div className="text-2xl font-black font-mono text-[#0284C7] my-1">1.00%</div>
                    <div className="text-[9px] font-bold text-[#94A3B8]">DAILY ROI · MON–FRI</div>
                  </div>
                  <div className="bg-[#F8FBFF] border border-[#0284C7]/15 rounded-2xl p-4 text-center">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">1,000 – 1,999 USDT</div>
                    <div className="text-2xl font-black font-mono text-[#0284C7] my-1">1.25%</div>
                    <div className="text-[9px] font-bold text-[#94A3B8]">DAILY ROI · MON–FRI</div>
                  </div>
                  <div className="bg-[#F8FBFF] border border-[#0284C7]/15 rounded-2xl p-4 text-center">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase">2,000 – 4,999 USDT</div>
                    <div className="text-2xl font-black font-mono text-[#0284C7] my-1">1.50%</div>
                    <div className="text-[9px] font-bold text-[#94A3B8]">DAILY ROI · MON–FRI</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#0284C7]/10 to-[#4F46E5]/10 border border-[#0284C7]/20 rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">5,000+ USDT (VIP)</div>
                  <div className="text-3xl font-black font-mono text-[#0284C7] my-1">2.00%</div>
                  <div className="text-[10px] font-bold text-[#0284C7]">MAXIMUM DAILY ROI · MON–FRI</div>
                </div>

                {/* 6 Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">💳</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Min Package</div>
                    <div className="text-sm font-black font-mono text-[#0F172A]">50 USDT</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">%</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Activation Fee</div>
                    <div className="text-sm font-black font-mono text-[#0F172A]">3%</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">💸</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Withdrawal Fee</div>
                    <div className="text-sm font-black font-mono text-[#0F172A]">5%</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">📅</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">ROI Days</div>
                    <div className="text-sm font-black font-mono text-[#0F172A]">Mon–Fri</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">🐖</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Principal</div>
                    <div className="text-sm font-black font-mono text-[#059669]">Withdrawable</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5 text-center">
                    <span className="text-lg block mb-1">⏱</span>
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Processing</div>
                    <div className="text-sm font-black font-mono text-[#0F172A]">Within 72h</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ════════════════ PAGE: NETWORK / REFERRAL ══════════════ */}
          {/* ======================================================== */}
          {activePage === 'network' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-[#0284C7]/10">
                <button 
                  onClick={() => setActivePage('home')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#0284C7]/15 flex items-center justify-center text-sm font-bold text-[#0F172A]"
                >
                  ←
                </button>
                <div className="text-center">
                  <h2 className="text-base font-black text-[#0F172A]">Network</h2>
                  <p className="text-[11px] text-[#64748B]">TraderDaddy Referral Network</p>
                </div>
                <div className="w-9" />
              </div>

              {/* Refer Hero */}
              <div className="bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 rounded-3xl p-6 shadow-sm space-y-3">
                <span className="inline-flex items-center gap-1.5 bg-[#0284C7]/10 text-[#0284C7] px-3 py-1 rounded-full text-xs font-bold">
                  👥 Refer &amp; Build
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                  Invite Network. Earn <span className="text-[#0284C7]">10%</span> Direct Income
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Share your personal referral link. Direct income is 10% and becomes eligible when your personally referred member maintains the qualifying package balance for 30 qualifying days. These days may be continuous or non-continuous.
                </p>

                <div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                    Your Referral Link
                  </div>
                  <div className="bg-[#0284C7]/5 border border-dashed border-[#0284C7]/30 rounded-2xl p-3 flex items-center justify-between gap-2">
                    <div className="font-mono text-xs text-[#0F172A] break-all flex-1">
                      {referralUrl}
                    </div>
                    <button
                      onClick={() => copyToClipboard(referralUrl, 'link')}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#4F46E5] text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Info Pills */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-2xl border border-[#0284C7]/15 text-center shadow-xs">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase mb-1">Direct Income</div>
                  <div className="text-xs font-bold text-[#0284C7]">10% after 30 days</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#0284C7]/15 text-center shadow-xs">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase mb-1">Qualifying Days</div>
                  <div className="text-xs font-bold text-[#0284C7]">Continuous or not</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#0284C7]/15 text-center shadow-xs">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase mb-1">Level Income</div>
                  <div className="text-xs font-bold text-[#0284C7]">Up to 7 levels</div>
                </div>
              </div>

              {/* 4 Net Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-[#0284C7]/15 shadow-sm">
                  <span className="text-2xl block mb-1">👥</span>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Direct Referrals</div>
                  <div className="text-2xl font-black font-mono text-[#0F172A] mt-1">{directs.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#0284C7]/15 shadow-sm">
                  <span className="text-2xl block mb-1">✅</span>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Active Directs</div>
                  <div className="text-2xl font-black font-mono text-[#059669] mt-1">{directs.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#0284C7]/15 shadow-sm">
                  <span className="text-2xl block mb-1">📈</span>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Direct Business</div>
                  <div className="text-xl font-black font-mono text-[#0F172A] mt-1">1,500.00 <span className="text-xs text-[#64748B]">USDT</span></div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#0284C7]/15 shadow-sm">
                  <span className="text-2xl block mb-1">💰</span>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase">Income</div>
                  <div className="text-xl font-black font-mono text-[#D97706] mt-1">150.00 <span className="text-xs text-[#64748B]">USDT</span></div>
                </div>
              </div>

              {/* Direct Network Table */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                    <span>👥</span>
                    <span>My Direct Network</span>
                  </div>
                  <span className="text-xs font-bold text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-0.5 rounded-full">
                    {directs.length} Directs
                  </span>
                </div>

                <div className="space-y-2">
                  {directs.map(d => (
                    <div key={d.id} className="bg-[#F8FBFF] border border-[#0284C7]/10 rounded-2xl p-3.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#0F172A]">{d.name}</div>
                        <div className="text-[10px] text-[#64748B] font-mono">
                          ID: {d.id} • Joined: {d.date}
                        </div>
                        <div className="text-[10px] text-[#059669] font-semibold mt-0.5">{d.status}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black font-mono text-[#0F172A]">{d.deposit} USDT</div>
                        <div className="text-xs font-bold text-[#D97706]">+{d.earn} USDT Earned</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ════════════════ PAGE: INFO ════════════════════════════ */}
          {/* ======================================================== */}
          {activePage === 'info' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-[#0284C7]/10">
                <button 
                  onClick={() => setActivePage('home')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#0284C7]/15 flex items-center justify-center text-sm font-bold text-[#0F172A]"
                >
                  ←
                </button>
                <div className="text-center">
                  <h2 className="text-base font-black text-[#0F172A]">Information Center</h2>
                  <p className="text-[11px] text-[#64748B]">Complete Compensation &amp; Rules</p>
                </div>
                <div className="w-9" />
              </div>

              {/* Rules Cards */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="font-black text-sm text-[#0F172A]">📋 Forex Trading ROI Schedule</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Trading operates 5 days per week on live institutional forex liquidity. Saturday and Sunday are official international market closure days, hence no ROI generates over weekends.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-[#F8FBFF] rounded-xl border border-[#0F172A]/5">
                    <strong>Trading Days:</strong> Monday – Friday
                  </div>
                  <div className="p-3 bg-[#F8FBFF] rounded-xl border border-[#0F172A]/5">
                    <strong>Settlement Time:</strong> 00:00 UTC Daily
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="font-black text-sm text-[#0F172A]">💸 Fees &amp; Processing</h3>
                <div className="space-y-2 text-xs text-[#64748B]">
                  <div className="flex justify-between p-2 rounded-lg bg-[#F8FBFF]">
                    <span>Activation Service Fee</span>
                    <strong className="text-[#0F172A]">3%</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#F8FBFF]">
                    <span>Withdrawal Processing Fee</span>
                    <strong className="text-[#0F172A]">5%</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#F8FBFF]">
                    <span>Minimum Withdrawal Amount</span>
                    <strong className="text-[#0F172A]">10 USDT</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#F8FBFF]">
                    <span>Principal Capital Withdrawal</span>
                    <strong className="text-[#059669]">Processed within 72h</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ════════════════ PAGE: PROFILE ═════════════════════════ */}
          {/* ======================================================== */}
          {activePage === 'profile' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-[#0284C7]/10">
                <button 
                  onClick={() => setActivePage('home')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#0284C7]/15 flex items-center justify-center text-sm font-bold text-[#0F172A]"
                >
                  ←
                </button>
                <div className="text-center">
                  <h2 className="text-base font-black text-[#0F172A]">Profile</h2>
                  <p className="text-[11px] text-[#64748B]">TraderDaddy Account &amp; Security</p>
                </div>
                <div className="w-9" />
              </div>

              {/* Profile Hero */}
              <div className="bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0284C7] via-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-2xl font-black text-white shadow-md shadow-[#0284C7]/25">
                  {profileName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-black text-[#0F172A]">{profileName}</h2>
                  <div className="text-xs font-mono font-bold text-[#0284C7]">{userId}</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Member since 31 Aug 2026</div>
                </div>
              </div>

              {/* 2x2 Account Details */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>🪪</span>
                  <span>Account Information</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">User ID</div>
                    <div className="text-xs font-bold font-mono text-[#0F172A] mt-0.5">{userId}</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Referral Code</div>
                    <div className="text-xs font-bold font-mono text-[#0F172A] mt-0.5">{userId}</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold uppercase text-[#64748B] flex items-center gap-1">
                      <span>Email</span>
                      <span className="text-[8px] bg-[#059669]/10 text-[#059669] px-1 rounded">✓ Verified</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#0F172A] truncate mt-0.5">{userEmail}</div>
                  </div>
                  <div className="bg-[#F8FBFF] p-3 rounded-2xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold uppercase text-[#64748B]">Mobile</div>
                    <div className="text-xs font-bold font-mono text-[#0F172A] mt-0.5">{profileMobile}</div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="bg-white border border-[#0284C7]/15 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#0F172A]">
                  <span>✏️</span>
                  <span>Edit Profile</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#F8FBFF] border border-[#0284C7]/20 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#0F172A] outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">Verified Email</label>
                    <input 
                      type="text" 
                      value={userEmail} 
                      disabled
                      className="w-full bg-[#F0F4F8] border border-[#0F172A]/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#64748B] cursor-not-allowed"
                    />
                    <div className="text-[10px] text-[#94A3B8] mt-1">Email changes require 2FA OTP verification.</div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#64748B] block mb-1">Mobile Number</label>
                    <input 
                      type="text" 
                      value={profileMobile} 
                      onChange={(e) => setProfileMobile(e.target.value)}
                      className="w-full bg-[#F8FBFF] border border-[#0284C7]/20 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <button 
                    onClick={() => showToast('✓ Profile updated successfully')}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#4F46E5] text-white font-extrabold text-xs shadow-md shadow-[#0284C7]/20 hover:opacity-95"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── BOTTOM APP NAVIGATION (5 tabs) ── */}
        <div className="sticky bottom-0 z-[190] bg-white/95 backdrop-blur-xl border-t border-[#0284C7]/15 py-2 px-3 flex items-center justify-around shadow-lg">
          <button 
            onClick={() => setActivePage('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activePage === 'home' ? 'text-[#0284C7] scale-105 font-bold' : 'text-[#64748B] font-medium'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-[10px]">Home</span>
          </button>

          <button 
            onClick={() => setActivePage('network')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activePage === 'network' ? 'text-[#0284C7] scale-105 font-bold' : 'text-[#64748B] font-medium'
            }`}
          >
            <span className="text-xl">👥</span>
            <span className="text-[10px]">Network</span>
          </button>

          {/* Floating Center Action Button */}
          <button 
            onClick={() => setModalType('activate')}
            className="w-13 h-13 -mt-6 rounded-2xl bg-gradient-to-br from-[#0284C7] via-[#4F46E5] to-[#7C3AED] text-white flex flex-col items-center justify-center shadow-xl shadow-[#0284C7]/30 hover:scale-105 active:scale-95 transition-all border-2 border-white"
          >
            <span className="text-lg leading-none">⚡</span>
            <span className="text-[9px] font-black uppercase">Buy</span>
          </button>

          <button 
            onClick={() => setActivePage('info')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activePage === 'info' ? 'text-[#0284C7] scale-105 font-bold' : 'text-[#64748B] font-medium'
            }`}
          >
            <span className="text-xl">ℹ️</span>
            <span className="text-[10px]">Info</span>
          </button>

          <button 
            onClick={() => setActivePage('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activePage === 'profile' ? 'text-[#0284C7] scale-105 font-bold' : 'text-[#64748B] font-medium'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="text-[10px]">Profile</span>
          </button>
        </div>

      </div>

      {/* ── 3D MODALS ── */}
      {modalType && (
        <div 
          className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalType(null)}
        >
          <div 
            className="w-full max-w-md bg-gradient-to-br from-white via-[#F0F7FF] to-[#E8F4FC] border border-[#0284C7]/20 rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0F172A]/5 hover:bg-[#0F172A]/10 text-sm flex items-center justify-center font-bold text-[#64748B]"
            >
              ✕
            </button>

            {modalType === 'activate' ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-1">💼</div>
                  <h3 className="text-xl font-black text-[#0F172A]">Activate Package</h3>
                  <p className="text-xs text-[#64748B]">Select your package and activate your Forex investment.</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">Min. Inv</div>
                    <div className="font-extrabold text-[#0F172A]">50 USDT</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">ROI</div>
                    <div className="font-extrabold text-[#059669]">
                      {getRoiPercent(typeof activateAmount === 'number' ? activateAmount : 50)}%
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">Fee</div>
                    <div className="font-extrabold text-[#0F172A]">3%</div>
                  </div>
                </div>

                {/* Quick select presets */}
                <div className="flex gap-2">
                  {[50, 100, 500, 1000, 5000].map(val => (
                    <button
                      key={val}
                      onClick={() => setActivateAmount(val)}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                        activateAmount === val 
                          ? 'bg-[#0284C7] text-white shadow-xs' 
                          : 'bg-white text-[#64748B] border border-[#0284C7]/20 hover:border-[#0284C7]'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#64748B] uppercase block mb-1">USDT Amount</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-[#64748B]">
                      USDT
                    </span>
                    <input 
                      type="number"
                      min="50"
                      value={activateAmount}
                      onChange={(e) => setActivateAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Enter amount (min 50)"
                      className="w-full bg-white border border-[#0284C7]/30 rounded-2xl pl-16 pr-4 py-3 text-base font-bold font-mono text-[#0F172A] outline-none focus:border-[#0284C7] shadow-inner"
                    />
                  </div>
                </div>

                <button
                  onClick={handleConfirmActivate}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#7C3AED] text-white font-extrabold text-sm shadow-lg shadow-[#0284C7]/25 hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  Activate Now →
                </button>

                <p className="text-[10px] text-center text-[#64748B]">
                  Funds will be credited and daily ROI calculated starting on the next settlement window.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-1">💸</div>
                  <h3 className="text-xl font-black text-[#0F172A]">Withdraw Funds</h3>
                  <p className="text-xs text-[#64748B]">Withdraw your available balance to your BEP20 USDT address.</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">Available</div>
                    <div className="font-extrabold text-[#0F172A] font-mono">{withdrawableIncome.toFixed(2)}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">Fee</div>
                    <div className="font-extrabold text-[#0F172A]">5%</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#0F172A]/5">
                    <div className="text-[9px] font-bold text-[#64748B]">Speed</div>
                    <div className="font-extrabold text-[#059669]">Instant</div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#64748B] uppercase block mb-1">Withdraw Amount</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-[#64748B]">
                      USDT
                    </span>
                    <input 
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder={`Max: ${withdrawableIncome.toFixed(2)}`}
                      className="w-full bg-white border border-[#0284C7]/30 rounded-2xl pl-16 pr-4 py-3 text-base font-bold font-mono text-[#0F172A] outline-none focus:border-[#0284C7] shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#64748B] uppercase block mb-1">Destination BEP20 Address</label>
                  <input 
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full bg-white border border-[#0284C7]/30 rounded-2xl px-4 py-3 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0284C7] shadow-inner"
                  />
                </div>

                <button
                  onClick={handleConfirmWithdraw}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#7C3AED] text-white font-extrabold text-sm shadow-lg shadow-[#0284C7]/25 hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  Confirm Withdrawal →
                </button>

                <p className="text-[10px] text-center text-[#64748B]">
                  Withdrawal fee is 5%. Minimum withdrawal amount is 10 USDT.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
