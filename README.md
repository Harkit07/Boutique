# 🧥 Boutique

A full-stack e-commerce web application for a clothing boutique, featuring a React frontend and Node.js/Express backend with MongoDB. Users can browse suits, manage a cart, write reviews, and admins can manage product listings with image/video uploads.

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
- [API Endpoints](#api-endpoints)
- [Pages & Components](#pages--components)
- [Contributing](#contributing)

---

## ✨ Features

- 🔐 **Authentication** — Signup, Login, Logout with JWT-based auth and HTTP-only cookies
- 🔑 **Forgot / Reset Password** — OTP-based password reset via email (Nodemailer)
- 🛍️ **Product Browsing** — Browse all suits with category filtering
- 🛒 **Shopping Cart** — Add, update, and manage cart items per user
- ⭐ **Reviews** — Authenticated users can post reviews; top-rated reviews appear on the homepage
- 🖼️ **Media Uploads** — Admins can upload product images and videos via Cloudinary
- 👤 **User Profile** — Update personal details (name, address, city, phone)
- 🛡️ **Role-Based Access** — Admin-only routes for adding and deleting products
- ♻️ **Keep-Alive Ping** — Auto self-ping in production to prevent Render free-tier sleep

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| MUI (Material UI) v7 | Component library |
| Axios | HTTP requests |
| Formik | Form management |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens | Authentication |
| bcrypt | Password hashing |
| Cloudinary + Multer | Media storage & upload |
| Nodemailer | OTP email delivery |
| express-validator | Input validation |
| cookie-parser | Cookie handling |

---

## 📁 Project Structure

```
Boutique/
├── Backend/
│   ├── controllers/
│   │   ├── user.js        # Auth, profile, password reset
│   │   ├── suit.js        # Product CRUD
│   │   └── review.js      # Review CRUD
│   ├── models/
│   │   ├── user.js        # User schema (cart, roles, OTP)
│   │   ├── suit.js        # Suit/product schema
│   │   ├── review.js      # Review schema
│   │   └── blacklistToken.js  # JWT blacklist for logout
│   ├── routes/
│   │   ├── user.js
│   │   ├── suit.js
│   │   └── review.js
│   ├── services/
│   │   └── user.js        # User creation service
│   ├── middleware.js       # JWT auth middleware
│   ├── server.js          # Entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── Pages/
    │   │   ├── Home.jsx
    │   │   ├── Shop.jsx
    │   │   ├── SuitView.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Account.jsx
    │   │   ├── AddNewSuit.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── ResetPass.jsx
    │   │   └── ...
    │   ├── components/    # Reusable UI components
    │   ├── context/       # React context (UserContext)
    │   └── App.jsx
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A **Cloudinary** account for media uploads
- A **Gmail** account (or SMTP credentials) for OTP emails

---

### Backend Setup

```bash
# 1. Navigate to backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Fill in your values (see Environment Variables section below)

# 4. Start the development server
node server.js
```

The backend will run on the port specified in your `.env` file.

---

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The frontend dev server will start at `http://localhost:5173`.

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/boutique

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for OTP password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS (your deployed frontend URL)
CLIENT_URL=https://your-frontend-url.com

# Keep-alive ping (your deployed backend URL on Render)
RENDER_URL=https://your-backend-url.onrender.com/health
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your account password.

---

## 📡 API Endpoints

### Users — `/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/users/signup` | ❌ | Register a new user |
| `POST` | `/users/login` | ❌ | Login and receive JWT |
| `GET` | `/users/logout` | ✅ | Logout and blacklist token |
| `GET` | `/users/profile` | ✅ | Get authenticated user's profile |
| `PUT` | `/users/update` | ✅ | Update profile details |
| `POST` | `/users/forgot-password` | ❌ | Request OTP via email |
| `POST` | `/users/reset-password` | ❌ | Reset password using OTP |
| `POST` | `/users/cart` | ✅ | Add item to cart |
| `DELETE` | `/users/cart/:suitId` | ✅ | Remove item from cart |

### Suits — `/suit`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/suit` | ❌ | Get all suits |
| `POST` | `/suit` | ✅ Admin | Upload a new suit with media |
| `GET` | `/suit/home-reviews` | ❌ | Get top-rated reviews for homepage |
| `GET` | `/suit/:id` | ❌ | Get a single suit (with reviews) |
| `DELETE` | `/suit/:id` | ✅ Admin | Delete a suit |

### Reviews — `/suit/:id`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/suit/:id/review` | ✅ | Add a review to a suit |
| `DELETE` | `/suit/:id/review/:reviewId` | ✅ | Delete a review |

---

## 📄 Pages & Components

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured suits & top reviews |
| Shop | `/shop` | Browse all suits with category filter |
| Suit View | `/suit/:id` | Product detail page with images, video & reviews |
| Cart | `/cart` | User's shopping cart |
| Account | `/account` | User profile management |
| Add New Suit | `/add-suit` | Admin-only product upload form |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| Reset Password | `/reset-password` | OTP-based password reset |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👨‍💻 Author

**Harkit Singh**

---

## 📝 License

This project is licensed under the **ISC License**.
