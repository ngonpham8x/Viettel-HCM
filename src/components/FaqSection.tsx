import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle,
  Smartphone,
  Download
} from 'lucide-react';
import { FAQS_DATA, VIETTEL_CONTACT } from '../data/packagesData';

export const FaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> GIẢI ĐÁP THẮC MẮC THƯỜNG GẶP
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Câu Hỏi Thường Gặp Khi Lắp Đặt Viettel
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tổng hợp thông tin chính thống về thủ tục, khuyến mãi, thiết bị Modem và quy trình hỗ trợ.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC<{
  onOpenContact: () => void;
  onOpenRegister: () => void;
  onOpenAdmin?: () => void;
  onOpenInstall?: () => void;
}> = ({
  onOpenContact,
  onOpenRegister,
  onOpenAdmin,
  onOpenInstall
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-28 sm:pb-16 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Hotlines Banner: Tổng Đài Kỹ Thuật & Chăm Sóc Khách Hàng Viettel */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 rounded-2xl border border-red-900/40 p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-xs font-black uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" /> DANH BẠ TỔNG ĐÀI VIETTEL TOÀN QUỐC
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Tổng Đài Kỹ Thuật & Chăm Sóc Khách Hàng Viettel
              </h3>
              <p className="text-xs text-slate-400">
                Hệ thống tiếp nhận thông tin và hỗ trợ xử lý sự cố 24/7 trên toàn bộ 63 Tỉnh/Thành phố.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Hotline 1: Tech support */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">Báo Hỏng Cáp Quang & Kỹ Thuật</div>
                <a href={`tel:${VIETTEL_CONTACT.techSupportHotline.replace(/\s+/g, '')}`} className="text-base sm:text-lg font-black text-yellow-400 hover:underline block mt-0.5 font-mono">
                  {VIETTEL_CONTACT.techSupportHotline}
                </a>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Miễn phí 24/7 (Nhánh 2)
                </div>
              </div>

              {/* Hotline 2: Customer care */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">CSKH & Dịch Vụ Di Động</div>
                <a href={`tel:${VIETTEL_CONTACT.customerCareHotline.replace(/\s+/g, '')}`} className="text-base sm:text-lg font-black text-emerald-400 hover:underline block mt-0.5 font-mono">
                  {VIETTEL_CONTACT.customerCareHotline}
                </a>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Miễn phí 24/7
                </div>
              </div>

              {/* Hotline 3: ePass BOT */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">Tổng Đài ePass Thu Phí BOT</div>
                <a href={`tel:${VIETTEL_CONTACT.epassHotline.replace(/\s+/g, '')}`} className="text-base sm:text-lg font-black text-sky-400 hover:underline block mt-0.5 font-mono">
                  {VIETTEL_CONTACT.epassHotline}
                </a>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5">
                  1.000đ/phút (Hỗ trợ thẻ xe)
                </div>
              </div>

              {/* Hotline 4: Enterprise */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">Doanh Nghiệp & Dự Án</div>
                <a href={`tel:${VIETTEL_CONTACT.enterpriseHotline.replace(/\s+/g, '')}`} className="text-base sm:text-lg font-black text-purple-400 hover:underline block mt-0.5 font-mono">
                  {VIETTEL_CONTACT.enterpriseHotline}
                </a>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Miễn phí (Nhánh 1)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg">
                VT
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                VIETTEL <span className="text-red-500">TELECOM</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tập đoàn Công nghiệp - Viễn thông Quân đội Viettel. Nhà cung cấp dịch vụ Internet cáp quang FTTH, Sim 4G/5G, Truyền hình TV360, Camera AI và Thẻ ePass số 1 Việt Nam.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div className="text-white font-bold">Chuyên viên tư vấn lắp đặt:</div>
              <div className="text-red-400 font-extrabold text-sm">{VIETTEL_CONTACT.consultantName}</div>
              <a 
                href={`tel:${VIETTEL_CONTACT.phone}`}
                className="text-yellow-400 font-mono font-bold hover:underline cursor-pointer flex items-center gap-1 mt-1"
              >
                <Phone className="w-3.5 h-3.5" /> {VIETTEL_CONTACT.displayPhone} (Gọi / Zalo 24/7)
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Dịch Vụ Cung Cấp
            </h3>
            <ul className="space-y-2">
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Internet Cáp Quang FTTH Gia Đình</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Gói Home Wifi Mesh Phủ Rộng Xuyên Tầng</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Combo Internet + Truyền Hình TV360 Box 4K</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Gói Cước Sim 5G / 4G Data Khủng (5G135, 5G150...)</a></li>
              <li><a href="#epass-section" className="hover:text-red-400 transition-colors">Dán Thẻ Thu Phí Tự Động Không Dừng ePass</a></li>
              <li><a href="#camera-section" className="hover:text-red-400 transition-colors">Camera An Ninh AI Thông Minh Viettel Cloud</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Chữ Ký Số Viettel-CA & SmartCA Ký Từ Xa</a></li>
              <li><a href="#catalog-section" className="hover:text-red-400 transition-colors">Hóa Đơn Điện Tử Viettel S-Invoice Chuẩn TT78</a></li>
            </ul>
          </div>

          {/* Col 3: Commitments */}
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Cam Kết Dịch Vụ
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Triển khai dịch vụ nhanh từ 24 - 48 giờ</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Trang bị 100% Modem Wifi 6 + Mesh mới</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hỗ trợ kỹ thuật 24/7 trọn đời ({VIETTEL_CONTACT.techSupportHotline})</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bảo mật dữ liệu khách hàng tuyệt đối</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action */}
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Hỗ Trợ Nhanh
            </h3>
            <p className="text-slate-400">
              Đội ngũ kỹ thuật viên Viettel có mặt tại 63 Tỉnh/Thành phố sẵn sàng khảo sát hạ tầng tận nơi.
            </p>
            <button
              onClick={onOpenRegister}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/20"
            >
              ĐĂNG KÝ KHẢO SÁT GPS TẬN NƠI
            </button>
            <button
              onClick={onOpenContact}
              className="w-full py-2.5 bg-[#0068FF] hover:bg-[#0055d4] text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Zalo: {VIETTEL_CONTACT.displayPhone}
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar with Secure Admin Portal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-0.5">
            <p>© {new Date().getFullYear()} Viettel Telecom. Hotline đăng ký trực tuyến: {VIETTEL_CONTACT.displayPhone} (Mr. Tuấn).</p>
            <p className="text-[11px] text-slate-400">
              Trang web được thiết kế bởi <strong className="text-slate-300 font-bold">TAILOC DIGITAL</strong>{' '}
              <a href="tel:0822899357" className="text-yellow-400 hover:text-yellow-300 font-mono font-bold hover:underline">
                0822.899.357
              </a>
            </p>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            {onOpenInstall && (
              <button
                type="button"
                id="btn-footer-install-app"
                onClick={onOpenInstall}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98"
                title="Cài đặt ứng dụng Viettel ra màn hình chính điện thoại"
              >
                <Download className="w-4 h-4 text-yellow-300" />
                <span>Cài Đặt App Ra Màn Hình</span>
              </button>
            )}

            <button
              type="button"
              id="btn-admin-portal-footer"
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 hover:border-red-500 transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98 group"
              title="Mở bảng điều khiển quản trị viên Viettel"
            >
              <ShieldCheck className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" />
              <span>Quản Trị Hệ Thống & Tra Cứu Đơn</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
