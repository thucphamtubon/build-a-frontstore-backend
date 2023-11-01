SELECT *
from users;

CREATE TABLE users
(
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(100),
    password_digest VARCHAR
);

INSERT INTO users(id, username, password_digest)
values (1, 'supper_admin', '$2b$10$melBF4.J3ryDpyg1rD/Z/OvfqsohcaXavblIQffmMaAFSnUy.XEFq');
SELECT *
from users;

-- Product
CREATE TABLE products
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(64) NOT NULL,
    price integer     NOT NULL
);
INSERT INTO products(name, price)
values ('7 up', 10000),
       ('Coca-cola', 11000),
       ('Pepsi', 12000),
       ('Reviece', 9000),
       ('0 Độ', 8000),
       ('9 Độ', 13000)
returning *;
UPDATE products
SET name  = '7 up edited',
    price = 101
WHERE id = 1
returning *;

select *
from products;

-- Order
CREATE TABLE orders
(
    id      SERIAL PRIMARY KEY,
    status  VARCHAR(15),
    user_id bigint REFERENCES users (id)
);

INSERT INTO orders(status, user_id)
values ('open', 1)
returning *;

UPDATE orders
SET status='open'
WHERE id = 1
  and user_id = 1
returning *;

select *
from orders;

-- Order Products
CREATE TABLE order_products
(
    id         SERIAL PRIMARY KEY,
    quantity   bigint,
    order_id   bigint REFERENCES orders (id),
    product_id bigint REFERENCES products (id)
);
insert into order_products(quantity, order_id, product_id)
VALUES (10, 1, 1),
       (5, 1, 2),
       (3, 1, 3)
returning *;


-- drop tables
drop table order_products;
drop table products;
drop table orders;
drop table users;


-- For test
DROP TABLE order_products CASCADE;
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity bigint,
    order_id bigint REFERENCES orders (id),
    product_id bigint REFERENCES products (id)
);
DROP TABLE products CASCADE;
CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price integer NOT NULL);
DROP TABLE orders CASCADE;
CREATE TABLE orders(id SERIAL PRIMARY KEY, status VARCHAR(15), user_id bigint REFERENCES users (id));
DROP TABLE users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_digest VARCHAR,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

SELECT * FROM products ORDER BY price DESC LIMIT 5;


