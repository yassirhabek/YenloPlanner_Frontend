import React, { useState }  from "react";
import './Schedule.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function EditSchedule() {
    var selectedIndex = 0;
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(location.state.dateOfMonth);
    const [monthName, setMonthName] = useState(nameOfMonth(selectedDate));
    const [userAvailabilities, setAvailabilities] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getUserData();
    }, [monthName]);

    setTimeout(function () {
        const days = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
        for (let day of days) {
            day.addEventListener("click", setDate, false);
        }
    }, 100);

    return [
        <div className="scheduleMain">
            <h1 className="ScheduleHeader">{monthName}{" "}
                </h1>
            <div class="daysTable">
                <div class="dayNames">
                </div>
                <p>Mo</p>
                <p>Tu</p>
                <p>We</p>
                <p>Th</p>
                <p>Fr</p>
                {allDays()}
            </div>
        </div>,
        <button className="cancel" onClick={() => { if (window.confirm("You are about to discard unsaved changes. Are you sure you want to cancel?")) navigate("/user-planner", { replace: true }); }}>Cancel</button>,
        <button className="confirm" onClick={() => { submit(); }}>Save</button>,
        Legend()]


    function Legend() {
        return (<div className="LegendMain">
            <h1 className="LegendHeader">Select status</h1>
            <div className="LegendBody" style={{ height: "100%" }}>
                <ul>
                    <li key="1">
                        <div className="Office Hoverable" id="legend-box-1" onClick={(event) => select(event, 1)} style={{ backgroundColor: "var(--clrOffice)" }}>
                            <p>Office</p>
                        </div>
                    </li>
                    <li key="2">
                        <div className="Home Hoverable" id="legend-box-2" onClick={(event) => select(event, 2)} style={{ backgroundColor: "var(--clrHome)" }}>
                            <p>Home</p>
                        </div>
                    </li>
                    <li key="3">
                        <div className="Customer Hoverable" id="legend-box-3" onClick={(event) => select(event, 3)} style={{ backgroundColor: "var(--clrCustomer)" }}>
                            <p>Customer</p>
                        </div>
                    </li>
                    <li key="4">
                        <div className="None Hoverable" id="legend-box-0" onClick={(event) => select(event, 0)} style={{ backgroundColor: "var(--gray)" }}>
                            <p>None</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>)
    }

    function submit() {
        const dayParts = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
        let attendances = [];
        const user = 1;
        dayParts.forEach(d => {
            if (d.dataset.id != undefined) {
                let morning = d.id.split('-')[0] === "morning";
                attendances.push({
                    user: {
                        id: user
                    },
                    id: d.dataset.id,
                    beforeMidday: morning,
                    dateTime: new Date(d.parentElement.id),
                    status: d.dataset.status
                });
            }
        });

        const id = 1;
        fetch(`http://localhost:8080/availability/add/month`, {
            method: 'PUT', body: attendances, 
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.status === 200) {
            navigate("/user-planner", { replace: true });
        }}
    ).catch(err => alert("Something went wrong while trying to process your request. Please try again."));

    }

    function setDate(event) {
        var clickedElement = document.getElementById(event.currentTarget.id);

        if (clickedElement.dataset.status === "4" || clickedElement.dataset.status === "5") {
            alert("You are marked as '" + `${StatusToText(Number(clickedElement.dataset.status))}` + "' at this time. This status cannot be overriden.");
            return;
        }

        const date = clickedElement.parentElement.id;
        const morning = (clickedElement.id.split("-")[0] === "morning");
        const status = selectedIndex;
        
        clickedElement.dataset.status = selectedIndex;
        clickedElement.style.backgroundColor = `var(--${ColorByStatus(selectedIndex)})`;
    }

    function select(e, index) {
        var prevSelection = document.getElementById("legend-box-" + selectedIndex)
        var clickedElement = document.getElementById(e.currentTarget.id);

        if (prevSelection != null)
            prevSelection.classList.remove("selectedBox");

        clickedElement.classList.add("selectedBox")
        
        selectedIndex = index;
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
                            new Date(firstDate.getTime() + 86400000 * addDays),
                            avaPair[0].id,
                            avaPair[1].id
                        );
                    } else {
                        const ava = avaPair[0];
                        if (ava.beforeMidday)
                            days[j] = Day(
                                j,
                                avaPair[0].status,
                                0,
                                new Date(firstDate.getTime() + 86400000 * addDays),
                                avaPair[0].id,
                                -1
                            );
                        else
                            days[j] = Day(
                                j,
                                0,
                                avaPair[0].status,
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
                    id={`morning-${index}`} data-status={morning} data-id={id1}
                    style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }}
                    className={topClass}
                >
                    <span class="plannerTooltip">0 people in office</span>
                </div>
                <div
                    id={`midday-${index}`} data-status={noon} data-id={id2}
                    style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }}
                    className={bottomClass}
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

    function StatusToText(status) {
        switch (status) {
            case 0:
                return "none";
            case 1:
                return "at office";
            case 2:
                return "at home";
            case 3:
                return "at customer";
            case 4:
                return "sick";
            case 5:
                return "on leave";
            default:
                return "undefined";
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
        let from = firstIndex(selectedDate).toISOString().split('T')[0].replaceAll('-', '/');
        let to = new Date(firstIndex(selectedDate).getTime() + 86400000 * 32).toISOString().split('T')[0].replaceAll('-', '/');
    
        let id = 1;
        let url = `http://localhost:8080/availability/between?user_id=${id}&start_date=${from}&end_date=${to}`;
    
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let availabilities = [];
            data.availabilities.forEach(ava => {
              availabilities.push({
                id: ava.id,
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
          default: return 0;
        }
      }
}


export default EditSchedule;