import React, { useState } from 'react';
import { ECONOMIC_CALENDAR_EVENTS } from '../data/marketData';
import { Calendar, AlertTriangle, TrendingUp, Filter, Clock } from 'lucide-react';

export const EconomicCalendar: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [impactFilter, setImpactFilter] = useState<string>('ALL');

  const filteredEvents = ECONOMIC_CALENDAR_EVENTS.filter((e) => {
    const matchesCurr = selectedCurrency === 'ALL' || e.currency === selectedCurrency;
    const matchesImpact = impactFilter === 'ALL' || e.impact === impactFilter;
    return matchesCurr && matchesImpact;
  });

  return (
    <section className="py-16 bg-[#141824]/40 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#00D4FF] uppercase tracking-widest bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/20">
              Real-Time Fundamental Intelligence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-2">Global Economic Calendar</h2>
            <p className="text-xs text-[#8892A4]">Track central bank interest rate decisions, NFP payrolls, and inflation releases.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-[#0A0E1A] border border-white/10 text-white rounded-xl px-3 py-2"
            >
              <option value="ALL">All Currencies</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>

            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              className="bg-[#0A0E1A] border border-white/10 text-white rounded-xl px-3 py-2"
            >
              <option value="ALL">All Impact Levels</option>
              <option value="High">High Volatility (High)</option>
              <option value="Medium">Medium Volatility (Medium)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#141824] text-[10px] text-[#8892A4] uppercase border-b border-white/10">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4">Impact</th>
                  <th className="py-3 px-4">Economic Event</th>
                  <th className="py-3 px-4">Forecast</th>
                  <th className="py-3 px-4">Previous</th>
                  <th className="py-3 px-4 text-right">Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 text-[#8892A4] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F0C040]" />
                      <span>{evt.time}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{evt.currency}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                        evt.impact === 'High'
                          ? 'bg-[#FF4757]/10 text-[#FF4757] border border-[#FF4757]/30'
                          : 'bg-[#F0C040]/10 text-[#F0C040] border border-[#F0C040]/30'
                      }`}>
                        {evt.impact}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-white">{evt.event}</td>
                    <td className="py-3.5 px-4 text-[#8892A4]">{evt.forecast}</td>
                    <td className="py-3.5 px-4 text-[#8892A4]">{evt.previous}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#00E676]">
                      {evt.actual || 'Pending'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
