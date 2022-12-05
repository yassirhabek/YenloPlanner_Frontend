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
  const [werknemers, setWerknemers] = useState([]);
  const [werknemerId, setWerknemerId] = useState();
  const [teamId, setTeamId] = useState();
  const [team, setTeam] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [mgShow, setMgShow] = useState(false);

  useEffect(() => {
    if (location.state !== null) {
      console.log(location.state);
      setTeamStatus(true);
      setTeamId(location.state.teamId);
      getTeamMembers(location.state.teamId);
      getAllWerknemers();
    }
  }, [location.state]);

  async function getTeamMembers(Id) {
    try {
      const response = await fetch(
        "http://localhost:8080/team/" + Id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          accept: "application/json",
        }
      );
      var result = await response.json();

      console.log(result);
      setTeam(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

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
      setWerknemers(result);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  async function AddWerknemerToTeam() {
    try {
      if(werknemerId === null || werknemerId === undefined){
        alert("Please select a user.");
        return;
      }

      const response = await fetch("http://localhost:8080/team/user?" + new URLSearchParams({teamId: teamId, userId: werknemerId}), {
        method: "POST"
      });
      
      response.json !== null ? alert("User is added to the team") : alert("Critical error");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMemberFromTeam(id) {
    try {
      const response = await fetch("http://localhost:8080/team/user?" + new URLSearchParams({teamId: teamId, userId: id}), {
        method: "DELETE"
      });
      response.json !== null ? alert("User is deleted from the team") : alert("Critical error");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTeam() {
    try {
      var answer = window.confirm("Are you sure you want to delete this team? (This action can not be undone)");
      if (answer) {
        const response = await fetch("http://localhost:8080/team?" + new URLSearchParams({teamId: teamId}), {
          method: "DELETE"
        });
        response.json !== null ? alert("Team is deleted") : alert("Critical error");
        var url = window.location.protocol + "//" + window.location.host + "/user-planner";
        window.location.href = url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateTeam() {
    try {
      var teamName = document.getElementById("teamName").value;
      
      if (teamName === null || teamName === undefined || teamName === "") {
        alert("Please enter a team name.");
        return;
      }

      const response = await fetch("http://localhost:8080/team/add-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamName,
        }),
      });
      response.json !== null ? alert("Team is created") : alert("Critical error");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {location.state !== null ? (
        <div className={classes.container}>
          <h2>{location.state.name}</h2>
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
                        options={werknemers}
                        getOptionLabel={(werknemer) => werknemer.name.toString()}
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
              { team.user?.map((member, index) => (
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
                ))}
            </tbody>
          </Table>
        </div>) : (
        <div className={classes.container}>
          <h3>Select a team in the searchbar</h3>
          <h3>Or create a new team</h3>
        </div>)}
        
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
