import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, Share, PlusSquare, CheckCircle, ArrowDown, Sparkles, Zap, Check } from 'lucide-react';
import { 
  triggerInstallApp, 
  checkIsAppInstalled, 
  isInstallPromptReady, 
  isIOSDevice, 
  isAndroidDevice 
} from '../utils/pwaInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccess 
}) => {
  const [isPromptAvailable, setIsPromptAvailable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>('android');
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    const isIos = isIOSDevice();
    setActivePlatform(isIos ? 'ios' : 'android');
    setIsInstalled(checkIsAppInstalled());
    setIsPromptAvailable(isInstallPromptReady());

    const handlePromptAvailable = () => {
      setIsPromptAvailable(true);
    };

    const handleInstalledSuccess = () => {
      setIsInstalled(true);
      setIsPromptAvailable(false);
    };

    window.addEventListener('pwa-prompt-available', handlePromptAvailable);
    window.addEventListener('pwa-installed-success', handleInstalledSuccess);

    return () => {
      window.removeEventListener('pwa-prompt-available', handlePromptAvailable);
      window.removeEventListener('pwa-installed-success', handleInstalledSuccess);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const res = await triggerInstallApp();
      if (res.outcome === 'accepted') {
        if (onSuccess) {
          onSuccess('Đang cài đặt ứng dụng Viettel ra màn hình chính!');
        }
        onClose();
      } else if (res.outcome === 'already_installed') {
        if (onSuccess) {
          onSuccess('Ứng dụng Viettel đã có sẵn trên thiết bị của bạn!');
        }
        onClose();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-scaleUp my-auto max-h-[90vh] flex flex-col">
        {/* Header with Red Gradient */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* App Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 rounded-2xl p-0.5 bg-white shadow-xl shadow-red-900/30 flex items-center justify-center ring-4 ring-white/30">
            <img
              src="/icon-192.png"
              alt="Viettel Telecom App Logo"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.src = './icon-192.png';
              }}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>ỨNG DỤNG DI ĐỘNG VIETTEL</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Cài Đặt Ra Màn Hình Chính</h3>
          <p className="text-xs text-red-100 mt-1 max-w-xs mx-auto">
            Mở 1 chạm tức thì, không cần nhập lại địa chỉ web, nhận ưu đãi mới nhất 24/7!
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1 overscroll-contain">
          {/* 1-Click Instant Install Button for Android / Chrome / Edge */}
          {(!isInstalled && isPromptAvailable) || activePlatform === 'android' ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="w-full py-4 px-5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 active:scale-98 text-white text-sm font-black rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:scale-110 transition-transform" />
                <span>{isInstalling ? 'Đang kích hoạt...' : 'TỰ ĐỘNG CÀI ĐẶT NGAY (1 CHẠM)'}</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                Hệ thống tự động thêm biểu tượng Viettel vào màn hình, không cần thao tác thêm.
              </p>
            </div>
          ) : null}

          {/* Visual Mobile Home Screen Icon Preview */}
          <div className="flex items-center gap-3.5 p-3 bg-red-50/70 border border-red-200/80 rounded-2xl">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md ring-2 ring-red-600/30 shrink-0 bg-red-600">
              <img
                src="/icon-192.png"
                alt="Logo Viettel"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = './icon-192.png';
                }}
              />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <span>Tên Ứng Dụng: <strong>Viettel</strong></span>
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Sẵn Sàng</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Logo đỏ Viettel chính hãng sẽ xuất hiện trực tiếp trên màn hình điện thoại của bạn.
              </p>
            </div>
          </div>

          {/* Platform Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActivePlatform('ios')}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activePlatform === 'ios' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🍎 iPhone / iPad (Safari)</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('android')}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activePlatform === 'android' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🤖 Android / Samsung</span>
            </button>
          </div>

          {/* Step by step for iOS */}
          {activePlatform === 'ios' && (
            <div className="space-y-3 bg-rose-50/60 p-4 rounded-2xl border border-red-200 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                <span>Thao tác nhanh trên iPhone (Trình duyệt Safari):</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    1
                  </div>
                  <div>
                    Nhấn biểu tượng <strong>Chia sẻ (Share)</strong> <Share className="w-3.5 h-3.5 inline text-blue-600 mx-1 align-baseline" /> ở thanh công cụ dưới đáy Safari.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    2
                  </div>
                  <div>
                    Cuộn xuống và chọn dòng <strong>"Thêm vào MH chính"</strong> (Add to Home Screen) <PlusSquare className="w-3.5 h-3.5 inline text-slate-800 mx-1 align-baseline" />.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    3
                  </div>
                  <div>
                    Nhấn nút <strong>"Thêm" (Add)</strong> ở góc trên bên phải màn hình để hoàn tất.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Android Fallback Guide (if automatic prompt was already dismissed or not triggered) */}
          {activePlatform === 'android' && !isPromptAvailable && (
            <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-800 text-xs">
                Nếu không thấy hộp thoại tự động xuất hiện:
              </div>
              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <p>1. Nhấn vào dấu <strong>3 chấm dọc (⋮)</strong> góc trên trình duyệt Chrome.</p>
                <p>2. Chọn <strong>"Cài đặt ứng dụng"</strong> hoặc <strong>"Thêm vào màn hình chính"</strong>.</p>
                <p>3. Nhấn <strong>"Cài đặt"</strong> là hoàn thành.</p>
              </div>
            </div>
          )}

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Dung lượng 0MB, siêu mượt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Mở 1 chạm tức thì</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Hỗ trợ hotline & Zalo 24/7</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Bảo mật chuẩn Viettel</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
