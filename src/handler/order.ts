import express, { Request, Response } from "express";
import { verifyAuthToken } from "../utils/verify-auth-token";
import { Order, OrderStore } from "../models/orders";

const store = new OrderStore();

const orderRoutes = (app: express.Application): void => {
	app.get('/orders', verifyAuthToken, index);
	app.get('/orders/:user_id/order-by-user', verifyAuthToken, showCurrentOrderByUser);
	app.post('/orders', verifyAuthToken, create);
	app.get('/orders/:id', verifyAuthToken, show);
	app.put('/orders', verifyAuthToken, update);
	app.delete('/orders/:id', verifyAuthToken, deleteOrder);
	app.post('/orders/:id/products', verifyAuthToken, addProduct);
}

const showCurrentOrderByUser = async(req: Request, res: Response) => {
	try {
		const users = await store.getOrderByUserId(req.params.user_id);

		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
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
		user_id: req.body.user_id,
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
		const order = await store.show(+req.params.id);

		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const update = async(req: Request, res: Response) => {
	const order: Order = {
		id: +req.body.id,
		status: req.body.status,
		user_id: req.body.user_id,
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
		const order = await store.delete(+req.params.id);

		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const addProduct = async(req: Request, res: Response) => {
	const order_id: string = req.params.id;
	const product_id: string = req.body.product_id;
	const quantity: number = parseInt(req.body.quantity);

	try {
		const addedProduct = await store.addProduct(quantity, order_id, product_id)

		res.json(addedProduct);
	} catch(err) {
		res.status(400);
		res.json(err);
	}
}

export default orderRoutes;
