
import Schedule from "../layout/planner/Schedule";
import EditSchedule from "../layout/planner/EditSchedule";

function UserPlannerPage(props) {
  if (!props.editMode) {
    return <div className="grid" style={{position: "relative", paddingTop: 15}}>
        <Schedule></Schedule>
      </div>;
  } else {
    return <div className="grid" style={{position: "relative", paddingTop: 15}}>
        <EditSchedule></EditSchedule>
      </div>;
  }
}

export default UserPlannerPage;
