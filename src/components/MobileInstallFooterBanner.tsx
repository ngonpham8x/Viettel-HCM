import React from 'react';
import { Download, Sparkles, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

interface MobileInstallFooterBannerProps {
  onOpenInstall: () => void;
}

export const MobileInstallFooterBanner: React.FC<MobileInstallFooterBannerProps> = ({
  onOpenInstall
}) => {
  return (
    <section className="my-8 block lg:hidden">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-800 p-5 sm:p-6 text-white shadow-xl border border-red-500/30">
        {/* Subtle decorative circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* App Icon badge */}
          <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-lg shadow-black/20 flex items-center justify-center shrink-0 ring-4 ring-white/20">
            <img 
              src="/icon-192.png" 
              alt="Logo Viettel Telecom" 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.src = './icon-192.png';
              }}
            />
          </div>

          {/* Text Info */}
          <div className="flex-1 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>Tiện ích di động Viettel</span>
            </div>
            <h3 className="text-lg font-black text-white tracking-tight">
              Cài Đặt Ứng Dụng Ra Màn Hình Điện Thoại
            </h3>
            <p className="text-xs text-red-100 leading-relaxed max-w-md">
              Truy cập 1 chạm không cần gõ lại link web. Dung lượng 0MB, mở nhanh như app native và hỗ trợ 24/7 tức thì!
            </p>

            {/* Quick bullets */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 pt-1 text-[11px] text-white/90">
              <span className="flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3 text-yellow-300 shrink-0" /> Siêu nhẹ 0MB
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3 text-yellow-300 shrink-0" /> Mở tức thì
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3 text-yellow-300 shrink-0" /> Hỗ trợ iPhone & Android
              </span>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <button
              type="button"
              id="btn-install-mobile-footer"
              onClick={onOpenInstall}
              className="w-full sm:w-auto px-5 py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Download className="w-4 h-4 text-slate-950 group-hover:translate-y-0.5 transition-transform" />
              <span>CÀI TỰ ĐỘNG (1 CHẠM)</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
