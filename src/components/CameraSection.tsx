import React, { useState } from 'react';
import { 
  Camera, 
  ShieldCheck, 
  Cloud, 
  Wifi, 
  Eye, 
  Video, 
  CheckCircle2, 
  Zap, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  HardDrive, 
  Lock, 
  Bell, 
  Cpu, 
  Check, 
  Info,
  Server
} from 'lucide-react';
import { OFFICIAL_CAMERA_DEVICES, PACKAGES_DATA, VIETTEL_CONTACT, CameraDevice } from '../data/packagesData';
import { TelecomPackage } from '../types';

interface CameraSectionProps {
  onRegister: (pkg: TelecomPackage) => void;
  onConsult: (pkg: TelecomPackage) => void;
  packages?: TelecomPackage[];
}

export const CameraSection: React.FC<CameraSectionProps> = ({ 
  onRegister, 
  onConsult,
  packages = PACKAGES_DATA 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'combos' | 'cloud' | 'devices' | 'features'>('combos');
  const [selectedDevice, setSelectedDevice] = useState<CameraDevice | null>(null);

  // Filter camera packages from packages list
  const cameraCombos = packages.filter(p => p.category === 'camera' && p.id.includes('combo'));
  const cloudPackages = packages.filter(p => p.category === 'camera' && p.id.includes('cloud'));
  const cameraDevicePackages = packages.filter(p => p.category === 'camera' && p.id.startsWith('camera_hc'));

  const primaryCameraPkg = cameraCombos[0] || cameraDevicePackages[0] || packages[0];

  return (
    <section id="camera-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6 scroll-mt-20">
      {/* Official Top Hero Banner with Viettel.vn Authentic Styling */}
      <div 
        className="relative overflow-hidden rounded-3xl text-white shadow-2xl border border-red-500/30"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(136, 19, 55, 0.9) 60%, rgba(159, 18, 57, 0.95) 100%), url('https://media.vietteltelecom.vn/upload/ckfinder/images/myvt6/codinh/bgInternet.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-600/40 border border-red-400/40 rounded-full text-xs font-black tracking-wide text-yellow-300">
              <Camera className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>HỆ THỐNG CAMERA AN NINH AI CHÍNH HÃNG VIETTEL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ĐĂNG KÝ SỬ DỤNG CAMERA VIETTEL <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300">
                CHO NGÔI NHÀ BẠN
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-medium">
              Trang bị miễn phí Camera an ninh AI cho tất cả khách hàng sử dụng Internet Viettel. Công nghệ nhận diện người thông minh, độ nét 2K 3MP, tích hợp bộ nhớ đệm lưu offline và bảo mật tuyệt đối trên nền tảng Cloud Viettel Data Center.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
                <div className="text-lg sm:text-xl font-black text-yellow-300 font-mono">2K Siêu Nét</div>
                <div className="text-[11px] text-slate-300 font-medium">Cảm biến 3MP</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
                <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">Cloud 24/7</div>
                <div className="text-[11px] text-slate-300 font-medium">Data Center VN</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
                <div className="text-lg sm:text-xl font-black text-blue-300 font-mono">Xoay 360°</div>
                <div className="text-[11px] text-slate-300 font-medium">Không góc chết</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
                <div className="text-lg sm:text-xl font-black text-rose-300 font-mono">IP67 Kháng Nước</div>
                <div className="text-[11px] text-slate-300 font-medium">Bền bỉ ngoài trời</div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={() => onRegister(primaryCameraPkg)}
                className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>ĐĂNG KÝ TRANG BỊ CAMERA MIỄN PHÍ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={VIETTEL_CONTACT.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>Hotline / Zalo: {VIETTEL_CONTACT.displayPhone}</span>
              </a>

              <a
                href="https://viettel.vn/vx/internet-truyenhinh/camera"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white underline underline-offset-4 py-2"
              >
                <span>Xem trên Viettel.vn chính thức</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigator */}
      <div className="mt-8 mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setActiveSubTab('combos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeSubTab === 'combos'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span>Gói Combo Internet + Camera (Từ 205K)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cloud')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeSubTab === 'cloud'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Gói Lưu Trữ Cloud Viettel (Từ 20K)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('devices')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeSubTab === 'devices'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Thiết Bị Camera AI Chính Hãng</span>
        </button>

        <button
          onClick={() => setActiveSubTab('features')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeSubTab === 'features'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Tính Năng & Ưu Điểm Đột Phá</span>
        </button>
      </div>

      {/* Tab 1: COMBO INTERNET + CAMERA */}
      {activeSubTab === 'combos' && (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-900">
            <div>
              <h3 className="font-black text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                Gói Combo Internet Camera - Tiết Kiệm Đến 50% Chi Phí
              </h3>
              <p className="text-xs text-red-700 mt-0.5">
                Trang bị miễn phí Camera AI và Modem Wifi 6 thế hệ mới khi đăng ký đường truyền Internet Viettel.
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold px-3 py-1.5 bg-red-600 text-white rounded-lg">
              Áp Dụng Toàn Quốc
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameraCombos.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-red-300 transition-all flex flex-col overflow-hidden group"
              >
                {/* Official Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-black rounded-lg shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                  {pkg.speed && (
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg">
                      {pkg.speed}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-base leading-snug group-hover:text-red-600 transition-colors">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {pkg.highlight}
                    </p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-red-600 font-mono">
                        {pkg.price.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ tháng</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {pkg.originalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onRegister(pkg)}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Đăng Ký Gói</span>
                    </button>
                    <button
                      onClick={() => onConsult(pkg)}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center cursor-pointer"
                      title="Tư vấn hotline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: GÓI LƯU TRỮ CLOUD VIETTEL */}
      {activeSubTab === 'cloud' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-base flex items-center gap-2 text-blue-900">
                <Cloud className="w-5 h-5 text-blue-600" />
                Gói Cước Cloud Lưu Trữ Camera An Toàn Tuyệt Đối
              </h3>
              <p className="text-xs text-blue-800 max-w-3xl leading-relaxed">
                Dữ liệu được mã hóa và lưu tại hệ thống Data Center Viettel đạt tiêu chuẩn Tier 3 quốc tế tại Việt Nam. Không lo rủi ro hỏng thẻ nhớ, mất camera hay bị kẻ gian xóa clip bằng chứng.
              </p>
            </div>
            <div className="shrink-0 bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-sm">
              Server Đặt Tại Việt Nam
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-[11px] font-black rounded-lg shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                      {pkg.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {pkg.highlight}
                    </p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-blue-600 font-mono">
                        {pkg.price.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ tháng</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {pkg.originalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onRegister(pkg)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Đăng Ký Gói Cloud</span>
                    </button>
                    <button
                      onClick={() => onConsult(pkg)}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center cursor-pointer"
                      title="Tư vấn hotline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: THIẾT BỊ CAMERA AI CHÍNH HÃNG */}
      {activeSubTab === 'devices' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICIAL_CAMERA_DEVICES.map((device) => {
              const matchedPackage = cameraDevicePackages.find(p => p.id.includes(device.id)) || primaryCameraPkg;

              return (
                <div 
                  key={device.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-red-400 transition-all flex flex-col overflow-hidden group"
                >
                  <div className="relative h-52 bg-gradient-to-b from-slate-50 to-slate-100 p-4 flex items-center justify-center">
                    <img 
                      src={device.image} 
                      alt={device.name}
                      className="max-h-44 max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded-md text-white ${
                        device.type === 'indoor' ? 'bg-indigo-600' : 'bg-emerald-600'
                      }`}>
                        {device.type === 'indoor' ? 'Trong Nhà' : 'Ngoài Trời'}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-md">
                        {device.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                        {device.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-red-600 mt-0.5">
                        {device.resolution}
                      </p>

                      <div className="mt-2.5 flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-slate-900 font-mono">
                          {device.price.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {device.originalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        Đã bao gồm 12 tháng Cloud bản quyền
                      </div>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {device.highlight}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Ống kính:</span>
                          <span className="font-semibold text-slate-800">{device.specs.lens}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Hồng ngoại:</span>
                          <span className="font-semibold text-slate-800">{device.specs.irRange}</span>
                        </div>
                        {device.specs.rotation && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Góc xoay:</span>
                            <span className="font-semibold text-slate-800">{device.specs.rotation}</span>
                          </div>
                        )}
                        {device.specs.waterproof && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Kháng nước:</span>
                            <span className="font-semibold text-emerald-700">{device.specs.waterproof}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        onClick={() => onRegister(matchedPackage)}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Đặt Mua Thiết Bị</span>
                      </button>

                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3 h-3" />
                        <span>Xem chi tiết thông số</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: TÍNH NĂNG VÀ ƯU ĐIỂM ĐỘT PHÁ */}
      {activeSubTab === 'features' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-black">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Server Cloud Tại Việt Nam</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dữ liệu được lưu trữ trực tiếp tại Trung tâm Dữ liệu Viettel IDC chuẩn Tier 3, bảo mật cấp độ cao nhất của Bộ Quốc Phòng. Tuyệt đối không sợ rò rỉ clip ra nước ngoài.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black">
              <HardDrive className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Bộ Nhớ Đệm Lưu Offline 1 Ngày</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đột phá công nghệ: Khi gia đình bị mất điện hoặc đứt internet, Camera Viettel vẫn tiếp tục ghi hình trong bộ nhớ đệm 24h. Khi có mạng trở lại, hệ thống tự động đẩy dữ liệu lên Cloud.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Trí Tuệ Nhân Tạo AI Thông Minh</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thuật toán AI tự động phân biệt chuẩn xác giữa chuyển động của con người và vật nuôi, lá cây đung đưa, tránh tình trạng báo động ảo làm phiền quý khách vào ban đêm.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-base">Bảo Hành Trọn Đời Hợp Đồng</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Khách hàng dùng Internet Viettel được bảo hành thiết bị trong suốt thời gian sử dụng. Đội ngũ kỹ thuật viên Viettel hỗ trợ lắp đặt, bảo trì tận nơi miễn phí 24/7.
            </p>
          </div>
        </div>
      )}

      {/* Device Specs Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                  THÔNG SỐ KỸ THUẬT CHÍNH THỨC
                </span>
                <h3 className="text-lg font-black text-slate-900">{selectedDevice.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDevice(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src={selectedDevice.image} 
                alt={selectedDevice.name} 
                className="w-24 h-24 object-contain bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0" 
              />
              <div className="space-y-1">
                <div className="text-xl font-black text-red-600 font-mono">
                  {selectedDevice.price.toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-slate-500">{selectedDevice.model}</div>
                <div className="text-xs font-bold text-emerald-600">{selectedDevice.badge}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900">Chi tiết cấu hình:</div>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">Độ phân giải:</span>
                  <p className="font-bold text-slate-800">{selectedDevice.resolution}</p>
                </div>
                <div>
                  <span className="text-slate-400">Ống kính:</span>
                  <p className="font-bold text-slate-800">{selectedDevice.specs.lens}</p>
                </div>
                <div>
                  <span className="text-slate-400">Hồng ngoại đêm:</span>
                  <p className="font-bold text-slate-800">{selectedDevice.specs.irRange}</p>
                </div>
                <div>
                  <span className="text-slate-400">Kết nối:</span>
                  <p className="font-bold text-slate-800">{selectedDevice.specs.connection}</p>
                </div>
                {selectedDevice.specs.rotation && (
                  <div>
                    <span className="text-slate-400">Góc xoay:</span>
                    <p className="font-bold text-slate-800">{selectedDevice.specs.rotation}</p>
                  </div>
                )}
                {selectedDevice.specs.waterproof && (
                  <div>
                    <span className="text-slate-400">Chuẩn kháng nước:</span>
                    <p className="font-bold text-emerald-700">{selectedDevice.specs.waterproof}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">Tính năng nổi bật:</div>
              <ul className="space-y-1 text-slate-600">
                {selectedDevice.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => {
                  const pkg = cameraDevicePackages.find(p => p.id.includes(selectedDevice.id)) || primaryCameraPkg;
                  setSelectedDevice(null);
                  onRegister(pkg);
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                ĐĂNG KÝ MUA CAMERA NÀY
              </button>
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
