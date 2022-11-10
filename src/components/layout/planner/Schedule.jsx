import React from "react";
import './Schedule.css';

import ScheduleDay from "./ScheduleDay";
import ScheduleToday from "./ScheduleToday";
import Legend from "./Legend";

function Schedule() {
    return (
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
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
  </div>
</div>)
}

export default Schedule;