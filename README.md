# 🛍️ Boutique — Full Stack E-Commerce Platform

A production-ready full-stack e-commerce web application built with the MERN stack. Features secure authentication, product management, shopping cart, customer reviews, cloud image storage, and a fully responsive UI — frontend deployed on Render, backend deployed on Vercel.

🔗 **Live Demo:** [boutiquefrontend-ymww.onrender.com](https://boutiquefrontend-ymww.onrender.com/) · **GitHub:** [github.com/Harkit07/Boutique](https://github.com/Harkit07/Boutique.git)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Deployment](#deployment)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure signup, login, and session handling with JSON Web Tokens
- 🔑 **Password Reset Flow** — Email-based password reset for reliable account recovery
- 👤 **Profile Management** — Users can update their profile details and avatar
- 🛒 **Shopping Cart** — Dynamic cart with real-time state updates and quantity management
- 📦 **Product Management** — Full CRUD for products with multi-image upload support
- ⭐ **Customer Reviews** — Authenticated users can post and manage reviews on products
- 🖼️ **Cloud Image Storage** — Product images stored and served via Cloudinary
- 📱 **Fully Responsive UI** — Optimized for mobile, tablet, and desktop devices
- 🛡️ **Protected API Routes** — Backend routes secured with JWT middleware
- 🚀 **Independent Deployment** — Frontend deployed on Render, backend deployed on Vercel (serverless)

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| React.js          | UI framework                |
| Material UI       | Component library & styling |
| Tailwind CSS      | Utility-first CSS           |
| Formik            | Form handling & validation  |
| React Context API | Global state management     |
| Axios             | HTTP client for API calls   |

### Backend

| Technology             | Purpose                          |
| ---------------------- | -------------------------------- |
| Node.js + Express.js   | Web server & REST API            |
| MongoDB + Mongoose ODM | Database & schema modeling       |
| JWT (jsonwebtoken)     | Authentication & authorization   |
| Bcrypt                 | Password hashing                 |
| Cloudinary + Multer    | Image upload & cloud storage     |
| Nodemailer             | Email service for password reset |

---

## 📁 Project Structure

```
Boutique/
├── Backend/
│   ├── controllers/
│   │   ├── suit.js          # suit operations
│   │   ├── reviews.js       # Review create & delete
│   │   └── user.js          # Profile management
│   │
│   ├── models/
│   │   ├── user.js          # User schema (hashed password, profile)
│   │   ├── blacklistToken.js       # Blacklist Token
│   │   ├── suit.js          # Suit schema (items, quantities)
│   │   └── review.js        # Review schema (rating, comment, author)
│   │
│   ├── routes/
│   │   ├── suit.js          # /api/suit routes
│   │   ├── reviews.js       # /api/reviews routes
│   │   └── user.js          # /api/user routes
│   │
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   │
│   ├── services/
│   │   ├── cloudConfig.js            # Cloudinary & Multer config
│   │   ├── user.js                   # Create User
│   │   ├── validationResult.js       # Express validation
│   │   └── cloudinary.js             # Cloudinary & Multer config
│   │
│   ├── middleware.js          # Auth routing config
│   │
│   ├── vercel.json          # Vercel routing config
│   │
│   └── server.js               # Express app
│
└── Frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Route-level page components
    │   ├── context/         # React Context for auth & cart state
    │   ├── styles/          # React Css Styling
    │   └── main.jsx         # React DOM entry point
    │
    └── index.html
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A **MongoDB** database ([MongoDB Atlas](https://www.mongodb.com/atlas) recommended)
- A **Cloudinary** account for image uploads
- An email account / SMTP service for password reset emails

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create your environment file
touch .env
# Fill in the required variables (see Environment Variables below)

# 4. Start the backend server
node server.js
```

Backend will be available at `http://localhost:4000`.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
touch .env
# Set VITE_API_URL to your backend URL

# 4. Start the development server
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend `.env`

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/boutique

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Server
PORT=4000
```

### Frontend `.env`

```env
VITE_API_URL=https://your-vercel-project.vercel.app/api
```

---

## 📡 API Routes

## Auth — `/auth`

> Session and credential operations. No authentication required unless noted.

| Method | Route                   | Auth | Description               |
| ------ | ----------------------- | ---- | ------------------------- |
| `POST` | `/auth/signup`          | ❌   | Register a new user       |
| `POST` | `/auth/login`           | ❌   | Login and receive JWT     |
| `POST` | `/auth/logout`          | ✅   | Logout current user       |
| `POST` | `/auth/forgot-password` | ❌   | Send password reset email |
| `POST` | `/auth/reset-password`  | ❌   | Reset password with token |

---

## Users — `/users`

> Authenticated user profile management.

| Method  | Route       | Auth | Description              |
| ------- | ----------- | ---- | ------------------------ |
| `GET`   | `/users/me` | ✅   | Get current user profile |
| `PATCH` | `/users/me` | ✅   | Update profile details   |

---

## Suits — `/suits`

> Product (suit) listing and management.

| Method   | Route                     | Auth | Description          |
| -------- | ------------------------- | ---- | -------------------- |
| `GET`    | `/suits`                  | ❌   | Get all suits        |
| `POST`   | `/suits`                  | ✅   | Upload a new suit    |
| `GET`    | `/suits/:id`              | ❌   | Get a single suit    |
| `DELETE` | `/suits/:id`              | ✅   | Delete a suit        |
| `GET`    | `/suits/featured-reviews` | ❌   | Get homepage reviews |

---

## Reviews — `/suits/:id/reviews`

> Reviews scoped to a specific suit.

| Method   | Route                          | Auth | Description     |
| -------- | ------------------------------ | ---- | --------------- |
| `POST`   | `/suits/:id/reviews`           | ✅   | Post a review   |
| `DELETE` | `/suits/:id/reviews/:reviewId` | ✅   | Delete a review |

---

## Cart — `/cart`

> Cart belongs to the authenticated user, not a product.

| Method   | Route                           | Auth | Description                    |
| -------- | ------------------------------- | ---- | ------------------------------ |
| `GET`    | `/cart`                         | ✅   | Get current user's cart        |
| `POST`   | `/cart/items/:suitId`           | ✅   | Add/Update item to cart        |
| `DELETE` | `/cart/items/:suitId`           | ✅   | Remove item from cart entirely |
| `POST`   | `/cart/items/:suitId/decrement` | ✅   | Decrease item quantity by 1    |

---

## 🚢 Deployment

Frontend and backend are deployed independently — frontend on **Render**, backend on **Vercel**.

**Backend (Vercel — Serverless)**

Vercel runs Express as a serverless function. Three small additions are needed:

1. **`server.js`** — Create this file inside `Backend/`:

```js
const app = require("../app");
module.exports = app;
```

2. **`server.js`** — Export the app and guard the `listen` call:

```js
if (require.main === module) {
  app.listen(process.env.PORT || 4000);
}
module.exports = app;
```

3. **`vercel.json`** — Place in `Backend/` root:

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

- Add all backend environment variables in **Vercel Dashboard → Project Settings → Environment Variables**
- Deploy by connecting your GitHub repo to Vercel and setting the **Root Directory** to `Backend/`

**Frontend (Render — Static Site)**

- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_API_URL` to your deployed Vercel backend URL:

```env
VITE_API_URL=https://your-vercel-project.vercel.app/api
```

---

## 👨‍💻 Author

**Harkit Singh**

- 📧 harkitsinghsran9584@gmail.com
- 📞 +91-8890436710
- 🌐 [Portfolio](https://portfolio-8zov.onrender.com)
- 🐙 [github.com/Harkit07](https://github.com/Harkit07)
- 🔗 [Live Demo](https://boutiquefrontend-ymww.onrender.com)

---

## 📝 License

This project is open source and free to use.
