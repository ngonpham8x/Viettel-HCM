import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { getCustomerLeads } from '../utils/storage';

interface PromoTickerProps {
  onSelectPackage?: (pkgName: string) => void;
}

export const PromoTicker: React.FC<PromoTickerProps> = ({ onSelectPackage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const realLeads = getCustomerLeads();

  useEffect(() => {
    // Only schedule toast if there are actual customer registrations
    if (realLeads.length === 0) return;

    const initialTimer = setTimeout(() => {
      showToast();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [realLeads.length]);

  const showToast = () => {
    if (realLeads.length === 0) return;
    setVisible(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % realLeads.length);
        showToast();
      }, 70000);
    }, 6000);
  };

  const handleDismiss = () => {
    setVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  if (!visible || realLeads.length === 0) return null;

  const current = realLeads[currentIndex % realLeads.length];
  if (!current) return null;

  // Mask phone for customer privacy
  const maskedPhone = current.phoneNumber.length >= 7 
    ? `${current.phoneNumber.slice(0, 4)}***${current.phoneNumber.slice(-3)}`
    : current.phoneNumber;

  return (
    <aside 
      aria-label="Thông báo đăng ký gần đây"
      className="fixed bottom-20 sm:bottom-6 left-3 sm:left-4 z-20 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-3 animate-slideInLeft transition-all pointer-events-auto"
    >
      <button
        onClick={handleDismiss}
        className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer bg-slate-100/80 hover:bg-slate-200"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div 
        className="flex items-start gap-2.5 cursor-pointer"
        onClick={() => {
          if (onSelectPackage) onSelectPackage(current.serviceName);
        }}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="pr-3 text-left">
          <div className="text-xs font-bold text-slate-900 leading-tight">
            {current.fullName} ({maskedPhone}) {current.province ? `- ${current.province}` : ''}
          </div>
          <div className="text-[11px] text-slate-600 font-medium mt-0.5">
            Vừa đăng ký: <strong className="text-red-600">{current.serviceName}</strong>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Đang được xử lý lắp đặt
          </div>
        </div>
      </div>
    </aside>
  );
};
