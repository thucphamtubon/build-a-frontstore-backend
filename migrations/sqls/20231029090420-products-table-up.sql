CREATE TABLE products
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(64) NOT NULL,
    price integer     NOT NULL
);

INSERT INTO products(name, price) values ('Pepsi', 100);
