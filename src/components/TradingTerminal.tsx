import React, { useState, useEffect } from 'react';
import { MarketTicker } from '../types';
import { INITIAL_TICKERS } from '../data/marketData';
import { useTrading } from '../context/TradingContext';
import { DepositWithdrawModal } from './DepositWithdrawModal';
import { BarChart2, TrendingUp, TrendingDown, DollarSign, X, RefreshCw, CheckCircle, Search, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface TradingTerminalProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const TradingTerminal: React.FC<TradingTerminalProps> = ({ onClose, isModal = false }) => {
  const { user, positions, openTrade, closeTrade } = useTrading();
  const [selectedTicker, setSelectedTicker] = useState<MarketTicker>(INITIAL_TICKERS[0]);
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'1M' | '5M' | '15M' | '1H' | '1D'>('15M');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [lots, setLots] = useState<number>(1.0);
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false);
  const [depositModalTab, setDepositModalTab] = useState<'deposit' | 'withdraw'>('deposit');

  // Live tick fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => {
        const updated = prev.map((t) => {
          const delta = (Math.random() - 0.48) * (t.price * 0.0006);
          const newPrice = Number((t.price + delta).toFixed(t.digits));
          const newHistory = [...t.history.slice(1), newPrice];

          return { ...t, price: newPrice, history: newHistory };
        });

        const currentSelected = updated.find((u) => u.symbol === selectedTicker.symbol);
        if (currentSelected) {
          setSelectedTicker(currentSelected);
        }

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedTicker.symbol]);

  // Filter tickers
  const filteredTickers = tickers.filter((t) => {
    const matchCat = categoryFilter === 'all' || t.category === categoryFilter;
    const matchQuery = t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  // Calculate live floating P/L
  const totalFloatingPnl = positions.reduce((acc, pos) => {
    const currentT = tickers.find((t) => t.symbol === pos.symbol);
    if (!currentT) return acc + pos.pnl;

    const priceDiff = pos.type === 'BUY'
      ? currentT.price - pos.openPrice
      : pos.openPrice - currentT.price;

    const multiplier = pos.symbol === 'XAUUSD' ? 100 : pos.symbol.includes('USD') ? 100000 : 10;
    return acc + Number((priceDiff * pos.lots * multiplier).toFixed(2));
  }, 0);

  const totalEquity = user.balance + totalFloatingPnl;

  const handleExecuteOrder = () => {
    openTrade(
      selectedTicker.symbol,
      tradeType,
      lots,
      selectedTicker.price,
      stopLoss ? Number(stopLoss) : undefined,
      takeProfit ? Number(takeProfit) : undefined
    );
    setNotification(`Successfully executed ${tradeType} ${lots} lot(s) of ${selectedTicker.symbol} at ${selectedTicker.price}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClosePos = (id: string) => {
    const target = positions.find((p) => p.id === id);
    const currentT = tickers.find((t) => t.symbol === target?.symbol);
    const currentPrice = currentT ? currentT.price : target?.currentPrice || 0;

    closeTrade(id, currentPrice);
    setNotification(`Position ${target?.symbol} closed successfully.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const content = (
    <div className="bg-[#0A0E1A] border border-[#F0C040]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-w-6xl mx-auto w-full">
      {/* Terminal Header */}
      <div className="bg-[#141824] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#F0C040]/20 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">NexusFX WebTerminal Pro</h3>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 rounded">
                LIVE {user.accountMode.toUpperCase()} ECN
              </span>
            </div>
            <p className="text-[11px] text-[#8892A4]">MT5 Login: #{user.mt5Login} • {user.mt5Server}</p>
          </div>
        </div>

        {/* Balance & Deposit / Withdraw CTAs */}
        <div className="flex items-center gap-4 text-xs">
          <div>
            <div className="text-[10px] text-[#8892A4] uppercase font-bold">Balance</div>
            <div className="font-mono font-bold text-white">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#8892A4] uppercase font-bold">Equity</div>
            <div className="font-mono font-bold text-[#F0C040]">${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#8892A4] uppercase font-bold">Floating P/L</div>
            <div className={`font-mono font-extrabold ${totalFloatingPnl >= 0 ? 'text-[#00E676]' : 'text-[#FF4757]'}`}>
              {totalFloatingPnl >= 0 ? '+' : ''}${totalFloatingPnl.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setDepositModalTab('deposit'); setDepositModalOpen(true); }}
              className="px-3 py-1.5 bg-[#00E676] text-[#0A0E1A] font-extrabold text-[11px] rounded-lg hover:bg-[#00FF84] flex items-center gap-1 uppercase"
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>

            <button
              onClick={() => { setDepositModalTab('withdraw'); setDepositModalOpen(true); }}
              className="px-3 py-1.5 bg-[#F0C040] text-[#0A0E1A] font-extrabold text-[11px] rounded-lg hover:bg-[#FFD700] flex items-center gap-1 uppercase"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-[#8892A4] hover:text-white rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left Market Watch Watchlist (3 cols) */}
        <div className="lg:col-span-3 p-4 bg-[#141824]/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
              Market Watch
            </div>
            <div className="flex gap-1 text-[9px] font-bold">
              {['all', 'forex', 'metals', 'crypto'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-1.5 py-0.5 rounded uppercase ${
                    categoryFilter === cat ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8892A4] absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search symbol (e.g. XAUUSD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-lg pl-8 pr-2 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredTickers.map((t) => (
              <div
                key={t.symbol}
                onClick={() => setSelectedTicker(t)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTicker.symbol === t.symbol
                    ? 'bg-[#F0C040]/10 border-[#F0C040] text-white'
                    : 'bg-[#1A2035]/60 border-white/5 hover:border-white/20 text-[#8892A4]'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-white">{t.symbol}</div>
                  <div className="text-[10px] opacity-70">{t.name}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-semibold text-white">
                    {t.price.toLocaleString(undefined, { minimumFractionDigits: t.digits })}
                  </div>
                  <div className={`text-[10px] font-bold ${t.changePercent >= 0 ? 'text-[#00E676]' : 'text-[#FF4757]'}`}>
                    {t.changePercent >= 0 ? '+' : ''}{t.changePercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Chart Panel (6 cols) */}
        <div className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-2xl font-black text-white">{selectedTicker.symbol}</h4>
                <span className="text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded border border-[#00D4FF]/20">
                  Spread {selectedTicker.spread} pips
                </span>
              </div>
              <p className="text-xs text-[#8892A4]">{selectedTicker.name}</p>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex gap-1 bg-[#141824] p-1 rounded-lg border border-white/10 text-[10px] font-bold">
              {(['1M', '5M', '15M', '1H', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    timeframe === tf ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Line Chart */}
          <div className="h-[240px] bg-[#141824] rounded-xl p-4 border border-white/10 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

              {(() => {
                const history = selectedTicker.history;
                const min = Math.min(...history);
                const max = Math.max(...history);
                const range = max - min || 1;

                const points = history.map((val, i) => {
                  const x = (i / (history.length - 1)) * 300;
                  const y = 140 - ((val - min) / range) * 120;
                  return `${x},${y}`;
                }).join(' ');

                const isUp = history[history.length - 1] >= history[0];
                const color = isUp ? '#00E676' : '#FF4757';

                return (
                  <>
                    <polyline
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      points={points}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="300"
                      cy={140 - ((history[history.length - 1] - min) / range) * 120}
                      r="5"
                      fill={color}
                      className="animate-ping"
                    />
                  </>
                );
              })()}
            </svg>

            <div className="absolute top-4 right-4 bg-[#0A0E1A]/90 border border-white/20 rounded-lg px-3 py-1.5 font-mono text-xs text-white">
              <span className="text-[#8892A4] mr-2">LIVE ASK:</span>
              <span className="font-bold text-[#F0C040]">
                {selectedTicker.price.toLocaleString(undefined, { minimumFractionDigits: selectedTicker.digits })}
              </span>
            </div>
          </div>
        </div>

        {/* Right Order Execution Panel (3 cols) */}
        <div className="lg:col-span-3 p-4 space-y-3 bg-[#141824]/30">
          <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
            Order Form
          </div>

          {/* Buy/Sell Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTradeType('BUY')}
              className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center ${
                tradeType === 'BUY'
                  ? 'bg-[#00E676] text-[#0A0E1A] shadow-lg shadow-[#00E676]/20'
                  : 'bg-white/5 text-[#8892A4] hover:text-white'
              }`}
            >
              <span>BUY (LONG)</span>
              <span className="text-[10px] font-mono opacity-80 mt-0.5">
                {(selectedTicker.price + selectedTicker.spread * 0.0001).toFixed(selectedTicker.digits)}
              </span>
            </button>

            <button
              onClick={() => setTradeType('SELL')}
              className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center ${
                tradeType === 'SELL'
                  ? 'bg-[#FF4757] text-white shadow-lg shadow-[#FF4757]/20'
                  : 'bg-white/5 text-[#8892A4] hover:text-white'
              }`}
            >
              <span>SELL (SHORT)</span>
              <span className="text-[10px] font-mono opacity-80 mt-0.5">
                {selectedTicker.price.toFixed(selectedTicker.digits)}
              </span>
            </button>
          </div>

          {/* Lot Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#8892A4] uppercase">Lot Volume</label>
            <div className="flex items-center gap-1.5">
              {[0.1, 0.5, 1.0, 5.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setLots(val)}
                  className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                    lots === val ? 'bg-[#F0C040] text-[#0A0E1A] font-bold' : 'bg-white/5 border-white/10 text-[#8892A4]'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={lots}
              onChange={(e) => setLots(Math.max(0.01, Number(e.target.value)))}
              className="w-full bg-[#0A0E1A] border border-white/10 rounded-lg p-2 text-xs text-white font-mono"
            />
          </div>

          {/* SL / TP */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <label className="text-[#8892A4] font-bold block mb-1 uppercase">Stop Loss (SL)</label>
              <input
                type="number"
                placeholder="Optional"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded p-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[#8892A4] font-bold block mb-1 uppercase">Take Profit (TP)</label>
              <input
                type="number"
                placeholder="Optional"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded p-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleExecuteOrder}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xl ${
              tradeType === 'BUY'
                ? 'bg-[#00E676] text-[#0A0E1A] hover:bg-[#00FF84]'
                : 'bg-[#FF4757] text-white hover:bg-[#FF6B7B]'
            }`}
          >
            Execute Market {tradeType}
          </button>
        </div>
      </div>

      {/* Bottom Positions Table */}
      <div className="border-t border-white/10 bg-[#141824] p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Active Open Positions</span>
            <span className="px-2 py-0.5 bg-white/10 text-[#F0C040] text-[10px] rounded-full">
              {positions.length}
            </span>
          </h4>
        </div>

        {notification && (
          <div className="mb-3 p-2.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-lg text-xs text-[#00D4FF] flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {positions.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#8892A4] border border-dashed border-white/10 rounded-xl">
            No active open positions. Select an instrument and click Execute Market Order.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-[#8892A4] uppercase border-b border-white/10 pb-2">
                  <th className="py-2">Time</th>
                  <th className="py-2">Symbol</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Lots</th>
                  <th className="py-2">Open Price</th>
                  <th className="py-2">Current</th>
                  <th className="py-2">Floating P/L</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {positions.map((pos) => {
                  const currentT = tickers.find((t) => t.symbol === pos.symbol);
                  const currPrice = currentT ? currentT.price : pos.openPrice;
                  const priceDiff = pos.type === 'BUY' ? currPrice - pos.openPrice : pos.openPrice - currPrice;
                  const mult = pos.symbol === 'XAUUSD' ? 100 : pos.symbol.includes('USD') ? 100000 : 10;
                  const floatPnl = Number((priceDiff * pos.lots * mult).toFixed(2));

                  return (
                    <tr key={pos.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 text-[#8892A4]">{pos.openTime}</td>
                      <td className="py-2 font-bold text-white">{pos.symbol}</td>
                      <td className={`py-2 font-bold ${pos.type === 'BUY' ? 'text-[#00E676]' : 'text-[#FF4757]'}`}>
                        {pos.type}
                      </td>
                      <td className="py-2 text-white">{pos.lots}</td>
                      <td className="py-2 text-[#8892A4]">{pos.openPrice}</td>
                      <td className="py-2 text-white">{currPrice}</td>
                      <td className={`py-2 font-bold ${floatPnl >= 0 ? 'text-[#00E676]' : 'text-[#FF4757]'}`}>
                        {floatPnl >= 0 ? '+' : ''}${floatPnl}
                      </td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => handleClosePos(pos.id)}
                          className="px-2.5 py-1 text-[10px] font-bold text-white bg-[#FF4757]/20 border border-[#FF4757]/40 hover:bg-[#FF4757] rounded transition-colors"
                        >
                          Close Position
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {depositModalOpen && (
        <DepositWithdrawModal
          initialTab={depositModalTab}
          onClose={() => setDepositModalOpen(false)}
        />
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
        {content}
      </div>
    );
  }

  return (
    <section id="terminal" className="py-20 bg-[#0A0E1A]/40 backdrop-blur-xs px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#00D4FF] uppercase tracking-widest bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/20">
            Interactive ECN Platform
          </span>
          <h2 className="font-serif text-3xl font-black text-white">Live Institutional WebTerminal</h2>
          <p className="text-xs text-[#8892A4]">Trade Forex, Gold, and Crypto with real persistent market execution.</p>
        </div>
        {content}
      </div>
    </section>
  );
};
