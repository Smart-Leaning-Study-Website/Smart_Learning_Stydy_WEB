import React from 'react';
import HomePage from './pages/HomePage';
import MyCoursesPage from './pages/MyCoursesPage';
import WatchVideoPage from './pages/WatchVideoPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#333',
      color: 'white',
      padding: '10px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <Link
        to="/"
        style={{
          background: location.pathname === '/' ? '#667eea' : '#555',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
        Trang chủ
      </Link>
      <Link
        to="/my-courses"
        style={{
          background: location.pathname === '/my-courses' ? '#667eea' : '#555',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
        Khóa học của tôi
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/watch-video/:id" element={<WatchVideoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;