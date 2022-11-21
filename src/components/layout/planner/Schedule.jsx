import React from "react";
import './Schedule.css';
import { useNavigate } from "react-router-dom";


function Schedule() {
    const navigate = useNavigate();
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
        <button className="attendanceBtn" onClick={() => navigate("./edit", { replace: true })}>Edit attendance</button>,
        Legend()]
}

function Legend() {
    return (<div className="LegendMain">
        <h1 className="LegendHeader">Legend</h1>
        <div className="LegendBody">
            <ul>
                <li key="1">
                    <div className="Entry">
                        <p>Office</p> <div className="Box" id="legend-box-1" style={{ backgroundColor: "var(--clrOffice)" }}></div>
                    </div>
                </li>
                <li key="2">
                    <div className="Entry">
                        <p>Home</p> <div className="Box" id="legend-box-2" style={{ backgroundColor: "var(--clrHome)" }}></div>
                    </div>
                </li>
                <li key="3">
                    <div className="Entry">
                        <p style={{ paddingTop: 30 }}>At Customer</p> <div className="Box" id="legend-box-3" style={{ backgroundColor: "var(--clrCustomer)" }}></div>
                    </div>
                </li>
                <li key="4">
                    <div className="Entry">
                        <p>Sick</p> <div className="Box" id="legend-box-4" style={{ backgroundColor: "var(--clrSick)" }}></div>
                    </div>
                </li>
                <li key="5">
                    <div className="Entry">
                        <p>Leave</p> <div className="Box" id="legend-box-5" style={{ backgroundColor: "var(--clrLeave)" }}></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>)
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
export default Schedule;