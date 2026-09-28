import React, { useState } from 'react';
import { Calculator, Sparkles, Gift, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PACKAGES_DATA } from '../data/packagesData';
import { TelecomPackage } from '../types';

interface PromoCalculatorProps {
  onRegister: (pkg: TelecomPackage) => void;
  packages?: TelecomPackage[];
}

export const PromoCalculator: React.FC<PromoCalculatorProps> = ({ 
  onRegister,
  packages = PACKAGES_DATA 
}) => {
  const eligiblePackages = packages.filter(p => p.price > 0 && p.category !== 'camera');
  const [selectedId, setSelectedId] = useState<string>(eligiblePackages[1]?.id || eligiblePackages[0]?.id || 'sun2');
  const [months, setMonths] = useState<6 | 12>(6);

  const currentPkg = eligiblePackages.find(p => p.id === selectedId) || eligiblePackages[0] || PACKAGES_DATA[1];

  const installationFee = 300000;
  const bonusMonths = months === 6 ? 0 : 1;
  const totalMonthsUsed = months + bonusMonths;
  const totalFee = (currentPkg.price * months) + installationFee;
  const savedMonthlyFee = currentPkg.price * bonusMonths;
  const freeModemValue = currentPkg.category === 'ftth_mesh' ? 1800000 : 900000;
  const totalSavings = savedMonthlyFee + freeModemValue;

  return (
    <section id="calculator-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl my-10 max-w-7xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/30 border border-red-500/40 rounded-full text-xs font-bold text-red-300">
            <Calculator className="w-3.5 h-3.5" />
            CÔNG CỤ TÍNH CƯỚC & ƯU ĐÃI THÔNG MINH
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Tính Tiền Cước & Quyền Lợi Đóng Trước
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Xem ngay số tiền cước và tổng tháng sử dụng thực tế khi thanh toán trước 6 tháng hoặc 12 tháng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div>
              <label htmlFor="calc-pkg-select" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Chọn Gói Cước Bạn Dự Định Lắp:
              </label>
              <select
                id="calc-pkg-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                {eligiblePackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} ({pkg.price.toLocaleString('vi-VN')} đ/tháng)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Chọn Phương Án Đóng Trước Cước:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMonths(6)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    months === 6
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm">Đóng 6 Tháng</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-900 rounded-md">
                      KHÔNG TẶNG CƯỚC
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mt-1 font-medium">Sử dụng 6 tháng trọn gói</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMonths(12)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    months === 12
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm">Đóng 12 Tháng</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 bg-yellow-400 text-slate-950 rounded-md animate-pulse">
                      + TẶNG 1 THÁNG
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mt-1 font-medium">Sử dụng 13 tháng trọn gói</div>
                </button>
              </div>
            </div>

            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <Gift className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Trang bị 100% Modem Wifi 6 chính hãng. Phí hòa mạng 300.000đ. Đã gồm 10% VAT.</span>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-white to-slate-50 text-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Gói cước đã chọn</span>
                <h4 className="text-lg font-black text-slate-900">{currentPkg.name}</h4>
              </div>
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg font-mono">
                {currentPkg.speed || currentPkg.dataPerDay}
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="py-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>Số tháng thanh toán cước:</span>
                <span className="font-bold text-slate-900">{months} tháng</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Phí hòa mạng:</span>
                <span className="font-bold text-slate-900 font-mono">300.000 đ</span>
              </div>
              <div className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg font-semibold ${
                bonusMonths > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-100'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> Số tháng Viettel tặng thêm:
                </span>
                <span className="font-extrabold font-mono">
                  {bonusMonths > 0 ? `+${bonusMonths} Tháng (Sử dụng 13T)` : '0 Tháng (Sử dụng 6T)'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Tổng thời gian sử dụng thực tế:</span>
                <span className="font-bold text-slate-900 text-base">{totalMonthsUsed} Tháng</span>
              </div>
              {bonusMonths > 0 && (
                <div className="flex justify-between items-center text-slate-600 border-t border-slate-200 pt-2">
                  <span>Giá trị tháng cước được tặng:</span>
                  <span className="font-bold text-emerald-600 font-mono">+ {savedMonthlyFee.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
            </div>

            {/* Total Fee Due */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  Tổng thanh toán (Cước {months}T + Phí LĐ 300k):
                </div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono tracking-tight">
                  {totalFee.toLocaleString('vi-VN')} đ
                </div>
              </div>

              <button
                onClick={() => onRegister(currentPkg)}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>ĐĂNG KÝ GÓI NÀY</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
