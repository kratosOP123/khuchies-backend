import type { Request, Response } from "express";
import { generateOTP, generateToken } from "../libs/util.js";
import User from "../models/user.model.js";

const currentOtp: Record<string, string> = {};

export const generateOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNo } = req.body;

    if (!phoneNo || phoneNo.length !== 10) {
      return res.status(400).json({
        error: "Number is missing must be of 10 digits",
      });
    }

    const anOtp = generateOTP();

    currentOtp[phoneNo] = anOtp;

    setTimeout(() => {
      if (currentOtp[phoneNo]) delete currentOtp[phoneNo];
    }, 2000 * 60);

    return res.status(200).json({
      otp: anOtp,
      phoneNo,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const currentOtps = (_: Request, res: Response) => {
  return res.status(200).json({
    message: "all otps here",
    currentOtps: currentOtp,
  });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { phoneNo, otp } = req.body;

  try {
    if (!phoneNo || !otp) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    // check if OTP exists for this number
    if (!currentOtp[phoneNo]) {
      return res.status(410).json({
        error: "OTP expired",
      });
    }

    //incorrect OTP
    if (currentOtp[phoneNo] !== otp) {
      return res.status(400).json({
        error: "OTP not matching",
      });
    }

    // OTP matched → delete it (one-time use)
    delete currentOtp[phoneNo];

    const user = await User.findOne({ phoneNo });

    if (user) {
      generateToken({ userId: user._id.toString(), res });
      return res.status(200).json({
        message: "Logged in successfully.",
        _id: user._id,
        phoneNo: user.phoneNo,
      });
    }

    const newUser = new User({
      phoneNo,
    });

    await newUser.save();

    generateToken({ userId: newUser._id.toString(), res });

    if (currentOtp[phoneNo]) delete currentOtp[phoneNo];

    return res.status(201).json({
      message: "User created successfully.",
      _id: newUser._id,
      phoneNo: newUser.phoneNo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    res.status(200).json(req.user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in checkauth controller", error.message);
    } else {
      console.error("Error in checkauth controller", error);
    }
    res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};

export const logout = (_: Request, res: Response): void => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "User is logged out",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in logout controller", error.message);
    } else {
      console.log("Error in logout controller", error);
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
