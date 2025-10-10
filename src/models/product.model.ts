import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [2, "Product name must be at least 2 characters long"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot exceed 100%"],
  },
  category: {
    type: [String],
    default: [],
    enum: [
      "Mini Cookies",
      "Sandwich Cookies",
      "Single Pack",
      "Family Pack",
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
