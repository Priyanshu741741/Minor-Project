import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createVisit = async (req, res) => {
    const doctor_id = req.user.userId;
    const {
        appointment_id,
        patient_id,
        diagnosis_code,
        diagnosis_text,
        prescription,
        follow_up_reco,
    } = req.body;

    // A visit must be linked to a patient and an appointment
    if (!appointment_id || !patient_id) {
        return res.status(400).json({ message: 'Appointment ID and Patient ID are required.' });
    }

    try {
        // Add logic here to verify that the appointment exists
        // and that the doctor creating the visit is the one assigned to the appointment.

        const newVisit = await prisma.visit.create({
            data: {
                appointment_id,
                patient_id,
                doctor_id,
                visit_time: new Date(),
                diagnosis_code,
                diagnosis_text,
                prescription,
                follow_up_reco,
            },
        });

        await prisma.appointment.update({
            where: { id: appointment_id },
            data: { status: 'COMPLETED' },
        });

        res.status(201).json(newVisit);
    } catch (error) {
        console.error("Create Visit Error:", error);
        res.status(500).json({ message: 'Failed to create visit record.' });
    }
};

export const getMyVisits = async (req, res) => {
    const { userId, role } = req.user;

    try {
        const whereClause = role === 'DOCTOR' ? { doctor_id: userId } : { patient_id: userId };

        const visits = await prisma.visit.findMany({
            where: whereClause,
            include: {
                doctor: { select: { full_name: true } },
                patient: { select: { full_name: true } },
                appointment: { select: { appointment_time: true, reason: true } },
            },
            orderBy: {
                visit_time: 'desc',
            }
        });

        res.status(200).json(visits);
    } catch (error) {
        console.error("Get Visits Error:", error);
        res.status(500).json({ message: 'Failed to retrieve visits.' });
    }
};