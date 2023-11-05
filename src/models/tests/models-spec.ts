import { UserStore } from '../users';
import { Order, OrderStore } from "../orders";
import { ProductStore } from "../products";

const userStore = new UserStore()
const productStore = new ProductStore()
const orderStore = new OrderStore()

describe("User Model", (): void => {
	it('should have an index method', (): void => {
		expect(userStore.index).toBeDefined();
	});

	it('should have a show method', (): void => {
		expect(userStore.show).toBeDefined();
	});

	it('should have a create method', (): void => {
		expect(userStore.create).toBeDefined();
	});

	it('should have a authenticate method', (): void => {
		expect(userStore.authenticate).toBeDefined();
	});

	it('should have a delete method', (): void => {
		expect(userStore.delete).toBeDefined();
	});

	it('create method should add a user', async(): Promise<void> => {
		const user = { username: 'hungcm5', password: 'hungcm5', firstName: 'Hung', lastName: 'Cao Minh' };

		const result = await userStore.create(user);

		expect(result.id).toEqual(1);
	});

	it('authen method should authen the user', async(): Promise<void> => {
		const result = await userStore.authenticate('hungcm5', 'hungcm5');

		expect(result).not.toBeNull();
	});

	it('index method should return a list of users', async(): Promise<void> => {
		const results = await userStore.index();

		expect(results.length).toEqual(1);
	});

	it('show method should return the correct user', async(): Promise<void> => {
		const result = await userStore.show(1);

		expect(result.id).toEqual(1);
	});

	it('delete method should remove the user', async(): Promise<void> => {
		await userStore.delete(1);

		const result = await userStore.index()

		expect(result).toEqual([]);
	});
});

describe("Product Model", () => {
	it('should have an index method', () => {
		expect(productStore.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(productStore.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(productStore.create).toBeDefined();
	});

	it('should have a update method', () => {
		expect(productStore.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(productStore.delete).toBeDefined();
	});

	it('create method should add a product', async() => {
		const product = { name: 'Pepsi', price: 100 };
		const result = await productStore.create(product);
		expect(result).toEqual({ id: 1, name: 'Pepsi', price: 100 });
	});

	it('index method should return a list of products', async() => {
		const results = await productStore.index();
		expect(results).toEqual([{ id: 1, name: 'Pepsi', price: 100 }]);
	});

	it('show method should return the correct product', async() => {
		const result = await productStore.show(1);
		expect(result).toEqual({ id: 1, name: 'Pepsi', price: 100 });
	});

	it('method should update the product', async() => {
		const result = await productStore.update({ id: 1, name: 'coca-cola', price: 99 });
		expect(result).toEqual({ id: 1, name: 'coca-cola', price: 99 });
	});

	it('delete method should remove the product', async() => {
		await productStore.delete(1);
		const result = await productStore.index()
		expect(result).toEqual([]);
	});
});

describe("Order Model", (): void => {
	it('should have an index method', (): void => {
		expect(orderStore.index).toBeDefined();
	});

	it('should have a show method', (): void => {
		expect(orderStore.show).toBeDefined();
	});

	it('should have a create method', (): void => {
		expect(orderStore.create).toBeDefined();
	});

	it('should have a update method', (): void => {
		expect(orderStore.update).toBeDefined();
	});

	it('should have a delete method', (): void => {
		expect(orderStore.delete).toBeDefined();
	});

	it('should have a get current order by user method', (): void => {
		expect(orderStore.getOrderByUserId).toBeDefined();
	});

	it('create method should add a order', async(): Promise<void> => {
		await userStore.create({ username: 'hungcm5', firstName: 'Hung Cao', lastName: 'Hung Cao', password: '123456' })
		await productStore.create({ name: 'CocaCola', price: 100 })

		const order: Order = { user_id: "2", status: 'open' };

		const result = await orderStore.create(order);

		expect(result).toEqual({ id: 1, user_id: "2", status: 'open' });
	});

	it('create method should add a order product', async(): Promise<void> => {
		const result = await orderStore.addProduct(10, "1", "2");

		expect(result).toEqual({ id: 1, product_id: "2", order_id: "1", quantity: 10 });
	});

	it('index method should return a list of orders', async(): Promise<void> => {
		const results = await orderStore.index();

		expect(results).toEqual([{ id: 1, user_id: "2", status: 'open' },]);
	});

	it('show method should return the correct order', async(): Promise<void> => {
		const result = await orderStore.show(1);

		expect(result).toEqual({ id: 1, user_id: "2", status: 'open' });
	});

	it('method should update the order', async(): Promise<void> => {
		const result = await orderStore.update({ id: 1, user_id: "2", status: 'close' });

		expect(result).toEqual({ id: 1, user_id: "2", status: 'close' });
	});
});
