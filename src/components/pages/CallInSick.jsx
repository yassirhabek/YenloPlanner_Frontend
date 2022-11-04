import * as React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'

import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./CallinSick.modules.css";

function getAllProjectManagers() {
  fetch("http://localhost:8080/projectmanagers")
  .then((response) => response.json())
  .then((data) => data);
  return (
    [{label: "John Doe", id: 1}, {label: "Jane Doe", id: 2}, {label: "Joe Doe", id: 3}, {label: "Jill Doe", id: 4}]
  )
}

function CallInSickPage() {
  return (
    <div className={classes.projectmanagerInput}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        className={classes.projectmanagerInput}
        options={getAllProjectManagers()}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Project Managers" />}
      />
    </div>
  );
}

export default CallInSickPage;