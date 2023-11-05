// @ts-ignore
import Client from '../database'

export type Order = {
	id?: number;
	user_id: string;
	status: 'open' | 'close';
}

export type OrderProduct = {
	id?: number;
	product_id: string;
	order_id: string;
	quantity: number;
}

export class OrderStore {
	async getOrderByUserId(user_id: string): Promise<Order[]> {
		try {
			const connect = await Client.connect();
			const sql = `SELECT * FROM orders WHERE user_id=($1);`;
			const result = await connect.query(sql, [user_id]);
			connect.release();

			return result.rows
		} catch (err) {
			throw new Error(`Can not get order product ${err}`)
		}
	}
	async index(): Promise<Order[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders;';

			const result = await conn.query(sql)

			conn.release()

			return result.rows;
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`)
		}
	}
	async show(id: number): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not get order ${id}. Error: ${err}`)
		}
	}
	async create(o: Order): Promise<Order> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;'
			const result = await conn.query(sql, [o.status, o.user_id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`unable create order: ${err}`)
		}
	}
	async update(o: Order): Promise<Order> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'UPDATE orders SET status=$1 WHERE id=$2 returning *;'

			const result = await conn.query(sql, [o.status, o.id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`unable update order ${o.id}: ${err}`)
		}
	}
	async delete(id: number): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) returning *;'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			conn.release()

			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not delete order id: ${id} . Error: ${err}`)
		}
	}
	async addProduct(quantity: number, order_id: string, product_id: string): Promise<OrderProduct> {
		try {
			const orderProductsSql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;';
			//@ts-ignore
			const conn = await Client.connect();

			const orderResultResult = await conn.query(orderProductsSql, [quantity, order_id, product_id]);

			conn.release();

			return orderResultResult.rows[0];
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}





