import axios from "axios"
import { API_BASE_URL } from '../Config';
const RegistrationDetail=async(deptCode,semId)=>{
    try{
        const response=await axios.get(`${API_BASE_URL}/api/Registration/GetSemesterRegistration`, {
            params: { deptCode,semId }  
        });
        return response.data;
    }
    catch(error){
        console.error('Failed to get Data:', error);
        throw new Error(error.response?.data?.message || 'Failed to get Data');
    }
   
}
export default RegistrationDetail;