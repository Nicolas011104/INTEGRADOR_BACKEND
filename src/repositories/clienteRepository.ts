import mysql from 'mysql2/promise';
import pool from '../config/database';
import { Cliente, ClienteCreate, ClienteUpdate } from '../models/Cliente';

export class ClienteRepository {
  private readonly tableName = 'clientes';

  async findAll(): Promise<Cliente[]> {
    const [rows] = await pool.execute<Cliente[]>(
      `SELECT id, nombre, email, telefono, direccion, fechaCreacion, fechaActualizacion 
       FROM ${this.tableName} 
       ORDER BY fechaCreacion DESC`
    );
    return rows;
  }

  async findById(id: number): Promise<Cliente | null> {
    const [rows] = await pool.execute<Cliente[]>(
      `SELECT id, nombre, email, telefono, direccion, fechaCreacion, fechaActualizacion 
       FROM ${this.tableName} 
       WHERE id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    const [rows] = await pool.execute<Cliente[]>(
      `SELECT id, nombre, email, telefono, direccion, fechaCreacion, fechaActualizacion 
       FROM ${this.tableName} 
       WHERE email = ?`,
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async create(cliente: ClienteCreate): Promise<Cliente> {
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      `INSERT INTO ${this.tableName} (nombre, email, telefono, direccion, fechaCreacion, fechaActualizacion) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [cliente.nombre, cliente.email, cliente.telefono, cliente.direccion || null]
    );

    const insertId = result.insertId;
    const nuevoCliente = await this.findById(insertId);
    if (!nuevoCliente) {
      throw new Error('Error al crear el cliente');
    }
    return nuevoCliente;
  }

  async update(id: number, cliente: ClienteUpdate): Promise<Cliente | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (cliente.nombre !== undefined) {
      updates.push('nombre = ?');
      values.push(cliente.nombre);
    }
    if (cliente.email !== undefined) {
      updates.push('email = ?');
      values.push(cliente.email);
    }
    if (cliente.telefono !== undefined) {
      updates.push('telefono = ?');
      values.push(cliente.telefono);
    }
    if (cliente.direccion !== undefined) {
      updates.push('direccion = ?');
      values.push(cliente.direccion);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push('fechaActualizacion = NOW()');
    values.push(id);

    await pool.execute(
      `UPDATE ${this.tableName} 
       SET ${updates.join(', ')} 
       WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

