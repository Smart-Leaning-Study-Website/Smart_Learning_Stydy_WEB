# Hướng dẫn sử dụng MyCoursesPage

## 📋 Tổng quan

`MyCoursesPage.jsx` là trang hiển thị danh sách khóa học mà người dùng đã đăng ký. Trang này kết nối với API backend `/my-courses` để lấy dữ liệu.

## 🔗 Kết nối với Backend

### API Endpoint:
```
GET /api/my-courses
```

### Headers cần thiết:
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Response format mong đợi:
```json
{
  "courses": [
    {
      "id": 1,
      "title": "Lập trình Web cơ bản",
      "description": "Học HTML, CSS, JavaScript từ cơ bản đến nâng cao",
      "thumbnail": "https://example.com/image.jpg",
      "pivot": {
        "enrolled_at": "2024-01-15T10:30:00.000000Z"
      },
      "progress": 75
    }
  ]
}
```

## 🚀 Cách sử dụng

### 1. Import và sử dụng:
```jsx
import MyCoursesPage from './pages/MyCoursesPage';

function App() {
  return <MyCoursesPage />;
}
```

### 2. Truy cập qua URL:
```
http://localhost:5173/my-courses
```

## 🎨 Tính năng chính

### 1. **Header với thông tin user:**
- Hiển thị tên người dùng
- Số lượng khóa học đã đăng ký
- Gradient background đẹp mắt

### 2. **Danh sách khóa học:**
- Card layout hiện đại
- Hình ảnh khóa học
- Thông tin đăng ký (ngày đăng ký)
- Progress bar (nếu có)
- Nút "Tiếp tục học" và "Xem chi tiết"

### 3. **Empty State:**
- Hiển thị khi chưa có khóa học nào
- Call-to-action để khám phá khóa học

### 4. **Quick Actions:**
- Tìm khóa học mới
- Cập nhật hồ sơ
- Xem chứng chỉ

## 🔧 Tùy chỉnh

### 1. Thay đổi API endpoint:
```jsx
// Trong MyCoursesPage.jsx
const response = await apiService.get('/my-courses');
// Thay đổi '/my-courses' thành endpoint khác nếu cần
```

### 2. Thêm tính năng mới:
```jsx
// Thêm state mới
const [filter, setFilter] = useState('all');

// Thêm function xử lý
const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  // Logic lọc khóa học
};
```

### 3. Tùy chỉnh CSS:
```css
/* Thay đổi màu sắc chủ đạo */
.course-card {
  border: 2px solid #your-color;
}

/* Thay đổi layout */
.courses-grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
```

## 📱 Responsive Design

Trang đã được thiết kế responsive:
- **Desktop**: Grid layout với nhiều cột
- **Tablet**: Adaptive layout
- **Mobile**: Single column, tối ưu cho mobile

## 🔐 Authentication

Trang này yêu cầu user đã đăng nhập:
- Sử dụng `authService.isAuthenticated()` để kiểm tra
- Token được tự động gửi trong headers
- Redirect về login nếu chưa đăng nhập

## 🎯 Các trường hợp sử dụng

### 1. **User chưa đăng nhập:**
- Hiển thị thông báo yêu cầu đăng nhập
- Redirect về trang login

### 2. **User chưa có khóa học:**
- Hiển thị empty state
- Call-to-action để khám phá khóa học

### 3. **User có khóa học:**
- Hiển thị danh sách khóa học
- Thông tin chi tiết mỗi khóa học
- Quick actions

## 🐛 Troubleshooting

### 1. **Lỗi 401 Unauthorized:**
- Kiểm tra token có hợp lệ không
- Kiểm tra user đã đăng nhập chưa

### 2. **Lỗi 500 Server Error:**
- Kiểm tra API endpoint có đúng không
- Kiểm tra database connection

### 3. **Không hiển thị khóa học:**
- Kiểm tra response format từ API
- Kiểm tra quan hệ User-Course trong database

## 📝 Best Practices

1. **Error Handling**: Luôn xử lý lỗi API
2. **Loading States**: Hiển thị loading khi đang tải
3. **Empty States**: Xử lý trường hợp không có dữ liệu
4. **Responsive**: Đảm bảo hiển thị tốt trên mọi thiết bị
5. **Accessibility**: Sử dụng semantic HTML và ARIA labels

## 🔄 Cập nhật dữ liệu

### Refresh data:
```jsx
const refreshCourses = () => {
  loadMyCourses();
  loadUserInfo();
};
```

### Auto refresh:
```jsx
useEffect(() => {
  const interval = setInterval(loadMyCourses, 30000); // Refresh mỗi 30s
  return () => clearInterval(interval);
}, []);
``` 