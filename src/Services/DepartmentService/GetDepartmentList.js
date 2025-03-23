import { API_BASE_URL } from '../Config';
import axios from 'axios';

const GetDepartmentList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Department/GetDepartmentList`);
    console.log("API Response:", response.data); // Log the response

    if (!Array.isArray(response.data)) {
      throw new Error("Expected an array but received a different format.");
    }

    return response.data; 
  } catch (error) {
    console.error("Error fetching department data:", error);
    throw error;
  }
};


export default GetDepartmentList;