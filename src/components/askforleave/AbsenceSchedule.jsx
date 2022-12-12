import React, { useState, useEffect } from "react";
import "./AbsenceSchedule.css";

function AbsenceSchedule() {
  var selectedIndex = 1;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const [monthName, setMonthName] = useState(nameOfMonth(selectedDate));
  const [userAvailabilities, setAvailabilities] = useState([]);
  const [managers, setBeschikbareManagers] = useState([]);

  useEffect(() => {
    getAllProjectManagers();
  }, []);

  async function getAllProjectManagers() {
    const ManagerOptions = [];
    try {
      const response = await fetch("http://localhost:8080/user/managers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json",
      });
      var result = await response.json();

      result.map((value) => {
        const object = { label: value.name, id: value.id };
        ManagerOptions.push(object);
      });

      setBeschikbareManagers(ManagerOptions);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  }

  setTimeout(function () {
    const days = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
    for (let day of days) {
      day.addEventListener("click", setDate, false);
    }
  }, 100);

  function setDate(event) {
    var clickedElement = document.getElementById(event.currentTarget.id);

    if (clickedElement.dataset.status === "1") {
        clickedElement.dataset.status = 0;
        clickedElement.style.backgroundColor = `var(--${ColorByStatus(
          0
        )})`;
    } else {
        setDisabled(false);
      clickedElement.dataset.status = selectedIndex;
      clickedElement.style.backgroundColor = `var(--${ColorByStatus(
        selectedIndex
      )})`;
    }
  }

  return [
    <div className="scheduleMain">
      <h1 className="ScheduleHeader">
        <a onClick={() => disabled ? moveMonths(-1) : ""}>←</a> {monthName}{" "}
        <a onClick={() => disabled ? moveMonths(1) : ""}>→</a>{" "}
      </h1>
      <div className="background">
        <div className="daysTable">
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          {allDays()}
        </div>
      </div>
    </div>,
    requestAbsence(),
  ];


  function submitAbsence(){
    alert("Send request to PM");
    setDisabled(true);
    allDays();
  }

  function requestAbsence() {
    return (
      <div>
        <h1 className="projectManagerHeader">Project Manager</h1>
        <div className="projectManagerInput">
          <select name="projectManager" id="projectManager">
            {managers.map((manager) => {
              return (
                <option value={manager.label} key={manager.id}>
                  {manager.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="absencetext">
          <p>Click on the dates you want to request a leave for.</p>
        </div>
        <div className="reasonAbsenceInput">
          <select name="reasonAbsence" id="reasonAbsence">
            <option value="Vacation" key={1}>
              Vacation
            </option>
            <option value="Medical" key={2}>
              Medical appointment
            </option>
            <option value="Child" key={3}>
              Maternity/Paternity
            </option>
            <option value="Unpaid" key={3}>
              Unpaid leave
            </option>
          </select>
        </div>
        <div className="inputabsence">
          <textarea rows={5} placeholder={"Reason for absence"}></textarea>
        </div>
        <button
          className="absenceBtn"
          onClick={() => submitAbsence()}
        >
          Send request of absence
        </button>
      </div>
    );
  }

  function allDays() {
    var firstDate = firstIndex(selectedDate);
    const availabilityPairs = userAvailabilities;
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
      } else if ((index + 1) % 6 != 0 || (index + 1) % 7 != 0) addDays++;
    }

    for (let i = 0; i < availabilityPairs.length; i++) {
      const avaPair = availabilityPairs[i];
      let n = findIndexByDate(avaPair[0].dateTime, days);
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
        } else if ((j + 1) % 6 != 0 || (j + 1) % 7 != 0) addDays++;
      }
    }
    return days;
  }

  function Day(index, morning, noon, date) {
    var topClass = "Top";
    var bottomClass = "Bottom";
    var textStyle = {};
    if (isSameDay(date, Date.now())) {
      topClass = "TopToday";
      bottomClass = "BottomToday";
      textStyle = { fontWeight: "bold" };
    }
    return (
      <div className="Index" id={date.toISOString().split("T")[0]}>
        <p className="dateNum" style={textStyle}>
          {date.getDate()}
        </p>
        <div
          id={`morning-${index}`}
          style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }}
          className={topClass}
        ></div>
        <div
          id={`midday-${index}`}
          style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }}
          className={bottomClass}
        ></div>
      </div>
    );
  }

  function ColorByStatus(status) {
    switch (status) {
      case 0:
        return "gray";
      case 1:
        return "clrLeave";
      default:
        return "gray";
    }
  }

  function moveMonths(amount) {
    let newMonth = selectedDate.getMonth() + amount;
    let yearsToAdd = 0;
    if (amount > 0) {
      for (let i = 0; newMonth > 12; i++) {
        newMonth = newMonth - 12;
        yearsToAdd++;
      }
    } else if (amount < 0) {
      for (let i = 0; newMonth < 1; i++) {
        newMonth = newMonth + 12;
        yearsToAdd--;
      }
    }
    var d = selectedDate;
    d.setMonth(newMonth);
    d.setFullYear(selectedDate.getFullYear() + yearsToAdd);
    setSelectedDate(d);
    setMonthName(nameOfMonth(d));
  }

  function nameOfMonth(date) {
    switch (new Date(date).getMonth()) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Unknown month";
    }
  }

  function findIndexByDate(date, allDays) {
    let res = -1;
    allDays.forEach((d) => {
      if (d.props.id === new Date(date).toISOString().split("T")[0]) {
        res = Number(d.props.children[1].props.id.split("-")[1]);
      }
    });
    return res;
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
    let diff = firstDay.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  }
}

export default AbsenceSchedule;
