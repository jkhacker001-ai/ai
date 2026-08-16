import React from 'react';
import { Globe, ShieldCheck, DollarSign, Send, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0E1A]/80 backdrop-blur-md border-t border-[#F0C040]/15 pt-16 pb-12 text-[#8892A4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#E8A020] flex items-center justify-center font-bold text-[#0A0E1A] text-lg">
                N
              </div>
              <span className="font-serif text-2xl font-black text-white">NexusFX</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              A globally regulated Forex and CFD broker committed to transparent pricing, 0.0 pip spreads, zero-delay STP/ECN execution, and rewarding Introducing Broker partners.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Trading Servers Online (0ms Ping)</span>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F0C040]">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Global Regulations</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Trader Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center & FAQ</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F0C040]">Trading Assets</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Forex Major Pairs</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Spot Gold & Metals</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Bitcoin & Crypto CFDs</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">US Tech Indices</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F0C040]">IB Partners</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ib" className="hover:text-white transition-colors">IB Partner Program</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Earnings Calculator</a></li>
              <li><a href="#ib" className="hover:text-white transition-colors">Partner Dashboard</a></li>
              <li><a href="#ib" className="hover:text-white transition-colors">Marketing Banners Kit</a></li>
            </ul>
          </div>
        </div>

        {/* Social & Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>© {new Date().getFullYear()} NexusFX Global Ltd. All rights reserved.</div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#141824] border border-white/10 hover:border-[#F0C040] text-[#F0C040] flex items-center gap-2 text-xs font-bold transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="pt-4 border-t border-white/5 text-[11px] leading-relaxed text-[#8892A4]">
          <p>
            <strong className="text-white">Risk Warning:</strong> CFDs are complex instruments and carry a high risk of losing money rapidly due to leverage. 72% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. NexusFX is a fictional demo application created for presentation and interface demo purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};
