import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from 'jsonwebtoken'
import { verifyAuthToken } from "../utils/verify-auth-token";

const store = new UserStore();

const user_routes = (app: express.Application) => {
	app.get('/users', verifyAuthToken, index)

	app.get('/users/:id', verifyAuthToken, show)

	app.post('/users', verifyAuthToken, create)

	app.post('/users/auth', authenticate)

	app.put('/users/:id', verifyAuthToken, update)

	app.delete('/users/:id', verifyAuthToken, remove)
}

const index = async(req: Request, res: Response) => {
	try {
		const users = await store.index()

		res.json(users)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const show = async(req: Request, res: Response) => {
	try {
		const user = await store.show(req.params.id)

		res.json(user)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const create = async(req: Request, res: Response) => {
	const user: User = {
		username: req.body.username,
		password: req.body.password,
	}

	try {
		const newUser = await store.create(user)
		const token = jwt.sign(
			{ user: newUser },
			// @ts-ignore
			process.env.TOKEN_SECRET
		);
		res.json(token)
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const update = async(req: Request, res: Response) => {
	try {
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const remove = async(req: Request, res: Response) => {
	try {
		await store.delete(req.body.id)
		res.send('Delete success')
	} catch (err) {
		res.status(400)
		res.json(err)
	}
}

const authenticate = async(req: Request<User>, res: Response) => {
	const user: User = {
		username: req.body.username,
		password: req.body.password,
	}

	try {
		const u = await store.authenticate(user.username, user.password)
		// @ts-ignore
		const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
		res.json(token)
	} catch (error) {
		res.status(401)
		res.json({ error })
	}
}

export default user_routes;
