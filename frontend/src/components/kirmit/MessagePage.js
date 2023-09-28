import React,{useState, useEffect} from "react"
import { Container, } from "react-bootstrap" 
import NavigatorBar from './NavigatorBar'

import { useNavigate } from 'react-router-dom'
import axios from "axios";
import SideBar from './SideBar'

const MessagePage = () => {
const [number, setNumber] = useState(""); 
const [message, setMessage] = useState(""); 
const navigate = useNavigate();
const [clients, setClients] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [page, setPage] = useState(0);
const [limit, setLimit] = useState(10);
const [pages, setPages] = useState(0); 
const [rows, setRows] = useState(0); 
const [keyword, setKeyword] = useState("");
const [query, setQuery] = useState("");
const [msg, setMsg] = useState("");


  
  useEffect(() => {
    document.title = "Messaging | Crocochat  ";
  })

  useEffect(()=>{
    getClients();
},[page, keyword]);
   

    const getClients = async () => {
      const response = await axios.get(`http://localhost:5000/clients?search_query=${keyword}&page=${page}&limit=${limit}`);
      setClients(response.data.result); 
      setPage(response.data.page);   
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);  
      }; 

      const changePage = ({selected}) =>{
        setPage(selected);
        if(selected === 9){
                    setMsg("Tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci spesifik");
        } else {
            setMsg("");
        }
    };

      const searchData = (e) =>
      {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
      }

      const sendMessage = async (e) => {
      
        try {
          await axios.post('http://localhost:8002/send-message', {
            number,
            message
          }); 
          navigate("/message");
        } catch (error) {
          console.log(error);
        }
      };

     
   
      
return (
    <div class="d-flex">
        <SideBar/>
    <div class=" top-section ms-5 ps-3 col-md-7 ">
    <div className="headerSection ">
        <div class=" col-md-5"> 

        <div className="title ms-2 mt-4">
       
            <h2 class=" text-info"> Message</h2>
        </div>
        </div>
    </div>

 <div>
<form onSubmit={(e)=>sendMessage(e)} class="p-2">
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label mt-4">Number:</label>
  <input class="form-control" name="number" value={number} onChange={(e)=> setNumber(e.target.value)}placeholder='Number'></input>
</div>

<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label mt-4">Message:</label>
  <input class="form-control"name="message" value={message} onChange={(e)=> setMessage(e.target.value)}placeholder='Message'></input>
</div>
  
  <button type="submit" class="btn btn-info text-light">Send</button>
   
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

export default MessagePage