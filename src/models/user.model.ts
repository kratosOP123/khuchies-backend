import { Schema, model, Document, Model } from "mongoose";

export interface IUser {
  _id: string;
  phoneNo: string;
  fullName?: string;
  address?: string;
  role?: "user" | "admin";
}

// ✅ Correct typing for Mongoose 7+
export type IUserDocument = Document & IUser;
export type IUserModel = Model<IUserDocument>;

const userSchema = new Schema<IUserDocument>(
  {
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
      minlength: 1,
      maxlength: 30,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
