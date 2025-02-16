import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from '../Config';
const StudentById=(stdid)=>{
const[studentByID,setstudentByID]=useState([]);
const[error,setError]=useState([]);

useEffect(()=>{
    console.log(stdid,"Azib")
    axios.get(`${API_BASE_URL}/api/Student/GetStudentById`,{
        params:{stdid}
    }).then(
        response=>{
            setstudentByID(response.data);
        }
    ).catch(error=>{
        setError(error);
    })
},[])
return{
    studentByID,error
}
}
export default StudentById;
