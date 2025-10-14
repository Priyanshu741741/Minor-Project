import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { RegisterPatient } from './pages/RegisterPatient';
import { RegisterDoctor } from './pages/RegisterDoctor';
import { Appointments } from './pages/Appointments';
import { BookAppointment } from './pages/BookAppointment';
import { Doctors } from './pages/Doctors';
import { Profile } from './pages/Profile';
import { Visits } from './pages/Visits';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/doctors" element={<Doctors />} />
        
        {/* Protected Routes */}
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/book" element={<BookAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/visits" element={<Visits />} />
      </Routes>
    </Router>
  );
}

export default App;
