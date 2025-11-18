import { Router } from "express";
import { PaymentMethodsController } from "../controllers/paymentMethodsController";
import { validatePaymentMethods, validatePaymentMethodsUpdate } from "../middleware/validation";

const router = Router();
const paymentMethodController = new PaymentMethodsController();

router.get('/', paymentMethodController.getAll);
router.get('/:id', paymentMethodController.getById);
router.post('/', validatePaymentMethods, paymentMethodController.create);
router.put('/:id', validatePaymentMethodsUpdate, paymentMethodController.update);
router.delete('/:id', paymentMethodController.delete);

export default router;