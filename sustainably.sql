DROP DATABASE sustainably;

CREATE DATABASE sustainably;
USE sustainably;

CREATE TABLE users
(
	user_id 				INT unsigned NOT NULL auto_increment,
    password 				VARCHAR(60) NOT NULL,
    first_name				VARCHAR(32) NOT NULL,
    last_name				VARCHAR(32) NOT NULL,
    email					VARCHAR(64) NOT NULL,
    country					VARCHAR(32) NOT NULL,
    age						INT unsigned NOT NULL,
    profile_icon			VARCHAR(512),
    reward_points			INT unsigned NOT NULL,
    monthly_total_points	INT unsigned NOT NULL,
    monthly_goal_points		INT unsigned NOT NULL,
    compass_id				VARCHAR(20),
    is_admin				BOOL NOT NULL,
    PRIMARY KEY				(user_id)
);

ALTER TABLE users ADD COLUMN last_login VARCHAR(6);

INSERT INTO users (password, first_name, last_name, email, country, age, reward_points, monthly_total_points, monthly_goal_points, compass_id, is_admin) VALUES
('$2b$10$rI.X57jCaUYLI65clEfGpOI6nvmAk/0v2uQaMPxVuQuiXBaGhy2pu', 'AC-130', 'Spectre', 'deathfromabove@freedom.co', 'USA', 40, 0, 0, 0, null, TRUE),
('$2b$10$Z4BTn.vf3YbYSBDo7f2ZDehY6F9x51ynCAME6DseROYDbBF9bmF1y', 'Tsubasa', 'Kazanari', 'tsubasa@zweiwing.co', 'Japan', 19, 6900, 1500, 1000, '12345678901234567890', FALSE),
('$2b$10$QQXmHllOPTKrHpT1XdRvVu.GCZHB2FWB4CR8WtweBfgPowe21fCHW', 'Evon', 'Bausa', 'evon.bausa@gmail.com', 'Canada', 28, 0, 0, 0, null, TRUE),
('$2b$10$3po6wUytRACj0Amdbbl0pufhgT//TNm30C1CAHkCUpD4rOmkewE1G', 'Josh', 'Hart', 'josh.hart@gmail.com', 'USA', 35, 2000, 300, 10000, '09876543210987654321', FALSE);

INSERT INTO users (password, first_name, last_name, email, country, age, reward_points, monthly_total_points, monthly_goal_points, compass_id, is_admin) VALUES
('$2b$10$hPuuFQta9pvjxWik7XadbOynR2YqxSIkzEcew0nEh6K2DzXCnRngK', 'Alexie', 'Narciso', 'alexie.narciso@admin.me', 'Canada', 68, 0, 0, 0, null, TRUE),
('$2b$10$NQwvS99JoJbeQHBC/jRqaOtRlh12l6mk8V6wsAl8f/5BbUqDRqFKS', 'Mary', 'Jane', 'mj@user.me', 'Mexico', 22, 3300, 3300, 10000, '09123456789087654321', FALSE),
('$2b$10$phPsLbpSP5NI4ltxWqEqsuAQShFsSmeDgFpW7jt6BUeNw5RkypAfq', 'Joshua', 'Dela Cruz', 'Joushua@0123@gmail.com', 'Greece', 10, 0, 0, 0, null, TRUE),
('$2b$10$p1moPpIt1WGkhrFowMFOsODhG0qkBAHtJj9bN8ApFT5ytjTvDByG6', 'Jake', 'Jimenez', 'JJimenez@gmail.com', 'UK', 20, 200, 200, 10000, '43214321432143214321', FALSE);

CREATE TABLE rewards (
	reward_id	INT unsigned NOT NULL auto_increment,
    company		VARCHAR(20) NOT NULL,
    description	VARCHAR(50) NOT NULL,
    photo		VARCHAR(512) NOT NULL,
    value		INT unsigned NOT NULL,
    points_cost	INT unsigned NOT NULL,
    PRIMARY KEY	(reward_id)
);

INSERT INTO rewards (company, description, photo, value, points_cost) VALUES
('Bestbuy', 'Expert service. Unbeatable price.', 'https://picsum.photos/id/237/200', 100, 10000 ),
('Apple', 'Think Different', 'https://picsum.photos/id/237/200', 1000, 100000),
('Bed Bath and Beyond', 'Home, Happier.', 'https://picsum.photos/id/237/200', 100, 10000),
('Tesla', "One step to sustainable energy", 'https://picsum.photos/id/237/200', 10000, 1000000),
('Nike', 'Just Do It', 'https://picsum.photos/id/237/200', 50, 5000),
('Adidas', 'Adidas is all in', 'https://picsum.photos/id/237/200', 50, 5000),
('Lululemon', 'Yoga clothes & running gear for sweaty workouts', 'https://picsum.photos/id/237/200', 25, 2500),
('BCIT', 'The best post-secondary in Canada', 'https://picsum.photos/id/237/200', 3500, 350000);

CREATE TABLE receipts (
    receipt_id INT unsigned NOT NULL auto_increment,
    admin_id INT unsigned,
    notes VARCHAR(50),
    picture VARCHAR(500) NOT NULL,
    owner_id INT unsigned NOT NULL,
    reward_points INT unsigned,
    verified_date DATETIME,
    PRIMARY KEY (receipt_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id),
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

INSERT INTO receipts (admin_id, notes, picture, owner_id, reward_points, verified_date) VALUES
(NULL, NULL, 'https://picsum.photos/id/237/200', 2, 60000, '2022-05-25'),
(1, 'Good to go, whoo', 'https://picsum.photos/id/237/200', 2, 419000, '1991-06-23');

CREATE TABLE users_rewards (
    user_id 		INT unsigned NOT NULL,
    reward_id   	INT unsigned NOT NULL,
    redeemed_date 	DATETIME,
    expiry_date 	DATETIME
);

INSERT INTO users_rewards (user_id, reward_id, redeemed_date, expiry_date) VALUES
(2, 1, '2022-02-28', '2024-12-25'),
(4, 3, '2022-03-01', '2024-12-26');