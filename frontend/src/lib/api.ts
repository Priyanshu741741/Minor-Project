import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; full_name: string; role: 'PATIENT' | 'DOCTOR' }) =>
    api.post('/api/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

// User API
export const userAPI = {
  getMe: () => api.get('/api/users/me'),
  
  updateMe: (data: any) => api.put('/api/users/me', data),
};

// Profile API
export const profileAPI = {
  getDoctors: () => api.get('/api/profiles/doctors'),
  
  getDoctorById: (doctorId: string) => api.get(`/api/profiles/doctors/${doctorId}`),
  
  getMyPatientProfile: () => api.get('/api/profiles/patients/me'),
};

// Appointment API
export const appointmentAPI = {
  create: (data: { doctor_id: string; appointment_time: string; reason: string }) =>
    api.post('/api/appointments', data),
  
  getMyAppointments: () => api.get('/api/appointments'),
};

// Visit API
export const visitAPI = {
  create: (data: {
    appointment_id: string;
    patient_id: string;
    diagnosis_text: string;
    prescription: any;
    follow_up_reco: string;
  }) => api.post('/api/visits', data),
  
  getMyVisits: () => api.get('/api/visits'),
};

// Remark API
export const remarkAPI = {
  create: (data: { visit_id: string; raw_text: string }) =>
    api.post('/api/remarks', data),
  
  getByVisitId: (visitId: string) => api.get(`/api/remarks/${visitId}`),
};

// Feedback API
export const feedbackAPI = {
  create: (data: { visit_id: string; rating: number; comments: string }) =>
    api.post('/api/feedbacks', data),
  
  getByVisitId: (visitId: string) => api.get(`/api/feedbacks/${visitId}`),
};

// NLP Result API
export const nlpResultAPI = {
  getById: (resultId: string) => api.get(`/api/nlp-results/${resultId}`),
};

export default api;
