import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import {saveAs} from "file-saver";
import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Visitors(){
    const [visitors,setVisitors]=useState([]);
    const [visitorName, setVisitorName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [purpose, setPurpose] = useState("");
    const [personToMeet, setPersonToMeet] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [editingId, setEditingId] = useState(null);    
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [photo, setPhoto] = useState(null);
    const user=JSON.parse(localStorage.getItem("user"));
    const fetchVisitors=async()=>{
        try{
            const response=await api.get("/visitor",{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            });
            setVisitors(response.data);
        }catch(error){
            console.log(error);
        }
    };
    const addVisitor = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

            formData.append("visitorName", visitorName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("purpose", purpose);
            formData.append("personToMeet", personToMeet);
            formData.append("visitDate", visitDate);
            formData.append("status", status);

            if (photo) {
                formData.append("photo", photo);
            }

            await api.post(
                "/visitor",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

        setVisitorName("");
        setEmail("");
        setPhone("");
        setPurpose("");
        setPersonToMeet("");
        setVisitDate("");
        setStatus("Pending");
        setPhoto(null);
        fetchVisitors();

    } catch (error) {

        console.log(error);

    }

};

//delete visitor 

const deleteVisitor=async(id)=>{
    try{
        await api.delete(`/visitor/${id}`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        });
        fetchVisitors();
    }catch(error){
        console.log(error);
    }
};

//update visitor 

 const updateVisitor = async (e) => {

    e.preventDefault();

    try {

        await api.put(
            `/visitor/${editingId}`,
            {
                visitorName,
                email,
                phone,
                purpose,
                personToMeet,
                visitDate,
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
        setEmail("");
        setPhone("");
        setPurpose("");
        setPersonToMeet("");
        setVisitDate("");
        setStatus("Pending");

        fetchVisitors();

    } catch (error) {

        console.log(error);

    }

};


    useEffect(()=>{
        fetchVisitors();
    },[]);
    const editVisitor = (visitor) => {
    setEditingId(visitor._id);
    setVisitorName(visitor.visitorName);
    setEmail(visitor.email);
    setPhone(visitor.phone);
    setPurpose(visitor.purpose);
    setPersonToMeet(visitor.personToMeet);
    setVisitDate(visitor.visitDate.substring(0, 10));
    setStatus(visitor.status);
};
//pdf

const downloadPDF = () => {

    if (!selectedVisitor) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Visitor Pass", 20, 20);

    doc.setFontSize(12);

    doc.text(`Visitor Name: ${selectedVisitor.visitorName}`, 20, 40);
    doc.text(`Email: ${selectedVisitor.email}`, 20, 50);
    doc.text(`Phone: ${selectedVisitor.phone}`, 20, 60);
    doc.text(`Purpose: ${selectedVisitor.purpose}`, 20, 70);
    doc.text(`Person To Meet: ${selectedVisitor.personToMeet}`, 20, 80);
    doc.text(`Visit Date: ${selectedVisitor.visitDate}`, 20, 90);
    doc.text(`Status: ${selectedVisitor.status}`, 20, 100);

    doc.save(`${selectedVisitor.visitorName}_VisitorPass.pdf`);
};
const updateVisitorStatus = async (visitor) => {

    let newStatus;

    if (visitor.status === "Pending") {
        newStatus = "Checked In";
    } else if (visitor.status === "Checked In") {
        newStatus = "Checked Out";
    } else {
        return;
    }

    try {

        await api.put(
            `/visitor/${visitor._id}`,
            {
                ...visitor,
                status: newStatus
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );

        fetchVisitors();

    } catch (error) {
        console.log(error);
    }
};

//file export

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
    const rows=visitors.map((visitor)=>[
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
    saveAs(blob,"Visitors_Report.csv");
}

    return (
        <>
        <Navbar />
        <div className="container mt-4">
            <h2>Visitors</h2>
    <form onSubmit={editingId ? updateVisitor : addVisitor} className="mb-4">

    <div className="row">

        <div className="col-md-3">
            <input
                className="form-control"
                placeholder="Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                required
            />
        </div>

        <div className="col-md-3">
            <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="col-md-2">
            <input
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
        </div>

        <div className="col-md-2">
            <input
                className="form-control"
                placeholder="Purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
            />
        </div>
        <div className="col-md-3">
    <input
        className="form-control"
        placeholder="Person to Meet"
        value={personToMeet}
        onChange={(e) => setPersonToMeet(e.target.value)}
        required
    />
</div>
        <div className="col-md-3">
    <input
        type="date"
        className="form-control"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
        required
    />
</div>
        <div className="col-md-3">
    <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
    />
</div>

        <div className="col-md-2">
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                {editingId ? "Update Visitor" : "Add Visitor"}
            </button>
        </div>

    </div>

</form>
<div className="row mb-3">
    <div className="col-md-6">
        <input 
            type="text"
            className="form-control"
            placeholder="Search by Visitor Name"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    <div className="col-md-3">
        <select 
            className="form-select"
            value={filterStatus}
            onChange={(e)=> setFilterStatus(e.target.value)}>
            
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            </select>
    </div>
</div>

<div className="d-flex justify-content-end mb-3">
    <button className="btn btn-succes" onClick={exportCSV}>
        Export file
    </button>

</div>

            <table className="table table-bordered table-striped mt-3">
                <thead>
                    <tr>
                        <th>Visitor Name</th>
                        <th>Photo</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Purpose</th>
                        <th>Person To Meet</th>
                        <th>Visit Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.
                        filter((visitor) => {

        const matchesSearch =
            visitor.visitorName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            filterStatus === "All" ||
            visitor.status === filterStatus;

        return matchesSearch && matchesStatus;

    })
                        .map((visitor)=>(
                        <tr key={visitor._id}>
                            <td>{visitor.visitorName}</td>
                            <td>
                                {visitor.photo ? (
                                    <img
                                        src={`http://localhost:4000/uploads/${visitor.photo}`}
                                        alt="Visitor"
                                        width="60"
                                        height="60"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "50%"
                                        }}
                                    />
                                ) : (
                                    "No Photo"
                                )}
                            </td>
                                <td>{visitor.email}</td>
                                <td>{visitor.phone}</td>
                                <td>{visitor.purpose}</td>
                                <td>{visitor.personToMeet}</td>
                                <td>{new Date(visitor.visitDate).toLocaleDateString()}</td>
                                
                                
                                <td>{visitor.status}</td>
                                <td>
                                    {(user.role === "Admin" || user.role === "Employee") && (
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editVisitor(visitor)}
                                    >
                                        Edit
                                    </button>
                                )}
                                
                                {user.role === "Admin" && (
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteVisitor(visitor._id)}
                                >
                                    Delete
                                </button>
                            )}
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => setSelectedVisitor(visitor)}
                                >
                                    QR
                                </button>
                                <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => updateVisitorStatus(visitor)}
                    >
                        {visitor.status === "Checked In"
                            ? "Check Out"
                            : visitor.status === "Checked Out"
                            ? "Completed"
                            : "Check In"}
                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {selectedVisitor && (
    <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Visitor QR Code</h5>

                    <button
                        className="btn-close"
                        onClick={() => setSelectedVisitor(null)}
                    ></button>
                </div>

                <div className="modal-body text-center">

                    <QRCodeCanvas
                        value={JSON.stringify(selectedVisitor)}
                        size={220}
                    />

                    <hr />

                    <h5>{selectedVisitor.visitorName}</h5>

                    <p>Email: {selectedVisitor.email}</p>

                    <p>Purpose: {selectedVisitor.purpose}</p>

                    <p>Person To Meet: {selectedVisitor.personToMeet}</p>

                    <p>Status: {selectedVisitor.status}</p>
                    <div className="mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={downloadPDF}
                    >
                        Download PDF Pass
                    </button>
                    
                </div>

                </div>

            </div>
        </div>
    </div>
)}
        </>
    );
}
export default Visitors;