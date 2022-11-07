import React from "react";
import './Schedule.css';

import ScheduleDay from "./schedule/ScheduleDay";
import ScheduleToday from "./schedule/ScheduleToday";
import Legend from "./schedule/Legend";

function Schedule() {
    return (<div>
    <ScheduleDay></ScheduleDay>
    <ScheduleToday></ScheduleToday>
    <Legend />
    </div>)
}

export default Schedule;