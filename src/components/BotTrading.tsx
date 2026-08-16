import React, { useState, useEffect } from 'react';
import { TRADING_BOTS } from '../data/marketData';
import { TradingBot } from '../types';
import { useTrading } from '../context/TradingContext';
import { Bot, Cpu, Zap, Shield, TrendingUp, Play, Pause, CheckCircle2, Sliders, BarChart3, AlertCircle, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface BotTradingProps {
  onOpenTerminal?: () => void;
}

export const BotTrading: React.FC<BotTradingProps> = ({ onOpenTerminal }) => {
  const { deployedBots, toggleBotDeployment, openTrade } = useTrading();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBotModal, setActiveBotModal] = useState<TradingBot | null>(null);

  // Backtest simulator state
  const [backtestPeriod, setBacktestPeriod] = useState<'3M' | '6M' | '1Y'>('6M');
  const [riskPercent, setRiskPercent] = useState<number>(2.0);
  const [backtestLots, setBacktestLots] = useState<number>(1.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [backtestResult, setBacktestResult] = useState<{
    netProfit: number;
    winRate: number;
    trades: number;
    maxDD: number;
    profitFactor: number;
  } | null>(null);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Simulated Algo Live Stream
  const [liveLog, setLiveLog] = useState<Array<{ id: string; time: string; botName: string; symbol: string; action: string; profit: string }>>([
    { id: '1', time: '10:42:15', botName: 'Nexus Gold Bot Pro', symbol: 'XAUUSD', action: 'BUY 1.0 Lot @ 2372.10', profit: '+$142.50' },
    { id: '2', time: '10:38:02', botName: 'Quantum SMC EA', symbol: 'EURUSD', action: 'SELL 2.0 Lots @ 1.0845', profit: '+$210.00' },
    { id: '3', time: '10:25:40', botName: 'HFT Crypto Arbitrage', symbol: 'BTCUSD', action: 'BUY 0.50 Lot @ 67200', profit: '+$380.00' }
  ]);

  // Periodic simulated bot trades stream
  useEffect(() => {
    const interval = setInterval(() => {
      const bots = TRADING_BOTS;
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      const isWin = Math.random() > 0.15;
      const profitVal = isWin ? (Math.random() * 250 + 40).toFixed(2) : (-(Math.random() * 80 + 10)).toFixed(2);
      const now = new Date().toLocaleTimeString();

      setLiveLog((prev) => [
        {
          id: String(Date.now()),
          time: now,
          botName: randomBot.name,
          symbol: randomBot.symbol,
          action: `${Math.random() > 0.5 ? 'BUY' : 'SELL'} ${randomBot.symbol === 'BTCUSD' ? '0.5' : '1.0'} Lot`,
          profit: `${isWin ? '+' : ''}$${profitVal}`
        },
        ...prev.slice(0, 5)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const filteredBots = TRADING_BOTS.filter((bot) => {
    if (selectedCategory === 'all') return true;
    return bot.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleToggleDeploy = (bot: TradingBot) => {
    toggleBotDeployment(bot.id);
    const isNowDeployed = !deployedBots.includes(bot.id);
    setNotification(
      isNowDeployed
        ? `🤖 ${bot.name} ${bot.version} DEPLOYED & ACTIVE on MT5 Live Server!`
        : `⏸️ ${bot.name} PAUSED on MT5 Server.`
    );
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRunBacktest = (bot: TradingBot) => {
    setIsSimulating(true);
    setTimeout(() => {
      const multiplier = backtestPeriod === '3M' ? 1 : backtestPeriod === '6M' ? 2.1 : 4.2;
      const baseProfit = bot.minCapital * (bot.monthlyRoi / 100) * multiplier * backtestLots;
      
      setBacktestResult({
        netProfit: Number(baseProfit.toFixed(2)),
        winRate: Number((bot.winRate + (Math.random() * 2 - 1)).toFixed(1)),
        trades: Math.floor(bot.tradesExecuted * (multiplier / 4)),
        maxDD: bot.maxDrawdown,
        profitFactor: Number((2.1 + Math.random() * 0.4).toFixed(2))
      });
      setIsSimulating(false);
    }, 1200);
  };

  const handleAutoExecuteBotOrder = (bot: TradingBot) => {
    const actionType = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const initialPrice = bot.symbol === 'XAUUSD' ? 2374.50 : bot.symbol === 'EURUSD' ? 1.0842 : 67420;
    
    openTrade(bot.symbol, actionType, backtestLots, initialPrice);
    setNotification(`⚡ EA Robot auto-executed ${actionType} ${backtestLots} Lot of ${bot.symbol} on MT5!`);
    setTimeout(() => setNotification(null), 4000);
    if (onOpenTerminal) onOpenTerminal();
  };

  return (
    <section id="bot-trading" className="py-20 bg-[#0A0E1A]/30 backdrop-blur-xs relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#00D4FF]/10 via-[#F0C040]/10 to-[#00E676]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00D4FF]/15 to-[#F0C040]/15 border border-[#00D4FF]/30 text-xs font-bold text-[#00D4FF]">
            <Bot className="w-4 h-4 text-[#00D4FF] animate-pulse" />
            <span className="uppercase tracking-widest">MT5 EA & AI Robot Trading Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Automated Algorithmic <br />
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#F0C040] to-[#00E676] bg-clip-text text-transparent">
              Robot & EA Trading Engine
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#8892A4] leading-relaxed">
            Deploy institutional Expert Advisors (EAs) with 0ms execution latency. Algorithmic liquidity sweeps, Smart Money order blocks, and high-frequency crypto arbitrage running 24/7 on your MetaTrader 5 account.
          </p>
        </div>

        {/* Global Live Notification Banner */}
        {notification && (
          <div className="max-w-2xl mx-auto p-3.5 bg-[#00D4FF]/15 border border-[#00D4FF]/40 rounded-xl text-xs text-[#00D4FF] font-bold flex items-center justify-center gap-2 animate-in fade-in shadow-lg shadow-[#00D4FF]/10">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>{notification}</span>
          </div>
        )}

        {/* Live Bot Execution Stats Bar */}
        <div className="bg-[#141824] border border-[#00D4FF]/20 rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Active Deployed Bots</span>
            </div>
            <div className="font-serif text-2xl font-black text-white flex items-center gap-2">
              <span>{deployedBots.length} Running</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-ping" />
            </div>
            <div className="text-[10px] text-[#00E676] font-bold">Bridge Connected to MT5</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#F0C040]" />
              <span>Avg Robot Win Rate</span>
            </div>
            <div className="font-serif text-2xl font-black text-[#F0C040]">92.4%</div>
            <div className="text-[10px] text-[#8892A4]">Audited ECN Backtests</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00E676]" />
              <span>Execution Speed</span>
            </div>
            <div className="font-serif text-2xl font-black text-[#00E676]">2.4 ms</div>
            <div className="text-[10px] text-[#00E676] font-bold">Ultra-Low Latency VPS</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Risk Management</span>
            </div>
            <div className="font-serif text-2xl font-black text-white">Auto SL & Equity Shield</div>
            <div className="text-[10px] text-[#8892A4]">Zero Negative Slippage</div>
          </div>
        </div>

        {/* Live Algo Stream & Category Filter Row */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left: Category Filters */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2 bg-[#141824] p-1.5 rounded-xl border border-white/10 text-xs font-bold">
              {[
                { id: 'all', label: 'All AI Bots' },
                { id: 'scalping', label: 'Gold Scalping' },
                { id: 'smart money', label: 'Smart Money (SMC)' },
                { id: 'grid', label: 'Grid & Martingale' },
                { id: 'hft', label: 'HFT Crypto' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#00D4FF] to-[#00A3FF] text-[#0A0E1A] font-extrabold shadow-lg shadow-[#00D4FF]/20'
                      : 'text-[#8892A4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Trading Bots Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredBots.map((bot) => {
                const isDeployed = deployedBots.includes(bot.id);

                return (
                  <div
                    key={bot.id}
                    className={`bg-[#141824] border rounded-2xl p-6 space-y-5 transition-all duration-300 relative flex flex-col justify-between ${
                      isDeployed
                        ? 'border-[#00E676] shadow-xl shadow-[#00E676]/10 bg-gradient-to-b from-[#00E676]/5 to-transparent'
                        : 'border-white/10 hover:border-[#00D4FF]/50 hover:shadow-xl'
                    }`}
                  >
                    {/* Bot Header Badge */}
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#F0C040]/20 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base leading-snug">{bot.name}</h3>
                            <div className="flex items-center gap-2 text-[10px] text-[#8892A4]">
                              <span className="font-mono text-[#00D4FF] font-bold">{bot.version}</span>
                              <span>•</span>
                              <span>{bot.symbol} ({bot.timeframe})</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase tracking-wider border ${
                            bot.riskLevel === 'Conservative'
                              ? 'bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30'
                              : bot.riskLevel === 'Moderate'
                              ? 'bg-[#F0C040]/10 text-[#F0C040] border-[#F0C040]/30'
                              : 'bg-[#FF4757]/10 text-[#FF4757] border-[#FF4757]/30'
                          }`}
                        >
                          {bot.riskLevel}
                        </span>
                      </div>

                      <p className="text-xs text-[#8892A4] line-clamp-2 leading-relaxed">
                        {bot.description}
                      </p>
                    </div>

                    {/* Stats Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#0A0E1A] p-3 rounded-xl border border-white/10 text-center font-mono">
                      <div>
                        <div className="text-[9px] text-[#8892A4] uppercase font-sans font-bold">Win Rate</div>
                        <div className="text-sm font-bold text-[#00E676] mt-0.5">{bot.winRate}%</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#8892A4] uppercase font-sans font-bold">Monthly ROI</div>
                        <div className="text-sm font-bold text-[#F0C040] mt-0.5">+{bot.monthlyRoi}%</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#8892A4] uppercase font-sans font-bold">Max DD</div>
                        <div className="text-sm font-bold text-[#FF4757] mt-0.5">{bot.maxDrawdown}%</div>
                      </div>
                    </div>

                    {/* Algorithm Specs List */}
                    <div className="space-y-1.5 text-[11px] text-[#8892A4]">
                      {bot.algorithmSpecs.slice(0, 3).map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleToggleDeploy(bot)}
                        className={`flex-1 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          isDeployed
                            ? 'bg-[#00E676] text-[#0A0E1A] hover:bg-[#00FF84] shadow-lg shadow-[#00E676]/20'
                            : 'bg-gradient-to-r from-[#00D4FF] to-[#00A3FF] text-[#0A0E1A] hover:brightness-110 shadow-lg shadow-[#00D4FF]/20'
                        }`}
                      >
                        {isDeployed ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Active (Pause)</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Deploy to MT5</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setActiveBotModal(bot);
                          handleRunBacktest(bot);
                        }}
                        className="px-3 py-3 bg-[#0A0E1A] text-[#8892A4] hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors"
                        title="Backtest Strategy"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Automated Orders Ticker Console */}
          <div className="lg:col-span-4 bg-[#141824] border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-ping" />
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Live EA Robot Execution Stream</h4>
              </div>
              <span className="px-2 py-0.5 bg-[#00D4FF]/10 text-[#00D4FF] text-[9px] font-mono font-bold rounded">
                EAs ACTIVE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-[460px] overflow-y-auto pr-1">
              {liveLog.map((log) => (
                <div key={log.id} className="p-3 bg-[#0A0E1A] border border-white/5 rounded-xl space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between items-center text-[10px] text-[#8892A4]">
                    <span className="text-[#00D4FF] font-bold">{log.botName}</span>
                    <span>{log.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{log.action}</span>
                    <span className={`font-bold ${log.profit.startsWith('+') ? 'text-[#00E676]' : 'text-[#FF4757]'}`}>
                      {log.profit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={onOpenTerminal}
                className="w-full py-2.5 bg-[#0A0E1A] text-[#00D4FF] border border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Open MT5 WebTerminal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backtest Simulator Modal */}
      {activeBotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto">
          <div className="bg-[#141824] border border-[#00D4FF]/40 rounded-2xl p-6 max-w-xl w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">{activeBotModal.name}</h3>
                  <p className="text-xs text-[#8892A4]">Strategy Backtest & EA Configuration</p>
                </div>
              </div>
              <button onClick={() => setActiveBotModal(null)} className="text-[#8892A4] hover:text-white">
                ✕
              </button>
            </div>

            {/* Backtest Parameters Form */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-[#8892A4] font-bold uppercase block mb-1">Timeframe Period</label>
                <select
                  value={backtestPeriod}
                  onChange={(e) => setBacktestPeriod(e.target.value as any)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="3M">3 Months</option>
                  <option value="6M">6 Months</option>
                  <option value="1Y">1 Year</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#8892A4] font-bold uppercase block mb-1">Lot Size</label>
                <input
                  type="number"
                  step="0.1"
                  value={backtestLots}
                  onChange={(e) => setBacktestLots(Math.max(0.1, Number(e.target.value)))}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8892A4] font-bold uppercase block mb-1">Risk per Trade %</label>
                <input
                  type="number"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => handleRunBacktest(activeBotModal)}
              disabled={isSimulating}
              className="w-full py-3 bg-white/5 border border-white/10 hover:border-[#00D4FF] text-white font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin text-[#00D4FF]" /> : <Play className="w-4 h-4 text-[#00D4FF]" />}
              <span>{isSimulating ? 'Running Backtest Simulation...' : 'Re-Run Backtest'}</span>
            </button>

            {/* Backtest Result Cards */}
            {backtestResult && (
              <div className="bg-[#0A0E1A] border border-[#00E676]/30 rounded-2xl p-5 space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white uppercase tracking-wider">Backtest Simulation Metrics</span>
                  <span className="px-2 py-0.5 bg-[#00E676]/10 text-[#00E676] text-[10px] font-bold rounded">
                    ECN PASSED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="p-2.5 bg-[#141824] rounded-xl border border-white/5">
                    <div className="text-[9px] text-[#8892A4] font-sans font-bold uppercase">Net Profit</div>
                    <div className="text-base font-bold text-[#00E676] mt-1">+${backtestResult.netProfit}</div>
                  </div>

                  <div className="p-2.5 bg-[#141824] rounded-xl border border-white/5">
                    <div className="text-[9px] text-[#8892A4] font-sans font-bold uppercase">Simulated Win %</div>
                    <div className="text-base font-bold text-[#F0C040] mt-1">{backtestResult.winRate}%</div>
                  </div>

                  <div className="p-2.5 bg-[#141824] rounded-xl border border-white/5">
                    <div className="text-[9px] text-[#8892A4] font-sans font-bold uppercase">Total Trades</div>
                    <div className="text-base font-bold text-white mt-1">{backtestResult.trades}</div>
                  </div>

                  <div className="p-2.5 bg-[#141824] rounded-xl border border-white/5">
                    <div className="text-[9px] text-[#8892A4] font-sans font-bold uppercase">Profit Factor</div>
                    <div className="text-base font-bold text-[#00D4FF] mt-1">{backtestResult.profitFactor}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAutoExecuteBotOrder(activeBotModal);
                    setActiveBotModal(null);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#00E676] to-[#00C853] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 shadow-lg shadow-[#00E676]/20"
                >
                  Auto-Execute Robot Trade on Live Terminal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
