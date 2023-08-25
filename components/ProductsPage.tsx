import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";

interface ProductsPageProps {
  product: Product;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ product }) => {
  console.log("Product:", product);
  return (
    <>
      {product && (
        <div className="bg-gray-800 text-white p-4 rounded-lg my-6 mt-14">
          {/*card title */}
          <div className="py-6">
            <h1 className="text-xl font-extrabold text-center">
              {product.title}
            </h1>
          </div>
          {/*card info */}
          <div className="py-8">
            <div className="flex justify-between">
              <div>{/* <p key={}>{}</p> */}</div>
              <div>
                <p
                //</div> className={
                // rating
                //   ? "px-4 py-3 my-2 bg-yellow-400 inline-block rounded-lg"
                //   : "px-4 py-3 my-2 bg-green-400 inline-block rounded-lg"
                //}
                >
                  {}
                </p>
              </div>
            </div>
          </div>
          {/*card img */}
          <div>
            {/* <video
          src={productTrailer}
          className="container"
          controls
          onMouseEnter={(e) => startPreview(product.id)}
          onMouseLeave={(e) => stopPreview()}
        ></video> */}
            <Image
              className="h-60 rounded-lg"
              src={product.thumbnail}
              alt={product.title}
              width={1000}
              height={1000}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
