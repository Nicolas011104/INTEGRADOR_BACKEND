export interface PaymentMethods {
    id?: number;
    name: string;
    id_state: number;
    state_name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface PaymentMethodsCreate {
    name: string;
    id_state: number;
}

export interface PaymentMethodsUpdate {
    name?: string;
    id_state?: number;
}