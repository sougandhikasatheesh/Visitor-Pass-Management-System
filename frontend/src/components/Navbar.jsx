import {Link,useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Navbar(){
    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand -lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                Visitor Pass System</Link>
                <div className="ms-auto">
                    <Link className="btn btn-outline-light me-2" to="/visitors">
                    Visitors</Link>
                    <Link className="btn btn-outline-light me-2" to="/appointments">
                    Appointments</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </nav>
    );
}
export default Navbar;