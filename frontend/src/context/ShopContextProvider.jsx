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
  // ✅ FIX: Initialize token from localStorage immediately
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // 🐛 DEBUG: Monitor token changes
  useEffect(() => {
    console.log("🔑 Token state changed:", token);
    console.log("💾 localStorage token:", localStorage.getItem("token"));
  }, [token]);

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

  // -------------------------
  // 🛒 Add to cart
  // -------------------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size first");
      return;
    }

    // Local cart update
    const updatedCart = structuredClone(cartItems);
    updatedCart[itemId] ??= {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

    setCartItems(updatedCart);
    toast.success("Added to cart");

    // Sync with backend
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error syncing cart:", error.message);
      }
    }
  };

  // -------------------------
  // 🔄 Update cart quantity
  // -------------------------
  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = structuredClone(cartItems);
    if (!updatedCart[itemId]) return;

    if (quantity <= 0) {
      delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) delete updatedCart[itemId];
    } else {
      updatedCart[itemId][size] = quantity;
    }

    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating cart:", error.message);
      }
    }
  };

  // -------------------------
  // 💰 Calculate total amount
  // -------------------------
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, sizes]) => {
      const product = products.find((p) => p._id === id);
      if (!product) return total;

      const subtotal = Object.values(sizes).reduce(
        (sum, qty) => sum + qty * product.price,
        0
      );
      return total + subtotal;
    }, 0);
  };

  // -------------------------
  // 🧮 Total item count
  // -------------------------
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (sum, sizes) => sum + Object.values(sizes).reduce((a, b) => a + b, 0),
      0
    );
  };

  // -------------------------
  // 🧾 Fetch user cart (if logged in)
  // -------------------------
  const loadUserCart = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      }
    } catch (error) {
      console.error("Error loading user cart:", error.message);
    }
  };

  // -------------------------
  // ⚙️ Initialization
  // -------------------------
  useEffect(() => {
    getProductsData();
  }, []);

  // ✅ REMOVED: No longer needed since we initialize token from localStorage directly
  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   if (savedToken) setToken(savedToken);
  // }, []);

  useEffect(() => {
    if (token) loadUserCart();
  }, [token]);

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
    updateQuantity,
    getCartAmount,
    getCartCount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;