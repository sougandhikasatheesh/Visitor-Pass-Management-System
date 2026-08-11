import {Html5QrcodeScanner} from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";
import api from "../services/api"
// import { checkVisitor } from "../../../backend/controllers/visitorController";

function QRScanner(){
    useEffect(()=>{
        const scanner=new Html5QrcodeScanner(
            "reader",
            {
                fps:10,
                qrbox:250
            },
            false
        );
        scanner.render(success,error);

        function success(decodedText){
            scanner.clear();
            const visitorId=decodedText.replace("VISITOR:","");
            checkVisitor(visitorId);
        }
        function error(err){
        }
        async function checkVisitor(id){
                const user=JSON.parse(localStorage.getItem("user"));
                if(!user||!user.token){
                    alert("Please login first");
                    return ;
                }
                if (!id){
                    alert("Invalid qr code");
                    return;
                }
                try{
                    const response=await axios.patch(
                    `http://localhost:4000/api/visitor/check/${id}`,
                    {},
                    {
                        headers:{
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );
                alert(response.data.status)
                }catch(err){
                const message=err.response && err.response.data && err.response.data.error?err.response.data.error:"QR SCAN FAILED";
                alert(message);
            }
            
        }
        return ()=> scanner.clear().catch((err)=>console.log(err));
    },[]);
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                QR Scanner
            </h2>
            <div id="reader"></div>
        </div>
    );
}
export default QRScanner;