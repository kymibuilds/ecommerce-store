import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 px-4 md:px-8 min-h-[80vh] bg-gray-50">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 text-gray-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No Orders"
            className="w-28 h-28 opacity-60 mb-6"
          />
          <p className="text-lg font-medium">You have no orders yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Orders will appear here after you make a purchase.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orderData.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 text-sm">
                <img
                  className="w-24 h-24 object-cover rounded-lg border"
                  src={order.items[0]?.image?.[0]}
                  alt={order.items[0]?.name || "Product"}
                />
                <div>
                  <p className="sm:text-base font-semibold text-gray-800">
                    {order.items[0]?.name || "Product Name"}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-700 text-sm sm:text-base">
                    <p className="text-lg font-semibold">
                      {currency}
                      {order.amount?.toFixed(2)}
                    </p>
                    <p>Qty: {order.items.length}</p>
                    <p>Method: {order.paymentMethod?.toUpperCase()}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Placed on:{" "}
                    <span className="text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status || "Processing"}
                </span>
                <button className="px-4 py-2 text-sm border rounded-full text-gray-700 hover:bg-gray-100 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
