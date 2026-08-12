import {useState} from "react";
import Navbar from "../components/Navbar";
import VisitorForm from "../components/VisitorForm";
import api from "../services/api";

function SelfRegister(){
    const [phone,setPhone]=useState("");
    const [purpose,setPurpose]=useState("");
    const [personToMeet,setPersonToMeet]=useState("");
    const [visitDate,setVisitDate]=useState("");
    const [photo,setPhoto]=useState(null);

    const user=JSON.parse(localStorage.getItem("user"));
    const registerVisit=async(e)=>{
        e.preventDefault();
        try{
            const formData=new FormData();
            formData.append("phone",phone);
            formData.append("purpose",purpose);
            formData.append("personToMeet",personToMeet);
            formData.append("visitDate",visitDate);

            if (photo){
                formData.append("photo",photo);
            }
            await api.post("/visitor/self-register",formData,{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Visit registered")
            setPhone("");
            setPurpose("");
            setPersonToMeet("");
            setVisitDate("");
            setPhoto(null);
        }catch(error){
            console.log(error);
            alert(error.response?.data?.error || "Registration failed");
        }
    };
    return(
        <>
        <Navbar/>
        <div className="container mt-4">
            <h2>Register new visit</h2>
            <VisitorForm
                isSelfRegister={true}
                visitorName=""
                setVisitorName={()=>{}}
                email=""
                setEmail={()=>{}}
                phone={phone}
                setPhone={setPhone}
                purpose={purpose}
                setPurpose={setPurpose}
                personToMeet={personToMeet}
                setPersonToMeet={setPersonToMeet}
                visitDate={visitDate}
                setVisitDate={setVisitDate}
                status="Pending"
                setStatus={() => {}}
                setPhoto={setPhoto}
                handleSubmit={registerVisit}
                editing={false}/>

        </div>
        </>
    );
}   
export default SelfRegister;