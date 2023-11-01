import { UserStore } from '../users';
import bcrypt from "bcrypt";

const store = new UserStore()

describe("User Model", () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a authenticate method', () => {
		expect(store.authenticate).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('create method should add a user', async() => {
		const user = {
			username: 'hungcm5',
			password: 'hungcm5',
			firstName: 'Hung',
			lastName: 'Cao Minh',
		};

		const result = await store.create(user);

		expect(result).toEqual({
			id: 2,
			username: 'hungcm5',
			firstName: 'Hung',
			lastName: 'Cao Minh',
		});
	});

	it('authen method should authen the user', async() => {
		const result = await store.authenticate('hungcm5', 'hungcm5');

		expect(result).toEqual({
			id: 2,
			username: 'hungcm5',
		});
	});

	it('index method should return a list of users', async() => {
		const results = await store.index();

		expect(results).toEqual([
			{ id: 1, username: 'supper_admin', firstName: 'Hung', lastName: 'Cao Minh' },
			{ id: 2, username: 'hungcm5', firstName: 'Hung', lastName: 'Cao Minh' },
		]);
	});

	it('show method should return the correct user', async() => {
		const result = await store.show("2");

		expect(result).toEqual({
			id: 2,
			username: 'hungcm5',
			firstName: 'Hung',
			lastName: 'Cao Minh',
		});
	});

	it('delete method should remove the user', async() => {
		await store.create({ username: 'hungcm9', firstName: 'Hung', lastName: 'Cao Minh' })
		await store.delete("3");

		const result = await store.index()

		expect(result).toEqual([
			{ id: 1, username: 'supper_admin', firstName: 'Hung', lastName: 'Cao Minh' },
			{ id: 2, username: 'hungcm5', firstName: 'Hung', lastName: 'Cao Minh' },
		]);
	});
});
