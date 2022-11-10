import classes from "./TeamSchedule.module.css";
import TeamScheduleItem from "./TeamScheduleItem";

function TeamSchedule(props) {
  return (
    <div>
      <div className={classes.Firstw}>
        <p>Monday</p>
        <div className={classes.dateblock}>
          <p>{props.dateMonday}</p>
        </div>
        <div className={classes.morningblock}>
          <p>Morning</p>
        </div>
        <div className={classes.middayblock}>
          <p>Midday</p>
        </div>
      </div>
      <div className={classes.Secondw}>
        <p>Tuesday</p>
        <div className={classes.dateblock}>
          <p>{props.dateTuesday}</p>
        </div>
        <div className={classes.morningblock}>
          <p>Morning</p>
        </div>
        <div className={classes.middayblock}>
          <p>Midday</p>
        </div>
      </div>
      <div className={classes.Thirdw}>
        <p>Wednesday</p>
        <div className={classes.dateblock}>
          <p>{props.dateWednesday}</p>
        </div>
        <div className={classes.morningblock}>
          <p>Morning</p>
        </div>
        <div className={classes.middayblock}>
          <p>Midday</p>
        </div>
      </div>
      <div className={classes.Fourthw}>
        <p>Thursday</p>
        <div className={classes.dateblock}>
          <p>{props.dateThursday}</p>
        </div>
        <div className={classes.morningblock}>
          <p>Morning</p>
        </div>
        <div className={classes.middayblock}>
          <p>Midday</p>
        </div>
      </div>
      <div className={classes.Fifthw}>
        <p>Friday</p>
        <div className={classes.dateblock}>
          <p>{props.dateFriday}</p>
        </div>
        <div className={classes.morningblock}>
          <p>Morning</p>
        </div>
        <div className={classes.middayblock}>
          <p>Midday</p>
        </div>
      </div>
      <div className={classes.grid}>
        {props.teamDataWeek.map((teamdata) => (
          <TeamScheduleItem
            key={teamdata.id}
            id={teamdata.id}
            name={teamdata.name}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamSchedule;
