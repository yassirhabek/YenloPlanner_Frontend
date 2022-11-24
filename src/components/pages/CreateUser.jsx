import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import classes from "./CreateUser.module.css";
import BackButton from '../../assets/back.svg';

function CreateUserPage(){
    function createUser(){
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        alert("create user: " + name + " " + email);
    }
    return (
        <div className={classes.container}>
            <Link to="/single-manage">
                <img src={BackButton} alt="back button" className={classes.backButton}/>
            </Link>
            
            <div className={classes.header}>
                <TextField id="name" label="Naam" variant="outlined" className={classes.name}/>
                <TextField id="email" label="Email" variant="outlined" className={classes.email}/>
                <Button variant="contained" className={classes.submit} onClick={createUser}>Submit</Button>
            </div>

            <div className={classes.info}>
                <p>This will send an e-mail to the given email address, prompting the user to create a password. After which the account will be created.</p>
            </div>
        </div>
    );
}

export default CreateUserPage;