// @ts-ignore
import Client from '../database'

export type Order = {
	id?: number;
	userId: string;
	status: 'open' | 'close';
}

export type OrderRow = {
	id: number,
	user_id: string,
	status: 'open' | 'close';
}

export type OrderProduct = {
	id?: number;
	quantity: number;
	productId: string;
	orderId: string;
}

type OrderProductRow = {
	id: number,
	quantity: string;
	product_id: string;
	order_id: string;
}

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			// @ts-ignore
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders';

			const result = await conn.query(sql)

			conn.release()

			return result.rows.map((row: OrderRow) => {
				return {
					id: row.id,
					userId: row.user_id,
					status: row.status,
				} as Order
			})
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`)
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			conn.release()

			const order: OrderRow = result.rows[0]

			return {
				id: order.id,
				userId: order.user_id,
				status: order.status,
			}
		} catch (err) {
			throw new Error(`Could not get order ${id}. Error: ${err}`)
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			// @ts-ignore
			const conn = await Client.connect()
			const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;'
			const result = await conn.query(sql, [o.status, o.userId])
			const orderRow: OrderRow = result.rows[0]

			conn.release()

			return { id: orderRow.id, userId: orderRow.user_id, status: orderRow.status }
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
			const order: OrderRow = result.rows[0]

			conn.release()

			return { id: order.id, userId: order.user_id, status: order.status }
		} catch (err) {
			throw new Error(`unable update order ${o.id}: ${err}`)
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) returning *;'
			// @ts-ignore
			const conn = await Client.connect()

			const result = await conn.query(sql, [id])

			const order: OrderRow = result.rows[0]

			conn.release()

			return { id: order.id, userId: order.user_id, status: order.status }
		} catch (err) {
			throw new Error(`Could not delete order id: ${id} . Error: ${err}`)
		}
	}

	async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct> {
		try {
			const orderSql = 'SELECT * FROM orders WHERE id=($1);';
			const orderProductsSql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;';
			//@ts-ignore
			const conn = await Client.connect();

			const orderResult = await conn.query(orderSql, [orderId]);

			const orderRow = orderResult.rows[0];

			if (orderRow.status !== "open") {
				throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${orderRow.status}`);
			}

			const orderResultResult = await conn.query(orderProductsSql, [quantity, orderId, productId]);
			const orderProductRow: OrderProductRow = orderResultResult.rows[0]

			conn.release();

			return {
				id: orderProductRow.id,
				productId: orderProductRow.product_id,
				orderId: orderProductRow.order_id,
				quantity: +orderProductRow.quantity
			};
		} catch (err) {
			throw new Error(`${err}`);
		}
	}
}





