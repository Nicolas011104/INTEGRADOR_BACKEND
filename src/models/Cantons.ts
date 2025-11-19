export interface Cantons {
    id?: number;
    name: string;
    id_province: number;
    id_state: number;
    state_name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface CantonsCreate {
    name: string;
    id_province: number;
    id_state: number;
}

export interface CantonsUpdate {
    name?: string;
    id_province?: number;
    id_state?: number;
}