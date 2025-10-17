import express from "express";
import {
  generateOtp,
  verifyOTP,
  logout,
  currentOtps,
  checkAuth,
  deleteAccount,
} from "../../controllers/auth.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { perMinuteLimiter } from "../../middleware/ratelimitter.js";

const router = express.Router();

router.post("/auth/generate-otp", perMinuteLimiter, generateOtp);
router.get("/auth/all-otp", perMinuteLimiter, currentOtps);
router.post("/auth/verify-otp", perMinuteLimiter, verifyOTP);
router.post("/auth/logout", logout);
router.delete("/auth/delete-account", protectRoute, deleteAccount);

router.get("/auth/check-auth", protectRoute, checkAuth);

export default router;
