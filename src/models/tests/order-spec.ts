import { Order, OrderStore } from '../orders';

const store = new OrderStore()

describe("Order Model", () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a update method', () => {
		expect(store.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('should have a add product method', () => {
		expect(store.addProduct).toBeDefined();
	});

	it('create method should add a order', async() => {
		const order: Order = { userId: "1", status: 'open' };

		const result = await store.create(order);

		expect(result).toEqual({ id: 2, userId: "1", status: 'open' });
	});

	it('create method should add a order product', async() => {
		const result = await store.addProduct(10, "1", "1");

		expect(result).toEqual({ id: 1, productId: "1", orderId: "1", quantity: 10 });
	});

	it('index method should return a list of orders', async() => {
		const results = await store.index();

		expect(results).toEqual([
			{ id: 1, userId: "1", status: 'open' },
			{ id: 2, userId: "1", status: 'open' }
		]);
	});

	it('show method should return the correct order', async() => {
		const result = await store.show("1");
		expect(result).toEqual({ id: 1, userId: "1", status: 'open' });
	});

	it('method should update the order', async() => {
		const result = await store.update({ id: 1, userId: "1", status: 'close' });

		expect(result).toEqual({ id: 1, userId: "1", status: 'close' });
	});

	it('delete method should remove the order', async() => {
		await store.create({ status: 'open', userId: '1' })
		await store.delete("3");

		const result = await store.index()

		expect(result).toEqual([
			{ id: 2, userId: "1", status: 'open' },
			{ id: 1, userId: "1", status: 'close' },
		]);
	});
});
