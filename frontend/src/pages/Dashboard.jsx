import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../lib/api';
import { isAuthenticated, getUser, logout, isDoctor, isPatient } from '../lib/auth';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Menu,
  Clock,
  MapPin,
  Users,
  Calendar,
  LogOut,
  User as UserIcon,
  X,
  Home,
  CalendarDays,
  Stethoscope,
  FileText,
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, parseISO } from 'date-fns';

export function Dashboard() {
  console.log('Dashboard component loaded');
  
  const navigate = useNavigate();
  const user = getUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('week');
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  console.log('Before useEffect');

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Is authenticated:', isAuthenticated());
    console.log('User:', user);
    
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    fetchAppointments();
  }, [navigate]);

  console.log('After useEffect, loading:', loading);

  const fetchAppointments = async () => {
    try {
      console.log('Fetching appointments...');
      setLoading(true);
      const response = await appointmentAPI.getMyAppointments();
      console.log('Appointments response:', response.data);
      // Log first appointment to check structure
      if (response.data && response.data.length > 0) {
        console.log('First appointment structure:', response.data[0]);
        console.log('Appointment time field:', response.data[0].appointment_time);
      }
      setAppointments(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching appointments:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load appointments');
      }
    } finally {
      setLoading(false);
      console.log('Loading complete');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const nextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const prevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  // Generate week days
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const timeSlots = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  // Helper function to calculate event position and height
  const calculateEventStyle = (startTime) => {
    const date = new Date(startTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const start = hours + minutes / 60;
    const top = (start - 8) * 80; // 80px per hour
    const height = 80; // 1 hour default
    return { top: `${top}px`, height: `${height}px` };
  };

  // Group appointments by day
  const getAppointmentsForDay = (date) => {
    return appointments.filter(apt => {
      if (!apt.appointment_time) {
        console.warn('Appointment missing date:', apt);
        return false;
      }
      try {
        const aptDate = parseISO(apt.appointment_time);
        return isSameDay(aptDate, date);
      } catch (error) {
        console.error('Error parsing appointment date:', apt.appointment_time, error);
        return false;
      }
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Sample calendar colors for mini calendar
  const myCalendars = [
    { name: 'My Appointments', color: 'bg-blue-500' },
    { name: 'Scheduled', color: 'bg-green-500' },
    { name: 'Cancelled', color: 'bg-red-500' },
  ];

  // Mini calendar days
  const currentMonth = format(new Date(), 'MMMM yyyy');
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const firstDayOffset = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
  const miniCalendarDays = Array.from({ length: daysInMonth + firstDayOffset }, (_, i) =>
    i < firstDayOffset ? null : i - firstDayOffset + 1,
  );

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main dashboard');
  
  // Debug mode - remove this after fixing
  const DEBUG_MODE = true;
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* DEBUG INFO - Remove after testing */}
      {DEBUG_MODE && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 10000,
          fontSize: '12px',
          maxWidth: '300px'
        }}>
          <div style={{fontWeight: 'bold', marginBottom: '8px'}}>🐛 DEBUG INFO</div>
          <div>✅ Dashboard Rendering</div>
          <div>User: {user?.email || user?.name || 'No user'}</div>
          <div>Role: {user?.role || 'No role'}</div>
          <div>Appointments: {appointments.length}</div>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>Error: {error || 'None'}</div>
        </div>
      )}
      
      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="text-xl md:text-2xl font-semibold text-gray-900">
            {isDoctor() ? 'Doctor Dashboard' : 'Patient Dashboard'}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="rounded-full bg-gray-100 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative h-[calc(100vh-80px)] w-full flex">
        {/* Sidebar */}
        <div
          className={`${
            showMobileMenu ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-20 w-64 h-full bg-white shadow-xl border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto`}
        >
          <div>
            <button
              onClick={() => navigate('/appointments/book')}
              className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white w-full hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Book Appointment</span>
            </button>

            {/* Mini Calendar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-medium">{currentMonth}</h3>
                <div className="flex gap-1">
                  <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs text-gray-500 font-medium py-1">
                    {day}
                  </div>
                ))}

                {miniCalendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-xs rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ${
                      day === new Date().getDate() && format(new Date(), 'MMMM yyyy') === currentMonth
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${!day ? 'invisible' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* My Calendars */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-medium mb-3">My Calendars</h3>
              <div className="space-y-2">
                {myCalendars.map((cal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                    <span className="text-gray-700 text-sm">{cal.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-4">
              <h3 className="text-gray-900 font-medium mb-3">Quick Links</h3>
              <div className="space-y-1">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-sm">Home</span>
                </button>
                <button
                  onClick={() => navigate('/appointments')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm">All Appointments</span>
                </button>
                {isDoctor() && (
                  <button
                    onClick={() => navigate('/visits')}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span className="text-sm">Patient Visits</span>
                  </button>
                )}
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-600 w-full hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Overlay for mobile menu */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Calendar View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Calendar Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={goToToday}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Today
              </button>
              <div className="flex">
                <button
                  onClick={prevWeek}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-l-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextWeek}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-r-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-lg p-1 bg-gray-100">
              <button
                onClick={() => setCurrentView('day')}
                className={`px-3 py-1.5 rounded-md ${
                  currentView === 'day' ? 'bg-white shadow-sm' : ''
                } text-gray-700 text-sm font-medium transition-all`}
              >
                Day
              </button>
              <button
                onClick={() => setCurrentView('week')}
                className={`px-3 py-1.5 rounded-md ${
                  currentView === 'week' ? 'bg-white shadow-sm' : ''
                } text-gray-700 text-sm font-medium transition-all`}
              >
                Week
              </button>
              <button
                onClick={() => setCurrentView('month')}
                className={`px-3 py-1.5 rounded-md ${
                  currentView === 'month' ? 'bg-white shadow-sm' : ''
                } text-gray-700 text-sm font-medium transition-all`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Summary Cards for Doctor/Patient */}
          <div className="p-4 bg-white/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isDoctor() ? (
                <>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Today's Appointments</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {appointments.filter(apt => {
                            try {
                              return apt.appointment_time && isSameDay(parseISO(apt.appointment_time), new Date());
                            } catch (e) {
                              return false;
                            }
                          }).length}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {new Set(appointments.map(apt => apt.patientId)).size}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Upcoming</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {appointments.filter(apt => apt.status === 'SCHEDULED').length}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Next Appointment</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {(() => {
                            const nextApt = appointments.filter(apt => {
                              try {
                                return apt.status === 'SCHEDULED' && apt.appointment_time && new Date(apt.appointment_time) > new Date();
                              } catch (e) {
                                return false;
                              }
                            })[0];
                            if (nextApt && nextApt.appointment_time) {
                              try {
                                return format(parseISO(nextApt.appointment_time), 'MMM d, h:mm a');
                              } catch (e) {
                                return 'Invalid Date';
                              }
                            }
                            return 'None';
                          })()}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <CalendarDays className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Appointments</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{appointments.length}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Upcoming</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {appointments.filter(apt => apt.status === 'SCHEDULED').length}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Week View */}
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-xl border border-gray-200 shadow-xl h-full overflow-hidden">
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100/50">
                <div className="p-3 text-center text-gray-500 text-xs font-medium"></div>
                {weekDays.map((day, i) => (
                  <div key={i} className="p-3 text-center border-l border-gray-200">
                    <div className="text-xs text-gray-500 font-medium mb-1">{day}</div>
                    <div
                      className={`text-lg font-semibold ${
                        isSameDay(weekDates[i], new Date())
                          ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                          : 'text-gray-900'
                      }`}
                    >
                      {format(weekDates[i], 'd')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="grid grid-cols-8 overflow-auto" style={{ maxHeight: 'calc(100vh - 450px)' }}>
                {/* Time Labels */}
                <div className="text-gray-500 bg-gray-50">
                  {timeSlots.map((time, i) => (
                    <div key={i} className="h-20 border-b border-gray-200 pr-2 text-right text-xs pt-1 font-medium">
                      {time > 12 ? `${time - 12} PM` : time === 12 ? '12 PM' : `${time} AM`}
                    </div>
                  ))}
                </div>

                {/* Days Columns */}
                {weekDates.map((date, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className={`border-l border-gray-200 relative ${
                      isSameDay(date, new Date()) ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    {timeSlots.map((_, timeIndex) => (
                      <div 
                        key={timeIndex} 
                        className="h-20 border-b border-gray-100 hover:bg-blue-50/40 cursor-pointer transition-colors relative"
                        style={{
                          backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 100%)'
                        }}
                      >
                        {/* Time slot grid lines for visual effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
                      </div>
                    ))}

                    {/* Appointments */}
                    {getAppointmentsForDay(date).map((apt, i) => {
                      if (!apt.appointment_time) return null;
                      
                      let eventStyle;
                      let timeDisplay = 'Time N/A';
                      
                      try {
                        eventStyle = calculateEventStyle(apt.appointment_time);
                        timeDisplay = format(parseISO(apt.appointment_time), 'h:mm a');
                      } catch (error) {
                        console.error('Error formatting appointment:', apt, error);
                        eventStyle = { top: '0px', height: '60px' };
                      }
                      
                      // Random rotation for sticky note effect (-2 to 2 degrees)
                      const rotations = ['-2deg', '-1deg', '0deg', '1deg', '2deg'];
                      const rotation = rotations[i % rotations.length];
                      
                      return (
                        <div
                          key={i}
                          className={`absolute ${getStatusColor(apt.status)} rounded-sm p-3 text-white text-xs cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl group`}
                          style={{
                            ...eventStyle,
                            left: '6px',
                            right: '6px',
                            minHeight: '70px',
                            transform: `rotate(${rotation})`,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                            backgroundImage: `
                              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `rotate(${rotation}) translateY(0)`;
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
                          }}
                          onClick={() => handleEventClick(apt)}
                        >
                          {/* Sticky note tape effect */}
                          <div 
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/20 rounded-sm"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                          />
                          
                          <div className="relative z-10">
                            <div className="font-bold truncate text-sm mb-1">
                              {isDoctor() ? apt.patient?.full_name : apt.doctor?.full_name}
                            </div>
                            <div className="flex items-center gap-1 opacity-90 mb-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-[10px] font-medium">{timeDisplay}</span>
                            </div>
                            <div className="opacity-80 text-[10px] line-clamp-2 leading-relaxed">
                              {apt.reason}
                            </div>
                          </div>
                          
                          {/* Corner fold effect */}
                          <div 
                            className="absolute bottom-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] opacity-20"
                            style={{
                              borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${getStatusColor(selectedEvent.status)} p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Appointment Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-3 text-white">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-xs opacity-80">
                      {isDoctor() ? 'Patient' : 'Doctor'}
                    </p>
                    <p className="font-semibold">
                      {isDoctor() ? selectedEvent.patient?.full_name : selectedEvent.doctor?.full_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-xs opacity-80">Date & Time</p>
                    <p className="font-semibold">
                      {selectedEvent.appointment_time 
                        ? (() => {
                            try {
                              return format(parseISO(selectedEvent.appointment_time), 'MMMM d, yyyy - h:mm a');
                            } catch (e) {
                              return 'Date not available';
                            }
                          })()
                        : 'Date not available'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-xs opacity-80">Reason</p>
                    <p className="font-semibold">{selectedEvent.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-xs opacity-80">Status</p>
                    <p className="font-semibold capitalize">{selectedEvent.status.toLowerCase()}</p>
                  </div>
                </div>
                {selectedEvent.notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs opacity-80">Notes</p>
                      <p className="text-sm">{selectedEvent.notes}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl transition-colors font-medium"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
                {selectedEvent.status === 'SCHEDULED' && (
                  <button
                    className="flex-1 bg-white text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => {
                      setSelectedEvent(null);
                      navigate('/appointments');
                    }}
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
