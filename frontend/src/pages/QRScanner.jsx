import {Html5QrcodeScanner} from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";
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
            try{
                const user=JSON.parse(localStorage.getItem("user"));
                await axios.patch(
                    `http://localhost:4000/api/visitor/check/${id}`,
                    {},
                    {
                        headers:{
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );
                alert("Visitor checked successfully!");
            }catch(err){
                alert("QR Scan Failed");
            }
        }
        return ()=> scanner.clear();
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