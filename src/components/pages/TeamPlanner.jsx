import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./TeamPlanner.module.css";
import ArrowLeft from "../../assets/ArrowLeft.PNG";
import ArrowRight from "../../assets/ArrowRight.PNG";
import TeamLegend from "../teamplanner/TeamLegend";
import TeamSchedule from "../teamplanner/TeamSchedule";

function TeamPlannerPage() {
  const location = useLocation();
  const [teamData, setTeamData] = useState([]);
  const [weekShown, setWeekShown] = useState("");
  const [yearShown, setYearShown] = useState("");
  const [mondayDate, setMonday] = useState("");
  const [tuesdayDate, setTuesday] = useState("");
  const [wednesdayDate, setWednesday] = useState("");
  const [thursdayDate, setThursday] = useState("");
  const [fridayDate, setFriday] = useState("");

  const Data = [
    {
      name: "W. Pluijm",
      id: 1,
      availabilities: [
        { dateTime: mondayDate, status: 3, beforeMidday: true },
        { dateTime: mondayDate, status: 3, beforeMidday: false },
        { dateTime: tuesdayDate, status: 3, beforeMidday: true },
        { dateTime: tuesdayDate, status: 2, beforeMidday: false },
        { dateTime: wednesdayDate, status: 2, beforeMidday: true },
        { dateTime: wednesdayDate, status: 1, beforeMidday: false },
        { dateTime: thursdayDate, status: 1, beforeMidday: true },
        { dateTime: thursdayDate, status: 4, beforeMidday: false },
        { dateTime: fridayDate, status: 4, beforeMidday: true },
        { dateTime: fridayDate, status: 4, beforeMidday: false },
      ],
    },
    {
      name: "B. Bossink",
      id: 2,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 1, beforeMidday: false },
        { dateTime: tuesdayDate, status: 2, beforeMidday: true },
        { dateTime: tuesdayDate, status: 3, beforeMidday: false },
        { dateTime: wednesdayDate, status: 3, beforeMidday: true },
        { dateTime: wednesdayDate, status: 2, beforeMidday: false },
        { dateTime: thursdayDate, status: 5, beforeMidday: true },
        { dateTime: thursdayDate, status: 2, beforeMidday: false },
        { dateTime: fridayDate, status: 2, beforeMidday: true },
        { dateTime: fridayDate, status: 0, beforeMidday: false },
      ],
    },
    {
      name: "J. Dalen",
      id: 3,
      availabilities: [
        { dateTime: mondayDate, status: 5, beforeMidday: true },
        { dateTime: mondayDate, status: 5, beforeMidday: false },
        { dateTime: tuesdayDate, status: 4, beforeMidday: true },
        { dateTime: tuesdayDate, status: 4, beforeMidday: false },
        { dateTime: wednesdayDate, status: 4, beforeMidday: true },
        { dateTime: wednesdayDate, status: 4, beforeMidday: false },
        { dateTime: thursdayDate, status: 4, beforeMidday: true },
        { dateTime: thursdayDate, status: 4, beforeMidday: false },
        { dateTime: fridayDate, status: 2, beforeMidday: true },
        { dateTime: fridayDate, status: 2, beforeMidday: false },
      ],
    },
    {
      name: "M. Broeders",
      id: 4,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 1, beforeMidday: false },
        { dateTime: tuesdayDate, status: 1, beforeMidday: true },
        { dateTime: tuesdayDate, status: 1, beforeMidday: false },
        { dateTime: wednesdayDate, status: 1, beforeMidday: true },
        { dateTime: wednesdayDate, status: 1, beforeMidday: false },
        { dateTime: thursdayDate, status: 1, beforeMidday: true },
        { dateTime: thursdayDate, status: 1, beforeMidday: false },
        { dateTime: fridayDate, status: 3, beforeMidday: true },
        { dateTime: fridayDate, status: 3, beforeMidday: false },
      ],
    },
    {
      name: "Y. Habek",
      id: 5,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 2, beforeMidday: false },
        { dateTime: tuesdayDate, status: 2, beforeMidday: true },
        { dateTime: tuesdayDate, status: 1, beforeMidday: false },
        { dateTime: wednesdayDate, status: 3, beforeMidday: true },
        { dateTime: wednesdayDate, status: 3, beforeMidday: false },
        { dateTime: thursdayDate, status: 1, beforeMidday: true },
        { dateTime: thursdayDate, status: 2, beforeMidday: false },
        { dateTime: fridayDate, status: 2, beforeMidday: true },
        { dateTime: fridayDate, status: 1, beforeMidday: false },
      ],
    },
    {
      name: "S. Wesseling",
      id: 6,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 1, beforeMidday: false },
        { dateTime: tuesdayDate, status: 2, beforeMidday: true },
        { dateTime: tuesdayDate, status: 2, beforeMidday: false },
        { dateTime: wednesdayDate, status: 3, beforeMidday: true },
        { dateTime: wednesdayDate, status: 3, beforeMidday: false },
        { dateTime: thursdayDate, status: 1, beforeMidday: true },
        { dateTime: thursdayDate, status: 2, beforeMidday: false },
        { dateTime: fridayDate, status: 1, beforeMidday: true },
        { dateTime: fridayDate, status: 2, beforeMidday: false },
      ],
    },
    {
      name: "D. Schol",
      id: 7,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 1, beforeMidday: false },
        { dateTime: tuesdayDate, status: 1, beforeMidday: true },
        { dateTime: tuesdayDate, status: 1, beforeMidday: false },
        { dateTime: wednesdayDate, status: 1, beforeMidday: true },
        { dateTime: wednesdayDate, status: 1, beforeMidday: false },
        { dateTime: thursdayDate, status: 3, beforeMidday: true },
        { dateTime: thursdayDate, status: 3, beforeMidday: false },
        { dateTime: fridayDate, status: 3, beforeMidday: true },
        { dateTime: fridayDate, status: 3, beforeMidday: false },
      ],
    },
  ];

  const Data2 = [
    {
      name: "R. Bouland",
      id: 1,
      availabilities: [
        { dateTime: mondayDate, status: 3, beforeMidday: true },
        { dateTime: mondayDate, status: 3, beforeMidday: false },
        { dateTime: tuesdayDate, status: 3, beforeMidday: true },
        { dateTime: tuesdayDate, status: 2, beforeMidday: false },
        { dateTime: wednesdayDate, status: 2, beforeMidday: true },
        { dateTime: wednesdayDate, status: 1, beforeMidday: false },
        { dateTime: thursdayDate, status: 1, beforeMidday: true },
        { dateTime: thursdayDate, status: 4, beforeMidday: false },
        { dateTime: fridayDate, status: 4, beforeMidday: true },
        { dateTime: fridayDate, status: 4, beforeMidday: false },
      ],
    },
    {
      name: "K. Veltman",
      id: 2,
      availabilities: [
        { dateTime: mondayDate, status: 1, beforeMidday: true },
        { dateTime: mondayDate, status: 1, beforeMidday: false },
        { dateTime: tuesdayDate, status: 2, beforeMidday: true },
        { dateTime: tuesdayDate, status: 3, beforeMidday: false },
        { dateTime: wednesdayDate, status: 3, beforeMidday: true },
        { dateTime: wednesdayDate, status: 2, beforeMidday: false },
        { dateTime: thursdayDate, status: 5, beforeMidday: true },
        { dateTime: thursdayDate, status: 2, beforeMidday: false },
        { dateTime: fridayDate, status: 2, beforeMidday: true },
        { dateTime: fridayDate, status: 0, beforeMidday: false },
      ],
    },
  ];

  function initialLoad() {
    let weekNumber = currentWeek();
    let yearNumber = currentYear();
    firstDayOfWeek(weekNumber, yearNumber);
  }

  function currentWeek() {
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);
    setWeekShown(weekNumber);
    return weekNumber;
  }

  function currentYear() {
    var currentYear = new Date().getFullYear();
    setYearShown(currentYear);
    return currentYear;
  }

  function returnFormat(date) {
    let formattedDate = date.slice(4, 10);
    return formattedDate;
  }

  function firstDayOfWeek(week, year) {
    if (year == null) {
      year = new Date().getFullYear();
    }

    var date = firstWeekOfYear(year),
      weekTime = weeksToMilliseconds(week),
      targetTime = date.getTime() + weekTime;
    let b = date.setTime(targetTime);
    const monday = new Date(b).toDateString();
    const tuesday = new Date(b + 86400000).toDateString();
    const wednesday = new Date(b + 86400000 * 2).toDateString();
    const thursday = new Date(b + 86400000 * 3).toDateString();
    const friday = new Date(b + 86400000 * 4).toDateString();

    setMonday(returnFormat(monday));
    setTuesday(returnFormat(tuesday));
    setWednesday(returnFormat(wednesday));
    setThursday(returnFormat(thursday));
    setFriday(returnFormat(friday));
  }

  function weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
  }

  function firstWeekOfYear(year) {
    var date = new Date();
    date = firstDayOfYear(date, year);
    date = firstWeekday(date);
    return date;
  }

  function firstDayOfYear(date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  function firstWeekday(firstOfJanuaryDate) {
    var FIRST_DAY_OF_WEEK = 1;
    var WEEK_LENGTH = 7;
    var day = firstOfJanuaryDate.getDay();
    day = day === 0 ? 7 : day;
    var dayOffset = -day + FIRST_DAY_OF_WEEK;
    if (WEEK_LENGTH - day + 1 < 4) {
      dayOffset += WEEK_LENGTH;
    }
    return new Date(
      firstOfJanuaryDate.getTime() + dayOffset * 24 * 60 * 60 * 1000
    );
  }

  function nextWeek() {
    let number = weekShown + 1;
    let year = yearShown;
    if (number === 53) {
      number = 1;
      year++;
      nextYear();
    }
    setWeekShown(number);
    firstDayOfWeek(number, year);
  }

  function previousWeek() {
    let number = weekShown - 1;
    let year = yearShown;
    if (number === 0) {
      number = 52;
      year--;
      previousYear();
    }
    setWeekShown(number);
    firstDayOfWeek(number, year);
  }

  function nextYear() {
    let number = yearShown + 1;
    setYearShown(number);
  }

  function previousYear() {
    let number = yearShown - 1;
    setYearShown(number);
  }

  function loadTeamData() {
    if (location.state === null) {
      setTeamData([]);
    } else {
      if(location.state.teamId === 2)
      {
        setTeamData(Data2);
      }
      else{
        setTeamData(Data);
      }
    }
  }

  useEffect(() => {
    initialLoad();
    loadTeamData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  if (location.state === null) {
    return (
      <div>
        <div className={classes.week}>
          <img
            src={ArrowLeft}
            alt="Left arrow"
            className={classes.arrowl}
            onClick={previousWeek}
          />
          <p>
            Week {weekShown} - {yearShown}
          </p>
          <img
            src={ArrowRight}
            alt="Right arrow"
            className={classes.arrowr}
            onClick={nextWeek}
          />
        </div>
        <TeamSchedule
          dateMonday={mondayDate}
          dateTuesday={tuesdayDate}
          dateWednesday={wednesdayDate}
          dateThursday={thursdayDate}
          dateFriday={fridayDate}
          teamDataWeek={teamData}
        />
        <TeamLegend />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.teamname}>
        <p><b><u>{location.state.name}</u></b></p>
      </div>
      <div className={classes.week}>
        <img
          src={ArrowLeft}
          alt="Left arrow"
          className={classes.arrowl}
          onClick={previousWeek}
        />
        <p>
          Week {weekShown} - {yearShown}
        </p>
        <img
          src={ArrowRight}
          alt="Right arrow"
          className={classes.arrowr}
          onClick={nextWeek}
        />
      </div>
      <TeamSchedule
        dateMonday={mondayDate}
        dateTuesday={tuesdayDate}
        dateWednesday={wednesdayDate}
        dateThursday={thursdayDate}
        dateFriday={fridayDate}
        teamDataWeek={teamData}
      />
      <TeamLegend />
    </div>
  );
}

export default TeamPlannerPage;
