import { useLocation } from "react-router-dom";

import classes from "./TitleBar.module.css";
import SearchBar from "./SearchBar";
import YenloLogo from "../../assets/YenloLogo.PNG";
import Uitloggen from "../../assets/Uitloggen.PNG";
import { useEffect, useState } from "react";

function TitleBar() {
  const [werknemers, setWerknemers] = useState([]);
  const [teams, setTeams] = useState([]);

  const location = useLocation();
  let Titlebar;

  useEffect(() => {
    getAllWerknemers();
    getAllTeams();
  }, [window.location.pathname]);

  function logOutHandler() {
    alert("Log out method functionality.");
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

      console.log(result);
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

      console.log(result);
      setTeams(result);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  const TeamData = [
    { name: "Project Fontys", id: 1 },
    { name: "Project Planner", id: 2 },
    { name: "Project Yenlo", id: 3 },
  ];

  if (location.pathname === "/user-planner") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
        <SearchBar placeholder="Search Employee..." data={werknemers} className={classes.search}/>
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
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
        <SearchBar placeholder="Search Employee..." data={werknemers} className={classes.search}/>
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  }
  else if (location.pathname === "/team-planner") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
        <SearchBar placeholder="Search Team..." data={teams} className={classes.search} />
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else if (location.pathname === "/team-manage"){
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
        <SearchBar placeholder="Search Team..." data={teams} className={classes.search} />
        <img
          src={Uitloggen}
          alt="Uitloggen"
          className={classes.logout}
          onClick={logOutHandler}
        />
      </header>
    );
  } else {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
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
