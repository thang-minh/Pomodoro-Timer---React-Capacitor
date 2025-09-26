# 🍅 Pomodoro Timer - React & Capacitor

**Phạm Minh Thắng - 22IT273**

Ứng dụng hẹn giờ Pomodoro được xây dựng bằng **React**, **Vite**, và **Capacitor**.  
Giúp bạn tập trung hơn bằng phương pháp Pomodoro:  
👉 Làm việc 25 phút → Nghỉ ngắn 5 phút → Lặp lại chu kỳ để tăng hiệu quả.  

Ứng dụng chạy trên **Web** và có hỗ trợ **plugin Capacitor** cho:  
- 🔔 Thông báo cục bộ  
- 📳 Rung (haptic feedback)  
- ⚠️ Hộp thoại cảnh báo native  

---

## ✨ Tính năng chính
- ⏰ **Hẹn giờ Pomodoro**: Chu kỳ làm việc 25 phút, nghỉ 5 phút  
- 🔔 **Thông báo cục bộ**: Hiển thị ngay cả khi tab bị ẩn  
- 📳 **Phản hồi xúc giác**: Rung trên thiết bị hỗ trợ  
- 📝 **Lưu lịch sử phiên**: Lưu vào `localStorage` để theo dõi tiến độ  
- 🎵 **Âm báo tuỳ chọn**: Chọn nhạc chuông bạn thích  
- 🎨 **Giao diện gọn gàng**: UI/UX đơn giản, dễ dùng  

---

## 🛠️ Công nghệ sử dụng
- ⚛️ **Framework**: React  
- ⚡ **Build tool**: Vite  
- 🟦 **Ngôn ngữ**: TypeScript  
- 📱 **Native Platform**: Capacitor  

**Plugin Capacitor:**  
- `@capacitor/local-notifications` → Gửi thông báo hệ thống  
- `@capacitor/haptics` → Điều khiển rung thiết bị  
- `@capacitor/dialog` → Hiển thị hộp thoại cảnh báo  

---

## 🚀 Bắt đầu

### Yêu cầu
- Node.js **>= 18.x**  
- npm hoặc yarn  

### Cài đặt
```bash
# clone repo
git clone https://github.com/your-username/my-pomodoro-app.git

# vào thư mục dự án
cd my-pomodoro-app

# cài dependencies
npm install
