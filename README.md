VEYRO

Technology, Curated Better.

VEYRO is an e-commerce frontend I built using React while learning and experimenting with how a real shopping website works.

Instead of keeping everything on one page, I wanted to build the complete flow — from finding a product to adding it to the cart, managing a wishlist and finally going through checkout.

What can you do on VEYRO?

Browse products fetched from the DummyJSON API

Search products by name, description and category

Browse products by category

Filter and sort products

View ratings and product details

Add/remove products from wishlist

Add products to the cart

Increase or decrease cart quantity

Remove products from the cart

See subtotal, shipping and discount calculations

Complete a frontend checkout flow

Choose between UPI, Card and Cash on Delivery

Get an order confirmation after checkout

Cart and wishlist data are saved in localStorage, so they don't disappear when the page is refreshed.

The website is also responsive and works across desktop, tablet and mobile screen sizes.

Pages

Home

Shop

Categories

Category Products

Product Details

Wishlist

Cart

Checkout

Order Success

About

Tech I used

React

JavaScript

Tailwind CSS

React Router

Axios

Lucide React

Vite

For product data, I used the DummyJSON Products API instead of creating a static product list.

How the cart and wishlist work

I used React Context for the cart and wishlist state. The data is also stored in localStorage, which keeps the cart and wishlist available after refreshing the browser.

Checkout

The checkout page currently has three payment options:

UPI

Card

Cash on Delivery

The UPI option shows a QR code, but this is only a frontend demonstration. It doesn't process or verify real payments.

If I turn this into a production application later, I would connect it to a real payment gateway and add backend-side payment verification.

Project structure
src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── App.jsx
├── index.css
└── main.jsx

Run locally

Clone the repository:

git clone https://github.com/ashwanirai-06/Veyro.git


Then:

cd Veyro
npm install
npm run dev


Vite will show the local development URL in the terminal.

Things I'd like to add

There are still a few things I'd like to improve:

Real payment gateway integration

User authentication

Backend for orders

Product reviews

Admin dashboard

Better product recommendations

Real product pricing

What I learned

While building VEYRO, I got more comfortable with React components, React Router, API integration and Context API.

I also learned how to persist data using localStorage and how different parts of an e-commerce site connect together — especially the product, wishlist, cart and checkout flow.

This project was mainly built as a learning project, but I wanted the final result to feel closer to an actual shopping website rather than just a basic React demo.

Author

Ashwani Rai

GitHub: https://github.com/ashwanirai-06