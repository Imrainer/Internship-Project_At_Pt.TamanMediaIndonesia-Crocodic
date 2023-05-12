import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
const EditUser = () => {
const[name, setName] = useState("");
const[email, setEmail] = useState("");
const[gender, setGender] = useState("Male");
const navigate = useNavigate();
const{id} = useParams();


useEffect(()=> {
    getUserById();
},[]);

const EditUser = async (e) =>{
    e.preventDefault();
    try {
        await axios.patch('http://localhost:5000/users/:id',{
            name,
            email,
            gender
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

  return (
    <div className="columns  mx-5 mt-5 is-centered">
        <div className="column is half">

    <form onSubmit={EditUser}>
    <div className="field">
        <label className="label">Name</label>
        <div className="control">
            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Name'/>
        </div>
    </div>
    <div className="field">
        <label className="label">Email</label>
        <div className="control">
            <input type="email" className="input" value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='Email'/>
        </div>
    </div>
    <div className="field">
        <label className="label">Gender</label>
        <div className="control">
           <div className="select is-fullwidth">
             <select value={gender} onChange={(e)=> setGender(e.target.value)} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
             </select>
           </div>
        </div>
    <div className="field mt-3">
    <button type='submit' className='button is-success'>Update</button>
        </div>
    </div>
    </form>
        </div>
    </div>
  )
}

export default EditUser