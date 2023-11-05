import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import { verifyAuthToken } from "../utils/verify-auth-token";

const store = new UserStore();

const userRoutes = (app: express.Application): void => {
	app.get('/users', verifyAuthToken, index)
	app.get('/users/:id', verifyAuthToken, show)
	app.post('/users', verifyAuthToken, create)
}

const index = async(req: Request, res: Response): Promise<void> => {
	try {
		const users = await store.index()

		res.json(users)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const show = async(req: Request, res: Response): Promise<void> => {
	try {
		const user = await store.show(+req.params.id)

		res.json(user)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const create = async(req: Request, res: Response): Promise<void> => {
	const user: User = {
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	}

	try {
		const newUser = await store.create(user)

		res.json(newUser)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

export default userRoutes;
