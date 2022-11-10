import { Link, useLocation } from "react-router-dom";
import React from "react";
import CalendarActive from "../../assets/CalendarActive.PNG";
import CalendarInactive from "../../assets/CalendarInactive.PNG";
import PlaneActive from "../../assets/PlaneActive.PNG";
import PlaneInactive from "../../assets/PlaneInactive.PNG";
import PeopleActive from "../../assets/PeopleActive.PNG";
import PeopleInactive from "../../assets/PeopleInactive.PNG";
import HeartActive from "../../assets/HeartActive.PNG";
import HeartInactive from "../../assets/HeartInactive.PNG";
import TeamManage from "../../assets/TeamManage.PNG";
import SingleManage from "../../assets/SingleManage.PNG";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const admin = false;
  const location = useLocation();
  let Navbar;

  if (location.pathname === "/" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img
              src={CalendarInactive}
              width="76"
              height="76"
              alt="Calender SVG"
            />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team SVG" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick SVG" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave SVG" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/") {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img
              src={CalendarInactive}
              width="76"
              height="76"
              alt="Calender SVG"
            />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team SVG" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick SVG" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave SVG" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/user-planner" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarActive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
 } else if (location.pathname === "/user-planner") {
      Navbar = (
          <div className={classes.navbackground}>
            <Link className={classes.calender} to="/user-planner">
              <img src={CalendarActive} width="76" height="76" alt="Calender" />
            </Link>
            <Link className={classes.team} to="/team-planner">
              <img src={PeopleInactive} width="70" height="70" alt="Team" />
            </Link>
            <Link className={classes.sick} to="/call-in-sick">
              <img src={HeartInactive} width="70" height="70" alt="Sick" />
            </Link>
            <Link className={classes.leave} to="/ask-for-leave">
              <img src={PlaneInactive} width="70" height="70" alt="Leave" />
            </Link>
          </div>
    );
  } else if (location.pathname === "/team-planner" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleActive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/team-planner") {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleActive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/call-in-sick" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartActive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/call-in-sick") {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartActive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>
        </div>
    );
  } else if (location.pathname === "/ask-for-leave" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneActive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  }
  else if (location.pathname === "/ask-for-leave") {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneActive} width="70" height="70" alt="Leave" />
          </Link>
        </div>
    );
  }
  else if (location.pathname === "/team-manage" && admin === true) {
    Navbar = (
        <div className={classes.navbackground}>
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  }
  else if (location.pathname === "/single-manage" && admin === true) {
    Navbar = (
        <div >
          <Link className={classes.calender} to="/user-planner">
            <img src={CalendarInactive} width="76" height="76" alt="Calender" />
          </Link>
          <Link className={classes.team} to="/team-planner">
            <img src={PeopleInactive} width="70" height="70" alt="Team" />
          </Link>
          <Link className={classes.sick} to="/call-in-sick">
            <img src={HeartInactive} width="70" height="70" alt="Sick" />
          </Link>
          <Link className={classes.leave} to="/ask-for-leave">
            <img src={PlaneInactive} width="70" height="70" alt="Leave" />
          </Link>

          <div className={classes.adminLine}>
          </div>

          <Link className={classes.teamManage} to="/team-manage">
             <img src={TeamManage} width="70" height="70" alt="Manage SVG" />
          </Link>

          <Link className={classes.singleManage} to="/single-manage">
            <img src={SingleManage} width="70" height="70" alt="Manage SVG" />
          </Link>
        </div>
    );
  }
  return <div class="grid">{Navbar}</div>;
}

export default MainNavigation;