export type ServiceCategory = 
  | 'all' 
  | 'ftth_home' 
  | 'ftth_mesh' 
  | 'combo_tv' 
  | 'sim_data' 
  | 'epass' 
  | 'camera' 
  | 'enterprise'
  | 'digital_biz';

export interface TelecomPackage {
  id: string;
  name: string;
  category: ServiceCategory;
  speed?: string;
  price: number; // monthly price in VND
  originalPrice?: number;
  badge?: string;
  popular?: boolean;
  highlight?: string;
  imageUrl?: string;
  iconUrl?: string;
  features: string[];
  equipment: string[];
  promotion: string;
  suitableFor: string;
  dataPerDay?: string;
  totalData?: string;
  callBonus?: string;
}

export interface CustomerLead {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceName: string;
  serviceId: string;
  paymentPlan: 'monthly' | '6months' | '12months';
  estimatedCost: number;
  note?: string;
  address: string;
  province?: string;
  district?: string;
  ward?: string;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    addressText?: string;
  };
  utmSource?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'surveyed' | 'installed' | 'cancelled';
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  source: string;
  city?: string;
  pageVisited: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
