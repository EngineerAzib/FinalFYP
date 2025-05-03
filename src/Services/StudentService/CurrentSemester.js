// Services/StudentService/CurrentSemester.js
import axios from "axios";
import { API_BASE_URL } from '../Config';

// Change from default export to named export
// Services/StudentService/CurrentSemester.js
export const CurrentSemester = async (studentId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/Student/GetCurrentSemester`,
        { params: { stdid: studentId } }
      );
      
      // Handle the actual response format
      const semesterId = response.data.id; // Changed from semid/semesterId to id
      
      if (!semesterId) {
        throw new Error("Semester ID not found in response");
      }
      
      return semesterId;
    } catch (error) {
      console.error("CurrentSemester error:", {
        error: error.message,
        response: error.response?.data
      });
      throw new Error("Could not determine current semester");
    }
  };
// Remove this line if it exists:
// export default CurrentSemester;