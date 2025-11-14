import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { success, orderId } = req.query;

    if (!orderId) {
      return res.redirect("/payment-failed");
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.redirect("/payment-failed");
    }

    if (success === "true") {
      order.payment = true;
      await order.save();

      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

      return res.redirect("/payment-success");
    }

    return res.redirect("/payment-failed");
  } catch (err) {
    return res.redirect("/payment-failed");
  }
});

export default router;
