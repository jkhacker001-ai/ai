import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/marketData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#141824]/50 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0C040] bg-[#F0C040]/10 px-4 py-1.5 rounded-full border border-[#F0C040]/30">
            Trusted Worldwide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Stories from Our Traders & IB Partners
          </h2>
          <p className="text-[#8892A4] text-sm sm:text-base">
            See how NexusFX empowers global traders with zero-slippage execution and life-changing IB partner rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A2035] border border-white/10 rounded-2xl p-8 hover:border-[#F0C040]/30 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#F0C040]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#8892A4] italic leading-relaxed group-hover:text-white transition-colors">
                  "{item.text}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F0C040] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] text-sm shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
                  </div>
                  <div className="text-[11px] text-[#8892A4] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F0C040]" />
                    <span>{item.location} • {item.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
