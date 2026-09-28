# Viettel Telecom - Cổng Đăng Ký & Quản Trị Dịch Vụ Trực Tuyến

Hệ thống cổng thông tin viễn thông Viettel Telecom: Cáp quang FTTH, Wifi Mesh 6, TV360, Sim 4G/5G, Camera AI Cloud, ePass và Chữ ký số / HĐĐT.

---

## 🚀 Hướng Dẫn Đẩy Lên GitHub & Triển Khai Vercel

### 1. Đẩy Code Lên GitHub
Kho mã nguồn đã được khởi tạo sẵn nhánh `main` và commit đầy đủ. Quý khách chỉ cần tạo một repository mới trên GitHub (ví dụ: `viettel-portal`), sau đó chạy 2 lệnh sau:

```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
git push -u origin main
```

*(Nếu đã có sẵn remote, chỉ cần chạy: `git push origin main`)*

---

### 2. Triển Khai (Deploy) Lên Vercel

Hệ thống đã có sẵn cấu hình `vercel.json` tối ưu cho Single Page Application (SPA), bảo mật header và không bao giờ gặp lỗi 404 khi tải lại trang.

#### Cách 1: Kết nối trực tiếp qua giao diện Vercel (Khuyên dùng)
1. Đăng nhập vào [vercel.com](https://vercel.com).
2. Nhấn nút **"Add New..."** ➔ **"Project"**.
3. Chọn Repository GitHub vừa đẩy lên ở Bước 1 và nhấn **"Import"**.
4. Vercel sẽ tự động nhận diện:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Nhấn **"Deploy"** ➔ Website sẽ sẵn sàng hoạt động sau 30 giây!

#### Cách 2: Triển khai qua lệnh Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## ✨ Các Tính Năng Đã Hoàn Thiện

1. **Quản trị dịch vụ & gói cước (`AdminPackagesManager`)**:
   - Thêm mới, chỉnh sửa, xóa gói cước thời gian thực.
   - **Sửa mã gói cước (ID)** tự do với cơ chế kiểm tra trùng lặp tự động.
   - **Đính kèm ảnh từ máy tính / điện thoại**: Kéo thả ảnh hoặc chọn file, hệ thống tự động nén tối ưu hiển thị. Có sẵn mẫu ảnh chính hãng Viettel.

2. **Nút Cài Đặt Ra Màn Hình Mobile (`PWA`)**:
   - Thẻ cài đặt nổi bật ở cuối trang trên giao diện di động.
   - Nút bấm cài đặt ở chân trang (Footer) và thanh điều hướng (Navbar).
   - Hỗ trợ chuẩn PWA Service Worker offline cache, tự động kích hoạt lời nhắc cài đặt trên Android/Chrome và hướng dẫn trực quan trên iOS Safari.

3. **Bảo Vệ Bản Quyền & Chống Hack F12 (`Anti-Inspect`)**:
   - Khóa các phím tắt mở DevTools: `F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, `Ctrl+U`, `Cmd+Option+I`.
   - Khóa chuột phải xem mã nguồn bên ngoài các ô nhập liệu (vẫn cho phép khách hàng copy/paste số điện thoại và địa chỉ bình thường).
   - Hiển thị thông báo bản quyền trang trọng và cảnh báo bảo mật trong Console.

4. **Quản trị đơn hàng & lịch sử khách hàng**:
   - Tự động lấy tọa độ GPS chính xác đến từng mét khi khách hàng đăng ký khảo sát.
   - Xuất báo cáo danh sách khách hàng ra file Excel (`.xlsx`) chuyên nghiệp theo chuẩn nhận diện thương hiệu Viettel.
   - Quản lý trạng thái đơn hàng (Mới đăng ký, Đã liên hệ, Đã khảo sát GPS, Đã lắp đặt).
