import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from "./handler/user";
import orderRoutes from "./handler/order";
import productRoutes from "./handler/product";
import dotenv from "dotenv";

dotenv.config()

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req: Request, res: Response) {
	res.send('A Storefront backend')
})

userRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(process.env.PORT, function() {
	console.log(`starting app on: ${address}`)
})

export default app;
