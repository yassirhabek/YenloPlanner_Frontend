import { useState, useEffect } from "react";
import classes from "./TeamPlanner.module.css";
import ArrowLeft from "../../assets/ArrowLeft.PNG";
import ArrowRight from "../../assets/ArrowRight.PNG";
import TeamLegend from "../teamplanner/TeamLegend";
import TeamSchedule from "../teamplanner/TeamSchedule";

function TeamPlannerPage() {
  const [weekShown, setWeekShown] = useState("");
  const [yearShown, setYearShown] = useState("");
  const [mondayDate, setMonday] = useState("");
  const [tuesdayDate, setTuesday] = useState("");
  const [wednesdayDate, setWednesday] = useState("");
  const [thursdayDate, setThursday] = useState("");
  const [fridayDate, setFriday] = useState("");

  const Data = [
    {name: "W. Pluijm", id: 1},{name: "B. Bossink", id: 2},{name: "J. Dalen", id: 3},{name: "M. Broeders", id: 4},{name: "Y. Habek", id: 5},{name: "S. Wesseling", id: 6},{name: "D. Schol", id: 7}
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

  useEffect(() => {
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        teamDataWeek={Data}
      />
      <TeamLegend />
    </div>
  );
}

export default TeamPlannerPage;
