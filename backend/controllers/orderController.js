import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================
//  CASH ON DELIVERY
// ======================
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, msg: "Order placed" });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ======================
//  STRIPE CHECKOUT
// ======================
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const origin = req.headers.origin;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: `${item.name} (${item.size})`,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ======================
//  RAZORPAY PLACEHOLDER
// ======================
export const placeOrderRazorpay = async (req, res) => {
  res.json({ success: true, msg: "Razorpay route working" });
};

// ======================
//  ADMIN – ALL ORDERS
// ======================
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ======================
//  USER – OWN ORDERS
// ======================
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ======================
//  UPDATE ORDER STATUS
// ======================
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        msg: "Order ID and status are required.",
      });
    }

    const updated = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated)
      return res.json({ success: false, msg: "Order not found." });

    res.json({
      success: true,
      msg: "Order status updated successfully.",
      order: updated,
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
