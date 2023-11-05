import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

let token: string;

describe('User Handler', () => {
	it('should gets the create endpoint', async() => {
		const res = await request.post('/users').send({
			username: 'hungcm5',
			password: 'hungcm5',
			firstName: 'Hung',
			lastName: 'Cao',
		});

		const { body, status } = res;
		token = body.token;

		expect(status).toEqual(200);
	});

	it('should gets the index endpoint', async() => {
		const res = await request.get('/users').set('Authorization', 'bearer ' + token);

		expect(res.status).toBe(200);
	});

	it('should get the read endpoint', async() => {
		const res = await request.get(`/users/1`).set('Authorization', 'bearer ' + token);

		expect(res.status).toBe(200);
	});
});

describe('Product Handler', () => {
	const product = { name: 'Sting dâu', price: 29 };

	it('gets the create endpoint', async() => {
		const res = await request.post('/products').send(product).set('Authorization', 'bearer ' + token);
		expect(res.status).toBe(200);
	});

	it('gets the index endpoint', async() => {
		const res = await request.get('/products');
		expect(res.status).toBe(200);
	});

	it('gets the read endpoint', async() => {
		const res = await request.get(`/products/1`);

		expect(res.status).toBe(200);
	});

	it('gets the update endpoint', async() => {
		const newProduct = { id: 1, name: 'Sting cam', price: 20 };

		const res = await request.put(`/products`).send(newProduct).set('Authorization', 'bearer ' + token);

		expect(res.status).toBe(200);
	});

	it('gets the delete endpoint', async() => {
		const res = await request.delete(`/products/1`).set('Authorization', 'bearer ' + token);
		expect(res.status).toBe(200);
	});
});

describe('Order Handler', () => {
	beforeAll(async () => {
		await request
			.post(`/products`)
			.send({ name: 'Sting chanh', price: 100 })
			.set('Authorization', 'bearer ' + token)
	})

	const data = { user_id: "1", status: "open" };
	it('should create order endpoint', async() => {
		const res = await request.post('/orders').send(data).set('Authorization', 'Bearer ' + token);

		expect(res.status).toBe(200);
	});

	it('should get the index endpoint', async() => {
		const res = await request.get('/orders').set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	it('should get the read endpoint', async() => {
		const res = await request.get(`/orders/1`).set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	it('should get the update endpoint', async() => {
		const newData = { id: 1, user_id: "1", status: "close" };
		const res = await request.put(`/orders`).send(newData).set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	it('should show the order by user endpoint', async() => {
		const res = await request.get(`/orders/1/order-by-user`).set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	it('should get the add product endpoint', async() => {
		const data = {
			order_id: "1",
			product_id: "2",
			quantity: 100
		}
		const res = await request.post(`/orders/1/products`).send(data).set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	it('should gets the delete endpoint', async() => {
		const res = await request.delete(`/orders/1`).set('Authorization', 'bearer ' + token)

		expect(res.status).toBe(200);
	});

	afterAll(async () => {
		await request.delete(`/products/2`).set('Authorization', 'bearer ' + token);
	});
});
