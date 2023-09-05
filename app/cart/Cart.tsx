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
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/reducers/cartSlice";
import { redirect } from "next/navigation";

const Cart = () => {
  const products = useSelector((state: RootState) => state.cartSlice.items);
  console.log("Products:", products);

  const paymentHandler = async () => {
    try {
      const response = await axios.post("/api/checkout_session", {
        products,
      });
      if (response.status === 200) {
        console.log(response.data);
        const url = response.data.url;
        console.log("URL:", url);
        window.location.href = url;
      }
    } catch (error) {
      console.error(
        "Errore durante la creazione della sessione di checkout:",
        error
      );
    }
  };

  const uniqueProducts = products?.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  const calculateProductQuantity = (productId, productList) => {
    return productList?.reduce((acc, prod) => {
      if (prod.id === productId) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  // const addToCartHandler = (product) => {
  //   dispatch(addToCart(product));
  // };

  const removeFromCartHandler = (prods, index) => {
    const uniqueProductId = prods[index].id;
    const newProducts = prods.filter((p) => p.id === uniqueProductId);
    dispatch(removeFromCart(newProducts[0]));
  };

  console.log("Unique products:", uniqueProducts);
  return (
    <div className="pt-16 h-screen bg-slate-800">
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
                <div className="flex flex-col justify-center items-center py-1">
                  <h2 className="text-2xl text-teal-700">Name</h2>
                  <div className="pt-3">{uniqueProduct.name}</div>
                </div>
                <div className="flex flex-col justify-center items-center py-1">
                  <h2 className="text-2xl text-teal-700">Price</h2>
                  <div className="pt-3">{uniqueProduct.price} €</div>
                </div>
                <div className="flex flex-col justify-center items-center py-1">
                  <h2 className="text-2xl text-teal-700">Quantity</h2>
                  <div className="pt-3 flex justify-center items-center gap-1">
                    <FaArrowAltCircleLeft
                      className="text-red-500 cursor-pointer"
                      onClick={() =>
                        removeFromCartHandler(
                          products,
                          products.indexOf(uniqueProduct)
                        )
                      }
                    />{" "}
                    {calculateProductQuantity(uniqueProduct.id, products)}{" "}
                    <FaArrowAltCircleRight
                      className="text-green-500 cursor-pointer"
                      onClick={() => addToCartHandler(uniqueProduct)}
                    />
                  </div>
                  {/* <div className="pt-3">{products.filter(product.id => product.id === uniqueProduct.id).length}</div> */}
                </div>
                <div className="flex flex-col justify-center items-center py-1">
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
