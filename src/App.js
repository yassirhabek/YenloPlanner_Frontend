import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";

import AskForLeavePage from "./components/pages/AskForLeave";
import CallInSickPage from "./components/pages/CallInSick";
import TeamPlannerPage from "./components/pages/TeamPlanner";
import UserPlannerPage from "./components/pages/UserPlanner";
import Legend from "./components/layout/Legend";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/ask-for-leave" element={<AskForLeavePage />} />
        <Route path="/call-in-sick" element={<CallInSickPage />} />
        <Route path="/team-planner" element={<TeamPlannerPage />} />
        <Route path="/user-planner" element={<UserPlannerPage />} />
      </Routes>
    </div>
  );
}

export default App;
