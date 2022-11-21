
import Schedule from "../layout/planner/Schedule";
import EditSchedule from "../layout/planner/EditSchedule";

function UserPlannerPage(props) {
  if (!props.editMode) {
    return (
      <div>
        <Schedule></Schedule>
      </div>
    );
  } else {
    return (
      <div>
        <EditSchedule></EditSchedule>
      </div>
    );
  }
}

export default UserPlannerPage;
