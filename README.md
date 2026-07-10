# 📦Fabricue - Clothing E-Commerce MERN Stack Application

# Fabricue 👕

Fabricue is a production-ready MERN Stack clothing e-commerce platform that delivers a fast, secure, and intelligent online shopping experience.
Customers can browse products by category, receive AI-powered product recommendations, manage favorites and carts, complete secure Stripe payments, and 
track their orders, while sellers can efficiently manage products and analytics through a dedicated dashboard. 
Built with scalability, performance, security, and maintainability in mind.

The application follows modern software engineering best practices and supports 100+ concurrent users.


## 📖 About

Fabricue is a production-ready full-stack clothing e-commerce platform developed using the MERN Stack with TypeScript. 
The application follows the MVC architecture and RESTful API design principles to deliver a scalable, maintainable, and secure solution for both customers and sellers.
Customers can browse products by category, receive AI-powered product recommendations based on natural language prompts, manage favorites and shopping carts, 
complete secure payments through Stripe, and update their profiles.

Sellers are provided with a dedicated dashboard to manage products, monitor business analytics through interactive charts, and efficiently oversee platform operations.

The application prioritizes performance through TanStack Query, lazy loading, caching, image optimization with Cloudinary, pagination, debouncing, throttling, API optimization, 
database indexing, and techniques that minimize unnecessary React re-renders.

It also follows accessibility guidelines (WCAG). 

Implements comprehensive security measures, including role-based authentication and authorization, Helmet for protected headers, Content Security Policy (CSP), rate limiting, HTTPS, secure cookies, 
environment variable management, input validation and sanitization, centralized error handling, and protection against unauthorized access.

Fabricue is deployed with Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database) and has been load-tested(k6) to reliably handle more than 100 concurrent users.


## 🚀 Live Demo

Frontend:
[https://your-frontend-url.com](https://fabricue.vercel.app/)

Backend for API's:
[https://your-api-url.com](https://fabricue.onrender.com)


## 📸 Screenshots




## ✨ Features

- JWT Authentication
- Role-Based Authorization
- Email-based Otp verification
- Product Search
- Category Filtering
- AI Product Recommendations
- Wishlist
- Shopping Cart
- Stripe Payment Integration
- Order Management
- Seller Dashboard
- Profile Management
- Contact Info
- Pagination
- Responsive Design
- Lazy Loading
- Image Optimization
- Accessibility (WCAG)
- Secure REST APIs
- MVC Architecture
- Proper Schema Design


## 🛠️ Tech Stack

### Frontend
- Vite + React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Router
- Axios
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- validators.js
- express-rate-limiter
- helmet

### Payment
- Stripe

### Deployment
- Vercel
- Render
- Mongodb atlas

### Tools
- Git
- GitHub
- Postman
- VS Code
- K6


## 📂 Folder Structure

```text
fabricue/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```


## 🏗️ Architecture

```text
            Client(React)
                 │
           Server(Express)
                 │
      Middlewares(auth,rate limiters)
                 │
             Controllers
                 │
              Caching
                 │
              MongoDB
```


## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/username/fabricue.git
```

Navigate to the project

```bash
cd fabricue
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Start backend

```bash
npm run dev
```


## 📡 API Design

### Authentication

```http
POST /user/register
POST /user/login
POST /user/logout
POST /user/send-otp
POST /user/verify-otp
POST /user/change-password
POST /user/contact
```

### Products

```http
GET /product?category=all
GET /product/:id
GET /admin/products/allProducts
POST /product/searching
POST /product/search
POST /product/sort?category=men&minVal=199&maxVal=5000
POST /admin/products/createProduct
PATCH /admin/products/updateProduct/:id
DELETE /admin/products/deleteProduct/:id
```


### Cart and Wishlist

```http
GET /cart
GET /favorite
POST /cart/:type/:id
POST /favorite/:type/:id
POST /cart/quantity
DELETE /cart/remove/:id
```

### Payment

```http
POST /payment
POST /stripe-webhook
```

### Orders

```http
GET /orders
```

### Profile Management

```http
GET /profile
PATCH /profile/edit
PATCH /profile/address-edit
POST /profile/address-add
DELETE /profile/address-delete/:id
```

### Seller Dashboard

```http
GET /seller/overview
GET /seller/orders
```



## 📊 Performance

- Lighthouse Performance: 96
- Accessibility: 100
- SEO: 100
- Best Practices: 100

### Optimizations

- React compiler
- Bundle Optimization(vite)
- Lazy Loading
- Memoization
- React Query Caching
- Image Compression
- API Response Caching
- Paginations
- Debouncing and throttling techniques
- CDN(Cloudinary)
- Shimmer ui
- React.memo & useMemo & useCallback
- DB optimization (Schema design, indexing...etc)
- Lightweighted Styling Frameworks


## 🔒 Security

- JSX
- JWT Authentication
- Password Hashing (bcrypt)
- Helmet
- CORS Protection
- Rate Limiting
- Input Validation and Sanitizations
- Secure HTTP Headers with HTTPS
- Preventing unauthorized access
- Dotenv
- Cookies
- Proper Error Handlings
- CSP
- Updating Dependencies everytime


## 🧪 Testing

- Manual testing
- API tested using Postman
- Load tested using k6
- Lighthouse Audit


## 👨‍💻 Author

Cherupalli Ganesh

GitHub:
[https://github.com/yourusername](https://github.com/Ganeshdvp/Ganeshdvp.git)

LinkedIn:
[https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/cherupalli-ganesh)



## Thank you:)
