import axios from 'axios';

// Updated to use your Render backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://sms-backend-wiod.onrender.com/api'
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for better UX with Render cold starts
});

// Request interceptor for adding auth token (if needed in future)
api.interceptors.request.use(
  (config) => {
    // Add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    
    // Handle network errors or timeout
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - Render service might be cold starting');
    }
    
    return Promise.reject(error);
  }
);

const studentAPI = {
  // Get all students with optional query parameters
  getStudents: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/students?${queryString}`);
  },

  // Get student by ID
  getStudent: (id) => {
    return api.get(`/students/${id}`);
  },

  // Create new student
  createStudent: (data) => {
    return api.post('/students', data);
  },

  // Update student
  updateStudent: (id, data) => {
    return api.put(`/students/${id}`, data);
  },

  // Delete student
  deleteStudent: (id) => {
    return api.delete(`/students/${id}`);
  },

  // Generate admission form PDF
  generateAdmissionForm: (id) => {
    return api.post(`/students/${id}/generate-admission-form`, {}, {
      responseType: 'blob', // Important for handling binary data
    });
  },

  // Health check endpoint (useful for Render cold starts)
  healthCheck: () => {
    return api.get('/health');
  },
};

export default studentAPI;