-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users CASCADE;


CREATE TABLE yawp_users (

    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

INSERT INTO yawp_users
(username, password_hash, email)
VALUES
('mock', '$2b$10$T09ZdD3tXIWXQynWmH0S.OHRefjmAFfV/.0aDx89hAvSB6/mf3COe', 'test@example.com'),
('mock1', '$2b$10$pGvCZFNuI7Pg2KVMXoKJZeqLlc5GEuqjjZtzbf17PK104gleG5Txu', 'test1@example.com')
;