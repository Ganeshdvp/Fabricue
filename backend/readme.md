# Fabricue Full Stack E-commerce Application

# API Design

-- Role-Based Authentication --
- POST user/register
- POST user/login
- POST user/logout
- POST user/send-otp
- POST user/verify-otp
- POST user/change-password
- POST user/contact

-- Products --
- GET product/
- GET product/:id
- GET product/category/:category
- POST product/sort

-- Admin CRUD Product --
- POST admin/products/createProduct
- PATCH admin/products/updateProduct/:id
- DELETE admin/products/deleteProduct/:id
- GET admin/products/allProducts

-- Stock Reduction --
- PATCH stock/reduce

-- Cart --
- GET cart/
- POST cart/add/:id
- DELETE cart/remove/:id

-- Favorite --
- GET favorite/
- POST favorite/:type/:id ---> (add and remove)

-- Search with Ai integrate --
- POST product/:search


# Installation Dependencies :-
- npm init
- npm i express nodemon dotenv mongoose validator bcrypto cookie-parser date-fns jsonwebtoken resend

# Sensitive Data
- created .env file to store sensitive data

# Configure Database
- Created config folder > db.js to configure database

# Run the server
- created server.js file
- connected to Db and run server

# Create Schema and model
- created models folder > User.js & Products.js & Carts.js

# Define Routes
- created authRouter.js
- created productRouter.js
- created crudProducts.js
- created stockDetection.js
- created cartRouter.js
- created favoriteRouter.js

# Create Controllers

-- Authentication --
- created register.js
- created login.js
- created logout.js
- created sendOtp.js
- created verifyOtp.js
- created changePassword.js

-- GET Product --
- created allProducts.js
- created productById.js
- created categoryProducts.js
- created sortByPrice.js

-- Admin Products --
- created createProduct.js
- created updateProduct.js
- created deleteProduct.js
- created sellerProducts.js

-- Stock Deduction --
- created stockDetection.js

-- Cart Items --
- created addCart.js
- created deleteItemCart.js
- created allCartItems.js

-- Favorite Items --
- created toggleFavoriteItems.js
- created getAllFavoriteItems.js

-- Search with ai integrate --
- created searchProduct.js

# Create middlewares
- created userAuth.js
- created roleAuth.js
- created rateLimiting.js

# Create utils
- created sendEmail.js 
- created validations.js
- created openAi.js

# Security
- used helmet for headers
   - npm i helmet
- used rateLimit based on IP and Database
   - npm i express-rate-limit