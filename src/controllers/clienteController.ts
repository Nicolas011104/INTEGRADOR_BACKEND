import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';
import { validationResult } from 'express-validator';

export class ClienteController {
  private clienteService: ClienteService;

  constructor() {
    this.clienteService = new ClienteService();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientes = await this.clienteService.getAllClientes();
      console.log('clientes', clientes);
      res.status(200).json({
        success: true,
        data: clientes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los clientes',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const cliente = await this.clienteService.getClienteById(id);
      res.status(200).json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Cliente no encontrado') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al obtener el cliente',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array(),
        });
        return;
      }

      const cliente = await this.clienteService.createCliente(req.body);
      res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
        data: cliente,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'El email ya está registrado') {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al crear el cliente',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array(),
        });
        return;
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const cliente = await this.clienteService.updateCliente(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Cliente actualizado exitosamente',
        data: cliente,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Cliente no encontrado') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (error instanceof Error && error.message === 'El email ya está registrado en otro cliente') {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al actualizar el cliente',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      await this.clienteService.deleteCliente(id);
      res.status(200).json({
        success: true,
        message: 'Cliente eliminado exitosamente',
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Cliente no encontrado') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al eliminar el cliente',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };
}

