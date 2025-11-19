import { Router } from 'express';
import { AppointmentStatusController } from '../controllers/appointmentStatusController';
import { validateAppointmentStatus, validateAppointmentStatusUpdate } from '../middleware/validation';

const router = Router();
const appointmentStatusController = new AppointmentStatusController();

router.get('/', appointmentStatusController.getAll);
router.get('/:id', appointmentStatusController.getById);
router.post('/', validateAppointmentStatus, appointmentStatusController.create);
router.put('/:id', validateAppointmentStatusUpdate, appointmentStatusController.update);
router.delete('/:id', appointmentStatusController.delete);

export default router;