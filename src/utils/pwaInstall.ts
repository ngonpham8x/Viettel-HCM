// PWA Installation Manager for Viettel Telecom App
// Allows 1-click instant installation on Android/Chrome/Edge/Desktop
// and smart fallback guide on iOS Safari.

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    __PWA_DEFERRED_PROMPT__?: BeforeInstallPromptEvent | null;
  }
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let isAppInstalled = false;

// Check if app is running in standalone mode (already installed on device)
export function checkIsAppInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  if (isAppInstalled) return true;
  
  const isStandalone = 
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://');
    
  if (isStandalone) {
    isAppInstalled = true;
  }
  return isStandalone;
}

// Detect iOS devices (iPhone, iPad, iPod)
export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
}

// Detect Android devices
export function isAndroidDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /android/i.test(window.navigator.userAgent);
}

// Check if native 1-click install prompt is currently ready
export function isInstallPromptReady(): boolean {
  return !!(deferredPrompt || (typeof window !== 'undefined' && window.__PWA_DEFERRED_PROMPT__));
}

// Initialize PWA prompt listener as early as possible
export function initPWAInstallListener(): void {
  if (typeof window === 'undefined') return;

  checkIsAppInstalled();

  // Capture beforeinstallprompt event before browser shows default ambient prompt
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    window.__PWA_DEFERRED_PROMPT__ = deferredPrompt;
    
    // Dispatch custom event so UI components can re-render if needed
    window.dispatchEvent(new CustomEvent('pwa-prompt-available'));
  });

  // Track when app is successfully installed
  window.addEventListener('appinstalled', () => {
    isAppInstalled = true;
    deferredPrompt = null;
    if (window.__PWA_DEFERRED_PROMPT__) {
      delete window.__PWA_DEFERRED_PROMPT__;
    }
    window.dispatchEvent(new CustomEvent('pwa-installed-success'));
  });
}

// Main 1-click install function
// Triggers native browser install prompt directly without extra user operations
export async function triggerInstallApp(): Promise<{
  outcome: 'accepted' | 'dismissed' | 'already_installed' | 'unsupported_ios' | 'fallback_guide';
  message?: string;
}> {
  // 1. If already installed, notify immediately
  if (checkIsAppInstalled()) {
    return {
      outcome: 'already_installed',
      message: 'Ứng dụng Viettel đã được cài đặt trên màn hình thiết bị của bạn!'
    };
  }

  // 2. If native prompt is available (Chrome, Android, Edge, Samsung Internet, etc.)
  const promptEvent = deferredPrompt || window.__PWA_DEFERRED_PROMPT__;
  if (promptEvent) {
    try {
      // Call native browser prompt immediately
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      
      if (choice.outcome === 'accepted') {
        isAppInstalled = true;
        deferredPrompt = null;
        delete window.__PWA_DEFERRED_PROMPT__;
        return {
          outcome: 'accepted',
          message: 'Đang cài đặt ứng dụng Viettel Telecom ra màn hình chính!'
        };
      } else {
        return {
          outcome: 'dismissed',
          message: 'Bạn đã tạm hoãn thao tác cài đặt ứng dụng.'
        };
      }
    } catch (err) {
      console.warn('Native install prompt error:', err);
    }
  }

  // 3. If iOS Safari, native automated prompt is restricted by Apple
  if (isIOSDevice()) {
    return {
      outcome: 'unsupported_ios',
      message: 'Trên iPhone/iPad: Bấm biểu tượng Chia sẻ (dưới cùng Safari) ➡️ Chọn "Thêm vào MH chính".'
    };
  }

  // 4. Other cases (e.g. prompt already used, or browser doesn't support beforeinstallprompt)
  return {
    outcome: 'fallback_guide',
    message: 'Mở bằng trình duyệt Google Chrome hoặc Safari để cài đặt ứng dụng ra màn hình chính.'
  };
}
