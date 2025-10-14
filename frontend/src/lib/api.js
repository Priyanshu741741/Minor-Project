import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
