# LumiPure Frontend

Next.js storefront and admin panel for LumiPure, a beauty e-commerce platform. It runs against the [LumiPure backend](https://github.com/muhammadrakib2299/LumiPure-backend) REST API.

**Live demo:** https://lumi-pure-frontend.vercel.app

## Features

- Shop page with category, search and price filters and sort options, all kept in the URL query string; product detail pages with an image gallery
- Customer accounts: register and log in with JWT auth, edit your profile, view your orders
- Cart stored on the server through the API; checkout with a validated shipping form, card or cash-on-delivery choice, and an order confirmation page
- Wishlist saved in the browser, managed with Zustand
- Home page with a hero slider (image or video slides managed from the admin panel), featured products, shop-by-category and testimonials
- Admin panel (`/admin`) that creates, edits and deletes products and hero slides through the API. The dashboard, orders, customers, categories and settings screens show sample data for now, and a demo mode opens the whole panel without a database.

## Built with

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Zustand, Axios, React Hook Form + Zod, react-hot-toast, Lucide icons.

## Run locally

Start the [backend](https://github.com/muhammadrakib2299/LumiPure-backend) first. Then create `.env.local` if the API is not at the default address:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api   # default when unset
```

```bash
npm install
npm run dev
```

Open http://localhost:3000. The admin login is at `/admin/login`. The backend's `npm run seed:admin` script creates an admin account.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Related

- Backend API: https://github.com/muhammadrakib2299/LumiPure-backend
