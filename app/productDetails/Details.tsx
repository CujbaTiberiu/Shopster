"use client";
import { addToCart } from "../../redux/reducers/cartSlice";
import { RootState } from "../../redux/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const product = useSelector((state: RootState) => state.productSlice.product);
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="pt-36 pb-10 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center">
          <img src={product.images} alt="" className="w-96 h-fit" />
        </div>
        <div className="flex flex-col justify-center text-stone-950 mx-10 mt-8 lg:mt-0">
          <h1 className="text-4xl mb-3 font-bold text-slate-800 border-b-4 border-b-teal-700 md:w-96 w-4/6">
            {product.name}
          </h1>
          <p className="">{product.description}</p>
          <div className="flex justify-start items-center gap-8 pt-10">
            <p className="text-3xl text-green-700 font-extrabold">
              {product.price} €
            </p>
            <button
              className=" bg-yellow-200 w-20 h-10 rounded-md"
              onClick={() => addToCartHandler(product)}
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
