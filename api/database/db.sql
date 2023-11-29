CREATE DATABASE golfstats;

CREATE TABLE player(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
);

CREATE TABLE golf_bag(
    id SERIAL PRIMARY KEY,
    player_id INT UNIQUE REFERENCES player (id) ON DELETE CASCADE,
    bag_name TEXT UNIQUE
);

CREATE TABLE golf_club(
    id SERIAL PRIMARY KEY,
    golf_bag_id INT REFERENCES golf_bag (id),
    club_type TEXT,
    club_number TEXT
);

CREATE TABLE golf_course(
    id SERIAL PRIMARY KEY,
    rating DECIMAL,
    slope INT,
    par INT,
    course_location TEXT,
    course_name TEXT
);

CREATE TABLE golf_round(
    id SERIAL PRIMARY KEY,
    player_id INT UNIQUE REFERENCES player (id) ON DELETE CASCADE,
    course_id INT UNIQUE REFERENCES golf_course(id),
    round_score INT,
    round_date DATE,
    num_holes INT,
);

CREATE TABLE golf_hole(
    id SERIAL PRIMARY KEY,
    course_id INT UNIQUE REFERENCES golf_course(id),
    hole_number INT,
    par INT,
    distance INT,
    hole_score INT
);

CREATE TABLE golf_shot(
    id SERIAL PRIMARY KEY,
    hole_id INT UNIQUE REFERENCES golf_hole (id),
    distance INT,
    golf_club_id INT UNIQUE REFERENCES golf_club (id),
    shape TEXT,
    outcome TEXT,
    good_shot BOOLEAN
);