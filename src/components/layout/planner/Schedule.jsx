import React from "react";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";

var firstDate = firstIndex(new Date());
function Schedule() {
  const navigate = useNavigate();
  return [
    <div className="scheduleMain">
      <h1 className="ScheduleHeader">← January →</h1>
      <div class="daysTable">
        <div class="dayNames"></div>
        <p>Mo</p>
        <p>Tu</p>
        <p>We</p>
        <p>Th</p>
        <p>Fr</p>
        {allDays()}
      </div>
    </div>,
    <button
      className="attendanceBtn"
      onClick={() => navigate("./edit", { replace: true })}
    >
      Edit attendance
    </button>,
    Legend(),
  ];
}

function Legend() {
  return (
    <div className="LegendMain">
      <h1 className="LegendHeader">Legend</h1>
      <div className="LegendBody">
        <ul>
          <li key="1">
            <div className="Office">
              <p>Office</p>
            </div>
          </li>
          <li key="2">
            <div className="Home">
              <p>Home</p>
            </div>
          </li>
          <li key="3">
            <div className="Customer">
              <p>Customer</p>
            </div>
          </li>
          <li key="4">
            <div className="Sick">
              <p>Sick</p>
            </div>
          </li>
          <li key="5">
            <div className="Leave">
              <p>Leave</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function allDays() {
  const availabilityPairs = getUserData();
  let days = [];
  let addDays = 0;
  for (let index = 0; index < 25; index++) {
    days[index] = Day(
      index,
      0,
      0,
      new Date(firstDate.getTime() + 86400000 * addDays)
    );
    if ((index + 1) % 5 === 0) {
      addDays += 3;
    } else if ((index + 1) % 6 !== 0 || (index + 1) % 7 !== 0) addDays++;
  }

  for (let i = 0; i < availabilityPairs.length; i++) {
    const avaPair = availabilityPairs[i];
    let n = findIndexByDate(avaPair[0].dateTime);
    addDays = 0;
    for (let j = 0; j < 25; j++) {
      if (j === n) {
        if (avaPair[1] != null) {
          days[j] = Day(
            j,
            avaPair[0].status,
            avaPair[1].status,
            new Date(firstDate.getTime() + 86400000 * addDays)
          );
        } else {
          const ava = avaPair[0];
          if (ava.beforeMidday)
            days[j] = Day(
              j,
              avaPair[0].status,
              0,
              new Date(firstDate.getTime() + 86400000 * addDays)
            );
          else
            days[j] = Day(
              j,
              0,
              avaPair[0].status,
              new Date(firstDate.getTime() + 86400000 * addDays)
            );
        }
        break;
      }

            if ((j + 1) % 5 === 0) {
                addDays += 3;
            }
            else if ((j + 1) % 6 !== 0 || (j + 1) % 7 !== 0) addDays++;
        }
    }
  }
  return days;
}

function Day(index, morning, noon, date) {
  return (
    <div className="Index" id={date.toISOString().split("T")[0]}>
      <p className="dateNum">{date.getDate()}</p>
      <div
        id={`morning-${index}`}
        style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }}
        className="Top"
      >
        <span class="plannerTooltip">0 people in office</span>
      </div>
      <div
        id={`midday-${index}`}
        style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }}
        className="Bottom"
      >
        <span class="plannerTooltip">0 people in office</span>
      </div>
    </div>
  );
}

function ColorByStatus(status) {
  switch (status) {
    case 0:
      return "gray";
    case 1:
      return "clrOffice";
    case 2:
      return "clrHome";
    case 3:
      return "clrCustomer";
    case 4:
      return "clrSick";
    case 5:
      return "clrLeave";
    default:
      return "gray";
  }
}

function getUserData() {
  // retrieve data here:
  let availabilities = [
    {
      beforeMidday: true,
      dateTime: new Date("2022-11-03"),
      status: 3,
    },
    {
      beforeMidday: false,
      dateTime: new Date("2022-11-03"),
      status: 2,
    },
    {
      beforeMidday: false,
      dateTime: new Date("2022-11-08"),
      status: 4,
    },
    {
      beforeMidday: false,
      dateTime: new Date("2022-10-31"),
      status: 5,
    },
  ];

  // sort array
  let result = [];
  for (let i = 0; i < availabilities.length; i++) {
    const ava = availabilities[i];
    let newIndex = true;
    for (let j = 0; j < result.length; j++) {
      const resultAva = result[j];
      if (isSameDay(resultAva[0].dateTime, ava.dateTime)) {
        result[j] = [resultAva[0], ava];
        newIndex = false;
        break;
      }
    }
    if (newIndex) result.push([ava]);
  }
  return result;
}

function findIndexByDate(date) {
  const index = document.getElementById(
    new Date(date).toISOString().split("T")[0]
  );
  if (index != null) {
    for (const child of index.childNodes) {
      if (child.id.startsWith("morning-")) {
        return Number(child.id.split("-")[1]);
      }
    }
  }
  return -1;
  // TODO: have this return the index in the planner based on the given date.
}

function isSameDay(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function firstIndex(date) {
    const now = new Date(date);
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const day = firstDay.getDay();
    let diff = firstDay.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(now.setDate(diff));
}
export default Schedule;
