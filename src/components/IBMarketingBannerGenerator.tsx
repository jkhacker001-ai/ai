import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Sparkles, Image, Check, Share2 } from 'lucide-react';

export const IBMarketingBannerGenerator: React.FC = () => {
  const [partnerName, setPartnerName] = useState('Rajesh Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [refCode, setRefCode] = useState('REF-NEXUS-88901');
  const [tagline, setTagline] = useState('Trade Gold with 0.0 Pip Spreads');
  const [theme, setTheme] = useState<'gold' | 'cyber' | 'dark'>('gold');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size
    canvas.width = 1080;
    canvas.height = 1080; // Instagram / WhatsApp Story / Post format

    // Background Gradient based on theme
    let bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    if (theme === 'gold') {
      bgGrad.addColorStop(0, '#0A0E1A');
      bgGrad.addColorStop(0.5, '#1A2035');
      bgGrad.addColorStop(1, '#0F172A');
    } else if (theme === 'cyber') {
      bgGrad.addColorStop(0, '#050B14');
      bgGrad.addColorStop(1, '#0A1E3F');
    } else {
      bgGrad.addColorStop(0, '#080808');
      bgGrad.addColorStop(1, '#1A1A1A');
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative Gold Lines / Borders
    ctx.strokeStyle = theme === 'gold' ? '#F0C040' : '#00D4FF';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 1000, 1000);

    // Inner Card Frame
    ctx.fillStyle = 'rgba(20, 24, 36, 0.85)';
    ctx.roundRect(80, 80, 920, 920, 32);
    ctx.fill();

    // Brand Logo Heading
    ctx.font = '900 64px Georgia, serif';
    ctx.fillStyle = '#F0C040';
    ctx.textAlign = 'center';
    ctx.fillText('NexusFX Global Markets', 540, 200);

    // Subheader Badge
    ctx.font = '700 28px sans-serif';
    ctx.fillStyle = '#00E676';
    ctx.fillText('OFFICIAL REGULATION • INSTANT PAYOUTS', 540, 260);

    // Main Highlight Tagline
    ctx.font = '900 52px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(tagline, 540, 380);

    // Feature bullet points box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.roundRect(140, 440, 800, 280, 24);
    ctx.fill();

    ctx.font = '700 32px sans-serif';
    ctx.fillStyle = '#00D4FF';
    ctx.fillText('✓ 0.0 Pip Spreads on XAUUSD & EURUSD', 540, 510);
    ctx.fillText('✓ Up to 1:2000 Leverage & $50 Min Deposit', 540, 580);
    ctx.fillText('✓ Instant UPI & Crypto USDT Deposits/Withdrawals', 540, 650);

    // Partner Contact Info Box
    ctx.fillStyle = theme === 'gold' ? '#F0C040' : '#00D4FF';
    ctx.roundRect(140, 770, 800, 180, 24);
    ctx.fill();

    ctx.fillStyle = '#0A0E1A';
    ctx.font = '900 36px sans-serif';
    ctx.fillText(`Partner: ${partnerName}`, 540, 830);
    ctx.font = '700 30px monospace';
    ctx.fillText(`WhatsApp: ${phone}  |  Code: ${refCode}`, 540, 890);
  };

  useEffect(() => {
    drawBanner();
  }, [partnerName, phone, refCode, tagline, theme]);

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexusFX-IB-Banner-${refCode}.png`;
    a.click();
  };

  return (
    <div className="bg-[#141824] border border-[#F0C040]/30 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <span className="text-xs font-bold text-[#F0C040] uppercase tracking-widest bg-[#F0C040]/10 px-3 py-1 rounded-full border border-[#F0C040]/20">
          IB Marketing Studio
        </span>
        <h3 className="font-serif text-2xl font-bold text-white mt-2">Custom Story & Social Banner Generator</h3>
        <p className="text-xs text-[#8892A4]">
          Generate branded promotional social media banners with your contact details and referral code.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">IB Partner Name</label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">WhatsApp / Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Referral Code</label>
            <input
              type="text"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-[#F0C040] font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Promo Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Banner Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gold', name: 'Gold Luxury' },
                { id: 'cyber', name: 'Cyber Blue' },
                { id: 'dark', name: 'Dark Onyx' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    theme === t.id ? 'bg-[#F0C040] text-[#0A0E1A] border-[#F0C040]' : 'bg-[#0A0E1A] border-white/10 text-[#8892A4]'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownloadPNG}
            className="w-full py-4 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res Banner (.PNG)</span>
          </button>
        </div>

        {/* Right Canvas Preview (7 cols) */}
        <div className="lg:col-span-7 flex justify-center bg-[#0A0E1A] p-6 rounded-2xl border border-white/10">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto max-h-[420px] rounded-xl shadow-2xl border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};
