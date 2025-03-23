import axios from "axios"
import { API_BASE_URL } from '../Config';
const GetTeacherList=async ()=>{
  try{
    const response=await axios.get(`${API_BASE_URL}/api/Course/GetAllTeacher`);
    return  response.data;
    
  }
  catch(error){
    console.error("Error fetching Teacher data:", error);
    throw error;
  }
}
export default GetTeacherList;