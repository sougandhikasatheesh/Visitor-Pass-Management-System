import {useState} from "react";
import {Link} from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";




function Signup() {
    
    const [name,setName]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Visitor");
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password, role);

    if (!error) {
        navigate("/");
    }
};
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">
                Signup
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select
                        className="form-control"
                        value={role}
                        onChange={(e)=>setRole(e.target.value)}
                    >
                        <option>Visitor</option>
                        <option>Employee</option>
                        <option>Security</option>
                        <option>Admin</option>
                      </select>  
                </div>
            <button className="btn btn-primary w-100"
            disabled={isLoading}>SignUp</button>
            {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}
            </form>
            <p className="mt-3 text center">Already have an account?{" "}
                <Link to="/">Login</Link></p>
        </div>
    );
    
}

export default Signup;