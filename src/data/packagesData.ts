import { TelecomPackage, FAQItem } from '../types';

export const VIETTEL_CONTACT = {
  phone: '0966110357',
  displayPhone: '0966.110.357',
  consultantName: 'Huỳnh Tấn Tuấn - Quản Lý Tư Vấn Viettel',
  zaloUrl: 'https://zalo.me/0966110357',
  zaloNumber: '0966110357',
  techSupportHotline: '1800 8119', // Tổng đài Báo hỏng & Hỗ trợ Kỹ thuật Internet/Truyền hình (Miễn phí 24/7)
  customerCareHotline: '1800 8098', // Tổng đài Chăm sóc khách hàng & Di động (Miễn phí 24/7)
  epassHotline: '1900 9080', // Tổng đài Thu phí tự động không dừng ePass
  enterpriseHotline: '1800 8000', // Tổng đài Doanh nghiệp Viettel (Nhánh 1)
  officeAddress: 'Hệ thống Cửa hàng Viettel Telecom Toàn Quốc (Hỗ trợ lắp đặt 63 Tỉnh Thành)',
  workingHours: '24/7 (Cả Thứ 7, Chủ Nhật & Ngày Lễ)',
  email: 'cskh.vietteltelecom@viettel.com.vn',
  facebookFanpage: 'https://facebook.com/vietteltelecom'
};

export interface CameraDevice {
  id: string;
  name: string;
  model: string;
  type: 'indoor' | 'outdoor';
  price: number;
  originalPrice: number;
  badge: string;
  image: string;
  resolution: string;
  features: string[];
  specs: {
    lens: string;
    rotation?: string;
    irRange: string;
    waterproof?: string;
    connection: string;
    storage: string;
  };
  highlight: string;
  officialLink: string;
}

export const OFFICIAL_CAMERA_DEVICES: CameraDevice[] = [
  {
    id: 'hc25',
    name: 'Camera Trong Nhà HC25',
    model: 'HC25 + Gói Cloud (12 Tháng)',
    type: 'indoor',
    price: 670000,
    originalPrice: 850000,
    badge: 'Thế Hệ Mới 2K',
    image: 'https://media.vietteltelecom.vn/upload/vtDevice/76/fa/a7/77423bee937ffd83aa44a5b626f65150b5aa2bf1.png',
    resolution: '3 MP (2304 × 1296) 2K Siêu Nét',
    highlight: 'Hỗ trợ góc xoay dọc 180°, mở rộng phạm vi trần nhà, WDR cân bằng chống ngược sáng và bộ nhớ đệm lưu offline.',
    features: [
      'Công nghệ WDR chống ngược sáng tối ưu hình ảnh sắc nét',
      'Xoay ngang 355 độ, xoay dọc 180 độ không điểm mù',
      'AI nhận diện con người & báo động âm thanh bất thường',
      'Đàm thoại 2 chiều trực tiếp qua ứng dụng Viettel Home',
      'Tích hợp bộ nhớ đệm 1 ngày, tự động đẩy lên Cloud khi có mạng'
    ],
    specs: {
      lens: '4.0 mm, cảm biến 1/3" 3MP CMOS',
      rotation: 'Xoay ngang 355°, dọc 180°',
      irRange: '10m hồng ngoại ban đêm',
      connection: 'Wi-Fi 2.4GHz + Bluetooth',
      storage: 'Cloud Viettel, thẻ MicroSD ≤ 256GB'
    },
    officialLink: 'https://viettel.vn/vx/internet-truyenhinh/camera'
  },
  {
    id: 'hc24',
    name: 'Camera Trong Nhà HC24',
    model: 'HC24 + Gói Cloud (12 Tháng)',
    type: 'indoor',
    price: 670000,
    originalPrice: 850000,
    badge: 'Xoay 360° 2K',
    image: 'https://media.vietteltelecom.vn/upload/vtDevice/1a/9c/c1/df871c594780d0d6f378a509acef87998cdb39bd.png',
    resolution: '3 MP (2304 × 1296) 2K',
    highlight: 'Thiết kế tối giản sang trọng, xoay 360 độ góc rộng, đàm thoại 2 chiều, quản lý tiện lợi trên điện thoại.',
    features: [
      'Độ phân giải 3 MP 2K sắc nét từng chi tiết',
      'Góc xoay ngang 355°, dọc 160° bao quát căn phòng',
      'Theo dõi thông minh và cảnh báo chuyển động lạ',
      'Đàm thoại 2 chiều to rõ, lọc tiếng ồn',
      'Dữ liệu lưu trữ máy chủ Viettel bảo mật tuyệt đối'
    ],
    specs: {
      lens: '4.0 mm, cảm biến 1/3" CMOS',
      rotation: 'Xoay ngang 355°, dọc 160°',
      irRange: '10m ban đêm',
      connection: 'Wi-Fi 2.4GHz + Bluetooth',
      storage: 'Cloud Viettel, thẻ MicroSD ≤ 256GB'
    },
    officialLink: 'https://viettel.vn/vx/internet-truyenhinh/camera'
  },
  {
    id: 'hc34',
    name: 'Camera Ngoài Trời HC34',
    model: 'HC34 + Gói Cloud (12 Tháng)',
    type: 'outdoor',
    price: 870000,
    originalPrice: 1100000,
    badge: 'Kháng Nước IP67',
    image: 'https://media.vietteltelecom.vn/upload/vtDevice/55/be/e5/e931c0fc676bcafdc601eb7dbe4b7b12db5db4f0.png',
    resolution: '3 MP (2304 × 1296) 2K',
    highlight: 'Camera ngoài trời thế hệ mới nhất, kháng bụi nước IP67, AI nhận diện người, đèn rọi ban đêm có màu sắc nét.',
    features: [
      'Kháng nước & kháng bụi chuẩn công nghiệp IP67',
      'Đèn Spotlight hỗ trợ quan sát ban đêm có màu',
      'AI phân biệt chính xác người và vật thể, tránh báo ảo',
      'Tích hợp còi hú âm lượng lớn cảnh báo chống trộm',
      'Kết nối đa dạng: Wi-Fi, cáp mạng LAN, Bluetooth'
    ],
    specs: {
      lens: '4.0 mm, cảm biến 1/2.8" 3MP CMOS',
      waterproof: 'Chuẩn IP67 chống chịu thời tiết',
      irRange: '30m hồng ngoại ban đêm',
      connection: 'Wi-Fi 2.4GHz + LAN RJ45 + Bluetooth',
      storage: 'Cloud Viettel, thẻ MicroSD ≤ 256GB'
    },
    officialLink: 'https://viettel.vn/vx/internet-truyenhinh/camera'
  },
  {
    id: 'hc33',
    name: 'Camera Ngoài Trời HC33 3M',
    model: 'HC33 3M + Gói Cloud (12 Tháng)',
    type: 'outdoor',
    price: 870000,
    originalPrice: 1100000,
    badge: 'Hồng Ngoại 30M',
    image: 'https://media.vietteltelecom.vn/upload/vtDevice/a8/e1/1a/5ace7d9f09a47bbdc6ef5a352ef70751ef547ed0.png',
    resolution: '3 MP (2304 × 1296) 2K',
    highlight: 'Ống kính tiêu cự 3.8mm @F1.6 góc siêu rộng, tầm xa hồng ngoại 30m trong đêm, còi báo động thông minh.',
    features: [
      'Cảm biến ảnh 1/2.8" CMOS chất lượng cao',
      'Góc nhìn rộng chéo D 102°, ngang H 85.8°',
      'Tầm nhìn xa hồng ngoại 30m rõ nét trong bóng tối',
      'Vỏ kim loại kết hợp nhựa cao cấp chịu nhiệt -20°C ~ 50°C',
      'Đàm thoại 2 chiều và báo động còi hú'
    ],
    specs: {
      lens: '3.8 mm @F1.6',
      waterproof: 'Chuẩn IP67 chống mưa bão',
      irRange: '30m ban đêm',
      connection: 'Wi-Fi 2.4GHz + LAN RJ45',
      storage: 'Cloud Viettel, thẻ MicroSD ≤ 256GB'
    },
    officialLink: 'https://viettel.vn/vx/internet-truyenhinh/camera'
  }
];

export const PACKAGES_DATA: TelecomPackage[] = [
  // ==========================================
  // 1. GÓI CƠ BẢN (NETVT - PHÒNG TRỌ, NHÀ NHỎ CẤP 4)
  // ==========================================
  {
    id: 'netvt1_xa',
    name: 'NetVT1 (Khu Vực Xã) - 300 Mbps',
    category: 'ftth_home',
    speed: '300 Mbps (300MB)',
    price: 195000,
    originalPrice: 240000,
    badge: 'Khu Vực Xã 195K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/files/NETVT01T_458X345.jpg',
    highlight: 'Gói cơ bản phù hợp phòng trọ, nhà nhỏ cấp 4 (1 - 4 thiết bị kết nối mượt mà).',
    features: [
      'Băng thông: 300 Mbps (300MB) đối xứng tải lên / tải xuống',
      'Trang bị 01 Modem ONT WiFi 6 hai băng tần thế hệ mới',
      'Hạ tầng cáp quang GPON ổn định cao không suy hao',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Bảng giá đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 hai băng tần thế hệ mới'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Phòng trọ, nhà nhỏ cấp 4, sinh viên, người độc thân, 1 - 4 thiết bị'
  },
  {
    id: 'netvt1_phuong',
    name: 'NetVT1 (Khu Vực Phường) - 300 Mbps',
    category: 'ftth_home',
    speed: '300 Mbps (300MB)',
    price: 235000,
    originalPrice: 280000,
    badge: 'Nội Thành 300M',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/files/NETVT01T_458X345.jpg',
    highlight: 'Gói cước 300 Mbps khu vực phường/nội thành, trang bị Modem WiFi 6 chính hãng.',
    features: [
      'Băng thông: 300 Mbps cực nhanh, lướt web học tập không gián đoạn',
      'Trang bị 01 Modem ONT WiFi 6 công nghệ cao',
      'Hạ tầng cáp quang GPON & XGS-PON hiện đại',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Bảng giá đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 hai băng tần'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Cá nhân, hộ gia đình nhỏ tại khu vực phường, quận nội thành'
  },
  {
    id: 'netvt2_xa',
    name: 'NetVT2 (Khu Vực Xã) - Up to 1 Gbps',
    category: 'ftth_home',
    speed: '500 Mbps ~ 1 Gbps',
    price: 240000,
    originalPrice: 300000,
    badge: 'Bán Chạy Nhất ⭐',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20NETVT2_T.jpg',
    highlight: 'Băng thông siêu tốc 500MB đến 1GB (1.000 Mbps), đáp ứng 5 - 12 thiết bị cùng lúc.',
    features: [
      'Băng thông: Mở rộng cực đại lên đến 1 Gbps (1.000 Mbps)',
      'Trang bị 01 Modem ONT WiFi 6 Gigabit hai băng tần',
      'Xem phim 4K/8K không gián đoạn, tối ưu ping thấp cho Game thủ',
      'Hạ tầng GPON & XGS-PON chuẩn quốc tế',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước'
    ],
    equipment: ['1 Modem ONT WiFi 6 Gigabit tốc độ cao'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình 4 - 8 người, nhà phố, livestream bán hàng, chơi game'
  },
  {
    id: 'netvt2_phuong',
    name: 'NetVT2 (Khu Vực Phường) - Up to 1 Gbps',
    category: 'ftth_home',
    speed: '500 Mbps ~ 1 Gbps',
    price: 265000,
    originalPrice: 330000,
    badge: 'Siêu Tốc 1Gbps Phường',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20NETVT2_T.jpg',
    highlight: 'Tốc độ 1 Gbps cực mạnh khu vực phường/nội thành, kết nối đa thiết bị siêu mượt.',
    features: [
      'Tốc độ tải xuống/tải lên: 500 Mbps đến 1 Gbps (1.000 Mbps)',
      'Trang bị 01 Modem ONT WiFi 6 cao cấp',
      'Hạ tầng GPON & XGS-PON tân tiến nhất',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 Gigabit băng tần kép'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình đông người, nhà phố nội thành, bán hàng online, streamer'
  },

  // ==========================================
  // 2. GÓI NÂNG CAO KÈM MESH WIFI (MESHVT - NHÀ RỘNG, NHIỀU LẦU, CAFE, DÃY TRỌ)
  // ==========================================
  {
    id: 'meshvt1_xa',
    name: 'MeshVT1 (Khu Vực Xã) - 2 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: '300 Mbps (2 Thiết Bị WiFi 6)',
    price: 210000,
    originalPrice: 270000,
    badge: 'Mesh 2 Thiết Bị 210K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT1_T.jpg',
    highlight: 'Trang bị 02 thiết bị WiFi 6 (1 ONT WiFi 6 + 1 Mesh WiFi 6) phủ sóng đều mọi góc.',
    features: [
      'Băng thông: 300 Mbps (300MB) đối xứng siêu tốc',
      'Trang bị 02 Modem WiFi 6: 1 ONT WiFi 6 + 1 Mesh WiFi 6 khuếch đại',
      'Chuyển vùng thông minh (Seamless Roaming) di chuyển không rớt mạng',
      'Phủ sóng xuyên tường, xóa bỏ hoàn toàn điểm chết WiFi',
      'Hạ tầng GPON & XGS-PON (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 chính', '1 Thiết bị Mesh WiFi 6 phụ khuếch đại'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà rộng, nhà 2 tầng, chung cư 2 phòng ngủ diện tích 70 - 100m²'
  },
  {
    id: 'meshvt1_phuong',
    name: 'MeshVT1 (Khu Vực Phường) - 2 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: '300 Mbps (2 Thiết Bị WiFi 6)',
    price: 255000,
    originalPrice: 310000,
    badge: 'Mesh Phường 255K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT1_T.jpg',
    highlight: 'Trọn bộ 02 Modem WiFi 6 khu vực phường, phủ sóng đa phòng không góc chết.',
    features: [
      'Tốc độ ổn định 300 Mbps chuẩn cáp quang đối xứng',
      'Trang bị 02 thiết bị WiFi 6 (1 ONT WiFi 6 + 1 Mesh WiFi 6)',
      'Phủ sóng mạnh mẽ nhà phố 2 - 3 tầng nội thành',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6', '1 Thiết bị Mesh WiFi 6 phụ'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà phố 2 tầng, căn hộ chung cư khu vực nội thành'
  },
  {
    id: 'meshvt2_xa',
    name: 'MeshVT2 (Khu Vực Xã) - 3 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: 'Up to 1 Gbps (3 Thiết Bị WiFi 6)',
    price: 245000,
    originalPrice: 320000,
    badge: 'Khuyên Dùng Nhất ⭐',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT2_T.jpg',
    highlight: 'Trang bị 03 thiết bị WiFi 6 (1 ONT + 2 Mesh) phủ sóng xuyên 3 tầng lầu.',
    features: [
      'Băng thông: 500 Mbps đến 1 Gbps (Up to 1Gbps) cực mạnh',
      'Trang bị 03 Modem WiFi 6: 1 ONT WiFi 6 + 2 Mesh WiFi 6',
      'Đáp ứng 20 - 40 thiết bị truy cập mượt mà cùng lúc',
      'Phủ sóng xuyên tầng lầu, sân vườn, xóa tan điểm chết',
      'Hạ tầng GPON & XGS-PON tân tiến (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 chính', '2 Thiết bị Mesh WiFi 6 khuếch đại xuyên tầng'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà rộng, nhà 3 - 4 tầng, quán cafe, nhà trọ, hộ kinh doanh'
  },
  {
    id: 'meshvt2_phuong',
    name: 'MeshVT2 (Khu Vực Phường) - 3 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: 'Up to 1 Gbps (3 Thiết Bị WiFi 6)',
    price: 289000,
    originalPrice: 360000,
    badge: '3 Node WiFi 6 Phường',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT2_T.jpg',
    highlight: 'Bộ 03 thiết bị WiFi 6 băng thông 1Gbps phủ kín toàn bộ nhà phố nhiều tầng nội thành.',
    features: [
      'Tốc độ 500MB/1GB siêu nhanh không giới hạn',
      'Trang bị 3 thiết bị WiFi 6: 1 ONT + 2 Node Mesh',
      'Chịu tải cao 25 - 45 thiết bị (Điện thoại, Smart TV, Camera, PC)',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 chính', '2 Thiết bị Mesh WiFi 6 xuyên tầng'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà phố 3 - 5 tầng, biệt thự, văn phòng công ty, quán ăn'
  },
  {
    id: 'meshvt3_xa',
    name: 'MeshVT3 (Khu Vực Xã) - 4 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: 'Up to 1 Gbps (4 Thiết Bị WiFi 6)',
    price: 299000,
    originalPrice: 390000,
    badge: 'Siêu Mesh 4 Thiết Bị',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT3_T.jpg',
    highlight: 'Trọn bộ 04 thiết bị WiFi 6 cao cấp phủ sóng diện tích lớn, biệt thự, nhà nhiều lầu.',
    features: [
      'Băng thông: Tối đa 1.000 Mbps (1 Gbps) cực đại',
      'Trang bị 04 Modem WiFi 6: 1 ONT WiFi 6 + 3 Mesh WiFi 6',
      'Phủ sóng toàn diện khuôn viên rộng, biệt thự, nhà vườn, quán cafe lớn',
      'Chịu tải 40 - 70 thiết bị cùng lúc không suy hao',
      'Hạ tầng GPON & XGS-PON thế hệ mới (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 chính', '3 Thiết bị Mesh WiFi 6 cao cấp'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà rộng, nhiều lầu, quán cafe lớn, dãy trọ đông người, biệt thự'
  },
  {
    id: 'meshvt3_phuong',
    name: 'MeshVT3 (Khu Vực Phường) - 4 Modem WiFi 6',
    category: 'ftth_mesh',
    speed: 'Up to 1 Gbps (4 Thiết Bị WiFi 6)',
    price: 359000,
    originalPrice: 450000,
    badge: 'VIP Siêu Phủ Sóng',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT_458x345-%20MESHVT3_T.jpg',
    highlight: 'Giải pháp WiFi 6 toàn diện 4 thiết bị cao cấp nhất cho biệt thự lớn, nhà hàng, homestay.',
    features: [
      'Tốc độ 1 Gbps cao nhất thị trường viễn thông',
      'Trang bị 4 thiết bị WiFi 6 (1 ONT + 3 Node Mesh)',
      'Hỗ trợ hơn 60+ kết nối ổn định đồng thời',
      'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước',
      'Phí hòa mạng 300.000đ (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 chính', '3 Thiết bị Mesh WiFi 6 cao cấp'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Biệt thự sang trọng, homestay, nhà nghỉ, văn phòng nhiều tầng'
  },

  // ==========================================
  // 3. GÓI COMBO INTERNET + TRUYỀN HÌNH TV360 (BẢNG GIÁ THÁNG 8/2026)
  // ==========================================
  {
    id: 'combo_netvt1_app_xa',
    name: 'Combo NetVT1 + TV360 Giải Trí (App Smart TV)',
    category: 'combo_tv',
    speed: '300 Mbps + 140+ Kênh TV360',
    price: 215000,
    originalPrice: 270000,
    badge: 'Combo Tiết Kiệm 215K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(APP)%2C.jpg',
    highlight: 'Internet 300 Mbps + Xem 140+ kênh truyền hình HD đặc sắc trực tiếp trên Smart TV.',
    features: [
      'Internet cáp quang 300 Mbps WiFi 6 siêu tốc',
      'Truyền hình TV360 Gói Giải Trí với hơn 140 kênh HD trong nước & quốc tế',
      'Kho phim HD bom tấn, VOD phong phú cập nhật mỗi ngày',
      'Cài đặt trực tiếp trên Smart TV hoặc ứng dụng TV360 trên điện thoại',
      'Giá Xã: 215.000đ/tháng | Phường: 255.000đ/tháng (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 hai băng tần', 'Tài khoản TV360 VIP cài trên Smart TV'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình đã có Smart TV kết nối mạng sẵn'
  },
  {
    id: 'combo_netvt1_box_xa',
    name: 'Combo NetVT1 + Đầu Thu Box TV 4K Giọng Nói',
    category: 'combo_tv',
    speed: '300 Mbps + Box 4K Giọng Nói',
    price: 235000,
    originalPrice: 300000,
    badge: 'Tặng Box 4K Giọng Nói',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Internet 300 Mbps + Đầu thu Android TV Box 4K có điều khiển giọng nói tiếng Việt.',
    features: [
      'Internet 300 Mbps tốc độ cao ổn định',
      'Trang bị Đầu thu Android Box 4K biến mọi tivi thường thành Smart TV',
      'Điều khiển tìm kiếm bằng Giọng Nói tiếng Việt siêu nhạy (Youtube, Kênh TV)',
      'Hơn 140 kênh truyền hình HD + Youtube không giật lag',
      'Giá Xã: 235.000đ/tháng | Phường: 275.000đ/tháng (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6', '1 Đầu thu TV Box 4K Viettel + Điều khiển giọng nói'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình dùng tivi thường cần biến thành Smart TV, người già, trẻ nhỏ'
  },
  {
    id: 'combo_netvt2_app_xa',
    name: 'Combo NetVT2 + TV360 Giải Trí (App Smart TV)',
    category: 'combo_tv',
    speed: 'Up to 1 Gbps + 140+ Kênh TV360',
    price: 260000,
    originalPrice: 330000,
    badge: '1Gbps + Smart TV App',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(APP)%2C.jpg',
    highlight: 'Internet 1 Gbps siêu nhanh + Truyền hình TV360 Giải Trí cài trên Smart TV.',
    features: [
      'Internet tốc độ cao 500 Mbps đến 1 Gbps (1.000 Mbps)',
      'Trang bị 01 Modem ONT WiFi 6 Gigabit',
      'Xem hơn 140 kênh truyền hình chuẩn HD',
      'Giá Xã: 260.000đ/tháng | Phường: 285.000đ/tháng (Đã gồm 10% VAT)',
      'Đóng 12 tháng tặng 1 tháng sử dụng (Phí lắp đặt 300.000đ)'
    ],
    equipment: ['1 Modem ONT WiFi 6 Gigabit', 'Tài khoản TV360 cài Smart TV'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình đông người có sẵn Smart TV cần đường truyền siêu tốc'
  },
  {
    id: 'combo_netvt2_box_xa',
    name: 'Combo NetVT2 + Đầu Thu Box TV 4K Giọng Nói',
    category: 'combo_tv',
    speed: 'Up to 1 Gbps + Box TV 4K',
    price: 280000,
    originalPrice: 360000,
    badge: 'Bán Chạy Số 1 Combo ⭐',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Combo đỉnh cao: Mạng cực nhanh 1 Gbps WiFi 6 + Đầu thu Box 4K giọng nói tiếng Việt.',
    features: [
      'Internet cực nhanh lên tới 1 Gbps (1.000 Mbps) WiFi 6',
      'Trang bị Đầu thu Android Box 4K tìm kiếm Youtube bằng giọng nói',
      'Hơn 140 kênh truyền hình HD, thể thao đỉnh cao, kho phim cập nhật',
      'Tua xem lại chương trình trong vòng 7 ngày',
      'Giá Xã: 280.000đ/tháng | Phường: 305.000đ/tháng (Đã gồm 10% VAT)'
    ],
    equipment: ['1 Modem ONT WiFi 6 Gigabit', '1 Đầu thu TV Box 4K + Điều khiển giọng nói'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Hộ gia đình hiện đại, trải nghiệm mạng 1Gbps và xem truyền hình 4K thông minh'
  },
  {
    id: 'combo_meshvt1_box_xa',
    name: 'Combo MeshVT1 + 2 Modem WiFi 6 + Box TV 4K',
    category: 'combo_tv',
    speed: '300 Mbps (2 WiFi 6) + Box 4K',
    price: 250000,
    originalPrice: 330000,
    badge: 'Mesh Xuyên Tầng + TV 4K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Mạng Mesh 300 Mbps phủ sóng 2 tầng + Đầu thu TV Box 4K giọng nói tiếng Việt.',
    features: [
      'Tốc độ 300 Mbps chuẩn cáp quang đối xứng',
      'Trang bị 02 thiết bị WiFi 6 (1 ONT + 1 Mesh) phủ khắp căn nhà',
      '01 Đầu thu Android Box 4K điều khiển bằng giọng nói',
      'Hơn 140 kênh truyền hình HD + Youtube mượt mà',
      'Giá Xã: 250.000đ/tháng | Phường: 295.000đ/tháng (App: Xã 230K, Phường 275K)'
    ],
    equipment: ['1 Modem ONT WiFi 6', '1 Thiết bị Mesh WiFi 6', '1 Đầu thu TV Box 4K'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà tầng, chung cư vừa cần phủ sóng WiFi đều vừa xem truyền hình 4K'
  },
  {
    id: 'combo_meshvt2_box_xa',
    name: 'Combo MeshVT2 + 3 Modem WiFi 6 + Box TV 4K',
    category: 'combo_tv',
    speed: 'Up to 1 Gbps (3 WiFi 6) + Box 4K',
    price: 285000,
    originalPrice: 380000,
    badge: 'Siêu Mesh 3 Node + Box 4K',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Trọn bộ 03 thiết bị WiFi 6 phủ sóng 3 - 4 tầng + Đầu thu Box TV 4K giọng nói.',
    features: [
      'Băng thông mở rộng 1 Gbps cực đại',
      'Trang bị 03 thiết bị WiFi 6 (1 ONT + 2 Mesh) xuyên tầng',
      'Đầu thu TV Box 4K giọng nói tiếng Việt',
      'Đáp ứng đồng thời 30+ thiết bị và xem truyền hình 4K siêu nét',
      'Giá Xã: 285.000đ/tháng | Phường: 329.000đ/tháng (App: Xã 265K, Phường 309K)'
    ],
    equipment: ['1 Modem ONT WiFi 6', '2 Thiết bị Mesh WiFi 6', '1 Đầu thu TV Box 4K'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà phố 3 - 4 tầng, biệt thự, hộ kinh doanh gia đình'
  },
  {
    id: 'combo_meshvt3_box_xa',
    name: 'Combo MeshVT3 + 4 Modem WiFi 6 + Box TV 4K',
    category: 'combo_tv',
    speed: 'Up to 1 Gbps (4 WiFi 6) + Box 4K',
    price: 339000,
    originalPrice: 440000,
    badge: 'VIP Mesh 4 Node + TV 4K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Bộ 04 thiết bị WiFi 6 cao cấp + Đầu thu TV Box 4K phủ sóng toàn diện biệt thự.',
    features: [
      'Tốc độ 1 Gbps không giới hạn',
      'Trang bị 4 thiết bị WiFi 6 (1 ONT + 3 Mesh)',
      'Đầu thu Box 4K giọng nói thông minh',
      'Giá Xã: 339.000đ/tháng | Phường: 399.000đ/tháng (App: Xã 319K, Phường 379K)',
      'Đã bao gồm 10% VAT'
    ],
    equipment: ['1 Modem ONT WiFi 6', '3 Thiết bị Mesh WiFi 6', '1 Đầu thu TV Box 4K'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Biệt thự rộng nhiều lầu, homestay, quán cafe sân vườn'
  },
  {
    id: 'combo_dangcap_netvt1_box',
    name: 'Combo Đẳng Cấp NetVT1 + Đầu Thu Box 4K VIP',
    category: 'combo_tv',
    speed: '300 Mbps + Kênh Đẳng Cấp VIP',
    price: 275000,
    originalPrice: 350000,
    badge: 'Gói Đẳng Cấp VIP ⭐',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Gói Truyền hình Đẳng Cấp: Full thể thao quốc tế đỉnh cao, phim điện ảnh bản quyền + 300 Mbps WiFi 6.',
    features: [
      'Internet 300 Mbps WiFi 6 thế hệ mới',
      'Gói Truyền hình Đẳng Cấp TV360: Xem đầy đủ bóng đá quốc tế, Cúp C1, Ngoại Hạng Anh, phim bom tấn',
      'Đầu thu Android TV Box 4K giọng nói tiếng Việt',
      'Giá Xã: 275.000đ/tháng | Phường: 315.000đ/tháng (App: Xã 245K, Phường 285K)',
      'Đã bao gồm 10% VAT'
    ],
    equipment: ['1 Modem ONT WiFi 6', '1 Đầu thu TV Box 4K Viettel VIP'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Khán giả mê bóng đá đỉnh cao, phim điện ảnh chiếu rạp bản quyền'
  },
  {
    id: 'combo_dangcap_meshvt1_box',
    name: 'Combo Đẳng Cấp MeshVT1 + 2 WiFi 6 + Box TV 4K',
    category: 'combo_tv',
    speed: '300 Mbps (2 WiFi 6) + TV Đẳng Cấp',
    price: 290000,
    originalPrice: 380000,
    badge: 'Mesh + TV Đẳng Cấp',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Mạng Mesh 300 Mbps với 2 thiết bị WiFi 6 + Gói kênh Đẳng Cấp bóng đá thể thao.',
    features: [
      'Mạng Mesh 300 Mbps phủ sóng đa phòng',
      'Trang bị 02 thiết bị WiFi 6 (1 ONT + 1 Mesh)',
      'Gói truyền hình Đẳng Cấp TV360 bản quyền',
      'Đầu thu Android Box 4K điều khiển giọng nói',
      'Giá Xã: 290.000đ/tháng | Phường: 335.000đ/tháng (App: Xã 260K, Phường 305K)'
    ],
    equipment: ['1 Modem ONT WiFi 6', '1 Thiết bị Mesh WiFi 6', '1 Đầu thu TV Box 4K VIP'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Gia đình nhà tầng yêu thích thể thao đỉnh cao và phim rạp bản quyền'
  },
  {
    id: 'combo_dangcap_meshvt2_box',
    name: 'Combo Đẳng Cấp MeshVT2 + 3 WiFi 6 + Box TV 4K',
    category: 'combo_tv',
    speed: 'Up to 1 Gbps (3 WiFi 6) + TV Đẳng Cấp',
    price: 325000,
    originalPrice: 420000,
    badge: 'VIP Siêu Tốc & Đẳng Cấp',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20COMBO_458x345-%20MESHVT1_H-GI%E1%BA%A2I%20TR%C3%8D%20(BOX).jpg',
    highlight: 'Combo cao cấp nhất: 1 Gbps với 3 thiết bị WiFi 6 + Gói truyền hình Đẳng Cấp + Box 4K.',
    features: [
      'Tốc độ 1 Gbps cực đại với 3 thiết bị WiFi 6 xuyên tầng',
      'Gói kênh Đẳng Cấp TV360 full thể thao, điện ảnh quốc tế',
      'Đầu thu Box 4K giọng nói tiếng Việt',
      'Giá Xã: 325.000đ/tháng | Phường: 369.000đ/tháng (App: Xã 295K, Phường 339K)',
      'Đã bao gồm 10% VAT'
    ],
    equipment: ['1 Modem ONT WiFi 6', '2 Thiết bị Mesh WiFi 6', '1 Đầu thu TV Box 4K VIP'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng. Đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Nhà phố rộng, biệt thự yêu thích giải trí cao cấp không giới hạn'
  },

  // ==========================================
  // 4. GÓI CƯỚC SIM DI ĐỘNG VIETTEL 5G / 4G MỚI NHẤT
  // ==========================================
  {
    id: 'sim_5g135',
    name: 'Gói Cước 5G135 - Quốc Dân 5G',
    category: 'sim_data',
    price: 135000,
    originalPrice: 160000,
    dataPerDay: '4 GB / Ngày (120 GB / Tháng)',
    totalData: '120 GB',
    badge: 'Gói 5G Hot Nhất',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/0f/e9/90/464da122846223c05d22f6c19370d663dda65853.jpg',
    highlight: '4GB Data tốc độ cao mỗi ngày (120GB/tháng) + Miễn phí xem TV360 chuẩn 4K.',
    features: [
      '4 GB/ngày Data 4G/5G tốc độ tối đa',
      'Hết 4GB tạm dừng truy cập (không phát sinh cước phụ ngoài ý muốn)',
      'Miễn phí xem truyền hình TV360 gói Basic trên di động',
      'Đăng ký sim mới hoặc gán gói cước trên Sim Viettel đang dùng'
    ],
    equipment: ['Giao Sim tận nhà hoặc kích hoạt cú pháp chính thức'],
    promotion: 'Mua Sim số đẹp Viettel tặng kèm tháng đầu tiên. Hỗ trợ kích hoạt chính chủ.',
    suitableFor: 'Lướt Facebook, xem phim, gọi video, tài xế công nghệ, học sinh sinh viên'
  },
  {
    id: 'sim_5g150',
    name: 'Gói Cước 5G150 - Data Khủng 6GB/Ngày',
    category: 'sim_data',
    price: 150000,
    originalPrice: 190000,
    dataPerDay: '6 GB / Ngày (180 GB / Tháng)',
    totalData: '180 GB',
    badge: 'Data Đỉnh Cao',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/7a/08/87/685f9121a6907e28e0d7c7bcd2f774392ad14829.png',
    highlight: '6GB Data cực khủng mỗi ngày + 30GB Lưu trữ MyBox bảo mật Viettel.',
    features: [
      '6 GB/ngày Data tốc độ 5G siêu nhanh (180 GB/tháng)',
      'Miễn phí 30GB Cloud lưu trữ dữ liệu cá nhân MyBox',
      'Miễn phí xem kho phim TV360 không tốn dung lượng Data',
      'Áp dụng toàn quốc cho thuê bao trả trước & trả sau'
    ],
    equipment: ['Sim vật lý / eSim quét mã QR tức thì'],
    promotion: 'Miễn phí chọn số đẹp phong thủy. Đăng ký nhận Sim ngay trong ngày.',
    suitableFor: 'Livestream bán hàng, chơi game nặng, làm việc di động liên tục'
  },
  {
    id: 'sim_5g160b',
    name: 'Gói Cước 5G160B - Combo 5G Thoại + Data',
    category: 'sim_data',
    price: 160000,
    originalPrice: 200000,
    dataPerDay: '4 GB / Ngày (120 GB / Tháng)',
    totalData: '120 GB',
    callBonus: 'Free gọi nội mạng < 10p + 100p ngoại mạng',
    badge: 'Combo 5G Đa Năng',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/0f/e9/90/464da122846223c05d22f6c19370d663dda65853.jpg',
    highlight: '4GB/ngày 5G siêu tốc + Miễn phí gọi nội mạng thả ga + 100 phút gọi ngoại mạng.',
    features: [
      '4 GB/ngày Data 5G tốc độ tối đa (120 GB/tháng)',
      'Miễn phí tất cả các cuộc gọi nội mạng Viettel dưới 10 phút',
      'Tặng 100 phút gọi ngoại mạng (Vina, Mobi, Vietnamobile...)',
      'Miễn phí xem truyền hình TV360 chuẩn 4K'
    ],
    equipment: ['Hỗ trợ gán trên sim đang dùng hoặc cấp Sim mới'],
    promotion: 'Tư vấn miễn phí qua Zalo/Hotline, hỗ trợ kích hoạt tức thì.',
    suitableFor: 'Người kinh doanh, bán hàng online, liên lạc điện thoại nhiều'
  },
  {
    id: 'sim_5g230b',
    name: 'Gói Cước 5G230B - VIP Doanh Nhân 5G',
    category: 'sim_data',
    price: 230000,
    originalPrice: 290000,
    dataPerDay: '8 GB / Ngày (240 GB / Tháng)',
    totalData: '240 GB',
    callBonus: 'Free gọi nội mạng < 20p + 150p ngoại mạng',
    badge: 'VIP Doanh Nhân',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/0f/e9/90/464da122846223c05d22f6c19370d663dda65853.jpg',
    highlight: '8GB/ngày Data 5G (240GB/tháng) + Free thoại nội mạng + 150p ngoại mạng + 50GB MyBox.',
    features: [
      '8 GB/ngày Data 5G tốc độ cao không lo hết mạng (240 GB/tháng)',
      'Miễn phí tất cả cuộc gọi nội mạng Viettel dưới 20 phút',
      'Tặng 150 phút gọi ngoại mạng mỗi tháng',
      'Miễn phí 50GB lưu trữ đám mây MyBox + Gói TV360 VIP'
    ],
    equipment: ['Sim vật lý 4G/5G hoặc eSIM điện tử'],
    promotion: 'Tặng tháng cước khi đăng ký dài kỳ 6 tháng hoặc 12 tháng.',
    suitableFor: 'Giám đốc, quản lý, người thường xuyên đi công tác, họp online'
  },
  {
    id: 'sim_mxh100',
    name: 'Gói MXH100 - Free Mạng Xã Hội',
    category: 'sim_data',
    price: 100000,
    originalPrice: 120000,
    dataPerDay: '1 GB / Ngày + Free TikTok, Youtube, FB',
    totalData: '30 GB + Free MXH',
    badge: 'Dân Mạng Xã Hội',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/30/50/03/83326249f70cbdbd47b543d961210ec730f7a051.jpg',
    highlight: 'Miễn phí 100% dung lượng Data khi lướt TikTok, Youtube, Facebook, Messenger!',
    features: [
      'Free trọn gói KHÔNG GIỚI HẠN Data khi truy cập TikTok, Youtube, Facebook',
      'Tặng thêm 1 GB/ngày (30 GB/tháng) lướt web và ứng dụng khác',
      'Cực kỳ tiết kiệm cho giới trẻ và người nghiện video ngắn'
    ],
    equipment: ['Cú pháp đăng ký nhanh hoặc cấp Sim mới'],
    promotion: 'Hỗ trợ đổi Sim 4G/5G miễn phí.',
    suitableFor: 'Học sinh, sinh viên, người hay xem Youtube, lướt TikTok, Facebook'
  },
  {
    id: 'sim_mxh120',
    name: 'Gói MXH120 - Combo Free MXH + Thoại',
    category: 'sim_data',
    price: 120000,
    originalPrice: 150000,
    dataPerDay: '1 GB / Ngày + Free MXH + Thoại',
    totalData: '30 GB + Free MXH',
    callBonus: 'Free gọi nội mạng < 10p + 30p ngoại mạng',
    badge: 'Hot Sinh Viên',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/30/50/03/83326249f70cbdbd47b543d961210ec730f7a051.jpg',
    highlight: 'Không giới hạn TikTok, Youtube, Facebook + Miễn phí gọi nội mạng & ngoại mạng.',
    features: [
      'Miễn phí 100% Data xem TikTok, Youtube, lướt Facebook',
      '1 GB/ngày lướt web, Zalo, ứng dụng khác',
      'Miễn phí toàn bộ cuộc gọi nội mạng dưới 10 phút',
      'Tặng thêm 30 phút gọi ngoại mạng mỗi tháng'
    ],
    equipment: ['Sim vật lý / eSIM kích hoạt nhanh'],
    promotion: 'Kiểm tra thuê bao đủ điều kiện đăng ký miễn phí qua Zalo.',
    suitableFor: 'Giới trẻ, sinh viên, người thích vừa lướt mạng xã hội vừa gọi điện'
  },
  {
    id: 'sim_sd135',
    name: 'Gói SD135 - Siêu Tốc 5GB/Ngày',
    category: 'sim_data',
    price: 135000,
    originalPrice: 170000,
    dataPerDay: '5 GB / Ngày (150 GB / Tháng)',
    totalData: '150 GB',
    badge: 'Data Thuần 150GB',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/0f/e9/90/464da122846223c05d22f6c19370d663dda65853.jpg',
    highlight: '5GB Data mỗi ngày (150GB/tháng) tốc độ cao + Miễn phí xem TV360 Basic.',
    features: [
      '5 GB/ngày Data 4G/5G tốc độ tối đa',
      'Tổng dung lượng khủng 150 GB/tháng',
      'Miễn phí xem truyền hình TV360 trên điện thoại',
      'Tự động gia hạn hàng tháng khi tài khoản đủ tiền'
    ],
    equipment: ['Kích hoạt trực tiếp trên sim hiện hữu'],
    promotion: 'Hỗ trợ hướng dẫn cú pháp kích hoạt chính chủ Viettel.',
    suitableFor: 'Tài xế công nghệ Grab, Be, người cày game, xem phim online'
  },
  {
    id: 'sim_v120n',
    name: 'Gói Combo V120N - Data + Gọi Thả Ga',
    category: 'sim_data',
    price: 120000,
    originalPrice: 150000,
    dataPerDay: '4 GB / Ngày (120 GB / Tháng)',
    totalData: '120 GB',
    callBonus: 'Miễn phí tất cả cuộc gọi nội mạng < 20p + 50p ngoại mạng',
    badge: 'Combo Thoại + Data',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/30/50/03/83326249f70cbdbd47b543d961210ec730f7a051.jpg',
    highlight: 'Vừa có 4GB/ngày data vừa miễn phí gọi nội mạng & ngoại mạng thả ga.',
    features: [
      '4 GB/ngày (120 GB/tháng) tốc độ cao',
      'Miễn phí tất cả cuộc gọi nội mạng Viettel dưới 20 phút',
      'Tặng 50 phút gọi ngoại mạng (VinaPhone, MobiFone...) mỗi tháng'
    ],
    equipment: ['Hỗ trợ chuyển đổi gói cước trên sim cũ hoặc cấp sim mới'],
    promotion: 'Tư vấn kiểm tra ưu đãi sim miễn phí qua Hotline/Zalo.',
    suitableFor: 'Kinh doanh, bán hàng, người cần liên lạc thoại nhiều'
  },

  // ==========================================
  // 5. DỊCH VỤ THU PHÍ TỰ ĐỘNG KHÔNG DỪNG EPASS VIETTEL
  // ==========================================
  {
    id: 'epass_service',
    name: 'Dán Thẻ Thu Phí Tự Động ePass Viettel',
    category: 'epass',
    price: 0, // Miễn phí dán thẻ / tư vấn
    originalPrice: 120000,
    badge: 'Dán Tận Nhà',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/ePass%20logo.png',
    highlight: 'Dán thẻ định danh ePass qua trạm thu phí tự động không dừng (ETC) và sân bay toàn quốc.',
    features: [
      'Lưu thông qua 100% trạm thu phí BOT không cần dừng, không lo tắc đường',
      'Áp dụng thu phí không dừng tại các sân bay lớn (Nội Bài, Tân Sơn Nhất, Đà Nẵng...)',
      'Miễn phí mở tài khoản giao thông ePass trên điện thoại',
      'Đa dạng phương thức nạp tiền: Viettel Money, Thẻ ATM 40+ ngân hàng, Visa/Mastercard',
      'Hỗ trợ dán thẻ tận nhà, cơ quan hoặc điểm hẹn thuận tiện cho chủ xe',
      'Tra cứu lịch sử di chuyển, xuất hóa đơn VAT điện tử nhanh chóng'
    ],
    equipment: ['Thẻ định danh RFID dán kính hoặc dán đèn xe chuyên dụng'],
    promotion: 'Miễn phí kích hoạt tài khoản. Đội ngũ nhân viên Viettel hỗ trợ dán thẻ tận nơi.',
    suitableFor: 'Chủ xe ô tô cá nhân, xe hợp đồng, xe tải, doanh nghiệp vận tải'
  },

  // ==========================================
  // 6. DỊCH VỤ CAMERA AN NINH AI & COMBO INTERNET CAMERA VIETTEL
  // Link chính thức: https://viettel.vn/vx/internet-truyenhinh/camera
  // ==========================================
  {
    id: 'combo_netvt01_cam',
    name: 'Combo NETVT01T_CAM1 (300Mbps + Camera AI)',
    category: 'camera',
    speed: '300 Mbps + Camera AI + Cloud (24h)',
    price: 215000,
    originalPrice: 285000,
    badge: 'Combo Ưu Đãi 215K',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/files/NETVT01T_CAM1_458X345(1).jpg',
    highlight: 'Combo chính thức từ Viettel.vn: Cáp quang 300 Mbps + Trang bị Modem Wifi 6 + Camera AI + Gói Cloud lưu trữ 24h.',
    features: [
      'Đường truyền Internet FTTH tốc độ cao 300 Mbps đối xứng',
      'Trang bị miễn phí Modem Wifi 6 thế hệ mới nhất',
      'Trang bị Camera AI thông minh chính hãng Viettel',
      'Tặng gói lưu trữ dữ liệu đám mây Cloud 1 ngày (24h) liên tục',
      'Hỗ trợ 10 - 15 thiết bị kết nối ổn định đồng thời',
      'Phí lắp đặt Camera: MIỄN PHÍ 100%'
    ],
    equipment: ['01 Modem Wifi 6 chính hãng', '01 Camera AI trong nhà', 'Tài khoản Cloud Viettel Home'],
    promotion: 'Đóng cước theo chu kỳ 1 / 6 / 13 tháng. Tặng đến 2 tháng cước sử dụng.',
    suitableFor: 'Hộ gia đình, căn hộ chung cư cần mạng internet mạnh và camera an ninh'
  },
  {
    id: 'combo_netcb4_cam',
    name: 'Combo NETCB4_T (300Mbps + Camera Cloud)',
    category: 'camera',
    speed: '300 Mbps + Camera + Cloud',
    price: 205000,
    originalPrice: 270000,
    badge: 'Tiết Kiệm 205K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NETCB4T(361X428).png',
    highlight: 'Gói cước kinh tế tối ưu: Internet 300 Mbps + Camera AI + Cloud lưu trữ 24h giá chỉ 205.000đ/tháng.',
    features: [
      'Băng thông 300 Mbps tốc độ cao ổn định',
      'Trang bị Modem Wifi 6 công nghệ mới',
      'Trang bị Camera an ninh thông minh',
      'Lưu trữ Cloud trên hệ thống máy chủ Viettel IDC Việt Nam'
    ],
    equipment: ['01 Modem Wifi 6', '01 Camera AI Viettel', 'Gói Cloud Viettel Home'],
    promotion: 'Miễn phí bảo trì kỹ thuật 24/7 trong suốt quá trình sử dụng.',
    suitableFor: 'Căn hộ nhỏ, nhà cấp 4, phòng trọ, cửa hàng nhỏ'
  },
  {
    id: 'combo_meshvt1_cam',
    name: 'Combo MESHVT1T_CAM1 (300Mbps + Mesh Wifi 6 + Camera)',
    category: 'camera',
    speed: '300 Mbps + Mesh Wifi 6 + Camera AI',
    price: 230000,
    originalPrice: 320000,
    badge: 'Mesh + Camera AI',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20camera_MESHVT1_T-CAMERA%20CL%207%2C-07(1).jpg',
    highlight: 'Vừa phủ sóng Wifi xuyên tường bằng Mesh Wifi 6, vừa bảo vệ an ninh toàn diện với Camera AI và Cloud.',
    features: [
      'Tốc độ cáp quang 300 Mbps phủ sóng mọi ngóc ngách',
      'Trang bị 01 Modem Wifi 6 + 01 Home Wifi Mesh 6',
      'Trang bị 01 Camera AI giám sát nhận diện con người',
      'Gói lưu trữ Cloud bảo mật trên Data Center Viettel',
      'Kỹ thuật viên khảo sát GPS và triển khai trong 24 - 48 giờ'
    ],
    equipment: ['01 Modem Wifi 6', '01 Thiết bị Mesh Wifi 6', '01 Camera AI chính hãng Viettel'],
    promotion: 'Đóng 6T tặng 1T, Đóng 12T tặng 2T & Miễn phí 100% chi phí lắp đặt thiết bị Mesh.',
    suitableFor: 'Nhà 2-3 tầng, nhà phố nhiều phòng cần phủ sóng wifi rộng và camera'
  },
  {
    id: 'combo_meshcb4_cam',
    name: 'Combo MESHCB4_T (300Mbps + Mesh + Camera Cloud)',
    category: 'camera',
    speed: '300 Mbps + Mesh Wifi + Camera',
    price: 220000,
    originalPrice: 295000,
    badge: 'Mesh Tiết Kiệm',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/MESHCB4T(361X428).png',
    highlight: 'Gói cước Mesh phủ sóng rộng kết hợp Camera an ninh và lưu trữ đám mây Cloud tiết kiệm chi phí.',
    features: [
      'Tốc độ 300 Mbps công nghệ Wifi 6',
      'Trang bị 01 Modem Wifi 6 + 01 Node Mesh',
      'Trang bị 01 Camera AI an ninh thế hệ mới',
      'Miễn phí lắp đặt tận nhà 24/7'
    ],
    equipment: ['01 Modem Wifi 6', '01 Node Mesh Wifi 6', '01 Camera AI'],
    promotion: 'Tặng tháng cước khi thanh toán trả trước.',
    suitableFor: 'Nhà 2 tầng, chung cư 2-3 phòng ngủ'
  },
  {
    id: 'combo_netvt2_cam',
    name: 'Combo NETVT2T_CAM1 (Giga Siêu Tốc 1Gbps + Camera AI)',
    category: 'camera',
    speed: '500 Mbps ~ 1 Gbps + Camera AI',
    price: 260000,
    originalPrice: 350000,
    badge: 'Giga 1Gbps + Camera',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20camera_NETVT2_T-CAMERA%20CL%207%2C-04(1).jpg',
    highlight: 'Băng thông mở rộng cực đại 1 Gbps + Trang bị trọn bộ Modem Wifi 6 Gigabit và Camera AI an ninh.',
    features: [
      'Băng thông không giới hạn 500 Mbps đến 1.000 Mbps (1 Gbps)',
      'Trang bị Modem Wifi 6 cao cấp Gigabit',
      'Trang bị Camera AI thông minh và Cloud lưu trữ',
      'Chịu tải nhiều thiết bị, xem video camera 2K không gián đoạn',
      'Bảo trì kỹ thuật VIP trọn đời hợp đồng'
    ],
    equipment: ['01 Modem Wifi 6 Gigabit AX3000', '01 Camera AI chính hãng', 'Gói Cloud Viettel Home'],
    promotion: 'Ưu đãi đăng ký 12 tháng tặng thêm 2 tháng cước miễn phí.',
    suitableFor: 'Biệt thự, nhà thông minh Smart Home, người yêu thích công nghệ tốc độ cao'
  },
  {
    id: 'combo_meshvt2_cam',
    name: 'Combo MESHVT2T_CAM1 (1Gbps + 2 Mesh Wifi 6 + Camera)',
    category: 'camera',
    speed: '500 Mbps ~ 1 Gbps + 2 Mesh + Camera',
    price: 265000,
    originalPrice: 380000,
    badge: 'VIP Mesh + Camera',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20camera_MESHVT2_T-CAMERA%20CL%207%2C-10(1).jpg',
    highlight: 'Trang bị 01 Modem Wifi 6 + 02 Thiết bị Home Wifi Mesh 6 phủ sóng 3-4 tầng + Camera AI thông minh.',
    features: [
      'Tốc độ cực đại 1.000 Mbps phủ sóng toàn diện',
      'Trang bị 01 Modem Wifi 6 + 02 Thiết bị Mesh Wifi 6',
      'Trang bị Camera AI nhận diện người chính xác',
      'Lưu trữ Cloud đám mây chuẩn an toàn thông tin Bộ Quốc Phòng',
      'Quản lý mạng Wifi và Camera chung trên ứng dụng điện thoại'
    ],
    equipment: ['01 Modem Wifi 6', '02 Thiết bị Home Wifi Mesh 6', '01 Camera AI', 'Gói Cloud Viettel'],
    promotion: 'Tiết kiệm đến hơn 2.500.000đ chi phí mua sắm thiết bị khi đăng ký trả trước.',
    suitableFor: 'Nhà phố 3-5 tầng, biệt thự lớn, quán kinh doanh, homestay'
  },
  {
    id: 'combo_meshvt3_cam',
    name: 'Combo MESHVT3T_CAM1 (1Gbps + 3 Mesh Wifi 6 + Camera)',
    category: 'camera',
    speed: '500 Mbps ~ 1 Gbps + 3 Mesh + Camera',
    price: 319000,
    originalPrice: 450000,
    badge: 'Super Mesh + Camera',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/NET_VT%20%2B%20MESH_VT%20camera_MESHVT3_T-CAMERA%20CL%207%2C-13(1).jpg',
    highlight: 'Trọn bộ giải pháp tối thượng: 1 Modem Wifi 6 + 3 Home Wifi Mesh 6 phủ sóng biệt thự rộng + Camera AI an ninh.',
    features: [
      'Băng thông mở rộng tối đa 1.000 Mbps (1 Gbps)',
      'Trang bị 01 Modem Wifi 6 + 03 Node Mesh Wifi 6',
      'Trang bị 01 Camera AI nhận diện người + Gói Cloud lưu trữ',
      'Chịu tải 40-60 thiết bị kết nối ổn định'
    ],
    equipment: ['01 Modem Wifi 6', '03 Thiết bị Home Wifi Mesh 6', '01 Camera AI Viettel'],
    promotion: 'Miễn phí hoàn toàn phí hòa mạng khi đóng trước 12 tháng.',
    suitableFor: 'Biệt thự sân vườn, nhà nhiều tầng, nhà hàng, văn phòng doanh nghiệp'
  },
  {
    id: 'camera_cloud_cl1',
    name: 'Gói Cloud Lưu Trữ Camera CL1 (24 Giờ)',
    category: 'camera',
    price: 20000,
    originalPrice: 30000,
    badge: 'Cloud 1 Ngày (20K)',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/Goicuoc_camera_Camera-Cloud1-458x345(1).jpg',
    highlight: 'Gói cước lưu trữ đám mây 24h gần nhất, máy chủ Data Center Viettel chuẩn Tier 3 tại Việt Nam.',
    features: [
      'Lưu trữ video đám mây trong vòng 1 ngày (24h) gần nhất',
      'Không lo mất dữ liệu khi camera bị tháo gỡ hoặc mất cắp',
      'Xem lại video mượt mà mọi lúc mọi nơi trên app Viettel Home',
      'Tải đoạn video về điện thoại với tốc độ cao không giới hạn'
    ],
    equipment: ['Kích hoạt tài khoản Cloud bản quyền Viettel Home'],
    promotion: 'Miễn phí trang bị camera khi dùng kèm đường truyền Internet Viettel.',
    suitableFor: 'Gia đình, cửa hàng cần lưu trữ video an ninh cơ bản 24 giờ'
  },
  {
    id: 'camera_cloud_cl3',
    name: 'Gói Cloud Lưu Trữ Camera CL3 (3 Ngày)',
    category: 'camera',
    price: 30000,
    originalPrice: 40000,
    badge: 'Cloud 3 Ngày (30K)',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/Goicuoc_camera_Camera-Cloud3-458x345%20copy(2).jpg',
    highlight: 'Lưu trữ trọn vẹn 3 ngày gần nhất trên đám mây Viettel an toàn và bảo mật cao.',
    features: [
      'Lưu trữ video 3 ngày gần nhất độ nét cao 2K',
      'Mã hóa đường truyền SSL 256-bit chuẩn quốc tế',
      'Xem trực tiếp và xem lại trên nhiều thiết bị',
      'Dữ liệu đặt tại Việt Nam, tốc độ truy xuất cực nhanh'
    ],
    equipment: ['Kích hoạt gói Cloud 3 ngày trên Viettel Home'],
    promotion: 'Ưu đãi đặc biệt khi đăng ký chu kỳ 6 tháng hoặc 12 tháng.',
    suitableFor: 'Hộ gia đình, căn hộ, văn phòng làm việc'
  },
  {
    id: 'camera_cloud_cl7',
    name: 'Gói Cloud Lưu Trữ Camera CL7 (7 Ngày)',
    category: 'camera',
    price: 40000,
    originalPrice: 50000,
    badge: 'Cloud 7 Ngày Phổ Biến',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/Camera%20CL7-458x345(1).jpg',
    highlight: 'Xem lại video liên tục 7 ngày gần nhất, an tâm quản lý gia đình và công việc suốt cả tuần.',
    features: [
      'Lưu trữ đám mây an toàn 7 ngày gần nhất',
      'Xem lại video mượt mà không độ trễ trên app Viettel Home',
      'Hỗ trợ trích xuất video sự kiện và chia sẻ dễ dàng',
      'Bảo mật mã hóa đường truyền SSL 256-bit chuẩn Bộ Quốc Phòng'
    ],
    equipment: ['Tài khoản Cloud bản quyền Viettel Home'],
    promotion: 'Ưu đãi chỉ 400.000đ khi thanh toán trọn gói 12 tháng.',
    suitableFor: 'Gia đình, shop thời trang, quầy thu ngân, nhà thuốc'
  },
  {
    id: 'camera_cloud_cl15',
    name: 'Gói Cloud Lưu Trữ Camera CL15 (15 Ngày)',
    category: 'camera',
    price: 60000,
    originalPrice: 80000,
    badge: 'Cloud 15 Ngày',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/Camera%20CL15-458x345(1).jpg',
    highlight: 'Lưu trữ đám mây 15 ngày, thoải mái đi công tác, du lịch nửa tháng mà không bỏ lỡ khoảnh khắc nào.',
    features: [
      'Lưu trữ 15 ngày video chất lượng cao',
      'Hệ thống AI tự động đánh dấu sự kiện có người chuyển động',
      'Không giới hạn số lượt tải và xem lại',
      'Tự động đồng bộ ngay khi có kết nối mạng'
    ],
    equipment: ['Gói bản quyền Cloud 15 ngày Viettel'],
    promotion: 'Tặng thêm 1-2 tháng cước khi đăng ký gói 12 tháng.',
    suitableFor: 'Người thường xuyên vắng nhà, công ty, nhà kho'
  },
  {
    id: 'camera_cloud_cl30',
    name: 'Gói Cloud Lưu Trữ Camera CL30 (30 Ngày VIP)',
    category: 'camera',
    price: 90000,
    originalPrice: 120000,
    badge: 'Cloud 30 Ngày VIP',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/Camera%20CL30-458x345(2).jpg',
    highlight: 'Xem lại video trọn vẹn 30 ngày (1 tháng), an tâm tuyệt đối với tiêu chuẩn lưu trữ cao cấp nhất.',
    features: [
      'Lưu trữ trọn vẹn 30 ngày gần nhất với độ nét cao 2K',
      'Không giới hạn số lượt xem và tải video chứng cứ',
      'Tự động sao lưu và đồng bộ tức thì khi có internet',
      'Quản lý tập trung nhiều camera trên một tài khoản duy nhất'
    ],
    equipment: ['Kích hoạt gói Cloud 30 ngày trên ứng dụng Viettel Home'],
    promotion: 'Tặng thêm 2 tháng cước khi đăng ký gói 12 tháng.',
    suitableFor: 'Công ty, kho hàng, bãi giữ xe, gia đình thường xuyên đi xa'
  },
  {
    id: 'camera_hc25',
    name: 'Camera Trong Nhà HC25 (3MP 2K - WDR - Xoay 360°)',
    category: 'camera',
    price: 670000,
    originalPrice: 850000,
    badge: 'Thế Hệ Mới 2K',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/vtDevice/76/fa/a7/77423bee937ffd83aa44a5b626f65150b5aa2bf1.png',
    highlight: 'Hỗ trợ góc xoay dọc 180°, mở rộng phạm vi trần nhà, WDR chống ngược sáng và bộ nhớ đệm lưu offline 1 ngày.',
    features: [
      'Độ phân giải 3 MP (2304 × 1296) 2K siêu nét',
      'Công nghệ WDR cân bằng chống ngược sáng hoàn hảo',
      'Xoay ngang 355 độ, xoay dọc 180 độ không góc chết',
      'AI nhận diện con người & cảnh báo âm thanh bất thường',
      'Tích hợp bộ nhớ đệm 1 ngày, tự động đẩy lên Cloud khi có mạng'
    ],
    equipment: ['01 Camera AI trong nhà HC25', 'Bộ nguồn Type-C + Chân đế treo trần'],
    promotion: 'Tặng kèm gói Cloud lưu trữ 12 tháng chính hãng Viettel.',
    suitableFor: 'Gia đình có trẻ nhỏ, người già, căn hộ, văn phòng, cửa hàng'
  },
  {
    id: 'camera_hc24',
    name: 'Camera Trong Nhà HC24 (3MP 2K - Đàm Thoại 2 Chiều)',
    category: 'camera',
    price: 670000,
    originalPrice: 850000,
    badge: 'Xoay 360° 2K',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/vtDevice/1a/9c/c1/df871c594780d0d6f378a509acef87998cdb39bd.png',
    highlight: 'Độ phân giải 3MP 2K, đàm thoại 2 chiều lọc tiếng ồn, AI thông minh theo dõi chuyển động lạ.',
    features: [
      'Độ phân giải 3 MP 2K (2304 × 1296) sắc nét',
      'Góc xoay 360 độ góc rộng bao quát toàn phòng',
      'Theo dõi thông minh và cảnh báo chuyển động lạ',
      'Đàm thoại 2 chiều trực tiếp qua app Viettel Home',
      'Bộ nhớ đệm lưu offline khi mất kết nối mạng'
    ],
    equipment: ['01 Camera AI trong nhà HC24', 'Adapter sạc + Phụ kiện lắp đặt'],
    promotion: 'Tặng kèm gói Cloud lưu trữ 12 tháng trên máy chủ Viettel.',
    suitableFor: 'Phòng khách, phòng ngủ em bé, quầy thu ngân cửa hàng'
  },
  {
    id: 'camera_hc34',
    name: 'Camera Ngoài Trời HC34 (3MP 2K - Chuẩn IP67 - Màu Ban Đêm)',
    category: 'camera',
    price: 870000,
    originalPrice: 1100000,
    badge: 'Kháng Nước IP67',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/vtDevice/55/be/e5/e931c0fc676bcafdc601eb7dbe4b7b12db5db4f0.png',
    highlight: 'Chống chịu mưa nắng IP67, AI nhận diện con người, đèn Spotlight ban đêm có màu, còi hú báo động.',
    features: [
      'Kháng nước & kháng bụi chuẩn công nghiệp IP67 bền bỉ',
      'Đèn Spotlight hỗ trợ quan sát ban đêm có màu sống động',
      'AI phân biệt chính xác người và vật, hạn chế báo động ảo',
      'Còi hú âm lượng lớn cảnh báo xua đuổi kẻ gian đột nhập',
      'Kết nối đa dạng: Wi-Fi 2.4GHz, cổng LAN RJ45, Bluetooth'
    ],
    equipment: ['01 Camera ngoài trời HC34', 'Bộ nguồn chống nước 12V + Bộ ốc vít chuyên dụng'],
    promotion: 'Bảo hành chính hãng 12 tháng tại hệ thống Viettel Store toàn quốc.',
    suitableFor: 'Lắp trước cổng nhà, sân vườn, bãi đỗ xe, ban công, trang trại'
  },
  {
    id: 'camera_hc33',
    name: 'Camera Ngoài Trời HC33 3M (Hồng Ngoại 30M - IP67)',
    category: 'camera',
    price: 870000,
    originalPrice: 1100000,
    badge: 'Hồng Ngoại 30M',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/vtDevice/a8/e1/1a/5ace7d9f09a47bbdc6ef5a352ef70751ef547ed0.png',
    highlight: 'Tiêu cự 3.8mm góc siêu rộng, tầm nhìn hồng ngoại 30m trong đêm tối, còi báo động và đàm thoại 2 chiều.',
    features: [
      'Cảm biến ảnh 1/2.8" CMOS 3MP chất lượng cao',
      'Góc nhìn rộng chéo D 102°, ngang H 85.8°',
      'Tầm nhìn xa hồng ngoại 30m rõ nét trong bóng đêm',
      'Chống nước bụi tiêu chuẩn IP67, nhiệt độ -20°C ~ 50°C',
      'Đàm thoại 2 chiều và còi hú báo động âm lượng lớn'
    ],
    equipment: ['01 Camera ngoài trời HC33 3M', 'Nguồn điện 12V + Phụ kiện gắn tường'],
    promotion: 'Miễn phí công lắp đặt khi đăng ký kèm đường truyền Internet Viettel.',
    suitableFor: 'Kho bãi, nhà xưởng, đường hẻm, mặt tiền nhà phố'
  },

  // ==========================================
  // 7. GÓI CÁP QUANG DOANH NGHIỆP & PHÒNG NET (ENTERPRISE)
  // ==========================================
  {
    id: 'pro300_biz',
    name: 'PRO300 - Doanh Nghiệp & Quán Cafe',
    category: 'enterprise',
    speed: '300 Mbps + Băng thông quốc tế',
    price: 350000,
    originalPrice: 450000,
    badge: 'Doanh Nghiệp Cơ Bản',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/17/c4/41/3160086c282f5adc50eeae7442dc8df7936d7ee0.png',
    highlight: 'Băng thông trong nước 300 Mbps + Cam kết băng thông quốc tế tối thiểu, chịu tải cao.',
    features: [
      'Tốc độ trong nước 300 Mbps cam kết không suy hao',
      'Cam kết băng thông quốc tế: 1 Mbps tối thiểu',
      'Chịu tải 30 - 60 thiết bị truy cập đồng thời liên tục',
      'Xuất hóa đơn VAT cho công ty, doanh nghiệp'
    ],
    equipment: ['1 Modem Router chuyên dụng chịu tải cao'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng, đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Quán cafe, nhà hàng, văn phòng công ty 10-30 nhân sự'
  },
  {
    id: 'pro600_biz',
    name: 'PRO600 - Doanh Nghiệp Lớn & Chuỗi Cửa Hàng',
    category: 'enterprise',
    speed: '600 Mbps + 1 IP Tĩnh Miễn Phí',
    price: 500000,
    originalPrice: 650000,
    badge: 'VIP Doanh Nghiệp',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/17/c4/41/3160086c282f5adc50eeae7442dc8df7936d7ee0.png',
    highlight: '600 Mbps cực mạnh, miễn phí 01 IP Tĩnh cố định cho Server, Camera an ninh.',
    features: [
      'Băng thông 600 Mbps cực lớn',
      'Cam kết quốc tế 2 Mbps',
      'Tặng 01 địa chỉ IP Tĩnh (Static IP) miễn phí trọn đời gói cước',
      'Hỗ trợ kỹ thuật luồng VIP xử lý sự cố trong 2 giờ'
    ],
    equipment: ['Modem Router chuyên dụng Gigabit cân bằng tải'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng, đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Công ty 30-80 nhân viên, trung tâm thương mại, khách sạn'
  },
  {
    id: 'pro1000_biz',
    name: 'PRO1000 - Băng Thông Cực Đại 1Gbps',
    category: 'enterprise',
    speed: '1.000 Mbps (1 Gbps) + 1 IP Tĩnh',
    price: 700000,
    originalPrice: 950000,
    badge: 'Siêu Tốc 1Gbps',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/17/c4/41/3160086c282f5adc50eeae7442dc8df7936d7ee0.png',
    highlight: 'Tốc độ 1.000 Mbps (1 Gbps) trong nước, cân mọi tác vụ truyền tải dữ liệu nặng nhất.',
    features: [
      'Tốc độ 1.000 Mbps đối xứng cực đại',
      'Cam kết băng thông quốc tế tối thiểu 3 Mbps',
      'Tặng kèm 01 địa chỉ IP Tĩnh cố định',
      'Hỗ trợ cấu hình hệ thống mạng VLAN, VPN, cân bằng tải'
    ],
    equipment: ['Thiết bị Router cân bằng tải chuyên dụng doanh nghiệp cao cấp'],
    promotion: 'Đóng 12 tháng tặng 1 tháng sử dụng, đóng 6 tháng không tặng cước. Phí hòa mạng 300.000đ.',
    suitableFor: 'Công ty công nghệ, đồ họa, phòng game cao cấp, tòa nhà văn phòng'
  },
  {
    id: 'vip200_biz',
    name: 'VIP200 - Băng Thông Quốc Tế Lớn',
    category: 'enterprise',
    speed: '200 Mbps + 4 Mbps Quốc Tế',
    price: 800000,
    originalPrice: 1100000,
    badge: 'Quốc Tế Cam Kết',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/17/c4/41/3160086c282f5adc50eeae7442dc8df7936d7ee0.png',
    highlight: 'Băng thông quốc tế cam kết 4 Mbps cao vượt trội, đường truyền riêng biệt an toàn.',
    features: [
      'Tốc độ trong nước 200 Mbps',
      'Cam kết băng thông quốc tế cực mạnh: 4 Mbps',
      'Miễn phí 01 IP Tĩnh (Static IP)',
      'Hạ tầng cáp quang kênh riêng chất lượng cao'
    ],
    equipment: ['Router doanh nghiệp chuẩn công nghiệp'],
    promotion: 'Ký hợp đồng tại văn phòng khách hàng, hỗ trợ xuất VAT đầy đủ.',
    suitableFor: 'Doanh nghiệp FDI, xuất nhập khẩu, giao dịch quốc tế, công ty nước ngoài'
  },
  {
    id: 'vip500_biz',
    name: 'VIP500 - Kênh Thuê Riêng Quốc Tế VIP',
    category: 'enterprise',
    speed: '500 Mbps + 10 Mbps Quốc Tế + Dải IP',
    price: 1900000,
    originalPrice: 2500000,
    badge: 'Kênh Riêng VIP',
    popular: false,
    imageUrl: 'https://media.vietteltelecom.vn/upload/InternetInternetPackageBuyData/17/c4/41/3160086c282f5adc50eeae7442dc8df7936d7ee0.png',
    highlight: 'Cam kết băng thông quốc tế 10 Mbps, trang bị dải IP Tĩnh (/30) cho hệ thống máy chủ.',
    features: [
      'Tốc độ trong nước 500 Mbps',
      'Băng thông quốc tế cam kết lên đến 10 Mbps',
      'Tặng 01 Dải 4 địa chỉ IP Tĩnh (/30)',
      'Đội ngũ chuyên gia Viettel giám sát hạ tầng 24/7'
    ],
    equipment: ['Trọn bộ thiết bị Router chuyên dụng cao cấp nhất'],
    promotion: 'Ưu đãi đặc biệt khi cam kết sử dụng 24 tháng trở lên.',
    suitableFor: 'Tập đoàn, ngân hàng, sàn thương mại điện tử, bệnh viện lớn'
  },

  // ==========================================
  // 8. DỊCH VỤ GIẢI PHÁP SỐ DOANH NGHIỆP (DIGITAL SOLUTIONS)
  // ==========================================
  {
    id: 'viettel_ca_smartca',
    name: 'Chữ Ký Số Viettel-CA & SmartCA (Ký Số Từ Xa)',
    category: 'digital_biz',
    price: 1200000, // Gói 1 năm phổ thông
    originalPrice: 1550000,
    badge: 'Chứng Thư Số Quốc Gia',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/smartCA.png',
    highlight: 'Ký số từ xa trên điện thoại không cần USB Token, kê khai Thuế, Hải quan, BHXH, Hóa đơn điện tử hợp pháp 100%.',
    features: [
      'Ký số từ xa qua ứng dụng SmartCA trên di động hoặc thiết bị USB Token',
      'Kê khai thuế điện tử (eTax), hải quan điện tử (VNACCS), BHXH Việt Nam',
      'Ký hóa đơn điện tử, hợp đồng điện tử theo tiêu chuẩn Bộ TT&TT',
      'Bảo mật tiêu chuẩn Châu Âu eIDAS và quy chuẩn an toàn cao nhất'
    ],
    equipment: ['Chứng thư số Viettel-CA hoặc Tài khoản ký số từ xa Viettel SmartCA'],
    promotion: 'Tặng 6 - 12 tháng sử dụng khi đăng ký gói 2 - 3 năm. Hỗ trợ cài đặt từ xa Ultraviewer 24/7.',
    suitableFor: 'Doanh nghiệp, hộ kinh doanh, kế toán trưởng, cá nhân kinh doanh'
  },
  {
    id: 'viettel_sinvoice',
    name: 'Hóa Đơn Điện Tử Viettel S-Invoice (Nghị Định 123)',
    category: 'digital_biz',
    price: 450000, // Gói 300 - 500 số
    originalPrice: 600000,
    badge: 'Chuẩn Thông Tư 78',
    popular: true,
    imageUrl: 'https://media.vietteltelecom.vn/upload/ckfinder/images/sinvoice.png',
    highlight: 'Hóa đơn điện tử kết nối trực tiếp Tổng Cục Thuế, tích hợp phần mềm kế toán và máy tính tiền.',
    features: [
      'Khởi tạo hóa đơn từ máy tính tiền nhanh chóng, chính xác',
      'Kết nối trực tiếp cơ quan Thuế theo Thông tư 78/2021/TT-BTC & Nghị định 123/2020/NĐ-CP',
      'Tích hợp dễ dàng với MISA, FAST, Bravo, POS365, KiotViet...',
      'Lưu trữ hóa đơn an toàn 10 năm trên đám mây Viettel'
    ],
    equipment: ['Tài khoản khởi tạo & quản trị hệ thống S-Invoice trực tuyến'],
    promotion: 'Miễn phí thủ tục đăng ký sử dụng hóa đơn với Cơ quan Thuế. Thiết kế mẫu hóa đơn miễn phí.',
    suitableFor: 'Nhà hàng, quán ăn, siêu thị, hiệu thuốc, công ty mọi quy mô'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    category: 'Khuyến mãi & Chi phí',
    question: 'Phí hòa mạng ban đầu của mạng Viettel là bao nhiêu?',
    answer: 'Chính sách phí hòa mạng Viettel Telecom hiện hành: \n• Đóng trước 12 tháng: Phí hòa mạng 300.000đ + Tặng thêm 1 tháng cước (dùng trọn vẹn 13 tháng).\n• Đóng trước 6 tháng: Phí hòa mạng 300.000đ (dùng 6 tháng, không tặng cước).\n• Trả từng tháng: Thu cước tháng đầu + Phí hòa mạng 300.000đ theo quy định.\nToàn bộ khách hàng đều được Viettel trang bị 100% Modem Wifi 6 / Home Wifi Mesh và Box TV 4K mới chính hãng.'
  },
  {
    category: 'Thủ tục & Thời gian',
    question: 'Thủ tục đăng ký lắp mạng Viettel gồm những giấy tờ gì?',
    answer: 'Thủ tục cực kỳ đơn giản: Đối với cá nhân/hộ gia đình chỉ cần ảnh chụp CCCD (Căn cước công dân). Đối với Doanh nghiệp cần Giấy phép ĐKKD và CCCD của người đại diện pháp luật. Không cần hộ khẩu hay tạm trú.'
  },
  {
    category: 'Thủ tục & Thời gian',
    question: 'Sau khi đăng ký thì bao lâu nhân viên Viettel đến lắp đặt?',
    answer: 'Viettel cam kết triển khai dịch vụ và lắp đặt hoàn tất trong vòng 24 - 48 giờ kể từ khi tiếp nhận đăng ký thông tin hợp lệ (tùy thuộc vào địa bàn và điều kiện thời tiết).'
  },
  {
    category: 'Khuyến mãi & Chi phí',
    question: 'Chương trình khuyến mãi đóng trước cước được tặng như thế nào?',
    answer: 'Chính sách ưu đãi đóng trước cước mới nhất:\n• Đóng 12 tháng: TẶNG 1 THÁNG cước sử dụng (dùng 13 tháng), phí hòa mạng 300.000đ.\n• Đóng 6 tháng: Dùng trọn vẹn 6 tháng (không tặng cước), phí hòa mạng 300.000đ.\n• Toàn bộ gói cước NetVT và MeshVT đều được trang bị trọn đời Modem WiFi 6 công nghệ mới nhất.'
  },
  {
    category: 'Sim 5G Mới Nhất',
    question: 'Viettel đã có mạng 5G chưa? Tôi có thể đăng ký gói 5G trên sim đang dùng không?',
    answer: 'Viettel là nhà mạng tiên phong phủ sóng 5G thương mại toàn quốc. Quý khách hoàn toàn có thể giữ nguyên số điện thoại đang dùng để đăng ký các gói cước 5G (5G135, 5G150, 5G160B, 5G230B...) chỉ cần thiết bị điện thoại có hỗ trợ 5G. Nhân viên Viettel sẽ hỗ trợ kiểm tra ưu đãi và kích hoạt từ xa nhanh chóng.'
  },
  {
    category: 'ePass & Dịch vụ khác',
    question: 'Dán thẻ thu phí không dừng ePass Viettel áp dụng ở những đâu?',
    answer: 'Thẻ ePass của Viettel lưu thông qua 100% trạm thu phí BOT trên toàn quốc và hiện đã áp dụng thu phí tự động không dừng tại các sân bay lớn (Nội Bài, Tân Sơn Nhất, Đà Nẵng, Cát Bi...). Hỗ trợ nhân viên dán thẻ tận nhà, liên kết Viettel Money nạp tiền không mất phí.'
  },
  {
    category: 'Camera An Ninh AI',
    question: 'Camera AI Viettel lưu trữ video như thế nào? Có cần mua thẻ nhớ không?',
    answer: 'Camera AI Viettel sử dụng công nghệ lưu trữ đám mây Cloud đặt tại Trung tâm dữ liệu Viettel IDC Việt Nam, tuyệt đối an toàn và không sợ bị kẻ gian đánh cắp hay làm hỏng thẻ nhớ. Quý khách có thể xem lại video mọi lúc mọi nơi trên ứng dụng Viettel Home.'
  },
  {
    category: 'Chữ Ký Số & Hóa Đơn',
    question: 'Doanh nghiệp đăng ký Chữ ký số SmartCA và Hóa đơn điện tử Viettel cần chuẩn bị gì?',
    answer: 'Quý doanh nghiệp chỉ cần gửi Giấy phép ĐKKD và CCCD của người đại diện. Nhân viên Viettel sẽ hỗ trợ tạo hồ sơ, cấp chứng thư số và liên kết cơ quan Thuế online trong ngày mà doanh nghiệp không cần phải đến quầy giao dịch.'
  }
];
