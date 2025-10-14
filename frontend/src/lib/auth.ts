import { User } from '@/types';

// Store token in localStorage
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Remove token from localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Store user data
export const setUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Get user data
export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Check if user is a doctor
export const isDoctor = (): boolean => {
  const user = getUser();
  return user?.role === 'DOCTOR';
};

// Check if user is a patient
export const isPatient = (): boolean => {
  const user = getUser();
  return user?.role === 'PATIENT';
};

// Logout
export const logout = (): void => {
  removeToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Legacy object export for backwards compatibility
export const authHelpers = {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  isAuthenticated,
  isDoctor,
  isPatient,
  logout,
};
