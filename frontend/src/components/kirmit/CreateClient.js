import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const CreateClient = () => {
const[nama, setNama] = useState("");
const[nomor_hp, setNomor_hp] = useState("");
const[industri, setIndustri] = useState("");
const[month, setMonth] = useState("");
const[bulan, setBulan] = useState("");
const navigate = useNavigate();

const saveClient = async (e) =>{
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/clients',{
            nama,
            nomor_hp,
            industri,
            bulan
        }); 
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
}

  return (
    <Container className="col-md-8 mt-5 shadow-lg">
        <div class=" justify-content-center align-items-center ">

    <h2 class=" mt-3 text-center text-info">CREATING CLIENT</h2>

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
    <div className="d-flex justify-content-center mt-5 mb-3 ">
    <button type='submit' class='btn btn-dark'>Create</button>
        </div>
    </div>
    </div>
    </form>
        </div>
    </Container>
  )
}

export default CreateClient