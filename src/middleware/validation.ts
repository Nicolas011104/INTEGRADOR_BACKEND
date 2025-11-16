import { body } from 'express-validator';

export const validateCliente = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail(),

  body('telefono')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('El teléfono debe contener solo números y caracteres válidos')
    .isLength({ min: 8, max: 20 })
    .withMessage('El teléfono debe tener entre 8 y 20 caracteres'),

  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('La dirección no puede exceder 255 caracteres'),
];

export const validateClienteUpdate = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El email no puede estar vacío')
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail(),

  body('telefono')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El teléfono no puede estar vacío')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('El teléfono debe contener solo números y caracteres válidos')
    .isLength({ min: 8, max: 20 })
    .withMessage('El teléfono debe tener entre 8 y 20 caracteres'),

  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('La dirección no puede exceder 255 caracteres'),
];

