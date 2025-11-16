import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { validateCliente, validateClienteUpdate } from '../middleware/validation';

const router = Router();
const clienteController = new ClienteController();

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.post('/', validateCliente, clienteController.create);
router.put('/:id', validateClienteUpdate, clienteController.update);
router.delete('/:id', clienteController.delete);

export default router;

