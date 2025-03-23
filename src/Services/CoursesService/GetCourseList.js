import axios from "axios"
import { API_BASE_URL } from '../Config';
const GetCourseList= async()=>{
    try{
  const response=await axios.get(`${API_BASE_URL}/api/Course/GetAllCourse`);
  return response.data;
    }
    catch (error) {
        console.error("Error fetching department data:", error);
        throw error;
      }
}
export default GetCourseList;