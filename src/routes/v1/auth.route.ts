import express from "express";
import {
  generateOtp,
  verifyOTP,
  logout,
  currentOtps,
  checkAuth,
} from "../../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/generate-otp", generateOtp);
router.get("/auth/all-otp", currentOtps);
router.post("/auth/verify-otp", verifyOTP);
router.get("/check", checkAuth);
router.post("/auth/logout", logout);

export default router;
