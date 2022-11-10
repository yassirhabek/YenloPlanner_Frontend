import { Link } from "react-router-dom";
import React from "react";
import Calender from "../../assets/calendar.svg";
import Team from "../../assets/team.svg";
import Sick from "../../assets/sick.svg";
import Leave from "../../assets/leave.svg";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
 return (
    <div className="MainNavigation grid">
        <div className={classes.navbackground}>
            <Link className={classes.calender} to="/user-planner" >
                <img src={Calender} alt="Calender SVG" />
            </Link>
            <Link className={classes.team} to="/team-planner">
                <img src={Team} alt="Team SVG" />
            </Link>
            <Link className={classes.sick} to="/call-in-sick">
                <img src={Sick} alt="Sick SVG" />
            </Link>
            <Link className={classes.leave} to="/ask-for-leave">
                <img src={Leave} alt="Leave SVG" />
            </Link>
        </div>
    </div>
 );
}

export default MainNavigation;
