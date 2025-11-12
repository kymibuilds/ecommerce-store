import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer block"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>

      <p className="pt-3 pb-1 text-sm truncate">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
