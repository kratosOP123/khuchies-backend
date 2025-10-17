import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getAllUser,
} from "../../controllers/admin.controller.js";
import { adminProtectRoute } from "../../middleware/admin.middelware.js";

const router = express.Router();

router.get("/admin/all-users", adminProtectRoute, getAllUser);

router.get("/admin/all-products", adminProtectRoute, getAllProduct);

router.post("/admin/add-product", adminProtectRoute, addProduct);
router.delete("/admin/delete-product/:id", adminProtectRoute, deleteProduct);

export default router;
