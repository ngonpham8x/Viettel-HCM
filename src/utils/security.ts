/**
 * Security utilities to deter unauthorized F12, DevTools shortcuts, 
 * right-click source viewing, and provide console deterrence warnings.
 */

export function initSecurityProtection(onAlert?: (message: string) => void): () => void {
  // Console deterrence warning
  try {
    const styleTitle = 'color: #ee0033; font-size: 22px; font-weight: 900; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);';
    const styleBody = 'color: #1e293b; font-size: 13px; font-weight: 600; line-height: 1.5;';
    const styleWarn = 'color: #dc2626; font-size: 12px; font-style: italic;';

    console.clear();
    console.log('%c🛡️ VIETTEL TELECOM - CỔNG BẢO MẬT THÔNG TIN', styleTitle);
    console.log(
      '%cHệ thống tra cứu và đăng ký dịch vụ cáp quang FTTH, Camera AI, Sim 5G & ePass Viettel chính hãng.\nHotline hỗ trợ kỹ thuật: 1800 8119 | Hotline tư vấn trực tuyến: 0966.110.357 (Mr. Tuấn).',
      styleBody
    );
    console.log('%c⚠️ Mọi hành vi dò quét, can thiệp hoặc trích xuất mã nguồn trái phép đều bị nghiêm cấm theo chính sách an toàn thông tin.', styleWarn);
  } catch {
    // Ignore in environments where console is restricted
  }

  let lastNoticeTime = 0;
  const triggerNotification = (msg: string) => {
    const now = Date.now();
    if (now - lastNoticeTime > 3000) {
      lastNoticeTime = now;
      if (onAlert) {
        onAlert(msg);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Allow admin shortcut Ctrl + Shift + A
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      return;
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    // 1. F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotification('Bản quyền hệ thống Viettel Telecom: Chức năng F12 đã được bảo vệ.');
      return false;
    }

    // 2. Ctrl + Shift + I or Cmd + Opt + I (Inspect)
    if (isCmdOrCtrl && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotification('Bản quyền hệ thống Viettel Telecom: Chức năng Inspect đã được bảo vệ.');
      return false;
    }

    // 3. Ctrl + Shift + J or Cmd + Opt + J (Console)
    if (isCmdOrCtrl && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotification('Bản quyền hệ thống Viettel Telecom: Chức năng Console đã được bảo vệ.');
      return false;
    }

    // 4. Ctrl + Shift + C or Cmd + Opt + C (Element Inspect)
    if (isCmdOrCtrl && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotification('Bản quyền hệ thống Viettel Telecom: Chức năng kiểm tra phần tử đã được bảo vệ.');
      return false;
    }

    // 5. Ctrl + U or Cmd + U (View Source)
    if (isCmdOrCtrl && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotification('Bản quyền hệ thống Viettel Telecom: Chức năng xem mã nguồn đã được bảo vệ.');
      return false;
    }

    // 6. Ctrl + S (Save Page)
    if (isCmdOrCtrl && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Prevent right-click context menu outside of input/textarea fields
  const handleContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Allow right click inside input, textarea or contenteditable for user convenience (pasting phone/address)
    if (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.isContentEditable
    ) {
      return true;
    }

    e.preventDefault();
    triggerNotification('Bản quyền hệ thống Viettel Telecom - Nhấn nút để thao tác hoặc gọi 0966.110.357 hỗ trợ.');
    return false;
  };

  window.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('contextmenu', handleContextMenu, true);

  return () => {
    window.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('contextmenu', handleContextMenu, true);
  };
}
