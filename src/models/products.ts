// @ts-ignore
import Client from '../database'

export type Product = {
	id?: number;
	name: string;
	price: number;
}

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products';

			const result = await conn.query(sql)

			conn.release()

			return result.rows
		} catch (err) {
			throw new Error(`Could not get products. Error: ${err}`)
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not get product ${id}. Error: ${err}`)
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'

			const result = await conn.query(sql, [p.name, p.price])
			const product = result.rows[0]

			conn.release()

			return product
		} catch (err) {
			throw new Error(`unable create product: ${err}`)
		}
	}

	async update(p: Product): Promise<Product> {
		try {
			if (!p?.id) {
				throw new Error(`Missing id`)
			}

			// @ts-ignore
			const conn = await Client.connect()
			const sql = "UPDATE products SET name=$1, price=$2 WHERE id=($3) returning *;"

			// @ts-ignore
			const result = await conn.query(sql, [p.name, p.price, p.id])
			const product = result.rows[0]
			conn.release()

			return product
		} catch (err) {
			throw new Error(`unable update product ${p.id}: ${err}`)
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1) returning *;'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			const product = result.rows[0]

			conn.release()

			return product
		} catch (err) {
			throw new Error(`Could not delete product id: ${id} . Error: ${err}`)
		}
	}
}





