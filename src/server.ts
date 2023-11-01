import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from "./handler/user";
import order_routes from "./handler/order";
import product_routes from "./handler/product";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req: Request, res: Response) {
	res.send('A Storefront backend')
})

user_routes(app);
order_routes(app);
product_routes(app);

app.listen(3000, function() {
	console.log(`starting app on: ${address}`)
})
