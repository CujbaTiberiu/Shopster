import React from "react";
import { Product } from "@/types/product";
import ProductsPage from "@/components/ProductsPage";

const fecthProducts = async () => {
  const res = await fetch(
    "https://ecom.webscrapingapi.com/v1?q=lenovo&type=search&amazon_domain=amazon.com&engine=amazon&api_key=PWcf0XO0twR478EYEcPdmrrA3qmYH3XV"
  );
  const data = await res.json();
  console.log(data?.search_results);
  console.log(data?.search_results.product_results);
  return data?.search_results.product_results;
};

export default async function Products() {
  const products = await fecthProducts();
  console.log("Products fecth:", products);

  return (
    <>
      {products?.map((product: Product) => (
        <ProductsPage key={product.product_id} product={product} />
      ))}
    </>
  );
}
