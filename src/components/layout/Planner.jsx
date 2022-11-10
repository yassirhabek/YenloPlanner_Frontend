import React from "react";
import './Planner.css';

import Schedule from "./planner/Schedule";
import Legend from "./planner/Legend";

function Planner() {
    return (
        <div>
            <div className="Schedule">
                <Schedule></Schedule>
            </div>
            <div className="Legend">
            </div>
        </div>
    )
}

export default Planner;