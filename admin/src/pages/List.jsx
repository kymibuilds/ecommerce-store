import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import axios from "axios";

function List({ token }) {
  const [list, setList] = useState([]);

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch product list.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Product removed successfully.");
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message || "Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Error removing product.");
    }
  };

  return (
    <>
      <p className="text-2xl font-semibold mb-6 text-gray-800">All Products</p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-5 bg-gray-100 font-medium text-gray-700 text-sm py-3 px-4 border-b border-gray-200">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* Product Rows */}
        <div className="divide-y divide-gray-100">
          {list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center text-sm text-gray-700 py-4 px-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-center">
                  <img
                    src={item.images?.[0] || item.image?.[0] || ""}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                  />
                </div>
                <p className="truncate font-medium">{item.name}</p>
                <p className="capitalize">{item.category}</p>
                <p className="font-semibold">
                  {currency}
                  {item.price}
                </p>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm transition"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6 text-sm">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default List;
