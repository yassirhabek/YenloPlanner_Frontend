import classes from "./TeamScheduleItem.module.css";

function TeamScheduleItem(props) {
  function DetermineColorStatus(status) {
    switch (status) {
      case 0:
        return "var(--clrAway)";
      case 1:
        return "var(--clrOffice)";
      case 2:
        return "var(--clrHome)";
      case 3:
        return "var(--clrCustomer)";
      case 4:
        return "var(--clrSick)";
      case 5:
        return "var(--clrLeave)";
      default:
        return "var(--clrAway)";
    }
  }

  return (
    <div>
      <div className={classes.nameblock}>
        <p>{props.name}</p>
      </div>
      <div
        className={classes.statusmorningM}
        style={{ backgroundColor: DetermineColorStatus(props.mMorning) }}
      />
      <div
        className={classes.statusmiddayM}
        style={{ backgroundColor: DetermineColorStatus(props.mMidday) }}
      />
      <div
        className={classes.statusmorningT}
        style={{ backgroundColor: DetermineColorStatus(props.tMorning) }}
      />
      <div
        className={classes.statusmiddayT}
        style={{ backgroundColor: DetermineColorStatus(props.tMidday) }}
      />
      <div
        className={classes.statusmorningW}
        style={{ backgroundColor: DetermineColorStatus(props.wMorning) }}
      />
      <div
        className={classes.statusmiddayW}
        style={{ backgroundColor: DetermineColorStatus(props.wMidday) }}
      />
      <div
        className={classes.statusmorningTH}
        style={{ backgroundColor: DetermineColorStatus(props.thMorning) }}
      />
      <div
        className={classes.statusmiddayTH}
        style={{ backgroundColor: DetermineColorStatus(props.thMidday) }}
      />
      <div
        className={classes.statusmorningF}
        style={{ backgroundColor: DetermineColorStatus(props.fMorning) }}
      />
      <div
        className={classes.statusmiddayF}
        style={{ backgroundColor: DetermineColorStatus(props.fMidday) }}
      />
    </div>
  );
}

export default TeamScheduleItem;
