import classes from "./TeamScheduleItem.module.css";

function TeamScheduleItem(props){

    return(
        <div>
            <div className={classes.nameblock}>
                <p>{props.name}</p>
            </div>
            <div className={classes.statusmorningM} style={{backgroundColor: "var(--clrCustomer)"}}/>
            <div className={classes.statusmiddayM} style={{backgroundColor: "var(--clrCustomer)"}}/>
            <div className={classes.statusmorningT} style={{backgroundColor: "var(--clrHome)"}}/>
            <div className={classes.statusmiddayT} style={{backgroundColor: "var(--clrOffice)"}}/>
            <div className={classes.statusmorningW} style={{backgroundColor: "var(--clrOffice)"}}/>
            <div className={classes.statusmiddayW} style={{backgroundColor: "var(--clrOffice)"}}/>
            <div className={classes.statusmorningTH} style={{backgroundColor: "var(--clrSick)"}}/>
            <div className={classes.statusmiddayTH} style={{backgroundColor: "var(--clrSick)"}}/>
            <div className={classes.statusmorningF} style={{backgroundColor: "var(--clrHome)"}}/>
            <div className={classes.statusmiddayF} style={{backgroundColor: "var(--clrLeave)"}}/>
        </div>
    );

}

export default TeamScheduleItem;