import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";

function VisitorDashboard(){
    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <h2 className="mb-4">
                Visitor Dashboard
            </h2>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <Link 
                        to="/self-register"
                        className="btn btn-primary w-100 p-4">
                            Register new visit
                        </Link>

                </div>
                <div className="col-md-6 mb-3">
                    <Link
                        to="/my-visits"
                        className="btn btn-success w-100 p-4">
                            View my visits
                    </Link>

                </div>

            </div>
        </div>
        </>
    )
}
export default VisitorDashboard;