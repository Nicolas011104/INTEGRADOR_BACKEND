# API REST - Gestión de Clientes

API REST desarrollada con Node.js, TypeScript, Express y MySQL para la gestión de clientes. Este proyecto sigue las mejores prácticas de desarrollo y estándares modernos.

## 🚀 Características

- ✅ CRUD completo para clientes
- ✅ Validación de datos con express-validator
- ✅ Arquitectura en capas (Repository, Service, Controller)
- ✅ Manejo de errores centralizado
- ✅ Seguridad con Helmet y CORS
- ✅ TypeScript para type safety
- ✅ Pool de conexiones MySQL optimizado
- ✅ Variables de entorno para configuración

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- MySQL (versión 8.0 o superior)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd INTEGRADOR_BACKEND
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

#### Opción A: Usando el script SQL proporcionado

```bash
# Conectarse a MySQL
mysql -u root -p

# Ejecutar el script
source src/database/schema.sql
```

#### Opción B: Crear manualmente

```sql
CREATE DATABASE IF NOT EXISTS clientes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clientes_db;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(255),
  fechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fechaActualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=clientes_db
```

**Nota:** Reemplaza `tu_contraseña` con tu contraseña de MySQL.

## 🏃 Ejecución

### Modo desarrollo

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000` con recarga automática.

### Modo producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar
npm start
```

## 📚 Endpoints de la API

### Base URL
```
http://localhost:3000/api/clientes
```

### Endpoints disponibles

#### 1. Obtener todos los clientes
```http
GET /api/clientes
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "+1234567890",
      "direccion": "Calle Principal 123",
      "fechaCreacion": "2024-01-15T10:30:00.000Z",
      "fechaActualizacion": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Obtener un cliente por ID
```http
GET /api/clientes/:id
```

**Parámetros:**
- `id` (path): ID del cliente

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+1234567890",
    "direccion": "Calle Principal 123",
    "fechaCreacion": "2024-01-15T10:30:00.000Z",
    "fechaActualizacion": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 3. Crear un nuevo cliente
```http
POST /api/clientes
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1234567890",
  "direccion": "Calle Principal 123"
}
```

**Campos requeridos:**
- `nombre`: String (2-100 caracteres)
- `email`: String (email válido, único)
- `telefono`: String (8-20 caracteres)

**Campos opcionales:**
- `direccion`: String (máximo 255 caracteres)

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Cliente creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+1234567890",
    "direccion": "Calle Principal 123",
    "fechaCreacion": "2024-01-15T10:30:00.000Z",
    "fechaActualizacion": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Actualizar un cliente
```http
PUT /api/clientes/:id
Content-Type: application/json
```

**Parámetros:**
- `id` (path): ID del cliente

**Body (todos los campos son opcionales):**
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "telefono": "+1234567891",
  "direccion": "Avenida Nueva 456"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Cliente actualizado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "telefono": "+1234567891",
    "direccion": "Avenida Nueva 456",
    "fechaCreacion": "2024-01-15T10:30:00.000Z",
    "fechaActualizacion": "2024-01-15T11:45:00.000Z"
  }
}
```

#### 5. Eliminar un cliente
```http
DELETE /api/clientes/:id
```

**Parámetros:**
- `id` (path): ID del cliente

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Cliente eliminado exitosamente"
}
```

#### 6. Health Check
```http
GET /health
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Servidor y base de datos funcionando correctamente"
}
```

## 🔒 Códigos de Estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Error de validación
- `404` - Not Found: Recurso no encontrado
- `409` - Conflict: Conflicto (ej: email duplicado)
- `500` - Internal Server Error: Error del servidor
- `503` - Service Unavailable: Base de datos no disponible

## 🧪 Ejemplos de Uso

### Usando cURL

```bash
# Obtener todos los clientes
curl http://localhost:3000/api/clientes

# Obtener un cliente por ID
curl http://localhost:3000/api/clientes/1

# Crear un cliente
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@example.com",
    "telefono": "+9876543210",
    "direccion": "Calle Secundaria 789"
  }'

# Actualizar un cliente
curl -X PUT http://localhost:3000/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García López",
    "telefono": "+9876543211"
  }'

# Eliminar un cliente
curl -X DELETE http://localhost:3000/api/clientes/1
```

### Usando Postman o Insomnia

1. Importa la colección de endpoints
2. Configura la variable de entorno `base_url` como `http://localhost:3000`
3. Ejecuta las peticiones

## 📁 Estructura del Proyecto

```
INTEGRADOR_BACKEND/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de la conexión MySQL
│   ├── controllers/
│   │   └── clienteController.ts # Controladores de las rutas
│   ├── database/
│   │   └── schema.sql           # Script SQL para crear la base de datos
│   ├── middleware/
│   │   ├── errorHandler.ts      # Manejo centralizado de errores
│   │   └── validation.ts        # Validaciones de datos
│   ├── models/
│   │   └── Cliente.ts           # Interfaces y tipos TypeScript
│   ├── repositories/
│   │   └── clienteRepository.ts # Acceso a la base de datos
│   ├── routes/
│   │   └── clienteRoutes.ts     # Definición de rutas
│   ├── services/
│   │   └── clienteService.ts    # Lógica de negocio
│   └── index.ts                 # Punto de entrada de la aplicación
├── .env                         # Variables de entorno (no incluido en git)
├── .eslintrc.json               # Configuración de ESLint
├── .gitignore                   # Archivos ignorados por git
├── .prettierrc                  # Configuración de Prettier
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Este archivo
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con recarga automática
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor en modo producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run format` - Formatea el código con Prettier

## 🔧 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **TypeScript** - Lenguaje de programación
- **Express** - Framework web
- **MySQL2** - Cliente MySQL con soporte para promesas
- **express-validator** - Validación de datos
- **Helmet** - Seguridad HTTP
- **CORS** - Control de acceso CORS
- **dotenv** - Gestión de variables de entorno

## 📝 Mejores Prácticas Implementadas

1. **Arquitectura en capas**: Separación clara entre Repository, Service y Controller
2. **Type Safety**: Uso de TypeScript para prevenir errores en tiempo de compilación
3. **Validación de datos**: Validación tanto en el middleware como en el servicio
4. **Manejo de errores**: Manejo centralizado y consistente de errores
5. **Seguridad**: Uso de Helmet y CORS para proteger la aplicación
6. **Pool de conexiones**: Optimización de conexiones a la base de datos
7. **Variables de entorno**: Configuración sensible fuera del código
8. **Código limpio**: Estructura modular y fácil de mantener

## 🐛 Solución de Problemas

### Error de conexión a MySQL

1. Verifica que MySQL esté corriendo
2. Revisa las credenciales en el archivo `.env`
3. Asegúrate de que la base de datos exista

### Puerto ya en uso

Si el puerto 3000 está ocupado, cambia el valor de `PORT` en el archivo `.env`

### Errores de compilación TypeScript

Ejecuta:
```bash
npm run build
```

Y revisa los errores mostrados.

## 📄 Licencia

ISC

## 👤 Autor

Desarrollado como parte del proyecto integrador del cuarto semestre.

---

**Nota:** Este proyecto es una base sólida para desarrollar APIs REST con Node.js y TypeScript. Puedes extenderlo agregando autenticación, paginación, filtros, y otras funcionalidades según tus necesidades.

