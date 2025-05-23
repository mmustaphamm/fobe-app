import rateLimit from 'express-rate-limit'

export const rateLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: 'Too many requests, please try again later.',
})
