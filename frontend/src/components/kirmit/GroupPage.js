import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import SideBar from './SideBar';

function GroupPage(){

    const[nama, setNama] = useState("");
    const [sortTerm, setsortTerm] = useState("");
    const[memberId, setmemberId] = useState("");
    const[groupId, setgroupId] = useState("");
    const[nomor_hp, setNomor_hp] = useState("");
    const[industri, setIndustri] = useState("");
    const[bulan, setBulan] = useState("");
    const[group, setGroup] = useState("");
    const[deleteMembers, setdeleteMembers] = useState("");
    const[members, setMember] = useState([]);

    const navigate = useNavigate();
    const{id} = useParams();
    
    useEffect(()=> {
        getGroupbyId();
    }, []);
    

    const getGroupbyId = async () => {
        const response = await axios.get(`http://localhost:5000/groups/${id}`);
        setGroup(response.data.group);
        setgroupId(response.data.id);
        setMember(response.data.members)
        console.log(response.data.members)
        setNama(response.data.nama);
        setNomor_hp(response.data.nomor_hp);
    }

    const deleteGroupMember = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/groups/${groupId}/members/${id}`);
            getGroupbyId();
        } catch (error) {
            console.log(error);
        }
    }
        
    
      return (
        <div className="d-flex">
        
        <SideBar/>
    <div className="topSection ms-5 ps-3  col-md-12">

    <div class=" col-md-12">
    <div className="title  mt-4">   
    <h2 class=" text-info"> Group Contacts</h2>
    <h5 class="text-info">Member</h5>
    </div>       
</div>

<div class="mt-5  col-md-9 ">
<h3>{group}</h3>

 <table className="table is-striped is-fullwidth mt-3 col-md-9  ">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
           
             {members !== null && members.map((member, index) => (
                <tr key={index + 1}>
                    <td>{member && index + 1}</td>
                    <td>{member && member.nama}</td>
                    <td>{member && member.nomor_hp}</td>
                    <td> <div onClick={()=> deleteGroupMember(member.id)} class="btn text-danger"><i class="fa fa-trash" aria-hidden="true"></i></div> </td>
                </tr>
             ))}
           
            </tbody>
           </table>
              
    </div>
    </div>
    </div>
    
      )
    }
export default GroupPage;