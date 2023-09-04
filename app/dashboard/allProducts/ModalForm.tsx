"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AiOutlineEdit } from "react-icons/ai";
import EditProduct from "./EditProduct";

const style = {
  position: "sticky",
  top: "2%",
  left: "30%",
  rigth: "50%",
  bottom: "2%",
  //transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "96vh",
  overflowY: "auto",
  borderRadius: "10px",
};

const ModalForm = ({ ProductId, getProducts }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        <AiOutlineEdit />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full"
      >
        <Box sx={style} className="mui-fixed">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-2xl text-center bg-teal-700 py-2 px-3 rounded-md text-white"
          >
            Edit exisiting product
          </Typography>
          <EditProduct ProductId={ProductId} getProducts={getProducts} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
