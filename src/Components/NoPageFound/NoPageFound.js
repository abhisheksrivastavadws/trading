import React from 'react'
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
export default function NoPageFound () {
    const navigate = useNavigate();
    const reloadToHome = () => {
        // alert("404 Page Not Found");
        navigate("/")
    }
    return(
        <div>
         <button style={{width:"100%"}} onClick={(reloadToHome)}>  <Alert severity="warning" onClose={(reloadToHome)}>404 Page Not Found</Alert></button>
        </div>
    )
}