CREATE TABLE refresh_tokens
(
    id         SERIAL PRIMARY KEY,
    token      TEXT      NOT NULL UNIQUE,
    user_id    INT       NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
