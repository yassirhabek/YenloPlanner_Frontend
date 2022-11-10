import * as React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//import Button from '@mui/material/Button';


import 'bootstrap/dist/css/bootstrap.min.css';
import "./CallinSick.modules.css";

const sickstatus = false;

function getAllProjectManagers() {
  // fetch("http://localhost:8080/projectmanagers")
  // .then((response) => response.json())
  // .then((data) => data);
  return (
    [{label: "John Doe", id: 1}, {label: "Jane Doe", id: 2}, {label: "Joe Doe", id: 3}, {label: "Jill Doe", id: 4}]
  )
}

function callSick(){
  alert("Functionality not yet implemented for calling in sick");
}

function callBetter(){
  alert("Functionality not yet implemented for calling in better");
}

function CallInSickPage() {
  if (sickstatus === true) {
  return (
    <div className="container">
      
      <p className="label">You are currently marked sick</p>
      <div className="projectmanagerInput">
        <Autocomplete
          disablePortal
          id="combo-box-projectmanager"
          options={getAllProjectManagers()}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Project Managers" />}
        />
      </div>

      <div className="sickstatusInput">
        <button type="button" class="buttonsick btn btn-success" onClick={callBetter}>Call In Better</button>
      </div>
    </div>
  );
  } else {
    return (
      <div className="container">
        <div className="projectmanagerInput">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={getAllProjectManagers()}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Project Managers" />}
          />
        </div>

        <div className="sickstatusInput">
          <button type="button" class="buttonsick btn btn-danger" onClick={callSick}>Call In Sick</button>

          <TextField id="reasonSick" className="inputsick" label="Reason for Calling In Sick (Not Required)" variant="outlined" sx={{ width: 400}} />
        </div>
    </div>
    );
  }
}
export default CallInSickPage;