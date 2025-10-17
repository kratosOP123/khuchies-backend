import jwt from "jsonwebtoken";
import type { Response } from "express";
import crypto from "crypto";

interface tokenProps {
  userId: string;
  res: Response;
}

export const generateToken = ({ userId, res }: tokenProps) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const generateOTP = (): string => {
  const otp = crypto.randomInt(10000, 100000);
  return otp.toString();
};
