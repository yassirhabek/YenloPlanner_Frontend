import React from "react";
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

function singleManagmentPage() {
  const url = "/create-user";
  function getAllWerknemers() {
    try {
      // const response = await fetch("http://localhost:5000/werknemers");
      // const jsonData = await response.json();
      // console.log(jsonData);
      return [
        { id: 1, name: "test", email: "test@hotmail.com" },
        { id: 2, name: "test2", email: "uaifwn@hotmail.com" },
        { id: 3, name: "test3", email: "fawwawww@hotmail.com" },
        { id: 4, name: "test4", email: "fawwwwww@hotmail.com" },
        { id: 5, name: "test5", email: "anjwf@hotmail.com" },
        { id: 2, name: "test2", email: "uaifwn@hotmail.com" },
        { id: 3, name: "test3", email: "fawwawww@hotmail.com" },
        { id: 4, name: "test4", email: "fawwwwww@hotmail.com" },
        { id: 5, name: "test5", email: "anjwf@hotmail.com" },
      ];
    } catch (err) {
      console.error(err.message);
    }
  }

  function deleteWerknemer(id) {
    alert("delete function: " + id);
  }

  const werknemers = getAllWerknemers();
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

export default singleManagmentPage;
