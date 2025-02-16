import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../Config';
const InternshipService=()=>{
  const[internship,setInternship]=useState([]);
  const[error,setError]=useState(null);

    useEffect(()=>{
  axios.get(`${API_BASE_URL}/api/Interenship/GetInternship`).then(
    response=>{
        console.log(response.data);
        setInternship(response.data);

    }
    
  ).catch(error=>{
    console.error("Error fetching data: ", error);
    setError('Error fetching data'); // Set error message
  },)    
    },[])
    return{
        internship,
        error,
    }
}
export default InternshipService;

