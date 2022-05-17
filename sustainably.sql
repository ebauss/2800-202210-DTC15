SHOW DATABASES;
DROP DATABASE sustainably;

CREATE DATABASE sustainably;

USE sustainably;

CREATE TABLE users
(
    user_id         INT unsigned NOT NULL auto_increment,
    password         VARCHAR(60) NOT NULL,
    first_name        VARCHAR(32) NOT NULL,
    last_name        VARCHAR(32) NOT NULL,
    email            VARCHAR(64) NOT NULL,
    country            VARCHAR(32) NOT NULL,
    age                INT unsigned NOT NULL,
    profile_icon    VARCHAR(512),
    reward_points    INT unsigned NOT NULL,
    monthly_total_points INT unsigned NOT NULL,
    monthly_goal_points INT unsigned NOT NULL,
    compass_id        VARCHAR(20),
    is_admin        BOOL NOT NULL,
    PRIMARY KEY        (user_id)
);

SHOW TABLES;

DESCRIBE users;

INSERT INTO users (password, first_name, last_name, email, country, age, reward_points, monthly_total_points, monthly_goal_points, is_admin, compass_id) VALUES
('$2b$10$rI.X57jCaUYLI65clEfGpOI6nvmAk/0v2uQaMPxVuQuiXBaGhy2pu', 'AC-130', 'Spectre', 'deathfromabove@freedom.co', 'USA', 40, 0, 0, 0, TRUE, null),
('$2b$10$Z4BTn.vf3YbYSBDo7f2ZDehY6F9x51ynCAME6DseROYDbBF9bmF1y', 'Tsubasa', 'Kazanari', 'tsubasa@zweiwing.co', 'Japan', 19, 6900, 1500, 1000, FALSE, '12345678901234567890'),
('$2b$10$QQXmHllOPTKrHpT1XdRvVu.GCZHB2FWB4CR8WtweBfgPowe21fCHW', 'Evon', 'Bausa', 'evon.bausa@gmail.com', 'Canada', 28, 0, 0, 0, TRUE, null),
('$2b$10$3po6wUytRACj0Amdbbl0pufhgT//TNm30C1CAHkCUpD4rOmkewE1G', 'Josh', 'Hart', 'josh.hart@gmail.com', 'USA', 35, 2000, 300, 10000, FALSE, '09876543210987654321'),
('$2b$10$hPuuFQta9pvjxWik7XadbOynR2YqxSIkzEcew0nEh6K2DzXCnRngK', 'Alexie', 'Narciso', 'alexie.narciso@admin.me', 'Canada', 68, 0, 0, 0, TRUE, null),
('$2b$10$NQwvS99JoJbeQHBC/jRqaOtRlh12l6mk8V6wsAl8f/5BbUqDRqFKS', 'Mary', 'Jane', 'mj@user.me', 'Mexico', 22, 3300, 300, 10000, FALSE, '09123456789087654321'),
('$2b$10$phPsLbpSP5NI4ltxWqEqsuAQShFsSmeDgFpW7jt6BUeNw5RkypAfq', 'Joshua', 'Dela Cruz', 'Joushua@0123@gmail.com', 'Greece', 10, 0, 0, 0, TRUE, null),
('$2b$10$p1moPpIt1WGkhrFowMFOsODhG0qkBAHtJj9bN8ApFT5ytjTvDByG6', 'Jake', 'Jimenez', 'JJimenez@gmail.com', 'UK', 20, 200, 300, 10000, FALSE, '43214321432143214321');

SELECT * FROM users;

SELECT password FROM users WHERE email = 'evon.bausa@gmail.com';
SELECT  password, user_id FROM users WHERE email IN ('evon.bausa@gmail.com');

CREATE TABLE rewards (
    reward_id    INT unsigned NOT NULL auto_increment,
    company        VARCHAR(20) NOT NULL,
    description    VARCHAR(50) NOT NULL,
    photo        VARCHAR(512) NOT NULL,
    value        INT unsigned NOT NULL,
    points_cost    INT unsigned NOT NULL,
    PRIMARY KEY    (reward_id)
);

INSERT INTO rewards (company, description, photo, value, points_cost) VALUES
('Bestbuy', 'Buy your favourite electronic goods', 'https://picsum.photos/id/237/200', 100, 10000 ),
('Apple', 'Discounts on overpriced stands', 'https://picsum.photos/id/237/200', 1000, 100000),
('Bed Bath and Beyond', 'Buy showers for your bed', 'https://picsum.photos/id/237/200', 100, 10000),
('Tesla', 'Electric cars are supposed to be silent', 'https://picsum.photos/id/237/200', 10000, 1000000),
('Nike', 'Whoosh', 'https://picsum.photos/id/237/200', 50, 5000),
('Adidas', 'Cheeki Breeki', 'https://picsum.photos/id/237/200', 50, 5000),
('Lululemon', 'Make lemonade with your gift card', 'https://picsum.photos/id/237/200', 25, 2500),
('BCIT', 'You might be able to pay for half your tuition', 'https://picsum.photos/id/237/200', 3500, 350000);

SELECT * FROM rewards;

CREATE TABLE receipts (
	receipt_id INT unsigned NOT NULL auto_increment,
    admin_id INT unsigned,
    notes VARCHAR(50),
    picture VARCHAR(500) NOT NULL,
    owner_id INT unsigned NOT NULL,
    reward_points INT unsigned,
    PRIMARY KEY (receipt_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id),
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

INSERT INTO receipts (admin_id, notes, picture, owner_id, reward_points) VALUES
(NULL, NULL, 'https://picsum.photos/id/237/200', 1, 60000),
(2, 'Good to go, whoo', 'https://picsum.photos/id/237/200', 3, 4190000);

SELECT * FROM receipts;