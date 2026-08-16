import React, { useState } from 'react';
import { AccountTier } from '../types';
import { useTrading } from '../context/TradingContext';
import { X, CheckCircle, ShieldCheck, ArrowRight, UserCheck, Lock, Download, Key } from 'lucide-react';

interface AccountRegistrationModalProps {
  initialTier?: AccountTier;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export const AccountRegistrationModal: React.FC<AccountRegistrationModalProps> = ({
  initialTier = 'pro',
  onClose,
  onOpenTerminal
}) => {
  const { updateUserCredentials } = useTrading();
  const [step, setStep] = useState<number>(1);
  const [mode, setMode] = useState<'real' | 'demo'>('real');
  const [selectedTier, setSelectedTier] = useState<AccountTier>(initialTier);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [leverage, setLeverage] = useState<string>('1:1000');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [ibCode, setIbCode] = useState<string>('');
  const [credentials, setCredentials] = useState<{ login: string; pass: string; server: string } | null>(null);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const login = `${mode === 'real' ? '709' : '909'}${Math.floor(10000 + Math.random() * 90000)}`;
    const pass = `Nx#${Math.random().toString(36).substring(2, 7)}!`;
    const server = `NexusFX-${mode === 'real' ? 'Live01' : 'Demo01'}`;

    setCredentials({ login, pass, server });
    updateUserCredentials({
      fullName: fullName || 'Rajesh Kumar',
      email: email || 'trader@nexusfx.trade',
      phone: phone || '+91 98765 43210',
      accountMode: mode,
      accountTier: selectedTier,
      mt5Login: login,
      mt5Server: server,
      mt5Pass: pass,
      leverage
    });

    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto">
      <div className="bg-[#141824] border border-[#F0C040]/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative my-8">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#E8A020] flex items-center justify-center font-bold text-[#0A0E1A]">
              N
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Open NexusFX Account</h3>
              <p className="text-xs text-[#8892A4]">Instant MT5 & WebTerminal Activation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#8892A4] hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-bold text-[#8892A4]">
          <span className={step >= 1 ? 'text-[#F0C040]' : ''}>1. Account Specs</span>
          <span>•</span>
          <span className={step >= 2 ? 'text-[#F0C040]' : ''}>2. User Info</span>
          <span>•</span>
          <span className={step >= 3 ? 'text-[#00E676]' : ''}>3. MT5 Credentials</span>
        </div>

        {/* Step 1: Mode & Plan Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#0A0E1A] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setMode('real')}
                className={`py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                  mode === 'real'
                    ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                Real Live Account
              </button>
              <button
                type="button"
                onClick={() => setMode('demo')}
                className={`py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                  mode === 'demo'
                    ? 'bg-[#00D4FF] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                Demo Practice
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-white uppercase block">Select Account Tier</label>
              <div className="space-y-2">
                {[
                  { id: 'starter', name: 'Starter Account', dep: '$50', spread: 'From 1.5 pips' },
                  { id: 'pro', name: 'Pro ECN Account', dep: '$500', spread: 'From 0.1 pips' },
                  { id: 'vip', name: 'VIP Institutional', dep: '$5,000', spread: 'From 0.0 pips' }
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as AccountTier)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedTier === tier.id
                        ? 'bg-[#F0C040]/15 border-[#F0C040] text-white'
                        : 'bg-[#0A0E1A] border-white/10 text-[#8892A4]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{tier.name}</div>
                      <div className="text-[10px] opacity-75">{tier.spread}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#F0C040]">{tier.dep} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Base Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Leverage</label>
                <select
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="1:100">1:100 Conservative</option>
                  <option value="1:500">1:500 Standard</option>
                  <option value="1:1000">1:1000 Pro High</option>
                  <option value="1:2000">1:2000 Max Leverage</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Continue to User Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: User Registration Form */}
        {step === 2 && (
          <form onSubmit={handleSubmitDetails} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#F0C040] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="rajesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#F0C040] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#F0C040] focus:outline-none"
              />
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
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-[#F0C040] font-mono focus:border-[#F0C040] focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl font-bold text-xs text-[#8892A4] border border-white/10 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3.5 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] uppercase tracking-wider"
              >
                Create Trading Account
              </button>
            </div>
          </form>
        )}

        {/* Step 3: MT5 Account Credentials Generated */}
        {step === 3 && credentials && (
          <div className="space-y-6 text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676] flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-black text-white">Account Active & Saved!</h4>
              <p className="text-xs text-[#8892A4] mt-1">Your MT5 MetaTrader login details have been generated.</p>
            </div>

            <div className="bg-[#0A0E1A] border border-[#F0C040]/30 rounded-2xl p-5 space-y-3 text-left font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-[#8892A4]">MT5 Server</span>
                <span className="font-bold text-[#F0C040]">{credentials.server}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-[#8892A4]">Login ID</span>
                <span className="font-bold text-white">{credentials.login}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-[#8892A4]">Trader Password</span>
                <span className="font-bold text-[#00E676]">{credentials.pass}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8892A4]">Leverage</span>
                <span className="font-bold text-white">{leverage}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenTerminal) onOpenTerminal();
                }}
                className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] uppercase tracking-wider"
              >
                Launch WebTerminal Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
