export interface AppointmentStatus {
    id?: number;
    name: string;
    id_state: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface AppointmentStatusCreate {
    name: string;
    id_state: number;
}

export interface AppointmentStatusUpdate {
    name?: string;
    id_state?: number;
}