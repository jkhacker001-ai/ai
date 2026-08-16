import React, { useState, useEffect } from 'react';
import { MarketTicker } from '../types';
import { INITIAL_TICKERS } from '../data/marketData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LiveTickerBarProps {
  onSelectInstrument?: (ticker: MarketTicker) => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({ onSelectInstrument }) => {
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);

  // Simulate real-time market tick fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.48) * (t.price * 0.0008);
          const newPrice = Math.max(0.0001, t.price + delta);
          const newChange = t.change + delta;
          const newPercent = (newChange / (t.price - t.change)) * 100;
          return {
            ...t,
            price: Number(newPrice.toFixed(t.digits)),
            change: Number(newChange.toFixed(t.digits)),
            changePercent: Number(newPercent.toFixed(2))
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#141824]/95 border-y border-[#F0C040]/15 py-2.5 overflow-hidden relative backdrop-blur-md z-20">
      <div className="flex items-center gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {[...tickers, ...tickers].map((t, idx) => {
          const isUp = t.changePercent >= 0;
          return (
            <div
              key={`${t.symbol}-${idx}`}
              onClick={() => onSelectInstrument && onSelectInstrument(t)}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded hover:bg-white/5 transition-colors group"
            >
              <span className="font-bold text-xs text-[#8892A4] group-hover:text-white tracking-wider">
                {t.symbol}
              </span>
              <span className="font-mono text-xs font-semibold text-white">
                {t.price.toLocaleString(undefined, { minimumFractionDigits: t.digits })}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                  isUp ? 'text-[#00E676]' : 'text-[#FF4757]'
                }`}
              >
                {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isUp ? '+' : ''}
                {t.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
