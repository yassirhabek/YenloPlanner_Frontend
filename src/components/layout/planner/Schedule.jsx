import React from "react";
import './Schedule.css';

import ScheduleDay from "./ScheduleDay";
import ScheduleToday from "./ScheduleToday";
import Legend from "./Legend";

function Schedule() {
    return (
        <div>
<div class="container" className="Schedule">
        <div class="row">
            <h1 className="ScheduleHeader">← January →</h1>
        </div>
  <div class="row">
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
    <div class="col-md-3">
        <ScheduleDay></ScheduleDay>
    </div>
  </div>
  </div>
</div>)
}

export default Schedule;