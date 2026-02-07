import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/login", async (req, res) => {
  try{
const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
catch (err) {
    res.status(500).json({ message: "Server error" });}
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
    });

    //send verification link on user email thorugh nodemailer
    //Step 1: Create Transporter

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abhinvishal5@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    //send mail in signup route
    const verifyLink = `${process.env.FRONTEND_URL}/account/verify-email?token=${token}`;
    await transporter.sendMail({
      from: "Chat App by Abhishek Anand",
      to: email,
      subject: "Verify your email",
      html: `<h3>Verify your email</h3>
    <p>Click the link below:</p>
    <a href="${verifyLink}">Verify Email</a>
  `,
    });

    res.status(201).json({
      message: "Signup successful. Please verify your email",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//Forget Password
router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not exists" });
    }
 
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken =  crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15*60*1000; // for 15 minutes
    await user.save();

    //send email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"abhinvishal5@gmail.com",
        pass:process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "chat app by abhishek anand",
      to: email,
      subject:"Password Reset" ,
      html:`
      <h3>Reset Password </h3>
      <p>click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Link</a>
      <p>This link will expire in 15 minutes</p>
      `,
    });
    res.json({message:"reset password link send to email"});

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token",async(req,res)=>{
  try{
  const {password} = req.body;
  const {token} = req.params;

if (!password || password.length < 6) {
  return res.status(400).json({ message: "Password must be at least 6 characters" });
}

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({resetPasswordToken:hashedToken,
    resetPasswordExpire:{$gt:Date.now()},
});

if(!user){
  return res.status(400).json({message:"Invalid or expired token"});
}

const hashedPassword =await bcrypt.hash(password,10);
user.password = hashedPassword;

user.resetPasswordExpire = undefined;
user.resetPasswordToken = undefined;

await user.save();
res.json({message: "Password reset successful"});

}
catch(err){
  res.status(500).json({message:"Server error"});
}
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" });

    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = generateAccessToken(user._id.toString());

        res.status(200).json({
          accessToken: newAccessToken,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/logout", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null }
    );
  }
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
});


export default router;
