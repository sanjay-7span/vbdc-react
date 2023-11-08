import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./component/Layout";
import Login from "./component/Login";
import RWATask from "./component/rwaTask/Rwa-task";
import Dashboard from "./component/dashboard/Dashboard";
import Agency from "./component/agency/Agency";
import AddAgency from './component/agency/AddAgency';
import UpdateAgency from './component/agency/UpdateAgency';
import Zone from './component/zone/Zone';
import Profile from './component/profile/profile';

function App() {
  return (
    <div className='app font-body h-screen'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact index element={<Login />} />
          <Route exact path='dashboard' element={<Dashboard />} />
          <Route exact path="rwa-tasks" element={<RWATask />} />
          <Route exact path="zone" element={<Zone />} />
          <Route exact path="profile/general" element={<Profile />} />
          <Route exact path="agencies" element={<Agency />} />
          <Route exact path="add_agencies" element={<AddAgency />} />
          <Route exact path="agency_update/:id" element={<UpdateAgency />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
