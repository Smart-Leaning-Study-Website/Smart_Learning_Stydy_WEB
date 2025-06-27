import { apiConfig } from '../config/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to get headers with auth
const getHeaders = () => {
  const token = getAuthToken();
  return {
    ...apiConfig.headers,
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiService = {
  // GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  // POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  // PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  },

  // Upload file
  async upload(endpoint, formData) {
    try {
      const token = getAuthToken();
      const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  }
};

// Auth service
export const authService = {
  async login(credentials) {
    const response = await apiService.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return response;
  },

  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    return response;
  },

  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  getToken() {
    return localStorage.getItem('auth_token');
  }
}; 