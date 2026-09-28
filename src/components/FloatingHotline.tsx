import React from 'react';
import { Phone, MessageCircle, Navigation, Zap } from 'lucide-react';
import { VIETTEL_CONTACT } from '../data/packagesData';

interface FloatingHotlineProps {
  onOpenContact: () => void;
  onOpenRegister: () => void;
  onOpenInstall?: () => void;
}

export const FloatingHotline: React.FC<FloatingHotlineProps> = ({
  onOpenContact,
  onOpenRegister,
  onOpenInstall
}) => {
  return (
    <>
      {/* 1. Mobile Fixed High-Converting Bottom Conversion Bar (Screens < 640px) */}
      <nav 
        aria-label="Thanh liên hệ nhanh mobile"
        className="flex sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] items-center justify-between gap-2 safe-area-bottom pointer-events-auto"
      >
        {/* Quick Phone Call */}
        <a
          href={`tel:${VIETTEL_CONTACT.phone}`}
          id="mobile-bottom-call"
          className="flex-1 flex flex-col items-center justify-center py-1 px-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl border border-red-200 active:scale-95 transition-all text-center"
        >
          <div className="relative">
            <Phone className="w-4 h-4 text-red-600 animate-bounce" />
          </div>
          <span className="text-[10px] font-black leading-tight mt-0.5">Gọi Hotline</span>
          <span className="text-[9px] font-mono font-semibold text-slate-500">{VIETTEL_CONTACT.displayPhone}</span>
        </a>

        {/* Quick Zalo Chat */}
        <a
          href={VIETTEL_CONTACT.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bottom-zalo"
          className="flex-1 flex flex-col items-center justify-center py-1 px-1 bg-blue-50 hover:bg-blue-100 text-[#0068FF] rounded-xl border border-blue-200 active:scale-95 transition-all text-center"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-[#0068FF]" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[7px] font-black px-1 rounded-full">24/7</span>
          </div>
          <span className="text-[10px] font-black leading-tight mt-0.5">Nhắn Zalo</span>
          <span className="text-[9px] font-semibold text-slate-500">Tư vấn 24/7</span>
        </a>

        {/* Quick Register Consultation */}
        <button
          onClick={onOpenRegister}
          id="mobile-bottom-register"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl shadow-md shadow-red-600/30 active:scale-95 transition-all text-center cursor-pointer"
        >
          <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
          <div className="text-left">
            <div className="text-[11px] font-black leading-none uppercase tracking-tight">ĐĂNG KÝ NGAY</div>
            <div className="text-[9px] text-yellow-200 font-bold leading-none mt-0.5">Tặng 1T • Modem W6</div>
          </div>
        </button>
      </nav>

      {/* 2. Desktop Floating Widget (Screens >= 640px) */}
      <aside 
        aria-label="Liên hệ nhanh Viettel desktop"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Quick Register GPS Pulse Button */}
        <button
          id="floating-btn-register"
          onClick={onOpenRegister}
          className="flex items-center gap-2 py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl border border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
          <Navigation className="w-3.5 h-3.5 text-yellow-400" />
          <span>Đăng ký khảo sát GPS</span>
        </button>

        {/* Floating Zalo Button */}
        <div className="relative group">
          <button
            id="floating-btn-zalo"
            onClick={onOpenContact}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-white ring-4 ring-blue-400/30"
            aria-label="Chat Zalo Mr. Tuấn"
          >
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white animate-bounce">
              Zalo
            </span>
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Floating Phone Hotline Button */}
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-red-600 rounded-full blur-xs opacity-75 animate-pulse group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <button
            id="floating-btn-phone"
            onClick={onOpenContact}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-white ring-4 ring-red-500/40"
            aria-label="Gọi hotline 0966.110.357"
          >
            <Phone className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
          </button>
        </div>
      </aside>
    </>
  );
};
