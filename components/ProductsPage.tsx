"use client";
import { addToCart } from "../redux/reducers/cartSlice";
import { Product } from "../types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setProduct } from "../redux/reducers/productSlice";

interface ProductsPageProps {
  product: Product;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  const setProductHandler = () => {
    dispatch(setProduct(product));
  };

  console.log("Product:", product);
  return (
    <Card
      sx={{ maxWidth: 300 }}
      className="bg-cyan-950 mt-2 text-white shadow-lg shadow-teal-900 hover:shadow-teal-600 hover:scale-105 transition duration-500 ease-in-out border border-sky-400"
    >
      <Link href={"/productDetails"} onClick={() => setProductHandler()}>
        <CardMedia
          className="rounded-lg"
          component={"img"}
          // height={"100"}
          sx={{ height: 300, width: 300, objectFit: "cover" }}
          // sx={{
          //   height: 0,
          //   paddingTop: "100%",
          //   objectFit: "cover",
          // }}
          image={product.images}
          title="product image"
        />
        <CardContent className="text-white">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-center"
          >
            {product.name}
          </Typography>
          <Typography variant="body2">
            {product.description.substring(0, 100) + "..."}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-2xl text-emerald-600 mt-2"
          >
            {product.price} $
          </Typography>
        </CardContent>
      </Link>
      <CardActions className="gap-2">
        <Button
          size="small"
          className="text-neutral-900 bg-yellow-200"
          onClick={() => addToCartHandler()}
        >
          Buy
        </Button>
        <Link href={"/productDetails"} onClick={() => setProductHandler()}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductsPage;
