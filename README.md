# udacity-build-a-storefront-backend
Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements.

## Install Instructions:
For install all packages.
`yarn`

#### Need to install db-migrate
`npm install -g db-migrate`

## Set up Database
Open terminal and input
```su postgres
psql postgres`
CREATE USER xxx WITH PASSWORD 'xxx';
CREATE DATABASE full_stack_test;
\c full_stack_test
GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO xxx;
```

### To start
`yarn watch` to start the app and get access via http://localhost:3000

## Environmental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=front_store
POSTGRES_USER=xxx
POSTGRES_PASSWORD=xxx
ENV=dev
CRYPT_PASSWORD=xxx
SALT_ROUNDS=10
TOKEN_SECRET=xxx
```

## Start App
`yarn watch` or `npm run start`

### Running 
The server will start on port `3000` and the database on port `5432`

## Testing
Run test with
`yarn test`


