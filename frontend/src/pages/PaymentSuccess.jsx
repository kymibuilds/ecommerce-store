import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <p className="mt-3 text-gray-700">Your order has been confirmed.</p>
    </div>
  );
};

export default PaymentSuccess;
