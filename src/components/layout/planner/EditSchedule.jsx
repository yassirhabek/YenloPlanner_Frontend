import React, { useState } from "react";
import "./Schedule.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { click } from "@testing-library/user-event/dist/click";

function EditSchedule() {
    var selectedIndex = 0;
    const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(location.state.dateOfMonth);
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
    }, [monthName]);

    setTimeout(function () {
        const days = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
        for (let day of days) {
            day.removeEventListener("click", leftClick, false);
            day.addEventListener("click", leftClick, false);
        }
    }, 100);



    return [
        <div className="scheduleMain">
            <h1 className="ScheduleHeader">{monthName} </h1>
            <div class="background">
                <div class="daysTable">
                    <p>Mo</p>
                    <p>Tu</p>
                    <p>We</p>
                    <p>Th</p>
                    <p>Fr</p>
                    {allDays()}
                </div>
            </div>
        </div>,
        <button
            className="cancel"
            onClick={() => {
                if (
                    window.confirm(
                        "You are about to discard unsaved changes. Are you sure you want to cancel?"
                    )
                )
                    navigate("/user-planner", { replace: true });
            }}
        >
            Cancel
        </button>,
        <button
            className="confirm"
            onClick={() => {
                submit();
            }}
        >
            Save
        </button>,
        Legend(),
    ];

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
        let putAttendance = [];
        let postAttendance = [];
        let deleteAttendance = [];
        const user = 3;
        dayParts.forEach(d => {
            let morning = d.id.split('-')[0] === "morning";
            if (d.dataset.id != undefined) {
                if (/*d.dataset.status != "0"*/ true) {
                    putAttendance.push({
                        id: Number(d.dataset.id),
                        user: {
                            id: user
                        },
                        beforeMidday: Number(morning),
                        dateTime: new Date(d.parentElement.id).toISOString().split('T')[0] + "T00:00:00.000+01:00",
                        status: getDBName(Number(d.dataset.status))
                    });
                } else {
                    deleteAttendance.push(Number(d.dataset.id));
                }
            } else {
                if (d.dataset.status != "0") {
                    postAttendance.push({
                        user: {
                            id: user
                        },
                        beforeMidday: Number(morning),
                        dateTime: new Date(d.parentElement.id).toISOString().split('T')[0] + "T00:00:00.000+01:00",
                        status: getDBName(Number(d.dataset.status))
                    });
                }
            }
        });

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
                                navigate("/user-planner", { replace: true });
                            }
                        }
                        ).catch(err => alert("Something went wrong while trying to process your request. Please try again."));
                }
            }
            ).catch(err => alert("Something went wrong while trying to process your request. Please try again."));
    }

    function rightClick (e) {
        var clickedElement = document.getElementById(e.currentTarget.id);
        e.preventDefault();
        changeDate(clickedElement, 0);
        return false;
    };


    function leftClick(event) {
        var clickedElement = document.getElementById(event.currentTarget.id);
        changeDate(clickedElement, selectedIndex);
    }

    function changeDate(clickedElement, index) {

    if (
            clickedElement.dataset.status === "4" ||
            clickedElement.dataset.status === "5"
        ) {
            alert(
                "You are marked as '" +
                `${StatusToText(Number(clickedElement.dataset.status))}` +
                "' at this time. This status cannot be overriden."
            );
            return;
        }

        const date = clickedElement.parentElement.id;
        const morning = clickedElement.id.split("-")[0] === "morning";
        const status = selectedIndex;

        clickedElement.dataset.status = index;
        clickedElement.style.backgroundColor = `var(--${ColorByStatus(
            index
        )})`;
    }

    function select(e, index) {
        var prevSelection = document.getElementById("legend-box-" + selectedIndex);
        var clickedElement = document.getElementById(e.currentTarget.id);

        if (prevSelection != null) prevSelection.classList.remove("selectedBox");

        clickedElement.classList.add("selectedBox");

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
                console.log(o);
            }
        }

        return (
            <div className="Index" id={date.toISOString().split("T")[0]}>
                <p className="dateNum" style={textStyle}>
                    {date.getDate()}
                </p>
                <div onContextMenu={rightClick}
                    id={`morning-${index}`}
                    data-status={morning}
                    data-id={id1}
                    style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }}
                    className={topClass}
                >
                    <span class="plannerTooltip">{inOfficeT} people in office</span>
                </div>
                <div onContextMenu={rightClick}
                    id={`midday-${index}`}
                    data-status={noon}
                    data-id={id2}
                    style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }}
                    className={bottomClass}
                >
                    <span class="plannerTooltip">{inOfficeB} people in office</span>
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
        let from = firstIndex(selectedDate)
            .toISOString()
            .split("T")[0]
            .replaceAll("-", "/");
        let to = new Date(firstIndex(selectedDate).getTime() + 86400000 * 32)
            .toISOString()
            .split("T")[0]
            .replaceAll("-", "/");

        let id = 3;
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
                        status: getStatus(ava.status),
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
      fetch(`http://localhost:8080/availability/office?user_id=${id}&start_date=${from}&end_date=${to2}`)
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

    function getDBName(status) {
        switch (status) {
            case 0:
                return "NIKS";
            case 1:
                return "OFFICE";
            case 2:
                return "HOME";
            case 3:
                return "CUSTOMER";
            case 4:
                return "SICK";
            case 5:
                return "LEAVE";
            default: return 0;
        }
    }
}

export default EditSchedule