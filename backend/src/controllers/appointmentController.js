import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAppointment = async (req, res) => {
    const { doctor_id, appointment_time, duration_minutes, reason } = req.body;
    
    const patient_id = req.user.userId;

    if (!doctor_id || !appointment_time) {
        return res.status(400).json({ message: 'Doctor ID and appointment time are required.' });
    }

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                patient_id,
                doctor_id,
                appointment_time: new Date(appointment_time),
                duration_minutes: duration_minutes || 15,
                reason,
                status: 'SCHEDULED',
            },
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Create Appointment Error:", error);
        res.status(500).json({ message: 'Failed to create appointment.' });
    }
};

export const getMyAppointments = async (req, res) => {
    const { userId, role } = req.user;

    try {
        const whereClause = role === 'DOCTOR' ? { doctor_id: userId } : { patient_id: userId };

        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: {
                doctor: { select: { full_name: true, doctor_profile: { select: { specialization: true } } } },
                patient: { select: { full_name: true } },
            },
            orderBy: {
                appointment_time: 'desc',
            }
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Get Appointments Error:", error);
        res.status(500).json({ message: 'Failed to retrieve appointments.' });
    }
};