import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Userlist from './components/Userlist';
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

//<----MARKETING---->
// import './components/taskmarketing/load.css';
import LandingPage from "./components/taskmarketing/LandingPage";
import NavigatorBar from "./components/taskmarketing/NavigatorBar";
import SideBar from "./components/taskmarketing/SideBar";
import Dashboard from "./components/taskmarketing/Dashboard"
import MessagePage from "./components/taskmarketing/MessagePage";
import BlastPage from "./components/taskmarketing/BlastPage.js";
import CreateClient from "./components/taskmarketing/CreateClient";
import UpdateClient from "./components/taskmarketing/UpdateClient.js";
import GroupContacts from "./components/taskmarketing/GroupContacts.js";
import UpdateGroup from "./components/taskmarketing/UpdateGroup.js";
import MemberGroup from "./components/taskmarketing/MemberGroup.js";
import GroupPage from "./components/taskmarketing/GroupPage.js";
import History from "./components/taskmarketing/History.js";

function App() {
  return (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Userlist/>}/>
      <Route path="/add" element={<AddUser/>}/>
      <Route path="/edit/:id" element={<EditUser/>}/>
      <Route path="/navigator" element={<NavigatorBar/>}/>
      <Route path="/sidebar" element={<SideBar/>}/>
      <Route path="/landingpage" element={ <LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/message" element={ <MessagePage/>}/>
      <Route path="/groupcontact" element={ <GroupContacts/>}/>
      <Route path="/groupcontact/insert/:idGroup" element={<MemberGroup/>}/>
      <Route path="/groupcontact/:id" element={<GroupPage/>}/>
      <Route path="/blast" element={<BlastPage/>}/>
      <Route path="/creating" element={<CreateClient/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/updating/:id" element={<UpdateClient/>}/>
      <Route path="/group/edit/:id" element={<UpdateGroup/>}/>
</Routes> 
  </BrowserRouter>
    
  );
}

export default App;
