import { CustomerLead, VisitorLog, TelecomPackage } from '../types';
import { PACKAGES_DATA } from '../data/packagesData';

const LEADS_STORAGE_KEY = 'viettel_customer_leads_v1';
const VISITOR_LOGS_KEY = 'viettel_visitor_logs_v1';
const VISITOR_COUNT_KEY = 'viettel_visitor_stats_v1';
const PACKAGES_STORAGE_KEY = 'viettel_custom_packages_v3';

export function getStoredPackages(): TelecomPackage[] {
  try {
    const raw = localStorage.getItem(PACKAGES_STORAGE_KEY);
    if (!raw) {
      return PACKAGES_DATA;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return PACKAGES_DATA;
    }
    return parsed;
  } catch {
    return PACKAGES_DATA;
  }
}

export function saveStoredPackages(packages: TelecomPackage[]): void {
  try {
    localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packages));
  } catch (e) {
    console.error('Error saving packages to localStorage', e);
  }
}

export function resetStoredPackages(): TelecomPackage[] {
  try {
    localStorage.removeItem(PACKAGES_STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting packages', e);
  }
  return PACKAGES_DATA;
}

export function addPackage(newPkg: TelecomPackage): TelecomPackage[] {
  const current = getStoredPackages();
  const updated = [newPkg, ...current.filter(p => p.id !== newPkg.id)];
  saveStoredPackages(updated);
  return updated;
}

export function updatePackage(pkg: TelecomPackage, oldId?: string): TelecomPackage[] {
  const current = getStoredPackages();
  const targetId = oldId || pkg.id;
  const updated = current.map(p => (p.id === targetId ? pkg : p));
  saveStoredPackages(updated);
  return updated;
}

export function deletePackage(id: string): TelecomPackage[] {
  const current = getStoredPackages();
  const updated = current.filter(p => p.id !== id);
  saveStoredPackages(updated);
  return updated;
}

export function getCustomerLeads(): CustomerLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Purge any virtual/mock data: mock IDs or masked phone numbers with '***'
    const realLeads: CustomerLead[] = parsed.filter(l => 
      l && 
      typeof l.id === 'string' && 
      !l.id.startsWith('lead-100') && 
      typeof l.phoneNumber === 'string' && 
      !l.phoneNumber.includes('***')
    );

    if (realLeads.length !== parsed.length) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(realLeads));
    }
    return realLeads;
  } catch {
    return [];
  }
}

export function clearAllLeads(): CustomerLead[] {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Error clearing leads from storage', e);
  }
  return [];
}

export function saveCustomerLead(lead: Omit<CustomerLead, 'id' | 'createdAt' | 'status'>): CustomerLead {
  const allLeads = getCustomerLeads();
  const newLead: CustomerLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const updated = [newLead, ...allLeads];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving lead to storage', e);
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: CustomerLead['status'], note?: string): CustomerLead[] {
  const allLeads = getCustomerLeads();
  const updated = allLeads.map(lead => {
    if (lead.id === id) {
      return {
        ...lead,
        status,
        note: note !== undefined ? note : lead.note
      };
    }
    return lead;
  });
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteLead(id: string): CustomerLead[] {
  const allLeads = getCustomerLeads();
  const updated = allLeads.filter(lead => lead.id !== id);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

// Track pageview
export function recordVisitor(): { totalViews: number; onlineCount: number } {
  try {
    const device = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || (document.referrer.includes('facebook') ? 'facebook_ads' : document.referrer.includes('google') ? 'google_ads' : 'direct');

    const log: VisitorLog = {
      id: `vis-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      device,
      source: utmSource,
      pageVisited: window.location.pathname
    };

    const existingLogs = getVisitorLogs();
    const updatedLogs = [log, ...existingLogs].slice(0, 100);
    localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify(updatedLogs));

    // Calculate total count (real view count)
    const totalViews = Number(localStorage.getItem(VISITOR_COUNT_KEY) || '0') + 1;
    localStorage.setItem(VISITOR_COUNT_KEY, totalViews.toString());

    return {
      totalViews,
      onlineCount: 1
    };
  } catch {
    return {
      totalViews: 1,
      onlineCount: 1
    };
  }
}

export function getVisitorLogs(): VisitorLog[] {
  try {
    const raw = localStorage.getItem(VISITOR_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getTotalViews(): number {
  try {
    return Number(localStorage.getItem(VISITOR_COUNT_KEY) || '0');
  } catch {
    return 0;
  }
}

export function clearVisitorLogs(): VisitorLog[] {
  try {
    localStorage.setItem(VISITOR_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(VISITOR_COUNT_KEY, '0');
  } catch (e) {
    console.error('Error clearing visitor logs', e);
  }
  return [];
}

// Export leads as styled .xlsx using ExcelJS with horizontal center alignment and column styling
export async function exportLeadsToExcel(leads: CustomerLead[]): Promise<void> {
  try {
    const ExcelJS = await import('exceljs');
    const { saveAs } = await import('file-saver');

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Viettel Telecom Portal';
    workbook.lastModifiedBy = 'Viettel Hotline 0966.110.357 (Mr. Tuấn)';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Danh Sách Đăng Ký', {
      views: [{ showGridLines: true }]
    });

    // Define columns
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 8 },
      { header: 'Mã Đơn', key: 'id', width: 16 },
      { header: 'Thời Gian', key: 'createdAt', width: 20 },
      { header: 'Họ Và Tên Khách Hàng', key: 'fullName', width: 26 },
      { header: 'Số Điện Thoại', key: 'phoneNumber', width: 18 },
      { header: 'Gói Cước Đăng Ký', key: 'serviceName', width: 30 },
      { header: 'Phương Án Đóng', key: 'paymentPlan', width: 22 },
      { header: 'Tạm Tính (VNĐ)', key: 'estimatedCost', width: 18 },
      { header: 'Địa Chỉ Lắp Đặt', key: 'address', width: 38 },
      { header: 'Tỉnh / Thành Phố', key: 'province', width: 20 },
      { header: 'Tọa Độ GPS (Vĩ độ, Kinh độ)', key: 'gps', width: 24 },
      { header: 'Trạng Thái Đơn', key: 'status', width: 18 },
      { header: 'Ghi Chú Yêu Cầu', key: 'note', width: 30 }
    ];

    // Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.height = 28;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE60012' } // Viettel Red
      };
      cell.font = {
        name: 'Segoe UI',
        bold: true,
        color: { argb: 'FFFFFFFF' },
        size: 11
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD4D4D8' } },
        left: { style: 'thin', color: { argb: 'FFD4D4D8' } },
        bottom: { style: 'medium', color: { argb: 'FFB91C1C' } },
        right: { style: 'thin', color: { argb: 'FFD4D4D8' } }
      };
    });

    // Populate Rows
    leads.forEach((lead, index) => {
      const planText = 
        lead.paymentPlan === '12months' 
          ? 'Đóng 12T (Tặng 1T)' 
          : lead.paymentPlan === '6months' 
            ? 'Đóng 6T' 
            : 'Hàng tháng';

      const statusText = 
        lead.status === 'new' ? 'Mới đăng ký' :
        lead.status === 'contacted' ? 'Đã liên hệ' :
        lead.status === 'surveyed' ? 'Đã khảo sát GPS' :
        lead.status === 'installed' ? 'Đã lắp đặt' : 'Hủy';

      const gpsText = lead.gpsLocation 
        ? `${lead.gpsLocation.latitude.toFixed(5)}, ${lead.gpsLocation.longitude.toFixed(5)}` 
        : 'Chưa có';

      const row = worksheet.addRow({
        stt: index + 1,
        id: lead.id,
        createdAt: new Date(lead.createdAt).toLocaleString('vi-VN'),
        fullName: lead.fullName,
        phoneNumber: lead.phoneNumber,
        serviceName: lead.serviceName,
        paymentPlan: planText,
        estimatedCost: lead.estimatedCost ? lead.estimatedCost.toLocaleString('vi-VN') : '0',
        address: lead.address || '',
        province: lead.province || 'Toàn quốc',
        gps: gpsText,
        status: statusText,
        note: lead.note || ''
      });

      row.height = 22;

      // Apply Alignments to individual cells
      row.eachCell((cell, colNumber) => {
        // Default font
        cell.font = { name: 'Segoe UI', size: 10 };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE4E4E7' } },
          left: { style: 'thin', color: { argb: 'FFE4E4E7' } },
          bottom: { style: 'thin', color: { argb: 'FFE4E4E7' } },
          right: { style: 'thin', color: { argb: 'FFE4E4E7' } }
        };

        // Columns that require exact horizontal center alignment:
        // Col 1 (STT), Col 2 (Mã Đơn), Col 3 (Thời Gian), Col 5 (Số Điện Thoại), Col 7 (Phương Án), Col 10 (Tỉnh), Col 11 (GPS), Col 12 (Trạng Thái)
        if ([1, 2, 3, 5, 7, 10, 11, 12].includes(colNumber)) {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        } else if (colNumber === 8) {
          // Estimated cost: right aligned
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
        } else {
          // Name, Service, Address, Note: left aligned
          cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        }

        // Highlight status
        if (colNumber === 12) {
          if (lead.status === 'new') {
            cell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FFDC2626' } };
          } else if (lead.status === 'installed') {
            cell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FF059669' } };
          }
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const dateStr = new Date().toISOString().split('T')[0];
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    saveAs(blob, `BaoCao_Viettel_KhachHang_${dateStr}.xlsx`);
  } catch (error) {
    console.error('Error exporting excel file with ExcelJS', error);
  }
}

