import { PaymentMethodsRepository } from '../repositories/paymentMethodsRepository';
import { PaymentMethods, PaymentMethodsCreate, PaymentMethodsUpdate } from '../models/Payment_Methods';

export class PaymentMethodsService {
    private paymentMethodsRepository: PaymentMethodsRepository;

    constructor() {
        this.paymentMethodsRepository = new PaymentMethodsRepository();
    }

    async getAllPaymentMethods(): Promise<PaymentMethods[]> {
        return await this.paymentMethodsRepository.findAll();
    }
    
    async getPaymentMethodById(id: number): Promise<PaymentMethods> {
        const paymentMethod = await this.paymentMethodsRepository.findById(id);
        if (!paymentMethod) {
            throw new Error('Método de pago no encontrado');
        }
        return paymentMethod;
    }

    async createPaymentMethod(paymentMethod: PaymentMethodsCreate): Promise<PaymentMethods> {
        const paymentMethodExistente = await this.paymentMethodsRepository.findByName(paymentMethod.name);
        if (paymentMethodExistente) {
            throw new Error('El nombre del método de pago ya existe');
        }
        return await this.paymentMethodsRepository.create(paymentMethod);
    }

    async updatePaymentMethod(id: number, paymentMethod: PaymentMethodsUpdate): Promise<PaymentMethods> {
        const paymentMethodExistente = await this.paymentMethodsRepository.findById(id);
        if (!paymentMethodExistente) {
            throw new Error('Método de pago no encontrado');
        }
        const paymentMethodActualizado = await this.paymentMethodsRepository.update(id, paymentMethod);
        if (!paymentMethodActualizado) {
            throw new Error('Error al actualizar el método de pago');
        }
        return paymentMethodActualizado;
    }
    
    async deletePaymentMethod(id: number): Promise<void> {
        const paymentMethodExistente = await this.paymentMethodsRepository.findById(id);
        if (!paymentMethodExistente) {
            throw new Error('Método de pago no encontrado');
        }
        await this.paymentMethodsRepository.delete(id);
    }
}