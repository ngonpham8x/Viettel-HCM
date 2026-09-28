import React from 'react';
import { 
  Zap, 
  Wifi, 
  Gift, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Phone, 
  Sparkles, 
  Tv, 
  Smartphone, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { VIETTEL_CONTACT } from '../data/packagesData';

interface HeroBannerProps {
  onOpenRegister: () => void;
  onOpenContact: () => void;
  onlineCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenRegister,
  onOpenContact,
  onlineCount
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-red-700 via-red-600 to-rose-700 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines, USPs & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Cổng Tiếp Nhận Hồ Sơ Lắp Đặt Viettel Toàn Quốc (24/7)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-tight">
              LẮP MẠNG CÁP QUANG FTTH, SIM 4G/5G & TRUYỀN HÌNH VIETTEL
            </h1>

            {/* Subhead with Value Proposition */}
            <p className="text-base sm:text-lg text-red-100 font-medium max-w-2xl mx-auto lg:mx-0">
              Trang bị 100% <strong className="text-white underline decoration-yellow-400 decoration-2">Modem Wifi 6 & Mesh Phủ Sóng</strong> thế hệ mới. Đóng 12 tháng tặng 1 tháng, hỗ trợ khảo sát vị trí qua GPS và triển khai hoàn tất trong 24 - 48h!
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0 text-xs">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/15">
                <Clock className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="font-semibold text-left">Triển Khai Nhanh 24 - 48H</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/15">
                <Gift className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="font-semibold text-left">Đóng 12 Tháng Tặng 1T</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/15 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="font-semibold text-left">Trang Bị Modem Wifi 6</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                id="btn-hero-register"
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Zap className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
                <span>ĐĂNG KÝ LẮP ĐẶT NGAY (TẶNG CƯỚC)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-contact"
                onClick={onOpenContact}
                className="w-full sm:w-auto px-6 py-4 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/30 text-white font-bold text-sm sm:text-base rounded-2xl backdrop-blur-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>Hotline / Zalo: {VIETTEL_CONTACT.displayPhone}</span>
              </button>
            </div>

            {/* Micro Trust Note */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] text-red-200 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Không phát sinh chi phí
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hỗ trợ 63 tỉnh thành
              </span>
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-yellow-300" /> Định vị GPS tức thì
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Deal Highlights Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 relative">
              <div className="absolute -top-3 right-6 bg-red-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                BẢNG GIÁ ƯU ĐÃI THÁNG NÀY
              </div>

              <div className="space-y-3.5">
                {/* Item 1: FTTH NetVT */}
                <div 
                  onClick={onOpenRegister}
                  className="p-3.5 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                          Cáp Quang NetVT1
                          <span className="text-[10px] px-1.5 py-0.5 bg-red-600 text-white rounded-md font-bold">300 Mbps</span>
                        </div>
                        <div className="text-xs text-slate-500">Modem WiFi 6 • Đóng 12T tặng 1T</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-red-600 font-mono">195.000đ</div>
                      <div className="text-[10px] text-slate-400 line-through">240.000đ</div>
                    </div>
                  </div>
                </div>

                {/* Item 2: Combo TV360 */}
                <div 
                  onClick={onOpenRegister}
                  className="p-3.5 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Tv className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                          Combo NetVT1 + Box 4K
                          <span className="text-[10px] px-1.5 py-0.5 bg-purple-600 text-white rounded-md font-bold">140+ Kênh</span>
                        </div>
                        <div className="text-xs text-slate-500">Đầu thu 4K có điều khiển giọng nói</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-red-600 font-mono">235.000đ</div>
                      <div className="text-[10px] text-slate-400 line-through">300.000đ</div>
                    </div>
                  </div>
                </div>

                {/* Item 3: Sim 5G Data Khủng */}
                <div 
                  onClick={onOpenRegister}
                  className="p-3.5 bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                          Gói Sim 5G135 (4GB/Ngày)
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-600 text-white rounded-md font-bold">120GB/th</span>
                        </div>
                        <div className="text-xs text-slate-500">Miễn phí xem TV360, chọn sim số đẹp</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-red-600 font-mono">135.000đ</div>
                      <div className="text-[10px] text-slate-400 line-through">160.000đ</div>
                    </div>
                  </div>
                </div>

                {/* Direct Consultant Contact Callout */}
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-red-900 block">Tư Vấn Viên Trực Tuyến:</span>
                    <span className="text-red-700 font-semibold">{VIETTEL_CONTACT.consultantName}</span>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Gọi / Zalo Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
