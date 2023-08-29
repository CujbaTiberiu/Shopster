"use client";
import { Product } from "@/types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface ProductsPageProps {
  product: Product;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: product,
    });
  };

  console.log("Product:", product);
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="shadow-lg shadow-teal-900 hover:shadow-teal-600 hover:scale-105 transition duration-500 ease-in-out"
    >
      <CardMedia
        className="rounded-lg"
        sx={{ height: 250, width: 250, margin: "auto", objectFit: "contain" }}
        image={product.images}
        title="product image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100) + "..."}
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
          onClick={() => addToCartHandler()}
        >
          Buy
        </Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
};

export default ProductsPage;
