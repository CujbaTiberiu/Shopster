"use client";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
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

  return (
    <>
      <h1 className="text-center text-white text-3xl my-3">Cart</h1>
      <button
        type="button"
        className="py-2 px-3 bg-green-300 text-xl"
        onClick={paymentHandler}
      >
        Go to payment
      </button>
      {!products.length ? (
        <div className="text-center text-white text-3xl my-3">
          {" "}
          "Add some products to cart.."
        </div>
      ) : (
        <div className="grid place-content-center md:grid-cols-2 lg:grid-cols-4 gap-4 md:mx-10">
          {products.map((product: Product) => (
            <Card
              sx={{ maxWidth: 345 }}
              className="shadow-lg shadow-teal-900 hover:shadow-teal-600 hover:scale-105 transition duration-500 ease-in-out"
            >
              <CardMedia
                className="rounded-lg"
                sx={{
                  height: 250,
                  width: 250,
                  margin: "auto",
                  objectFit: "contain",
                }}
                image={product.images}
                title="product image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="text-lg text-emerald-600 mt-2"
                >
                  {product.price} $
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  className="text-neutral-900 bg-yellow-200"
                  // onClick={() => addToCartHandler()}
                >
                  Buy
                </Button>
                <Button size="small">Details</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Cart;
