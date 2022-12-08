import * as React from "react";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CallinSick.modules.css";

function CallInSickPage() {
  const [sickStatus, setSickStatus] = useState(false);
  const [managers, setBeschikbareManagers] = useState([]);

  useEffect(() => {
    getAllProjectManagers();
  }, []);

  async function getAllProjectManagers() {
    const ManagerOptions = [];
    try {
      const response = await fetch("http://localhost:8080/user/managers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json",
      });
      var result = await response.json();

      result.map((value) => {
        const object = { label: value.name, id: value.id };
        ManagerOptions.push(object);
      });

      setBeschikbareManagers(ManagerOptions);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  function callSick() {
    setSickStatus(true);
  }

  function callBetter() {
    setSickStatus(false);
  }

  if (sickStatus) {
    return (
      <div>
        <p className="label">
          <i>You are currently marked sick.</i>
        </p>
        <div className="projectmanagerInput">
          <select name="managers" id="managers">
            {managers.map((manager) => {
              return <option value={manager.label}>{manager.label}</option>;
            })}
          </select>
        </div>

        <div className="sickstatusInput">
          <button
            type="button"
            className="buttonsick btn btn-success"
            onClick={callBetter}
          >
            Call In Better
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="projectmanagerInput">
          <select name="managers" id="managers">
            {managers.map((manager) => {
              return <option value={manager.label}>{manager.label}</option>;
            })}
          </select>
        </div>

        <div>
          <div className="inputsick">
            <textarea
              rows={5}
              placeholder={"Reason for calling in sick (not required)"}
            ></textarea>
          </div>
          <button
            type="button"
            className="buttonsick btn btn-danger"
            onClick={callSick}
          >
            Call In Sick
          </button>
        </div>
      </div>
    );
  }
}

export default CallInSickPage;
