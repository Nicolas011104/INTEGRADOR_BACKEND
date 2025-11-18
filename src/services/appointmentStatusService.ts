import { AppointmentStatusRepository } from '../repositories/appointmentStatusRepository';
import { AppointmentStatus, AppointmentStatusCreate, AppointmentStatusUpdate } from '../models/Appointment_Status';

export class AppointmentStatusService {
    private appointmentStatusRepository: AppointmentStatusRepository;

    constructor() {
        this.appointmentStatusRepository = new AppointmentStatusRepository();
    }

    async getAllAppointmentStatuses(): Promise<AppointmentStatus[]> {
        return await this.appointmentStatusRepository.findAll();
    }
    
    async getAppointmentStatusById(id: number): Promise<AppointmentStatus> {
        const appointmentStatus = await this.appointmentStatusRepository.findById(id);
        if (!appointmentStatus) {
            throw new Error('Estado de la cita no encontrado');
        }
        return appointmentStatus;
    }

    async createAppointmentStatus(appointmentStatus: AppointmentStatusCreate): Promise<AppointmentStatus> {
        const appointmentStatusExistente = await this.appointmentStatusRepository.findByName(appointmentStatus.name);
        if (appointmentStatusExistente) {
            throw new Error('El nombre del estado de la cita ya existe');
        }
        return await this.appointmentStatusRepository.create(appointmentStatus);
    }

    async updateAppointmentStatus(id: number, appointmentStatus: AppointmentStatusUpdate): Promise<AppointmentStatus> {
        const appointmentStatusExistente = await this.appointmentStatusRepository.findById(id);
        if (!appointmentStatusExistente) {
            throw new Error('Estado de la cita no encontrado');
        }
        const appointmentStatusActualizado = await this.appointmentStatusRepository.update(id, appointmentStatus);
        if (!appointmentStatusActualizado) {
            throw new Error('Error al actualizar el estado de la cita');
        }
        return appointmentStatusActualizado;
    }

    async deleteAppointmentStatus(id: number): Promise<void> {
        const appointmentStatusExistente = await this.appointmentStatusRepository.findById(id);
        if (!appointmentStatusExistente) {
            throw new Error('Estado de la cita no encontrado');
        }
        await this.appointmentStatusRepository.delete(id);
    }
}