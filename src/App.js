import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import TitleBar from "./components/layout/TitleBar";

import AskForLeavePage from "./components/pages/AskForLeave";
import CallInSickPage from "./components/pages/CallInSick";
import TeamPlannerPage from "./components/pages/TeamPlanner";
import UserPlannerPage from "./components/pages/UserPlanner";
import SingleManagmentPage from "./components/pages/SingleManagment";
import TeamManagmentPage from "./components/pages/TeamManagment";
import CreateUserPage from "./components/pages/CreateUser";

import "./App.css";

function App() {
  return (
    <div className="App">
      <TitleBar />
      <MainNavigation />
      
      <Routes>
        <Route path="/ask-for-leave" element={<AskForLeavePage />} />
        <Route path="/call-in-sick" element={<CallInSickPage />} />
        <Route path="/team-planner" element={<TeamPlannerPage />} />
        <Route path="/user-planner" element={<UserPlannerPage editMode={false}/>} />
        <Route path="/user-planner/edit" element={<UserPlannerPage editMode={true} />} />
        <Route path="/single-manage" element={<SingleManagmentPage />} />
        <Route path="/team-manage" element={<TeamManagmentPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
