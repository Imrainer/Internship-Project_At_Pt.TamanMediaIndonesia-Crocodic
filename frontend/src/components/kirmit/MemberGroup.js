import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, } from "react-bootstrap" 
import NavigatorBar from './NavigatorBar'
import Toast from './Toast'
import SideBar from './SideBar'
import $ from 'jquery';
import './load.css';


function MemberGroup(){


    const [clients, setClients] = useState([]);
    const [sortTerm, setsortTerm] = useState("");
    const [group, setGroup] = useState("");
    const [id, setId] = useState("");
    const [clientId, setclientId] = useState("");
    const [groupId, setgroupId] = useState("");
    const [groupName, setgroupName] = useState("");
    const navigate = useNavigate();
    const {idGroup} = useParams();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0); 
    const [rows, setRows] = useState(0); 
    const [keyword, setKeyword] = useState("");
    const [msg, setMsg] = useState("");
    const [query, setQuery] = useState("");


    useEffect(() => {
        document.title = "Insert Group Contact | Crocochat  ";
      })
    
      useEffect(()=>{
        getClients();
    },[page, keyword]);
    

  useEffect(()=> {
    getGroupbyId();
}, []);
  
  const getClients = async () => {
  const response = await axios.get(`http://localhost:5000/clients?search_query=${keyword}&page=${page}&limit=${limit}`);
  setClients(response.data.result); 
  setPage(response.data.page);   
  setPages(response.data.totalPage);
  setRows(response.data.totalRows);  
  }; 


    const createMember = async (e) =>
    {
     
      let clientStr = ""
        for (let i = 0; i < clientId.length; i++)
        {  if(i < 1){
            clientStr +=clientId[i]
          } else {
            clientStr += "," + clientId[i]
          }
        }
        await axios.post('http://localhost:5000/groups/member-create',
        {
           groupId,
           clientId : clientStr
          }).navigate(`/groupcontact`).
          catch((error)=>{
            console.log(error);
          })
          
    }

    const getGroupbyId = async () => {
        const response = await axios.get(`http://localhost:5000/groups/${idGroup}`);
       setgroupId(response.data.id)
       setgroupName(response.data.group)
    }

    
     
        const handleCheck = (e) => {
            const value = e.target.value;
            const inputId = e.target.getAttribute('data-id');  
            const isChecked = e.target.checked; 
            if (isChecked) {
            
              setclientId([...clientId, inputId]);
            } else {    
              const newId = clientId.filter((clientIds) => clientIds !== inputId);
            setclientId(newId);

            } 
          };
    
          const changePage = ({selected}) =>{
            setPage(selected);
            if(selected === 9){
                        setMsg("Tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci spesifik");
            } else {
                setMsg("");
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
        <div className="topSection ms-5 ps-3">
    <div className="headerSection ">
        <div class=" col-md-5"> 

        <div className="title ms-2 mt-4">
       
            <h2 class=" text-info"> Group Contacts</h2>
            <h5 class="text-info">Inserting Client</h5>
        </div>
        </div>
    </div>

<div class="ms-2">
  <form  onSubmit={(e)=>createMember(e)} class="mt-5 row col-md-9 "  >

   <label className="label fw-bold">Group's Name</label>
    <div className="control">
        <input className="form-control" name="groupId" value={groupName}  onChange={(e)=> setgroupId(e.target.value)} placeholder='Group'/>
    </div>

  <label class="form-label  fw-bold">User's ID:</label>
  <input class="form-control ms-2" name="clientId" value={clientId} placeholder='Clients Id' onChange={(e)=> setclientId(e.target.value)}/>

<button   type="submit"  class="btn btn-outline-info  ms-2 ">Insert</button>

</form>
</div>

    
<div class="mt-5">
<form onSubmit={searchData} class="d-flex">
<i class="fas fa-search pt-2"></i><input class="col-md-11 ms-3" type="text" value={query} onChange={(e)=> setQuery(e.target.value)}  placeholder="Search....." ></input>
<div>
<button type="submit" class="btn btn-primary col-auto ms-3">Search</button>
</div>
</form>
       
           <table className="table is-striped is-fullwidth mt-3">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Industri </th>
                    <th>Month</th>
                </tr>
            </thead>
            <tbody>
            {clients.map((client, index) => (
            <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.nama}</td>
                <td>{client.nomor_hp}</td>
                <td>{client.industri}</td>
                <td>{client.bulan}</td>
                <td> 
                     <input 
                     type="checkbox" 
                     class="checkboxname ms-5 " 
                     name="allSelect"
                     id="checkAll"
                     data-id={client.id}
                     onChange={(e) => {handleCheck(e)}}/>
              </td>
            <td>     
              </td>
            </tr>
           ))} 
            </tbody>
           </table>
           </div>
            
           <p>Total Rows : {rows} Page {rows ? page + 1 : 0} of {pages} </p>
          
          <nav aria-label="Page navigation example">
            <ul class="pagination">
            <li class="page-item"><button class="page-link" onClick={() => changePage(page - 1)} disabled={page === 1}>Previous</button></li>
              {Array.from({length: pages}, (_, i) => (
                <li key={i} class={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button class="page-link" onClick={() => changePage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li class="page-item"><button class="page-link" onClick={() => changePage(page + 1)} disabled={page === pages}>Next</button></li>
            </ul>
          </nav>

    </div>
</div>
      )
    }
export default MemberGroup;