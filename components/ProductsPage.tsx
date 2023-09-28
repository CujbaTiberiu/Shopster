"use client";
import { addToCart } from "../redux/reducers/cartSlice";
import { Product } from "../types/product";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
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
      unstyled
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        flex: 1,
      }}
      className="bg-white mt-2 shadow-lg rounded-lg shadow-teal-900 hover:shadow-teal-600 hover:scale-105 transition duration-500 ease-in-out"
    >
      <Link href={"/productDetails"} onClick={() => setProductHandler()}>
        <Card.Section>
          <Image
            // q:how can i make images same size?
            // a: use height and width props
            // q: but still not same size
            // a: use object-fit: cover
            unstyled
            width={300}
            height={300}
            src={product.images}
            style={{ objectFit: "cover" }}
            alt="product image"
          />
        </Card.Section>
      </Link>
      <Group
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Group justify="space-between" mt="md" mb="xs" p={"md"}>
          <Text fw={700} fz={"xl"}>
            {product.name}
          </Text>
          <Badge color="green" variant="light" fz={"xl"}>
            {product.price} €
          </Badge>
        </Group>
        <Text unstyled className="text-black p-6">
          {product.description.substring(0, 100) + "..."}
        </Text>

        <Group justify="space-around" mt="md" mb="xs">
          <Button
            unstyled
            className="text-white px-6 py-3 bg-green-400 rounded-lg shadow-green-300 shadow-lg hover:-translate-y-1 duration-500 ease-in-out hover:shadow-2xl"
            onClick={() => addToCartHandler()}
          >
            Add to Cart
          </Button>
          <Link href={"/productDetails"} onClick={() => setProductHandler()}>
            <Button
              unstyled
              className="text-white px-6 py-3 bg-cyan-400 rounded-lg shadow-cyan-300 shadow-lg hover:-translate-y-1 duration-500 ease-in-out hover:shadow-2xl"
            >
              Details
            </Button>
          </Link>
        </Group>
      </Group>
    </Card>
  );
};

export default ProductsPage;
