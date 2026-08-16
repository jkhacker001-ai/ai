import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { IBMarketingBannerGenerator } from './IBMarketingBannerGenerator';
import { DollarSign, Users, Award, Copy, Check, Download, ArrowUpRight, Share2, Wallet, X, Send, Plus } from 'lucide-react';

interface IBDashboardSimulatorProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const IBDashboardSimulator: React.FC<IBDashboardSimulatorProps> = ({ onClose, isModal = false }) => {
  const { user, referrals, addReferralLead, withdrawFunds } = useTrading();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'marketing' | 'payouts'>('overview');
  const [copied, setCopied] = useState(false);
  
  // Withdrawal
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('1000');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  // New Referral Lead Modal
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newCountry, setNewCountry] = useState('India 🇮🇳');
  const [newAccountType, setNewAccountType] = useState('Pro Account');
  const [newLots, setNewLots] = useState('25.0');

  const referralUrl = `https://nexusfx.trade/partner?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const success = withdrawFunds(Number(withdrawalAmount), 'USDT');
    if (success) {
      setWithdrawalSuccess(true);
      setTimeout(() => {
        setWithdrawalSuccess(false);
        setWithdrawalModalOpen(false);
      }, 2000);
    } else {
      alert("Insufficient IB Wallet balance!");
    }
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    addReferralLead({
      clientName: newClientName || 'New Client',
      country: newCountry,
      accountType: newAccountType,
      lotsTraded: Number(newLots) || 10,
      status: 'Active'
    });
    setNewClientName('');
    setAddLeadModalOpen(false);
  };

  const content = (
    <div className="bg-[#0A0E1A] border border-[#F0C040]/30 rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="bg-[#141824] p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#E8A020] flex items-center justify-center font-bold text-[#0A0E1A] text-xl">
            IB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-white">IB Partner Control Center</h3>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#F0C040]/10 text-[#F0C040] border border-[#F0C040]/30 rounded-full uppercase">
                VIP Master Partner
              </span>
            </div>
            <p className="text-xs text-[#8892A4]">Partner ID: {user.referralCode} • Rate: $15/lot Forex</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-[#0A0E1A] p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'leads' ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            Referred Clients
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'marketing' ? 'bg-[#F0C040] text-[#0A0E1A]' : 'text-[#8892A4] hover:text-white'
            }`}
          >
            Marketing Studio
          </button>
        </div>

        {isModal && onClose && (
          <button onClick={onClose} className="p-1.5 text-[#8892A4] hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Panel */}
      <div className="p-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1A2035] border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider">Total IB Earnings</div>
            <div className="font-serif text-2xl font-black text-[#F0C040] mt-1">
              ${user.ibEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-[#00E676] font-bold mt-1">+34% vs last month</div>
          </div>

          <div className="bg-[#1A2035] border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider">Active Referrals</div>
            <div className="font-serif text-2xl font-black text-white mt-1">{referrals.length} Clients</div>
            <div className="text-[10px] text-[#00D4FF] font-bold mt-1">Directly Tracked</div>
          </div>

          <div className="bg-[#1A2035] border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider">Traded Volume</div>
            <div className="font-serif text-2xl font-black text-white mt-1">
              {referrals.reduce((a, b) => a + b.lotsTraded, 0).toFixed(1)} Lots
            </div>
            <div className="text-[10px] text-[#8892A4] mt-1">Forex & Metals</div>
          </div>

          <div className="bg-[#1A2035] border border-[#00E676]/30 rounded-xl p-4 relative overflow-hidden">
            <div className="text-[10px] font-bold text-[#8892A4] uppercase tracking-wider">Available Wallet</div>
            <div className="font-serif text-2xl font-black text-[#00E676] mt-1">
              ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <button
              onClick={() => setWithdrawalModalOpen(true)}
              className="mt-2 px-3 py-1 bg-[#00E676] text-[#0A0E1A] font-extrabold text-[10px] rounded hover:bg-[#00FF84] uppercase tracking-wider transition-colors"
            >
              Withdraw Cash
            </button>
          </div>
        </div>

        {/* Tab 1: Overview & Link Bar */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Referral Link Generator Bar */}
            <div className="bg-[#141824] border border-[#F0C040]/30 rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#F0C040]" />
                  <span>Your Personal IB Partner Link</span>
                </span>
                <span className="text-[10px] font-mono text-[#00D4FF]">Commission Tier: $15.00/Lot</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="bg-[#0A0E1A] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#F0C040] font-mono w-full focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-bold text-xs rounded-xl hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-[#141824] border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Performing Referrals</h4>
                <button
                  onClick={() => setAddLeadModalOpen(true)}
                  className="px-3 py-1.5 bg-[#F0C040] text-[#0A0E1A] text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate New Referral</span>
                </button>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                {referrals.slice(0, 4).map((lead) => (
                  <div key={lead.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{lead.clientName} <span className="ml-1">{lead.country}</span></div>
                      <div className="text-[10px] text-[#8892A4]">{lead.accountType} • Joined {lead.joinDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-[#F0C040]">+${lead.commissionEarned}</div>
                      <div className="text-[10px] text-[#8892A4]">{lead.lotsTraded} lots traded</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads List */}
        {activeTab === 'leads' && (
          <div className="bg-[#141824] border border-white/10 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Referred Client Network</h4>
              <button
                onClick={() => setAddLeadModalOpen(true)}
                className="px-3 py-1.5 bg-[#F0C040] text-[#0A0E1A] text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate Referral Registration</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] text-[#8892A4] uppercase border-b border-white/10 pb-2">
                    <th className="py-2">Client Name</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Account Plan</th>
                    <th className="py-2">Lots Traded</th>
                    <th className="py-2">Rebate Commission</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {referrals.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-bold text-white">{lead.clientName}</td>
                      <td className="py-3 text-[#8892A4]">{lead.country}</td>
                      <td className="py-3 text-white">{lead.accountType}</td>
                      <td className="py-3 text-[#00D4FF] font-bold">{lead.lotsTraded} lots</td>
                      <td className="py-3 text-[#F0C040] font-bold">${lead.commissionEarned}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Marketing Studio */}
        {activeTab === 'marketing' && (
          <IBMarketingBannerGenerator />
        )}
      </div>

      {/* Payout Modal */}
      {withdrawalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-[#141824] border border-[#00E676]/40 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#00E676]" />
                <span>Instant IB Cash Withdrawal</span>
              </h3>
              <button onClick={() => setWithdrawalModalOpen(false)} className="text-[#8892A4] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {withdrawalSuccess ? (
              <div className="py-6 text-center space-y-2 text-[#00E676]">
                <Send className="w-12 h-12 mx-auto animate-bounce" />
                <div className="font-bold text-base">Withdrawal Dispatched!</div>
                <p className="text-xs text-[#8892A4]">${withdrawalAmount} transferred to your payment method.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4">
                <div>
                  <label className="text-xs text-[#8892A4] font-bold uppercase block mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    max={user.balance}
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00E676] text-[#0A0E1A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#00FF84]"
                >
                  Confirm Instant Payout
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-[#141824] border border-[#F0C040]/40 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-white">Simulate Referred Lead</h3>
              <button onClick={() => setAddLeadModalOpen(false)} className="text-[#8892A4] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3 text-xs">
              <div>
                <label className="text-[#8892A4] font-bold block mb-1">Client Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-[#8892A4] font-bold block mb-1">Location Country</label>
                <select
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-white"
                >
                  <option value="India 🇮🇳">India 🇮🇳</option>
                  <option value="UAE 🇦🇪">UAE 🇦🇪</option>
                  <option value="UK 🇬🇧">UK 🇬🇧</option>
                  <option value="USA 🇺🇸">USA 🇺🇸</option>
                </select>
              </div>

              <div>
                <label className="text-[#8892A4] font-bold block mb-1">Traded Lots</label>
                <input
                  type="number"
                  value={newLots}
                  onChange={(e) => setNewLots(e.target.value)}
                  className="w-full bg-[#0A0E1A] border border-white/10 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F0C040] text-[#0A0E1A] font-bold rounded-xl uppercase tracking-wider"
              >
                Add Referred Client
              </button>
            </form>
          </div>
        </div>
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

  return content;
};
