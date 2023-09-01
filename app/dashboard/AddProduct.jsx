"use client";

import { Fragment, forwardRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Category } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";
import { BsUpload } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { IoCloseSharp } from "react-icons/io5";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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
  // q: Why photo upload is not working? // A: Because the form is not multipart/form-data

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSuccessClick = () => {
    setOpen(true);
  };

  const handleErrorClick = () => {
    setOpenError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoCloseSharp fontSize="small" />
      </IconButton>
    </Fragment>
  );

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { name, category, description, price, images };
    // await axios.post("/api/addProduct", data);
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 201 || res.status === 200) {
        handleSuccessClick();
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setImages("");
      } else {
        handleErrorClick();
        throw new Error("Error in creating product");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleUploadSuccess(result) {
    const uploadedImage = result.info.secure_url; // Estrai l'URL dell'immagine dall'oggetto result
    setImages(uploadedImage); // Salva l'URL nello stato
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={createProduct}
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
            value={name}
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="category" className="pt-2 pb-1 text-white">
            Category
          </label>
          <select
            className="rounded-md py-2"
            value={category}
            placeholder="Choose category"
            onChange={(e) => setCategory(e.target.value)}
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
            type="text"
            value={description}
            rows="5"
            cols="33"
            placeholder="Describe the product"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="price" className="pt-2 pb-1 text-white">
            Price
          </label>
          <input
            className="rounded-md py-2"
            type="number"
            value={price}
            min="0"
            max="10000"
            placeholder="Product price €"
            onChange={(e) => setPrice(e.target.value)}
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
          {images && (
            <div className="flex justify-center">
              <img
                src={images}
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
            Save Product
          </button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error in deletind product!
        </Alert>
      </Snackbar>
    </div>
  );
}
