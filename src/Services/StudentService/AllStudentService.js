import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from '../Config';
const AllStudentService=()=>{
    const[student,setStudent]=useState([]);
    const[error,setError]=useState(null);
    useEffect(()=>{
       axios.get(`${API_BASE_URL}/api/Student/GetAllStudent`).then(
        response=>{
            setStudent(response.data);
        }
       ).catch(error=>{
        setError(error);
       })
    },[])
    return{
        student,
        error,
    }
}
export default AllStudentService;