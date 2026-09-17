import React, { useState } from 'react';
import { TradingProvider } from './context/TradingContext';
import { TraderDaddyDashboard } from './components/TraderDaddyDashboard';
import { TraderDaddyLandingPage } from './components/TraderDaddyLandingPage';
import { LiveSupportWidget } from './components/LiveSupportWidget';

function MainAppContent() {
  // Primary view switcher between the Dashboard requested by the user and the World-Class Landing Page
  const [viewMode, setViewMode] = useState<'dashboard' | 'landing'>('dashboard');

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0F172A] font-sans antialiased relative">
      
      {/* Universal Floating Switcher for Instant Previewing */}
      <div className="fixed bottom-4 right-4 z-[999] flex items-center gap-1.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 p-1.5 rounded-2xl shadow-2xl shadow-slate-900/10">
        <button
          onClick={() => setViewMode('dashboard')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
            viewMode === 'dashboard'
              ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30 scale-105'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span>📊 Dashboard</span>
        </button>

        <button
          onClick={() => setViewMode('landing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
            viewMode === 'landing'
              ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-[#4F46E5]/30 scale-105'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span>🌐 Landing Page</span>
        </button>
      </div>

      {/* Main View Router */}
      {viewMode === 'dashboard' ? (
        <TraderDaddyDashboard 
          onViewLandingPage={() => setViewMode('landing')} 
        />
      ) : (
        <TraderDaddyLandingPage 
          onLaunchDashboard={() => setViewMode('dashboard')}
        />
      )}

      {/* Live Support Widget */}
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
