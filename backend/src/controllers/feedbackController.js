import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createFeedback = async (req, res) => {
    const { visit_id, rating, comments } = req.body;
    const patient_id = req.user.userId;

    if (!visit_id || rating === undefined) {
        return res.status(400).json({ message: 'Visit ID and a rating are required.' });
    }

    try {
        const visit = await prisma.visit.findUnique({
            where: { id: visit_id },
        });

        if (!visit || visit.patient_id !== patient_id) {
            return res.status(404).json({ message: 'Visit not found or does not belong to this patient.' });
        }

        const newFeedback = await prisma.feedback.create({
            data: {
                visit_id,
                patient_id,
                rating,
                comments,
            },
        });

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Create Feedback Error:", error);
        if (error.code === 'P2002') {
             return res.status(409).json({ message: 'Feedback for this visit has already been submitted.' });
        }
        res.status(500).json({ message: 'Failed to submit feedback.' });
    }
};

export const getFeedbackForVisit = async (req, res) => {
    const { visitId } = req.params;
    const doctor_id = req.user.userId;

    try {
        const feedbacks = await prisma.feedback.findMany({
            where: {
                visit_id: visitId,
                visit: {
                    doctor_id: doctor_id,
                }
            },
            include: {
                patient: { select: { full_name: true } },
            },
        });

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Get Feedback Error:", error);
        res.status(500).json({ message: 'Failed to retrieve feedback.' });
    }
};