import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";

function Orders() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert(response.data.msg || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">All Orders</h2>
        <p className="text-sm text-gray-500">
          Total: <span className="font-medium">{orders.length}</span>
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No Orders"
            className="w-28 h-28 opacity-60 mb-6"
          />
          <p className="text-lg font-medium">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-medium">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.address?.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.address?.phone && `📞 ${order.address.phone}`}
                    </p>
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    <p className="text-sm">
                      {order.address?.street}, {order.address?.city}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.address?.state}, {order.address?.zipcode}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.address?.country}
                    </p>
                  </td>

                  <td className="py-3 px-4 font-semibold text-gray-800">
                    ${order.amount?.toFixed(2)}
                  </td>

                  <td className="py-3 px-4">
                    {order.paymentMethod?.toUpperCase()}
                  </td>

                  {/* Editable status dropdown */}
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="border rounded-md text-sm px-2 py-1 outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {[
                        "Order Placed",
                        "Processing",
                        "Shipped",
                        "Out for Delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-gray-500">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
