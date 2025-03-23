import axios from "axios";
import { API_BASE_URL } from '../Config';

const StudentById = async (stdid) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Student/GetStudentById`, {
      params: { stdid }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export default StudentById;