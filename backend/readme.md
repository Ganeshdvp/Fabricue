# Fabricue Full Stack E-commerce Application

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
- created models folder > User.js & Products.js

# Define Routes
- created authRouter.js
- created productRouter.js

# Create Controllers
- created register.js
- created login.js
- created logout.js
- created sendOtp.js
- created verifyOtp.js
- created changePassword.js

# Create middlewares
- created userAuth.js
- created roleAuth.js

# Create utils
- created sendEmail.js 
- created validations.js