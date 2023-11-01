CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_digest VARCHAR,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

insert into users(username, password_digest, first_name, last_name)
values ('supper_admin', 'supper_admin', 'Hung', 'Cao Minh');
