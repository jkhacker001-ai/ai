import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Server,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Key,
  User,
  Phone,
  Layers,
  Award,
  Globe,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { AccountTier } from '../types';

interface AuthPortalProps {
  onViewPublicSite?: () => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ onViewPublicSite }) => {
  const { user, login, registerUser } = useTrading();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login State
  const [loginType, setLoginType] = useState<'email' | 'mt5'>('email');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginServer, setLoginServer] = useState('NexusFX-Live01');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSponsorIB, setRegSponsorIB] = useState('IB-GLOBAL-MASTER01');
  const [regTier, setRegTier] = useState<AccountTier>('vip');
  const [regMode, setRegMode] = useState<'real' | 'demo'>('real');
  const [regLeverage, setRegLeverage] = useState('1:1000');

  // Quick Demo Auto-Fill
  const handleQuickFillDemo = () => {
    setLoginType('email');
    setLoginIdentifier('rajesh@nexusfx.trade');
    setLoginPassword('Nx#9821!');
    setLoginServer('NexusFX-Live01');
    setLoginError('');
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const res = login(loginIdentifier, loginPassword);
      if (res.success) {
        setLoginSuccess(res.message || 'Authenticated successfully! Loading your IB structure...');
      } else {
        setLoginError(res.message || 'Invalid login details.');
      }
    }, 400);
  };

  // Submit Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      registerUser({
        fullName: regFullName.trim() || 'New Partner',
        email: regEmail.trim(),
        phone: regPhone.trim(),
        accountMode: regMode,
        accountTier: regTier,
        mt5Pass: regPassword || `Nx#${Math.random().toString(36).substring(2, 7)}!`,
        sponsorIBCode: regSponsorIB.trim() || 'IB-GLOBAL-MASTER01',
        leverage: regLeverage
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-[#F8FAFF] flex flex-col justify-between relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F0C040]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] via-[#E8A020] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] shadow-lg shadow-[#F0C040]/25 text-xl">
            N
          </div>
          <div>
            <div className="font-serif text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>NexusFX</span>
              <span className="text-[10px] font-black uppercase text-[#F0C040] bg-[#F0C040]/15 border border-[#F0C040]/30 px-2 py-0.5 rounded-full">
                Partner & IB Network
              </span>
            </div>
            <p className="text-[11px] text-[#8892A4]">Next-Gen Multi-Tier Brokerage Portal</p>
          </div>
        </div>

        {onViewPublicSite && (
          <button
            onClick={onViewPublicSite}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#8892A4] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#00D4FF]" />
            <span>Explore Brokerage Website</span>
          </button>
        )}
      </header>

      {/* Main Authentication Card Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: IB Value Proposition & Network Overview */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0C040]/10 border border-[#F0C040]/30 text-[#F0C040] text-xs font-extrabold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Multi-Tier IB Partner Program</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
              Manage Your Sub-IBs, Traders &amp; Fund Hierarchy in Real-Time.
            </h2>

            <p className="text-sm text-[#8892A4] leading-relaxed">
              Login or register under an IB sponsor to view your live downline network, total deposited funds, trading volumes, and instant cash rebates.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#0E1322] border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#00E676]/15 text-[#00E676] flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Live Network Fund Tracking</div>
                  <div className="text-[11px] text-[#8892A4]">
                    Monitor exact funds deposited by every Sub-IB and client in your tree.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1322] border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 text-[#00D4FF] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Multi-Tier Downline Structure</div>
                  <div className="text-[11px] text-[#8892A4]">
                    Earn up to $15/lot on Tier 1 direct clients + $5/lot on Tier 2 Sub-IBs.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1322] border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F0C040]/15 text-[#F0C040] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Automated Rebate Settlement</div>
                  <div className="text-[11px] text-[#8892A4]">
                    Instant payouts directly to USDT, UPI, or segregated MT5 trading balance.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login & Register Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0E1322] border border-[#F0C040]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Header Tab Switcher */}
              <div className="grid grid-cols-2 p-1 bg-[#070A13] rounded-2xl border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setLoginError('');
                    setLoginSuccess('');
                  }}
                  className={`py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'login'
                      ? 'bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] shadow-md shadow-[#F0C040]/25'
                      : 'text-[#8892A4] hover:text-white'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>1. Login to Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setLoginError('');
                    setLoginSuccess('');
                  }}
                  className={`py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'register'
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A3FF] text-[#0A0E1A] shadow-md shadow-[#00D4FF]/25'
                      : 'text-[#8892A4] hover:text-white'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>2. Register under IB</span>
                </button>
              </div>

              {/* TAB 1: LOGIN FORM */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8892A4] font-medium">Login Method:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginType('email');
                          setLoginIdentifier('');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          loginType === 'email'
                            ? 'bg-[#F0C040]/20 text-[#F0C040] border border-[#F0C040]/40'
                            : 'text-[#8892A4] hover:text-white border border-white/5'
                        }`}
                      >
                        Email Address
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginType('mt5');
                          setLoginIdentifier('');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          loginType === 'mt5'
                            ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40'
                            : 'text-[#8892A4] hover:text-white border border-white/5'
                        }`}
                      >
                        MT5 Login ID
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white uppercase block tracking-wider">
                      {loginType === 'email' ? 'Account Email Address' : 'MT5 Account Login Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        {loginType === 'email' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <input
                        type={loginType === 'email' ? 'email' : 'text'}
                        required
                        placeholder={loginType === 'email' ? 'e.g. rajesh@nexusfx.trade' : 'e.g. 7098421'}
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white uppercase block tracking-wider">
                      Account / MT5 Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8892A4] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#8892A4] uppercase block tracking-wider">
                      MT5 Live Server
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Server className="w-4 h-4" />
                      </div>
                      <select
                        value={loginServer}
                        onChange={(e) => setLoginServer(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option value="NexusFX-Live01">NexusFX-Live01 (Real Multi-Asset ECN)</option>
                        <option value="NexusFX-Live02">NexusFX-Live02 (VIP Institutional Liquidity)</option>
                        <option value="NexusFX-Demo01">NexusFX-Demo01 (Practice Sandbox)</option>
                      </select>
                    </div>
                  </div>

                  {/* Demo Credential Helper */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={handleQuickFillDemo}
                      className="text-xs font-bold text-[#F0C040] hover:text-[#FFD700] bg-[#F0C040]/10 px-3 py-1.5 rounded-lg border border-[#F0C040]/30 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F0C040]" />
                      <span>Auto-Fill Master Demo Partner (Rajesh Kumar)</span>
                    </button>
                  </div>

                  {/* Feedback */}
                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                      {loginError}
                    </div>
                  )}
                  {loginSuccess && (
                    <div className="p-3 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{loginSuccess}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#E8A020] hover:shadow-xl hover:shadow-[#F0C040]/30 uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <span>Verifying &amp; Loading Structure...</span>
                    ) : (
                      <>
                        <span>Sign In &amp; Open IB Structure</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 2: REGISTER UNDER IB FORM */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs text-[#00D4FF] flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Creating your Master ID &amp; linking directly under an IB sponsor.</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      Full Legal Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                        Email Address (Main ID)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#00D4FF] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98112 34567"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#00D4FF] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Sponsor IB Code (User requested: "jab user apna main id password banayega kisi ib ke under") */}
                  <div>
                    <label className="text-xs font-bold text-[#F0C040] uppercase block mb-1 flex items-center justify-between">
                      <span>Sponsor IB Partner Code (Under Whom You Are Registering)</span>
                      <span className="text-[10px] text-[#8892A4]">Required</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F0C040]">
                        <Award className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IB-GLOBAL-MASTER01 or IB-RAJESH88"
                        value={regSponsorIB}
                        onChange={(e) => setRegSponsorIB(e.target.value)}
                        className="w-full bg-[#070A13] border border-[#F0C040]/40 focus:border-[#F0C040] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F0C040] font-mono font-bold focus:outline-none"
                      />
                    </div>
                    <div className="text-[11px] text-[#8892A4] mt-1">
                      Your account will be placed into this IB's tree structure and qualify for high rebates.
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create strong password (min 6 chars)"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8892A4] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Account Tier</label>
                      <select
                        value={regTier}
                        onChange={(e) => setRegTier(e.target.value as AccountTier)}
                        className="w-full bg-[#070A13] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="vip">VIP Institutional ($5,000)</option>
                        <option value="pro">Pro ECN ($500)</option>
                        <option value="starter">Starter ($50)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Leverage</label>
                      <select
                        value={regLeverage}
                        onChange={(e) => setRegLeverage(e.target.value)}
                        className="w-full bg-[#070A13] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="1:1000">1:1000 Pro</option>
                        <option value="1:2000">1:2000 Max Ultra</option>
                        <option value="1:500">1:500 Standard</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#00D4FF] via-[#00E676] to-[#00D4FF] hover:shadow-xl hover:shadow-[#00D4FF]/30 uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <span>Creating Account &amp; Building Structure...</span>
                    ) : (
                      <>
                        <span>Complete Registration &amp; View Structure</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-white/10 text-center text-xs text-[#8892A4]">
        NexusFX Global Financial Technologies LLC • Registered Tier-1 Multi-Asset IB &amp; ECN Trading Engine
      </footer>
    </div>
  );
};
