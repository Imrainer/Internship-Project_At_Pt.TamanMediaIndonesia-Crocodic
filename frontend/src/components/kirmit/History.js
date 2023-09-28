import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, } from "react-bootstrap" 
import NavigatorBar from './NavigatorBar'
import Toast from './Toast'
import SideBar from './SideBar'
import $ from 'jquery';
import './load.css';


function History(){


    const [history, setHistories] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0); 
    const [rows, setRows] = useState(0); 
    const [keyword, setKeyword] = useState("");
    const [msg, setMsg] = useState("");
    const [query, setQuery] = useState("");


    useEffect(() => {
        document.title = "History | Crocochat  ";
      })
    
      useEffect(()=>{
        getHistories();
    },[page, keyword]);
    

const getHistories = async () => {
  const response = await axios.get(`http://localhost:5000/histori?search_query=${keyword}&page=${page}&limit=${limit}`);
  setHistories(response.data.result); 
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
    }};

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
       
            <h2 class=" text-info"> History </h2>
        </div>
        </div>
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
                    <th>Date</th>
                    <th>Group</th>
                </tr>
            </thead>
            <tbody>
            {history && history.map((history, index) => (
            <tr key={history.id}>
                <td>{index + 1}</td>
                <td>{history.tanggal_histori}</td>
                <td>{history.group.group}</td>
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
export default History;