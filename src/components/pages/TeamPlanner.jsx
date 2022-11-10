import { useState, useEffect } from "react";
import classes from "./TeamPlanner.module.css";
import ArrowLeft from "../../assets/ArrowLeft.PNG";
import ArrowRight from "../../assets/ArrowRight.PNG";

function TeamPlannerPage() {
  const [weekShown, setWeekShown] = useState("");
  const [yearShown, setYearShown] = useState("");

  function currentWeek() {
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);
    setWeekShown(weekNumber);
  }

  function currentYear(){
    var currentYear = new Date().getFullYear();
    setYearShown(currentYear);
  }

  function nextWeek(){
    let number = weekShown + 1;
    if(number === 53){
      number = 1;
      nextYear();
    }
    setWeekShown(number);
  }

  function previousWeek(){
    let number = weekShown - 1;
    if(number === 0){
      number = 52;
      previousYear();
    }
    setWeekShown(number);
  }

  function nextYear(){
    let number = yearShown + 1;
    setYearShown(number);
  }

  function previousYear(){
    let number = yearShown - 1;
    setYearShown(number);
  }

  useEffect(() => {
    currentWeek();
    currentYear();
  }, [])

  return (
    <div className={classes.week}>
      <img src={ArrowLeft} alt="Left arrow" className={classes.arrowl} onClick={previousWeek}/>
      <p>Week {weekShown} - {yearShown}</p>
      <img src={ArrowRight} alt="Right arrow" className={classes.arrowr} onClick={nextWeek}/>
    </div>
  );
}

export default TeamPlannerPage;
