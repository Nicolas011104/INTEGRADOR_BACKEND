import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PaymentMethodsService } from '../services/paymentMethodsService';

export class PaymentMethodsController {
    private readonly paymentMethodsService: PaymentMethodsService;

    constructor() {
        this.paymentMethodsService = new PaymentMethodsService();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const paymentMethods = await this.paymentMethodsService.getAllPaymentMethods();
            res.status(200).json({
                success: true,
                data: paymentMethods,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los métodos de pago',
                error: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido',
                });
                return;
            }

            const paymentMethod = await this.paymentMethodsService.getPaymentMethodById(id);
            res.status(200).json({
                success: true,
                data: paymentMethod,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Método de pago no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener el método de pago',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: 'Errores de validación',
                    errors: errors.array(),
                });
                return;
            }

            const paymentMethod = await this.paymentMethodsService.createPaymentMethod(req.body);
            res.status(201).json({
                success: true,
                message: 'Método de pago creado exitosamente',
                data: paymentMethod,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'El nombre del método de pago ya existe') {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al crear el método de pago',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: 'Errores de validación',
                    errors: errors.array(),
                });
                return;
            }

            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido',
                });
                return;
            }

            const paymentMethod = await this.paymentMethodsService.updatePaymentMethod(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Método de pago actualizado exitosamente',
                data: paymentMethod,
            });
        } catch (error) {
            if (error instanceof Error && (error.message === 'Método de pago no encontrado' || error.message === 'Error al actualizar el método de pago')) {
                res.status(error.message === 'Método de pago no encontrado' ? 404 : 409).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar el método de pago',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido',
                });
                return;
            }

            await this.paymentMethodsService.deletePaymentMethod(id);
            res.status(200).json({
                success: true,
                message: 'Método de pago eliminado exitosamente',
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Método de pago no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al eliminar el método de pago',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        }
    };
}