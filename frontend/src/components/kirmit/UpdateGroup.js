import React,{useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const UpdateGroup= () => {
const[nama, setNama] = useState("");
const[nomor_hp, setNomor_hp] = useState("");
const[industri, setIndustri] = useState("");
const[bulan, setBulan] = useState("");
const[group, setGroup] = useState("");
const navigate = useNavigate();
const{id} = useParams();

useEffect(()=> {
    getGroupbyId();
}, []);

const updateGroup = async (e) =>{
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/groups/${id}`,{
           group
        });
        navigate("/groupcontact");
    } catch (error) {
        console.log(error);
    }
};
    
    const getGroupbyId = async () => {
        const response = await axios.get(`http://localhost:5000/groups/${id}`);
       setGroup(response.data.group);
    }

  return (
    <Container className="col-md-8 mt-5 shadow-lg">
    <div class=" justify-content-center align-items-center ">
<h2 class=" mt-3 text-center text-info">EDITING GROUP</h2>

<form class="p-2" onSubmit={updateGroup}>
<div className="field mt-5">
    <label className="label">Name</label>
    <div className="control">
        <input type="text"className="input form-control" value={group} onChange={(e)=> setGroup(e.target.value)} placeholder='Group'/>
    </div>

<div className="d-flex justify-content-center mt-5 mb-3 ">
<button type='submit' class='btn btn-dark'>Update</button>
    
</div>
</div>
</form>
    </div>
</Container>
  )
}

export default UpdateGroup