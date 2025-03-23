import axios from "axios"
import { API_BASE_URL } from '../Config';
const GetSemesterList=async ()=>{
  try{
    const response=await axios.get(`${API_BASE_URL}/api/Semester/GetSemester`);
    return  response.data;
    
  }
  catch(error){
    console.error("Error fetching  data:", error);
    throw error;
  }
}
export default GetSemesterList;