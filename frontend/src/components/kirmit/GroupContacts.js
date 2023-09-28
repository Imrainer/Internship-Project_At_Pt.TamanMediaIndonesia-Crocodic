import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, } from "react-bootstrap" ;
import NavigatorBar from './NavigatorBar';
import Toast from './Toast';
import SideBar from './SideBar';
import $ from 'jquery';
import './load.css';
import ReactPaginate from "react-paginate";

function GroupContacts(){
    
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0); 
  const [rows, setRows] = useState(0); 
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [query, setQuery] = useState("");

   
    useEffect(() => {
        document.title = "Group Contact | Crocochat  ";
      })
    

    useEffect(()=>{
      getGroups();
  },[page, keyword]);
    
   
     const getGroups = async () => {
     const response = await axios.get (`http://localhost:5000/groups?search_query=${keyword}&page=${page}&limit=${limit}`);
     setGroups(response.data.result);
     setPage(response.data.page);   
     setPages(response.data.totalPage);
     setRows(response.data.totalRows);  
      }; 

      const createGroup = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/create/group',{
             group
            }); 
            getGroups()
      
        } catch (error) {
            console.log(error);
        }
    }

    const deleteGroup = async (id) => {
      try {
          await axios.delete(`http://localhost:5000/groups/${id}`);
          getGroups();
      } catch (error) {
          console.log(error);
      }
  }
            const handleToast = () => {
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }
           
          const changePage = ({selected}) =>{
            setPage(selected);
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
        <div class=" col-md-12"> 

        <div className="title mt-4 ">
       
            <h2 class=" text-info"> Group Contacts</h2>
           
        </div>
      
      <div class="mt-5">
        <form onSubmit={searchData} class="d-flex mt-5">
        <i class="fas fa-search pt-2"></i><input class="col-md-11 ms-3" type="text" value={query} onChange={(e)=> setQuery(e.target.value)}  placeholder="Search....." ></input>
        <div>
        <button type="submit" class="btn btn-primary col-auto ms-3">Search</button>
        </div>
        </form>
      </div>

    </div>
    
    <div class="d-flex col-md-4 mt-5  ">

<button type="button" class="btn btn-outline-success col-md-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add New Group Contact
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Group Contact</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
      <form onSubmit={createGroup} method="POST">

  <div class="mb-3">
    <label class="form-label fw-bold"> Group's name:</label>
    <input type="text" class="form-control" name="group" onChange={(e)=> setGroup(e.target.value)}/> 
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
    </div>
 <table className="table is-striped is-fullwidth mt-3">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Group</th>
                    <th>Created At</th>
                    <th>Update At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {groups.map((group, index) => (
                <tr key={group.id}>
                    <td>{index + 1}</td>
                    <td>{group.group}</td>
                    <td>{group.createdAt}</td>
                    <td>{group.updatedAt}</td>
                    <td>
                    <Link to={`/groupcontact/${group.id}`}class="text-info text-decoration-none me-2">Open</Link>
                    <Link to={`/group/edit/${group.id}`}class="fas fa-pen text-decoration-none ms-3 text-warning"></Link>
                    <div onClick={()=> deleteGroup(group.id)} class="btn text-danger"><i class="fa fa-trash" aria-hidden="true"></i></div>
                    <Link to={`/groupcontact/insert/${group.id}`} class=" fas fa-user-plus text-info"></Link>
                    </td>
                </tr>
               ))}
               
            </tbody>
           </table>


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
    </div>
      )
    }
export default GroupContacts;