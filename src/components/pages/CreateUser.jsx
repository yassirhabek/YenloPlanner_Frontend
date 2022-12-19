import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import classes from "./CreateUser.module.css";
import BackButton from '../../assets/back.svg';

function CreateUserPage(){
    const Navigate = useNavigate();

    async function createUser(){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        try {
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Please fill in all fields");
                throw "Please fill in all fields";
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                throw "Passwords do not match";
            }

            let response = await fetch("http://localhost:8080/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: name,
                        email: email,
                        password: password
                    })
            });

            if (response.ok) {
                console.log("User created");
                window.location.href = "/single-manage";
            }
            else{
                console.log("User not created. There was an error");
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={classes.container}>
            <Link to="/single-manage">
                <img src={BackButton} alt="back button" className={classes.backButton}/>
            </Link>
            
            <div className={classes.header}>
                <TextField id="name" label="Naam" variant="outlined" className={classes.name}/>
                <TextField id="email" label="Email" variant="outlined" className={classes.email}/>
                <TextField id="password" label="Password" variant="outlined" className={classes.email}/>
                <TextField id="confirmPassword" label="Confirm Password" variant="outlined" className={classes.email}/>
                
                <Button variant="contained" className={classes.submit} onClick={createUser}>Submit</Button>
            </div>

            <div className={classes.info}>
                <p>This will send an e-mail to the given email address, prompting the user to create a password. After which the account will be created.</p>
            </div>
        </div>
    );
}

export default CreateUserPage;