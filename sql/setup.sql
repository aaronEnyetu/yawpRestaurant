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


CREATE TABLE yawp_restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO yawp_restaurants
 (name)
 VALUES 
 ('Tasty'),
 ('Yawp Foods'),
 ('Taste Buds');

 CREATE TABLE yawp_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rest_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  review varchar(255) NOT NULL,
  FOREIGN KEY (rest_id) REFERENCES yawp_restaurants(id),
  FOREIGN KEY (user_id) REFERENCES yawp_users(id)
);

INSERT INTO yawp_reviews
(
    rest_id, 
    user_id, 
    review
    )

VALUES
('1', '1', 'the best place in town'),
('1', '1', 'amazing staff and tasty food'),
('1', '2', 'the food was amazing'),
('2', '2', 'You have to be here to believe it'),
('2', '1', 'the chicken tikka was great'),
('2', '2', 'I will definetly eat here again');
