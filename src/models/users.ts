import bcrypt from 'bcrypt'
// @ts-ignore
import Client from '../database'

export type User = {
	id?: number;
	username: string;
	password?: string;
	firstName?: string;
	lastName?: string;
}

export type UserRow = {
	id: number;
	username: string;
	password_digest?: string;
	first_name: string;
	last_name: string;
}

export class UserStore {
	async index(): Promise<User[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'SELECT * FROM users;'

			const result = await conn.query(sql)

			conn.release()

			return result.rows.map((row: UserRow) => {
				return {
					id: row.id,
					username: row.username,
					firstName: row.first_name,
					lastName: row.last_name,
				}
			})
		} catch (err) {
			throw new Error(`Could not get users. Error: ${err}`)
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])
			const userRow: UserRow = result.rows[0];

			conn.release()

			return {
				id: userRow.id,
				username: userRow.username,
				firstName: userRow.first_name,
				lastName: userRow.last_name
			}
		} catch (err) {
			throw new Error(`Could not get user ${id}. Error: ${err}`)
		}
	}

	async create(u: User): Promise<User> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'INSERT INTO users (username, password_digest, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *;';

			// @ts-ignore
			const hash = bcrypt.hashSync(u.password + process.env.CRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));

			const result = await conn.query(sql, [u.username, hash, u.firstName, u.lastName]);
			const user: UserRow = result.rows[0];

			conn.release();

			return {
				id: user.id,
				username: user.username,
				firstName: user.first_name,
				lastName: user.last_name,
			}
		} catch (err) {
			throw new Error(`unable create user (${u.username}): ${err}`);
		}
	}

	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1) returning *;'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [+id])

			const u: UserRow = result.rows[0]

			conn.release()

			return {
				id: u.id,
				username: u.username
			}
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
			const u: UserRow = result.rows[0]

			// @ts-ignore
			if (bcrypt.compareSync(password + process.env.CRYPT_PASSWORD, u.password_digest)) {
				return {
					id: u.id,
					username: u.username
				}
			}
		}

		return null
	}
}

