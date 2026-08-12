import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import useLogin from "../hooks/useLogin";



function Login() {
    
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { login, error, isLoading } = useLogin();
    const navigate=useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(email,password);
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            if(user.role==="Admin"||user.role==="Employee"||user.role==="Security"){
                navigate("/dashboard");
            }else if(user.role==="Visitor"){
                navigate("/visitor-dashboard")
            }
            
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">
                Login
            </h2>
            <form onSubmit={handleSubmit}>
                
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
                
            <button className="btn btn-success w-100"
            disabled={isLoading}>Login</button>
            {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}
            </form>
            <p className="mt-3 text center">Dont have an account?{" "}
                <Link to="/signup">Signup</Link></p>
        </div>
    );
    
}

export default Login;