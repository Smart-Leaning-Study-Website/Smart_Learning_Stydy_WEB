import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiService } from '../services/apiService';
import './HomePage.css';

function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalInstructors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      // Load featured courses
      const coursesData = await apiService.get('/courses?featured=1&limit=6');
      setFeaturedCourses(coursesData);
      
      // Load statistics (nếu có API)
      try {
        const statsData = await apiService.get('/stats');
        setStats(statsData);
      } catch (error) {
        // Fallback data nếu API chưa có
        setStats({
          totalCourses: 150,
          totalStudents: 2500,
          totalInstructors: 45
        });
      }
      
    } catch (error) {
      console.error('Lỗi tải dữ liệu trang chủ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId) => {
    // Có thể dùng React Router để navigate
    window.location.href = `/course/${courseId}`;
  };

  const handleGetStarted = () => {
    window.location.href = '/register';
  };

  if (loading) {
    return (
      <Layout title="Trang chủ - Smart Learning">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Trang chủ - Smart Learning">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Học tập thông minh, 
            <span className="highlight"> Tương lai tươi sáng</span>
          </h1>
          <p className="hero-description">
            Khám phá hàng trăm khóa học chất lượng cao từ các chuyên gia hàng đầu. 
            Học mọi lúc, mọi nơi với nền tảng học tập thông minh của chúng tôi.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Bắt đầu học ngay
            </button>
            <button className="btn-secondary">
              Xem khóa học
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <span>🎓</span>
            <p>Smart Learning</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{stats.totalCourses}+</div>
            <div className="stat-label">Khóa học</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.totalStudents}+</div>
            <div className="stat-label">Học viên</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.totalInstructors}+</div>
            <div className="stat-label">Giảng viên</div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="section-header">
          <h2>Khóa học nổi bật</h2>
          <p>Những khóa học được yêu thích nhất</p>
        </div>
        
        <div className="courses-grid">
          {featuredCourses.length > 0 ? (
            featuredCourses.map(course => (
              <div 
                key={course.id} 
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-image">
                  <img 
                    src={course.image || '/default-course.jpg'} 
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = '/default-course.jpg';
                    }}
                  />
                  <div className="course-overlay">
                    <span className="view-more">Xem chi tiết</span>
                  </div>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="price">Miễn phí</span>
                    <span className="rating">⭐ 4.8</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback courses nếu API chưa có dữ liệu
            [
              {
                id: 1,
                title: "Lập trình Web cơ bản",
                description: "Học HTML, CSS, JavaScript từ cơ bản đến nâng cao",
                image: null
              },
              {
                id: 2,
                title: "React.js cho người mới bắt đầu",
                description: "Xây dựng ứng dụng web hiện đại với React",
                image: null
              },
              {
                id: 3,
                title: "Laravel Framework",
                description: "Phát triển backend với Laravel PHP",
                image: null
              }
            ].map(course => (
              <div 
                key={course.id} 
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-image">
                  <div className="course-placeholder">
                    <span>📚</span>
                  </div>
                  <div className="course-overlay">
                    <span className="view-more">Xem chi tiết</span>
                  </div>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="price">Miễn phí</span>
                    <span className="rating">⭐ 4.8</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="view-all-courses">
          <button className="btn-outline">
            Xem tất cả khóa học
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Tại sao chọn Smart Learning?</h2>
          <p>Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Học tập cá nhân hóa</h3>
            <p>Lộ trình học tập được thiết kế riêng cho từng học viên</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Học mọi lúc mọi nơi</h3>
            <p>Truy cập từ bất kỳ thiết bị nào, online hoặc offline</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Cộng đồng học tập</h3>
            <p>Kết nối với bạn bè và giảng viên trong cộng đồng</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Chứng chỉ uy tín</h3>
            <p>Nhận chứng chỉ được công nhận bởi các tổ chức hàng đầu</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng bắt đầu hành trình học tập?</h2>
          <p>Tham gia cùng hàng nghìn học viên đã thành công</p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Đăng ký miễn phí ngay
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage; 