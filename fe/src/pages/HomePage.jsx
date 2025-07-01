import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const featuredCourses = [
    {
      id: 1,
      title: "Học JavaScript cơ bản",
      description: "Khóa học giúp bạn nắm vững nền tảng JavaScript từ con số 0.",
      isJS: true
    },
    {
      id: 2,
      title: "Lập trình Web cơ bản",
      description: "Học HTML, CSS, JavaScript từ cơ bản đến nâng cao",
    },
    {
      id: 3,
      title: "React.js cho người mới bắt đầu",
      description: "Xây dựng ứng dụng web hiện đại với React",
    },
    {
      id: 4,
      title: "Laravel Framework",
      description: "Phát triển backend với Laravel PHP",
    }
  ];

  const stats = {
    totalCourses: 150,
    totalStudents: 2500,
    totalInstructors: 45
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: 24,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e9eefa 100%)',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        marginBottom: 48,
        padding: '40px 0 24px 0',
        background: 'linear-gradient(90deg, #667eea 0%, #5a67d8 100%)',
        borderRadius: 16,
        color: 'white',
        boxShadow: '0 4px 24px #b3b3e6'
      }}>
        <h1 style={{ fontSize: 40, margin: 0, fontWeight: 700 }}>
          Học tập thông minh, <span style={{ color: '#ffd700' }}>Tương lai tươi sáng</span>
        </h1>
        <p style={{ fontSize: 20, color: '#e0e7ff', margin: '18px 0 0 0' }}>
          Khám phá hàng trăm khóa học chất lượng cao từ các chuyên gia hàng đầu.<br />
          Học mọi lúc, mọi nơi với nền tảng học tập thông minh của chúng tôi.
        </p>
        <button
          style={{
            background: '#ffd700',
            color: '#333',
            border: 'none',
            padding: '14px 38px',
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 28,
            boxShadow: '0 2px 8px #aaa',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.target.style.background = '#ffe066'}
          onMouseOut={e => e.target.style.background = '#ffd700'}
        >
          Bắt đầu học ngay
        </button>
      </section>

      {/* Stats Section */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        marginBottom: 48,
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px #e0e7ff',
          padding: '24px 36px',
          textAlign: 'center',
          minWidth: 160
        }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#667eea' }}>{stats.totalCourses}+</div>
          <div style={{ color: '#555', fontSize: 18 }}>Khóa học</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px #e0e7ff',
          padding: '24px 36px',
          textAlign: 'center',
          minWidth: 160
        }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#667eea' }}>{stats.totalStudents}+</div>
          <div style={{ color: '#555', fontSize: 18 }}>Học viên</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px #e0e7ff',
          padding: '24px 36px',
          textAlign: 'center',
          minWidth: 160
        }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#667eea' }}>{stats.totalInstructors}+</div>
          <div style={{ color: '#555', fontSize: 18 }}>Giảng viên</div>
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 32,
          fontSize: 28,
          color: '#333',
          fontWeight: 700
        }}>Khóa học nổi bật</h2>
        <div style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {featuredCourses.map(course => (
            <div
              key={course.id}
              style={{
                border: 'none',
                borderRadius: 14,
                padding: 28,
                width: 300,
                background: 'white',
                boxShadow: '0 4px 16px #e0e7ff',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 32px #b3b3e6';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px #e0e7ff';
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#5a67d8' }}>{course.title}</div>
              <div style={{ color: '#555', marginBottom: 18 }}>{course.description}</div>
              <button
                style={{
                  background: course.isJS ? '#ffd700' : '#667eea',
                  color: course.isJS ? '#333' : 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: '0 2px 8px #aaa',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.target.style.background = course.isJS ? '#ffe066' : '#5a67d8'}
                onMouseOut={e => e.target.style.background = course.isJS ? '#ffd700' : '#667eea'}
                onClick={() => {
                  if (course.isJS) {
                    navigate('/watch-video/1'); // 1 là id video JS trong database
                  }
                }}
              >
                {course.isJS ? 'Học JS ngay' : 'Xem chi tiết'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;