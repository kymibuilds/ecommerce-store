import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD method
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, msg: "Order placed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: error.message });
  }
};

// stripe
export const placeOrderStripe = async (req, res) => {
  res.json({ success: true, msg: "Stripe route working" });
};

// razorpay
export const placeOrderRazorpay = async (req, res) => {
  res.json({ success: true, msg: "Razorpay route working" });
};

// all orders data for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: error.message });
  }
};

// user orders data for frontend
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: error.message });
  }
};

// update order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, msg: "Order ID and status are required." });
    }

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.json({ success: false, msg: "Order not found." });
    }

    res.json({ success: true, msg: "Order status updated successfully.", order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: error.message });
  }
};
