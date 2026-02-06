import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/notes_application")
.then(()=>console.log("db connected"))
.catch((err)=>console.log("err"));

app.get("/",(req,res)=>{
  res.send("hello abhishek");
});

app.use("/account",authRoutes);



app.listen(3000,()=>console.log("http://localhost:3000"));