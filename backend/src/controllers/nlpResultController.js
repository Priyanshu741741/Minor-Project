import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getNlpResultById = async (req, res) => {
    const { resultId } = req.params;
    const { userId, role } = req.user;

    // This endpoint is intended for clinical staff
    if (role !== 'DOCTOR') {
        return res.status(403).json({ message: 'Access denied. Clinical role required.' });
    }

    try {
        const nlpResult = await prisma.nlp_result.findUnique({
            where: { id: resultId },
            include: {
                // Include the source remark and feedback to check for authorization
                remark: { include: { visit: true } },
                feedback: { include: { visit: true } },
            },
        });

        if (!nlpResult) {
            return res.status(404).json({ message: 'NLP result not found.' });
        }

        // --- Authorization Logic ---
        // Check if the requesting doctor is associated with the source of the NLP result
        const source = nlpResult.remark || nlpResult.feedback;
        if (!source || source.visit.doctor_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to view this result.' });
        }

        // For security, you might want to remove the source details before responding
        const { remark, feedback, ...resultToSend } = nlpResult;

        res.status(200).json(resultToSend);
    } catch (error) {
        console.error("Get NLP Result Error:", error);
        res.status(500).json({ message: 'Failed to retrieve NLP result.' });
    }
};