import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-5">
      <div className="text-2xl mb-4 text-center">
        <Title text1="CART" text2="TOTAL" />
      </div>

      <div className="flex flex-col gap-3 text-sm text-gray-800">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}.00
          </p>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}.00
            {delivery_fee}.00
          </p>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between text-base font-semibold">
          <p>Total</p>
          <p>
            {currency}.00
            {total}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
