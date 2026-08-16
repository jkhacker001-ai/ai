import React, { useState } from 'react';
import { Calculator, DollarSign, Users, Award, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { AccountTier } from '../types';

interface IBCalculatorProps {
  onOpenIBDashboard: () => void;
}

export const IBCalculator: React.FC<IBCalculatorProps> = ({ onOpenIBDashboard }) => {
  const [clients, setClients] = useState<number>(50);
  const [lots, setLots] = useState<number>(20);
  const [tierRate, setTierRate] = useState<number>(12); // $12 default Pro
  const [tierName, setTierName] = useState<AccountTier>('pro');
  const [copied, setCopied] = useState<boolean>(false);

  const totalLots = clients * lots;
  const monthlyEarnings = totalLots * tierRate;
  const yearlyEarnings = monthlyEarnings * 12;

  const handleTierChange = (rate: number, name: AccountTier) => {
    setTierRate(rate);
    setTierName(name);
  };

  const sampleReferralLink = `https://nexusfx.trade/partner/ref?id=IB-${Math.floor(monthlyEarnings)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleReferralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculator" className="py-24 bg-[#0A0E1A]/30 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0C040] bg-[#F0C040]/10 px-4 py-1.5 rounded-full border border-[#F0C040]/30 inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Partner Estimator</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Calculate Your IB Income Potential
          </h2>
          <p className="text-[#8892A4] text-sm sm:text-base">
            Adjust the sliders to simulate your monthly passive rebate earnings as a NexusFX Introducing Broker partner.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-[#1A2035] border border-[#F0C040]/20 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
            {/* Slider 1: Referred Clients */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#F0C040]" />
                  <span>Number of Active Referred Clients</span>
                </label>
                <span className="font-serif font-extrabold text-xl text-[#F0C040]">{clients} Clients</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F0C040]"
              />
              <div className="flex justify-between text-[10px] text-[#8892A4] uppercase font-bold">
                <span>5 Clients</span>
                <span>250 Clients</span>
                <span>500+ Clients</span>
              </div>
            </div>

            {/* Slider 2: Average Lots per Month */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#00D4FF]" />
                  <span>Avg Traded Lots / Client / Month</span>
                </label>
                <span className="font-serif font-extrabold text-xl text-[#00D4FF]">{lots} Lots / mo</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={lots}
                onChange={(e) => setLots(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
              <div className="flex justify-between text-[10px] text-[#8892A4] uppercase font-bold">
                <span>1 Lot</span>
                <span>50 Lots</span>
                <span>100 Lots</span>
              </div>
            </div>

            {/* Account Tier Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white">Select Partner Commission Tier</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleTierChange(8, 'starter')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tierName === 'starter'
                      ? 'bg-[#F0C040]/15 border-[#F0C040] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-[#8892A4] hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">Starter</div>
                  <div className="text-sm font-black text-[#F0C040]">$8 / Lot</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTierChange(12, 'pro')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tierName === 'pro'
                      ? 'bg-[#F0C040]/15 border-[#F0C040] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-[#8892A4] hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">Pro (Default)</div>
                  <div className="text-sm font-black text-[#F0C040]">$12 / Lot</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTierChange(15, 'vip')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tierName === 'vip'
                      ? 'bg-[#00D4FF]/15 border-[#00D4FF] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-[#8892A4] hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase">VIP Partner</div>
                  <div className="text-sm font-black text-[#00D4FF]">$15 / Lot</div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#141824] via-[#1A2035] to-[#0A0E1A] border border-[#F0C040]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider">Estimated Breakdown</span>
                <h3 className="font-serif text-2xl font-black text-white">Monthly Revenue</h3>
              </div>
              <Sparkles className="w-6 h-6 text-[#F0C040]" />
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[#8892A4]">Total Monthly Traded Volume</span>
                <span className="font-mono font-bold text-white">{totalLots.toLocaleString()} Lots</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[#8892A4]">Commission Rate</span>
                <span className="font-mono font-bold text-[#F0C040]">${tierRate}.00 / Lot</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[#8892A4]">Estimated Monthly Payout</span>
                <span className="font-serif text-2xl font-black text-[#00E676]">${monthlyEarnings.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[#8892A4]">Annual Projection</span>
                <span className="font-serif text-xl font-bold text-[#00D4FF]">${yearlyEarnings.toLocaleString()} / yr</span>
              </div>
            </div>

            {/* Generated Referral Link Preview */}
            <div className="pt-2 space-y-2">
              <label className="text-xs font-bold text-[#8892A4] uppercase tracking-wider block">
                Your Demo Referral Link
              </label>
              <div className="flex items-center gap-2 bg-[#0A0E1A] p-2 rounded-xl border border-white/10">
                <input
                  type="text"
                  readOnly
                  value={sampleReferralLink}
                  className="bg-transparent text-xs text-[#F0C040] font-mono w-full focus:outline-none px-2"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 bg-[#F0C040] text-[#0A0E1A] hover:bg-[#FFD700] rounded-lg transition-colors shrink-0"
                  title="Copy Referral Link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={onOpenIBDashboard}
              className="w-full py-4 rounded-xl font-black text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] hover:shadow-xl hover:shadow-[#F0C040]/30 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>🚀 Activate Your Partner Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
