import {QRCodeCanvas} from "qrcode.react";

function QRModel({
    selectedVisitor,setSelectedVisitor,downloadPDF
}){
    if(!selectedVisitor){
        return null;
    }
    return (
        <div className="modal d-block" tabIndex="-1" style={{backgroundColor:"rgba(0,0,0,0.5)"}}> 
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                        Visitor QR Code
                    </h5>
                    <button className="btn-close" onClick={()=> setSelectedVisitor(null)}></button>
                </div>
            <div className="modal-body text-center">
                <QRCodeCanvas value={`VISITOR:${selectedVisitor._id}`}
                size={220}/>
                <hr/>
                <h5>{selectedVisitor.visitorName}</h5>
                <p>
                    Email:{selectedVisitor.email}
                </p>
                <p>
                    Purpose:{selectedVisitor.purpose}
                </p>
                <p>
                    Person To Meet:{selectedVisitor.personToMeet}
                </p>
                <p>
                    Status:{selectedVisitor.status}
                </p>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={downloadPDF}>
                        Download your Pass
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}
export default QRModel;