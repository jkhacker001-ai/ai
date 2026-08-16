import React, { useState } from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { Features } from './components/Features';
import { IBProgram } from './components/IBProgram';
import { IBCalculator } from './components/IBCalculator';
import { AccountPlans } from './components/AccountPlans';
import { TradingTerminal } from './components/TradingTerminal';
import { CopyTrading } from './components/CopyTrading';
import { BotTrading } from './components/BotTrading';
import { EconomicCalendar } from './components/EconomicCalendar';
import { IBDashboardSimulator } from './components/IBDashboardSimulator';
import { IBStructureDashboard } from './components/IBStructureDashboard';
import { AfterLoginDashboard } from './components/AfterLoginDashboard';
import { AuthPortal } from './components/AuthPortal';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { AuthModal, AuthMode } from './components/AuthModal';
import { DepositWithdrawModal } from './components/DepositWithdrawModal';
import { LiveSupportWidget } from './components/LiveSupportWidget';
import { Footer } from './components/Footer';
import { AccountTier } from './types';
import { Layers, LineChart, Bot, Users, Globe } from 'lucide-react';

function MainAppContent() {
  const { isLoggedIn, user } = useTrading();
  const [showPublicSite, setShowPublicSite] = useState(false);
  const [activePortalTab, setActivePortalTab] = useState<'ib_structure' | 'terminal' | 'bots' | 'copy' | 'public'>('ib_structure');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedPlan, setSelectedPlan] = useState<AccountTier>('pro');
  const [isIBModalOpen, setIsIBModalOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode('register');
    setSelectedPlan('pro');
    setIsAuthModalOpen(true);
  };

  const handleOpenAccountWithPlan = (tier: AccountTier) => {
    setSelectedPlan(tier);
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  // If user is not logged in and not explicitly exploring public site, show the Login/Register Authentication Portal
  if (!isLoggedIn && !showPublicSite) {
    return <AuthPortal onViewPublicSite={() => setShowPublicSite(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFF] font-sans antialiased selection:bg-[#F0C040] selection:text-[#0A0E1A] relative overflow-hidden flex flex-col">
      {/* Dynamic Scroll-driven Animated Background */}
      <AnimatedBackground />

      {/* Top Banner Navigation Bar for Logged-In User */}
      {isLoggedIn ? (
        <header className="sticky top-0 z-40 bg-[#0E1322]/95 backdrop-blur-md border-b border-[#F0C040]/30 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0C040] via-[#E8A020] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] text-lg shadow-md shadow-[#F0C040]/25">
                N
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-white text-base">NexusFX Portal</span>
                  <span className="text-[10px] font-bold uppercase bg-[#F0C040]/15 text-[#F0C040] border border-[#F0C040]/30 px-2 py-0.5 rounded-full">
                    Partner Center
                  </span>
                </div>
                <div className="text-[11px] text-[#8892A4]">
                  {user.fullName} • MT5: <span className="text-white font-mono">{user.mt5Login}</span> • IB Code: <span className="text-[#F0C040] font-mono font-bold">{user.referralCode}</span>
                </div>
              </div>
            </div>

            {/* Portal Tab Switcher */}
            <div className="flex items-center gap-1.5 bg-[#070A13] p-1 rounded-xl border border-white/10 text-xs font-bold overflow-x-auto max-w-full">
              <button
                onClick={() => setActivePortalTab('ib_structure')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activePortalTab === 'ib_structure'
                    ? 'bg-[#F0C040] text-[#0A0E1A] shadow-md shadow-[#F0C040]/20'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>🌳 IB Structure &amp; Funds</span>
              </button>

              <button
                onClick={() => setActivePortalTab('terminal')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activePortalTab === 'terminal'
                    ? 'bg-[#00D4FF] text-[#0A0E1A] shadow-md shadow-[#00D4FF]/20'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>📈 Web Terminal</span>
              </button>

              <button
                onClick={() => setActivePortalTab('bots')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activePortalTab === 'bots'
                    ? 'bg-[#00E676] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>🤖 AI Robot Bots</span>
              </button>

              <button
                onClick={() => setActivePortalTab('copy')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activePortalTab === 'copy'
                    ? 'bg-[#E8A020] text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>👥 CopyTrading</span>
              </button>

              <button
                onClick={() => setActivePortalTab('public')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activePortalTab === 'public'
                    ? 'bg-white text-[#0A0E1A] shadow-md'
                    : 'text-[#8892A4] hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🌐 Public Site</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* Public Navbar if user is browsing public site without logging in */
        <Navbar
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
          onOpenAccount={handleOpenRegister}
          onOpenIBDashboard={() => setIsIBModalOpen(true)}
          onOpenTerminal={() => setIsTerminalModalOpen(true)}
          onOpenDeposit={() => setIsDepositModalOpen(true)}
        />
      )}

      {/* Main View Switcher */}
      <main className="flex-1">
        {isLoggedIn && activePortalTab === 'ib_structure' ? (
          <AfterLoginDashboard
            onOpenTerminal={() => setActivePortalTab('terminal')}
            onOpenDeposit={() => setIsDepositModalOpen(true)}
            onOpenBots={() => setActivePortalTab('bots')}
            onOpenCopyTrading={() => setActivePortalTab('copy')}
            onViewPublicSite={() => setActivePortalTab('public')}
          />
        ) : isLoggedIn && activePortalTab === 'terminal' ? (
          <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActivePortalTab('ib_structure')}
                className="text-xs font-bold text-[#0EA5E9] hover:underline flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
            </div>
            <TradingTerminal />
          </div>
        ) : isLoggedIn && activePortalTab === 'bots' ? (
          <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActivePortalTab('ib_structure')}
                className="text-xs font-bold text-[#0EA5E9] hover:underline flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
            </div>
            <BotTrading onOpenTerminal={() => setActivePortalTab('terminal')} />
          </div>
        ) : isLoggedIn && activePortalTab === 'copy' ? (
          <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActivePortalTab('ib_structure')}
                className="text-xs font-bold text-[#0EA5E9] hover:underline flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
            </div>
            <CopyTrading />
          </div>
        ) : (
          /* Public Brokerage View */
          <>
            <Hero
              onOpenAccount={handleOpenRegister}
              onOpenRegister={handleOpenRegister}
              onOpenLogin={handleOpenLogin}
              onOpenIBDashboard={() => setIsIBModalOpen(true)}
              onOpenTerminal={() => setIsTerminalModalOpen(true)}
            />
            <StatsBar />
            <Features onOpenTerminal={() => setIsTerminalModalOpen(true)} />
            <IBProgram onOpenIBDashboard={() => setIsIBModalOpen(true)} />
            <IBCalculator onOpenIBDashboard={() => setIsIBModalOpen(true)} />
            <AccountPlans onSelectPlan={handleOpenAccountWithPlan} />
            <TradingTerminal />
            <BotTrading onOpenTerminal={() => setIsTerminalModalOpen(true)} />
            <div id="copy">
              <CopyTrading />
            </div>
            <div id="calendar">
              <EconomicCalendar />
            </div>
            <Testimonials />
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authMode}
          initialTier={selectedPlan}
          onClose={() => setIsAuthModalOpen(false)}
          onOpenTerminal={() => {
            setIsAuthModalOpen(false);
            setActivePortalTab('terminal');
          }}
        />
      )}

      {isIBModalOpen && (
        <IBDashboardSimulator
          isModal={true}
          onClose={() => setIsIBModalOpen(false)}
        />
      )}

      {isTerminalModalOpen && (
        <TradingTerminal
          isModal={true}
          onClose={() => setIsTerminalModalOpen(false)}
        />
      )}

      {isDepositModalOpen && (
        <DepositWithdrawModal
          onClose={() => setIsDepositModalOpen(false)}
        />
      )}

      <LiveSupportWidget />
    </div>
  );
}

export default function App() {
  return (
    <TradingProvider>
      <MainAppContent />
    </TradingProvider>
  );
}
