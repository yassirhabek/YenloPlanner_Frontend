import classes from "./TeamScheduleItem.module.css";

function TeamScheduleItem(props) {
  function DetermineColorStatus(status) {
    switch (status) {
      case "NIKS":
        return "var(--clrAway)";
      case "OFFICE":
        return "var(--clrOffice)";
      case "HOME":
        return "var(--clrHome)";
      case "CUSTOMER":
        return "var(--clrCustomer)";
      case "SICK":
        return "var(--clrSick)";
      case "LEAVE":
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
