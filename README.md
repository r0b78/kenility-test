# NestJS Prisma GraphQL API

## Features

### Products

- POST /products → Create a new product.
- GET /products/:id → retrieve a specific product by ID.

### Orders

- POST /orders → Create a new order.
- PATCH /orders/:id → Update an existing order.
- GET /orders/stats/price/total?days=30 → Get the total sold price in the last month.
- GET /orders/stats/price?order='desc'&limit=1 → Get the order with the highest price.

# Notes

For production environment you want to create a new user attached to the DB that will the API use with minimal permissions for security reasons

## Requirements

- Node 18
- Docker & Docker Compose

## Quick Start

1. Run: `npm i`

### Running App & DB

1. Copy `.env.docker` → `.env`
2. Run: `docker-compose up -d --build`
3. Open on http://localhost:3000/

### Running App Local & DB

1. Copy `.env.local` → `.env`
2. Run: `docker-compose up -d --build mongo`
3. Run `npm start:dev`
4. Open on http://localhost:3000/
