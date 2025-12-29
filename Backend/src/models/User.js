// src/models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // 🔒 SECURITY
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    /*🔐 SECURITY ADDITIONS */

    passwordChangedAt: {
      type: Date
    },

    loginAlertsEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

/*HASH PASSWORD (SAFE)*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // track password change
  this.passwordChangedAt = new Date();

  next();
});

/*COMPARE PASSWORD*/
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
