import { ClienteRepository } from '../repositories/clienteRepository';
import { Cliente, ClienteCreate, ClienteUpdate } from '../models/Cliente';

export class ClienteService {
  private clienteRepository: ClienteRepository;

  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  async getAllClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.findAll();
  }

  async getClienteById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    return cliente;
  }

  async createCliente(clienteData: ClienteCreate): Promise<Cliente> {
    // Validar que el email no exista
    const clienteExistente = await this.clienteRepository.findByEmail(clienteData.email);
    if (clienteExistente) {
      throw new Error('El email ya está registrado');
    }

    return await this.clienteRepository.create(clienteData);
  }

  async updateCliente(id: number, clienteData: ClienteUpdate): Promise<Cliente> {
    // Verificar que el cliente existe
    const clienteExistente = await this.clienteRepository.findById(id);
    if (!clienteExistente) {
      throw new Error('Cliente no encontrado');
    }

    // Si se está actualizando el email, validar que no exista en otro cliente
    if (clienteData.email && clienteData.email !== clienteExistente.email) {
      const emailExistente = await this.clienteRepository.findByEmail(clienteData.email);
      if (emailExistente) {
        throw new Error('El email ya está registrado en otro cliente');
      }
    }

    const clienteActualizado = await this.clienteRepository.update(id, clienteData);
    if (!clienteActualizado) {
      throw new Error('Error al actualizar el cliente');
    }
    return clienteActualizado;
  }

  async deleteCliente(id: number): Promise<void> {
    // Verificar que el cliente existe
    const clienteExistente = await this.clienteRepository.findById(id);
    if (!clienteExistente) {
      throw new Error('Cliente no encontrado');
    }

    const eliminado = await this.clienteRepository.delete(id);
    if (!eliminado) {
      throw new Error('Error al eliminar el cliente');
    }
  }
}

