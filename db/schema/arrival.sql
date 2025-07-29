CREATE TABLE arrivals
(
    id               SERIAL PRIMARY KEY,
    fullname         TEXT,
    passport_no      TEXT,
    vaccine_card_url TEXT,
    status           TEXT DEFAULT 'pending'
);
