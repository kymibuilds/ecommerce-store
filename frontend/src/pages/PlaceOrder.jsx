import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ShopContext } from "../context/ShopContext";

const Title = ({ text1, text2 }) => (
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500">
      {text1} <span className="text-gray-700 font-medium">{text2}</span>
    </p>
  </div>
);

const CartTotal = () => (
  <div className="w-full">
    <div className="text-2xl mb-4">
      <Title text1={"CART"} text2={"TOTALS"} />
    </div>
    <div className="flex flex-col gap-2 mt-2 text-sm">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>$100.00</p>
      </div>
      <hr />
      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>$10.00</p>
      </div>
      <hr />
      <div className="flex justify-between text-base font-bold">
        <p>Total</p>
        <p>$110.00</p>
      </div>
    </div>
  </div>
);

const PlaceOrder = () => {
  const { backendUrl, token, getCartAmount, delivery_fee, cartItems, products } =
    useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrderHandler = async () => {
    if (!paymentMethod) return alert("Select a payment method first.");
    if (!token) return alert("Please log in to place an order.");

    try {
      const totalAmount = getCartAmount() + delivery_fee;
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const orderItems = Object.entries(cartItems).flatMap(
        ([productId, sizes]) => {
          const product = products.find((p) => p._id === productId);
          if (!product) return [];

          return Object.entries(sizes).map(([size, qty]) => ({
            productId,
            name: product.name,
            price: product.price,
            size,
            quantity: qty,
          }));
        }
      );

      const routeMap = {
        cod: "place",
        stripe: "stripe",
        razorpay: "razorpay",
      };

      const endpoint = `${backendUrl}/api/order/${routeMap[paymentMethod]}`;

      const response = await axios.post(
        endpoint,
        {
          userId,
          items: orderItems,
          amount: totalAmount,
          address: formData,
          paymentMethod,
        },
        { headers: { token } }
      );

      if (paymentMethod === "stripe") {
        if (response.data.success && response.data.session_url) {
          window.location.href = response.data.session_url;
          return;
        }
        alert(response.data.msg || "Stripe session failed.");
        return;
      }

      if (response.data.success) {
        alert("Order placed successfully!");
        navigate("/orders");
      } else {
        alert(response.data.msg || "Order failed. Try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input type="text" name="firstName" placeholder="First Name"
            value={formData.firstName} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" name="lastName" placeholder="Last Name"
            value={formData.lastName} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input type="email" name="email" placeholder="Email Address"
          value={formData.email} onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />

        <input type="text" name="street" placeholder="Street"
          value={formData.street} onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />

        <div className="flex gap-3">
          <input type="text" name="city" placeholder="City"
            value={formData.city} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" name="state" placeholder="State"
            value={formData.state} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <div className="flex gap-3">
          <input type="number" name="zipcode" placeholder="Zip Code"
            value={formData.zipcode} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" name="country" placeholder="Country"
            value={formData.country} onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input type="number" name="phone" placeholder="Phone"
          value={formData.phone} onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      <div className="mt-8 w-full sm:max-w-[400px]">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row mt-5">
            {["stripe", "razorpay", "cod"].map((method) => (
              <div key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer transition-colors ${
                  paymentMethod === method ? "border-green-500" : ""
                }`}
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === method ? "bg-green-500" : ""
                }`}></p>
                <p className="text-sm font-medium text-gray-700">
                  {method === "cod" ? "CASH ON DELIVERY" : method.toUpperCase()}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
