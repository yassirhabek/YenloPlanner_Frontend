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
        <button className="smallScheduleBtn cancel" onClick={() => { if (window.confirm("You are about to discard unsaved changes. Are you sure you want to cancel?")) navigate("/user-planner", { replace: true }); }}>Cancel</button>,
        <button className="smallScheduleBtn confirm" onClick={() => { navigate("/user-planner", { replace: true }); submit(); } }>Save</button>,
        Legend()]
}

function Legend() {
    return (<div className="LegendMain">
        <h1 className="LegendHeader">Select status</h1>
        <div className="LegendBody" style={{height: "100%"}}>
            <ul>
                <li key="1">
                    <div className="Entry">
                        <p>Office</p> <div className="Box Hoverable" id="legend-box-1" onClick={(event) => select(event, 1)} style={{ backgroundColor: "var(--clrOffice)" }}></div>
                    </div>
                </li>
                <li key="2">
                    <div className="Entry">
                        <p>Home</p> <div className="Box Hoverable" id="legend-box-2" onClick={(event) => select(event, 2)} style={{ backgroundColor: "var(--clrHome)" }}></div>
                    </div>
                </li>
                <li key="3">
                    <div className="Entry">
                        <p style={{ paddingTop: 30 }}>At Customer</p> <div className="Box Hoverable" id="legend-box-3" onClick={(event) => select(event, 3)} style={{ backgroundColor: "var(--clrCustomer)" }}></div>
                    </div>
                </li>
                <li key="4">
                    <div className="Entry">
                        <p>None</p> <div className="Box Hoverable selectedBox" id="legend-box-0" onClick={(event) => select(event, 0)} style={{ backgroundColor: "var(--gray)" }}></div>
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
    let days = [];
    for (let index = 0; index < 25; index++) {
        days[index] = Day(index, 1, 1);
    }
    return days;
}

function Day(index, morning, noon) {
    return <div className="Index">
        <p className="dateNum">99</p>
        <div id={`morning-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }} className="Top Hoverable"></div>
        <div id={`midday-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }} className="Bottom Hoverable"></div>
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