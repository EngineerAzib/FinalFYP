import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from '../Config';
const SemesterDepartment=({ deptId } )=>{
    const[semesterDepartment,setSemesterDepartment]=useState([]);
    const[error,setError]=useState(null);
    useEffect(()=>{
axios.get(`${API_BASE_URL}/api/Semester/GetSemesterCourse`, {
    params: { deptId }  // Pass the deptId as a query parameter
}).then(
    response=>{
        console.log(response.data)
        setSemesterDepartment(response.data)
    }
).catch(error=>{
    setError(error,"error")
})
    },[deptId])
return{
    semesterDepartment,
    error
}
    
}
export default  SemesterDepartment;
