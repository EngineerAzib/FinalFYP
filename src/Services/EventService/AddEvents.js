import axios from "axios"
import { API_BASE_URL } from '../Config';
const AddEvents=async()=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/Events/AddEvents`);
        return  response.data;
    }
   
    catch (error) {
        console.error('Failed to get Data:', error);
        throw new Error(error.response?.data?.message || 'Failed to get Data');
    }

}
export default AddEvents;