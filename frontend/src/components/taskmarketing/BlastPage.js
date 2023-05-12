import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, } from "react-bootstrap" 
import NavigatorBar from './NavigatorBar'
import Toast from './Toast'
import SideBar from './SideBar'
import $ from 'jquery';
import './load.css';


const BlastPage = () => {

const [groups, setGroups] = useState([]);
const [groupId, setGroupId] = useState("")
const [group, setGroup] = useState("");
const [date, setDate] = useState("");
const [month, setMonth] = useState("")
const [name, setName] = useState("");
const [number, setNumber] = useState("");
const [message, setMessage]= useState("");
const navigate = useNavigate();
const [page, setPage] = useState(0);
const [limit, setLimit] = useState(10);
const [pages, setPages] = useState(0); 
const [rows, setRows] = useState(0); 
const [keyword, setKeyword] = useState("");
const [query, setQuery] = useState("");
const [msg, setMsg] = useState("");

const createHistory = async () =>{

  try{
    await axios.post('http://localhost:5000/history-create',{
      groupId
    });
  } catch (error){
    console.log('Gagal Merekap Histori');
  } 
}

  const sendBlast = async (e) => {
    // e.target.preventDefault();
    console.log(e.target);
    let nameStr = ""
    let numberStr = ""
    for (let i = 0; i < name.length; i++) {
      if(i < 1){
        nameStr += name[i]
        numberStr += number[i]

      }else{
        nameStr += "," + name[i]
        numberStr += "," + number[i]
      }
    }
    
      await axios.post('http://localhost:8002/send-message-blast', {
        name: nameStr,
        number: numberStr,
        message
      }).then(async()=> {
        console.log(groupId)
        await createHistory(groupId);
      navigate("/blast");

      }).catch ((error) => {
          console.log(error);
          console.log('os');
      })
  };



useEffect(() => {
    document.title = "Blast | Crocochat  ";
  })

  useEffect(()=>{
    getGroups();
},[]);
  

useEffect(()=> {
    $("#my_form").submit(function(event){
      event.preventDefault(); // Prevent default action
      var post_url = $(this).attr("action"); // Get the form action URL
      var request_method = $(this).attr("method"); // Get form GET/POST method
      var form_data = $(this).serialize(); // Encode form elements for submission
      $.ajax({
          url : post_url,
          type: request_method,
          data : form_data
      }).done(function(response){
          let status = response.status;
          if (status == true) {
              window.location.href = "/blast";
          }
      }); 
    });

  
},[]);

const getGroups = async () => {
  const response = await axios.get (`http://localhost:5000/group`);
  setGroups(response.data);
  
   }; 

  const handleCheckAll = (e, group) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const groupId = group.id;
      setGroupId(groupId);
        const allNumbers = group.members.map((member) => member.nomor_hp);
        const allNames = group.members.map((member) => member.nama);
        
      setNumber(allNumbers);
      setName(allNames);
    } else {
      setGroupId([]);
      setNumber([]);
      setName([]);
    }
  };   
      const searchData = (e) =>{
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    } 
  return (
    
    <div className="d-flex">
    
    <SideBar/>
   <div className="columns ps-5 is-centered p-4 shadow-md">
    <div className="column is-half">
    <div className="title ms-3">
       
       <h2 class=" text-info"> Blast</h2>
      
   </div>

    <div class="mt-5">
        <form onSubmit={searchData} class="d-flex mt-5">
        <i class="fas fa-search pt-2"></i><input class="col-md-11 ms-3" type="text" value={query} onChange={(e)=> setQuery(e.target.value)}  placeholder="Search....." ></input>
        <div>
        <button type="submit" class="btn btn-primary col-auto ms-3">Search</button>
        </div>
        </form>
      </div>

      <table className="table is-striped is-fullwidth mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {groups &&
            groups.map((group, index) => (
              <tr key={group.id}>
                <td>{index + 1}</td>
                <td>{group.group}</td>
                <td>{group.updatedAt}</td>
                <td> <input
                type="checkbox"
                className="checkboxname ms-5"
                name="allSelect"
                onChange={(e)=>handleCheckAll (e, group)}
              /></td>
              </tr>
            ))}
        </tbody>
      </table>


  </div>
</div>

<div class="ms-2 mt-5 pt-5">
  <form  onSubmit={(e)=>sendBlast(e)} id="my_form" class="mt-5"  >

  <label for="exampleFormControlTextarea1" class="form-label mt-5 fw-bold">Name:</label><br></br>
  <textarea class="form-control" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Clients Name'/>

  <label for="exampleFormControlTextarea1" class="form-label mt-4 fw-bold">Number:</label><br></br>
  <textarea class="form-control" name="number" value={number} onChange={(e)=> setNumber(e.target.value)} placeholder='Numbers that will send'/>

<label for="exampleFormControlTextarea1" class="form-label mt-4 fw-bold">Message:</label><br></br>
<textarea class="kotak form-control" type="text" name="message" onChange={(e)=> setMessage(e.target.value)}></textarea> 

<div id="emailHelp" class="form-text"><li>Each message will be delay for 10 seconds</li></div>
<div id="emailHelp" class="form-text"><li>You can call your client's name with put "nama" inside curly bracket</li></div>

<button  type="submit"  class="btn btn-outline-info  mt-3">Send</button>

</form>
</div>
</div>  

  )
}

export default BlastPage