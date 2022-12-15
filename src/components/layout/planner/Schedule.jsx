import React, { useState } from "react";
import "./Schedule.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../../store/logged-in-context";

function Schedule() {
  const userCtx = useContext(UserContext);
  const {state} = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthName, setMonthName] = useState(nameOfMonth(selectedDate));
  const [userAvailabilities, setAvailabilities] = useState([]);
  const [inOfficeData, setInOffice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();

    var tooltips = document.getElementsByClassName('plannerTooltip');
    for (let i = 0; i < tooltips.length; i++) {
      let tt = tooltips[i];
      document.addEventListener("mousemove", function (e) {
        let left = e.pageX;
        let top = e.pageY;
        tt.style.left = left + 'px';
        tt.style.top = top + 'px';
      });
    }

  }, [monthName, state]);

  let editBtn = (<button
    className="attendanceBtn"
    onClick={() =>
      navigate("./edit", {
        replace: true,
        state: { dateOfMonth: selectedDate, user: userCtx.user },
      })
    }
  >
    Edit attendance
  </button>);
  let info = "";
  if (2 === 1) {
    editBtn = "";
    info = <div className="UserInfo">Now viewing <b>{state.user.name}'s</b> attendance</div>;
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
    info,
    editBtn,
    Legend(),
  ];

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

    let inOfficeT = 0;
    let inOfficeB = 0;
    for (let i = 0; i < inOfficeData.length; i++) {
      const o = inOfficeData[i];
      if (new Date(o.date).toISOString().split("T")[0] === new Date(date).toISOString().split("T")[0]) {
        if ((o.id + 1) % 2 === 0) {
          inOfficeB = o.value;
        }
        if ((o.id + 1) % 2 !== 0) {
          inOfficeT = o.value;
        }
      }
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
        >
          <span class="plannerTooltip">{inOfficeT} {inOfficeT != 1 ? 'people' : 'person'} in office</span>
        </div>
        <div
          id={`midday-${index}`}
          style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }}
          className={bottomClass}
        >
          <span class="plannerTooltip">{inOfficeB} {inOfficeB != 1 ? 'people' : 'person'} in office</span>
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

  function getStatus(dbName) {
    switch (dbName) {
      case "NIKS":
        return 0;
      case "OFFICE":
        return 1;
      case "HOME":
        return 2;
      case "CUSTOMER":
        return 3;
      case "SICK":
        return 4;
      case "LEAVE":
        return 5;
      default:
        return 0;
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
        return "Unkown month";
    }
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

    let url = `http://localhost:8080/availability/between?user_id=${userCtx.user.id}&start_date=${from}&end_date=${to}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let availabilities = [];
        data.availabilities.forEach((ava) => {
          availabilities.push({
            beforeMidday: ava.beforeMidday,
            dateTime: ava.dateTime,
            status: getStatus(ava.status)
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
      let to2 = new Date(firstIndex(selectedDate).getTime() + 86400000 * 32 + 86400000)
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "/");
      fetch(`http://localhost:8080/availability/office?user_id=${userCtx.user.id}&start_date=${from}&end_date=${to2}`)
      .then((response) => response.json())
      .then((data2) => {
        let inOffice = [];
        data2.forEach((o) => {
          inOffice.push({id: o.id, date: o.date, value: o.inOffice});
        });
        setInOffice(inOffice);
      });
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

export default Schedule;
