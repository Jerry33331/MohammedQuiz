-- Seed data for Mohammed Quiz - Phase 1: Foundation + Authentication

-- Insert admin user
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert teacher user
INSERT INTO users (username, password_hash, role) 
VALUES ('teacher', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'teacher')
ON CONFLICT (username) DO NOTHING;

-- Insert sample player
INSERT INTO users (username, password_hash, role) 
VALUES ('player1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoE5B7smX4C9cA2vNCCEw2Pq8ncW', 'player')
ON CONFLICT (username) DO NOTHING;
