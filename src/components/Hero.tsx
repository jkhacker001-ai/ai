import React from 'react';
import { ShieldCheck, Award, ArrowRight, DollarSign, BarChart2, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { LiveTickerBar } from './LiveTickerBar';

interface HeroProps {
  onOpenAccount: () => void;
  onOpenIBDashboard: () => void;
  onOpenTerminal: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAccount,
  onOpenIBDashboard,
  onOpenTerminal,
  onOpenLogin,
  onOpenRegister
}) => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 overflow-hidden flex flex-col justify-between bg-[#0A0E1A]/30">
      {/* Radial Gradient & Glow Orbs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-10 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-[#F0C040]/10 rounded-full blur-[130px] animate-orb-2" />
        <div className="absolute inset-0 grid-bg-pattern opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0C040]/10 border border-[#F0C040]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F0C040] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#F0C040]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F0C040]">
                FCA & ASIC Regulated · Tier-1 Segregated
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Trade Smarter.<br />
              Earn <span className="bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#00D4FF] bg-clip-text text-transparent">Unlimited</span><br />
              as Our IB Partner.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#8892A4] max-w-2xl font-normal leading-relaxed">
              NexusFX offers institutional trading conditions with the highest paying Introducing Broker (IB) partner program in the global markets. Enjoy zero-cap commissions, instant daily payouts, 0.0 pip spreads, and 190+ instruments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRegister || onOpenAccount}
                className="px-8 py-4 rounded-xl font-extrabold text-sm text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#E8A020] hover:shadow-2xl hover:shadow-[#F0C040]/40 hover:-translate-y-1 transition-all flex items-center gap-2.5 uppercase tracking-wider"
              >
                <span>🚀 Open Account / Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenIBDashboard}
                className="px-6 py-4 rounded-xl font-bold text-sm text-white bg-[#1A2035] hover:bg-[#141824] border border-[#F0C040]/30 hover:border-[#F0C040] hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
              >
                <DollarSign className="w-4 h-4 text-[#F0C040]" />
                <span>IB Partner Portal</span>
              </button>

              <button
                onClick={onOpenLogin || onOpenAccount}
                className="px-6 py-4 rounded-xl font-bold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#00D4FF]/50 transition-all flex items-center gap-2"
              >
                <span>Member Login</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-5 py-4 rounded-xl font-semibold text-xs text-[#00D4FF] bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-[#00D4FF]/30 transition-all flex items-center gap-2"
              >
                <BarChart2 className="w-4 h-4 animate-bounce" />
                <span>Web Terminal Demo</span>
              </button>
            </div>

            {/* Quick Specs */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-medium text-[#8892A4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Spreads from 0.0 Pips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>1:2000 Max Leverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Instant Auto Withdrawals</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Globe + Orbit + Stats Floating) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
              {/* Outer Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-[#F0C040]/20 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-[#00D4FF]/15 animate-spin-reverse" />

              {/* Central Glowing Globe Graphic */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#003250]/90 via-[#0A0E1A]/95 to-[#141824] border border-[#00D4FF]/30 shadow-[0_0_80px_rgba(0,212,255,0.2)] relative overflow-hidden flex items-center justify-center">
                {/* Globe Grid Mesh Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_30%,rgba(0,212,255,0.35),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(240,192,64,0.2),transparent_50%)]" />
                
                <Globe2 className="w-48 h-48 text-[#00D4FF]/25 animate-pulse" />

                {/* Animated Pulsing Location Dots */}
                <div className="absolute top-[28%] left-[30%] w-3 h-3 bg-[#F0C040] rounded-full shadow-[0_0_12px_#F0C040] animate-ping" />
                <div className="absolute top-[55%] right-[25%] w-3 h-3 bg-[#00D4FF] rounded-full shadow-[0_0_12px_#00D4FF] animate-ping delay-500" />
                <div className="absolute bottom-[25%] left-[40%] w-2.5 h-2.5 bg-[#00E676] rounded-full shadow-[0_0_10px_#00E676] animate-ping delay-1000" />
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-4 -left-8 bg-[#1A2035]/95 backdrop-blur-xl border border-[#F0C040]/30 rounded-2xl p-4 shadow-2xl shadow-black/60 animate-bounce transition-all duration-1000">
                <div className="text-xl font-black font-serif text-[#F0C040]">$3.8T+</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#8892A4]">Daily Traded Volume</div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -bottom-6 -right-6 bg-[#1A2035]/95 backdrop-blur-xl border border-[#00D4FF]/30 rounded-2xl p-4 shadow-2xl shadow-black/60 animate-bounce transition-all duration-1000 delay-500">
                <div className="text-xl font-black font-serif text-[#00D4FF]">$12,840</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#8892A4]">Top IB Payout This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mounted Live Ticker Bar at Bottom */}
      <div className="mt-12">
        <LiveTickerBar onSelectInstrument={() => onOpenTerminal()} />
      </div>
    </section>
  );
};
