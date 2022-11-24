import { useLocation } from "react-router-dom";

import classes from "./TitleBar.module.css";
import SearchBar from "./SearchBar";
import YenloLogo from "../../assets/YenloLogo.PNG";
import Uitloggen from "../../assets/Uitloggen.PNG";

function TitleBar() {
  const location = useLocation();
  let Titlebar;

  function logOutHandler() {
    alert("Log out method functionality.");
  }

  const Data = [
    { name: "Matthijs", id: 1 },
    { name: "Justin", id: 2 },
    { name: "Wim", id: 3 },
    { name: "Pascal", id: 4 },
    { name: "Boris", id: 5 },
    { name: "Yassir", id: 6 },
  ];
  const TeamData = [
    { name: "Project Fontys", id: 1 },
    { name: "Project Planner", id: 2 },
    { name: "Project Yenlo", id: 3 },
  ];

  if (location.pathname === "/user-planner") {
    Titlebar = (
      <header className={classes.header}>
        <img src={YenloLogo} alt="Yenlo Logo" className={classes.logo}/>
        <SearchBar placeholder="Search Employee..." data={Data} className={classes.search}/>
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
        <SearchBar placeholder="Search Employee..." data={Data} className={classes.search}/>
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
        <SearchBar placeholder="Search Team..." data={TeamData} className={classes.search} />
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
        <SearchBar placeholder="Search Team..." data={TeamData} className={classes.search} />
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
