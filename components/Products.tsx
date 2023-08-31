import ProductsPage from "../components/ProductsPage";
import { Product } from "../types/product";
import React from "react";

const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/getProducts");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log("Fetched products:", data);
    return data.products;
  } catch (error) {
    console.error("Fetch error:", error);
    return error;
  }
};

export default async function Products() {
  const products = await fetchProducts();
  console.log("Products fetch:", products);

  return (
    <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:mx-10 py-10">
      {products?.map((product: Product) => (
        <ProductsPage product={product} />
      ))}
    </div>
  );
}
