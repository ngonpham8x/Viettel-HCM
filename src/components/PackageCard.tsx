import React, { useState } from 'react';
import { 
  Zap, 
  Check, 
  Gift, 
  Phone, 
  ArrowRight, 
  Wifi, 
  Tv, 
  Smartphone, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Camera,
  Car,
  FileCheck,
  Building2
} from 'lucide-react';
import { TelecomPackage } from '../types';

interface PackageCardProps {
  pkg: TelecomPackage;
  onRegister: (pkg: TelecomPackage) => void;
  onConsult: (pkg: TelecomPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onRegister,
  onConsult
}) => {
  const [imageError, setImageError] = useState(false);
  const isFree = pkg.price === 0;

  const getCategoryIcon = () => {
    switch (pkg.category) {
      case 'sim_data':
        return <Smartphone className="w-4 h-4" />;
      case 'combo_tv':
        return <Tv className="w-4 h-4" />;
      case 'epass':
        return <Car className="w-4 h-4" />;
      case 'camera':
        return <Camera className="w-4 h-4" />;
      case 'enterprise':
        return <Building2 className="w-4 h-4" />;
      case 'digital_biz':
        return <FileCheck className="w-4 h-4" />;
      case 'ftth_mesh':
        return <Layers className="w-4 h-4" />;
      default:
        return <Wifi className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = () => {
    switch (pkg.category) {
      case 'sim_data':
        return 'Dung Lượng Tốc Độ Cao';
      case 'combo_tv':
        return 'Internet + TV360 4K';
      case 'epass':
        return 'Thu Phí Tự Động ETC';
      case 'camera':
        return 'Camera An Ninh AI';
      case 'enterprise':
        return 'Băng Thông Doanh Nghiệp';
      case 'digital_biz':
        return 'Giải Pháp Doanh Nghiệp';
      case 'ftth_mesh':
        return 'Băng Thông Mesh Phủ Rộng';
      default:
        return 'Băng Thông Cáp Quang';
    }
  };

  const getCategoryPill = () => {
    switch (pkg.category) {
      case 'sim_data':
        return 'Sim 5G/4G';
      case 'combo_tv':
        return 'TV360 Smart';
      case 'epass':
        return 'ePass BOT';
      case 'camera':
        return 'Camera Cloud';
      case 'enterprise':
        return 'Doanh Nghiệp';
      case 'digital_biz':
        return 'Giải Pháp Số';
      case 'ftth_mesh':
        return 'Wifi Mesh 6';
      default:
        return 'Wifi 6 Siêu Tốc';
    }
  };

  const hasImage = Boolean(pkg.imageUrl) && !imageError;

  return (
    <div 
      className={`relative flex flex-col justify-between bg-white rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-400 overflow-hidden h-full will-change-transform z-0 hover:z-10 ${
        pkg.popular 
          ? 'border-red-500 ring-2 ring-red-500/20 shadow-lg' 
          : 'border-slate-200 shadow-xs'
      }`}
    >
      {/* 1. Standardized Uniform Image Header (Fixed Height for ALL cards) */}
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-b from-slate-100/90 via-slate-50 to-white overflow-hidden flex items-center justify-center p-3 border-b border-slate-100 shrink-0 group select-none">
        {/* Subtle grid background accent */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />

        {hasImage ? (
          <img 
            src={pkg.imageUrl} 
            alt={pkg.name} 
            onError={() => setImageError(true)}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
            loading="lazy"
          />
        ) : (
          /* Branded Fallback Visual Container */
          <div className="flex flex-col items-center justify-center text-center p-4 w-full h-full">
            <div className="w-14 h-14 rounded-2xl bg-red-100/80 text-red-600 flex items-center justify-center shadow-xs mb-2 group-hover:scale-110 transition-transform">
              {getCategoryIcon()}
            </div>
            <span className="text-xs font-black text-slate-800 tracking-tight">
              {getCategoryLabel()}
            </span>
            <span className="text-[10px] font-bold text-red-600 uppercase mt-0.5">
              Viettel Telecom Chính Hãng
            </span>
          </div>
        )}

        {/* Top-Left Badge (Feature / Offer) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {pkg.badge && (
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-xs ${
              pkg.popular 
                ? 'bg-red-600 text-white' 
                : 'bg-white/95 text-red-700 border border-red-200 backdrop-blur-xs'
            }`}>
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Top-Right Badge (Popular or Category status) */}
        <div className="absolute top-3 right-3 z-10">
          {pkg.popular ? (
            <span className="flex items-center gap-1 text-[10px] font-black text-amber-700 bg-white/95 backdrop-blur-xs border border-amber-200 px-2 py-0.5 rounded-md shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" /> Bán chạy
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-600 bg-white/90 backdrop-blur-xs border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
              {getCategoryPill()}
            </span>
          )}
        </div>
      </div>

      {/* 2. Package Main Body (Aligned Flex Layout) */}
      <div className="p-5 pb-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Title (Fixed min-height for perfect multi-line alignment) */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug line-clamp-2 min-h-[48px] flex items-center">
            {pkg.name}
          </h3>

          {/* Speed / Data Spec Box */}
          <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between min-h-[50px]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-100 text-red-600 rounded-lg shrink-0">
                {getCategoryIcon()}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">
                  {getCategoryLabel()}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {pkg.speed || pkg.dataPerDay || (pkg.category === 'digital_biz' ? 'Chuẩn Bộ TT&TT' : 'Chính Hãng Viettel')}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-3 flex items-baseline gap-2 min-h-[36px]">
            {isFree ? (
              <div className="text-xl sm:text-2xl font-black text-red-600">MIỄN PHÍ DÁN THẺ</div>
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono tracking-tight">
                  {pkg.price.toLocaleString('vi-VN')}
                  <span className="text-sm font-semibold text-slate-600 font-sans ml-1">đ/tháng</span>
                </div>
                {pkg.originalPrice && (
                  <div className="text-xs text-slate-400 line-through font-mono">
                    {pkg.originalPrice.toLocaleString('vi-VN')}đ
                  </div>
                )}
              </>
            )}
          </div>

          {/* Highlight description (Reserved consistent height) */}
          <div className="mt-2 min-h-[46px] flex items-center">
            {pkg.highlight ? (
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-amber-50/70 border border-amber-100 p-2 rounded-lg line-clamp-2 w-full">
                {pkg.highlight}
              </p>
            ) : (
              <div className="w-full" />
            )}
          </div>

          {/* Features List */}
          <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Chi tiết ưu đãi:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {pkg.features.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment Equipped */}
          {pkg.equipment && pkg.equipment.length > 0 && (
            <div className="mt-3 p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900">
              <div className="font-bold flex items-center gap-1 text-blue-800 text-[11px]">
                <Layers className="w-3.5 h-3.5" /> Thiết bị trang bị miễn phí:
              </div>
              <div className="mt-1 space-y-0.5 font-medium">
                {pkg.equipment.map((eq, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promotion bonus */}
          <div className="mt-3 flex items-start gap-1.5 text-xs font-semibold text-red-700 bg-red-50 p-2 rounded-xl border border-red-100">
            <Gift className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <span>{pkg.promotion}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons Footer (Always Pinned to Bottom) */}
      <div className="p-5 pt-0 space-y-2 mt-auto shrink-0">
        <button
          onClick={() => onRegister(pkg)}
          className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            pkg.popular
              ? 'bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white shadow-red-600/20'
              : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-yellow-300" />
          <span>ĐĂNG KÝ NGAY</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onConsult(pkg)}
          className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-red-600" />
          <span>Tư Vấn Miễn Phí (Gọi / Zalo)</span>
        </button>
      </div>
    </div>
  );
};

