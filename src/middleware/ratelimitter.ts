import rateLimit from "express-rate-limit";

// per-minute limiter
export const perMinuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: "Too many requests. Try again in a minute.",
  keyGenerator: (req) => {
    return req.body.phoneNo;
  },
});
