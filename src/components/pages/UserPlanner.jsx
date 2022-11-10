import Planner from "../layout/Planner";
import Legend from "../layout/planner/Legend";
import Schedule from "../layout/planner/Schedule";

function UserPlannerPage() {
  return <div className="grid" style={{position: "relative", zIndex: -1, paddingTop: 15}}>
      <Schedule></Schedule>
      <Legend></Legend>
    </div>;
}

export default UserPlannerPage;
