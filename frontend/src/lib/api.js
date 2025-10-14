import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
console.log('🔗 API Base URL:', apiURL);

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔐 Token exists:', !!token);
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.method.toUpperCase(), response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ No response received:', error.request);
    } else {
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

// User API
export const userAPI = {
  getMe: () => api.get('/api/users/me'),
  updateMe: (data) => api.put('/api/users/me', data),
};

// Profile API
export const profileAPI = {
  getDoctors: () => api.get('/api/profiles/doctors'),
  getDoctorById: (doctorId) => api.get(`/api/profiles/doctors/${doctorId}`),
  getMyPatientProfile: () => api.get('/api/profiles/patients/me'),
};

// Appointment API
export const appointmentAPI = {
  create: (data) => api.post('/api/appointments', data),
  getMyAppointments: () => api.get('/api/appointments'),
};

// Visit API
export const visitAPI = {
  create: (data) => api.post('/api/visits', data),
  getMyVisits: () => api.get('/api/visits'),
};

// Feedback API
export const feedbackAPI = {
  create: (data) => api.post('/api/feedbacks', data),
  getByVisitId: (visitId) => api.get(`/api/feedbacks/${visitId}`),
};

// Remark API
export const remarkAPI = {
  create: (data) => api.post('/api/remarks', data),
  getByVisitId: (visitId) => api.get(`/api/remarks/${visitId}`),
};

export default api;
