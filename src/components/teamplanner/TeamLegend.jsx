import classes from "./TeamLegend.module.css";

function TeamLegend() {
  return (
    <div className={classes.LegendMain}>
      <h1 className={classes.LegendHeader}>Legend</h1>
      <div className={classes.LegendBody}>
        <ul>
          <li key="1">
            <div className={classes.Office}>
              <p>Office</p>
            </div>
          </li>
          <li key="2">
            <div className={classes.Home}>
              <p>Home</p>
            </div>
          </li>
          <li key="3">
            <div className={classes.Customer}>
              <p>Customer</p>
            </div>
          </li>
          <li key="4">
            <div className={classes.Sick}>
              <p>Sick</p>
            </div>
          </li>
          <li key="5">
            <div className={classes.Leave}>
              <p>Leave</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TeamLegend;
