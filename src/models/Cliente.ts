export interface Cliente {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface ClienteCreate {
  nombre: string;
  email: string;
  telefono: string;
  direccion?: string;
}

export interface ClienteUpdate {
  nombre?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}

