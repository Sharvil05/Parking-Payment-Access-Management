USE parking_management_db;

-- =========================================================
-- SAMPLE PARKING SLOTS
-- =========================================================

INSERT INTO parking_slots
(slot_number, slot_type, status, floor, description)
VALUES
('B-01', 'BIKE', 'AVAILABLE', 1, 'Bike parking slot'),
('B-02', 'BIKE', 'AVAILABLE', 1, 'Bike parking slot'),
('C-01', 'CAR', 'AVAILABLE', 1, 'Car parking slot'),
('C-02', 'CAR', 'AVAILABLE', 1, 'Car parking slot'),
('C-03', 'CAR', 'AVAILABLE', 1, 'Car parking slot'),
('S-01', 'SUV', 'AVAILABLE', 2, 'SUV parking slot'),
('T-01', 'TRUCK', 'AVAILABLE', 2, 'Truck parking slot');


-- =========================================================
-- SAMPLE USER
-- =========================================================

INSERT INTO users
(name, email, password, phone, role, active, created_at)
VALUES
(
    'Rahul Patil',
    'rahul@gmail.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    '9876543210',
    'USER',
    TRUE,
    NOW()
);


-- =========================================================
-- SAMPLE VEHICLE
-- =========================================================

INSERT INTO vehicles
(vehicle_number, vehicle_type, owner_id, created_at)
VALUES
(
    'MH12AB1234',
    'CAR',
    (
        SELECT id
        FROM users
        WHERE email = 'rahul@gmail.com'
    ),
    NOW()
);