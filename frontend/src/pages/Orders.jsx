import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 md:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-4">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Info */}
            <div className="flex items-start gap-4 text-sm">
              <img
                className="w-20 h-20 object-cover rounded-lg border"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium text-gray-800">
                  {item.name}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-700 text-sm sm:text-base">
                  <p className="text-lg font-semibold">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: <span className="text-gray-400">25 July 2025</span>
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Delivered
              </span>
              <button className="px-4 py-2 text-sm border rounded-full text-gray-700 hover:bg-gray-100 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
