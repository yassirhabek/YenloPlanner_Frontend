import { useLocation } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../../store/logged-in-context";
import classes from "./TitleBar.module.css";
import SearchBar from "./SearchBar";
import YenloLogo from "../../assets/logo.svg";
import Uitloggen from "../../assets/Uitloggen.PNG";
import { useEffect, useState } from "react";

function TitleBar() {
  const userCtx = useContext(UserContext);
  const [werknemers, setWerknemers] = useState([]);
  const [teams, setTeams] = useState([]);

  const location = useLocation();
  let Titlebar;

  useEffect(() => {
    getAllWerknemers();
    getAllTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  function logOutHandler() {
    userCtx.onLogout();
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

  async function getAllTeams() {
    try {
      const response = await fetch("http://localhost:8080/team", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json",
      });
      var result = await response.json();

      setTeams(result);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  if (location.pathname === "/user-planner") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo} />
        <SearchBar
          placeholder="Search Employee..."
          data={werknemers}
          className={classes.search}
        />
        <p>{userCtx.Username}</p>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else if (location.pathname === "/user-planner/edit") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo} />
        <SearchBar
          placeholder="Search Employee..."
          data={werknemers}
          className={classes.search}
        />
        <p>{userCtx.Username}</p>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else if (location.pathname === "/team-planner") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo} />
        <SearchBar
          placeholder="Search Team..."
          data={teams}
          className={classes.search}
        />
        <p>{userCtx.Username}</p>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else if (location.pathname === "/team-manage") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo} />
        <SearchBar
          placeholder="Search Team..."
          data={teams}
          className={classes.search}
        />
        <p>{userCtx.Username}</p>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else if (location.pathname === "/") {
    Titlebar = <div />;
  } else {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo} />
        <p>{userCtx.Username}</p>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  }

  return <div>{Titlebar}</div>;
}

export default TitleBar;
