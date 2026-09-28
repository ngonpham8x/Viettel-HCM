import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Trash2, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Search, 
  Filter, 
  UserCheck, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  Users, 
  Activity,
  CheckCircle,
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  FileSpreadsheet,
  LogOut,
  Mail,
  Check,
  Eye,
  EyeOff,
  Layers
} from 'lucide-react';
import { CustomerLead, TelecomPackage } from '../types';
import { AdminPackagesManager } from './AdminPackagesManager';
import { 
  updateLeadStatus, 
  deleteLead, 
  exportLeadsToExcel, 
  getVisitorLogs, 
  getTotalViews,
  clearAllLeads,
  clearVisitorLogs 
} from '../utils/storage';
import { 
  verifyAdminCredentials, 
  verifyGoogleAdminProfile,
  AdminUserProfile 
} from '../utils/adminAuth';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: CustomerLead[];
  onLeadsUpdated: (updatedLeads: CustomerLead[]) => void;
  onlineCount: number;
  packages: TelecomPackage[];
  onPackagesUpdated: (updatedPackages: TelecomPackage[]) => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onLeadsUpdated,
  onlineCount,
  packages,
  onPackagesUpdated
}) => {
  // Ephemeral in-memory auth state: strictly reset on modal close/open
  const [adminUser, setAdminUser] = useState<AdminUserProfile | null>(null);
  
  // Login input fields: ALWAYS empty on open for zero footprint
  const [authTab, setAuthTab] = useState<'google' | 'key'>('google');
  const [googleEmailInput, setGoogleEmailInput] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPin, setInputPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Tab & Filter States
  const [activeTab, setActiveTab] = useState<'leads' | 'packages' | 'analytics'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<CustomerLead | null>(null);

  // Reset all sensitive states every time modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setAdminUser(null);
      setGoogleEmailInput('');
      setInputEmail('');
      setInputPin('');
      setAuthError('');
      setAuthSuccessMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModalClose = () => {
    // Clear credentials and lock immediately
    setAdminUser(null);
    setGoogleEmailInput('');
    setInputEmail('');
    setInputPin('');
    setAuthError('');
    onClose();
  };

  const handleGoogleQuickLogin = async (emailToVerify: string) => {
    const trimmed = emailToVerify ? emailToVerify.trim().toLowerCase() : '';
    if (!trimmed) {
      setAuthError('Vui lòng nhập địa chỉ Gmail quản trị để xác thực.');
      return;
    }

    setIsAuthenticating(true);
    setAuthError('');
    setAuthSuccessMsg('');

    try {
      const result = await verifyGoogleAdminProfile(trimmed);

      if (result.success && result.profile) {
        setAuthSuccessMsg(`Xác thực Google thành công! Mở khóa bảng điều khiển...`);
        setTimeout(() => {
          setAdminUser(result.profile!);
          setIsAuthenticating(false);
        }, 200);
      } else {
        setAuthError(result.error || 'Tài khoản Google này không có quyền quản trị hệ thống Viettel.');
        setIsAuthenticating(false);
      }
    } catch {
      setAuthError('Lỗi xác thực. Vui lòng thử lại!');
      setIsAuthenticating(false);
    }
  };

  const handleAdminKeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    setAuthSuccessMsg('');

    try {
      const result = await verifyAdminCredentials(inputEmail, inputPin);

      if (result.success && result.profile) {
        setAuthSuccessMsg(`Xác thực thành công! Mở khóa bảng điều khiển: ${result.profile.name}`);
        setTimeout(() => {
          setAdminUser(result.profile!);
          setIsAuthenticating(false);
        }, 250);
      } else {
        setAuthError(result.error || 'Mật khẩu / Khóa bảo mật không chính xác. Vui lòng kiểm tra lại!');
        setIsAuthenticating(false);
      }
    } catch {
      setAuthError('Lỗi xác thực hệ thống. Vui lòng kiểm tra lại!');
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setAdminUser(null);
    setInputEmail('');
    setInputPin('');
    setAuthError('');
    setAuthSuccessMsg('');
  };

  const handleExport = async () => {
    setIsExporting(true);
    await exportLeadsToExcel(leads);
    setIsExporting(false);
  };

  const visitorLogs = getVisitorLogs();
  const totalViews = getTotalViews();

  const handleStatusChange = (id: string, newStatus: CustomerLead['status']) => {
    const updated = updateLeadStatus(id, newStatus);
    onLeadsUpdated(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn đăng ký này?')) {
      const updated = deleteLead(id);
      onLeadsUpdated(updated);
      if (selectedLeadForDetail?.id === id) {
        setSelectedLeadForDetail(null);
      }
    }
  };

  const handleClearAllLeads = () => {
    if (window.confirm('Quý khách có chắc chắn muốn xóa toàn bộ danh sách đơn ảo / thử nghiệm không? Thao tác này sẽ làm sạch hoàn toàn danh sách khách hàng.')) {
      const updated = clearAllLeads();
      onLeadsUpdated(updated);
      setSelectedLeadForDetail(null);
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('Quý khách có chắc chắn muốn xóa toàn bộ lịch sử truy cập ảo/cũ không?')) {
      clearVisitorLogs();
      window.location.reload();
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchQuery = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phoneNumber.includes(searchQuery) ||
      lead.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.address && lead.address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchQuery && matchStatus;
  });

  const getStatusBadge = (status: CustomerLead['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">Mới Đăng Ký</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Đã Liên Hệ</span>;
      case 'surveyed':
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Đã Khảo Sát GPS</span>;
      case 'installed':
        return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Đã Lắp Đặt Xong</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">Hủy / Không Nhu Cầu</span>;
    }
  };

  return (
    <div id="admin-leads-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div 
        id="admin-leads-modal-container" 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md">
              VT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">Hệ Thống Quản Trị Đơn & Lịch Sử Khách Hàng</h2>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-mono rounded-md border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {onlineCount} Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hotline tiếp nhận: 0966.110.357 Mr. Tuấn | Bảo mật mã hóa đường truyền SSL 256-bit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminUser && (
              <>
                <button
                  id="btn-export-excel"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                  {isExporting ? 'Đang xuất XLSX...' : 'Xuất File Excel (.xlsx)'}
                </button>
                <button
                  id="btn-top-clear-leads"
                  onClick={handleClearAllLeads}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-700/80 text-red-200 hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                  title="Xóa toàn bộ dữ liệu đơn ảo / thử nghiệm"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Xóa Dữ Liệu Ảo</span>
                </button>
                <button
                  onClick={handleLogout}
                  title="Khóa và Đăng xuất"
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Khóa Quản Trị</span>
                </button>
              </>
            )}
            <button
              id="btn-close-admin-modal"
              onClick={handleModalClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECURE DIRECT AUTHENTICATION GATE */}
        {!adminUser ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-100 overflow-y-auto">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
              <div className="text-center space-y-1.5">
                <div className="w-13 h-13 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto ring-8 ring-red-50/50 shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-red-100 text-red-700 rounded-full text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  XÁC THỰC BẢO MẬT QUẢN TRỊ VIÊN
                </div>
                <h3 className="text-xl font-black text-slate-900">Đăng Nhập Quản Trị Viettel</h3>
                <p className="text-xs text-slate-500">
                  Chọn phương thức đăng nhập để mở khóa danh bạ và quản trị đơn hàng.
                </p>
              </div>

              {/* Method Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthTab('google'); setAuthError(''); }}
                  className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authTab === 'google' ? 'bg-white text-red-600 shadow-xs ring-1 ring-slate-200/80' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Đăng Nhập Google
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab('key'); setAuthError(''); }}
                  className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authTab === 'key' ? 'bg-white text-red-600 shadow-xs ring-1 ring-slate-200/80' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Khóa Bảo Mật
                </button>
              </div>

              {/* METHOD 1: GOOGLE SIGN IN */}
              {authTab === 'google' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGoogleQuickLogin(googleEmailInput);
                  }} 
                  className="space-y-4"
                >
                  {/* Google Account Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-red-600" />
                        Tài Khoản Gmail Quản Trị:
                      </span>
                      <span className="text-[11px] text-red-600 font-semibold">*Bắt buộc</span>
                    </label>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={googleEmailInput}
                      onChange={(e) => {
                        setGoogleEmailInput(e.target.value);
                        setAuthError('');
                      }}
                      placeholder="Nhập địa chỉ Gmail..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Submit Google Sign In Button */}
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-2xl font-black text-sm text-slate-800 transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{isAuthenticating ? 'ĐANG XÁC THỰC GOOGLE...' : 'ĐĂNG NHẬP VỚI GOOGLE'}</span>
                  </button>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-800 text-left">
                    <span className="font-bold">Bảo Mật Viettel:</span> Hệ thống tự động xác thực và cấp quyền quản trị cho các tài khoản Google đã đăng ký trong hệ thống.
                  </div>
                </form>
              )}

              {/* METHOD 2: SECURITY KEY */}
              {authTab === 'key' && (
                <form onSubmit={handleAdminKeyLogin} className="space-y-4">
                  {/* Admin Security Key / Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-red-600" />
                        Mật Khẩu / Khóa Bảo Mật Quản Trị:
                      </span>
                      <span className="text-[11px] text-red-600 font-semibold">*Bắt buộc</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPin ? 'text' : 'password'}
                        required
                        autoFocus
                        value={inputPin}
                        onChange={(e) => {
                          setInputPin(e.target.value);
                          setAuthError('');
                        }}
                        placeholder="Nhập mật khẩu / khóa bảo mật..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Optional Admin Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        Email Quản Trị:
                      </span>
                      <span className="text-[11px] text-slate-400">Không bắt buộc</span>
                    </label>
                    <input
                      type="email"
                      value={inputEmail}
                      onChange={(e) => {
                        setInputEmail(e.target.value);
                        setAuthError('');
                      }}
                      placeholder="Nhập email quản trị nếu có..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-black rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-red-600/25 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-yellow-300" />
                    <span>{isAuthenticating ? 'ĐANG XÁC THỰC...' : 'XÁC THỰC & MỞ BẢNG ĐIỀU KHIỂN'}</span>
                  </button>
                </form>
              )}

              {/* Error Banner */}
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-start gap-2 animate-fadeIn">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Success Banner */}
              {authSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-2xl text-left text-[11px] text-slate-500 space-y-1 border border-slate-200">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Bảo Mật & An Toàn:
                </div>
                <div>• Hỗ trợ đăng nhập nhanh bằng tài khoản Google quản trị hoặc khóa bảo mật nội bộ.</div>
                <div>• Khi đóng cửa sổ, hệ thống tự động khóa phiên làm việc ngay lập tức.</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Admin Profile Bar */}
            <div className="bg-slate-900 px-4 py-2.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-400">Đang quản trị:</span>
                <span className="font-mono font-bold text-yellow-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {adminUser.email}
                </span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded border border-emerald-800 flex items-center gap-1">
                  <Check className="w-3 h-3" /> {adminUser.authMethod === 'google' ? 'Google Auth' : 'Khóa Bảo Mật'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Đăng nhập lúc: {new Date(adminUser.loginTime).toLocaleTimeString('vi-VN')}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" /> Đăng xuất & Khóa
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-4 shrink-0 overflow-x-auto">
              <button
                id="tab-leads"
                onClick={() => setActiveTab('leads')}
                className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'leads'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Danh Sách Khách Hàng Đăng Ký ({leads.length})
              </button>
              <button
                id="tab-packages"
                onClick={() => setActiveTab('packages')}
                className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'packages'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                Quản Lý Dịch Vụ & Gói Cước ({packages.length})
              </button>
              <button
                id="tab-analytics"
                onClick={() => setActiveTab('analytics')}
                className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                Lịch Sử Khách Truy Cập & Realtime Traffic
              </button>
            </div>

            {/* Tab 1: LEADS MANAGEMENT */}
            {activeTab === 'leads' && (
              <div className="flex-1 flex flex-col min-h-0 p-4 space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên, số điện thoại, gói cước, địa chỉ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="new">Mới đăng ký</option>
                      <option value="contacted">Đã liên hệ</option>
                      <option value="surveyed">Đã khảo sát</option>
                      <option value="installed">Đã lắp đặt</option>
                      <option value="cancelled">Hủy</option>
                    </select>
                    <button
                      id="btn-clear-leads-table"
                      onClick={handleClearAllLeads}
                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Xóa toàn bộ dữ liệu đơn ảo / thử nghiệm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Dữ Liệu Ảo</span>
                    </button>
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="sm:hidden px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      XLSX
                    </button>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl">
                  {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-semibold">Chưa có đơn đăng ký nào phù hợp</p>
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-700 sticky top-0 font-bold border-b border-slate-200 z-10">
                        <tr>
                          <th className="p-3">Thời gian</th>
                          <th className="p-3">Khách hàng</th>
                          <th className="p-3">Gói cước</th>
                          <th className="p-3">Địa chỉ & Tọa độ GPS</th>
                          <th className="p-3">Trạng thái</th>
                          <th className="p-3 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 text-slate-500 whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                              <br />
                              <span className="text-[10px] text-slate-400">
                                {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-slate-900">{lead.fullName}</div>
                              <a 
                                href={`tel:${lead.phoneNumber}`} 
                                className="text-red-600 font-mono font-bold flex items-center gap-1 hover:underline mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                {lead.phoneNumber}
                              </a>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-800">{lead.serviceName}</div>
                              <div className="text-[11px] text-slate-500">
                                {lead.paymentPlan === '12months' ? 'Đóng 12T (Tặng 1T)' : lead.paymentPlan === '6months' ? 'Đóng 6T' : 'Hàng tháng'} - {lead.estimatedCost.toLocaleString('vi-VN')} đ
                              </div>
                            </td>
                            <td className="p-3 max-w-xs">
                              <div className="text-slate-800 font-medium truncate" title={lead.address}>
                                {lead.address} ({lead.province || 'Toàn quốc'})
                              </div>
                              {lead.gpsLocation ? (
                                <a
                                  href={`https://www.google.com/maps?q=${lead.gpsLocation.latitude},${lead.gpsLocation.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md hover:bg-emerald-100 transition-colors mt-0.5"
                                  title="Mở trên Google Maps"
                                >
                                  <MapPin className="w-3 h-3 text-emerald-600" />
                                  GPS: {lead.gpsLocation.latitude.toFixed(4)}, {lead.gpsLocation.longitude.toFixed(4)}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">Khách chưa cấp quyền GPS</span>
                              )}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <div className="space-y-1">
                                {getStatusBadge(lead.status)}
                                <div>
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as CustomerLead['status'])}
                                    className="text-[11px] bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                                  >
                                    <option value="new">Mới</option>
                                    <option value="contacted">Đã liên hệ</option>
                                    <option value="surveyed">Đã khảo sát</option>
                                    <option value="installed">Đã lắp đặt</option>
                                    <option value="cancelled">Hủy</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`tel:${lead.phoneNumber}`}
                                  title="Gọi ngay"
                                  className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`https://zalo.me/${lead.phoneNumber.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Mở Zalo"
                                  className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-[10px] font-bold"
                                >
                                  Zalo
                                </a>
                                <button
                                  onClick={() => handleDelete(lead.id)}
                                  title="Xóa đơn"
                                  className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: PACKAGES MANAGEMENT (CRUD) */}
            {activeTab === 'packages' && (
              <AdminPackagesManager 
                packages={packages} 
                onPackagesUpdated={onPackagesUpdated} 
              />
            )}

            {/* Tab 3: REALTIME ANALYTICS & TRAFFIC */}
            {activeTab === 'analytics' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Realtime Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                      <span>Đang Online Realtime</span>
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                      {onlineCount} người
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Cập nhật liên tục từ khách truy cập</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                      <span>Tổng Lượt Xem Trang</span>
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {totalViews.toLocaleString('vi-VN')}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Lưu lượng Google Ads & Mạng Xã Hội</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                      <span>Tổng Đơn Đăng Ký</span>
                      <CheckCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-2xl font-black text-red-600">
                      {leads.length} đơn
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Tỷ lệ chuyển đổi: {((leads.length / (totalViews || 1)) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Visitor Log Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      Lịch Sử Phiên Truy Cập Thực Tế
                    </h3>
                    <button
                      onClick={handleClearLogs}
                      className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Làm sạch lịch sử truy cập"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Lịch Sử</span>
                    </button>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Thời gian</th>
                          <th className="p-2.5">Thiết bị</th>
                          <th className="p-2.5">Nguồn truy cập</th>
                          <th className="p-2.5">Đường dẫn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {visitorLogs.slice(0, 15).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50">
                            <td className="p-2.5 text-slate-500">
                              {new Date(log.timestamp).toLocaleTimeString('vi-VN')}
                            </td>
                            <td className="p-2.5">
                              <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                                {log.device === 'mobile' ? (
                                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                                ) : (
                                  <Monitor className="w-3.5 h-3.5 text-purple-600" />
                                )}
                                {log.device === 'mobile' ? 'Điện thoại di động' : 'Máy tính để bàn'}
                              </span>
                            </td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono text-[10px]">
                                {log.source}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-600 font-mono text-[11px]">
                              {log.pageVisited}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
