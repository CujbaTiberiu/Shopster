"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Category } from "@prisma/client";

export default function AddProduct() {
  //   const formik = useFormik({
  //     initialValues: {
  //       name: "",
  //       category: "",
  //       description: "",
  //       price: "",
  //       file: "",
  //     },

  //     validationSchema: Yup.object({
  //       name: Yup.string()
  //         .max(20, "Name must be 20 characters or less.")
  //         .required("Name is required"),
  //       email: Yup.string()
  //         .email("Invalid email address")
  //         .required("Email is required"),
  //       terms: Yup.array().required("Terms of service must be checked"),
  //     }),

  //     onSubmit: (values) => {
  //       console.log("form submitted");
  //       console.log(values);
  //       router.push({ pathname: "/success", query: values });
  //     },
  // onChange={formik.handleChange}
  // value={formik.values.price}
  // onBlur={formik.handleBlur}
  //   });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { name, category, description, price, images };
    await axios.post("/api/addProduct", data);
  }

  function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }
      axios.post("/api/uploadImgs", formData).then((response) => {
        const uploadedImages = response.data;
        setImages(uploadedImages);
      });
    }
  }

  return (
    <div className="bg-slate-500  flex justify-center">
      <form onSubmit={createProduct}>
        <div className="flex flex-col justify-center">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            value={name}
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="category">Category</label>
          <select
            value={category}
            placeholder="Choose category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={Category.SMARTPHONE}>Smartphone</option>
            <option value={Category.PC}>PC</option>
            <option value={Category.TABLET}>Tablet</option>
            <option value={Category.GADGET}>Gadget</option>
            <option value={Category.LAPTOP}>Laptop</option>
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            value={description}
            rows="5"
            cols="33"
            placeholder="Describe the product"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            value={price}
            min="0"
            max="10000"
            placeholder="Product price €"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            name="file"
            onChange={uploadImages}
            className="cursor-pointer"
          />
        </div>
        <div>
          <button type="submit" className=" px-4 py-2 bg-blue-900">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
