# ShopSphere — Interactive E-Commerce Website

A professional interactive e-commerce project for a college portfolio.

## Features
- Product search
- Category filtering
- Sorting
- Quick product view
- Persistent shopping cart using localStorage
- Quantity controls
- Demo login
- Checkout form
- Demo order API using Node.js + Express
- Responsive design
- Newsletter interaction
- Toast notifications

## Run it

1. Install Node.js.
2. Open this folder in VS Code.
3. Open the VS Code terminal.
4. Run:

```bash
npm install
npm start
```

5. Open:

http://localhost:3000

Do not double-click `index.html`; run the Node server instead.

## Project structure

- `server.js` — Express backend
- `public/index.html` — website
- `public/styles.css` — design
- `public/script.js` — interactions
- `package.json` — dependencies

## Portfolio upgrade ideas

For a true production e-commerce app, replace the in-memory demo data with MongoDB, add JWT authentication, an admin dashboard, real product images, and a real payment gateway such as Razorpay or Stripe.
