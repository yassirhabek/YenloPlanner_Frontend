import React from "react";
import './Legend.css';

function Legend() {
    return (<div className="Align">
        <h1>Legend</h1>
        <div className="LegendBody">
        <ul>
            <li>
                <div className="Entry">
                <p>Office</p> <div className="Box" style={{backgroundColor: "var(--clrOffice)"}}></div>
                </div>
            </li>
            <li>
                <div className="Entry">
                <p>Home</p> <div className="Box" style={{backgroundColor: "var(--clrHome)"}}></div>
                </div>
            </li>
            <li>
                <div className="Entry">
                <p style={{paddingTop: 30}}>At Customer</p> <div className="Box" style={{backgroundColor: "var(--clrCustomer)"}}></div>
                </div>
            </li>
            <li>
                <div className="Entry">
                <p>Sick</p> <div className="Box" style={{backgroundColor: "var(--clrSick)"}}></div>
                </div>
            </li>
            <li>
                <div className="Entry">
                <p>Leave</p> <div className="Box" style={{backgroundColor: "var(--clrLeave)"}}></div>
                </div>
            </li>
        </ul>
        </div>
    </div>)
}

export default Legend;