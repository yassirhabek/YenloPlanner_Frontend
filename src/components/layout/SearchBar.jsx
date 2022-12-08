import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ placeholder, data }) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  function pickEmployeeHandler(value) {
    if (window.location.pathname === "/team-planner") {
      navigate("/team-planner", {
        replace: true,
        state: { teamId: value.id, name: value.name },
      });
    } else if (window.location.pathname === "/team-manage") {
      navigate("/team-manage", {
        replace: true,
        state: { teamId: value.id, name: value.name },
      });
    } else {
      alert(value.id + " - method to load agenda with user data.");
    }
    clearInput();
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className={classes.searchIcon}>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={classes.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className={classes.dataItem}
                href={value.link}
                onClick={() => pickEmployeeHandler(value)}
              >
                <p>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
