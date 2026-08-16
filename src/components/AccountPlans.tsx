import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, Award, Star, ArrowRight } from 'lucide-react';
import { AccountTier } from '../types';

interface AccountPlansProps {
  onSelectPlan: (tier: AccountTier) => void;
}

export const AccountPlans: React.FC<AccountPlansProps> = ({ onSelectPlan }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const planVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="plans" className="py-24 bg-[#141824]/50 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0C040] bg-[#F0C040]/10 px-4 py-1.5 rounded-full border border-[#F0C040]/30">
            Account Tiers & Spreads
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Transparent Accounts Designed for Every Trader
          </h2>
          <p className="text-[#8892A4] text-sm sm:text-base">
            Choose the ideal trading conditions for your strategy — with zero hidden fees and instant account activation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid lg:grid-cols-3 gap-8 items-stretch"
        >
          {/* Starter Plan */}
          <motion.div
            variants={planVariants}
            className="bg-[#1A2035] border border-white/10 rounded-2xl p-8 space-y-6 hover:border-[#F0C040]/30 transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">For Beginners</div>
              <h3 className="font-serif text-2xl font-black text-white mt-1">Starter Account</h3>
              <p className="text-xs text-[#8892A4] mt-2 leading-relaxed">
                Ideal for traders entering the markets with lower initial capital. Fixed spreads and full educational access.
              </p>

              <div className="py-6 border-y border-white/10 my-6">
                <span className="font-serif text-4xl font-black text-[#F0C040]">$50</span>
                <span className="text-xs text-[#8892A4] font-medium ml-2">/ Min Deposit</span>
              </div>

              <ul className="space-y-3 text-xs text-[#8892A4]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>Spreads from 1.5 Pips</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>Leverage up to 1:500</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>50+ Forex & Commodities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>MetaTrader 5 & WebApp</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-[#00E676]">
                  <Check className="w-4 h-4 text-[#00E676]" />
                  <span>IB Rate: $8.00 / Lot</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('starter')}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white border border-[#F0C040]/30 hover:border-[#F0C040] hover:bg-[#F0C040]/10 transition-all uppercase tracking-wider mt-6"
            >
              Open Starter Account
            </button>
          </motion.div>

          {/* Pro Plan (Popular) */}
          <motion.div
            variants={planVariants}
            className="bg-gradient-to-b from-[#1A2035] via-[#141824] to-[#1A2035] border-2 border-[#F0C040] rounded-2xl p-8 space-y-6 relative flex flex-col justify-between shadow-2xl shadow-[#F0C040]/15 lg:-translate-y-2 z-20"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Most Popular for Active Traders</span>
            </div>

            <div>
              <div className="text-xs font-bold text-[#F0C040] uppercase tracking-wider">For Professional Traders</div>
              <h3 className="font-serif text-2xl font-black text-white mt-1">Pro ECN Account</h3>
              <p className="text-xs text-[#8892A4] mt-2 leading-relaxed">
                Raw ECN spreads, institutional liquidity, and ultra-fast execution for scalping and high-volume strategies.
              </p>

              <div className="py-6 border-y border-white/10 my-6">
                <span className="font-serif text-4xl font-black bg-gradient-to-r from-[#F0C040] to-[#00D4FF] bg-clip-text text-transparent">$500</span>
                <span className="text-xs text-[#8892A4] font-medium ml-2">/ Min Deposit</span>
              </div>

              <ul className="space-y-3 text-xs text-[#8892A4]">
                <li className="flex items-center gap-2 text-white font-bold">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>Raw Spreads from 0.1 Pips</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>Leverage up to 1:1000</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>All 190+ Instruments Available</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-[#F0C040]">
                  <Check className="w-4 h-4 text-[#F0C040]" />
                  <span>IB Rate: $12.00 / Lot + 25% RevShare</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('pro')}
              className="w-full py-4 rounded-xl font-extrabold text-xs text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] hover:shadow-xl hover:shadow-[#F0C040]/30 transition-all uppercase tracking-wider mt-6 flex items-center justify-center gap-2"
            >
              <span>Open Pro Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* VIP Tier */}
          <motion.div
            variants={planVariants}
            className="bg-[#1A2035] border border-white/10 rounded-2xl p-8 space-y-6 hover:border-[#00D4FF]/40 transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider">For Institutions & Master IBs</div>
              <h3 className="font-serif text-2xl font-black text-white mt-1">VIP Institutional</h3>
              <p className="text-xs text-[#8892A4] mt-2 leading-relaxed">
                Custom liquidity feeds, zero latency VPS, priority cash settlement, and max IB commission tier.
              </p>

              <div className="py-6 border-y border-white/10 my-6">
                <span className="font-serif text-4xl font-black text-[#00D4FF]">$5,000</span>
                <span className="text-xs text-[#8892A4] font-medium ml-2">/ Min Deposit</span>
              </div>

              <ul className="space-y-3 text-xs text-[#8892A4]">
                <li className="flex items-center gap-2 text-white font-bold">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>Zero Spreads from 0.0 Pips</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>Max Leverage up to 1:2000</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>Free Premium London VPS</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>24/7 Priority Desk Execution</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-[#00D4FF]">
                  <Check className="w-4 h-4 text-[#00D4FF]" />
                  <span>IB Rate: $15.00 / Lot + 40% RevShare</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('vip')}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-[#00D4FF] border border-[#00D4FF]/30 hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all uppercase tracking-wider mt-6"
            >
              Open VIP Account
            </button>
          </motion.div>
        </motion.div>

        {/* Account Guarantees Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center text-xs text-[#8892A4] space-x-6"
        >
          <span>🛡️ <strong className="text-white">Negative Balance Protection</strong></span>
          <span>•</span>
          <span>🏦 <strong className="text-white">Segregated Tier-1 Bank Accounts</strong></span>
          <span>•</span>
          <span>⚡ <strong className="text-white">Instant Auto Withdrawals</strong></span>
          <span>•</span>
          <span>☪️ <strong className="text-white">Islamic Swap-Free Available</strong></span>
        </motion.div>
      </div>
    </section>
  );
};
