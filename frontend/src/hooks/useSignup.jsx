import {useState,useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import api from "../services/api";

const useSignup = ()=> {
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const {dispatch}=useContext(AuthContext);
    const signup=async(name,email,password,role) =>{
        setIsLoading(true);
        setError(null);
        try{
            const response=await api.post("/user/signup",{
                name,
                email,
                password,
                role
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
            setError(error.response?.data?.error || "Signup failed");
        }
    };
    return {signup,isLoading,error};
};
export default useSignup;
