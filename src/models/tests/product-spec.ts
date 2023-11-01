import { ProductStore } from '../products';
import { DashboardQueries } from "../../services/dashboard";

const dashboardQueries = new DashboardQueries()
const store = new ProductStore()

describe("Product Model", () => {
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

	it('create method should add a product', async() => {
		const product = { name: 'Pepsi', price: 100 };

		const result = await store.create(product);

		expect(result).toEqual({ id: 2, name: 'Pepsi', price: 100 });
	});

	it('index method should return a list of products', async() => {
		const results = await store.index();

		expect(results).toEqual([
			{ id: 1, name: 'Pepsi', price: 100 },
			{ id: 2, name: 'Pepsi', price: 100 },
		]);
	});

	it('show method should return the correct product', async() => {
		const result = await store.show("1");
		expect(result).toEqual({ id: 1, name: 'Pepsi', price: 100 });
	});

	it('authen method should update the product', async() => {
		const result = await store.update({ id: 1, name: 'coca-cola', price: 99 });

		expect(result).toEqual({ id: 1, name: 'coca-cola', price: 99 });
	});

	it('create method should have five most expensive products', async() => {
		await store.create({ name: '7 up', price: 10000 });
		await store.create({ name: 'Coca-cola', price: 11000 });
		await store.create({ name: 'Pepsi', price: 12000 });
		await store.create({ name: 'Reviece', price: 9000 });
		await store.create({ name: '0 Độ', price: 8000 });
		await store.create({ name: '9 Độ', price: 13000 });

		const result = await dashboardQueries.fiveMostExpensive();

		expect(result).toEqual([
			{ id: 8, name: '9 Độ', price: 13000 },
			{ id: 5, name: 'Pepsi', price: 12000 },
			{ id: 4, name: 'Coca-cola', price: 11000 },
			{ id: 3, name: '7 up', price: 10000 },
			{ id: 6, name: 'Reviece', price: 9000 },
		]);
	});

	it('delete method should remove the product', async() => {
		const product = await store.create({ name: '123', price: 100})
		await store.delete("9");

		const result = await store.index()

		expect(result.length).toEqual(8);
	});
});
