CREATE DATABASE IF NOT EXISTS parking_management_db;

USE parking_management_db;

-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(15) NOT NULL,

    role VARCHAR(20) NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at DATETIME NOT NULL
);


-- =========================================================
-- PARKING SLOTS
-- =========================================================

CREATE TABLE parking_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    slot_number VARCHAR(20) NOT NULL UNIQUE,

    slot_type VARCHAR(20) NOT NULL,

    status VARCHAR(20) NOT NULL,

    floor INT NOT NULL,

    description VARCHAR(255)
);


-- =========================================================
-- VEHICLES
-- =========================================================

CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    vehicle_number VARCHAR(20) NOT NULL UNIQUE,

    vehicle_type VARCHAR(20) NOT NULL,

    owner_id BIGINT NOT NULL,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_vehicle_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
);


-- =========================================================
-- PARKING SESSIONS
-- =========================================================

CREATE TABLE parking_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    vehicle_id BIGINT NOT NULL,

    slot_id BIGINT NOT NULL,

    entry_time DATETIME NOT NULL,

    exit_time DATETIME,

    duration_minutes BIGINT,

    parking_fee DECIMAL(10,2),

    status VARCHAR(20) NOT NULL,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_session_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(id),

    CONSTRAINT fk_session_slot
        FOREIGN KEY (slot_id)
        REFERENCES parking_slots(id)
);


-- =========================================================
-- PAYMENTS
-- =========================================================

CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    parking_session_id BIGINT NOT NULL UNIQUE,

    amount DECIMAL(10,2) NOT NULL,

    payment_method VARCHAR(20) NOT NULL,

    payment_status VARCHAR(20) NOT NULL,

    transaction_reference VARCHAR(255) NOT NULL UNIQUE,

    payment_time DATETIME,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_payment_session
        FOREIGN KEY (parking_session_id)
        REFERENCES parking_sessions(id)
);