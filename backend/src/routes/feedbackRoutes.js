import express from 'express';
import { createFeedback, getFeedbackForVisit } from '../controllers/feedbackController.js';
import authMiddleware, { isPatient, isDoctor } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', isPatient, createFeedback);
router.get('/:visitId', isDoctor, getFeedbackForVisit);

export default router;