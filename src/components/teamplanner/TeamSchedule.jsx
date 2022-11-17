import classes from "./TeamSchedule.module.css";
import TeamScheduleItem from "./TeamScheduleItem";

function TeamSchedule(props) {
  let results;
  if (props.teamDataWeek.length !== 0) {
    results = (
      <div className={classes.grid}>
        {props.teamDataWeek.map((teamdata) => (
          <TeamScheduleItem
            key={teamdata.id}
            id={teamdata.id}
            name={teamdata.name}
            mMorning={teamdata.availabilities[0].status}
            mMidday={teamdata.availabilities[1].status}
            tMorning={teamdata.availabilities[2].status}
            tMidday={teamdata.availabilities[3].status}
            wMorning={teamdata.availabilities[4].status}
            wMidday={teamdata.availabilities[5].status}
            thMorning={teamdata.availabilities[6].status}
            thMidday={teamdata.availabilities[7].status}
            fMorning={teamdata.availabilities[8].status}
            fMidday={teamdata.availabilities[9].status}
          />
        ))}
      </div>
    );
  }
  else if (props.teamDataWeek.length === 0){
    results = (<div className={classes.noteam}><p>Select a team in the search bar...</p></div>);
  }

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
      <div>{results}</div>
    </div>
  );
}

export default TeamSchedule;
