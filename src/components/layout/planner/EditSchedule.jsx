import React from "react";
import './Schedule.css';
import { useNavigate } from "react-router-dom";

var firstDate = firstIndex(new Date());
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
    let addDays = 0;
    for (let index = 0; index < 25; index++) {
        days[index] = Day(index, 0, 0, new Date(firstDate.getTime() + 86400000 * addDays));
        if ((index + 1) % 5 === 0) {
            addDays += 3;
        }
        else if ((index + 1) % 6 != 0 || (index + 1) % 7 != 0) addDays++;
    }

    for (let i = 0; i < availabilityPairs.length; i++) {
        const avaPair = availabilityPairs[i];
        let n = findIndexByDate(avaPair[0].dateTime, days);
        addDays = 0;
        for (let j = 0; j < 25; j++) {
            console.log({j, n});
            if (j === n) {
                if (avaPair[1] != null) {
                    days[j] = Day(j, avaPair[0].status, avaPair[1].status, new Date(firstDate.getTime() + 86400000 * addDays));
                }
                else {
                    const ava = avaPair[0];
                    if (ava.beforeMidday)
                        days[j] = Day(j, avaPair[0].status, 0, new Date(firstDate.getTime() + 86400000 * addDays));
                    else
                        days[j] = Day(j, 0, avaPair[0].status, new Date(firstDate.getTime() + 86400000 * addDays));
                }
                break;
            }

            if ((j + 1) % 5 === 0) {
                addDays += 3;
            }
            else if ((j + 1) % 6 != 0 || (j + 1) % 7 != 0) addDays++;
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
        textStyle= {fontWeight:"bold"};
    }
    return <div className="Index" id={date.toISOString().split('T')[0]}>
        <p className="dateNum" style={textStyle}>{date.getDate()}</p>
        <div id={`morning-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(morning)})` }} className={topClass}>
            <span class="plannerTooltip">0 people in office</span>
        </div>
        <div id={`midday-${index}`} style={{ backgroundColor: `var(--${ColorByStatus(noon)})` }} className={bottomClass}>
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

function findIndexByDate(date, allDays) {
    let res = -1;
    allDays.forEach(d => {
        if (d.props.id === (new Date(date).toISOString().split('T')[0])) {
            res = Number(d.props.children[1].props.id.split('-')[1]);
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