import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//import Button from '@mui/material/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import "./CallinSick.modules.css";

const sickstatus = false;

function getAllProjectManagers() {
  // fetch("http://localhost:8080/projectmanagers")
  // .then((response) => response.json())
  // .then((data) => data);
  return [
    { label: "Wim van der Pluijm", id: 1 },
    { label: "Jane Doe", id: 2 },
    { label: "Joe Doe", id: 3 },
    { label: "Jill Doe", id: 4 },
  ];
}

function callSick() {
  alert("Functionality not yet implemented for calling in sick");
}

function callBetter() {
  alert("Functionality not yet implemented for calling in better");
}

function CallInSickPage() {
  if (sickstatus === true) {
    return (
      <div className="container">
        <p className="label">
          <i>You are currently marked sick.</i>
        </p>
        <div className="projectmanagerInput">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={getAllProjectManagers()}
            sx={{ width: "341%" }}
            renderInput={(params) => (
              <TextField {...params} label="Project Managers" />
            )}
          />
        </div>

        <div className="sickstatusInput">
          <button
            type="button"
            class="buttonsick btn btn-success"
            onClick={callBetter}
          >
            Call In Better
          </button>
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
            sx={{ width: "341%" }}
            renderInput={(params) => (
              <TextField {...params} label="Project Managers" />
            )}
          />
        </div>

        <div>
          <button
            type="button"
            class="buttonsick btn btn-danger"
            onClick={callSick}
          >
            Call In Sick
          </button>
          <div className="inputsick">
            <TextField
              id="reasonSick"
              label="Reason for Calling In Sick (Not Required)"
              variant="outlined"
              sx={{ width: "188%" }}
              multiline
              rows={3}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CallInSickPage;
