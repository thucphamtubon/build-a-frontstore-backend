# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. 
Users need to be able to browse an index of all products, see the specifics of a single product, 
and add products to an order that they can view in a cart page. 
You have been tasked with building the API that will support this application, 
and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, 
as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: [GET] 'http://localhost:3000/products' 
- Show: [GET] 'http://localhost:3000/products/:id' 
- Create: [POST] 'http://localhost:3000/products'  [Token required]
- Update: [PUT] 'http://localhost:3000/products'  [Token required]
- Delete: [DELETE] 'http://localhost:3000/products/:id'  [Token required]

#### Users
- Index: [GET]  'http://localhost:3000/uers' [token required]
- Show: [GET] 'http://localhost:3000/users/:id' [token required]
- Create: [POST] 'http://localhost:3000/users' [token required]

#### Orders
- Index: [GET]  'http://localhost:3000/orders' [token required]
- Current Order by user: [GET] 'http://localhost:3000/order/:user_id [token required]
- Create: [POST]  'http://localhost:3000/orders/:id' [token required]
- Show: [GET]  'http://localhost:3000/orders/:id' [token required]
- Update: [PUT]  'http://localhost:3000/orders' [token required]
- Delete: [DELETE]  'http://localhost:3000/orders/:id' [token required]
- Add Order Product: [GET]  'http://localhost:3000/orders/:id/products' [token required]

## Data Shapes
#### Product Table
- id
- name
- price
```
Table: Product
id SERIAL PRIMARY KEY
name VARCHAR(64) NOT NULL
price INTEGER NOT NULL
```

#### User Table
- id
- username
- firstName
- lastName
- password
```
Table: User
id SERIAL PRIMARY KEY
username VARCHAR(100)
password VARCHAR
firstName VARCHAR(100)
lastName VARCHAR(100)
```

#### Orders table
- id
- user_id
- status
```
Table: Order
id SERIAL PRIMARY KEY
user_id BIGINT REFERENCES users(id)
status VARCHAR(15)
```

#### Order Products Table
- id
- quantity
- order_id
- product_id
```
Table: Order Products
id SERIAL PRIMARY KEY
quantity INTEGER
order_id BIGINT REFERENCES orders(id)
product_id BIGINT REFERENCES products(id)
```



