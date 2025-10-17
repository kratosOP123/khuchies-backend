import express from "express";
import {
  getAllProducts,
  getProduct,
} from "../../controllers/product.controller.js";

const router = express.Router();

router.get("/all-products", getAllProducts);
router.get("/get-product/:id", getProduct);

export default router;
