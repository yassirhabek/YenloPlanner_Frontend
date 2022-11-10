import classes from "./TeamLegend.module.css";

function TeamLegend() {
  return (
    <div className={classes.LegendBody}>
      <div className={classes.Office}>
        <p>Office</p>
      </div>
      <div className={classes.Home}>
        <p>Home</p>
      </div>
      <div className={classes.Customer}>
        <p>Customer</p>
      </div>
      <div className={classes.Sick}>
        <p>Sick</p>
      </div>
      <div className={classes.Leave}>
        <p>Leave</p>
      </div>
    </div>
  );
}

export default TeamLegend;
