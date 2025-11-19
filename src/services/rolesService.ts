import { RolesRepository } from '../repositories/rolesRepository';
import { Roles, RolesCreate, RolesUpdate } from '../models/Roles';

export class RolesService {
  private readonly rolesRepository: RolesRepository;

  constructor() {
    this.rolesRepository = new RolesRepository();
  }

  async getAllRoles(): Promise<Roles[]> {
    return this.rolesRepository.findAll();
  }

  async getRoleById(id: number): Promise<Roles> {
    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  }

  async createRole(roleData: RolesCreate): Promise<Roles> {
    const existingRole = await this.rolesRepository.findByName(roleData.name);
    if (existingRole) {
      throw new Error('El nombre del rol ya existe');
    }
    return this.rolesRepository.create(roleData);
  }

  async updateRole(id: number, roleData: RolesUpdate): Promise<Roles> {
    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }

    if (roleData.name && roleData.name !== role.name) {
      const repeatedRole = await this.rolesRepository.findByName(roleData.name);
      if (repeatedRole) {
        throw new Error('El nombre del rol ya existe');
      }
    }

    const updatedRole = await this.rolesRepository.update(id, roleData);
    if (!updatedRole) {
      throw new Error('Error al actualizar el rol');
    }
    return updatedRole;
  }

  async deleteRole(id: number): Promise<void> {
    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    await this.rolesRepository.delete(id);
  }
}

