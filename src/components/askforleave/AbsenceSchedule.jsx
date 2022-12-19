import React, { useState, useEffect } from "react";
import "./AbsenceSchedule.css";
import { useNavigate, useLocation } from "react-router-dom";

function AbsenceSchedule() {
  var selectedIndex = 1;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabled, setDisabled] = useState(true);
  const [monthName, setMonthName] = useState(nameOfMonth(selectedDate));
  const [userAvailabilities, setAvailabilities] = useState([]);
  const [managers, setBeschikbareManagers] = useState([]);

  useEffect(() => {
    getAllProjectManagers();
    getUserData();
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

  function setDate(event) {
    var clickedElement = document.getElementById(event.currentTarget.id);

    if (clickedElement.dataset.id != undefined && clickedElement.dataset.status === "true") {
      alert("Cannot edit existing mark. Please contact your project manager if you believe this is an error.");
      return;
    }
    const d = new Date(new Date(clickedElement.parentElement.id).toISOString().split('T')[0] + "T00:00:00.000+01:00");
    if (d < Date.now() && !isSameDay(d, Date.now())) {
      alert("Cannot request absence for past days.");
      return;
    }

    if (clickedElement.dataset.status === "1") {
      clickedElement.dataset.status = 0;
      clickedElement.style.backgroundColor = `var(--${ColorByStatus(
        0
      )})`;
    } else {
      clickedElement.dataset.status = selectedIndex;
      clickedElement.style.backgroundColor = `var(--${ColorByStatus(
        selectedIndex
      )})`;
    }
  }

  return [
    <div className="scheduleMain">
      <h1 className="ScheduleHeader">
        <a onClick={() => moveMonths(-1)}>←</a> {monthName}{" "}
        <a onClick={() => moveMonths(1)}>→</a>{" "}
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


  function submitAbsence() {
    const dayParts = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
    let putAttendance = [];
    let postAttendance = [];
    let deleteAttendance = [];
    const user = location.state.user.id;
    dayParts.forEach(d => {
      let morning = d.id.split('-')[0] === "morning";
      if (d.dataset.id != undefined) {
        if (d.dataset.status != "false") {
          putAttendance.push({
            id: Number(d.dataset.id),
            user: {
              id: user
            },
            beforeMidday: Number(morning),
            dateTime: new Date(d.parentElement.id).toISOString().split('T')[0] + "T00:00:00.000+01:00",
            status: "LEAVE"
          });
        } else {
          deleteAttendance.push(Number(d.dataset.id));
        }
      } else {
        if (d.dataset.status != "false") {
          postAttendance.push({
            user: {
              id: user
            },
            beforeMidday: Number(morning),
            dateTime: new Date(d.parentElement.id).toISOString().split('T')[0] + "T00:00:00.000+01:00",
            status: "LEAVE"
          });
        }
      }
    });

    console.log(putAttendance);
    console.log(postAttendance);
    // put
    fetch(`http://localhost:8080/availability/update/month`, {
      method: 'PUT', body: JSON.stringify(putAttendance),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 200) {
          fetch(`http://localhost:8080/availability/add/week`, {
            method: 'POST', body: JSON.stringify(postAttendance),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => {
              if (response.status === 200) {
                navigate("/ask-for-leave", { replace: true, state: { user: location.state.user } });
              }
            }
            ).catch(err => alert("Something went wrong while trying to process your request. Please try again."));
        }
      }
      ).catch(err => alert("Something went wrong while trying to process your request. Please try again."));
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
              avaPair[0].onLeave,
              avaPair[1].onLeave,
              new Date(firstDate.getTime() + 86400000 * addDays),
              avaPair[0].id,
              avaPair[1].id
            );
          } else {
            const ava = avaPair[0];
            if (ava.beforeMidday)
              days[j] = Day(
                j,
                avaPair[0].onLeave,
                0,
                new Date(firstDate.getTime() + 86400000 * addDays),
                avaPair[0].id,
                -1
              );
            else
              days[j] = Day(
                j,
                0,
                avaPair[0].onLeave,
                new Date(firstDate.getTime() + 86400000 * addDays),
                -1,
                avaPair[0].id
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

  function Day(index, morning, noon, date, id1, id2) {
    var topClass = "Top";
    var bottomClass = "Bottom";
    var textStyle = {};
    let clr1 = ColorByStatus(morning);
    let clr2 = ColorByStatus(noon);
    if (isSameDay(date, Date.now())) {
      topClass = "TopToday";
      bottomClass = "BottomToday";
      textStyle = { fontWeight: "bold" };
    } else if (date < Date.now()) {
      if (!morning)
      clr1 = "clrUnclickableGray"
      
      if (!noon)
      clr2 = "clrUnclickableGray"
    }

    if (morning)
    clr1 = "clrUnclickableLeave"
    
    if (noon)
    clr2 = "clrUnclickableLeave"

    return (
      <div className="Index" id={date.toISOString().split("T")[0]}>
        <p className="dateNum" style={textStyle}>
          {date.getDate()}
        </p>
        <div onClick={setDate}
          id={`morning-${index}`}
          data-status={morning}
          data-id={id1}
          style={{ backgroundColor: `var(--${clr1})` }}
          className={topClass}
        ></div>
        <div onClick={setDate}
          id={`midday-${index}`}
          data-status={noon}
          data-id={id2}
          style={{ backgroundColor: `var(--${clr2})` }}
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
        return status ? "clrLeave" : "gray";
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

  function getUserData() {
    // retrieve data here:
    let from = firstIndex(selectedDate)
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "/");
    let to = new Date(firstIndex(selectedDate).getTime() + 86400000 * 32)
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "/");

    let id = location.state.user.id;
    let url = `http://localhost:8080/availability/between?user_id=${id}&start_date=${from}&end_date=${to}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let availabilities = [];
        data.availabilities.forEach((ava) => {
          availabilities.push({
            id: ava.id,
            beforeMidday: ava.beforeMidday,
            dateTime: ava.dateTime,
            onLeave: ava.status === "LEAVE",
          });
        });

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
        setAvailabilities(result);
      });
  }
}

export default AbsenceSchedule;
