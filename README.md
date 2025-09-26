Phạm Minh Thắng - 22IT273

🍅 Pomodoro Timer - React & Capacitor
Đây là một ứng dụng hẹn giờ Pomodoro được xây dựng bằng React, Vite, và Capacitor. Ứng dụng này giúp bạn tập trung vào công việc bằng cách tuân theo phương pháp Pomodoro: làm việc tập trung trong một khoảng thời gian (thường là 25 phút) và sau đó nghỉ ngơi ngắn (5 phút).

Ứng dụng được thiết kế để chạy trên web và sử dụng các plugin của Capacitor để cung cấp các tính năng như thông báo cục bộ và phản hồi xúc giác (rung).

!

✨ Tính năng chính
Hẹn giờ Pomodoro: Chu kỳ làm việc 25 phút và nghỉ ngơi 5 phút.

Thông báo cục bộ: Gửi thông báo trên desktop khi một phiên làm việc hoặc nghỉ ngơi kết thúc, ngay cả khi tab trình duyệt không hoạt động.

Phản hồi xúc giác (Rung): Rung thiết bị (trên các thiết bị di động hỗ trợ) khi hết giờ.

Lưu lịch sử phiên: Tự động lưu lại các phiên đã hoàn thành vào localStorage của trình duyệt để bạn có thể theo dõi tiến độ.

Tùy chọn âm báo: Cho phép người dùng chọn âm thanh thông báo yêu thích.

Giao diện gọn gàng: UI/UX đơn giản, sạch sẽ và dễ sử dụng.

🛠️ Công nghệ sử dụng
Framework: React

Build Tool: Vite

Ngôn ngữ: TypeScript

Nền tảng Native: Capacitor

@capacitor/local-notifications - Để gửi thông báo hệ thống.

@capacitor/haptics - Để điều khiển chức năng rung.

@capacitor/dialog - Để hiển thị hộp thoại cảnh báo gốc.

🚀 Bắt đầu
Làm theo các bước sau để chạy dự án trên máy của bạn.

Yêu cầu
Node.js (phiên bản 18.x trở lên)

npm hoặc yarn

Cài đặt
Clone repository về máy:

Bash

git clone https://github.com/your-username/my-pomodoro-app.git
Di chuyển vào thư mục dự án:

Bash

cd my-pomodoro-app
Cài đặt các dependency:

Bash

npm install
Chạy ứng dụng
Để chạy trên môi trường web development:

Bash

npm run dev
Sau đó, mở trình duyệt và truy cập vào http://localhost:5173 (hoặc cổng được hiển thị trong terminal).

Để build ứng dụng cho production:

Bash

npm run build
Các file tĩnh sẽ được tạo trong thư mục dist.

⚠️ Lưu ý về giới hạn
Do các chính sách của trình duyệt web hiện đại để tiết kiệm tài nguyên, setInterval (cơ chế đếm ngược của timer) có thể bị làm chậm hoặc tạm dừng khi tab không hoạt động. Để đảm bảo độ chính xác 100% khi chạy nền, các giải pháp nâng cao hơn như Web Workers cần được xem xét.

Tuy nhiên, với việc sử dụng LocalNotifications, bạn vẫn sẽ nhận được thông báo đúng giờ khi một phiên kết thúc.