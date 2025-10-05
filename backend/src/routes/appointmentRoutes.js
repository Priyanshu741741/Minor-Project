import express from 'express';
import { createAppointment, getMyAppointments } from '../controllers/appointmentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getMyAppointments);
router.post('/', createAppointment);

export default router;