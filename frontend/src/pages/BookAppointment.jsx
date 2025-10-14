import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { appointmentAPI, profileAPI } from '../lib/api';
import { isAuthenticated, isPatient, logout } from '../lib/auth';
import { Calendar, Clock, User, FileText } from 'lucide-react';

export function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_time: '',
    reason: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    if (!isPatient()) {
      setError('Only patients can book appointments');
      return;
    }
    fetchDoctors();
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getDoctors();
      setDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load doctors');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.doctor_id || !formData.appointment_time || !formData.reason) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      // Convert to ISO string for API
      const appointmentData = {
        ...formData,
        appointment_time: new Date(formData.appointment_time).toISOString(),
      };
      await appointmentAPI.create(appointmentData);
      navigate('/appointments');
    } catch (err) {
      console.error('Error booking appointment:', err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(
          err.response?.data?.message || 'Failed to book appointment. Please try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/appointments"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Appointments
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Book New Appointment</h1>
          <p className="mt-2 text-gray-600">Schedule a consultation with a doctor</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Doctor */}
            <div>
              <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Select Doctor *
              </label>
              <select
                id="doctor_id"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.full_name} - {doctor.doctor_profile?.specialization || 'General'}
                  </option>
                ))}
              </select>
              {doctors.length === 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  No doctors available. Please try again later.
                </p>
              )}
            </div>

            {/* Date & Time */}
            <div>
              <label
                htmlFor="appointment_time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="inline w-4 h-4 mr-1" />
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="appointment_time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Reason for Visit *
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Please describe your symptoms or reason for consultation..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting || doctors.length === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
              <Link
                to="/appointments"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
