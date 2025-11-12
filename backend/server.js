import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";          // stays as ./config/db.js
import connectCloudinary from "./config/cloudinary.js"; // stays as ./config/cloudinary.js
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import authUser from "./middleware/auth.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect services
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", authUser, cartRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
