CREATE DATABASE IF NOT EXISTS db_integrator_project
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE db_integrator_project;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =========================================================
--  TABLAS DE CATÁLOGOS GENERALES
-- =========================================================

-- Tabla general_status: Catálogo de estados generales (Activo, Inactivo, etc.).
CREATE TABLE general_status (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL
) ENGINE=InnoDB;

-- Tabla appointment_status: Estados específicos de las citas.
CREATE TABLE appointment_status (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_apptstatus_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla payment_status: Estados de un pago.
CREATE TABLE payment_status (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_paystatus_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla payment_methods: Métodos de pago.
CREATE TABLE payment_methods (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_paymethods_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla roles: Roles del sistema.
CREATE TABLE roles (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL UNIQUE,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_roles_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- =========================================================
--  UBICACIÓN GEOGRÁFICA
-- =========================================================

-- Tabla provinces: Provincias del país.
CREATE TABLE provinces (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_province_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla cantons: Cantones/ciudades.
CREATE TABLE cantons (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  id_province INT NOT NULL,
  id_state    INT NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_canton_province
    FOREIGN KEY (id_province) REFERENCES provinces(id),
  CONSTRAINT fk_canton_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- =========================================================
--  EMPRESAS, SUCURSALES, ÁREAS, ESPECIALIDADES
-- =========================================================

-- Tabla companies: Empresas dueñas de sucursales.
CREATE TABLE companies (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(120) NOT NULL UNIQUE,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_company_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla branches: Sucursales físicas de la empresa.
CREATE TABLE branches (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  id_company  INT NOT NULL,
  name        VARCHAR(120) NOT NULL,
  phone       VARCHAR(30) NULL,
  address     VARCHAR(200) NULL,
  email       VARCHAR(120) NULL,
  id_manager  INT NULL,
  id_province INT NULL,
  id_canton   INT NULL,
  id_state    INT NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_branch_name_company (id_company, name),
  CONSTRAINT fk_branch_company
    FOREIGN KEY (id_company) REFERENCES companies(id),
  CONSTRAINT fk_branch_province
    FOREIGN KEY (id_province) REFERENCES provinces(id),
  CONSTRAINT fk_branch_canton
    FOREIGN KEY (id_canton) REFERENCES cantons(id),
  CONSTRAINT fk_branch_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla areas: Áreas de atención dentro de una sucursal.
CREATE TABLE areas (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_branch  INT NOT NULL,
  name       VARCHAR(80) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_area_branch (id_branch, name),
  CONSTRAINT fk_area_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_area_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla specialties: Especialidades de los profesionales.
CREATE TABLE specialties (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_branch  INT NOT NULL,
  id_area    INT NOT NULL,
  name       VARCHAR(100) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_specialty (id_branch, id_area, name),
  CONSTRAINT fk_spec_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_spec_area
    FOREIGN KEY (id_area) REFERENCES areas(id),
  CONSTRAINT fk_spec_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- =========================================================
--  USUARIOS Y CREDENCIALES
-- =========================================================

-- Tabla users: Usuarios del sistema.
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  names         VARCHAR(120) NOT NULL,
  last_names    VARCHAR(120) NULL,
  identification VARCHAR(50) NULL,
  email         VARCHAR(120) NULL,
  phone         VARCHAR(30) NULL,
  profile_photo VARCHAR(500) NULL,
  id_branch     INT NULL,
  id_role       INT NOT NULL,
  id_province   INT NULL,
  id_canton     INT NULL,
  id_area       INT NULL,
  id_specialty  INT NULL,
  id_state      INT NOT NULL DEFAULT 1,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_users_email (email),
  CONSTRAINT fk_user_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_user_role
    FOREIGN KEY (id_role) REFERENCES roles(id),
  CONSTRAINT fk_user_province
    FOREIGN KEY (id_province) REFERENCES provinces(id),
  CONSTRAINT fk_user_canton
    FOREIGN KEY (id_canton) REFERENCES cantons(id),
  CONSTRAINT fk_user_area
    FOREIGN KEY (id_area) REFERENCES areas(id),
  CONSTRAINT fk_user_specialty
    FOREIGN KEY (id_specialty) REFERENCES specialties(id),
  CONSTRAINT fk_user_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

-- Tabla credentials: Datos de acceso del sistema.
CREATE TABLE credentials (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_user    INT NOT NULL,
  username   VARCHAR(80) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  id_state   INT NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_cred_user
    FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_cred_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

ALTER TABLE branches
  ADD CONSTRAINT fk_branch_manager
  FOREIGN KEY (id_manager) REFERENCES users(id);

-- =========================================================
--  HORARIOS, SERVICIOS Y CITAS
-- =========================================================

CREATE TABLE branch_schedules (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  id_branch   INT NOT NULL,
  day_of_week TINYINT NOT NULL,
  open_time   TIME NOT NULL,
  close_time  TIME NOT NULL,
  is_closed   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NULL,
  CONSTRAINT fk_branch_sched
    FOREIGN KEY (id_branch) REFERENCES branches(id)
) ENGINE=InnoDB;

CREATE TABLE services (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  id_branch    INT NOT NULL,
  id_area      INT NOT NULL,
  name         VARCHAR(120) NOT NULL,
  description  VARCHAR(300) NULL,
  duration_min INT NOT NULL DEFAULT 30,
  price        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  id_state     INT NOT NULL DEFAULT 1,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_service (id_branch, id_area, name),
  CONSTRAINT fk_service_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_service_area
    FOREIGN KEY (id_area) REFERENCES areas(id),
  CONSTRAINT fk_service_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

CREATE TABLE schedules (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  id_user      INT NOT NULL,
  id_branch    INT NOT NULL,
  start_time   DATETIME NOT NULL,
  end_time     DATETIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  id_state     INT NOT NULL DEFAULT 1,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  INDEX idx_sched_user_time (id_user, start_time, end_time),
  CONSTRAINT fk_sched_user
    FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_sched_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_sched_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

CREATE TABLE appointments (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  id_user              INT NOT NULL,
  id_professional      INT NOT NULL,
  id_branch            INT NOT NULL,
  id_service           INT NOT NULL,
  id_schedule          INT NULL,
  start_time           DATETIME NOT NULL,
  end_time             DATETIME NOT NULL,
  id_state_appointment INT NOT NULL,
  feedback             VARCHAR(500) NULL,
  grade                DECIMAL(3,2) NULL,
  created_at           DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  INDEX idx_appt_branch_time (id_branch, start_time),
  CONSTRAINT fk_appt_client
    FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_appt_prof
    FOREIGN KEY (id_professional) REFERENCES users(id),
  CONSTRAINT fk_appt_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id),
  CONSTRAINT fk_appt_service
    FOREIGN KEY (id_service) REFERENCES services(id),
  CONSTRAINT fk_appt_schedule
    FOREIGN KEY (id_schedule) REFERENCES schedules(id),
  CONSTRAINT fk_appt_status
    FOREIGN KEY (id_state_appointment) REFERENCES appointment_status(id)
) ENGINE=InnoDB;

CREATE TABLE service_ratings (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  id_appointment INT NOT NULL,
  id_user        INT NOT NULL,
  rating         TINYINT NOT NULL,
  comment        VARCHAR(400) NULL,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_rating_once (id_appointment, id_user),
  CONSTRAINT fk_rating_appt
    FOREIGN KEY (id_appointment) REFERENCES appointments(id),
  CONSTRAINT fk_rating_user
    FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================================================
--  INVENTARIO
-- =========================================================

CREATE TABLE items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  description VARCHAR(300) NULL,
  id_state    INT NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_item_name (name),
  CONSTRAINT fk_item_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

CREATE TABLE inventory (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_item    INT NOT NULL,
  id_branch  INT NOT NULL,
  quantity   INT NOT NULL DEFAULT 0,
  min_stock  INT NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  UNIQUE KEY uq_inventory (id_item, id_branch),
  CONSTRAINT fk_inv_item
    FOREIGN KEY (id_item) REFERENCES items(id),
  CONSTRAINT fk_inv_branch
    FOREIGN KEY (id_branch) REFERENCES branches(id)
) ENGINE=InnoDB;

CREATE TABLE inventory_movements (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  id_inventory INT NOT NULL,
  id_user      INT NULL,
  movement_type ENUM('IN','OUT','ADJUST','SALE','CONSUMPTION') NOT NULL,
  quantity     INT NOT NULL,
  note         VARCHAR(250) NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_im_inventory
    FOREIGN KEY (id_inventory) REFERENCES inventory(id),
  CONSTRAINT fk_im_user
    FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================================================
--  PAGOS
-- =========================================================

CREATE TABLE payments (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  id_appointment    INT NOT NULL,
  amount            DECIMAL(10,2) NOT NULL,
  id_method         INT NOT NULL,
  id_status_payment INT NOT NULL,
  paid_at           DATETIME NULL,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  CONSTRAINT fk_pay_appt
    FOREIGN KEY (id_appointment) REFERENCES appointments(id),
  CONSTRAINT fk_pay_method
    FOREIGN KEY (id_method) REFERENCES payment_methods(id),
  CONSTRAINT fk_pay_status
    FOREIGN KEY (id_status_payment) REFERENCES payment_status(id)
) ENGINE=InnoDB;

-- =========================================================
--  NOTIFICACIONES Y PREFERENCIAS
-- =========================================================

CREATE TABLE notification_preferences (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  id_user         INT NOT NULL,
  email_enable    BOOLEAN NOT NULL DEFAULT TRUE,
  whatsapp_enable BOOLEAN NOT NULL DEFAULT FALSE,
  id_state        INT NOT NULL DEFAULT 1,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  UNIQUE KEY uq_notif_pref_user (id_user),
  CONSTRAINT fk_notifpref_user
    FOREIGN KEY (id_user) REFERENCES users(id),
  CONSTRAINT fk_notifpref_state
    FOREIGN KEY (id_state) REFERENCES general_status(id)
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_user    INT NOT NULL,
  title      VARCHAR(140) NOT NULL,
  message    VARCHAR(500) NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  sent_at    DATETIME NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_user
    FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================================================
--  FIDELIZACIÓN / PUNTOS
-- =========================================================

CREATE TABLE customer_loyalty (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  id_user    INT NOT NULL,
  points     INT NOT NULL DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_loyalty_user (id_user),
  CONSTRAINT fk_loyalty_user
    FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE loyalty_transactions (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  id_user      INT NOT NULL,
  points_delta INT NOT NULL,
  reason       VARCHAR(200) NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_loyalty_tx_user
    FOREIGN KEY (id_user) REFERENCES users(id)
) ENGINE=InnoDB;

-- =========================================================
--  ÍNDICES ADICIONALES
-- =========================================================

CREATE INDEX idx_users_branch_role ON users (id_branch, id_role);
CREATE INDEX idx_services_area_price ON services (id_area, price);
CREATE INDEX idx_appt_prof_time ON appointments (id_professional, start_time, end_time);
CREATE INDEX idx_pay_status_date ON payments (id_status_payment, paid_at);
CREATE INDEX idx_inv_branch_item ON inventory (id_branch, id_item);

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
--  DATOS INICIALES
-- =========================================================

INSERT INTO general_status (id, name, created_at, updated_at)
VALUES
  (1, 'Activo',   NOW(), NOW()),
  (2, 'Inactivo', NOW(), NOW());

INSERT INTO roles (id, name, id_state, created_at, updated_at)
VALUES
  (1, 'Administrador', 1, NOW(), NOW());

INSERT INTO provinces (id, name, id_state, created_at, updated_at)
VALUES
  (1, 'Pichincha', 1, NOW(), NOW());

INSERT INTO cantons (id, name, id_province, id_state, created_at, updated_at)
VALUES
  (1, 'Quito', 1, 1, NOW(), NOW());

INSERT INTO companies (id, name, id_state, created_at, updated_at)
VALUES
  (1, 'StyleDistrict', 1, NOW(), NOW());

