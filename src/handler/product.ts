import express, { Request, Response } from "express";
import { verifyAuthToken } from "../utils/verify-auth-token";
import { Product, ProductStore } from "../models/products";

const store = new ProductStore();

const productRoutes = (app: express.Application): void => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', verifyAuthToken, create);
	app.put('/products', verifyAuthToken, update);
	app.delete('/products/:id', verifyAuthToken, deleteProduct);
}

const index = async(req: Request, res: Response): Promise<void> => {
	try {
		const products = await store.index();

		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const show = async(req: Request, res: Response): Promise<void> => {
	try {
		const product = await store.show(+req.params.id);

		res.json(product);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const create = async(req: Request, res: Response): Promise<void> => {
	const product: Product = {
		id: +req.params.id,
		name: req.body.name,
		price: +req.body.price,
	}

	try {
		const newProduct = await store.create(product)

		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

const update = async(req: Request, res: Response) => {
	const product: Product = {
		id: +req.body.id,
		name: req.body.name,
		price: +req.body.price,
	}
	try {
		const result = await store.update(product);

		res.json(result);
	} catch (err) {
		res.status(400);
		console.log(err)
		res.json(err);
	}
}

const deleteProduct = async(req: Request, res: Response) => {
	try {
		const product = await store.delete(+req.params.id);

		res.json(product);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
}

export default productRoutes;
