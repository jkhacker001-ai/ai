import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
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
  Copy,
  Check,
  User,
  Phone,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { AccountTier } from '../types';

export type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  initialTier?: AccountTier;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  initialTier = 'pro',
  onClose,
  onOpenTerminal
}) => {
  const { user, login, registerUser } = useTrading();
  const [activeTab, setActiveTab] = useState<AuthMode>(initialMode);

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
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Register State
  const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(1);
  const [accountMode, setAccountMode] = useState<'real' | 'demo'>('real');
  const [selectedTier, setSelectedTier] = useState<AccountTier>(initialTier);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [leverage, setLeverage] = useState<string>('1:1000');
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [ibCode, setIbCode] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Handle Tab Switch
  const handleSwitchTab = (tab: AuthMode) => {
    setActiveTab(tab);
    setLoginError('');
    setLoginSuccess('');
    setShowForgotNotice(false);
  };

  // Quick Demo Login Helper
  const handleQuickDemoLogin = () => {
    setLoginType('mt5');
    setLoginIdentifier(user.mt5Login || '7098421');
    setLoginPassword(user.mt5Pass || 'Nx#9821!');
    setLoginServer(user.mt5Server || 'NexusFX-Live01');
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
        setLoginSuccess(res.message || 'Logged in successfully!');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setLoginError(res.message || 'Invalid login details.');
      }
    }, 400);
  };

  // Submit Register Details
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      registerUser({
        fullName: fullName.trim() || 'Valued Trader',
        email: regEmail.trim(),
        phone: regPhone.trim(),
        accountMode,
        accountTier: selectedTier,
        mt5Pass: regPassword || `Nx#${Math.random().toString(36).substring(2, 7)}!`,
        leverage
      });
      setRegisterStep(3);
    }, 400);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#141824] border border-[#F0C040]/30 rounded-2xl max-w-lg w-full shadow-2xl relative my-6 overflow-hidden flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0E1A]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] via-[#E8A020] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] shadow-md shadow-[#F0C040]/20">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  NexusFX Client Portal
                </h3>
                <span className="text-[10px] font-extrabold text-[#F0C040] bg-[#F0C040]/10 border border-[#F0C040]/30 px-2 py-0.5 rounded-full uppercase">
                  MT5 Live
                </span>
              </div>
              <p className="text-xs text-[#8892A4]">
                {activeTab === 'login'
                  ? 'Sign in to access your Trading Account & IB Dashboard'
                  : 'Open a real ECN or demo trading account in seconds'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8892A4] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher Header (Login vs Register) */}
        <div className="px-6 pt-4 pb-1">
          <div className="grid grid-cols-2 p-1 bg-[#0A0E1A] rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              className={`py-2.5 rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] shadow-md shadow-[#F0C040]/20'
                  : 'text-[#8892A4] hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('register')}
              className={`py-2.5 rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A3FF] text-[#0A0E1A] shadow-md shadow-[#00D4FF]/20'
                  : 'text-[#8892A4] hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register / Open Account</span>
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 space-y-5">
          {/* ======================= LOGIN VIEW ======================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Quick Login Mode: Email vs MT5 ID */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8892A4] font-medium">Login via:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginType('email');
                      setLoginIdentifier('');
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
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
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                      loginType === 'mt5'
                        ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40'
                        : 'text-[#8892A4] hover:text-white border border-white/5'
                    }`}
                  >
                    MT5 Account ID
                  </button>
                </div>
              </div>

              {/* Identifier Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white uppercase block tracking-wider">
                  {loginType === 'email' ? 'Registered Email Address' : 'MT5 Trading Login ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                    {loginType === 'email' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <input
                    type={loginType === 'email' ? 'email' : 'text'}
                    required
                    placeholder={
                      loginType === 'email' ? 'e.g. rajesh@nexusfx.trade' : 'e.g. 7098421 or 9091234'
                    }
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-white uppercase block tracking-wider">
                    Trader Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(!showForgotNotice)}
                    className="text-[11px] font-semibold text-[#00D4FF] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your MT5 / Account Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors font-mono"
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

              {/* Server Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8892A4] uppercase block tracking-wider">
                  MT5 Server
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                    <Server className="w-4 h-4" />
                  </div>
                  <select
                    value={loginServer}
                    onChange={(e) => setLoginServer(e.target.value)}
                    className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#F0C040] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="NexusFX-Live01">NexusFX-Live01 (Real High-Speed ECN)</option>
                    <option value="NexusFX-Live02">NexusFX-Live02 (Institutional VIP)</option>
                    <option value="NexusFX-Demo01">NexusFX-Demo01 (Practice Sandbox)</option>
                  </select>
                </div>
              </div>

              {/* Remember Me & Quick 1-Click Demo Fill */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#0A0E1A] border-white/20 text-[#F0C040] focus:ring-0"
                  />
                  <span className="text-xs text-[#8892A4]">Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-[11px] font-bold text-[#F0C040] hover:text-[#FFD700] bg-[#F0C040]/10 px-2.5 py-1 rounded-md border border-[#F0C040]/20 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#F0C040]" />
                  <span>Auto-Fill Demo Credentials</span>
                </button>
              </div>

              {/* Forgot Password Helper Notice */}
              {showForgotNotice && (
                <div className="p-3.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-xl text-xs space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-[#00D4FF] flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" />
                    <span>Quick MT5 Password Recovery</span>
                  </div>
                  <p className="text-[#8892A4]">
                    Default master demo password is <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">Nx#9821!</code> or click "Auto-Fill Demo Credentials" above to test immediately.
                  </p>
                </div>
              )}

              {/* Error & Success Feedback */}
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

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#E8A020] hover:shadow-xl hover:shadow-[#F0C040]/30 transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Log In to Trading Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="pt-2 text-center text-[11px] text-[#8892A4] flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
                <span>256-Bit SSL Encrypted MetaTrader 5 Bridge</span>
              </div>
            </form>
          )}

          {/* ======================= REGISTER VIEW ======================= */}
          {activeTab === 'register' && (
            <div>
              {/* Step Tracker */}
              <div className="flex items-center justify-between text-xs font-bold text-[#8892A4] mb-5 px-1">
                <span className={registerStep >= 1 ? 'text-[#00D4FF]' : ''}>1. Account Plan</span>
                <span>•</span>
                <span className={registerStep >= 2 ? 'text-[#00D4FF]' : ''}>2. Trader Info</span>
                <span>•</span>
                <span className={registerStep >= 3 ? 'text-[#00E676]' : ''}>3. MT5 Credentials</span>
              </div>

              {/* Register Step 1: Mode & Tier */}
              {registerStep === 1 && (
                <div className="space-y-4">
                  {/* Real vs Demo Mode */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#0A0E1A] rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setAccountMode('real')}
                      className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                        accountMode === 'real'
                          ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md'
                          : 'text-[#8892A4] hover:text-white'
                      }`}
                    >
                      Real Live ECN
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountMode('demo')}
                      className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                        accountMode === 'demo'
                          ? 'bg-[#00D4FF] text-[#0A0E1A] shadow-md'
                          : 'text-[#8892A4] hover:text-white'
                      }`}
                    >
                      Demo Practice ($50k)
                    </button>
                  </div>

                  {/* Tier Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase block">
                      Choose Trading Tier
                    </label>
                    {[
                      {
                        id: 'starter',
                        name: 'Starter Account',
                        dep: '$50 min',
                        spread: '1.5 pips · 0 Comm.',
                        desc: 'Perfect for beginners'
                      },
                      {
                        id: 'pro',
                        name: 'Pro ECN Account (Most Popular)',
                        dep: '$500 min',
                        spread: '0.1 pips · Raw Spreads',
                        desc: 'Best for EAs, Scalping & Active Traders'
                      },
                      {
                        id: 'vip',
                        name: 'VIP Institutional',
                        dep: '$5,000 min',
                        spread: '0.0 pips · Dedicated VPS',
                        desc: 'Custom liquidity & Master IB perks'
                      }
                    ].map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTier(t.id as AccountTier)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedTier === t.id
                            ? 'bg-[#00D4FF]/15 border-[#00D4FF] text-white shadow-lg shadow-[#00D4FF]/10'
                            : 'bg-[#0A0E1A] border-white/10 text-[#8892A4] hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-white flex items-center gap-1.5">
                            <span>{t.name}</span>
                          </div>
                          <div className="text-[11px] text-[#8892A4] mt-0.5">{t.spread}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-[#F0C040]">
                            {accountMode === 'demo' ? '$50,000 Demo' : t.dep}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Currency & Leverage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                        Base Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                        className="w-full bg-[#0A0E1A] border border-white/15 rounded-xl p-2.5 text-xs text-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                        Max Leverage
                      </label>
                      <select
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                        className="w-full bg-[#0A0E1A] border border-white/15 rounded-xl p-2.5 text-xs text-white"
                      >
                        <option value="1:100">1:100 Conservative</option>
                        <option value="1:500">1:500 Standard</option>
                        <option value="1:1000">1:1000 Pro High</option>
                        <option value="1:2000">1:2000 Max Ultra</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRegisterStep(2)}
                    className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#00D4FF] via-[#00E676] to-[#00D4FF] hover:shadow-xl hover:shadow-[#00D4FF]/30 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Trader Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Register Step 2: Form */}
              {registerStep === 2 && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
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
                        placeholder="e.g. Rajesh Kumar"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajesh@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      Create Password (MT5 & Web Portal)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8892A4]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create a strong password (min 6 chars)"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#00D4FF] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none font-mono"
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

                  <div>
                    <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                      IB Partner Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IB-99420"
                      value={ibCode}
                      onChange={(e) => setIbCode(e.target.value)}
                      className="w-full bg-[#0A0E1A] border border-white/15 focus:border-[#F0C040] rounded-xl px-4 py-2.5 text-xs text-[#F0C040] font-mono focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegisterStep(1)}
                      className="w-1/3 py-3 rounded-xl font-bold text-xs text-[#8892A4] border border-white/10 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-3.5 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#00D4FF] via-[#00E676] to-[#00D4FF] uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <span>Creating MT5 Account...</span> : <span>Create Account</span>}
                    </button>
                  </div>
                </form>
              )}

              {/* Register Step 3: Account Activated */}
              {registerStep === 3 && (
                <div className="space-y-5 text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676] flex items-center justify-center mx-auto shadow-lg shadow-[#00E676]/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl font-black text-white">
                      Account Created & Logged In!
                    </h4>
                    <p className="text-xs text-[#8892A4] mt-1">
                      Your MT5 MetaTrader 5 trading credentials have been registered and activated.
                    </p>
                  </div>

                  <div className="bg-[#0A0E1A] border border-[#00D4FF]/30 rounded-2xl p-4 space-y-2.5 text-left font-mono text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-[#8892A4]">MT5 Server</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00D4FF]">{user.mt5Server}</span>
                        <button
                          onClick={() => handleCopy(user.mt5Server, 'server')}
                          className="p-1 hover:text-[#00D4FF]"
                          title="Copy Server"
                        >
                          {copiedKey === 'server' ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5 text-[#8892A4]" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-[#8892A4]">Login ID</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{user.mt5Login}</span>
                        <button
                          onClick={() => handleCopy(user.mt5Login, 'login')}
                          className="p-1 hover:text-[#00D4FF]"
                          title="Copy Login"
                        >
                          {copiedKey === 'login' ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5 text-[#8892A4]" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-[#8892A4]">Password</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00E676]">{user.mt5Pass}</span>
                        <button
                          onClick={() => handleCopy(user.mt5Pass, 'pass')}
                          className="p-1 hover:text-[#00D4FF]"
                          title="Copy Password"
                        >
                          {copiedKey === 'pass' ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5 text-[#8892A4]" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1 text-[11px]">
                      <span className="text-[#8892A4]">Balance / Leverage</span>
                      <span className="font-bold text-[#F0C040]">
                        ${user.balance.toLocaleString()} · {user.leverage}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenTerminal) onOpenTerminal();
                      }}
                      className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#E8A020] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#F0C040]/30"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Launch Live Web Terminal Now</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-[#8892A4] hover:text-white transition-colors"
                    >
                      Close and Continue Browsing
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
