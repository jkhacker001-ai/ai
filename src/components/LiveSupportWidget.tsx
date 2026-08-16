import React, { useState } from 'react';
import { MessageSquare, MessageCircle, Send, X, Bot, ShieldCheck, HelpCircle } from 'lucide-react';

export const LiveSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Namaste & Welcome to NexusFX Global Support! How can I assist you with trading accounts, deposits, or the IB Partner Program today?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);

    // Smart bot responses
    setTimeout(() => {
      let botText = "Thank you for reaching out! Our 24/7 desk is reviewing your message. You can also chat directly on WhatsApp at +91 98765 43210 for instant VIP response.";
      const lower = userText.toLowerCase();

      if (lower.includes('deposit') || lower.includes('upi') || lower.includes('money') || lower.includes('fund')) {
        botText = "Instant deposits are available via UPI (GPay, PhonePe, Paytm, BHIM) and USDT TRC-20! Click the 'Deposit' button on the WebTerminal or top navigation bar to get your instant QR Code.";
      } else if (lower.includes('ib') || lower.includes('partner') || lower.includes('rebate') || lower.includes('commission')) {
        botText = "NexusFX IB Partners earn up to $15/lot on Forex and Gold with daily automated cash payouts! Open the IB Partner Portal to generate your referral link and custom social story banners.";
      } else if (lower.includes('withdraw') || lower.includes('payout')) {
        botText = "Withdrawals are processed instantly with 0% fee! Choose UPI, bank wire, or USDT in your wallet panel.";
      } else if (lower.includes('spread') || lower.includes('gold') || lower.includes('xauusd')) {
        botText = "Gold (XAUUSD) spreads start at 0.1 pips with 1:2000 leverage and 0 slippage on our Pro ECN accounts!";
      }

      setChatHistory((prev) => [...prev, { sender: 'bot', text: botText }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F0C040] to-[#E8A020] text-[#0A0E1A] shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative group"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00E676] border-2 border-[#0A0E1A] animate-pulse" />
        </button>
      )}

      {/* Support Dialog */}
      {isOpen && (
        <div className="bg-[#141824] border border-[#F0C040]/30 rounded-2xl w-[340px] sm:w-[380px] h-[480px] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0A0E1A] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0C040] to-[#00D4FF] flex items-center justify-center font-bold text-[#0A0E1A]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">NexusFX Live Desk 24/7</h4>
                <div className="flex items-center gap-1 text-[10px] text-[#00E676]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
                  <span>Online • Instant Response</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#8892A4] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#F0C040] text-[#0A0E1A] font-medium rounded-br-none'
                      : 'bg-[#0A0E1A] text-white border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp / Telegram Links */}
          <div className="px-4 py-2 bg-[#0A0E1A] border-t border-white/10 flex items-center justify-between text-[11px] font-bold">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="text-[#00E676] hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Live</span>
            </a>
            <a
              href="https://t.me/nexusfx_official"
              target="_blank"
              rel="noreferrer"
              className="text-[#00D4FF] hover:underline flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Signals</span>
            </a>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#0A0E1A] border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F0C040]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#F0C040] text-[#0A0E1A] rounded-xl hover:bg-[#FFD700] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
