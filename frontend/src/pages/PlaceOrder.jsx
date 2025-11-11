import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock Title component
const Title = ({ text1, text2 }) => (
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500">
      {text1} <span className="text-gray-700 font-medium">{text2}</span>
    </p>
  </div>
);

// Mock CartTotal component
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8 w-full sm:max-w-[400px]">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row mt-5">
            <div
              onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-500 transition-colors"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <div className="h-5 mx-4 flex items-center text-sm font-medium text-gray-700">
                STRIPE
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-500 transition-colors"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <div className="h-5 mx-4 flex items-center text-sm font-medium text-gray-700">
                RAZORPAY
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-500 transition-colors"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/orders")}
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
