import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      minlength: 1,
      maxlength: 30,
      trim: true
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
