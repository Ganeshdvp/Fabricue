import { rateLimit } from 'express-rate-limit';


const baseConfig = {
  standardHeaders: true, // send rate limit info in headers
  legacyHeaders: false,  // disable old headers
};

export const authLimit = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 10 minutes
    max: 10, // only 10 attempts
    message: {
        success: false,
    message: "Too many login attempts. Try again later"
    }
})

export const productLimit = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 200, // only 200 requests
    message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
})

export const adminLimit = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 200, // only 200 requests
    message: "Too many requests. Try again later."
})

export const cartLimit = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100, // only 100 requests
    message: {
    success: false,
    message: "Too many cart actions. Slow down."
  }
})

export const favoriteLimit = rateLimit({
  ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 200, // only 200 requests
    message: {
    success: false,
    message: "Too many favorite actions. Slow down."
  }
})

export const paymentLimit = rateLimit({
  ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 50, // only 50 requests
    message: {
    success: false,
    message: "Too many payment attempts. Please try again later."
  }
})

export const orderLimit = rateLimit({
  ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 200, // only 200 requests
    message: {
    success: false,
    message: "Too many order attempts. Please try again later."
  }
})

export const profileLimit = rateLimit({
  ...baseConfig,
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100, // only 100 requests
    message: {
    success: false,
    message: "Too many profile attempts. Please try again later."
  }
})