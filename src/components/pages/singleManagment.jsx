import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import classes from "./singleManagment.module.css";
import Trash from "../../assets/TrashIcon.png";

function SingleManagmentPage() {
  const [werknemers, setWerknemers] = useState([]);
  useEffect(() => {
    getAllWerknemers();
  }, []);

  const url = "/create-user";

  async function getAllWerknemers() {
    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json",
      });
      var result = await response.json();

      console.log(result);
      setWerknemers(result);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteWerknemer(id) {
    var dialog = window.confirm(
      "Are you sure you want to delete? (This action cannot be undone)"
    );
    if (dialog === true) {
      const response = await fetch(
        "http://localhost:8080/user?" + new URLSearchParams({ id: id }),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          accept: "application/json",
        }
      );
      console.log(response);
      if (!response.ok) {
        alert("There is a critical error");
        throw new Error(`Error! status: ${response.status}`);
      } else {
        alert("Employee deleted");
        window.location.reload();
      }
    } else {
      alert("Employee not deleted");
    }
  }
  return (
    <div>
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Naam</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {werknemers.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <img
                      src={Trash}
                      alt="trash icon"
                      className={classes.trashIcon}
                      onClick={() => deleteWerknemer(row.id)}
                    />{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Link to={url}>
          <button className={classes.button}>Create New User</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleManagmentPage;
