"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/product";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import ModalForm from "./ModalForm";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Button, Notification, rem, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Products = () => {
  const [rows, setRows] = useState([]);

  const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/getProducts");
    const products = await res.json();
    console.log(products);
    setRows(products.products);
  };

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const showNotification = (name) => {
    notifications.show({
      title: "Product deleted successfully!",
      message: ` Product name : ${name}`,
      color: "teal",
      style: {
        position: "fixed",
        top: 100,
        right: 20,
        zIndex: 1000,
      },
      // icon: checkIcon,
    });
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/deleteProduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the id in the request body
      });

      if (res.status === 201) {
        // Handle successful deletion
        const deletedProduct = await res.json();
        console.log("Deleted Product:", deletedProduct);

        getProducts();
      } else {
        console.error("Error deleting product:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="py-24 mx-10 text-white">
      <Table.ScrollContainer minWidth={500} type="native">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Actions</Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price&nbsp;(€)</Table.Th>
              <Table.Th>Created At&nbsp;(date)</Table.Th>
              <Table.Th>Updated At&nbsp;(date)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows?.map((row: Product) => (
                <Table.Tr key={row.name}>
                  <Table.Td>
                    {/* error - to remove divs or text tags... */}
                    <div className="flex items-center gap-2">
                      <ModalForm ProductId={row.id} getProducts={getProducts} />
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          deleteProduct(row.id.toString());
                          showNotification(row.name);
                        }}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </div>
                  </Table.Td>
                  <Table.Td>{row.id}</Table.Td>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.category}</Table.Td>
                  <Table.Td>{row.price}</Table.Td>
                  <Table.Td>{row.createdAt}</Table.Td>
                  <Table.Td>{row.updatedAt}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <div>loading...</div>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {/* <Notification
        onClose={() => handleClose}
        icon={xIcon}
        color="red"
        title="Bummer!"
      >
        Something went wrong
      </Notification>
      <Notification
        onClose={() => handleClose}
        icon={checkIcon}
        color="teal"
        title="All good!"
        mt="md"
      >
        Everything is fine
      </Notification> */}
    </div>
  );
};

export default Products;
