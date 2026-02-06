import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is requried"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
    type: String,
    default: null,
  },
    isVerified:{
      type:Boolean,
      default:false,
    },
    verificationToken:{
      type:String,
    },
    resetPasswordToken:{
      type:String,
    },
    resetPasswordExpire:{
      type:Date,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;