import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Userlist from './components/Userlist';
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

//<----MARKETING---->
// import './components/taskmarketing/load.css';
import LandingPage from "./components/kirmit/LandingPage";
import NavigatorBar from "./components/kirmit/NavigatorBar";
import SideBar from "./components/kirmit/SideBar";
import Dashboard from "./components/kirmit/Dashboard"
import MessagePage from "./components/kirmit/MessagePage";
import BlastPage from "./components/kirmit/BlastPage.js";
import CreateClient from "./components/kirmit/CreateClient";
import UpdateClient from "./components/kirmit/UpdateClient.js";
import GroupContacts from "./components/kirmit/GroupContacts.js";
import UpdateGroup from "./components/kirmit/UpdateGroup.js";
import MemberGroup from "./components/kirmit/MemberGroup.js";
import GroupPage from "./components/kirmit/GroupPage.js";
import History from "./components/kirmit/History.js";

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
