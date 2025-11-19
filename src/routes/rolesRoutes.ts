import { Router } from 'express';
import { RolesController } from '../controllers/rolesController';
import { validateRole, validateRoleUpdate } from '../middleware/validation';

const router = Router();
const rolesController = new RolesController();

router.get('/', rolesController.getAll);
router.get('/:id', rolesController.getById);
router.post('/', validateRole, rolesController.create);
router.put('/:id', validateRoleUpdate, rolesController.update);
router.delete('/:id', rolesController.delete);

export default router;

