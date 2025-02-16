import {  useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../Config';

// Custom Hook
const EventService = () => {
    const[event,setEvent]=useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null);
  useEffect(() => {
   axios.get(`${API_BASE_URL}/api/Events/GetEvent`).then(response=>{
    console.log(response.data);
    setEvent(response.data);
    setLoading(false);
   })
   .catch(error => {
    console.error("Error fetching data: ", error);
    setError('Error fetching data'); // Set error message
    setLoading(false); // Stop loading even in case of error
  })
  }, []);
  return {
    event,
    loading,
    error,
  }
  
};

export default EventService;
