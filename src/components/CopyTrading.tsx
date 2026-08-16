import React, { useState } from 'react';
import { COPY_TRADING_MASTERS } from '../data/marketData';
import { useTrading } from '../context/TradingContext';
import { ShieldCheck, TrendingUp, Users, Check, ArrowRight, Zap, RefreshCw, X, Award } from 'lucide-react';

interface CopyTradingProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const CopyTrading: React.FC<CopyTradingProps> = ({ isModal = false, onClose }) => {
  const { copiedMasters, copyTrader } = useTrading();
  const [selectedMaster, setSelectedMaster] = useState<typeof COPY_TRADING_MASTERS[0] | null>(null);
  const [allocation, setAllocation] = useState<number>(500);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartCopy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaster) return;

    copyTrader(selectedMaster.id, allocation);
    setSuccessMsg(`Subscribed to ${selectedMaster.name}! $${allocation} allocated to proportional execution.`);
    setTimeout(() => {
      setSuccessMsg(null);
      setSelectedMaster(null);
    }, 2500);
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#F0C040] uppercase tracking-widest bg-[#F0C040]/10 px-3 py-1 rounded-full border border-[#F0C040]/20">
            Automated CopyTrading Engine
          </span>
          <h2 className="font-serif text-3xl font-black text-white mt-2">Mirror Professional Traders</h2>
          <p className="text-xs text-[#8892A4]">
            Proportional execution in real-time. Keep 100% control of your funds with zero performance fees.
          </p>
        </div>

        {isModal && onClose && (
          <button onClick={onClose} className="p-2 text-[#8892A4] hover:text-white rounded-lg border border-white/10">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Masters Directory Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COPY_TRADING_MASTERS.map((master) => {
          const isCopied = copiedMasters.includes(master.id);

          return (
            <div
              key={master.id}
              className={`bg-[#141824] border rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between ${
                isCopied ? 'border-[#00E676] shadow-lg shadow-[#00E676]/10' : 'border-white/10 hover:border-[#F0C040]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] text-sm">
                    {master.avatar}
                  </div>
                  {master.verified && (
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED AUDITED</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-white text-base">{master.name}</h3>
                  <p className="text-[11px] text-[#8892A4] line-clamp-2 mt-0.5">{master.strategy}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-[#8892A4] uppercase">Win Rate</div>
                    <div className="font-bold text-[#00E676]">{master.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8892A4] uppercase">Total Gain</div>
                    <div className="font-bold text-[#F0C040]">+{master.totalReturn}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8892A4] uppercase">Max Drawdown</div>
                    <div className="font-bold text-[#FF4757]">{master.drawdown}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8892A4] uppercase">Active Copiers</div>
                    <div className="font-bold text-white">{master.copiers}</div>
                  </div>
                </div>
              </div>

              {isCopied ? (
                <div className="w-full py-2.5 bg-[#00E676]/20 border border-[#00E676]/40 text-[#00E676] font-extrabold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Currently Copying</span>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedMaster(master)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg transition-all"
                >
                  Auto-Copy Strategy
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Allocation Modal */}
      {selectedMaster && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#141824] border border-[#F0C040]/40 rounded-2xl p-6 max-w-md w-full space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-white">Allocate Copy Capital</h3>
              <button onClick={() => setSelectedMaster(null)} className="text-[#8892A4] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="py-6 text-center text-[#00E676] font-bold text-xs space-y-2">
                <Check className="w-10 h-10 mx-auto animate-bounce" />
                <div>{successMsg}</div>
              </div>
            ) : (
              <form onSubmit={handleStartCopy} className="space-y-4">
                <div className="bg-[#0A0E1A] p-3 rounded-xl border border-white/10 text-xs">
                  <div className="font-bold text-white">{selectedMaster.name}</div>
                  <div className="text-[#8892A4] text-[10px]">Min Capital required: ${selectedMaster.minDeposit}</div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                    Copy Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    min={selectedMaster.minDeposit}
                    step="50"
                    value={allocation}
                    onChange={(e) => setAllocation(Number(e.target.value))}
                    className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00E676] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#00FF84]"
                >
                  Start Proportional Copying
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
        <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 max-w-6xl w-full">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#0A0E1A]/40 backdrop-blur-xs px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">{content}</div>
    </section>
  );
};
