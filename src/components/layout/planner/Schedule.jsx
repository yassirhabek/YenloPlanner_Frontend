import React from "react";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();
  return [
    <div className="scheduleMain">
      <h1 className="ScheduleHeader">← January →</h1>
      <div class="daysTable">
        <div class="dayNames" />
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
  let days = [];
  for (let index = 0; index < 25; index++) {
    days[index] = Day(index, 1, 1);
  }
  return days;
}

function Day(index, morning, noon) {
  return (
    <div className="Index">
      <p className="dateNum">99</p>
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

export default Schedule;
