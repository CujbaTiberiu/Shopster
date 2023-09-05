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

  const filterProductsByCategory = (products, category) => {
    return products.filter((product) => product.category === category);
  };

  const renderProductsByCategory = (category) => {
    const filteredProducts = filterProductsByCategory(products, category);

    return (
      <>
        <h2 className="text-2xl text-white ms-4 border-b-2 border-teal-700 w-44">
          {category}
        </h2>
        <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:mx-10 py-10">
          {filteredProducts.map((product) => (
            <ProductsPage product={product} key={product.id} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {renderProductsByCategory("SMARTPHONE")}
      {renderProductsByCategory("LAPTOP")}
      {renderProductsByCategory("TABLET")}
      {renderProductsByCategory("PC")}
      {renderProductsByCategory("GADGET")}
    </>
  );
}
