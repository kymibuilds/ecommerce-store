import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const productsCopy = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory)
        .slice(0, 5);
      setRelated(productsCopy);
    }
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <div className="mt-16 border-t pt-10">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {related.map((item) => (
          <div
            key={item._id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/product/${item._id}`)}
          >
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
