import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const client = new Pool({
	database: process.env.POSTGRES_DB,
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
})


export default client
