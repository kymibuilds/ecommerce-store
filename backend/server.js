import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import authUser from "./middleware/auth.js";
import orderRouter from "./routes/orderRoute.js";
import verifyRoute from "./routes/verifyRoute.js";

const app = express();

// Connect services once at cold start
connectDB();
connectCloudinary();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://vwlsim-frontend.vercel.app",
      "https://vwlsim-admin.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", authUser, cartRouter);
app.use("/verify", verifyRoute);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

export default app; // IMPORTANT FOR VERCEL
