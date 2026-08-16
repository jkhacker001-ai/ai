import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/marketData';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('f1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'trading' | 'ib' | 'funding'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-[#0A0E1A]/30 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0C040] bg-[#F0C040]/10 px-4 py-1.5 rounded-full border border-[#F0C040]/30 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[#8892A4] text-sm">
            Everything you need to know about trading accounts, spreads, regulation, and IB commissions.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8892A4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141824] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-[#8892A4] focus:border-[#F0C040] focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#141824] p-1.5 rounded-xl border border-white/10 text-xs font-bold w-full md:w-auto justify-center">
            {(['all', 'ib', 'trading', 'funding', 'general'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${
                  activeCategory === cat ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#1A2035] border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#F0C040] transition-colors"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#F0C040] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8892A4] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#8892A4] leading-relaxed border-t border-white/5 pt-4 animate-in fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
