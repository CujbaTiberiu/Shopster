"use client";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/product";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const products = useSelector((state: RootState) => state.cartSlice.items);
  console.log("Products:", products);
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {products.map((product: Product) => (
          <div className="text-white">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
