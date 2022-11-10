import React from "react";
import './Schedule.css';

import ScheduleDay from "./ScheduleDay";
import ScheduleToday from "./ScheduleToday";
import Legend from "./Legend";

function Schedule() {
    return (
<div>
  <div className="Schedule grid">
    <h1 className="ScheduleHeader">← January →</h1>
    <div class="week">
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
        <ScheduleDay></ScheduleDay>
    </div>
  </div>
</div>)
}

export default Schedule;