"use client";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditProduct from "./EditProduct";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

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
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <button
        onClick={open}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        <AiOutlineEdit />
      </button>
      <Modal
        opened={opened}
        onClose={close}
        title="Modify Product"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <EditProduct ProductId={ProductId} getProducts={getProducts} />
      </Modal>
    </div>
  );
};

export default ModalForm;
