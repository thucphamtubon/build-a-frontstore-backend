# udacity-build-a-storefront-backend
Build a JavaScript API based on a requirements given by the stakeholders. 
You will architect the database, tables, and columns to fulfill the requirements.

### Environmental Variables Set up
Create `.env` file and put all enviroment variable:
```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=frontstore
POSTGRES_DB_TEST=frontstore_test
POSTGRES_USER = hungcm5
POSTGRES_PASSWORD=hungcm5
TOKEN_SECRET=hungcm5
CRYPT_PASSWORD=hungcm5
SALT_ROUNDS=10
TOKEN_SECRET=hungcm5
ENV=dev
```

### Need to install database
Create a postgres local name:
Database name: frontstore, username: hungcm5, password: hungcm5

Open terminal and input for development and testing database:
```
su postgres
psql postgres
CREATE USER hungcm5 WITH PASSWORD 'hungcm5';

CREATE DATABASE frontstore;
GRANT ALL PRIVILEGES ON DATABASE frontstore TO hungcm5;
ALTER DATABASE frontstore OWNER TO hungcm5;

CREATE DATABASE frontstore_test;
GRANT ALL PRIVILEGES ON DATABASE frontstore_test TO hungcm5;
ALTER DATABASE frontstore_test OWNER TO hungcm5;
```

### Install Packages Instructions:
Install packages. `yarn install`

Migrate database: `db-migrate up`

To drop the tables database: `db-migrate down`

Start app: `yarn watch`

Run test with `yarn test`

### Running Ports
After start up, the server will start on port `3000` and the database on port `5432`

Access api via: http://localhost:3000

## Token and Authentication
Tokens are passed along with the http header as
```
Authorization   Bearer <token>
```

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 
