# What's Fare is Fair — MERN Stack Restaurant App

A full-stack web application built with **MongoDB, Express, React, and Node.js**.

---

## Project Structure

```
restaurant-app/
├── backend/           # Express + MongoDB server
│   ├── models/        # Mongoose models
│   ├── routes/        # REST API routes
│   ├── server.js      # Entry point
│   └── .env           # Environment variables
└── frontend/          # React application
    ├── public/
    └── src/
        ├── components/  # Navbar, Footer
        └── pages/       # Home, Menu, Consumers, Dashboard
```

---

## Prerequisites

- Node.js (v16+)
- MongoDB (running locally on port 27017)
- npm

---

## 🚀 Setup & Run (Easy Way — use the script)

### Step 1 — Make sure MongoDB is running

Open **MongoDB Compass** or run in a terminal:
```
mongod
```

### Step 2 — Install & Start Backend

Open a terminal in the `restaurant-app/backend` folder:
```bash
npm install
npm start
```
Backend runs at: http://localhost:5000

### Step 3 — Install & Start Frontend

Open a **new terminal** in the `restaurant-app/frontend` folder:
```bash
npm install
npm start
```
Frontend runs at: http://localhost:3000

---

## API Endpoints

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | /api/menu         | Fetch all menu items |
| POST   | /api/menu         | Add a new menu item  |
| POST   | /api/menu/seed    | Seed default items   |
| GET    | /api/consumers    | Fetch all consumers  |
| POST   | /api/consumers    | Register a consumer  |

### Price Filter (GET /api/menu)
- `?maxPrice=100` → items below ₹100
- `?minPrice=100&maxPrice=500` → items ₹100–₹500

---

## Pages

| Route        | Page                    |
|--------------|-------------------------|
| /            | Home (landing page)     |
| /menu        | Menu with price filters |
| /consumers   | Consumer registration   |
| /dashboard   | Admin dashboard         |

---

## Course Outcomes Covered

- **CO1** — Node.js, MongoDB, full-stack dev environment setup
- **CO2** — RESTful APIs with Express and Mongoose
- **CO3** — React frontend with API integration
- **CO5** — Data validation, SEO page titles, clean URLs
- **CO6** — Data aggregation with price filters, Order Now feature
