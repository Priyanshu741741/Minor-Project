import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllDoctorProfiles = async (req, res) => {
    try {
        const doctors = await prisma.user.findMany({
            where: { role: 'DOCTOR' },
            select: {
                id: true,
                full_name: true,
                doctor_profile: {
                    select: {
                        specialization: true,
                        bio: true,
                        location: true,
                    }
                }
            }
        });
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Get All Doctors Error:", error);
        res.status(500).json({ message: 'Failed to retrieve doctor profiles.' });
    }
};

export const getDoctorProfileById = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await prisma.user.findUnique({
            where: { id: doctorId, role: 'DOCTOR' },
            select: {
                id: true,
                full_name: true,
                email: true,
                phone: true,
                doctor_profile: true,
            }
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Get Doctor by ID Error:", error);
        res.status(500).json({ message: 'Failed to retrieve doctor profile.' });
    }
};

export const getMyPatientProfile = async (req, res) => {
    const patient_id = req.user.userId;
    try {
        const patientProfile = await prisma.patient_profile.findUnique({
            where: { user_id: patient_id },
            include: {
                user: { select: { full_name: true, email: true, phone: true } }
            }
        });

        if (!patientProfile) {
            return res.status(404).json({ message: 'Patient profile not found.' });
        }
        res.status(200).json(patientProfile);

    } catch (error) {
        console.error("Get Patient Profile Error:", error);
        res.status(500).json({ message: 'Failed to retrieve patient profile.' });
    }
};