import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { apiService, authService } from '../services/apiService';
import './MyCoursesPage.css';

function MyCoursesPage() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated) {
      loadMyCourses();
      loadUserInfo();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadUserInfo = async () => {
    try {
      const userData = await apiService.get('/user');
      setUser(userData);
    } catch (error) {
      console.error('Lỗi tải thông tin user:', error);
    }
  };

  const loadMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get('/my-courses');
      setMyCourses(response.courses || []);
    } catch (error) {
      console.error('Lỗi tải khóa học của tôi:', error);
      setError('Không thể tải danh sách khóa học. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueLearning = (courseId) => {
    window.location.href = `/course/${courseId}/learn`;
  };

  const handleViewCourse = (courseId) => {
    window.location.href = `/course/${courseId}`;
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <Layout title="Khóa học của tôi">
        <div className="not-auth-container">
          <div className="not-auth-icon">🔒</div>
          <h3>Bạn cần đăng nhập để lấy khóa học của bạn</h3>
          <button className="btn-primary" onClick={handleLogin}>
            Đăng nhập ngay
          </button>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title="Khóa học của tôi">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải khóa học của bạn...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Khóa học của tôi">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Đã xảy ra lỗi</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={loadMyCourses}>
            Thử lại
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Khóa học của tôi">
      <div className="my-courses-page">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <h1>Khóa học của tôi</h1>
            {user && (
              <p>Chào mừng trở lại, <strong>{user.name}</strong>!</p>
            )}
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{myCourses.length}</span>
              <span className="stat-label">Khóa học</span>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="courses-section">
          {myCourses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>Bạn chưa có khóa học nào</h3>
              <p>Hãy khám phá và đăng ký các khóa học thú vị để bắt đầu học tập!</p>
              <button 
                className="btn-primary"
                onClick={() => window.location.href = '/courses'}
              >
                Khám phá khóa học
              </button>
            </div>
          ) : (
            <>
              <div className="section-header">
                <h2>Khóa học đã đăng ký</h2>
                <p>Tiếp tục học tập và hoàn thành các khóa học của bạn</p>
              </div>

              <div className="courses-grid">
                {myCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      {course.thumbnail ? (
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          onError={(e) => {
                            e.target.src = '/default-course.jpg';
                          }}
                        />
                      ) : (
                        <div className="course-placeholder">
                          <span>📚</span>
                        </div>
                      )}
                      <div className="course-status">
                        <span className="status-badge enrolled">Đã đăng ký</span>
                      </div>
                    </div>
                    
                    <div className="course-content">
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">
                        {course.description || 'Không có mô tả'}
                      </p>
                      
                      <div className="course-meta">
                        <div className="enrollment-date">
                          <span className="meta-label">Đăng ký:</span>
                          <span className="meta-value">
                            {course.pivot?.enrolled_at 
                              ? formatDate(course.pivot.enrolled_at)
                              : 'Không xác định'
                            }
                          </span>
                        </div>
                        
                        {course.progress && (
                          <div className="course-progress">
                            <span className="meta-label">Tiến độ:</span>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{course.progress}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="course-actions">
                        <button 
                          className="btn-primary"
                          onClick={() => handleContinueLearning(course.id)}
                        >
                          Tiếp tục học
                        </button>
                        <button 
                          className="btn-secondary"
                          onClick={() => handleViewCourse(course.id)}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        {myCourses.length > 0 && (
          <div className="quick-actions">
            <h3>Hành động nhanh</h3>
            <div className="actions-grid">
              <button 
                className="action-card"
                onClick={() => window.location.href = '/courses'}
              >
                <span className="action-icon">🔍</span>
                <span className="action-text">Tìm khóa học mới</span>
              </button>
              <button 
                className="action-card"
                onClick={() => window.location.href = '/profile'}
              >
                <span className="action-icon">👤</span>
                <span className="action-text">Cập nhật hồ sơ</span>
              </button>
              <button 
                className="action-card"
                onClick={() => window.location.href = '/certificates'}
              >
                <span className="action-icon">🏆</span>
                <span className="action-text">Chứng chỉ của tôi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyCoursesPage; 