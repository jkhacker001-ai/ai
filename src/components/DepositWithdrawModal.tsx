import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { X, Wallet, QrCode, CreditCard, ArrowDownRight, ArrowUpRight, CheckCircle2, Copy, Check, Send, AlertCircle, RefreshCw } from 'lucide-react';

interface DepositWithdrawModalProps {
  initialTab?: 'deposit' | 'withdraw' | 'history';
  onClose: () => void;
}

export const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({ initialTab = 'deposit', onClose }) => {
  const { user, transactions, depositFunds, withdrawFunds } = useTrading();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>(initialTab);
  
  // Deposit state
  const [depositMethod, setDepositMethod] = useState<'UPI' | 'USDT' | 'Card' | 'Bank Wire'>('UPI');
  const [depositAmountUsd, setDepositAmountUsd] = useState<number>(100);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);

  // Withdraw state
  const [withdrawMethod, setWithdrawMethod] = useState<'UPI' | 'USDT' | 'Card' | 'Bank Wire'>('UPI');
  const [withdrawAmountUsd, setWithdrawAmountUsd] = useState<number>(500);
  const [withdrawAccountDetails, setWithdrawAccountDetails] = useState<string>('');
  const [withdrawMsg, setWithdrawMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const inrRate = 83.5;
  const amountInInr = (depositAmountUsd * inrRate).toLocaleString('en-IN', { maximumFractionDigits: 0 });

  const upiId = "nexusfx.ib@upi";
  const usdtAddress = "TNx7vK9L2pQ8mR4wZ1x3jY6sD9uF0aB5cC";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleConfirmDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    depositFunds(depositAmountUsd, depositMethod, utrNumber ? `UTR/${utrNumber}` : undefined);
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setActiveTab('history');
    }, 2000);
  };

  const handleConfirmWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountUsd > user.balance) {
      setWithdrawMsg({ text: `Insufficient account balance! Max available: $${user.balance}`, isError: true });
      return;
    }

    const success = withdrawFunds(withdrawAmountUsd, withdrawMethod);
    if (success) {
      setWithdrawMsg({ text: `Withdrawal request for $${withdrawAmountUsd} dispatched successfully!`, isError: false });
      setTimeout(() => {
        setWithdrawMsg(null);
        setActiveTab('history');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto">
      <div className="bg-[#141824] border border-[#F0C040]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676]/20 to-[#F0C040]/20 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Instant Payment Gateway</h3>
              <p className="text-xs text-[#8892A4]">Zero Fee Deposit & Instant Auto Withdrawals</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#8892A4] hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between p-1 bg-[#0A0E1A] rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'deposit' ? 'bg-[#00E676] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'withdraw' ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw Cash</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'history' ? 'bg-[#00D4FF] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            <span>Transaction Ledger</span>
          </button>
        </div>

        {/* TAB 1: DEPOSIT */}
        {activeTab === 'deposit' && (
          <div className="space-y-5">
            {depositSuccess ? (
              <div className="py-8 text-center space-y-3 bg-[#00E676]/10 border border-[#00E676]/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-[#00E676] mx-auto animate-bounce" />
                <h4 className="font-serif text-xl font-bold text-white">Deposit Confirmed & Credited!</h4>
                <p className="text-xs text-[#8892A4]">
                  ${depositAmountUsd} credited to MT5 Account #{user.mt5Login}. Balance is now ${user.balance.toFixed(2)}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmDeposit} className="space-y-5">
                {/* Method selector */}
                <div>
                  <label className="text-xs font-bold text-[#8892A4] uppercase block mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'UPI', name: 'UPI / QR', badge: 'INSTANT' },
                      { id: 'USDT', name: 'USDT TRC20', badge: 'NO FEE' },
                      { id: 'Card', name: 'Visa/Master', badge: '3D SECURE' },
                      { id: 'Bank Wire', name: 'Bank Wire', badge: 'INSTANT' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setDepositMethod(m.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          depositMethod === m.id
                            ? 'bg-[#00E676]/15 border-[#00E676] text-white'
                            : 'bg-[#0A0E1A] border-white/10 text-[#8892A4] hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{m.name}</div>
                        <span className="text-[9px] font-bold text-[#00E676] bg-[#00E676]/10 px-1.5 py-0.5 rounded">
                          {m.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount presets */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#8892A4]">
                    <span>Amount ($ USD)</span>
                    <span className="text-[#F0C040]">≈ ₹{amountInInr} INR</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[50, 100, 500, 2000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDepositAmountUsd(val)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold border ${
                          depositAmountUsd === val
                            ? 'bg-[#F0C040] text-[#0A0E1A] border-[#F0C040]'
                            : 'bg-[#0A0E1A] border-white/10 text-[#8892A4]'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={depositAmountUsd}
                    onChange={(e) => setDepositAmountUsd(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-[#00E676] focus:outline-none"
                  />
                </div>

                {/* UPI QR Display */}
                {depositMethod === 'UPI' && (
                  <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-4 sm:p-5 text-center space-y-3">
                    <div className="text-xs font-bold text-white uppercase">Scan & Pay via Any UPI App</div>
                    {/* Generated Visual QR Code Placeholder */}
                    <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto shadow-lg flex flex-col items-center justify-center border-2 border-[#00E676]">
                      <QrCode className="w-28 h-28 text-black" />
                    </div>
                    <div className="text-xs text-[#8892A4]">GPay • PhonePe • Paytm • BHIM • Cred</div>
                    <div className="flex items-center justify-between bg-[#141824] p-3 rounded-xl border border-white/10 text-xs font-mono">
                      <span className="text-[#8892A4]">UPI VPA:</span>
                      <span className="text-[#F0C040] font-bold">{upiId}</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-2 py-1 bg-[#F0C040]/20 text-[#F0C040] rounded text-[10px] font-bold hover:bg-[#F0C040] hover:text-[#0A0E1A]"
                      >
                        {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#8892A4] block text-left mb-1 uppercase">
                        Payment UTR / Ref Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 629014820192"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full bg-[#141824] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono focus:border-[#00E676]"
                      />
                    </div>
                  </div>
                )}

                {/* USDT Address Display */}
                {depositMethod === 'USDT' && (
                  <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-4 text-center space-y-3">
                    <div className="text-xs font-bold text-[#00E676] uppercase">USDT TRC-20 Wallet Address</div>
                    <div className="p-3 bg-[#141824] rounded-xl font-mono text-xs text-[#F0C040] break-all border border-white/10">
                      {usdtAddress}
                    </div>
                    <p className="text-[11px] text-[#8892A4]">
                      Send exactly <strong>{depositAmountUsd} USDT</strong>. Account balance will credit upon 1 blockchain confirmation.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#00E676] to-[#00C853] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg transition-all"
                >
                  I Have Completed Payment - Credit Account Now
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: WITHDRAW */}
        {activeTab === 'withdraw' && (
          <form onSubmit={handleConfirmWithdrawal} className="space-y-5">
            <div className="bg-[#0A0E1A] border border-[#F0C040]/20 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-[#8892A4]">Available Withdrawable Balance:</span>
              <span className="font-mono font-bold text-[#F0C040] text-base">${user.balance.toFixed(2)}</span>
            </div>

            {withdrawMsg && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                withdrawMsg.isError ? 'bg-[#FF4757]/10 text-[#FF4757] border border-[#FF4757]/30' : 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30'
              }`}>
                {withdrawMsg.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{withdrawMsg.text}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-2">Withdrawal Destination</label>
              <select
                value={withdrawMethod}
                onChange={(e) => setWithdrawMethod(e.target.value as any)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white"
              >
                <option value="UPI">Local UPI / Bank Account (India Instant)</option>
                <option value="USDT">USDT (TRC-20 Crypto Address)</option>
                <option value="Bank Wire">International Bank Wire</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">Amount ($ USD)</label>
              <input
                type="number"
                min="10"
                max={user.balance}
                value={withdrawAmountUsd}
                onChange={(e) => setWithdrawAmountUsd(Number(e.target.value))}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#8892A4] uppercase block mb-1">
                {withdrawMethod === 'UPI' ? 'UPI ID or Account Number + IFSC' : 'USDT TRC20 Wallet Address'}
              </label>
              <input
                type="text"
                required
                placeholder={withdrawMethod === 'UPI' ? 'rajesh@upi or HDFC0001234...' : 'TNx7vK...'}
                value={withdrawAccountDetails}
                onChange={(e) => setWithdrawAccountDetails(e.target.value)}
                className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg transition-all"
            >
              Confirm Cash Withdrawal Request
            </button>
          </form>
        )}

        {/* TAB 3: LEDGER */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recent Transactions Log</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-[10px] text-[#8892A4] uppercase border-b border-white/10 pb-2">
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Method</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Ref Hash</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/5">
                      <td className="py-3 text-[#8892A4]">{tx.date}</td>
                      <td className={`py-3 font-bold uppercase ${tx.type === 'deposit' ? 'text-[#00E676]' : 'text-[#F0C040]'}`}>
                        {tx.type}
                      </td>
                      <td className="py-3 text-white">{tx.method}</td>
                      <td className="py-3 font-bold text-white">${tx.amount}</td>
                      <td className="py-3 text-[10px] text-[#8892A4]">{tx.txnHash || '-'}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
