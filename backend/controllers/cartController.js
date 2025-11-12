import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, msg: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.json({ success: false, msg: error.message });
  }
};

// Update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, msg: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.json({ success: false, msg: "Item not in cart" });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Cart updated", cartData });
  } catch (error) {
    console.error("Update cart error:", error);
    res.json({ success: false, msg: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("Get cart error:", error);
    res.json({ success: false, msg: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
