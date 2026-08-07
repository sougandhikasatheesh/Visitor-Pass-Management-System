import {useState,useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import api from "../services/api";

const useLogin = ()=> {
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const {dispatch}=useContext(AuthContext);
    const login=async(email,password) =>{
        setIsLoading(true);
        setError(null);
        try{
            const response=await api.post("/user/login",{
                email,
                password
            });
            localStorage.setItem("user",JSON.stringify(response.data));
            dispatch({
                type: "LOGIN",
                payload: response.data
            });
            setIsLoading(false);
        }
        catch(error){
            setIsLoading(false);
            setError(error.response?.data?.error || "Login failed");
        }
    };
    return {login,isLoading,error};
};
export default useLogin;
