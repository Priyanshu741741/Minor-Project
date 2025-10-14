// User Types
export type UserRole = 'PATIENT' | 'DOCTOR';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  user_id: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  user?: User;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  specialization?: string;
  license_number?: string;
  phone?: string;
  bio?: string;
  user?: User;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface AuthResponse {
  message: string;
  token: string;
  expiresIn: string;
  user: User;
}

// Appointment Types
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_time: string;
  status: AppointmentStatus;
  reason?: string;
  created_at: string;
  updated_at: string;
  patient?: User;
  doctor?: User;
}

export interface CreateAppointmentRequest {
  doctor_id: string;
  appointment_time: string;
  reason: string;
}

// Visit Types
export interface Visit {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  visit_date: string;
  diagnosis_text?: string;
  prescription?: any;
  follow_up_reco?: string;
  created_at: string;
  updated_at: string;
  appointment?: Appointment;
  patient?: User;
  doctor?: User;
}

export interface CreateVisitRequest {
  appointment_id: string;
  patient_id: string;
  diagnosis_text: string;
  prescription: any;
  follow_up_reco: string;
}

// Remark Types
export interface Remark {
  id: string;
  visit_id: string;
  doctor_id: string;
  raw_text: string;
  created_at: string;
  visit?: Visit;
  doctor?: User;
}

export interface CreateRemarkRequest {
  visit_id: string;
  raw_text: string;
}

// Feedback Types
export interface Feedback {
  id: string;
  visit_id: string;
  patient_id: string;
  rating: number;
  comments?: string;
  created_at: string;
  visit?: Visit;
  patient?: User;
}

export interface CreateFeedbackRequest {
  visit_id: string;
  rating: number;
  comments: string;
}

// NLP Result Types
export type SourceType = 'REMARK' | 'FEEDBACK';

export interface NLPResult {
  id: string;
  source_type: SourceType;
  source_id: string;
  processed_data?: any;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: any;
}

// Update Profile Types
export interface UpdatePatientProfileRequest {
  full_name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
}

export interface UpdateDoctorProfileRequest {
  full_name?: string;
  specialization?: string;
  license_number?: string;
  phone?: string;
  bio?: string;
}
