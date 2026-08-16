import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LogOut,
  TrendingUp,
  DollarSign,
  ChevronRight,
  ChevronDown,
  BarChart2,
  Wallet,
  ShieldCheck,
  Sparkles,
  Key
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAccount?: () => void;
  onOpenIBDashboard: () => void;
  onOpenTerminal: () => void;
  onOpenDeposit?: () => void;
  onOpenCopyTrading?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenRegister,
  onOpenAccount,
  onOpenIBDashboard,
  onOpenTerminal,
  onOpenDeposit,
  onOpenCopyTrading
}) => {
  const { user, isLoggedIn, logout } = useTrading();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    if (onOpenRegister) onOpenRegister();
    else if (onOpenAccount) onOpenAccount();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[#F0C040]/20 shadow-2xl shadow-black/50'
          : 'py-4 bg-[#0A0E1A]/80 backdrop-blur-md border-b border-[#F0C040]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0C040] via-[#E8A020] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A] text-xl shadow-lg shadow-[#F0C040]/20 group-hover:scale-105 transition-transform">
            N
          </div>
          <div>
            <span className="font-serif text-2xl font-black bg-gradient-to-r from-[#F0C040] via-[#FFF] to-[#00D4FF] bg-clip-text text-transparent tracking-tight">
              NexusFX
            </span>
            <span className="hidden sm:block text-[10px] text-[#8892A4] font-semibold tracking-widest uppercase -mt-1">
              Global Markets
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <a
            href="#features"
            className="text-xs font-semibold text-[#8892A4] hover:text-[#F0C040] uppercase tracking-wider transition-colors"
          >
            Platform
          </a>
          <a
            href="#bot-trading"
            className="text-xs font-semibold text-[#00D4FF] hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <span>Robot Trading</span>
            <span className="px-1.5 py-0.5 text-[9px] bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 rounded font-bold">
              AI EAs
            </span>
          </a>
          <a
            href="#ib"
            className="text-xs font-semibold text-[#8892A4] hover:text-[#F0C040] uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <span>IB Program</span>
            <span className="px-1.5 py-0.5 text-[9px] bg-[#F0C040]/10 text-[#F0C040] border border-[#F0C040]/30 rounded font-bold">
              $15/LOT
            </span>
          </a>
          <a
            href="#copy"
            className="text-xs font-semibold text-[#8892A4] hover:text-[#F0C040] uppercase tracking-wider transition-colors"
          >
            CopyTrading
          </a>
          <a
            href="#calendar"
            className="text-xs font-semibold text-[#8892A4] hover:text-[#F0C040] uppercase tracking-wider transition-colors"
          >
            Calendar
          </a>
          <a
            href="#terminal"
            onClick={(e) => {
              e.preventDefault();
              onOpenTerminal();
            }}
            className="text-xs font-semibold text-[#00D4FF] hover:text-[#FFF] uppercase tracking-wider transition-colors flex items-center gap-1.5 bg-[#00D4FF]/10 px-3 py-1.5 rounded-lg border border-[#00D4FF]/20"
          >
            <BarChart2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Web Terminal</span>
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Quick IB Portal Link */}
          <button
            onClick={onOpenIBDashboard}
            className="px-3 py-2 text-xs font-bold text-[#F0C040] border border-[#F0C040]/30 hover:bg-[#F0C040]/10 rounded-lg transition-all flex items-center gap-1.5"
            title="Introducing Broker Dashboard"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>IB Portal</span>
          </button>

          {/* Quick Deposit Link */}
          {onOpenDeposit && (
            <button
              onClick={onOpenDeposit}
              className="px-3 py-2 text-xs font-bold text-[#00E676] border border-[#00E676]/35 hover:bg-[#00E676]/10 rounded-lg transition-all flex items-center gap-1.5"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>
          )}

          {/* AUTHENTICATED USER DROPDOWN OR LOGIN & REGISTER BUTTONS */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-[#141824] border border-[#00D4FF]/30 hover:border-[#00D4FF] rounded-xl transition-all shadow-md group"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#00A3FF] flex items-center justify-center text-[#0A0E1A] font-extrabold text-xs">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-[#00D4FF] transition-colors line-clamp-1 max-w-[90px]">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-extrabold bg-[#00E676]/10 text-[#00E676] px-1.5 py-0.2 rounded border border-[#00E676]/30 uppercase">
                      {user.accountMode}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#F0C040]">
                    ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8892A4] group-hover:text-white transition-transform ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#141824] border border-[#00D4FF]/30 rounded-2xl p-2.5 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="p-2.5 bg-[#0A0E1A] rounded-xl border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{user.fullName}</span>
                      <span className="text-[10px] font-mono text-[#00D4FF]">MT5 #{user.mt5Login}</span>
                    </div>
                    <div className="text-[11px] text-[#8892A4] truncate">{user.email}</div>
                    <div className="flex justify-between items-center pt-1.5 text-[11px] border-t border-white/5">
                      <span className="text-[#8892A4]">Server:</span>
                      <span className="text-white font-mono">{user.mt5Server}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenTerminal();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <BarChart2 className="w-4 h-4 text-[#00D4FF]" />
                    <span>Open Web Terminal</span>
                  </button>

                  {onOpenDeposit && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDeposit();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Wallet className="w-4 h-4 text-[#00E676]" />
                      <span>Deposit / Withdraw</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenIBDashboard();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <DollarSign className="w-4 h-4 text-[#F0C040]" />
                    <span>IB Partner Commission</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleRegisterClick();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-[#00D4FF]" />
                    <span>Open Another Account</span>
                  </button>

                  <div className="pt-1 border-t border-white/5">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out / Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login / Sign In Button */}
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#00D4FF]/40 rounded-lg transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Login</span>
              </button>

              {/* Register / Open Account Button */}
              <button
                onClick={handleRegisterClick}
                className="px-4 py-2 text-xs font-extrabold text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] via-[#FFD700] to-[#E8A020] hover:from-[#FFD700] hover:to-[#F0C040] rounded-lg shadow-lg shadow-[#F0C040]/25 hover:shadow-[#F0C040]/40 hover:-translate-y-0.5 transition-all uppercase tracking-wider flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#0A0E1A]" />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#8892A4] hover:text-[#F0C040] rounded-lg border border-white/10"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E1A]/98 border-b border-[#F0C040]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile User Status Banner */}
          {isLoggedIn ? (
            <div className="p-3 bg-[#141824] border border-[#00D4FF]/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#00A3FF] flex items-center justify-center text-[#0A0E1A] font-bold text-xs">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.fullName}</span>
                    <span className="text-[9px] font-bold text-[#00E676] bg-[#00E676]/10 px-1.5 py-0.2 rounded border border-[#00E676]/30">
                      {user.accountMode.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#F0C040]">
                    Balance: ${user.balance.toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-xs flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="py-2.5 text-xs font-bold text-white bg-white/5 border border-white/15 rounded-lg flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Login</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRegisterClick();
                }}
                className="py-2.5 text-xs font-extrabold text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] rounded-lg flex items-center justify-center gap-1.5 uppercase"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#0A0E1A]" />
                <span>Register</span>
              </button>
            </div>
          )}

          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#8892A4] hover:text-[#F0C040] py-2"
          >
            Platform & Features
          </a>
          <a
            href="#bot-trading"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#00D4FF] hover:text-white py-2"
          >
            Robot & EA Trading Studio
          </a>
          <a
            href="#ib"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#8892A4] hover:text-[#F0C040] py-2"
          >
            IB Partner Program
          </a>
          <a
            href="#copy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#8892A4] hover:text-[#F0C040] py-2"
          >
            Automated CopyTrading
          </a>
          <a
            href="#calendar"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#8892A4] hover:text-[#F0C040] py-2"
          >
            Economic Calendar
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="w-full text-left text-sm font-bold text-[#00D4FF] py-2 flex items-center justify-between"
          >
            <span>Live Web Terminal</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            {onOpenDeposit && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeposit();
                }}
                className="w-full py-2.5 text-xs font-bold text-[#00E676] border border-[#00E676]/40 rounded-lg text-center"
              >
                Deposit / Fund Account
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIBDashboard();
              }}
              className="w-full py-2.5 text-xs font-bold text-[#F0C040] border border-[#F0C040]/30 rounded-lg text-center"
            >
              IB Partner Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleRegisterClick();
              }}
              className="w-full py-3 text-xs font-bold text-[#0A0E1A] bg-gradient-to-r from-[#F0C040] to-[#E8A020] rounded-lg text-center uppercase tracking-wider"
            >
              Open Trading Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
