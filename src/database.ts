import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
let client: Pool = new Pool({});

if (process.env.ENV === "test") {
	console.log(process.env.ENV, process.env.POSTGRES_DB_TEST, 'process.env.ENV test ------------')

	client = new Pool({
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB_TEST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD
	})
}

if(process.env.ENV === 'dev') {
	console.log(process.env.ENV, process.env.POSTGRES_DB, 'process.env.ENV dev ------------')

	client = new Pool({
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD
	})
}


export default client
