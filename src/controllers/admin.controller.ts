import type { Request, Response } from "express";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const getAllUser = async (req: Request, res: Response) => {
  const user = req?.user;

  if (user?.role !== "admin") {
    return res.status(401).json({
      error: "You are not admin/unauthorized.",
    });
  }

  const users = await User.find({ role: { $ne: "admin" } }).select("-password");

  return res.status(200).json({
    message: "User fetched successfully.",
    users,
  });
};

export const getAllProduct = async (req: Request, res: Response) => {
  const user = req?.user;

  if (user?.role !== "admin") {
    return res.status(401).json({
      error: "You are not admin/unauthorized.",
    });
  }

  const products = await Product.find();

  return res.status(200).json({
    message: "Products fetched successfully.",
    products,
  });
};

export const addProduct = async (req: Request, res: Response) => {
  const user = req?.user;

  if (user?.role !== "admin") {
    return res.status(401).json({
      error: "You are not admin/unauthorized.",
    });
  }

  try {
    const { name, price, discount, categories, imageUrl } = req.body;

    // ✅ Validation
    if (!name || !price || !categories?.length || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Ensure categories is always an array
    const categoryArray = Array.isArray(categories) ? categories : [categories];

    const product = await Product.create({
      productName: name,
      productPrice: price,
      discount,
      category: categoryArray,
      productImageUrl: imageUrl,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
