import React,{ useEffect, Component} from 'react'
import {Col, Container, Row, } from "react-bootstrap" 
import "../../Styles/taskmarketing/landingpage.css"
import NavigatorBar from './NavigatorBar'
import img from "../../img/icon3d.png"
import SideBar from './SideBar'


function LandingPage  ()  {
  useEffect(() => {
    document.title = "LandingPage | Crocochat  ";
  })
  return (

    <div className="">
   <NavigatorBar/>
   {/* <div class="d-flex">
   <SideBar/> */}
    <div class="ms-3 mt-3">
     
      <div className='atas ms-5 mt-3 pt-3 '>
    <div className='welcome container mt-5 ms-5 me-5'>
      
      <Container className=" col-md-5 mt-5 text-info ms-5 d-flex justify-content-start align-items-start">
        <Row>
          <Col>  
          <h5 className="title">Hai, Selamat Datang</h5>
          <h2 className="title1">Mengirimkan Pesan 
          hanya dengan  sekali klik!</h2> 
          <a href="/dashboard" class=" btn btn-info text-light  "><h4 className=" stato mt-1 py-1 fw-bold">START NOW!</h4></a>
          </Col>
      
        </Row>
      
      </Container>
      <div class="container-fluid col-md-6 mt-5 p-3">
  <img src = {img} class="  me-5" width="440px" alt="icon"></img></div>
</div>
</div>
    {/* </div> */}
</div></div>
  )
}

export default LandingPage