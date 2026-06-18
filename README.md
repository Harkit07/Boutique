# 🛍️ Ravneet Boutique — Full Stack E-Commerce Platform

A production-ready full-stack e-commerce web application built with the MERN stack. Features secure authentication, product management, shopping cart, customer reviews, cloud image/video storage, **auto‑generated skeleton screens (boneyard‑js)**, and a fully responsive mobile-first UI — frontend deployed on Render, backend deployed on Vercel.

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

- 🔐 **JWT Authentication** — Secure signup/login with token blacklisting on logout
- 🔑 **Password Reset Flow** — Email-based OTP with 5‑minute expiry for reliable account recovery
- 👤 **Profile Management** — Update name, address, city, and phone number
- 🛒 **Shopping Cart** — Add/remove items, quantity controls, persisted in database
- 📦 **Product Management** — Full CRUD for suits with multiple image/video uploads via Cloudinary
- ⭐ **Customer Reviews** — Star rating + text; users can delete their own, admins can delete any
- 🖼️ **Cloud Storage** — Images and videos stored and optimised via Cloudinary
- 📱 **Fully Responsive UI** — Mobile‑first design with grids that adapt from 1 to 5 columns
- ⚡ **Performance Optimisations** — React.lazy code splitting, React.memo, useCallback/useMemo, context splitting (Auth, UI, Suits, Filter)
- 🛡️ **Protected API Routes** — JWT middleware with role‑based access (admin/user)
- 🔁 **Server‑Side Enhancements** — Rate limiting, Helmet security headers, Gzip compression, Morgan logging, file type validation (images/videos, max 50 MB)
- 🦴 **Auto‑Generated Skeleton Screens** — Pixel‑perfect loading states using [boneyard‑js](https://github.com/0xGF/boneyard), extracted from real UI components – zero layout shift, fully responsive.

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| React 18          | UI framework                      |
| Vite              | Build tool & dev server           |
| React Router v6   | Client‑side routing               |
| Material‑UI (MUI) | Icons (DeleteIcon, etc.)          |
| Axios             | HTTP client with abort controller |
| React Query       | Server state (suits, reviews)     |
| Formik            | Form handling & validation        |
| React Context API | Global state (auth, UI, filters)  |
| React Toastify    | Notifications                     |
| **boneyard-js**   | **Automatic skeleton generation** |
| Custom CSS        | Mobile‑first responsive styling   |

### Backend

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| Node.js + Express 5 | REST API server                         |
| MongoDB + Mongoose  | Database & schema modeling              |
| JWT (jsonwebtoken)  | Authentication & authorization          |
| Bcrypt              | Password hashing                        |
| Cloudinary + Multer | Image/video upload, storage & filtering |
| Nodemailer          | Send OTP emails for password reset      |
| Express Rate Limit  | Brute‑force protection (5 req/15 min)   |
| Helmet              | Security headers (XSS, etc.)            |
| Compression         | Gzip response compression               |
| Morgan              | HTTP request logging (combined format)  |

---

## 📁 Project Structure

```
Boutique/
├── Backend/
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── review.js
│   │   ├── suit.js
│   │   └── user.js
│   ├── middleware.js          # JWT auth + token blacklist check
│   ├── models/
│   │   ├── blacklistToken.js
│   │   ├── review.js
│   │   ├── suit.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── review.js
│   │   ├── suit.js
│   │   └── user.js
│   ├── services/
│   │   ├── cloudConfig.js     # Cloudinary + Multer (fileFilter & size limit)
│   │   ├── user.js
│   │   ├── validationResult.js
│   │   └── wrapAsync.js
│   ├── .env
│   ├── server.js              # Entry point (compression, helmet, morgan, rate limiting)
│   └── vercel.json            # Vercel serverless config
│
└── Frontend/
    ├── public/                # Static images & videos (logo, dummy images, category thumbnails)
    └── src/
        ├── bones/             # 🦴 Auto‑generated skeleton data (boneyard‑js)
        │   ├── registry.js    # Registry imported once in main.jsx
        │   └── *.bones.json   # Per‑component skeleton definitions
        ├── components/
        │   ├── AccountForm.jsx
        │   ├── BottomNav.jsx
        │   ├── CategoriesDrawer.jsx
        │   ├── FilterCom.jsx
        │   ├── Footer.jsx
        │   ├── HeaderCom.jsx
        │   ├── HomeCom.jsx
        │   ├── HomeReview.jsx
        │   ├── ImageCom.jsx
        │   ├── LoginCom.jsx
        │   ├── MenuCom.jsx
        │   ├── ReviewForm.jsx
        │   ├── ScrollToTop.jsx
        │   ├── SuitImgCom.jsx     # Image/video slider with pinch/zoom
        │   ├── UserProtectedWrapper.jsx
        │   └── VideosCom.jsx
        ├── context/
        │   ├── AuthContext.jsx    # token, user, loading
        │   ├── FilterContext.jsx  # category, price, sort
        │   ├── MyContext.jsx      # barrel export
        │   ├── SuitsContext.jsx   # all suits data (react-query)
        │   └── UiContext.jsx      # activeTab for bottom nav
        ├── pages/                 # lazy‑loaded route components
        │   ├── About.jsx
        │   ├── Account.jsx
        │   ├── AddNewSuit.jsx
        │   ├── Cart.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Logout.jsx
        │   ├── Policy.jsx
        │   ├── ResetPass.jsx
        │   ├── ReturnPolicy.jsx
        │   ├── Shop.jsx
        │   ├── Signup.jsx
        │   ├── SuitView.jsx
        │   └── TermConditions.jsx
        ├── styles/                # component‑specific CSS (responsive)
        ├── utils/
        │   └── boneyard.js        # Helper to detect snapshot mode
        ├── App.jsx                # routes with Suspense + lazy
        ├── index.css              # global reset & responsive helpers
        └── main.jsx                # providers (QueryClient, Auth, Ui, Suits, Filter) + registry import
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A **MongoDB** database ([MongoDB Atlas](https://www.mongodb.com/atlas) recommended)
- A **Cloudinary** account for image/video uploads
- A **Gmail** account with App Password for OTP emails

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Fill in the required variables (see Environment Variables below)

# 4. Start the backend server
node server.js
```

Backend will be available at `http://localhost:4000`.

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Set VITE_BASE_URL to your backend URL

# 4. Start the development server
npm run dev
```

Frontend will be available at `http://localhost:5173`.

#### 💡 Generating Skeleton Data (boneyard-js)

After you make changes to the UI layout, you should regenerate the skeleton data:

```bash
# Make sure your dev server is running (npm run dev)
# Then, in another terminal:
npx boneyard-js build
```

This captures the latest component layouts and writes updated bones to `src/bones/`.
The registry is already imported in `main.jsx`, so no further action is needed.

---

## 🔐 Environment Variables

### Backend `.env`

```env
# Server
PORT=4000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/boutique

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL for CORS
CLIENT_URL=http://localhost:5173   # or production URL
```

### Frontend `.env`

```env
VITE_BASE_URL=http://localhost:4000
# For production:
# VITE_BASE_URL=https://your-backend.vercel.app/api
```

---

## 📡 API Routes

### Auth — `/auth`

Session and credential operations. No authentication required unless noted.

| Method | Route                   | Auth | Description                     |
| ------ | ----------------------- | ---- | ------------------------------- |
| POST   | `/auth/signup`          | ❌   | Register a new user             |
| POST   | `/auth/login`           | ❌   | Login and receive JWT           |
| POST   | `/auth/logout`          | ❌   | Logout (blacklist token)        |
| POST   | `/auth/forgot-password` | ❌   | Send 6‑digit OTP to email       |
| POST   | `/auth/reset-password`  | ❌   | Verify OTP and set new password |

### Users — `/users`

Authenticated user profile management.

| Method | Route       | Auth | Description                          |
| ------ | ----------- | ---- | ------------------------------------ |
| GET    | `/users/me` | ✅   | Get profile + populated cart items   |
| PATCH  | `/users/me` | ✅   | Update profile (name, address, etc.) |

### Suits — `/suits`

Product (suit) listing and management.

| Method | Route                     | Auth | Description                                                  |
| ------ | ------------------------- | ---- | ------------------------------------------------------------ |
| GET    | `/suits`                  | ❌   | Get all suits                                                |
| GET    | `/suits/:id`              | ❌   | Get single suit + populated reviews                          |
| DELETE | `/suits/:id`              | ✅   | Delete a suit (admin only)                                   |
| GET    | `/suits/featured-reviews` | ❌   | Get random reviews for homepage                              |
| GET    | `/suits/upload`           | ✅   | Get a signed upload signature for direct Cloudinary upload   |
| POST   | `/suits/upload`           | ✅   | Create a new suit using already‑uploaded Cloudinary metadata |

> **Note:** The `POST /suits/upload` expects a JSON body with `name`, `category`, `description`, `price`, and an array `file` containing `{ url, public_id, mediaType }` from the direct upload.

#### Direct Upload Flow

1. Admin calls `GET /suits/upload` (with JWT) to obtain a one‑time signature.
2. Frontend uploads files directly to Cloudinary using that signature.
3. After successful upload, frontend sends the returned Cloudinary URLs to `POST /suits/upload` to create the suit.

### Reviews — `/suits/:id/reviews`

Reviews scoped to a specific suit.

| Method | Route                          | Auth | Description               |
| ------ | ------------------------------ | ---- | ------------------------- |
| POST   | `/suits/:id/reviews`           | ✅   | Add a review to a suit    |
| DELETE | `/suits/:id/reviews/:reviewId` | ✅   | Delete a review by its ID |

### Cart — `/cart`

Cart belongs to the authenticated user, not a product.

| Method | Route                           | Auth | Description                   |
| ------ | ------------------------------- | ---- | ----------------------------- |
| GET    | `/cart`                         | ✅   | Get current user's cart       |
| POST   | `/cart/items/:suitId`           | ✅   | Add item or increase quantity |
| DELETE | `/cart/items/:suitId`           | ✅   | Remove item entirely          |
| POST   | `/cart/items/:suitId/decrement` | ✅   | Decrease quantity by 1        |

---

## 🚢 Deployment

Frontend and backend are deployed independently — frontend on Render, backend on Vercel.

### Backend (Vercel — Serverless)

Vercel runs Express as a serverless function. Ensure `vercel.json` exists in `Backend/`:

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

- Add all backend environment variables in **Vercel Dashboard → Project Settings → Environment Variables**
- Deploy by connecting your GitHub repo to Vercel and setting the **Root Directory** to `Backend/`

### Frontend (Render — Static Site)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Set `VITE_BASE_URL` to your deployed Vercel backend URL:

```env
VITE_BASE_URL=https://your-backend.vercel.app/api
```

---

## 👨‍💻 Author

**Harkit Singh**

- 📧 harkitsinghsran9584@gmail.com
- 📞 +91-8890436710
- 🌐 [Portfolio](#)
- 🐙 [github.com/Harkit07](https://github.com/Harkit07)
- 🔗 [Live Demo](https://boutiquefrontend-ymww.onrender.com/)

---

## 📝 License

This project is open source and free to use.
