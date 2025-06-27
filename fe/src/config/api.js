  // API Configuration for connecting to Laravel backend
export const API_BASE_URL = 'http://localhost:8000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Course endpoints
  COURSES: '/courses',
  COURSE_DETAIL: (id) => `/courses/${id}`,
  
  // User endpoints
  USER_PROFILE: '/user/profile',
  USER_COURSES: '/user/courses',
}; 