import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import MyCoursesPage from './pages/MyCoursesPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {/* Demo Navigation - Có thể xóa sau khi test xong */}
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
        <button 
          onClick={() => setCurrentPage('home')}
          style={{ 
            background: currentPage === 'home' ? '#667eea' : '#555',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Trang chủ
        </button>
        <button 
          onClick={() => setCurrentPage('my-courses')}
          style={{ 
            background: currentPage === 'my-courses' ? '#667eea' : '#555',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Khóa học của tôi
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginTop: '60px' }}>
        {currentPage === 'home' ? <HomePage /> : <MyCoursesPage />}
      </div>
    </div>
  )
}

export default App
