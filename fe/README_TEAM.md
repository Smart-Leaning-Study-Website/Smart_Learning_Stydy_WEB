# Hướng dẫn sử dụng Layout cho Team

## 🎯 Cách sử dụng Layout component

### 1. Import và sử dụng Layout
```jsx
import Layout from './components/Layout';

function MyPage() {
  return (
    <Layout title="Tên trang của bạn">
      {/* Nội dung trang của bạn ở đây */}
      <div>Hello World!</div>
    </Layout>
  );
}
```

### 2. Ví dụ trang hoàn chỉnh
```jsx
// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API từ backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/courses');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  return (
    <Layout title="Trang chủ">
      <div className="home-content">
        <h3>Danh sách khóa học</h3>
        {data.map(course => (
          <div key={course.id} className="course-card">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default HomePage;
```

## 🔗 Kết nối Frontend với Backend

### 1. Cấu hình API Base URL
Tạo file `src/config/api.js`:
```javascript
// src/config/api.js
export const API_BASE_URL = 'http://localhost:8000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};
```

### 2. Tạo service để gọi API
```javascript
// src/services/apiService.js
import { apiConfig } from '../config/api';

export const apiService = {
  // GET request
  async get(endpoint) {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    return response.json();
  },

  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: apiConfig.headers,
    });
    return response.json();
  }
};
```

### 3. Sử dụng trong component
```jsx
import { apiService } from '../services/apiService';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await apiService.get('/courses');
      setCourses(data);
    } catch (error) {
      console.error('Lỗi tải khóa học:', error);
    }
  };

  const createCourse = async (courseData) => {
    try {
      const newCourse = await apiService.post('/courses', courseData);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error('Lỗi tạo khóa học:', error);
    }
  };

  return (
    <Layout title="Danh sách khóa học">
      {/* Render courses */}
    </Layout>
  );
}
```

## 🚀 Cách chạy dự án

### Frontend (React)
```bash
cd fe
npm install
npm run dev
```

### Backend (Laravel)
```bash
cd be
composer install
php artisan serve
```

## 📝 Quy tắc làm việc nhóm

1. **Tên file:** Sử dụng PascalCase cho components (VD: `UserProfile.jsx`)
2. **Tên component:** Sử dụng PascalCase (VD: `UserProfile`)
3. **CSS:** Tạo file CSS riêng cho mỗi component (VD: `UserProfile.css`)
4. **API calls:** Luôn sử dụng `apiService` thay vì fetch trực tiếp
5. **Layout:** Luôn wrap component trong `<Layout>` component

## 🔧 Troubleshooting

### Lỗi CORS
Nếu gặp lỗi CORS, thêm vào Laravel backend:
```php
// be/config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // React dev server
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### Lỗi kết nối API
- Kiểm tra Laravel server có chạy không (`php artisan serve`)
- Kiểm tra URL trong `apiConfig.baseURL`
- Kiểm tra route trong Laravel có đúng không 