import axios from "axios"
import { API_BASE_URL } from '../Config';
const CreateStudentInfo = async(studentDepartment)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/Student/AddStudent`,studentDepartment)
        return response.data
    }
    catch (error) {
        console.error('Error creating Student Info:', error);
        throw new Error(error.response?.data?.message || 'Failed to create Student Info');
    }
}
export default CreateStudentInfo;