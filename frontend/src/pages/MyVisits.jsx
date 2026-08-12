import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyVisits(){

    const [visits,setVisits]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        fetchVisits();
    },[]);
    const fetchVisits=async()=>{
        try{
            const response=await api.get("/visitor/my-visits", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setVisits(response.data);
        }catch(error){
            console.log(error);
        }
    };
    return (
        <>
        <Navbar/>
        <div className="container mt-4">
            <h2>My Visits</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Purpose</th>
                        <th>Person To Meet</th>
                        <th>Visit Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {visits.length===0?(
                        <tr>
                            <td colSpan="4" className="text-center">
                                No visits found
                            </td>
                        </tr>
                    ):(
                        visits.map((visit)=>(
                            <tr key={visit._id}>
                                <td>{visit.purpose}</td>
                                <td>{visit.personToMeet}</td>
                                <td>{new Date(visit.visitDate).toLocaleDateString()}</td>
                                <td>{visit.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}
export default MyVisits;