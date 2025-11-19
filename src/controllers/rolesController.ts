import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RolesService } from '../services/rolesService';

export class RolesController {
  private readonly rolesService: RolesService;

  constructor() {
    this.rolesService = new RolesService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const roles = await this.rolesService.getAllRoles();
      res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los roles',
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

      const role = await this.rolesService.getRoleById(id);
      res.status(200).json({
        success: true,
        data: role,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Rol no encontrado') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al obtener el rol',
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

      const role = await this.rolesService.createRole(req.body);
      res.status(201).json({
        success: true,
        message: 'Rol creado exitosamente',
        data: role,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'El nombre del rol ya existe') {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al crear el rol',
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

      const role = await this.rolesService.updateRole(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Rol actualizado exitosamente',
        data: role,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === 'Rol no encontrado' || error.message === 'El nombre del rol ya existe')
      ) {
        res.status(error.message === 'Rol no encontrado' ? 404 : 409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al actualizar el rol',
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

      await this.rolesService.deleteRole(id);
      res.status(200).json({
        success: true,
        message: 'Rol eliminado exitosamente',
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Rol no encontrado') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al eliminar el rol',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };
}

