import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Plus,
  Search,
  Filter,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Wallet,
  ArrowUpRight,
  UserPlus,
  Building2,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  RefreshCw,
  LogOut,
  LineChart,
  Bot,
  UserCheck
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { SubIBAccount } from '../types';

interface IBStructureDashboardProps {
  onOpenTerminal?: () => void;
  onOpenDeposit?: () => void;
  onOpenBots?: () => void;
  onOpenCopyTrading?: () => void;
  onViewPublicSite?: () => void;
}

export const IBStructureDashboard: React.FC<IBStructureDashboardProps> = ({
  onOpenTerminal,
  onOpenDeposit,
  onOpenBots,
  onOpenCopyTrading,
  onViewPublicSite
}) => {
  const {
    user,
    ibTree,
    totalNetworkFund,
    totalNetworkAccounts,
    totalNetworkLots,
    addSubIBNode,
    withdrawFunds,
    logout
  } = useTrading();

  const [viewMode, setViewMode] = useState<'tree' | 'table'>('tree');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'ALL' | 'Sub-IB Partner' | 'Direct Trader' | 'VIP Client'>('ALL');
  const [filterFundMin, setFilterFundMin] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Add New Account Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccName, setNewAccName] = useState('');
  const [newAccEmail, setNewAccEmail] = useState('');
  const [newAccPhone, setNewAccPhone] = useState('');
  const [newAccRole, setNewAccRole] = useState<'Sub-IB Partner' | 'Direct Trader' | 'VIP Client'>('Sub-IB Partner');
  const [newAccType, setNewAccType] = useState('Pro ECN Account');
  const [newAccFund, setNewAccFund] = useState('10000');
  const [newAccCountry, setNewAccCountry] = useState('India 🇮🇳');
  const [parentTargetId, setParentTargetId] = useState<string>(''); // empty = direct under user

  // Collapsed state for nodes in tree view
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const referralUrl = `https://nexusfx.trade/register?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Flatten tree for table view & search
  const flattenNodes = (nodes: SubIBAccount[]): SubIBAccount[] => {
    let result: SubIBAccount[] = [];
    for (const node of nodes) {
      result.push(node);
      if (node.subAccounts && node.subAccounts.length > 0) {
        result = result.concat(flattenNodes(node.subAccounts));
      }
    }
    return result;
  };

  const flatList = useMemo(() => flattenNodes(ibTree), [ibTree]);

  const filteredList = useMemo(() => {
    return flatList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mt5Login.includes(searchQuery) ||
        item.sponsorCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = filterRole === 'ALL' || item.role === filterRole;
      const matchFund = Number(item.fundDeposited) >= filterFundMin;

      return matchSearch && matchRole && matchFund;
    });
  }, [flatList, searchQuery, filterRole, filterFundMin]);

  // Handle Add Account Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fundNum = Number(newAccFund) || 5000;
    const isSubIB = newAccRole === 'Sub-IB Partner';
    const lotsEstimated = Number((fundNum * 0.015).toFixed(1));
    const commission = Number((lotsEstimated * 15).toFixed(2));

    addSubIBNode(
      {
        name: newAccName || 'New Partner Account',
        email: newAccEmail || `trader-${Date.now()}@nexusfx.trade`,
        phone: newAccPhone || '+91 98000 11223',
        mt5Login: `709${Math.floor(10000 + Math.random() * 90000)}`,
        role: newAccRole,
        accountType: newAccType,
        level: parentTargetId ? 2 : 1,
        sponsorCode: parentTargetId ? 'IB-SUB' : user.referralCode,
        fundDeposited: fundNum,
        equity: fundNum,
        lotsTraded: lotsEstimated,
        commissionGenerated: commission,
        joinDate: new Date().toISOString().split('T')[0],
        country: newAccCountry,
        status: fundNum >= 25000 ? 'VIP' : 'Active',
        subAccounts: isSubIB ? [] : undefined
      },
      parentTargetId || undefined
    );

    // Reset Form
    setNewAccName('');
    setNewAccEmail('');
    setNewAccPhone('');
    setNewAccFund('10000');
    setIsAddModalOpen(false);
  };

  // Count Sub-IBs vs Direct Clients
  const subIBCount = flatList.filter((x) => x.role === 'Sub-IB Partner').length;
  const clientTraderCount = flatList.filter((x) => x.role !== 'Sub-IB Partner').length;

  return (
    <div className="min-h-screen bg-[#070A13] text-[#F8FAFF] p-4 sm:p-6 md:p-8 space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#0E1322] border border-[#F0C040]/30 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F0C040]/10 via-[#00D4FF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* User Profile Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0C040] via-[#E8A020] to-[#00D4FF] flex items-center justify-center font-serif font-black text-2xl text-[#0A0E1A] shadow-lg shadow-[#F0C040]/20 shrink-0">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user.fullName}
                </h1>
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-[#F0C040]/15 text-[#F0C040] border border-[#F0C040]/40 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Master IB Partner</span>
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-mono text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/30 rounded-md">
                  MT5: {user.mt5Login} ({user.mt5Server})
                </span>
              </div>

              {/* Sponsor & Partner Metadata */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#8892A4] mt-2 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#A0AEC0]">Your IB Code:</span>
                  <span className="text-[#F0C040] font-bold">{user.referralCode}</span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 hover:text-white transition-colors"
                    title="Copy IB Code"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#A0AEC0]">Sponsor Parent IB:</span>
                  <span className="text-[#00D4FF] font-bold">{user.sponsorIBCode || 'IB-GLOBAL-MASTER01'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#00E676]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Multi-Tier Rebates Active ($15/Lot Tier 1 • $5/Lot Tier 2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="px-4 py-2.5 bg-[#141A2E] hover:bg-[#1E2640] text-white border border-white/10 hover:border-[#00D4FF]/40 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
              >
                <LineChart className="w-4 h-4 text-[#00D4FF]" />
                <span>Web Terminal</span>
              </button>
            )}

            {onOpenDeposit && (
              <button
                onClick={onOpenDeposit}
                className="px-4 py-2.5 bg-[#00E676]/15 hover:bg-[#00E676]/25 text-[#00E676] border border-[#00E676]/40 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Deposit / Payout</span>
              </button>
            )}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold text-xs rounded-xl shadow-lg shadow-[#F0C040]/25 hover:shadow-[#F0C040]/40 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Sub-IB / Client</span>
            </button>

            <button
              onClick={logout}
              className="p-2.5 bg-[#141A2E] hover:bg-red-500/20 text-[#8892A4] hover:text-red-400 border border-white/10 rounded-xl transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big Network Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Sub-IBs & Accounts */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
              Network Accounts Under You
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-black text-white mt-2">
            {totalNetworkAccounts}{' '}
            <span className="text-sm font-sans font-normal text-[#8892A4]">Accounts</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#00D4FF] font-semibold mt-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {subIBCount} Sub-IB Partners • {clientTraderCount} Direct Clients
            </span>
          </div>
        </motion.div>

        {/* Metric 2: Total Network Funds Deposited */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#0E1322] border border-[#00E676]/30 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#0E1322] to-[#00E676]/5"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
              Total Funds Deposited in Network
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#00E676]/15 text-[#00E676] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-black text-[#00E676] mt-2">
            ${totalNetworkFund.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-[#8892A4] mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00E676] inline-block animate-pulse" />
            <span>Active Segregated Client Equity</span>
          </div>
        </motion.div>

        {/* Metric 3: Total Traded Volume (Lots) */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
              Total Volume Traded
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#F0C040]/10 text-[#F0C040] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-black text-white mt-2">
            {totalNetworkLots.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}{' '}
            <span className="text-sm font-sans font-normal text-[#8892A4]">Lots</span>
          </div>
          <div className="text-xs text-[#F0C040] font-semibold mt-2">
            Forex Pairs, Gold (XAUUSD) & Indices
          </div>
        </motion.div>

        {/* Metric 4: Total Commission Earned */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#0E1322] border border-[#F0C040]/30 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#0E1322] to-[#F0C040]/5"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#8892A4] uppercase tracking-wider">
              Your Total IB Rebates Earned
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#F0C040]/20 text-[#F0C040] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-black text-[#F0C040] mt-2">
            ${user.ibEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-[#00E676] font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Ready for Instant Withdrawal</span>
          </div>
        </motion.div>
      </div>

      {/* Referral Link & Quick Invite Bar */}
      <div className="bg-[#0E1322] border border-[#F0C040]/30 rounded-2xl p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0C040]/10 border border-[#F0C040]/30 flex items-center justify-center text-[#F0C040] shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Your Master IB Referral Registration Link</div>
            <div className="text-xs text-[#8892A4]">
              Anyone who registers using this link is automatically placed into your downline structure with multi-tier rebate commissions.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="bg-[#070A13] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F0C040] font-mono w-full md:w-80 focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="px-5 py-2.5 bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Main Structure Navigation & Filter Controls */}
      <div className="bg-[#0E1322] border border-white/10 rounded-2xl p-5 space-y-5">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#070A13] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  viewMode === 'tree'
                    ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tree Hierarchy View</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Data Table View ({flatList.length})</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-[#8892A4] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search IB Name, MT5 ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070A13] border border-white/10 focus:border-[#F0C040] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none font-mono"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="bg-[#070A13] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="Sub-IB Partner">Sub-IB Partners Only</option>
              <option value="Direct Trader">Direct Traders</option>
              <option value="VIP Client">VIP Clients</option>
            </select>

            <select
              value={filterFundMin}
              onChange={(e) => setFilterFundMin(Number(e.target.value))}
              className="bg-[#070A13] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value={0}>All Fund Deposits</option>
              <option value={5000}>Funds &gt; $5,000</option>
              <option value={15000}>Funds &gt; $15,000</option>
              <option value={30000}>VIP Funds &gt; $30,000</option>
            </select>
          </div>
        </div>

        {/* View Mode 1: Interactive Hierarchy Tree */}
        {viewMode === 'tree' && (
          <div className="space-y-4">
            {/* Root Node (You - Master IB) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#141A2E] to-[#111628] border-2 border-[#F0C040] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#F0C040] text-[#0A0E1A] font-black text-xl flex items-center justify-center shadow-md shadow-[#F0C040]/30">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-black text-white">{user.fullName} (YOU)</span>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-[#F0C040]/20 text-[#F0C040] border border-[#F0C040]/40 rounded-full">
                        Root Master IB Tier 1
                      </span>
                    </div>
                    <div className="text-xs text-[#8892A4] mt-0.5">
                      MT5 Login: <span className="font-mono text-white font-bold">{user.mt5Login}</span> • Partner Code: <span className="font-mono text-[#F0C040] font-bold">{user.referralCode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8892A4]">Total Downline Funds</div>
                    <div className="font-serif text-xl font-black text-[#00E676]">
                      ${totalNetworkFund.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8892A4]">Downline Accounts</div>
                    <div className="font-serif text-xl font-black text-white">
                      {totalNetworkAccounts}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8892A4]">Total Volume</div>
                    <div className="font-serif text-xl font-black text-[#00D4FF]">
                      {totalNetworkLots.toFixed(1)} L
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Child Nodes */}
            <div className="pl-3 sm:pl-8 border-l-2 border-[#F0C040]/40 space-y-4 ml-4 sm:ml-6 mt-4">
              {ibTree.length === 0 ? (
                <div className="p-8 text-center bg-[#070A13] rounded-2xl border border-white/10 text-[#8892A4]">
                  No Sub-IBs or traders added yet. Click "+ Add Sub-IB / Client" above to simulate downline registrations!
                </div>
              ) : (
                ibTree.map((node) => {
                  const isCollapsed = collapsedNodes[node.id];
                  const hasChildren = node.subAccounts && node.subAccounts.length > 0;
                  const childFunds = node.subAccounts?.reduce((sum, c) => sum + (c.fundDeposited || 0), 0) || 0;

                  return (
                    <div key={node.id} className="space-y-3 relative">
                      {/* Node Connection Line */}
                      <div className="absolute -left-3 sm:-left-8 top-6 w-3 sm:w-8 h-0.5 bg-[#F0C040]/40" />

                      {/* Level 1 Sub-IB / Trader Card */}
                      <div
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          node.role === 'Sub-IB Partner'
                            ? 'bg-[#10162A] border-[#00D4FF]/40 hover:border-[#00D4FF]'
                            : 'bg-[#0A0E1A] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-3">
                            {hasChildren && (
                              <button
                                onClick={() => toggleCollapse(node.id)}
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[#00D4FF] transition-colors mt-0.5 sm:mt-0"
                                title={isCollapsed ? 'Expand Sub-Accounts' : 'Collapse Sub-Accounts'}
                              >
                                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            )}

                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] font-bold flex items-center justify-center shrink-0">
                              {node.role === 'Sub-IB Partner' ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-white text-sm sm:text-base">{node.name}</span>
                                <span className="text-xs">{node.country}</span>
                                <span
                                  className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                                    node.role === 'Sub-IB Partner'
                                      ? 'bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30'
                                      : 'bg-white/10 text-white'
                                  }`}
                                >
                                  {node.role} (Level 1)
                                </span>
                                {node.status === 'VIP' && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F0C040]/15 text-[#F0C040] border border-[#F0C040]/30 rounded-full">
                                    VIP Partner
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#8892A4] mt-1 font-mono">
                                MT5: <span className="text-white">{node.mt5Login}</span> • Plan: {node.accountType} • Joined: {node.joinDate}
                              </div>
                            </div>
                          </div>

                          {/* Funds, Volume & Commission Badges */}
                          <div className="grid grid-cols-3 sm:flex items-center gap-4 sm:gap-6 text-left sm:text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
                            <div>
                              <div className="text-[10px] uppercase font-bold text-[#8892A4]">Fund Deposited</div>
                              <div className="font-serif text-base sm:text-lg font-black text-[#00E676]">
                                ${node.fundDeposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </div>
                              {hasChildren && (
                                <div className="text-[10px] text-[#8892A4]">
                                  +${childFunds.toLocaleString()} in sub-tree
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-[10px] uppercase font-bold text-[#8892A4]">Volume Traded</div>
                              <div className="font-serif text-base sm:text-lg font-black text-white">
                                {node.lotsTraded} Lots
                              </div>
                            </div>

                            <div>
                              <div className="text-[10px] uppercase font-bold text-[#8892A4]">Rebate for You</div>
                              <div className="font-serif text-base sm:text-lg font-black text-[#F0C040]">
                                +${node.commissionGenerated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Level 2 Sub-Accounts (Nested Tree) */}
                      {hasChildren && !isCollapsed && (
                        <div className="pl-4 sm:pl-8 border-l-2 border-[#00D4FF]/40 space-y-3 ml-4 sm:ml-6">
                          {node.subAccounts!.map((sub) => (
                            <div key={sub.id} className="relative">
                              <div className="absolute -left-4 sm:-left-8 top-5 w-4 sm:w-8 h-0.5 bg-[#00D4FF]/40" />

                              <div className="p-3.5 sm:p-4 rounded-xl bg-[#070A13] border border-white/10 hover:border-[#00D4FF]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 text-[#00E676] flex items-center justify-center font-bold text-xs">
                                    L2
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-white text-xs sm:text-sm">{sub.name}</span>
                                      <span className="text-xs">{sub.country}</span>
                                      <span className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 py-0.5 rounded">
                                        {sub.role} (Level 2 Sub-Client)
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-[#8892A4] font-mono mt-0.5">
                                      MT5: {sub.mt5Login} • Sponsor: {sub.sponsorCode}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-5 text-right font-mono text-xs">
                                  <div>
                                    <span className="text-[10px] text-[#8892A4] block uppercase">Deposit Fund</span>
                                    <span className="font-bold text-[#00E676]">${sub.fundDeposited.toLocaleString()}</span>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-[#8892A4] block uppercase">Volume</span>
                                    <span className="font-bold text-white">{sub.lotsTraded} Lots</span>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-[#8892A4] block uppercase">Commission</span>
                                    <span className="font-bold text-[#F0C040]">+${sub.commissionGenerated}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* View Mode 2: Detailed Searchable Data Table */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-[#8892A4] uppercase border-b border-white/10 pb-3">
                  <th className="py-3 px-3">Partner / Account Name</th>
                  <th className="py-3 px-3">Role & Tier</th>
                  <th className="py-3 px-3">Level</th>
                  <th className="py-3 px-3">Sponsor Code</th>
                  <th className="py-3 px-3 text-right">Fund Deposited ($)</th>
                  <th className="py-3 px-3 text-right">Equity ($)</th>
                  <th className="py-3 px-3 text-right">Lots Traded</th>
                  <th className="py-3 px-3 text-right">Rebate for You ($)</th>
                  <th className="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-[#8892A4]">
                      No accounts matched your search/filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white font-sans">{item.name}</div>
                        <div className="text-[10px] text-[#8892A4]">
                          {item.email} • MT5: {item.mt5Login} {item.country}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-sans">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            item.role === 'Sub-IB Partner'
                              ? 'bg-[#00D4FF]/15 text-[#00D4FF]'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {item.role}
                        </span>
                        <div className="text-[10px] text-[#8892A4] mt-0.5">{item.accountType}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#141A2E] text-[#00D4FF]">
                          Level {item.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[#F0C040]">{item.sponsorCode}</td>
                      <td className="py-3.5 px-3 text-right font-bold text-[#00E676]">
                        ${item.fundDeposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-3 text-right text-white">
                        ${item.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-3 text-right text-[#00D4FF] font-bold">
                        {item.lotsTraded} Lots
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-[#F0C040]">
                        +${item.commissionGenerated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-3 text-center font-sans">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                            item.status === 'VIP'
                              ? 'bg-[#F0C040]/15 text-[#F0C040] border border-[#F0C040]/30'
                              : 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Sub-IB / Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#10162A] border border-[#F0C040]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative my-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#E8A020] flex items-center justify-center text-[#0A0E1A] font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Register Sub-IB / Client Account</h3>
                  <p className="text-xs text-[#8892A4]">Add a new account directly under your IB hierarchy</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#8892A4] hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[#8892A4] font-bold uppercase block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8892A4] font-bold uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={newAccEmail}
                    onChange={(e) => setNewAccEmail(e.target.value)}
                    className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#8892A4] font-bold uppercase block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98112 34567"
                    value={newAccPhone}
                    onChange={(e) => setNewAccPhone(e.target.value)}
                    className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8892A4] font-bold uppercase block mb-1">Role in Network</label>
                  <select
                    value={newAccRole}
                    onChange={(e) => setNewAccRole(e.target.value as any)}
                    className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  >
                    <option value="Sub-IB Partner">Sub-IB Partner (Can have clients)</option>
                    <option value="Direct Trader">Direct Trader (Trades lots)</option>
                    <option value="VIP Client">VIP Client (High Capital)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8892A4] font-bold uppercase block mb-1">Country</label>
                  <select
                    value={newAccCountry}
                    onChange={(e) => setNewAccCountry(e.target.value)}
                    className="w-full bg-[#070A13] border border-white/15 focus:border-[#F0C040] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  >
                    <option value="India 🇮🇳">India 🇮🇳</option>
                    <option value="UAE 🇦🇪">UAE 🇦🇪</option>
                    <option value="UK 🇬🇧">UK 🇬🇧</option>
                    <option value="USA 🇺🇸">USA 🇺🇸</option>
                    <option value="Italy 🇮🇹">Italy 🇮🇹</option>
                    <option value="Singapore 🇸🇬">Singapore 🇸🇬</option>
                  </select>
                </div>
              </div>

              {/* Fund Deposited Input */}
              <div>
                <label className="text-[#00E676] font-bold uppercase block mb-1">
                  Fund Deposited by Account ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00E676] font-bold text-sm">$</span>
                  <input
                    type="number"
                    min="100"
                    step="500"
                    required
                    placeholder="10000"
                    value={newAccFund}
                    onChange={(e) => setNewAccFund(e.target.value)}
                    className="w-full bg-[#070A13] border border-[#00E676]/40 focus:border-[#00E676] rounded-xl pl-8 pr-4 py-3 text-white font-mono text-sm focus:outline-none font-bold"
                  />
                </div>
                <div className="text-[11px] text-[#8892A4] mt-1">
                  This deposited fund will instantly reflect in your total network equity pool.
                </div>
              </div>

              {/* Placement Parent Selection */}
              <div>
                <label className="text-[#8892A4] font-bold uppercase block mb-1">Placement In Hierarchy</label>
                <select
                  value={parentTargetId}
                  onChange={(e) => setParentTargetId(e.target.value)}
                  className="w-full bg-[#070A13] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="">Directly Under YOU ({user.fullName} - Master IB)</option>
                  {ibTree
                    .filter((x) => x.role === 'Sub-IB Partner')
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        Under Sub-IB: {sub.name} (MT5: {sub.mt5Login})
                      </option>
                    ))}
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/3 py-3 rounded-xl border border-white/10 text-[#8892A4] hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] font-extrabold uppercase tracking-wider shadow-lg shadow-[#F0C040]/30 hover:shadow-[#F0C040]/50"
                >
                  Create &amp; Add to Network
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
