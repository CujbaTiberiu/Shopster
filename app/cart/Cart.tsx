"use client";
import { RootState } from "../../redux/store/store";
import { Product } from "../../types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const products = useSelector((state: RootState) => state.cartSlice.items);
  console.log("Products:", products);

  const paymentHandler = async () => {
    await axios.post("/api/checkout_session", {
      products,
    });
  };

  const uniqueProducts = products?.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  const calculateProductQuantity = (productId, productList) => {
    return productList.reduce((acc, prod) => {
      if (prod.id === productId) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  console.log("Unique products:", uniqueProducts);
  return (
    <div className="pt-16">
      <h1 className="text-center text-white text-3xl py-10">Cart</h1>

      {!products.length ? (
        <div className="text-center text-white text-3xl my-3">
          {" "}
          "Add some products to cart.."
        </div>
      ) : (
        <>
          <div className="my-6">
            {uniqueProducts.map((uniqueProduct: Product) => (
              <div className="bg-white mx-4 rounded-lg p-6 my-3 flex sm:justify-between flex-col sm:flex-row justify-center items-center">
                <Image
                  src={uniqueProduct.images}
                  alt={uniqueProduct.name}
                  width={200}
                  height={120}
                />
                <div>
                  <h2 className="text-2xl text-teal-700">Name</h2>
                  <div className="pt-3">{uniqueProduct.name}</div>
                </div>
                <div>
                  <h2 className="text-2xl text-teal-700">Price</h2>
                  <div className="pt-3">{uniqueProduct.price} €</div>
                </div>
                <div>
                  <h2 className="text-2xl text-teal-700">Quantity</h2>
                  <div className="pt-3">
                    {calculateProductQuantity(uniqueProduct.id, products)}
                  </div>
                  {/* <div className="pt-3">{products.filter(product.id => product.id === uniqueProduct.id).length}</div> */}
                </div>
                <div>
                  <h2 className="text-2xl text-teal-700">Total</h2>
                  <div className="pt-3">
                    {parseFloat(uniqueProduct.price) *
                      calculateProductQuantity(uniqueProduct.id, products)}{" "}
                    €
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex justify-center pb-4">
            <button
              type="button"
              className="py-2 px-3 bg-green-300 text-xl rounded-md"
              onClick={paymentHandler}
            >
              Go to payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
