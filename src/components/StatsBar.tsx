import React from 'react';
import { Users, Globe, Award, DollarSign } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    { num: '2,500,000+', label: 'Active Traders Worldwide', icon: Users, color: 'from-[#F0C040] to-[#E8A020]' },
    { num: '190+', label: 'Global CFD Instruments', icon: Globe, color: 'from-[#00D4FF] to-[#0088FF]' },
    { num: '15 Years', label: 'Financial Industry Leadership', icon: Award, color: 'from-[#00E676] to-[#00A859]' },
    { num: '50,000+', label: 'Active IB Partners', icon: DollarSign, color: 'from-[#F0C040] to-[#FFD700]' },
  ];

  return (
    <section className="bg-[#141824]/60 backdrop-blur-md border-y border-[#F0C040]/15 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-8' : ''} text-center lg:text-left space-y-2 group`}>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[#8892A4]">
                  <Icon className="w-5 h-5 text-[#F0C040]" />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <div className={`font-serif text-3xl sm:text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left`}>
                  {item.num}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
