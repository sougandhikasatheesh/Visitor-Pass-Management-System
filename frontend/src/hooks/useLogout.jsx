import {useState,useContext} from "react";
import {AuthContext} from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const useLogout = ()=> {


    const {dispatch}=useContext(AuthContext);
    const logout=() =>{
        
            localStorage.removeItem("user");
            dispatch({
                type:"LOGOUT"
            });
            // navigate("/login");
    };
    return {logout};
};
export default useLogout;
