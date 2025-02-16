import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from '../Config';
const SemesterCourse=({depId,semId})=>{
    const[course,setCourse]=useState([]);
    const[error,setError]=useState(null);
    useEffect(()=>{
     axios.get(`${API_BASE_URL}/api/Course/GetCourse`, {
        params: { depId,semId }  // Pass the deptId as a query parameter
    }).then(
        response=>{
            setCourse(response.data)
        }
     ).catch(error=>{
        setError(error)
     })
 },[depId,semId])
 return{
    course,error
 }
}
export default SemesterCourse;