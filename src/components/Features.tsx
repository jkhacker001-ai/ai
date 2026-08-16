import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Smartphone, TrendingUp, Layers, GraduationCap, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { INITIAL_TICKERS } from '../data/marketData';

interface FeaturesProps {
  onOpenTerminal: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenTerminal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'forex' | 'metals' | 'crypto' | 'indices'>('all');

  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Raw Spreads',
      desc: 'Spreads from 0.0 pips on Gold (XAUUSD) and major Forex pairs. Institutional ECN execution with zero dealing desk intervention.',
      tag: 'From 0.0 Pips'
    },
    {
      icon: Shield,
      title: 'Regulated & Segregated',
      desc: 'Fully licensed under strict global regulatory frameworks. Client funds held in Tier-1 segregated bank accounts with investor protection.',
      tag: 'FCA & ASIC Licensed'
    },
    {
      icon: Smartphone,
      title: 'MT5 & Web Terminal',
      desc: 'Trade seamlessly on MetaTrader 5 or our custom WebTerminal. Support for automated EAs, custom indicators, and mobile devices.',
      tag: 'Multi-Device Access'
    },
    {
      icon: TrendingUp,
      title: 'Flexible High Leverage',
      desc: 'Capitalize on small market moves with leverage up to 1:2000 on Forex and Gold, backed by negative balance protection.',
      tag: 'Up to 1:2000'
    },
    {
      icon: Layers,
      title: '190+ Traded Instruments',
      desc: 'Diversify across Forex, Spot Gold & Silver, Bitcoin, US Tech Indices, Crude Oil, and Global Equities from one account.',
      tag: 'Multi-Asset'
    },
    {
      icon: GraduationCap,
      title: 'Free Trading Academy',
      desc: 'Free access to live daily market webinars, technical analysis scripts, economic calendar alerts, and dedicated 1-on-1 account managers.',
      tag: 'Daily Analysis'
    }
  ];

  const filteredInstruments = activeTab === 'all' 
    ? INITIAL_TICKERS 
    : INITIAL_TICKERS.filter(i => i.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-[#0A0E1A]/30 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0C040] bg-[#F0C040]/10 px-4 py-1.5 rounded-full border border-[#F0C040]/30">
            Why Choose NexusFX
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for Institutional Traders,<br />
            Designed for Partner Growth.
          </h2>
          <p className="text-[#8892A4] text-base leading-relaxed">
            Experience ultra-fast STP/ECN trade execution, transparent liquidity pools, and the industry’s most competitive spread pricing structure.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#1A2035] border border-white/10 hover:border-[#F0C040]/40 rounded-2xl p-8 hover:-translate-y-1.5 transition-all duration-300 relative group shadow-xl hover:shadow-[#F0C040]/10"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0C040]/20 to-[#00D4FF]/10 border border-[#F0C040]/30 flex items-center justify-center text-[#F0C040] mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#F0C040] transition-colors">
                    {feat.title}
                  </h3>
                  <span className="text-[10px] font-bold text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-full border border-[#00D4FF]/20 uppercase">
                    {feat.tag}
                  </span>
                </div>
                <p className="text-sm text-[#8892A4] leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Spreads & Market Depth Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#141824] border border-[#F0C040]/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Live Spreads & Trading Instruments</h3>
              <p className="text-xs text-[#8892A4] mt-1">Real-time ECN bid/ask quotes and minimum target spreads.</p>
            </div>

            {/* Instrument Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#0A0E1A] p-1.5 rounded-xl border border-white/10">
              {(['all', 'forex', 'metals', 'crypto', 'indices'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md'
                      : 'text-[#8892A4] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Instruments Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#8892A4]">
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Live Quote</th>
                  <th className="py-3 px-4">24h Change</th>
                  <th className="py-3 px-4">ECN Spread</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredInstruments.map((item) => (
                  <tr key={item.symbol} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white group-hover:text-[#F0C040]">{item.symbol}</div>
                      <div className="text-[10px] text-[#8892A4]">{item.name}</div>
                    </td>
                    <td className="py-3.5 px-4 uppercase text-[10px] font-bold text-[#8892A4]">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-white">
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: item.digits })}
                    </td>
                    <td className={`py-3.5 px-4 font-mono font-bold ${
                      item.changePercent >= 0 ? 'text-[#00E676]' : 'text-[#FF4757]'
                    }`}>
                      {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#00D4FF] font-bold">
                      {item.spread} pips
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={onOpenTerminal}
                        className="px-3 py-1.5 text-[11px] font-bold text-[#0A0E1A] bg-[#F0C040] hover:bg-[#FFD700] rounded-md transition-colors"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
