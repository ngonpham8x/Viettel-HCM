import React from 'react';
import { Car, ShieldCheck, Zap, CheckCircle2, Phone, Sparkles, ArrowRight, Camera, Eye, Lock, HardDrive } from 'lucide-react';
import { PACKAGES_DATA, VIETTEL_CONTACT } from '../data/packagesData';
import { TelecomPackage } from '../types';

interface SectionProps {
  onRegister: (pkg: TelecomPackage) => void;
  onConsult: (pkg: TelecomPackage) => void;
}

export const EPassSection: React.FC<SectionProps> = ({ onRegister, onConsult }) => {
  const epassPkg = PACKAGES_DATA.find(p => p.id === 'epass_service') || PACKAGES_DATA[0];

  return (
    <section id="epass-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-bold text-blue-300">
              <Car className="w-4 h-4 text-yellow-400" />
              DỊCH VỤ THU PHÍ TỰ ĐỘNG KHÔNG DỪNG (ETC) VIETTEL
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Dán Thẻ ePass Viettel Tận Nơi - Miễn Phí Mở Tài Khoản
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Lưu thông qua 100% trạm thu phí BOT trên toàn quốc không cần dừng xe, không lo tắc đường hay chờ đợi lấy tiền thối. Đội ngũ nhân viên Viettel hỗ trợ dán thẻ tận nhà, cơ quan hoặc điểm hẹn theo yêu cầu của Quý khách.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Nạp tiền đa dạng qua Viettel Money, 40+ Ngân hàng, Thẻ tín dụng</span>
              </div>
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tra cứu hành trình & xuất hóa đơn VAT điện tử chuẩn xác</span>
              </div>
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Thẻ chip RFID công nghệ cao chịu nhiệt, bám dính chắc chắn</span>
              </div>
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hỗ trợ cả xe cá nhân, xe hợp đồng, xe tải và doanh nghiệp</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={() => onRegister(epassPkg)}
                className="w-full sm:w-auto px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>ĐĂNG KÝ DÁN THẺ EPASS NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onConsult(epassPkg)}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>Tư Vấn Mr. Tuấn ({VIETTEL_CONTACT.displayPhone})</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur-md text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-600/40 rounded-2xl flex items-center justify-center text-yellow-400 border border-white/20 shadow-inner">
              <Car className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-black text-yellow-400 font-mono">100% BOT TOÀN QUỐC</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">
                Không dừng - Không chờ - Thanh toán tự động an toàn
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-left space-y-1.5 text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Hồ sơ dán thẻ cần chuẩn bị:
              </div>
              <p>• Bản chụp Đăng ký xe (Cà vẹt)</p>
              <p>• Bản chụp Đăng kiểm xe còn hạn</p>
              <p>• Căn cước công dân của chủ xe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
