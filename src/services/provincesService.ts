import { ProvincesRepository } from '../repositories/provincesRepository';
import { Provinces, ProvincesCreate, ProvincesUpdate } from '../models/Provinces';

export class ProvincesService {
  private readonly provincesRepository: ProvincesRepository;

  constructor() {
    this.provincesRepository = new ProvincesRepository();
  }

  async getAllProvinces(): Promise<Provinces[]> {
    return this.provincesRepository.findAll();
  }

  async getProvinceById(id: number): Promise<Provinces> {
    const province = await this.provincesRepository.findById(id);
    if (!province) {
      throw new Error('Provincia no encontrada');
    }
    return province;
  }

  async createProvince(provinceData: ProvincesCreate): Promise<Provinces> {
    const existingProvince = await this.provincesRepository.findByName(provinceData.name);
    if (existingProvince) {
      throw new Error('El nombre de la provincia ya existe');
    }
    return this.provincesRepository.create(provinceData);
  }

  async updateProvince(id: number, provinceData: ProvincesUpdate): Promise<Provinces> {
    const province = await this.provincesRepository.findById(id);
    if (!province) {
      throw new Error('Provincia no encontrada');
    }

    if (provinceData.name && provinceData.name !== province.name) {
      const repeatedProvince = await this.provincesRepository.findByName(provinceData.name);
      if (repeatedProvince) {
        throw new Error('El nombre de la provincia ya existe');
      }
    }

    const updatedProvince = await this.provincesRepository.update(id, provinceData);
    if (!updatedProvince) {
      throw new Error('Error al actualizar la provincia');
    }
    return updatedProvince;
  }

  async deleteProvince(id: number): Promise<void> {
    const province = await this.provincesRepository.findById(id);
    if (!province) {
      throw new Error('Provincia no encontrada');
    }
    await this.provincesRepository.delete(id);
  }
}

