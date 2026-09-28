import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Phone, 
  User, 
  Gift, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  AlertCircle,
  MessageCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { TelecomPackage, CustomerLead } from '../types';
import { PACKAGES_DATA, VIETTEL_CONTACT } from '../data/packagesData';
import { VIETNAM_PROVINCES } from '../data/provincesData';
import { saveCustomerLead } from '../utils/storage';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: TelecomPackage | null;
  onSuccessRegistered?: (newLead: CustomerLead) => void;
  packages?: TelecomPackage[];
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  onSuccessRegistered,
  packages = PACKAGES_DATA
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | '6months' | '12months'>('6months');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('TP. Hồ Chí Minh');
  const [note, setNote] = useState('');

  // GPS Geolocation States
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
    addressText?: string;
  } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<CustomerLead | null>(null);
  const [phoneError, setPhoneError] = useState('');

  // Update selected package when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialPackage) {
        setSelectedPkgId(initialPackage.id);
      } else {
        setSelectedPkgId(packages[1]?.id || packages[0]?.id || 'sun2');
      }
      setSubmittedLead(null);
      setPhoneError('');
      
      // Auto-trigger GPS acquisition on modal open as requested
      acquireGpsLocation();
    }
  }, [isOpen, initialPackage, packages]);

  const acquireGpsLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Trình duyệt không hỗ trợ tự động lấy GPS. Quý khách vui lòng nhập địa chỉ bên dưới.');
      return;
    }

    setIsGettingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy);

        // Approximate location context for Viettel Sales
        let approximateText = `Tọa độ: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        // Simple bounding box heuristics for key regions
        if (lat > 20.5 && lat < 21.5 && lng > 105.5 && lng < 106.2) {
          approximateText += ' (Khu vực Hà Nội & lân cận)';
          setProvince('Hà Nội');
        } else if (lat > 10.4 && lat < 11.2 && lng > 106.3 && lng < 107.0) {
          approximateText += ' (Khu vực TP. Hồ Chí Minh & lân cận)';
          setProvince('TP. Hồ Chí Minh');
        } else if (lat > 11.0 && lat < 11.8 && lng > 105.8 && lng < 106.5) {
          approximateText += ' (Khu vực Tây Ninh & Đông Nam Bộ)';
          setProvince('Tây Ninh');
        } else if (lat > 10.7 && lat < 11.5 && lng > 106.5 && lng < 107.2) {
          setProvince('Bình Dương');
        }

        setGpsLocation({
          latitude: lat,
          longitude: lng,
          accuracy,
          addressText: approximateText
        });
        setIsGettingGps(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsGettingGps(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError('Đã tắt quyền GPS. Quý khách vui lòng nhập địa chỉ cụ thể để nhân viên khảo sát.');
        } else {
          setGpsError('Không thể lấy vị trí GPS tự động. Quý khách vui lòng nhập địa chỉ bằng tay.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  if (!isOpen) return null;

  const currentPkg = packages.find(p => p.id === selectedPkgId) || packages[0] || PACKAGES_DATA[1];
  const isInternetOrTv = ['ftth_home', 'ftth_mesh', 'combo_tv', 'enterprise'].includes(currentPkg.category);
  const STANDARD_INSTALLATION_FEE = 300000; // Phí hòa mạng 300.000đ (thu cho trả từng tháng & đóng 6T, MIỄN PHÍ khi đóng 12T)

  // Calculate estimated price based on payment plan
  const calculateTotalCost = () => {
    if (currentPkg.price === 0) return 0;
    if (isInternetOrTv) {
      if (paymentPlan === '6months') {
        // Đóng 6 tháng: Cước 6T + Phí hòa mạng 300k (không tặng cước)
        return (currentPkg.price * 6) + STANDARD_INSTALLATION_FEE;
      } else if (paymentPlan === '12months') {
        // Đóng 12 tháng: Cước 12T + Phí hòa mạng 300k (tặng 1 tháng sử dụng)
        return (currentPkg.price * 12) + STANDARD_INSTALLATION_FEE;
      } else {
        // Trả hàng tháng: Cước tháng đầu + 300k phí hòa mạng
        return currentPkg.price + STANDARD_INSTALLATION_FEE;
      }
    }
    return currentPkg.price;
  };

  const calculateMonthsReceived = () => {
    if (!isInternetOrTv) return 'Đăng ký trọn gói dịch vụ';
    if (paymentPlan === '6months') return 'Sử dụng 6 tháng (Đóng 6 tháng không tặng cước, phí hòa mạng 300.000đ)';
    if (paymentPlan === '12months') return 'Sử dụng 13 tháng (Đóng 12 tháng TẶNG 1 THÁNG sử dụng, phí hòa mạng 300.000đ)';
    return 'Thanh toán từng tháng (Cước tháng 1 + Phí hòa mạng 300.000đ)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/\./g, '');
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    
    if (!cleanPhone) {
      setPhoneError('Vui lòng nhập số điện thoại để nhân viên Viettel liên hệ');
      return;
    }
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError('Số điện thoại chưa đúng định dạng (VD: 0966110357 hoặc 098xxxxxxx)');
      return;
    }

    setPhoneError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const newLead = saveCustomerLead({
        fullName: fullName.trim() || 'Khách Hàng Viettel',
        phoneNumber: cleanPhone,
        serviceName: currentPkg.name,
        serviceId: currentPkg.id,
        paymentPlan,
        estimatedCost: calculateTotalCost(),
        address: address.trim() || 'Chưa cung cấp chi tiết (sẽ tư vấn qua điện thoại)',
        province,
        note: note.trim()
          ? `${note.trim()} [${paymentPlan === '12months' ? 'Đóng 12T: Tặng 1T (Phí LĐ 300k)' : 'Đã gồm phí lắp đặt 300k'}]`
          : (isInternetOrTv 
              ? (paymentPlan === '12months' ? 'Đóng 12 tháng: Tặng 1 tháng sử dụng + Phí hòa mạng 300.000đ' : 'Phương án cước đã gồm phí hòa mạng 300.000đ theo quy định')
              : ''),
        gpsLocation: gpsLocation || undefined,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || 'direct'
      });

      setIsSubmitting(false);
      setSubmittedLead(newLead);
      if (onSuccessRegistered) {
        onSuccessRegistered(newLead);
      }
    }, 600);
  };

  return (
    <div id="registration-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        id="registration-modal-container" 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-800 p-5 sm:p-6 text-white shrink-0 relative">
          <button
            id="btn-close-reg-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-yellow-400 text-slate-950 text-[11px] font-extrabold uppercase rounded-full mb-1">
                Ưu Đãi Trực Tuyến Viettel
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Đăng Ký Lắp Đặt & Tư Vấn Miễn Phí
              </h2>
              <p className="text-xs sm:text-sm text-red-100 font-medium">
                Hệ thống tự động ghi nhận vị trí GPS để kỹ thuật viên khảo sát & triển khai trong 24 - 48h
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 overscroll-contain flex-1">
          {submittedLead ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div id="registration-success-view" className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner ring-8 ring-emerald-50">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Đăng Ký Dịch Vụ Thành Công!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Cảm ơn Quý khách <strong className="text-slate-900">{submittedLead.fullName}</strong>. Yêu cầu của quý khách đã được chuyển tới quản lý <strong className="text-red-600">Mr. Tuấn (0966.110.357)</strong>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Mã đơn đăng ký:</span>
                  <span className="font-mono font-bold text-slate-900">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Gói cước đã chọn:</span>
                  <span className="font-bold text-red-600">{submittedLead.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-semibold text-slate-900">{submittedLead.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Khu vực lắp đặt:</span>
                  <span className="font-semibold text-slate-900">{submittedLead.address} ({submittedLead.province})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2 bg-red-50/60 p-2 rounded-lg">
                  <span className="text-slate-700 font-bold">Tổng thanh toán đợt đầu:</span>
                  <div className="text-right">
                    <span className="font-mono font-black text-red-600 text-base">
                      {submittedLead.estimatedCost.toLocaleString('vi-VN')} VNĐ
                    </span>
                    {isInternetOrTv && (
                      <div className="text-[11px] font-medium mt-0.5">
                        {submittedLead.paymentPlan === '12months' ? (
                          <span className="text-emerald-700 font-bold">
                            🎁 Đóng 12T: MIỄN PHÍ 100% hòa mạng/lắp đặt (Tiết kiệm 300k)
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            (Đã gồm phí hòa mạng 300.000đ theo quy định)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {submittedLead.gpsLocation && (
                  <div className="flex justify-between items-center text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-4 h-4" /> Vị trí GPS đã lưu:
                    </span>
                    <span className="font-mono text-xs">
                      {submittedLead.gpsLocation.latitude.toFixed(4)}, {submittedLead.gpsLocation.longitude.toFixed(4)}
                    </span>
                  </div>
                )}
              </div>

              {/* Fast Connect Options */}
              <div className="space-y-2 max-w-lg mx-auto pt-2">
                <p className="text-xs font-semibold text-slate-500">
                  Cần hỗ trợ khảo sát và lắp đặt gấp ngay bây giờ?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    id="btn-success-call-now"
                    href={`tel:${VIETTEL_CONTACT.phone}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi Mr. Tuấn (0966.110.357)
                  </a>
                  <a
                    id="btn-success-zalo-now"
                    href={VIETTEL_CONTACT.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0068FF] hover:bg-[#0055d4] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Nhắn Zalo Ngay
                  </a>
                </div>
                <button
                  id="btn-success-finish"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Đóng cửa sổ này
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Selector Banner */}
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-3 sm:p-4 space-y-2.5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="select-package" className="text-xs font-extrabold text-red-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Chọn Gói Cước Cần Đăng Ký:</span>
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-100/80 px-2 py-0.5 rounded-full hidden sm:inline-block">
                      Đổi gói cước linh hoạt
                    </span>
                  </div>
                  <div className="relative w-full">
                    <select
                      id="select-package"
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="w-full bg-white border-2 border-red-300 hover:border-red-400 rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm font-bold text-slate-900 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer truncate transition-all"
                    >
                      {packages.map(pkg => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} - {pkg.price === 0 ? "Miễn phí dán thẻ" : `${pkg.price.toLocaleString("vi-VN")} đ/tháng`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-red-800 pt-1 border-t border-red-100">
                  <div>
                    {currentPkg.speed && (
                      <span className="font-semibold mr-3">⚡ Tốc độ: <strong>{currentPkg.speed}</strong></span>
                    )}
                    {currentPkg.dataPerDay && (
                      <span className="font-semibold mr-3">📱 Data: <strong>{currentPkg.dataPerDay}</strong></span>
                    )}
                  </div>
                  <div className="font-bold text-red-700">
                    {currentPkg.price === 0 ? 'Miễn Phí Dán Thẻ' : `${currentPkg.price.toLocaleString('vi-VN')} đ/tháng`}
                  </div>
                </div>
              </div>

              {/* Payment Term Selection (For FTTH / Combo / Enterprise) */}
              {currentPkg.price > 0 && isInternetOrTv && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hình thức thanh toán cước ưu đãi:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Option 1: 6 Months */}
                    <button
                      type="button"
                      id="plan-6months"
                      onClick={() => setPaymentPlan('6months')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentPlan === '6months'
                          ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Đóng 6 Tháng</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                          Không Tặng Cước
                        </span>
                      </div>
                      <div className="text-xs font-black text-red-600 mt-1">
                        {((currentPkg.price * 6) + STANDARD_INSTALLATION_FEE).toLocaleString('vi-VN')} đ
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Cước 6T: {(currentPkg.price * 6).toLocaleString('vi-VN')}đ + Phí LĐ: 300k
                      </div>
                      <div className="text-[10px] text-slate-600 font-semibold mt-1">
                        Dùng đúng 6 tháng (Không tặng cước)
                      </div>
                    </button>

                    {/* Option 2: 12 Months (TẶNG 1 THÁNG) */}
                    <button
                      type="button"
                      id="plan-12months"
                      onClick={() => setPaymentPlan('12months')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                        paymentPlan === '12months'
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Đóng 12 Tháng</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-emerald-600 text-white rounded-md animate-pulse">
                          + TẶNG 1 THÁNG
                        </span>
                      </div>
                      <div className="text-xs font-black text-emerald-700 mt-1">
                        {((currentPkg.price * 12) + STANDARD_INSTALLATION_FEE).toLocaleString('vi-VN')} đ
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Cước 12T: {(currentPkg.price * 12).toLocaleString('vi-VN')}đ + Phí LĐ: 300k
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">
                        ✓ Tặng 1 tháng (Dùng 13 tháng)
                      </div>
                    </button>

                    {/* Option 3: Monthly */}
                    <button
                      type="button"
                      id="plan-monthly"
                      onClick={() => setPaymentPlan('monthly')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentPlan === 'monthly'
                          ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Trả Hàng Tháng</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                          Từng Tháng
                        </span>
                      </div>
                      <div className="text-xs font-black text-red-600 mt-1">
                        {(currentPkg.price + STANDARD_INSTALLATION_FEE).toLocaleString('vi-VN')} đ
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Tháng đầu: {currentPkg.price.toLocaleString('vi-VN')}đ + Phí LĐ: 300k
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium mt-1">
                        Từ tháng 2: {currentPkg.price.toLocaleString('vi-VN')} đ/tháng
                      </div>
                    </button>
                  </div>

                  {/* Fee Transparency Box */}
                  <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Bảng kê chi phí thanh toán đợt đầu:</span>
                      <span className="text-red-600 font-black text-sm">
                        {calculateTotalCost().toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1.5 border-t border-slate-200">
                      <div>
                        • Tiền cước:{' '}
                        <strong className="text-slate-900">
                          {(paymentPlan === '6months'
                            ? currentPkg.price * 6
                            : paymentPlan === '12months'
                            ? currentPkg.price * 12
                            : currentPkg.price
                          ).toLocaleString('vi-VN')} đ
                        </strong>
                      </div>
                      <div>
                        • Phí hòa mạng:{' '}
                        <strong className="text-red-600">300.000 đ</strong>
                        <span className="text-[11px] text-slate-500 font-normal ml-1">
                          ({paymentPlan === '12months' ? 'Đã bao gồm trong tổng tiền' : paymentPlan === '6months' ? 'Đã bao gồm trong tổng tiền' : 'Thu cùng cước tháng đầu'})
                        </span>
                      </div>
                      <div className="sm:col-span-2 text-emerald-700 font-semibold">
                        • Thiết bị & Ưu đãi:{' '}
                        {paymentPlan === '12months'
                          ? 'TẶNG 1 THÁNG CƯỚC (Dùng 13 tháng) + Trang bị Modem Wifi 6 chính hãng (Phí hòa mạng 300k)'
                          : paymentPlan === '6months'
                          ? 'Dùng đúng 6 tháng (Không tặng cước) + Trang bị Modem Wifi 6 chính hãng (Phí hòa mạng 300k)'
                          : 'Trang bị trọn đời Modem Wifi 6 chính hãng mới 100% (Tháng 1 thu phí hòa mạng 300k)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-fullname" className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và Tên khách hàng:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      id="reg-fullname"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="VD: Nguyễn Văn Nam"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    Số Điện Thoại Nhận Tư Vấn <span className="text-red-600">*</span>:
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      id="reg-phone"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder="VD: 0966110357 hoặc 098xxxxxxx"
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 ${
                        phoneError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* AUTOMATIC GPS LOCATION TRACKING SECTION */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                      <Navigation className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">
                        Định Vị Vị Trí Khảo Sát (GPS Tự Động)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Hỗ trợ đội kỹ thuật Viettel tìm hộp cáp gần nhất
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-refresh-gps"
                    onClick={acquireGpsLocation}
                    disabled={isGettingGps}
                    className="px-2.5 py-1 text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                  >
                    {isGettingGps ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                        Đang lấy GPS...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3.5 h-3.5 text-red-600" />
                        {gpsLocation ? 'Làm Mới GPS' : 'Bật GPS Tự Động'}
                      </>
                    )}
                  </button>
                </div>

                {/* GPS Status Indicator */}
                {gpsLocation ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold">Đã định vị thành công vị trí của bạn:</span>
                        <div className="text-[11px] font-mono text-emerald-900 mt-0.5">
                          Tọa độ: {gpsLocation.latitude.toFixed(5)}, {gpsLocation.longitude.toFixed(5)} (Độ chính xác: ±{gpsLocation.accuracy || 15}m)
                        </div>
                      </div>
                    </div>
                  </div>
                ) : gpsError ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800 flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{gpsError}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic">
                    Đang kích hoạt GPS định vị khu vực lắp đặt của bạn...
                  </div>
                )}

                {/* Province & Address Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div>
                    <label htmlFor="reg-province" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Tỉnh / Thành phố:
                    </label>
                    <select
                      id="reg-province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                    >
                      {VIETNAM_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="reg-address" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Số nhà, Tên đường, Phường/Xã lắp đặt:
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                      <input
                        type="text"
                        id="reg-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="VD: Số 123 Đường 30/4, Khu phố 3, Phường 2"
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Note / Customer Request */}
              <div>
                <label htmlFor="reg-note" className="block text-xs font-bold text-slate-700 mb-1">
                  Yêu cầu / Ghi chú đặc biệt (Tùy chọn):
                </label>
                <input
                  type="text"
                  id="reg-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Cần kéo dây buổi sáng, mang theo đầu thu giọng nói..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Summary of Gifts & Guarantees */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-3 text-xs text-red-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-red-700">
                  <Gift className="w-4 h-4" />
                  Quyền lợi đặc quyền khi đăng ký ngay trên trang:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-700 pl-5 list-disc">
                  <li>Miễn phí 100% khảo sát & công kéo cáp tận nhà</li>
                  <li>Trang bị Modem Wifi 6 / Mesh chính hãng mới 100%</li>
                  <li>
                    {paymentPlan === '12months' ? (
                      <span className="text-emerald-700 font-bold">
                        Đóng 12 tháng: MIỄN PHÍ 100% phí hòa mạng 300k
                      </span>
                    ) : (
                      'Phí hòa mạng 300.000đ áp dụng theo quy định Viettel'
                    )}
                  </li>
                  <li>{calculateMonthsReceived()}</li>
                  <li>Bảo hành, bảo trì sự cố mạng trọn đời 24/7</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-submit-registration"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 active:scale-[0.99] text-white rounded-xl font-extrabold text-base shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang Gửi Thông Tin Khảo Sát...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      XÁC NHẬN ĐĂNG KÝ (TRIỂN KHAI 24 - 48H)
                    </>
                  )}
                </button>
              </div>

              {/* Instant Call Backup */}
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Hoặc gọi hotline trực tiếp để được tư vấn & hỗ trợ nhanh: <a href={`tel:${VIETTEL_CONTACT.phone}`} className="font-bold text-red-600 hover:underline">{VIETTEL_CONTACT.displayPhone} (Mr. Tuấn)</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
