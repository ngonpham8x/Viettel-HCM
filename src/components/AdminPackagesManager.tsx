import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Layers, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw, 
  Wifi, 
  Tv, 
  Smartphone, 
  Camera, 
  Car, 
  Building2, 
  FileCheck,
  Image as ImageIcon,
  DollarSign,
  Zap,
  AlertTriangle,
  ExternalLink,
  Upload,
  Loader2
} from 'lucide-react';
import { TelecomPackage, ServiceCategory } from '../types';
import { addPackage, updatePackage, deletePackage, resetStoredPackages } from '../utils/storage';

interface AdminPackagesManagerProps {
  packages: TelecomPackage[];
  onPackagesUpdated: (packages: TelecomPackage[]) => void;
}

export const AdminPackagesManager: React.FC<AdminPackagesManagerProps> = ({
  packages,
  onPackagesUpdated
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const [formCategory, setFormCategory] = useState<ServiceCategory>('ftth_home');
  const [formSpeed, setFormSpeed] = useState('');
  const [formDataPerDay, setFormDataPerDay] = useState('');
  const [formPrice, setFormPrice] = useState<number>(180000);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(220000);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formPopular, setFormPopular] = useState(false);
  const [formHighlight, setFormHighlight] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formEquipment, setFormEquipment] = useState('');
  const [formPromotion, setFormPromotion] = useState('');
  const [formSuitableFor, setFormSuitableFor] = useState('');
  const [formImageError, setFormImageError] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categoryOptions: { id: ServiceCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'Tất Cả Gói Cước', icon: Layers },
    { id: 'ftth_home', label: 'Cáp Quang SUN', icon: Wifi },
    { id: 'ftth_mesh', label: 'Wifi Mesh STAR', icon: Layers },
    { id: 'combo_tv', label: 'Combo TV360', icon: Tv },
    { id: 'sim_data', label: 'Sim 4G/5G', icon: Smartphone },
    { id: 'camera', label: 'Camera AI & Cloud', icon: Camera },
    { id: 'epass', label: 'Thẻ ePass', icon: Car },
    { id: 'enterprise', label: 'Doanh Nghiệp', icon: Building2 },
    { id: 'digital_biz', label: 'Chữ Ký Số / HĐĐT', icon: FileCheck }
  ];

  // Filter packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.speed && pkg.speed.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pkg.badge && pkg.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg('');
    }, 3500);
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingId(null);
    const newId = `pkg_${Date.now().toString(36)}`;
    setFormId(newId);
    setFormName('');
    setFormCategory('ftth_home');
    setFormSpeed('150 Mbps');
    setFormDataPerDay('');
    setFormPrice(180000);
    setFormOriginalPrice(220000);
    setFormImageUrl('https://media.vietteltelecom.vn/upload/ckfinder/files/NETVT01T_458X345.jpg');
    setFormBadge('Mới Nhất');
    setFormPopular(false);
    setFormHighlight('Gói cước ưu đãi mới nhất từ hệ thống Viettel.');
    setFormFeatures('Tốc độ cao chuẩn cáp quang đối xứng\nTrang bị Modem Wifi 6 chính hãng\nTriển khai nhanh 24 - 48h, bảo trì trọn đời miễn phí');
    setFormEquipment('01 Modem Wifi 6 thế hệ mới');
    setFormPromotion('Đóng 6T tặng 1T, Đóng 12T tặng 2T & Miễn phí lắp đặt');
    setFormSuitableFor('Hộ gia đình, cá nhân kinh doanh');
    setFormImageError(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: TelecomPackage) => {
    setModalMode('edit');
    setEditingId(pkg.id);
    setFormId(pkg.id);
    setFormName(pkg.name);
    setFormCategory(pkg.category);
    setFormSpeed(pkg.speed || '');
    setFormDataPerDay(pkg.dataPerDay || '');
    setFormPrice(pkg.price);
    setFormOriginalPrice(pkg.originalPrice || pkg.price);
    setFormImageUrl(pkg.imageUrl || '');
    setFormBadge(pkg.badge || '');
    setFormPopular(Boolean(pkg.popular));
    setFormHighlight(pkg.highlight || '');
    setFormFeatures((pkg.features || []).join('\n'));
    setFormEquipment((pkg.equipment || []).join('\n'));
    setFormPromotion(pkg.promotion || '');
    setFormSuitableFor(pkg.suitableFor || '');
    setFormImageError(false);
    setIsModalOpen(true);
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WebP).');
      return;
    }

    setIsProcessingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 600;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setFormImageUrl(compressedDataUrl);
            setFormImageError(false);
          }
        } catch {
          setFormImageUrl(event.target?.result as string);
          setFormImageError(false);
        } finally {
          setIsProcessingImage(false);
        }
      };
      img.onerror = () => {
        setIsProcessingImage(false);
        alert('Không thể đọc file ảnh này.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageFile(file);
    e.target.value = '';
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = formId.trim().toLowerCase().replace(/\s+/g, '_');
    const cleanName = formName.trim();
    if (!cleanName || !cleanId) {
      alert('Vui lòng nhập đầy đủ Tên gói cước và Mã gói cước (ID)!');
      return;
    }

    // Check duplicate ID
    if (modalMode === 'create' && packages.some(p => p.id.toLowerCase() === cleanId)) {
      alert(`Mã gói cước "${cleanId}" đã tồn tại trên hệ thống! Vui lòng chọn mã khác.`);
      return;
    }

    if (
      modalMode === 'edit' && 
      editingId && 
      cleanId !== editingId.toLowerCase() && 
      packages.some(p => p.id.toLowerCase() === cleanId)
    ) {
      alert(`Mã gói cước "${cleanId}" đã được dùng bởi một gói khác! Vui lòng chọn mã khác.`);
      return;
    }

    const featuresArray = formFeatures
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const equipmentArray = formEquipment
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const packagePayload: TelecomPackage = {
      id: cleanId,
      name: cleanName,
      category: formCategory,
      speed: formSpeed.trim() || undefined,
      dataPerDay: formDataPerDay.trim() || undefined,
      price: Number(formPrice) || 0,
      originalPrice: Number(formOriginalPrice) || Number(formPrice) || 0,
      imageUrl: formImageUrl.trim() || undefined,
      badge: formBadge.trim() || undefined,
      popular: formPopular,
      highlight: formHighlight.trim() || undefined,
      features: featuresArray.length > 0 ? featuresArray : ['Dịch vụ chính hãng Viettel Telecom'],
      equipment: equipmentArray.length > 0 ? equipmentArray : undefined,
      promotion: formPromotion.trim() || 'Ưu đãi trả trước tặng 1-2 tháng cước',
      suitableFor: formSuitableFor.trim() || undefined
    };

    if (modalMode === 'create') {
      const updated = addPackage(packagePayload);
      onPackagesUpdated(updated);
      showNotification(`Đã thêm gói cước mới "${packagePayload.name}" (Mã: ${cleanId}) thành công!`);
    } else {
      const updated = updatePackage(packagePayload, editingId || undefined);
      onPackagesUpdated(updated);
      showNotification(`Đã cập nhật thông tin gói cước "${packagePayload.name}" (Mã: ${cleanId}) thành công!`);
    }

    setIsModalOpen(false);
  };

  const handleDeletePackage = (id: string, name: string) => {
    const updated = deletePackage(id);
    onPackagesUpdated(updated);
    setDeleteConfirmId(null);
    showNotification(`Đã xóa gói cước "${name}" khỏi danh mục!`);
  };

  const handleResetDefault = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ danh mục gói cước về mặc định gốc của Viettel không?')) {
      const resetList = resetStoredPackages();
      onPackagesUpdated(resetList);
      showNotification('Đã khôi phục toàn bộ dữ liệu gói cước về mặc định!');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 p-4 space-y-4">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn shrink-0">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shrink-0">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên gói, mã, tốc độ (SUN, STAR, 5G, Camera...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenCreate}
            className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Gói Cước Mới</span>
          </button>

          <button
            onClick={handleResetDefault}
            title="Khôi phục danh mục gói cước chuẩn Viettel"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Khôi Phục Mặc Định</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {categoryOptions.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? packages.length 
            : packages.filter(p => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-red-600'}`} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Packages Grid / Table */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">Không tìm thấy gói cước nào</h4>
            <p className="text-xs text-slate-500 mt-1">Thử thay đổi từ khóa hoặc bộ lọc danh mục.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
            {filteredPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Thumbnail Header */}
                <div className="relative h-36 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-2 overflow-hidden">
                  {pkg.imageUrl ? (
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.name} 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[11px] font-bold">Chưa có ảnh</span>
                    </div>
                  )}

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {pkg.badge && (
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-md shadow-xs uppercase">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2 right-2">
                    {pkg.popular && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-white" /> Bán chạy
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {pkg.speed || pkg.dataPerDay || pkg.category}
                  </div>
                </div>

                {/* Package Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-black text-slate-900 text-sm leading-snug line-clamp-1">
                        {pkg.name}
                      </h4>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      ID: {pkg.id}
                    </div>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-red-600 font-mono">
                        {pkg.price === 0 ? 'MIỄN PHÍ' : `${pkg.price.toLocaleString('vi-VN')} đ/tháng`}
                      </span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          {pkg.originalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                    </div>

                    {pkg.highlight && (
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {pkg.highlight}
                      </p>
                    )}

                    <div className="mt-2 text-[11px] text-slate-500">
                      • {pkg.features?.length || 0} tính năng ưu đãi
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {deleteConfirmId === pkg.id ? (
                      <div className="flex items-center gap-1.5 w-full bg-red-50 p-1.5 rounded-xl border border-red-200">
                        <span className="text-[11px] font-bold text-red-700 flex-1">Xác nhận xóa?</span>
                        <button
                          onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-yellow-300" />
                          <span>Chỉnh Sửa</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(pkg.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                          title="Xóa gói cước"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT PACKAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-rose-700 px-5 py-3.5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  {modalMode === 'create' ? <Plus className="w-5 h-5 text-yellow-300" /> : <Edit3 className="w-5 h-5 text-yellow-300" />}
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    {modalMode === 'create' ? 'Thêm Gói Cước Mới' : `Chỉnh Sửa Gói: ${formName || formId}`}
                  </h3>
                  <p className="text-[11px] text-red-100 font-medium">
                    {modalMode === 'create' ? 'Tạo mới dịch vụ hiển thị lên website' : 'Cập nhật giá, hình ảnh, thông số kỹ thuật và ưu đãi'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePackage} className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Row 1: ID & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5 text-red-600" />
                      Mã Gói (ID): <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                      Sửa được
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="ví dụ: sun1, star2, cam_hc24..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    ✓ Có thể sửa đổi mã ID gói cước tự do
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tên Gói Cước Hiển Thị: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="ví dụ: NetVT1 - Bán chạy số 1 Viettel"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Row 2: Category & Speed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Danh Mục Dịch Vụ:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-red-500"
                  >
                    <option value="ftth_home">Cáp Quang Gia Đình (SUN)</option>
                    <option value="ftth_mesh">Wifi Mesh Phủ Rộng (STAR)</option>
                    <option value="combo_tv">Combo Internet + TV360</option>
                    <option value="sim_data">Sim 4G / 5G Viettel</option>
                    <option value="camera">Camera An Ninh AI & Cloud</option>
                    <option value="epass">Dán Thẻ ePass BOT</option>
                    <option value="enterprise">Cáp Quang Doanh Nghiệp</option>
                    <option value="digital_biz">Chữ Ký Số & HĐĐT</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Băng Thông / Tốc Độ / Dung Lượng:
                  </label>
                  <input
                    type="text"
                    value={formSpeed}
                    onChange={(e) => setFormSpeed(e.target.value)}
                    placeholder="ví dụ: 250 Mbps hoặc 5 GB / Ngày"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Row 3: Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Giá Cước Ưu Đãi (VNĐ / Tháng): <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Giá Gốc Niêm Yết (VNĐ / Tháng):
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-medium text-slate-500 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Row 4: IMAGE URL WITH FILE UPLOAD, DRAG-DROP & LIVE PREVIEW */}
              <div 
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    processImageFile(file);
                  }
                }}
                className="p-3.5 bg-slate-50 hover:bg-slate-100/70 transition-colors rounded-2xl border-2 border-dashed border-slate-300 hover:border-red-400 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    <span>Hình Ảnh Đại Diện Gói Cước:</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      Có thể tải từ máy / điện thoại
                    </span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Kéo thả ảnh vào đây hoặc bấm nút đính kèm
                  </span>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => {
                      setFormImageUrl(e.target.value);
                      setFormImageError(false);
                    }}
                    placeholder="Dán link ảnh https://... hoặc chọn ảnh từ máy bên cạnh ->"
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-red-500"
                  />

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={isProcessingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingImage ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Đang nén ảnh...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>📁 Chọn Ảnh Từ Máy</span>
                        </>
                      )}
                    </button>

                    {formImageUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormImageUrl('');
                          setFormImageError(false);
                        }}
                        className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="Xóa ảnh hiện tại"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Image Preview */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-32 h-24 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-1.5 overflow-hidden shrink-0 shadow-2xs">
                    {formImageUrl && !formImageError ? (
                      <img
                        src={formImageUrl}
                        alt="Xem trước"
                        onError={() => setFormImageError(true)}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-[10px] text-slate-400 text-center font-bold">
                        {formImageError ? 'Lỗi tải ảnh' : 'Chưa có ảnh'}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>Khung xem trước trực tiếp</span>
                      {formImageUrl?.startsWith('data:') && (
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md">
                          Đã đính kèm ảnh từ máy
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Bạn có thể chọn bất kỳ ảnh chụp thiết bị, banner khuyến mại hoặc ảnh chụp từ máy tính/điện thoại. Hệ thống sẽ tự động nén & tối ưu hóa hiển thị.
                    </p>
                  </div>
                </div>

                {/* Quick Presets for Official Viettel Images */}
                <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="text-slate-400 font-bold self-center">Chọn nhanh mẫu:</span>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/ckfinder/files/NETVT01T_458X345.jpg'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Router Wifi 6 (NetVT1)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20NETVT2_T.jpg'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Cáp Quang 1Gbps (NetVT2)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT1_T.jpg'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Bộ 2 Mesh WiFi 6 (MeshVT1)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT2_T.jpg'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Bộ 3 Mesh WiFi 6 (MeshVT2)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/0f/e9/90/464da122846223c05d22f6c19370d663dda65853.jpg'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Sim 5G Viettel
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormImageUrl('https://media.vietteltelecom.vn/upload/vtDevice/76/fa/a7/77423bee937ffd83aa44a5b626f65150b5aa2bf1.png'); setFormImageError(false); }}
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 cursor-pointer"
                  >
                    Camera AI HC25 2K
                  </button>
                </div>
              </div>

              {/* Row 5: Badge & Popular */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nhãn Nổi Bật (Badge):
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="ví dụ: Tiết Kiệm Nhất, Phổ Biến Nhất..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="chk-popular"
                    checked={formPopular}
                    onChange={(e) => setFormPopular(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                  />
                  <label htmlFor="chk-popular" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Đánh dấu là gói Bán chạy / Nổi bật
                  </label>
                </div>
              </div>

              {/* Row 6: Highlight */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mô Tả Điểm Nhấn (Highlight ngắn):
                </label>
                <input
                  type="text"
                  value={formHighlight}
                  onChange={(e) => setFormHighlight(e.target.value)}
                  placeholder="ví dụ: Băng thông lớn 250 Mbps, xem phim 4K không giật lag, chơi game ping thấp."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Row 7: Features */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Chi Tiết Ưu Đãi (Mỗi dòng là một gạch đầu dòng):
                </label>
                <textarea
                  rows={3}
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="Tốc độ tải xuống/tải lên: 250 Mbps cực mạnh&#10;Trang bị Modem Wifi 6 AX3000 thế hệ mới nhất&#10;Đáp ứng 5 - 10 thiết bị truy cập đồng thời"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 font-sans"
                />
              </div>

              {/* Row 8: Equipment & Promotion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Thiết Bị Trang Bị (Mỗi dòng 1 thiết bị):
                  </label>
                  <textarea
                    rows={2}
                    value={formEquipment}
                    onChange={(e) => setFormEquipment(e.target.value)}
                    placeholder="1 Modem Wifi 6 chính&#10;2 Thiết bị Mesh Wifi 6"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Chính Sách Khuyến Mãi (Bonus):
                  </label>
                  <textarea
                    rows={2}
                    value={formPromotion}
                    onChange={(e) => setFormPromotion(e.target.value)}
                    placeholder="Đóng 6T tặng 1T, Đóng 12T tặng 2T & MIỄN PHÍ 100% hòa mạng."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 font-sans"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md shadow-red-600/20 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{modalMode === 'create' ? 'Tạo Gói Cước Mới' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
