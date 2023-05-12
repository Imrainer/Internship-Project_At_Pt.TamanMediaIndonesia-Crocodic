import React,{ useState, useEffect } from 'react'
import SideBar from './SideBar'
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Container, } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import img from "../../img/crocodic.png"

const Dashboard = () => {
const [clients, setClients] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [page, setPage] = useState(0);
const [limit, setLimit] = useState(10);
const [pages, setPages] = useState(0); 
const [rows, setRows] = useState(0); 
const [keyword, setKeyword] = useState("");
const [query, setQuery] = useState("");
const [msg, setMsg] = useState("");

const[nama, setNama] = useState("");
const[nomor_hp, setNomor_hp] = useState("");
const[industri, setIndustri] = useState("");
const[bulan, setBulan] = useState("");
const navigate = useNavigate();

useEffect(() => {
    document.title = "Dashboard | Crocochat  ";
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

 const saveClient = async (e) =>{
  e.preventDefault();
  try {
      await axios.post('http://localhost:5000/clients',{
          nama,
          nomor_hp,
          industri,
          bulan
      }); 
      getClients()
  } catch (error) {
      console.log(error);
  }
}


 const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/clients/${id}`);
            getClients();
        } catch (error) {
            console.log(error);
        }
    }
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
    <div className="headerSection flex">
        <div className="title ms-3 mt-4 ">
       
            <h2 class=" text-info"> Welcome to CROCOCHAT </h2>
            <p>Powered by <img src={img} alt="Crocodic" class="mb-1" width="90px"/></p>
        </div>
        </div>

<form onSubmit={searchData} class="d-flex">
<i class="fas fa-search pt-2"></i><input class="col-md-11 ms-3" type="text" value={query} onChange={(e)=> setQuery(e.target.value)}  placeholder="Search....." ></input>
<div>
<button type="submit" class="btn btn-outline-info col-auto ms-3">Search</button>
</div>
</form>

    <div className="columns mt-3  ps-4 is-centered p-4 shadow-md">
    <div className="column is-half">
    <div class=" col-lg-12"> 
     <button  class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addnew_client"> +Add New</button> 
    
     <div class="modal fade" id="addnew_client" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Client</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="p-2" onSubmit={saveClient}>
    <div className="field mt-5">
        <label className="label">Name</label>
        <div className="control">
            <input type="text" className="input form-control" value={nama} onChange={(e)=> setNama(e.target.value)} placeholder='Name'/>
        </div>
    </div>
    <div className="field mt-3">
        <label className="label">Number</label>
        <div className="control">
            <input type="number" className="input form-control" value={nomor_hp} onChange={(e)=> setNomor_hp(e.target.value)}  placeholder='Number'/>
        </div>
    </div>
    <div className="field mt-3">
        <label className="label">Industry</label>
        <div className="control">
           <div className="select is-fullwidth">
             <input type="text" className="input form-control" value={industri} onChange={(e)=> setIndustri(e.target.value)} placeholder="Industry" >
               </input>
           </div>
        </div> 
        <div className="field mt-3">
        <label className="label">Month</label>
        <div className="control">
           <div className="select is-fullwidth">
             <input type="text" className="input form-control" value={bulan} onChange={(e)=> setBulan(e.target.value)} placeholder="Month" >
               </input>
           </div>
        </div> 
    </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
      </div>
    </form>
      </div>
    </div>
  </div>
</div>
   
    <table className="table  is-striped is-bordered is-fullwidth mt-3 col-md-8">
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Number</th>
                <th>Industry</th>
                <th>Month</th>
                <th>Action</th>
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
                    <Link to={`/updating/${client.id}`}class="btn btn-outline-warning me-2">Edit</Link>
                    <div onClick={()=> deleteUser(client.id)} class="btn btn-outline-danger">Delete</div>
                
                </td>
                <td>
                 
              </td>
            </tr>
           ))}
           
        </tbody>
       </table>
            <p>{msg} </p>
            <p>Total Rows : {rows} Page {rows ? page + 1 : 0} of {pages} </p>

<nav aria-label="Page navigation example" key={rows}>
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
</div>

   </div>
    </div>
  )
}

export default Dashboard