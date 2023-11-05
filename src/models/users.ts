import bcrypt from 'bcrypt'
// @ts-ignore
import Client from '../database'

export type User = {
	id?: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

export class UserStore {
	async index(): Promise<User[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'SELECT * FROM users;'

			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			throw new Error(`Could not get users. Error: ${err}`)
		}
	}

	async show(id: number): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not get user ${id}. Error: ${err}`)
		}
	}

	async create(u: User): Promise<User> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'INSERT INTO users (username, password, firstName, lastName) VALUES($1, $2, $3, $4) RETURNING *;';

			// @ts-ignore
			const hash = bcrypt.hashSync(u.password + process.env.CRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));

			const result = await conn.query(sql, [u.username, hash, u.firstName, u.lastName]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`unable create user (${u.username}): ${err}`);
		}
	}

	async delete(id: number): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1) returning *;'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [+id])

			conn.release()

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not delete user id: ${id} . Error: ${err}`)
		}
	}

	async authenticate(username: string, password?: string): Promise<User | null> {
		// @ts-ignore
		const conn = await Client.connect()
		const sql = 'SELECT * FROM users WHERE username=$1;'

		const result = await conn.query(sql, [username])

		if (result.rows.length) {
			const u = result.rows[0]

			// @ts-ignore
			if (bcrypt.compareSync(password + process.env.CRYPT_PASSWORD, u.password)) {
				return u;
			}
		}

		return null
	}
}

