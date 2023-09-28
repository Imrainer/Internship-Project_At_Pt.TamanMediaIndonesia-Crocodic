import React,{ useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom';
import{FaBars} from "react-icons/fa";
import './load.css';


const SideBar = ({children}) => {
  const[isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen)
const menuItem=[
  {
    path:"/dashboard",
    name:"Dashboard",
    icon:<i class="fas fa-chalkboard"></i>
  },{
    path:"http://localhost:8002/",
    name:"QR code",
    icon:<i class="fas fa-qrcode"></i>
  }, {
    path:"/blast",
    name:"Blast",
    icon:<i class="fas fa-comments"></i>
  }, {
    path:"/groupcontact",
    name:"Group Contacts",
    icon:<i class="fas fa-users"></i>
  }, {
    path: "/message",
    name:"Message",
    icon:<i class="far fa-comment"></i>
  },
  ,{
    path:"/history",
    name:"History",
    icon:<i class="fa fa-history" aria-hidden="true"></i>
  },
  {
    path:"https://crocodic.com",
    name:"Visit Our Website",
    icon:<i class="far fa-copyright"></i>
  }
]
  return (
<div className="">
<div style={{width:isOpen ? "220px" : ""}} className="sidebar bg-info">
  <div className="top_section">  
  <div className="bars">
   <FaBars  onClick={toggle}/>
      </div>
    <a href="/dashboard" class="text-decoration-none text-white "><h2 className="logo ">CROCOCHAT</h2></a>
  
    </div>
    {
        menuItem.map((item, index)=>(
          <a href={item.path}  key={index} className="link text-decoration-none" activeclassName="active">
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </a>
        ))
    }
</div>
<main>{children}</main>
</div>
  )
}


export default SideBar