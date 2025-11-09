import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
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
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Men" /> Men
            </p>
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Women" /> Women
            </p>
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Kids" /> Kids
            </p>
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
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Topwear" /> TopWear
            </p>
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="BottomWear" /> BottomWear
            </p>
            <p className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="WinterWear" /> WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* right side full-width content */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {/* Product grid placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {products.map(...)} */}
        </div>
      </div>
    </div>
  );
};

export default Collection;
