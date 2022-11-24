import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import classes from "./teamManagment.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TeamManagment() {
  const location = useLocation();
  const [teamStatus, setTeamStatus] = useState(false);
  const [werknemerId, setWerknemerId] = useState([]);
  const [teamId, setTeamId] = useState([]);
  const [members, setMembers] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [mgShow, setMgShow] = useState(false);

  useEffect(() => {
    if (location.state !== null) {
      setTeamStatus(true);
      setTeamId(location.state.teamId);
      getTeamMembers(location.state.teamId);
    }
  }, [location.state]);

  function getTeamMembers(Id) {
    try {
      if (Id !== null) {
        setMembers([
          {
            id: 1,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 3,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 3,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 3,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 3,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@test.com",
          },
          {
            id: 3,
            name: "test",
            email: "test@test.com",
          },
        ]);
        console.log(Id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getAllWerknemers() {
    try {
      // const response = await fetch("http://localhost:5000/werknemers");
      // const jsonData = await response.json();
      // console.log(jsonData);
      return [
        { label: "Wim van der Pluijm", id: 1 },
        { label: "Jane Doe", id: 2 },
        { label: "Joe Doe", id: 3 },
        { label: "Jill Doe", id: 4 },
      ];
    } catch (err) {
      console.error(err.message);
    }
  }

  function AddWerknemerToTeam() {
    try {
      alert("add member to team function: " + werknemerId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteMemberFromTeam(id) {
    try {
      alert("remove member from team function: " + id);
    } catch (error) {
      console.log(error);
    }
  }

  function deleteTeam() {
    try {
      alert("delete team function: " + teamId);
    } catch (error) {
      console.log(error);
    }
  }

  function CreateTeam() {
    try {
      var teamName = document.getElementById("teamName").value;
      alert("create team function: " + teamName);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {teamStatus ? (
        <div className={classes.container}>
          <Table striped className={classes.tableTeam}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naam</th>
                <th>Email</th>
                <th>
                  <Button variant="warning" onClick={() => setLgShow(true)}>
                    Add
                  </Button>
                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
                      <h3>Add Employee</h3>
                    </Modal.Header>
                    <Modal.Body>
                      <Autocomplete
                        disablePortal
                        id="combo-box"
                        onChange={(event, value) => setWerknemerId(value.id)}
                        options={getAllWerknemers()}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Werknemer" />
                        )}
                      />

                      <Button
                        className="mt-3"
                        variant="primary"
                        onClick={() => AddWerknemerToTeam()}
                      >
                        Add
                      </Button>
                    </Modal.Body>
                  </Modal>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={deleteTeam}
                  >
                    Delete Team
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {members === [] ? (
                <tr>
                  <td>Add a member to make changes.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                members.map((member, index) => (
                  <tr key={index}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteMemberFromTeam(member.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <h2>Select a Team to start.</h2>
      )}
      <button className={classes.button} onClick={() => setMgShow(true)}>
        Create New Team
      </button>
      <Modal
        size="lg"
        show={mgShow}
        onHide={() => setMgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
          <h3>Create Team</h3>
        </Modal.Header>
        <Modal.Body>
          <TextField id="teamName" label="Team Name" variant="outlined" />
          <br />
          <Button
            className="mt-3"
            variant="primary"
            onClick={() => CreateTeam()}
          >
            Create
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TeamManagment;
