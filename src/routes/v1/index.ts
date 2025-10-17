import express from "express";
import authRoutes from "./auth.route.js";
import adminRoutes from "./admin.route.js";
import productRoutes from "./product.route.js";

const router = express.Router();

router.use(authRoutes);
router.use(adminRoutes);
router.use(productRoutes);

export default router;
