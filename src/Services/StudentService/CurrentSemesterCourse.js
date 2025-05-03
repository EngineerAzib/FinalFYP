import axios from "axios"
import { API_BASE_URL } from '../Config';
const CurrentSemesterCourse=async (studentId,semesterId)=>{
  try{
    const response=await axios.get(`${API_BASE_URL}/api/Student/GetCurrentCourse`,
        {params: { 
        stdid: studentId,    // Changed to stdid
        semid: semesterId   // Changed to semid
      }}
    );
    return  response.data;
    
  }
  catch(error){
    console.error("Error fetching semester data:", error);
    throw error;
  }
}
export default CurrentSemesterCourse;