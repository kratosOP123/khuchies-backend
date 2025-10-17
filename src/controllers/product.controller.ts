import Product from "../models/product.model.js";
import type { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  return res.status(200).json({
    message: "Products fetched successfully.",
    products,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      error: "Something is missing.",
    });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(401).json({
      error: "No Product found.",
    });
  }

  return res.status(200).json({
    message: "Product details found.",
    product,
  });
};
