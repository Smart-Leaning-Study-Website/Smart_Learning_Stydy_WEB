import React from "react";
import "./Layout.css";
import { authService } from '../services/apiService';

const Layout = ({ children, title = "Smart Learning" }) => {
  const isAuthenticated = authService.isAuthenticated();

  const handleLogin = () => {
    window.location.href = '/login';
  };
  const handleRegister = () => {
    window.location.href = '/register';
  };
  const handleProfile = () => {
    window.location.href = '/profile';
  };
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content" style={{justifyContent: 'space-between'}}>
          <div className="logo" style={{cursor: 'pointer'}} onClick={() => window.location.href = '/'}>
            Smart Learning
          </div>
          <div className="auth-actions">
            {!isAuthenticated ? (
              <>
                <button className="btn-header" onClick={handleLogin}>Đăng nhập</button>
                <button className="btn-header btn-primary-header" onClick={handleRegister}>Đăng ký</button>
              </>
            ) : (
              <>
                <button className="btn-header" onClick={handleProfile}>Hồ sơ</button>
                <button className="btn-header btn-logout" onClick={handleLogout}>Đăng xuất</button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {title && <h2 className="page-title">{title}</h2>}
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Smart Learning. Được phát triển bởi nhóm của bạn.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;