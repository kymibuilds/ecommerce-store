import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // category filter
    if (category.length > 0) {
      const catSet = new Set(category);
      productsCopy = productsCopy.filter((item) =>
        catSet.has(String(item.category || "").toLowerCase())
      );
    }

    // subcategory filter
    if (subCategory.length > 0) {
      const subSet = new Set(subCategory);
      productsCopy = productsCopy.filter((item) =>
        subSet.has(String(item.subCategory || "").toLowerCase())
      );
    }

    // search filter (only if search is active)
    if (showSearch && search.trim() !== "") {
      const query = search.toLowerCase();
      productsCopy = productsCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          String(item.category || "").toLowerCase().includes(query) ||
          String(item.subCategory || "").toLowerCase().includes(query)
      );
    }

    // sort logic
    if (sortOption === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // re-apply filters when anything changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOption, search, showSearch, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter((s) => !s)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {[
              { val: "men", label: "Men" },
              { val: "women", label: "Women" },
              { val: "kids", label: "Kids" },
            ].map((c) => (
              <label key={c.val} className="flex gap-2 items-center">
                <input
                  className="w-3"
                  type="checkbox"
                  value={c.val}
                  checked={category.includes(c.val)}
                  onChange={toggleCategory}
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>

        {/* sub categories filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {[
              { val: "topwear", label: "TopWear" },
              { val: "bottomwear", label: "BottomWear" },
              { val: "winterwear", label: "WinterWear" },
            ].map((s) => (
              <label key={s.val} className="flex gap-2 items-center">
                <input
                  className="w-3"
                  type="checkbox"
                  value={s.val}
                  checked={subCategory.includes(s.val)}
                  onChange={toggleSubCategory}
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* right side full-width content */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by relevance</option>
            <option value="low-high">Sort low to high</option>
            <option value="high-low">Sort high to low</option>
          </select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={item._id ?? index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full text-center py-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
