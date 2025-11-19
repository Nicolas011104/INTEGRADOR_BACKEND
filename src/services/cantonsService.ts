import { CantonsRepository } from '../repositories/cantonsRepository';
import { Cantons, CantonsCreate, CantonsUpdate } from '../models/Cantons';

export class CantonsService {
  private readonly cantonsRepository: CantonsRepository;

  constructor() {
    this.cantonsRepository = new CantonsRepository();
  }

  async getAllCantons(): Promise<Cantons[]> {
    return this.cantonsRepository.findAll();
  }

  async getCantonById(id: number): Promise<Cantons> {
    const canton = await this.cantonsRepository.findById(id);
    if (!canton) {
      throw new Error('Cantón no encontrado');
    }
    return canton;
  }

  async getCantonsByProvince(id_province: number): Promise<Cantons[]> {
    return this.cantonsRepository.findByProvince(id_province);
  }

  async createCanton(cantonData: CantonsCreate): Promise<Cantons> {
    const existingCanton = await this.cantonsRepository.findByName(cantonData.name);
    if (existingCanton) {
      throw new Error('El nombre del cantón ya existe');
    }
    return this.cantonsRepository.create(cantonData);
  }

  async updateCanton(id: number, cantonData: CantonsUpdate): Promise<Cantons> {
    const canton = await this.cantonsRepository.findById(id);
    if (!canton) {
      throw new Error('Cantón no encontrado');
    }

    if (cantonData.name && cantonData.name !== canton.name) {
      const repeatedCanton = await this.cantonsRepository.findByName(cantonData.name);
      if (repeatedCanton) {
        throw new Error('El nombre del cantón ya existe');
      }
    }

    const updatedCanton = await this.cantonsRepository.update(id, cantonData);
    if (!updatedCanton) {
      throw new Error('Error al actualizar el cantón');
    }
    return updatedCanton;
  }

  async deleteCanton(id: number): Promise<void> {
    const canton = await this.cantonsRepository.findById(id);
    if (!canton) {
      throw new Error('Cantón no encontrado');
    }
    await this.cantonsRepository.delete(id);
  }
}

