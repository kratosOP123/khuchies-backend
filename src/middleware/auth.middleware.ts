import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;
    if (!token)
      return res.status(401).json({ message: "Unauthorized - No token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    if (!decoded?.userId)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error: any) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
