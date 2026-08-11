
import jsPDF from "jspdf";
import {saveAs} from "file-saver";
import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import VisitorForm from "../components/VisitorForm";
import VisitorTable from "../components/VisitorTable";
import QRModel from "../components/QRModel";
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
    const resetForm=()=>{
        setVisitorName("");
        setEmail("");
        setPhone("");
        setPurpose("");
        setPersonToMeet("");
        setVisitDate("");
        setStatus("Pending");
        setPhoto(null);
    };
    //add visitor
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

            await api.post("/visitor",formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

        resetForm();
        fetchVisitors();

            } catch (error) {
                console.log(error);
            }
        };
    //update visitor
    const updateVisitor=async(e)=>{
        e.preventDefault();
        try{
            await api.put(
                `/visitor/${editingId}`,
                {visitorName,email,phone,purpose,personToMeet,visitDate,status},
                {headers:{ Authorization:`Bearer ${user.token}`}}
            );
            setEditingId(null);
            resetForm();
            fetchVisitors();
        }catch(error){
            console.log(error);        
        }
    }
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

    const editVisitor=(visitor)=>{
        setEditingId(visitor._id);
        setVisitorName(visitor.visitorName);
        setEmail(visitor.email);
        setPhone(visitor.phone);
        setPurpose(visitor.purpose);
        setPersonToMeet(visitor.personToMeet);
        setVisitDate(visitor.visitDate.substring(0,10));
        setStatus(visitor.status);
    };
    
    //update visitor status
    const updateVisitorStatus=async(visitor)=>{
        let newStatus;
        if (visitor.status==="Pending") newStatus="Checked In";
        else if(visitor.status==="Checked In") newStatus="Checked Out";
        else return;
        try{
            await api.put(
                `/visitor/${visitor._id}`,
                {...visitor,status:newStatus},
                {
                    headers:{ Authorization:`Bearer ${user.token}`}
                }
            );
            fetchVisitors();
        }catch(error){
            console.log(error)
        }
    };

    //pdf

    //loading image
    const loadImage=(url)=>{
        return new Promise((resolve,reject)=>{
            const img=new Image();
            img.crossOrigin="Anonymous";
            img.onload=()=> resolve(img);
            img.onerror=reject;
            img.src=url;
        });
    };

    const downloadPDF = async() => {

        if (!selectedVisitor) 
            return;
        const doc=new jsPDF();
        const photoUrl= `http://localhost:4000/uploads/${selectedVisitor.photo}`;
        let visitorPhoto=null;
        try{
            visitorPhoto=await loadImage(photoUrl);
        }catch(error){
            console.log("Photo could not be loaded");
        }
        doc.setDrawColor(0,12,204);
        doc.setLineWidth(1);
        doc.rect(10,10,190,277);
        doc.setFillColor(0,102,204);
        doc.rect(10,10,190,20,"F");
        doc.setTextColor(255,255,255);
        doc.setFontSize(18);
        doc.setFont("helvetica","bold");
        doc.text("VISITOR PASS",105,23,{align:"center"});
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        if (visitorPhoto) {
            doc.addImage(visitorPhoto, "JPEG", 15, 40, 40, 40);
        }
        if (selectedVisitor.qrCode) {
            doc.addImage(selectedVisitor.qrCode, "PNG", 145, 40, 40, 40);
        }
        doc.setFontSize(12);
        doc.text(`Visitor Name : ${selectedVisitor.visitorName}`, 20, 95);
        doc.text(`Email        : ${selectedVisitor.email}`, 20, 105);
        doc.text(`Phone        : ${selectedVisitor.phone}`, 20, 115);
        doc.text(`Purpose      : ${selectedVisitor.purpose}`, 20, 125);
        doc.text(`Person To Meet : ${selectedVisitor.personToMeet}`, 20, 135);
        doc.text(
            `Visit Date   : ${new Date(selectedVisitor.visitDate).toLocaleDateString()}`,
            20,
            145
        );
        doc.text(`Status       : ${selectedVisitor.status}`, 20, 155);
        doc.save(`${selectedVisitor.visitorName}_VisitorPass.pdf`);
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
    };
    useEffect(()=>{
        fetchVisitors();
    },[]);

    return (
        <>
        <Navbar />
        <div className="container mt-4">
            <h2>Visitors</h2>
        <VisitorForm
            visitorName={visitorName}
            setVisitorName={setVisitorName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            purpose={purpose}
            setPurpose={setPurpose}
            personToMeet={personToMeet}
            setPersonToMeet={setPersonToMeet}
            visitDate={visitDate}
            setVisitDate={setVisitDate}
            status={status}
            setStatus={setStatus}
            setPhoto={setPhoto}
            handleSubmit={editingId ? updateVisitor : addVisitor}
            editing={editingId}
        />
        <VisitorTable
            visitors={visitors}
            user={user}
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            exportCSV={exportCSV}
            editVisitor={editVisitor}
            deleteVisitor={deleteVisitor}
            setSelectedVisitor={setSelectedVisitor}
            updateVisitorStatus={updateVisitorStatus}
        />
        </div>
        <QRModel
            selectedVisitor={selectedVisitor}
            setSelectedVisitor={setSelectedVisitor}
            downloadPDF={downloadPDF}
        />
        </>
    )
}
export default Visitors;

    