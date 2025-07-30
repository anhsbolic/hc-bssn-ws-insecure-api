CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100)       NOT NULL,-- plaintext! (insecure)
    role     VARCHAR(50)        NOT NULL DEFAULT 'staff'
);
