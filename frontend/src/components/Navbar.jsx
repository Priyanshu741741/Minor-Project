import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUser } from '../lib/auth';

export function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-gray-50 font-sans">
      <div className="max-w-[95%] mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-base">D</span>
          </div>
          <span className="font-medium text-2xl text-gray-900 tracking-wide">Dispensary</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/doctors" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
            Doctors
          </Link>
          {loggedIn && (
            <>
              <Link to="/dashboard" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
                Dashboard
              </Link>
              <Link to="/appointments" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
                Appointments
              </Link>
              <Link to="/visits" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
                Visits
              </Link>
              <Link to="/profile" className="text-gray-900 hover:text-black transition-colors text-base font-normal">
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">
                👋 {user?.full_name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 px-6 py-2.5 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register/patient"
                className="text-gray-900 hover:text-black transition-colors text-base font-normal hidden sm:block"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 px-6 py-2.5 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Login →
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
