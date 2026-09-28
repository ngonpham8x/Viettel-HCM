import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Shield, Sparkles, ClipboardList, Wifi, Tv, Smartphone, Car, Camera, ShieldCheck, Download, Building2 } from 'lucide-react';
import { VIETTEL_CONTACT } from '../data/packagesData';
import { ServiceCategory } from '../types';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  onOpenInstall?: () => void;
  onSelectCategory?: (category: ServiceCategory) => void;
  leadsCount: number;
  onlineCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenRegister,
  onOpenAdmin,
  onOpenInstall,
  onSelectCategory,
  leadsCount,
  onlineCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; href: string; icon: React.ComponentType<{ className?: string }>; category?: ServiceCategory }[] = [
    { label: 'Cáp Quang FTTH', href: '#catalog-section', icon: Wifi, category: 'ftth_home' },
    { label: 'Wifi Mesh', href: '#catalog-section', icon: Wifi, category: 'ftth_mesh' },
    { label: 'Combo TV360', href: '#catalog-section', icon: Tv, category: 'combo_tv' },
    { label: 'Sim 5G/4G', href: '#catalog-section', icon: Smartphone, category: 'sim_data' },
    { label: 'Thẻ ePass', href: '#epass-section', icon: Car, category: 'epass' },
    { label: 'Camera AI', href: '#camera-section', icon: Camera, category: 'camera' },
    { label: 'Doanh Nghiệp & Số', href: '#catalog-section', icon: Building2, category: 'enterprise' },
    { label: 'Tính Cước', href: '#calculator-section', icon: Sparkles }
  ];

  const handleNavClick = (link: { href: string; category?: ServiceCategory }) => {
    setMobileMenuOpen(false);
    if (link.category && onSelectCategory) {
      onSelectCategory(link.category);
    }
    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar for ads & trust */}
      <div className="bg-red-700 text-white text-[11px] sm:text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Khuyến mãi đặc biệt: Tặng 1-2 tháng cước + Miễn phí Modem Wifi 6 + TV360</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/90 font-medium">
              Hotline / Zalo: <strong className="text-yellow-300 font-mono">0966.110.357</strong> (Mr. Tuấn)
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-emerald-300 font-mono font-bold">
              ● {onlineCount} đang online
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform shrink-0 border border-red-500/20 bg-red-600">
            <img 
              src="/icon-192.png" 
              alt="Viettel Telecom" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = './icon-192.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-red-600 leading-none">
              VIETTEL<span className="text-slate-900 font-bold ml-1 text-base">TELECOM</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
              Cổng Đăng Ký Trực Tuyến 24/7
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="px-3 py-1.5 text-xs xl:text-sm font-bold text-slate-700 hover:text-red-600 hover:bg-red-50/70 rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Contact & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hotline Button (Click triggers Contact Modal) */}
          <button
            id="btn-nav-hotline"
            onClick={onOpenContact}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-red-50 hover:bg-red-100/80 border border-red-200 text-red-700 rounded-xl transition-all cursor-pointer group"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] font-bold uppercase tracking-wider text-red-800 leading-tight">
                Hotline / Zalo (Mr. Tuấn)
              </div>
              <div className="text-sm font-extrabold text-red-600 font-mono leading-none">
                {VIETTEL_CONTACT.displayPhone}
              </div>
            </div>
          </button>

          {/* App Home Screen CTA */}
          {onOpenInstall && (
            <button
              id="btn-nav-install-app"
              onClick={onOpenInstall}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              title="Thêm logo app ra màn hình điện thoại / máy tính"
            >
              <Download className="w-3.5 h-3.5 text-red-600" />
              <span>Cài App Di Động</span>
            </button>
          )}

          {/* Quick Register CTA */}
          <button
            id="btn-nav-register"
            onClick={onOpenRegister}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Đăng Ký Ngay</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-red-600 text-white text-xs font-bold rounded-xl shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Gọi / Zalo {VIETTEL_CONTACT.displayPhone}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Đăng Ký Lắp Đặt
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600 rounded-lg text-left"
                >
                  <Icon className="w-4 h-4 text-red-600" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Install App & Admin Portal Buttons on Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {onOpenInstall && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInstall();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-xl transition-colors"
              >
                <Download className="w-4 h-4 text-red-600" />
                <span>Thêm Logo App Ra Màn Hình Điện Thoại</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Quản Trị Hệ Thống & Tra Cứu Đơn</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
