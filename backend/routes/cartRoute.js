import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

// Get user's cart
cartRouter.post("/get", auth, getUserCart);

// Add item to cart
cartRouter.post("/add", auth, addToCart);

// Update quantity in cart
cartRouter.post("/update", auth, updateCart);

export default cartRouter;
