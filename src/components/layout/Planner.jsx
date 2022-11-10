import React from "react";
import './Planner.css';

import Schedule from "./planner/Schedule";
import Legend from "./planner/Legend";

function Planner() {
    return (
        <div>
            <Schedule></Schedule>
            <Legend></Legend>
        </div>
    )
}

export default Planner;