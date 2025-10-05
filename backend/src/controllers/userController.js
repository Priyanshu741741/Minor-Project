import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMyProfile = async (req, res) => {
    const { userId, role } = req.user;

    try {
        const includeClause = {
            patient_profile: role === 'PATIENT',
            doctor_profile: role === 'DOCTOR',
        };

        const userProfile = await prisma.user.findUnique({
            where: { id: userId },
            include: includeClause,
        });

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found.' });
        }

        const { password_hash, ...profileWithoutPassword } = userProfile;
        res.status(200).json(profileWithoutPassword);

    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: 'Failed to retrieve user profile.' });
    }
};

export const updateMyProfile = async (req, res) => {
    const { userId, role } = req.user;
    const profileData = req.body;

    try {
        let updatedUser;

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: {
                    full_name: profileData.full_name,
                    phone: profileData.phone,
                },
            });

            if (role === 'PATIENT') {
                await tx.patient_profile.upsert({
                    where: { user_id: userId },
                    update: {
                        dob: profileData.dob ? new Date(profileData.dob) : undefined,
                        gender: profileData.gender,
                        address: profileData.address,
                        emergency_contact: profileData.emergency_contact,
                        medical_history: profileData.medical_history,
                    },
                    create: {
                        user_id: userId,
                        dob: profileData.dob ? new Date(profileData.dob) : undefined,
                        gender: profileData.gender,
                    }
                });
            } else if (role === 'DOCTOR') {
                await tx.doctor_profile.upsert({
                    where: { user_id: userId },
                    update: {
                        specialization: profileData.specialization,
                        registration_no: profileData.registration_no,
                        available_slots: profileData.available_slots,
                        bio: profileData.bio,
                        location: profileData.location,
                    },
                    create: {
                        user_id: userId,
                        specialization: profileData.specialization,
                    }
                });
            }

            updatedUser = await tx.user.findUnique({
                where: { id: userId },
                include: {
                    patient_profile: role === 'PATIENT',
                    doctor_profile: role === 'DOCTOR',
                },
            });
        });


        const { password_hash, ...profileWithoutPassword } = updatedUser;
        res.status(200).json({ message: 'Profile updated successfully', user: profileWithoutPassword });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: 'Failed to update user profile.' });
    }
};