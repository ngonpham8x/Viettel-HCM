import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Tv, 
  Smartphone, 
  Car, 
  Camera, 
  Building2, 
  Layers, 
  Sparkles, 
  Search, 
  Phone, 
  Zap, 
  CheckCircle2, 
  Navigation,
  Gift,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { ServiceCategory, TelecomPackage, CustomerLead } from './types';
import { VIETTEL_CONTACT } from './data/packagesData';
import { getCustomerLeads, recordVisitor, getVisitorLogs, getStoredPackages } from './utils/storage';
import { initSecurityProtection } from './utils/security';

// Components
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PackageCard } from './components/PackageCard';
import { PromoCalculator } from './components/PromoCalculator';
import { EPassSection } from './components/EPassSection';
import { CameraSection } from './components/CameraSection';
import { PromoTicker } from './components/PromoTicker';
import { FloatingHotline } from './components/FloatingHotline';
import { FaqSection, Footer } from './components/FaqSection';
import { RegistrationModal } from './components/RegistrationModal';
import { ContactActionModal } from './components/ContactActionModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { InstallAppModal } from './components/InstallAppModal';
import { MobileInstallFooterBanner } from './components/MobileInstallFooterBanner';
import { 
  triggerInstallApp, 
  checkIsAppInstalled, 
  isInstallPromptReady 
} from './utils/pwaInstall';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState<TelecomPackage[]>(() => getStoredPackages());
  
  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [selectedPackageForAction, setSelectedPackageForAction] = useState<TelecomPackage | null>(null);

  // Install / Feedback Toast
  const [installToast, setInstallToast] = useState<{
    text: string;
    type: 'success' | 'info';
  } | null>(null);

  // Security Toast
  const [securityToast, setSecurityToast] = useState<string | null>(null);

  // Leads and Visitor Stats
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [onlineCount, setOnlineCount] = useState(1);

  // Initialize data, visitor tracking and security protection
  useEffect(() => {
    const loadedLeads = getCustomerLeads();
    setLeads(loadedLeads);

    const stats = recordVisitor();
    setOnlineCount(stats.onlineCount);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Press Ctrl + Shift + A to quickly launch Admin Portal
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initialize anti-F12 / DevTools protection
    const cleanupSecurity = initSecurityProtection((msg) => {
      setSecurityToast(msg);
      setTimeout(() => {
        setSecurityToast(null);
      }, 4000);
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cleanupSecurity();
    };
  }, []);

  const handleOpenRegisterWithPkg = (pkg: TelecomPackage) => {
    setSelectedPackageForAction(pkg);
    setIsRegisterOpen(true);
  };

  const handleOpenConsultWithPkg = (pkg: TelecomPackage) => {
    setSelectedPackageForAction(pkg);
    setIsContactOpen(true);
  };

  const handleLeadRegistered = (newLead: CustomerLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const showInstallToast = (text: string, type: 'success' | 'info' = 'info') => {
    setInstallToast({ text, type });
    setTimeout(() => {
      setInstallToast(null);
    }, 4500);
  };

  // Direct 1-click automatic app installation
  const handleTriggerInstall = async () => {
    // 1. If already installed in standalone mode on device
    if (checkIsAppInstalled()) {
      showInstallToast('Ứng dụng Viettel đã được cài đặt trên thiết bị của bạn! Bạn có thể mở trực tiếp từ màn hình chính.', 'info');
      return;
    }

    // 2. If browser supports native automated 1-click prompt (Chrome, Android, Edge, Samsung Internet...)
    if (isInstallPromptReady()) {
      const res = await triggerInstallApp();
      if (res.outcome === 'accepted') {
        showInstallToast('Đang cài đặt ứng dụng Viettel ra màn hình chính!', 'success');
        return;
      }
      if (res.outcome === 'dismissed') {
        return; // User canceled the browser dialog
      }
      if (res.outcome === 'already_installed') {
        showInstallToast('Ứng dụng Viettel đã được cài đặt trên thiết bị!', 'info');
        return;
      }
    }

    // 3. Fallback: If on iOS Safari or prompt not ready, open modal with platform instructions
    setIsInstallOpen(true);
  };

  // Filter packages based on tab and search
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.speed && pkg.speed.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pkg.dataPerDay && pkg.dataPerDay.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pkg.suitableFor && pkg.suitableFor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pkg.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const categoryTabs: { 
    id: ServiceCategory; 
    label: string; 
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }> 
  }[] = [
    { id: 'all', label: 'Tất Cả Dịch Vụ & Gói Cước', shortLabel: 'Tất Cả', icon: Sparkles },
    { id: 'ftth_home', label: 'Cáp Quang Gia Đình (SUN)', shortLabel: 'Cáp Quang SUN', icon: Wifi },
    { id: 'ftth_mesh', label: 'Wifi Mesh Phủ Rộng (STAR)', shortLabel: 'Wifi Mesh STAR', icon: Layers },
    { id: 'combo_tv', label: 'Combo Internet + TV360', shortLabel: 'Combo TV360', icon: Tv },
    { id: 'sim_data', label: 'Sim 5G / 4G Data Khủng', shortLabel: 'Sim 5G/4G', icon: Smartphone },
    { id: 'epass', label: 'Dán Thẻ ePass BOT & Sân Bay', shortLabel: 'Thẻ ePass', icon: Car },
    { id: 'camera', label: 'Camera An Ninh AI Cloud', shortLabel: 'Camera AI', icon: Camera },
    { id: 'enterprise', label: 'Cáp Quang Doanh Nghiệp', shortLabel: 'Doanh Nghiệp', icon: Building2 },
    { id: 'digital_biz', label: 'Chữ Ký Số & Hóa Đơn Điện Tử', shortLabel: 'Chữ Ký Số / HĐĐT', icon: FileCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-red-600 selection:text-white pb-16 sm:pb-0">
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenRegister={() => {
          setSelectedPackageForAction(null);
          setIsRegisterOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInstall={handleTriggerInstall}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        leadsCount={leads.length}
        onlineCount={onlineCount}
      />

      {/* 2. Google / Facebook Ads High-Converting Hero Section */}
      <HeroBanner
        onOpenRegister={() => {
          setSelectedPackageForAction(null);
          setIsRegisterOpen(true);
        }}
        onOpenContact={() => setIsContactOpen(true)}
        onlineCount={onlineCount}
      />

      {/* 3. Main Package Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full scroll-mt-20">
        {/* Category Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> BẢNG GIÁ DỊCH VỤ & GÓI CƯỚC MỚI NHẤT VIETTEL
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Hệ Sinh Thái Dịch Vụ & Gói Cước Viettel Toàn Diện
              </h2>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Tìm gói (NetVT1, MeshVT2, 5G135, TV360...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Category Filter Pills */}
          <div className="relative">
            <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none touch-pan-x -mx-1 px-1">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/25 ring-2 ring-red-600/20'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-xs'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-yellow-300' : 'text-red-600'}`} />
                    <span className="inline sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div id="ftth-section" className="space-y-6">
          {filteredPackages.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Không tìm thấy gói cước phù hợp</h3>
              <p className="text-xs text-slate-500 mt-1">
                Quý khách vui lòng thử tìm từ khóa khác hoặc liên hệ hotline <strong className="text-red-600">{VIETTEL_CONTACT.displayPhone}</strong> để được hỗ trợ.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Xem tất cả gói cước
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onRegister={handleOpenRegisterWithPkg}
                  onConsult={handleOpenConsultWithPkg}
                />
              ))}
            </div>
          )}
        </div>

        {/* Anchors for Nav Smooth Scroll */}
        <div id="mesh-section" className="h-0" />
        <div id="tv-section" className="h-0" />
        <div id="sim-section" className="h-0" />

        {/* 4. Interactive Promo & Billing Calculator */}
        <PromoCalculator 
          onRegister={handleOpenRegisterWithPkg} 
          packages={packages}
        />

        {/* 5. ePass Section */}
        <EPassSection 
          onRegister={handleOpenRegisterWithPkg}
          onConsult={handleOpenConsultWithPkg}
        />

        {/* 6. Camera AI Section */}
        <CameraSection 
          onRegister={handleOpenRegisterWithPkg}
          onConsult={handleOpenConsultWithPkg}
          packages={packages}
        />

        {/* 7. Special 24 - 48h Installation Guarantee Banner */}
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 my-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-yellow-300">
              <Navigation className="w-3.5 h-3.5" />
              TRIỂN KHAI NHANH 24 - 48H QUA ĐỊNH VỊ GPS
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Đăng Ký Lắp Mạng & Triển Khai Dịch Vụ Nhanh Chóng
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              Hệ thống tự động điều phối kỹ thuật viên tại trạm Viettel gần nhất đến tận nhà khảo sát cáp quang và hỗ trợ triển khai hoàn tất trong 24 - 48 giờ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                setSelectedPackageForAction(null);
                setIsRegisterOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>ĐĂNG KÝ KHẢO SÁT NGAY</span>
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto px-5 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm rounded-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-yellow-300" />
              <span>Gọi Mr. Tuấn (0966.110.357)</span>
            </button>
          </div>
        </section>

        {/* 8. Dedicated Mobile Install Card at end of page */}
        <MobileInstallFooterBanner onOpenInstall={handleTriggerInstall} />

        {/* 9. FAQ Section */}
        <FaqSection />
      </main>

      {/* 10. Footer with Concealed Admin Entrance & Mobile App Install */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenRegister={() => {
          setSelectedPackageForAction(null);
          setIsRegisterOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInstall={handleTriggerInstall}
      />

      {/* Real-time Toast Notifications */}
      {installToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-slate-950/95 text-white border border-emerald-500/80 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn backdrop-blur-md max-w-sm sm:max-w-md text-center">
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span>{installToast.text}</span>
        </div>
      )}

      {/* Security Deterrence Toast */}
      {securityToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-slate-950/95 text-white border border-red-500 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn backdrop-blur-md max-w-sm sm:max-w-md text-center">
          <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
          <span>{securityToast}</span>
        </div>
      )}

      {/* 10. Floating Interactive Hotline Action Widget */}
      <FloatingHotline
        onOpenContact={() => setIsContactOpen(true)}
        onOpenRegister={() => {
          setSelectedPackageForAction(null);
          setIsRegisterOpen(true);
        }}
        onOpenInstall={handleTriggerInstall}
      />

      {/* 11. Real-time Customer Ticker (Social Proof) */}
      <PromoTicker
        onSelectPackage={(pkgName) => {
          const matched = packages.find(p => p.name.includes(pkgName));
          if (matched) {
            handleOpenRegisterWithPkg(matched);
          } else {
            setIsRegisterOpen(true);
          }
        }}
      />

      {/* 12. Modals */}
      {/* Registration Modal with Auto GPS Geolocation Capture */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialPackage={selectedPackageForAction}
        onSuccessRegistered={handleLeadRegistered}
        packages={packages}
      />

      {/* Contact Prompt Modal (Calls 0966.110.357 or Opens Zalo) */}
      <ContactActionModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onRequestCallback={() => setIsRegisterOpen(true)}
        selectedPackageName={selectedPackageForAction ? selectedPackageForAction.name : undefined}
      />

      {/* Admin Leads & Analytics Modal (For Mr. Tuấn and Staff) */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onLeadsUpdated={setLeads}
        onlineCount={onlineCount}
        packages={packages}
        onPackagesUpdated={setPackages}
      />

      {/* Mobile PWA Add to Home Screen Modal */}
      <InstallAppModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        onSuccess={(msg) => showInstallToast(msg, 'success')}
      />
    </div>
  );
}
