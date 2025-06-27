# Hướng dẫn sử dụng HomePage Component

## 📋 Tổng quan

`HomePage.jsx` là một ví dụ hoàn chỉnh về cách tạo trang chủ sử dụng Layout component và API service. Component này bao gồm:

- **Hero Section**: Phần giới thiệu chính với call-to-action
- **Stats Section**: Hiển thị thống kê (số khóa học, học viên, giảng viên)
- **Featured Courses**: Danh sách khóa học nổi bật
- **Features Section**: Giới thiệu tính năng của platform
- **CTA Section**: Call-to-action cuối trang

## 🚀 Cách sử dụng

### 1. Import và sử dụng
```jsx
import HomePage from './pages/HomePage';

function App() {
  return <HomePage />;
}
```

### 2. Tùy chỉnh nội dung

#### Thay đổi text trong Hero Section:
```jsx
// Trong HomePage.jsx, tìm và thay đổi:
<h1 className="hero-title">
  Học tập thông minh, 
  <span className="highlight"> Tương lai tươi sáng</span>
</h1>
```

#### Thay đổi thống kê:
```jsx
// Thay đổi fallback data trong loadHomeData():
setStats({
  totalCourses: 150,    // Thay đổi số này
  totalStudents: 2500,  // Thay đổi số này
  totalInstructors: 45  // Thay đổi số này
});
```

#### Thay đổi khóa học mẫu:
```jsx
// Trong phần fallback courses, thay đổi:
[
  {
    id: 1,
    title: "Lập trình Web cơ bản",  // Thay đổi tên khóa học
    description: "Học HTML, CSS, JavaScript từ cơ bản đến nâng cao", // Thay đổi mô tả
    image: null
  },
  // Thêm khóa học mới...
]
```

## 🔗 Kết nối với Backend

### 1. API Endpoints cần thiết:

#### Lấy khóa học nổi bật:
```
GET /api/courses?featured=1&limit=6
```

#### Lấy thống kê:
```
GET /api/stats
```

### 2. Response format mong đợi:

#### Courses API:
```json
[
  {
    "id": 1,
    "title": "Tên khóa học",
    "description": "Mô tả khóa học",
    "image": "url_hình_ảnh",
    "price": "Miễn phí",
    "rating": 4.8
  }
]
```

#### Stats API:
```json
{
  "totalCourses": 150,
  "totalStudents": 2500,
  "totalInstructors": 45
}
```

## 🎨 Tùy chỉnh CSS

### 1. Thay đổi màu sắc chủ đạo:
```css
/* Trong HomePage.css, thay đổi gradient: */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Thay đổi màu sắc ở đây */
}
```

### 2. Thay đổi layout:
```css
/* Thay đổi grid layout cho courses: */
.courses-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  /* Thay đổi minmax để điều chỉnh kích thước card */
}
```

## 📱 Responsive Design

Component đã được thiết kế responsive với breakpoint chính:
- **Desktop**: Grid layout với nhiều cột
- **Mobile**: Single column layout

### Tùy chỉnh breakpoint:
```css
@media (max-width: 768px) {
  /* Thay đổi 768px thành breakpoint mong muốn */
}
```

## 🔧 Troubleshooting

### 1. Lỗi API không kết nối:
- Kiểm tra Laravel server có chạy không
- Kiểm tra URL trong `apiConfig.baseURL`
- Kiểm tra CORS configuration

### 2. Hình ảnh không hiển thị:
- Component có fallback cho hình ảnh lỗi
- Thêm hình ảnh mặc định vào `public/` folder

### 3. Loading không dừng:
- Kiểm tra API response format
- Đảm bảo `setLoading(false)` được gọi trong `finally`

## 📝 Best Practices

1. **Luôn sử dụng Layout component** cho consistency
2. **Xử lý loading state** để UX tốt hơn
3. **Có fallback data** khi API chưa sẵn sàng
4. **Error handling** cho tất cả API calls
5. **Responsive design** cho mọi thiết bị

## 🎯 Ví dụ tùy chỉnh nhanh

### Thay đổi theme màu:
```css
/* Thay đổi từ tím sang xanh */
:root {
  --primary-color: #3498db;
  --secondary-color: #2980b9;
}
```

### Thêm animation:
```css
.hero-title {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
``` 