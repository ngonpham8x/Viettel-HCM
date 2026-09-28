import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, Check, X, ShieldCheck, Clock, UserCheck, ArrowRight } from 'lucide-react';
import { VIETTEL_CONTACT } from '../data/packagesData';

interface ContactActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCallback?: () => void;
  selectedPackageName?: string;
}

export const ContactActionModal: React.FC<ContactActionModalProps> = ({
  isOpen,
  onClose,
  onRequestCallback,
  selectedPackageName
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(VIETTEL_CONTACT.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCall = () => {
    window.location.href = `tel:${VIETTEL_CONTACT.phone}`;
  };

  const handleZalo = () => {
    window.open(VIETTEL_CONTACT.zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="contact-action-modal-overlay" 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div 
        id="contact-action-modal-container" 
        className="relative w-full max-w-[340px] sm:max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Viettel Red Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 py-3.5 text-white relative">
          <button
            id="btn-close-contact-modal"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/20 hover:bg-black/35 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Phone className="w-5 h-5 animate-bounce" />
            </div>
            <div className="text-left pr-4">
              <h3 className="text-sm font-black leading-tight">Liên Hệ Tư Vấn Viettel</h3>
              <div className="text-[11px] text-red-100 font-medium mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span>{VIETTEL_CONTACT.consultantName} • Online 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content Body */}
        <div className="p-3.5 space-y-2.5">
          {selectedPackageName && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-2.5 py-1.5 text-[11px] text-amber-900 flex items-center justify-between">
              <span className="font-semibold text-slate-700">Gói quan tâm:</span>
              <span className="font-black text-red-600 truncate max-w-[190px]">{selectedPackageName}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-0.5">
            {/* 1. Gọi điện thoại trực tiếp */}
            <button
              id="btn-modal-call-direct"
              onClick={handleCall}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.98] text-white rounded-xl font-bold shadow-md shadow-red-500/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black leading-tight">Gọi Điện Thoại Ngay</div>
                  <div className="text-[10px] text-yellow-200 font-mono font-bold leading-tight mt-0.5">
                    {VIETTEL_CONTACT.displayPhone} (Miễn phí cước)
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* 2. Mở Zalo chat */}
            <button
              id="btn-modal-open-zalo"
              onClick={handleZalo}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#0068FF] hover:bg-[#0055d4] active:scale-[0.98] text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black leading-tight">Chat Nhắn Zalo (Mr. Tuấn)</div>
                  <div className="text-[10px] text-blue-100 font-mono leading-tight mt-0.5">
                    Zalo: {VIETTEL_CONTACT.displayPhone}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* 3. Sao chép số điện thoại */}
            <button
              id="btn-modal-copy-phone"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 font-bold">Đã sao chép: {VIETTEL_CONTACT.displayPhone}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Sao chép: <strong className="text-slate-900 font-mono">{VIETTEL_CONTACT.displayPhone}</strong></span>
                </>
              )}
            </button>
          </div>

          {/* Form Callback trigger */}
          {onRequestCallback && (
            <div className="pt-1.5 text-center border-t border-slate-100">
              <button
                id="btn-modal-request-callback"
                onClick={() => {
                  onClose();
                  onRequestCallback();
                }}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <UserCheck className="w-3 h-3 shrink-0" />
                <span>Hoặc đăng ký khảo sát GPS & gọi lại sau 5 phút</span>
              </button>
            </div>
          )}

          {/* Micro Trust Guarantees */}
          <div className="flex items-center justify-around pt-1 text-[10px] text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" /> Viettel chính hãng
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-600 shrink-0" /> Lắp nhanh 24 - 48h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

