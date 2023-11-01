import express, { Request, Response } from "express";
import { verifyAuthToken } from "../utils/verify-auth-token";
import { Order, OrderStore } from "../models/orders";
import { DashboardQueries } from "../services/dashboard";

const dashboardQueries = new DashboardQueries()
const store = new OrderStore();

const orderRoutes = (app: express.Application) => {
	app.get('/orders', verifyAuthToken, index);
	app.get('/orders/users-with-orders', verifyAuthToken, showUsersWithOrders);
	app.get('/orders/products-in-orders', verifyAuthToken, showProductsInOrders);
	app.post('/orders', verifyAuthToken, create);
	app.get('/orders/:id', verifyAuthToken, show);
	app.put('/orders/:id', verifyAuthToken, update);
	app.delete('/orders/:id', verifyAuthToken, deleteOrder);
	app.post('/orders/:id/products', verifyAuthToken, addProduct);
}

const index = async(req: Request, res: Response) => {
	try {
		const orders = await store.index();

		res.json(orders);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const create = async(req: Request, res: Response) => {
	const order: Order = {
		status: req.body.status,
		userId: req.body.userId,
	}

	try {
		const newOrder = await store.create(order)

		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const show = async(req: Request, res: Response) => {
	try {
		const order = await store.show(req.params.id);

		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const showUsersWithOrders = async(req: Request, res: Response) => {
	try {
		const users = await dashboardQueries.usersWithOrders();

		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const showProductsInOrders = async(req: Request, res: Response) => {
	try {
		const users = await dashboardQueries.productsInOrders();

		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const update = async(req: Request, res: Response) => {
	const order: Order = {
		id: +req.params.id,
		status: req.body.status,
		userId: req.body.userId,
	}
	try {
		const result = await store.update(order);

		res.json(result);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const deleteOrder = async(req: Request, res: Response) => {
	try {
		const order = await store.delete(req.params.id);

		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const addProduct = async(req: Request, res: Response) => {
	const orderId: string = req.params.id;
	const productId: string = req.body.productId;
	const quantity: number = parseInt(req.body.quantity);

	try {
		const addedProduct = await store.addProduct(quantity, orderId, productId)

		res.json(addedProduct);
	} catch(err) {
		res.status(400);
		res.json(err);
	}
}

export default orderRoutes;
