export interface Roles {
    id?: number;
    name: string;
    id_state: number;
    state_name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface RolesCreate {
    name: string;
    id_state: number;
}

export interface RolesUpdate {
    name?: string;
    id_state?: number;
}