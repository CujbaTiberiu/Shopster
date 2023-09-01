"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/product";
import { Category } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";
import { BsUpload } from "react-icons/bs";

const EditProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    images: "",
    updatedAt: "",
    createdAt: "",
    published: false,
  } as Product);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/getProducts");
    const data = await response.json();
    const products = data.products;
    setFormData({
      ...formData,
      name: products.name,
      category: products.category,
      description: products.description,
      price: products.price,
      images: products.images,
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const editProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/editProduct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const editedProduct = await res.json();
        console.log("Edited Product:", editedProduct);
      } else {
        console.error("Error editing product:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  function handleUploadSuccess(result) {
    const uploadedImage = result.info.secure_url;
    setFormData({
      ...formData,
      images: uploadedImage,
    });
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={editProductHandler}
        encType="multipart/form-data"
        className="border border-teal-700 p-8 my-16 rounded-lg bg-slate-800"
      >
        <div className="flex flex-col justify-center">
          <label htmlFor="name" className="pt-2 pb-1 text-white">
            Name
          </label>
          <input
            className="rounded-md py-2"
            type="name"
            value={formData.name}
            placeholder="Product name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="category" className="pt-2 pb-1 text-white">
            Category
          </label>
          <select
            className="rounded-md py-2"
            value={formData.category}
            placeholder="Choose category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Choose category</option>
            <option value={Category.SMARTPHONE}>Smartphone</option>
            <option value={Category.PC}>PC</option>
            <option value={Category.TABLET}>Tablet</option>
            <option value={Category.GADGET}>Gadget</option>
            <option value={Category.LAPTOP}>Laptop</option>
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="description" className="pt-2 pb-1 text-white">
            Description
          </label>
          <textarea
            className="rounded-md py-2"
            rows={5}
            cols={50}
            value={formData.description}
            placeholder="Describe the product"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="price" className="pt-2 pb-1 text-white">
            Price
          </label>
          <input
            className="rounded-md py-2"
            type="number"
            value={formData.price}
            min="0"
            max="10000"
            placeholder="Product price €"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <label htmlFor="file" className="pt-2 pb-1 text-white">
          Photo
        </label>
        <div className="flex justify-center">
          <CldUploadButton
            uploadPreset="ml_default"
            onSuccess={handleUploadSuccess}
            className="mb-2 w-full h-20 bg-gray-400 border-dashed border-2 border-gray-600 rounded-md relative"
          />
          <BsUpload className="absolute mt-12" />
        </div>
        <div>
          {formData.images && (
            <div className="flex justify-center">
              <img
                src={formData.images}
                alt="Uploaded Product"
                className="w-64 h-auto object-cover"
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="my-2 px-4 py-2 bg-teal-600 rounded-md text-white hover:bg-teal-800 hover:translate-y-2 ease-in-out transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
