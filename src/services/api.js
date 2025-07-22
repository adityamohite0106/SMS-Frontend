import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token (if needed in future)
api.interceptors.request.use(
  (config) => {
    // Add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('token');
      // window.location.href = '/login';
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
};

export default studentAPI;
