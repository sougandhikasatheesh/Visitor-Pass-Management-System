import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { saveAs } from "file-saver";
function Dashboard(){
    const user=JSON.parse(localStorage.getItem("user"));
    const [visitors,setVisitors]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    useEffect(()=>{
        fetchDashboardData();
    },[]);
    const fetchDashboardData=async()=>{
        try{
            const visitorRoles=await api.get("/visitor",{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            });
           
            setVisitors(visitorRoles.data);
            const appointmentRes=await api.get("/appointment",{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            });
            
            
            setAppointments(appointmentRes.data);
            
        }catch(error){
            console.log(error);
        }
        
    };
    const totalVisitors=visitors.length;
    const checkedIn=visitors.filter(
        visitor=>visitor.status==="Checked In"
    ).length;
    const checkedOut=visitors.filter(
        visitor=>visitor.status==="Checked Out"
    ).length;

    const filteredVisitors=visitors.filter((visitor)=>{
        const matchesSearch=visitor.visitorName
        .toLowerCase()
        .includes(search.toLowerCase());
        const matchesStatus=filterStatus==="All" || visitor.status===filterStatus;
        return matchesSearch&&matchesStatus;
    })

    const totalAppointments=appointments.length;

    const exportCSV=()=>{
            const headers=[
                "Visitor Name",
                "Email",
                "Phone",
                "Purpose",
                "Person To Meet",
                "Visit Date",
                "Status"
            ];
            const rows=filteredVisitors.map((visitor)=>[
                visitor.visitorName,
                visitor.email,
                visitor.phone,
                visitor.purpose,
                visitor.personToMeet,
                new Date(visitor.visitDate).toLocaleDateString(),
                visitor.status
            ]);
            const csvContent=[
                headers.join(","),
                ...rows.map((row)=> row.join(","))
            ].join("\n");
            const blob=new Blob([csvContent],{
                type:"text/csv;charset=utf-8;"
            });
            saveAs(blob,"Dashboard_visitors_report.csv");
        };
    return(
    <>
    <Navbar/>
        <div className="container mt-5">
            <h2>Welcome,{user?.name}</h2>
            <p className="text-muted">Visitor pass Management Dashboard</p>
            <div className="row mt-4">
                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                    <div className="card-body">
                        <h5>
                            Total Visitors
                        </h5>
                        <h2>
                            {totalVisitors}
                        </h2>

                    </div>
                </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                    <div className="card-body">
                        <h5>
                            Checked In
                        </h5>
                        <h2>
                            {checkedIn}
                        </h2>

                    </div>
                </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center">
                    <div className="card-body">
                        <h5>
                            CheckedOut
                        </h5>
                        <h2>
                            {checkedOut}
                        </h2>

                    </div>
                </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center">

                    
                    <div className="card-body">
                        <h5>
                            Appointments
                        </h5>
                        <h2>
                            {totalAppointments}
                        </h2>

                    </div>
                </div>
            </div>
        </div>    
        <div className="row mt-4">
            <div className="col-md-6">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Search Visitor"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}/>
            </div>
            <div className="col-md-3">
                <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e)=> setFilterStatus(e.target.value)}>
                        <option value="All">
                            All
                        </option>
                        <option value="Checked In">
                            Checked In
                        </option>
                        <option value="Checked Out">
                            Checked Out
                        </option>
                        <option value="Pending">
                            Pending
                        </option>
                    </select>

            </div>
            <div className="d-flex justify-content-end col-md-3">
                <button className="btn btn-success" onClick ={exportCSV}>
                    Export CSV
                </button>
            </div>
            <div className="card mt-4">
                <div className="card-header">
                    <h5>Visitors</h5>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Visitor Name</th>
                                <th>Email</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Visit Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVisitors.length>0?(
                                filteredVisitors.map((visitor)=>(
                                    <tr key={visitor._id}>
                                        <td>{visitor.visitorName}</td>
                                        <td>{visitor.email}</td>
                                        <td>{visitor.purpose}</td>
                                        <td>{visitor.status}</td>
                                        <td>{new Date(visitor.visitDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No Visitors Found
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>

                    </table>

                </div>

                
            </div>

        </div>
        </div>
    </>
    );
}
export default Dashboard;