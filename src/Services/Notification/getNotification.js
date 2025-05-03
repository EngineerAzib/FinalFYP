import axios from "axios"
import { API_BASE_URL } from '../Config';
const GetNotification=async()=>{
    try{
        const response=await axios.get(`${API_BASE_URL}/api/Notification/GetNotification`);
        return  response.data;
    }
   
    catch (error) {
        console.error('Failed to get Data:', error);
        throw new Error(error.response?.data?.message || 'Failed to get Data');
    }

}
export default GetNotification;