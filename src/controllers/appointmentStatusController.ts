import { Request, Response } from 'express';
import { AppointmentStatusService } from '../services/appointmentStatusService';
import { validationResult } from 'express-validator';

export class AppointmentStatusController {
    private appointmentStatusService: AppointmentStatusService;

    constructor() {
        this.appointmentStatusService = new AppointmentStatusService();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const appointmentStatuses = await this.appointmentStatusService.getAllAppointmentStatuses();
            res.status(200).json({
                success: true,
                data: appointmentStatuses,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los estados de la cita',
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
            const appointmentStatus = await this.appointmentStatusService.getAppointmentStatusById(id);
            res.status(200).json({
                success: true,
                data: appointmentStatus,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Estado de la cita no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener el estado de la cita',
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

            const appointmentStatus = await this.appointmentStatusService.createAppointmentStatus(req.body);
            res.status(201).json({
                success: true,
                message: 'Estado de la cita creado exitosamente',
                data: appointmentStatus,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'El nombre del estado de la cita ya existe') {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al crear el estado de la cita',
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

            const appointmentStatus = await this.appointmentStatusService.updateAppointmentStatus(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Estado de la cita actualizado exitosamente',
                data: appointmentStatus,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Estado de la cita no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar el estado de la cita',
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

            await this.appointmentStatusService.deleteAppointmentStatus(id);
            res.status(200).json({
                success: true,
                message: 'Estado de la cita eliminado exitosamente',
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Estado de la cita no encontrado') {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error al eliminar el estado de la cita',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                });
            }
        }
    };
}