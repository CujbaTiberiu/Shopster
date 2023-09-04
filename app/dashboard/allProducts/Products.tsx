"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Product } from "../../../types/product";
import { MdOutlineDeleteForever } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { IoCloseSharp } from "react-icons/io5";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ModalForm from "./ModalForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Products = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSuccessClick = () => {
    setOpen(true);
  };

  const handleErrorClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoCloseSharp fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/getProducts");
    const products = await res.json();
    console.log(products);
    setRows(products.products);
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
        handleSuccessClick();
        getProducts();
      } else {
        handleErrorClick();
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
    <div className="py-24 mx-10">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Actions</StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price&nbsp;(€)</StyledTableCell>
              <StyledTableCell align="center">
                Created At&nbsp;(date)
              </StyledTableCell>
              <StyledTableCell align="center">
                Updated At&nbsp;(date)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows?.map((row: Product) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
                    {/* error - to remove divs or text tags... */}
                    <div className="flex items-center gap-2">
                      <ModalForm ProductId={row.id} getProducts={getProducts} />
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteProduct(row.id.toString())}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.updatedAt}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <div>loading...</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error in deletind product!
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Products;
