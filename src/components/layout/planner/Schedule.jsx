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
    const availabilities = getUserData();
    let days = [];
    for (let index = 0; index < 25; index++) {
        for (let i = 0; i < availabilities.length; i++) {
            const ava = availabilities[i];
            if (findIndexByDate(ava.dateTime) === index) {
                // TODO: this. :-(
                if (ava.beforeMidday) {
                    days[index] = Day(index, ava.status, 0);
                } else 
                days[index] = Day(index, 0, ava.status);
                break;
            }
            days[index] = Day(index, 0, 0);
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
    }
}

function getUserData() {
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
        }
    ]
    return availabilities;
}

function fillPlannerWithDates() {
    // TODO: have this fill every index of the planner page with the correct datetime.
}

function findIndexByDate(date) {
    return Math.floor(Math.random() * 51);
    // TODO: have this return the index in the planner based on the given date.
}
export default Schedule;