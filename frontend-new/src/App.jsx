import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Doctors } from './pages/Doctors';
import { BookAppointment } from './pages/BookAppointment';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';
import './index.css';

function App() {
  return (
    <Router>
      <div className="relative antialiased font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/appointments/book" 
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
