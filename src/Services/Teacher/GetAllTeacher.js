import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from '../Config';
const GetAllTeacher=()=>{
const[teacher,setTeacher]=useState([]);
useEffect(()=>{
    axios.get(`${API_BASE_URL}/api/Teacher/GetAllTeacher`).then(respnse=>{
        setTeacher(respnse.data.teacher);

    })
},[])
return{
    teacher
}
}
export default GetAllTeacher;