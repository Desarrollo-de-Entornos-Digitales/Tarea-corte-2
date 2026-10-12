-- Insert Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access to manage users, roles and exercises'),
('user', 'Regular user with access to routines and activity logs');

-- Insert Permissions
INSERT INTO permissions (name, description) VALUES
('create_routine', 'Create new workout routines'),               -- id 1
('read_routine', 'Read workout routines'),                        -- id 2
('update_routine', 'Update existing workout routines'),           -- id 3
('delete_routine', 'Delete workout routines'),                    -- id 4
('manage_users', 'Manage user accounts'),                         -- id 5
('manage_roles', 'Manage roles and permissions'),                 -- id 6
('manage_exercises', 'Manage exercise catalog'),                  -- id 7
('create_exercise', 'Create new exercises in the catalog'),       -- id 8
('read_exercise', 'Read exercises from the catalog'),             -- id 9
('update_exercise', 'Update existing exercises'),                 -- id 10
('delete_exercise', 'Delete exercises from the catalog'),         -- id 11
('create_routine_exercise', 'Add an exercise to a routine'),      -- id 12
('read_routine_exercise', 'Read exercises assigned to a routine'),-- id 13
('update_routine_exercise', 'Update an exercise within a routine'),-- id 14
('delete_routine_exercise', 'Remove an exercise from a routine'), -- id 15
('create_activity_log', 'Start/register an activity session'),   -- id 16
('read_activity_log', 'Read activity session history'),          -- id 17
('update_activity_log', 'Update an activity session'),           -- id 18
('delete_activity_log', 'Delete an activity session'),           -- id 19
('create_activity_exercise', 'Register a result for an exercise performed'), -- id 20
('read_activity_exercise', 'Read results of exercises performed'), -- id 21
('update_activity_exercise', 'Update a result of an exercise performed'), -- id 22
('delete_activity_exercise', 'Delete a result of an exercise performed'); -- id 23

-- Insert Role-Permission relationships
INSERT INTO role_permissions (role_id, permission_id) VALUES
-- Admin: acceso total, incluida la gestion del catalogo de ejercicios, usuarios y roles
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
(1, 8), (1, 9), (1, 10), (1, 11),
(1, 12), (1, 13), (1, 14), (1, 15),
(1, 16), (1, 17), (1, 18), (1, 19),
(1, 20), (1, 21), (1, 22), (1, 23),
-- Regular user: administra sus propias rutinas y su historial de actividad,
-- puede leer el catalogo de ejercicios pero no modificarlo
(2, 1), (2, 2), (2, 3), (2, 4),
(2, 9),
(2, 12), (2, 13), (2, 14), (2, 15),
(2, 16), (2, 17), (2, 18), (2, 19),
(2, 20), (2, 21), (2, 22), (2, 23);

-- Insert Users
INSERT INTO users (username, email, password_hash, bio, role_id, created_at) VALUES
('admin_user', 'admin@gym.com', '$2b$10$hashedpassword1', 'System administrator', 1, NOW()),
('juan_perez', 'juan@example.com', '$2b$10$hashedpassword2', 'Fitness enthusiast', 2, NOW()),
('maria_garcia', 'maria@example.com', '$2b$10$hashedpassword3', 'Crossfit practitioner', 2, NOW()),
('carlos_lopez', 'carlos@example.com', '$2b$10$hashedpassword4', 'Marathon runner', 2, NOW()),
('ana_martinez', 'ana@example.com', '$2b$10$hashedpassword5', 'Powerlifting athlete', 2, NOW());

-- Insert Exercises
INSERT INTO exercises (name, description, type, estimated_calories, estimated_distance_km, estimated_duration_min, icon) VALUES
('Push-ups', 'Upper body strength exercise targeting chest and triceps', 'strength', 50.0, 0.0, 10, 'pushup_icon.png'),
('Squats', 'Lower body strength exercise targeting quads and glutes', 'strength', 80.0, 0.0, 15, 'squat_icon.png'),
('Outdoor Running', 'Cardio exercise for endurance and leg strength', 'cardio', 300.0, 5.0, 30, 'running_icon.png'),
('Bench Press', 'Barbell exercise for chest and triceps', 'strength', 120.0, 0.0, 20, 'benchpress_icon.png'),
('Plank', 'Core stability exercise', 'core', 40.0, 0.0, 5, 'plank_icon.png');

-- Insert Routines
INSERT INTO routines (user_id, name, description, created_at, updated_at) VALUES
(2, 'Full Body Routine', 'A balanced routine targeting all major muscle groups', NOW() - INTERVAL '5 days', NOW()),
(3, 'Cardio & Core Burst', 'High intensity cardio combined with core exercises', NOW() - INTERVAL '3 days', NOW()),
(4, 'Upper Body Strength', 'Heavy chest and triceps focus', NOW() - INTERVAL '2 days', NOW());

-- Insert Routine Exercises
INSERT INTO routine_exercises (routine_id, exercise_id, order_index, target_sets, target_reps, target_weight_kg, target_duration_min) VALUES
(1, 1, 1, 4, 15, 0.0, 10),
(1, 2, 2, 4, 12, 50.0, 15),
(1, 5, 3, 3, 1, 0.0, 5),
(2, 3, 1, 1, 1, 0.0, 30),
(2, 5, 2, 4, 1, 0.0, 5),
(3, 1, 1, 4, 20, 0.0, 10),
(3, 4, 2, 4, 8, 80.0, 20);

-- Insert Activity Logs
INSERT INTO activity_logs (user_id, routine_id, started_at, completed_at, created_at) VALUES
(2, 1, NOW() - INTERVAL '2 days' - INTERVAL '1 hour', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
(3, 2, NOW() - INTERVAL '1 day' - INTERVAL '40 minutes', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Insert Activity Exercises
INSERT INTO activity_exercises (activity_log_id, routine_exercise_id, actual_sets, actual_reps, actual_weight_kg, actual_duration_min, calories_burned, distance_covered_km, started_at, completed_at) VALUES
(1, 1, 4, 15, 0.0, 10, 55.0, 0.0, NOW() - INTERVAL '2 days' - INTERVAL '1 hour', NOW() - INTERVAL '2 days' - INTERVAL '50 minutes'),
(1, 2, 4, 12, 50.0, 15, 85.0, 0.0, NOW() - INTERVAL '2 days' - INTERVAL '50 minutes', NOW() - INTERVAL '2 days' - INTERVAL '35 minutes'),
(1, 3, 3, 1, 0.0, 5, 42.0, 0.0, NOW() - INTERVAL '2 days' - INTERVAL '35 minutes', NOW() - INTERVAL '2 days' - INTERVAL '30 minutes'),
(2, 4, 1, 1, 0.0, 32, 320.0, 5.2, NOW() - INTERVAL '1 day' - INTERVAL '40 minutes', NOW() - INTERVAL '1 day' - INTERVAL '8 minutes'),
(2, 5, 4, 1, 0.0, 5, 45.0, 0.0, NOW() - INTERVAL '1 day' - INTERVAL '8 minutes', NOW() - INTERVAL '1 day');
