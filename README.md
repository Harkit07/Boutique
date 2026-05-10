# 🛍️ Boutique — Full Stack E-Commerce Platform

A production-ready full-stack e-commerce web application built with the MERN stack. Features secure authentication, product management, shopping cart, customer reviews, cloud image storage, and a fully responsive UI — deployed independently on Render.

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
- 🚀 **Independent Deployment** — Frontend and backend deployed separately on Render

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
│   │   ├── auth.js          # Signup, login, password reset
│   │   ├── products.js      # Product CRUD
│   │   ├── cart.js          # Cart operations
│   │   ├── reviews.js       # Review create & delete
│   │   └── user.js          # Profile management
│   │
│   ├── models/
│   │   ├── user.js          # User schema (hashed password, profile)
│   │   ├── product.js       # Product schema (images, category, price)
│   │   ├── cart.js          # Cart schema (items, quantities)
│   │   └── review.js        # Review schema (rating, comment, author)
│   │
│   ├── routes/
│   │   ├── auth.js          # /api/auth routes
│   │   ├── products.js      # /api/products routes
│   │   ├── cart.js          # /api/cart routes
│   │   ├── reviews.js       # /api/reviews routes
│   │   └── user.js          # /api/user routes
│   │
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   │
│   ├── config/
│   │   └── cloudinary.js    # Cloudinary & Multer config
│   │
│   └── app.js               # Express app entry point
│
└── Frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Route-level page components
    │   ├── context/         # React Context for auth & cart state
    │   ├── api/             # Axios instance & API helpers
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
node app.js
```

Backend will be available at `http://localhost:5000`.

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
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Server
PORT=5000
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Routes

### Auth — `/api/auth`

| Method | Route                             | Auth | Description               |
| ------ | --------------------------------- | ---- | ------------------------- |
| `POST` | `/api/auth/signup`                | ❌   | Register a new user       |
| `POST` | `/api/auth/login`                 | ❌   | Login and receive JWT     |
| `POST` | `/api/auth/forgot-password`       | ❌   | Send password reset email |
| `POST` | `/api/auth/reset-password/:token` | ❌   | Reset password with token |

### User — `/api/user`

| Method | Route               | Auth | Description              |
| ------ | ------------------- | ---- | ------------------------ |
| `GET`  | `/api/user/profile` | ✅   | Get current user profile |
| `PUT`  | `/api/user/profile` | ✅   | Update profile details   |

### Products — `/api/products`

| Method   | Route               | Auth | Description          |
| -------- | ------------------- | ---- | -------------------- |
| `GET`    | `/api/products`     | ❌   | Get all products     |
| `GET`    | `/api/products/:id` | ❌   | Get a single product |
| `POST`   | `/api/products`     | ✅   | Create a new product |
| `PUT`    | `/api/products/:id` | ✅   | Update a product     |
| `DELETE` | `/api/products/:id` | ✅   | Delete a product     |

### Cart — `/api/cart`

| Method   | Route               | Auth | Description             |
| -------- | ------------------- | ---- | ----------------------- |
| `GET`    | `/api/cart`         | ✅   | Get current user's cart |
| `POST`   | `/api/cart`         | ✅   | Add item to cart        |
| `PUT`    | `/api/cart/:itemId` | ✅   | Update item quantity    |
| `DELETE` | `/api/cart/:itemId` | ✅   | Remove item from cart   |

### Reviews — `/api/reviews`

| Method   | Route                     | Auth      | Description     |
| -------- | ------------------------- | --------- | --------------- |
| `POST`   | `/api/reviews/:productId` | ✅        | Post a review   |
| `DELETE` | `/api/reviews/:reviewId`  | ✅ Author | Delete a review |

---

## 🚢 Deployment

Frontend and backend are deployed independently on **Render**.

**Backend (Web Service)**

- Build command: `npm install`
- Start command: `node app.js`
- Add all backend environment variables in Render dashboard

**Frontend (Static Site)**

- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_API_URL` to your deployed backend URL

---

## 👨‍💻 Author

**Harkit Singh**

- 📧 harkitsinghsran9584@gmail.com
- 📞 +91-8890436710
- 🌐 [Portfolio](https://portfolio-8zov.onrender.com)
- 🐙 [github.com/Harkit07](https://github.com/Harkit07)

---

## 📝 License

This project is open source and free to use.
