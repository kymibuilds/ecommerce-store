import React from "react";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-semibold text-red-600">
        Payment Failed
      </h1>
      <p className="mt-3 text-gray-700">Your payment could not be processed.</p>
    </div>
  );
};

export default PaymentFailed;
