import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createRemark = async (req, res) => {
    const { visit_id, raw_text, symptom_tags } = req.body;
    const doctor_id = req.user.userId;

    if (!visit_id || !raw_text) {
        return res.status(400).json({ message: 'Visit ID and remark text are required.' });
    }

    try {
        const visit = await prisma.visit.findUnique({ where: { id: visit_id } });
        if (!visit || visit.doctor_id !== doctor_id) {
            return res.status(403).json({ message: 'You can only add remarks to your own visits.' });
        }

        const newRemark = await prisma.remark.create({
            data: {
                visit_id,
                doctor_id,
                raw_text,
                symptom_tags,
            },
        });

        res.status(201).json(newRemark);
    } catch (error) {
        console.error("Create Remark Error:", error);
        res.status(500).json({ message: 'Failed to create remark.' });
    }
};

export const getRemarksForVisit = async (req, res) => {
    const { visitId } = req.params;
    const { userId, role } = req.user;

    try {
        // First, retrieve the visit to verify access rights
        const visit = await prisma.visit.findUnique({
            where: { id: visitId },
        });

        if (!visit) {
            return res.status(404).json({ message: 'Visit not found.' });
        }

        // Authorization check: User must be the patient or the doctor of the visit
        if (visit.patient_id !== userId && visit.doctor_id !== userId) {
            return res.status(403).json({ message: 'Access denied. You are not part of this visit.' });
        }

        // If authorized, fetch the remarks
        const remarks = await prisma.remark.findMany({
            where: { visit_id: visitId },
            include: {
                doctor: { select: { full_name: true } },
            },
            orderBy: {
                created_at: 'asc',
            }
        });

        res.status(200).json(remarks);
    } catch (error) {
        console.error("Get Remarks Error:", error);
        res.status(500).json({ message: 'Failed to retrieve remarks.' });
    }
};