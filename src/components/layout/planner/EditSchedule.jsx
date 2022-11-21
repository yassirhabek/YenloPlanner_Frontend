import React from "react";
import './Schedule.css';
import { useNavigate } from "react-router-dom";


var selectedIndex = 0;
function EditSchedule() {
    const navigate = useNavigate();
    setTimeout(function () {
        const days = document.querySelectorAll('[id^="morning-"], [id^="midday-"]');
        for (let day of days) {
            day.addEventListener("click", setDate);
        }
    }, 100);

    return [
        <div className="scheduleMain">
            <h1 className="ScheduleHeader">← January →</h1>
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
        <button className="confirm" onClick={() => { navigate("/user-planner", { replace: true }); submit(); } }>Save</button>,
        Legend()]
}

function Legend() {
    return (<div className="LegendMain">
        <h1 className="LegendHeader">Select status</h1>
        <div className="LegendBody" style={{height: "100%"}}>
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
    alert("submit functionality");
}

function allDays() {
    const availabilityPairs = getUserData();
    let days = [];
    for (let index = 0; index < 25; index++) {
        days[index] = Day(index, 0, 0);
    }

    for (let i = 0; i < availabilityPairs.length; i++) {
        const avaPair = availabilityPairs[i];
        let n = findIndexByDate(avaPair[0].dateTime);
        for (let j = 0; j < 25; j++) {
            if (j === n) {
                if (avaPair[1] != null) {
                    days[j] = Day(j, avaPair[0].status, avaPair[1].status);
                }
                else {
                    const ava = avaPair[0];
                    if (ava.beforeMidday)
                        days[j] = Day(j, avaPair[0].status, 0);
                    else 
                    days[j] = Day(j, 0, avaPair[0].status);
                }
                break;
            }
        }
    }
    return days;
}

function Day(index, morning, noon) {
    return <div className="Index">
        <p className="dateNum">99</p>
        <div id={`morning-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }} className="Top">
            <span class="plannerTooltip">0 people in office</span>
        </div>
        <div id={`midday-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }} className="Bottom">
            <span class="plannerTooltip">0 people in office</span>
        </div>
    </div>;
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
            return "clrLeave"
        default:
            return "gray";
    }
}

function getUserData() {
    // retrieve data here:
    let availabilities = [
        {
            beforeMidday: true,
            dateTime: new Date('2022-11-24'),
            status: 3
        },
        {
            beforeMidday: false,
            dateTime: Date.now(),
            status: 2
        },
        {
            beforeMidday: false,
            dateTime: new Date('2022-11-24'),
            status: 2
        }
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
        if (newIndex)
            result.push([ava]);
    }
    return result;
}

function fillPlannerWithDates() {
    // TODO: have this fill every index of the planner page with the correct datetime.
}

function findIndexByDate(date) {
    return Math.floor(Math.random() * 25);
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

function setDate(event) {
    var clickedElement = document.getElementById(event.currentTarget.id);
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


export default EditSchedule;