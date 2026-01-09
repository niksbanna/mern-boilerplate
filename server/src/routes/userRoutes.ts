import { Router } from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers';
import { authenticate, authorize, validate } from '../middleware';
import { UserRole } from '../types';

const router = Router();

// Validation rules
const updateUserValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
];

const updateRoleValidation = [
  body('role')
    .isIn(Object.values(UserRole))
    .withMessage('Invalid role'),
];

// All routes require authentication
router.use(authenticate);

// User routes
router.get('/', authorize(UserRole.ADMIN, UserRole.MODERATOR), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(updateUserValidation), userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch(
  '/:id/role',
  authorize(UserRole.ADMIN),
  validate(updateRoleValidation),
  userController.updateUserRole
);

export default router;
