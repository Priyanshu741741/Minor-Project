'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { appointmentAPI, profileAPI } from '@/lib/api';
import { isAuthenticated, isPatient } from '@/lib/auth';

function BookAppointmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId');

  const [formData, setFormData] = useState({
    doctor_id: doctorIdParam || '',
    appointment_time: '',
    reason: '',
  });
  const [doctors, setDoctors] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login?redirect=/appointments/book');
      return;
    }

    if (!isPatient()) {
      setError('Only patients can book appointments.');
      setLoadingDoctors(false);
      return;
    }

    // Fetch doctors list
    fetchDoctors();
  }, [router]);

  const fetchDoctors = async () => {
    try {
      const response = await profileAPI.getDoctors();
      setDoctors(response.data);
    } catch (err: any) {
      setError('Failed to load doctors list.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await appointmentAPI.create({
        doctor_id: formData.doctor_id,
        appointment_time: new Date(formData.appointment_time).toISOString(),
        reason: formData.reason,
      });
      router.push('/appointments?booked=true');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loadingDoctors) {
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Book an Appointment</h1>
            <p className="mt-2 text-blue-100">
              Schedule your consultation with our healthcare professionals
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor <span className="text-red-500">*</span>
              </label>
              <select
                id="doctor_id"
                name="doctor_id"
                required
                value={formData.doctor_id}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.user_id} value={doctor.user_id}>
                    Dr. {doctor.user?.full_name || 'Doctor'} - {doctor.specialization}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Don&apos;t see your preferred doctor?{' '}
                <Link href="/doctors" className="text-blue-600 hover:text-blue-500">
                  Browse all doctors
                </Link>
              </p>
            </div>

            <div>
              <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                id="appointment_time"
                name="appointment_time"
                type="datetime-local"
                required
                value={formData.appointment_time}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                className="block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <p className="mt-2 text-sm text-gray-500">
                Select your preferred date and time for the appointment
              </p>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                required
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please describe your symptoms or reason for consultation..."
                className="block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
              <p className="mt-2 text-sm text-gray-500">
                Provide as much detail as possible to help the doctor prepare
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
              <Link
                href="/appointments"
                className="py-3 px-6 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Please arrive 10 minutes before your scheduled appointment time</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Bring any relevant medical records or test results</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You will receive a confirmation email shortly after booking</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Cancellations must be made at least 24 hours in advance</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookAppointmentForm />
    </Suspense>
  );
}
