CREATE TABLE orders
(
    id      SERIAL PRIMARY KEY,
    status  VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
INSERT INTO orders(status, user_id) values ('open', 1);
