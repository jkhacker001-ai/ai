import React from 'react';
import { DollarSign, Award, Users, TrendingUp, CheckCircle, ArrowRight, Share2, Wallet, ShieldAlert } from 'lucide-react';

interface IBProgramProps {
  onOpenIBDashboard: () => void;
}

export const IBProgram: React.FC<IBProgramProps> = ({ onOpenIBDashboard }) => {
  return (
    <section id="ib" className="py-24 bg-gradient-to-b from-[#141824]/50 via-[#0A0E1A]/30 to-[#141824]/50 backdrop-blur-xs relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#F0C040]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0C040]/10 border border-[#F0C040]/30 text-xs font-bold text-[#F0C040] uppercase tracking-widest">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Introducing Broker (IB) Partner Program</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Turn Your Network into<br />
              <span className="bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#00D4FF] bg-clip-text text-transparent">
                Unlimited Recurring Wealth
              </span>
            </h2>

            <p className="text-[#8892A4] text-base leading-relaxed">
              Partner with NexusFX as an Introducing Broker. Earn high-rebate commissions every single time your referred traders open a trade on Forex, Gold, Crypto, or Indices — with zero payout ceilings and daily automated wallet withdrawals.
            </p>

            {/* Commission Rate Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-[#1A2035] border border-[#F0C040]/20 rounded-2xl p-4 text-center">
                <div className="font-serif text-2xl font-black text-[#F0C040]">$15</div>
                <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider mt-1">Per Lot (Forex)</div>
              </div>

              <div className="bg-[#1A2035] border border-[#F0C040]/20 rounded-2xl p-4 text-center">
                <div className="font-serif text-2xl font-black text-[#F0C040]">$8</div>
                <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider mt-1">Per Lot (Gold)</div>
              </div>

              <div className="bg-[#1A2035] border border-[#00D4FF]/20 rounded-2xl p-4 text-center">
                <div className="font-serif text-2xl font-black text-[#00D4FF]">40%</div>
                <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider mt-1">VIP RevShare</div>
              </div>

              <div className="bg-[#1A2035] border border-[#00E676]/20 rounded-2xl p-4 text-center">
                <div className="font-serif text-2xl font-black text-[#00E676]">∞</div>
                <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider mt-1">No Cap Limit</div>
              </div>
            </div>

            {/* 3 Step Onboarding Flow */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2035]/60 border border-white/5 hover:border-[#F0C040]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#F0C040] text-[#0A0E1A] font-extrabold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Apply & Get Instant Partner Link</h4>
                  <p className="text-xs text-[#8892A4] mt-0.5">Approval takes under 2 minutes. Get custom referral tracking links and multi-tier sub-IB access.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2035]/60 border border-white/5 hover:border-[#F0C040]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#F0C040] text-[#0A0E1A] font-extrabold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Share Marketing Assets & Educational Content</h4>
                  <p className="text-xs text-[#8892A4] mt-0.5">Share your links on Telegram, YouTube, WhatsApp, or Instagram with high-converting banners and market analysis.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2035]/60 border border-white/5 hover:border-[#F0C040]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#F0C040] text-[#0A0E1A] font-extrabold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Earn Daily Cash Commissions</h4>
                  <p className="text-xs text-[#8892A4] mt-0.5">Commissions are credited automatically in real time. Withdraw instantly via local bank wire, Crypto (USDT), or e-wallets.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenIBDashboard}
              className="px-8 py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] hover:shadow-xl hover:shadow-[#F0C040]/30 uppercase tracking-wider flex items-center gap-2"
            >
              <span>💼 Open Interactive IB Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Earnings Growth Cards Visual Stack */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-6">
              {/* Card 1 (Top / Latest Month) */}
              <div className="bg-[#1A2035] border border-[#F0C040]/30 rounded-2xl p-6 shadow-2xl relative z-30 transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">Your IB Earnings — Current Month</span>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#00E676]/10 text-[#00E676] rounded-full border border-[#00E676]/30">
                    +34% Growth
                  </span>
                </div>
                <div className="font-serif text-4xl font-black text-[#F0C040]">$12,840.00</div>
                <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F0C040] to-[#00D4FF] h-full rounded-full w-[78%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8892A4] mt-3 font-medium">
                  <span>420 Active Referrals</span>
                  <span>856 Lots Traded</span>
                </div>
              </div>

              {/* Card 2 (Previous Month) */}
              <div className="bg-[#1A2035]/80 border border-white/10 rounded-2xl p-5 shadow-xl relative z-20 scale-95 opacity-90">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">Previous Month</span>
                  <span className="text-xs font-bold text-white">$9,580.00</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#F0C040] h-full rounded-full w-[60%]" />
                </div>
              </div>

              {/* Card 3 (2 Months Ago) */}
              <div className="bg-[#1A2035]/60 border border-white/5 rounded-2xl p-4 shadow-lg relative z-10 scale-90 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">2 Months Ago</span>
                  <span className="text-xs font-bold text-white">$6,210.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
