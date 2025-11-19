export interface Provinces {
    id?: number;
    name: string;
    id_state: number;
    state_name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface ProvincesCreate {
    name: string;
    id_state: number;
}

export interface ProvincesUpdate {
    name?: string;
    id_state?: number;
}