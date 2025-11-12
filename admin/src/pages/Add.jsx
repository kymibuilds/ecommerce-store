import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets.js";
import { backendUrl } from "../App.jsx";

function Add({ token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Toggle product size
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token, // this sends token directly in header
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", response.data);
      alert("Product added successfully!");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestseller(false);
      setSizes([]);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10 space-y-8"
    >
      {/* Image Upload Section */}
      <div>
        <p className="text-lg font-semibold mb-4 text-gray-700">
          Upload Images
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((num) => {
            const image = eval(`image${num}`);
            const setImage = eval(`setImage${num}`);
            return (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition p-4 relative"
              >
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt={`Upload ${num}`}
                  className="w-24 h-24 object-contain p-2 opacity-70 hover:opacity-100 transition"
                />
                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span className="text-sm text-gray-500 mt-2">Image {num}</span>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <p className="text-lg font-semibold mb-2 text-gray-700">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <p className="text-lg font-semibold mb-2 text-gray-700">Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          required
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p className="text-lg font-semibold mb-2 text-gray-700">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold mb-2 text-gray-700">
            Sub Category
          </p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className="text-lg font-semibold mb-2 text-gray-700">
          Available Sizes
        </p>
        <div className="flex gap-4">
          {["S", "M", "L"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded-lg transition ${
                sizes.includes(size)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="w-4 h-4 text-blue-600"
        />
        <label htmlFor="bestseller" className="text-gray-700 font-medium">
          Mark as Best Seller
        </label>
      </div>

      {/* Product Price */}
      <div>
        <p className="text-lg font-semibold mb-2 text-gray-700">
          Product Price
        </p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="25"
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

export default Add;
