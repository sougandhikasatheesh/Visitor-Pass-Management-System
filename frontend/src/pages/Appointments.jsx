import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Appointments(){
    const [appointments,setAppointments]=useState([]);
    const [visitorName, setVisitorName] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [status, setStatus] = useState("Pending");
    const [editingId, setEditingId] = useState(null);    
    const user=JSON.parse(localStorage.getItem("user"));
    const fetchAppointments=async()=>{
        try{
            const response=await api.get("/appointment",{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            });
            setAppointments(response.data);
        }catch(error){
            console.log(error);
        }
    };
    const addAppointment = async (e) => {

    e.preventDefault();

    try {

        await api.post(
            "/appointment",
            {
                visitorName,
                employeeName,
                appointmentDate,
                appointmentTime,
                purpose,
                status
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );

        setVisitorName("");
        setEmployeeName("");
        setAppointmentDate("");
        setAppointmentTime("");
        setPurpose("");
        setStatus("Pending");

        fetchAppointments();

    } catch (error) {

        console.log(error.response?.data);

    }

};

//delete appointemnt

const deleteAppointment=async(id)=>{
    try{
        await api.delete(`/appointment/${id}`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        });
        fetchAppointments();
    }catch(error){
        console.log(error);
    }
};

//update 

 const updateAppointment = async (e) => {

    e.preventDefault();

    try {

        await api.put(
            `/appointment/${editingId}`,
            {
                visitorName,
                employeeName,
                appointmentDate,
                appointmentTime,
                purpose,
                status
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );
        setEditingId(null);
        setVisitorName("");
        setEmployeeName("");
        setAppointmentDate("");
        setAppointmentTime("");
        setPurpose("");
        setStatus("Pending");

        fetchAppointments();

    } catch (error) {

        console.log(error);

    }

};


    useEffect(()=>{
        fetchAppointments();
    },[]);

    const editAppointment = (appointment) => {

        setEditingId(appointment._id);

        setVisitorName(appointment.visitorName);
        setEmployeeName(appointment.employeeName);
        setAppointmentDate(appointment.appointmentDate);
        setAppointmentTime(appointment.appointmentTime);
        setPurpose(appointment.purpose);
        setStatus(appointment.status);
    };
    return (
        <>
        <Navbar />
        <div className="container mt-4">
            <h2>Appointments</h2>
    <form onSubmit={editingId ? updateAppointment : addAppointment} className="mb-4">

    <div className="row g-3">

        <div className="col-md-4">
            <input
                className="form-control"
                placeholder="Visitor Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                required
            />
        </div>

        <div className="col-md-4">
            <input
                className="form-control"
                placeholder="Employee Name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
            />
        </div>

        <div className="col-md-4">
            <input
                type="date"
                className="form-control"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
            />
        </div>

        <div className="col-md-4">
            <input
                type="time"
                className="form-control"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
            />
        </div>
        <div className="col-md-4">
    <input
        className="form-control"
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
    />
</div>

        <div className="col-md-4">
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                {editingId ? "Update Appointment" : "Add Appointment"}
            </button>
        </div>

    </div>

</form>
            <table className="table table-bordered table-striped mt-3">
                <thead>
                    <tr>
                        <th>Visitor</th>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>TTime</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment)=>(
                        <tr key={appointment._id}>
                                <td>{appointment.visitorName}</td>
                                <td>{appointment.employeeName}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.purpose}</td>
                                <td>{appointment.status}</td>
                                <td>
                                <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editAppointment(appointment)}
                                    >
                                        Edit
                                    </button>
                                
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteAppointment(appointment._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
export default Appointments;