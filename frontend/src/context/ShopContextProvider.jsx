import { ShopContext } from "./ShopContext.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  console.log("backendUrl:", backendUrl);

  // -------------------------
  // 🛒 Add to cart
  // -------------------------
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select product size first");
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (!cartData[itemId]) cartData[itemId] = {};
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
      return cartData;
    });

    toast.success("Added to cart");
  };

  // -------------------------
  // 🧮 Total item count
  // -------------------------
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const count = cartItems[productId][size];
        if (count > 0) totalCount += count;
      }
    }
    return totalCount;
  };

  // -------------------------
  // 🔄 Update cart quantity
  // -------------------------
  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) return;
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  // -------------------------
  // 💰 Calculate total amount
  // -------------------------
  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;

      for (const size in cartItems[id]) {
        const qty = cartItems[id][size];
        if (qty > 0) total += product.price * qty;
      }
    }
    return total;
  };

  // -------------------------
  // 🛍️ Fetch products
  // -------------------------
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast.error("Could not load products");
    }
  };

  // Fetch products on mount
  useEffect(() => {
    getProductsData();
  }, []);

  // -------------------------
  // 🧠 Context value
  // -------------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
