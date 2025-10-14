import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { visitAPI } from '../lib/api';
import { isAuthenticated, isDoctor, logout } from '../lib/auth';
import { Calendar, User, FileText, Pill, ClipboardList } from 'lucide-react';

export function Visits() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchVisits();
  }, [navigate]);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const response = await visitAPI.getAll();
      setVisits(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching visits:', err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load visits');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading visits...</p>
        </div>
      </div>
    );
  }

  const isDoctorRole = isDoctor();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              {isDoctorRole ? 'Patient Visits' : 'My Visit History'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {isDoctorRole 
                ? 'View all patient visit records' 
                : 'View your medical visit history'}
            </p>
          </div>
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {visits.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              No visits recorded
            </h3>
            <p className="text-gray-500">
              {isDoctorRole 
                ? 'No patient visits have been recorded yet' 
                : 'You have no visit history yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {visits.map((visit) => (
              <div
                key={visit.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                {/* Visit Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Visit Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(visit.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visit Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient/Doctor Info */}
                  <div className="space-y-4">
                    {isDoctorRole ? (
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Patient</p>
                          <p className="font-medium text-gray-900">
                            {visit.patient?.full_name || 'Unknown Patient'}
                          </p>
                          {visit.patient?.email && (
                            <p className="text-sm text-gray-500">{visit.patient.email}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Doctor</p>
                          <p className="font-medium text-gray-900">
                            Dr. {visit.doctor?.full_name || 'Unknown Doctor'}
                          </p>
                          {visit.doctor?.specialization && (
                            <p className="text-sm text-gray-500">{visit.doctor.specialization}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Diagnosis */}
                    {visit.diagnosis_text && (
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Diagnosis</p>
                          <p className="text-gray-900">{visit.diagnosis_text}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Prescription & Follow-up */}
                  <div className="space-y-4">
                    {visit.prescription && (
                      <div className="flex items-start gap-3">
                        <Pill className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-2">Prescription</p>
                          <div className="bg-gray-50 rounded-lg p-3">
                            {typeof visit.prescription === 'string' ? (
                              <p className="text-sm text-gray-900">{visit.prescription}</p>
                            ) : (
                              <div className="text-sm space-y-1">
                                {visit.prescription.medication && (
                                  <p className="text-gray-900">
                                    <span className="font-medium">Medication:</span>{' '}
                                    {visit.prescription.medication}
                                  </p>
                                )}
                                {visit.prescription.dosage && (
                                  <p className="text-gray-900">
                                    <span className="font-medium">Dosage:</span>{' '}
                                    {visit.prescription.dosage}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {visit.follow_up_reco && (
                      <div className="flex items-start gap-3">
                        <ClipboardList className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Follow-up Recommendation</p>
                          <p className="text-gray-900">{visit.follow_up_reco}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Appointment */}
                {visit.appointment && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Related to appointment on{' '}
                      {formatDate(visit.appointment.appointment_time)}
                      {visit.appointment.reason && ` - ${visit.appointment.reason}`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visit Count */}
        {visits.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Total: {visits.length} visit{visits.length !== 1 ? 's' : ''}
          </div>
        )}
      </main>
    </div>
  );
}
