import { API_BASE_URL } from '../Config';
import { useEffect, useState } from "react";
import axios from "axios";
const NewsService =()=>{
    const [news,setNews]=useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null);
useEffect(()=>{
    axios.get(`${API_BASE_URL}/api/News/GetNews`).then(response=>{
        console.log(response.data);
        setNews(response.data);
        setLoading(false); 
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
        setError('Error fetching data'); // Set error message
        setLoading(false); // Stop loading even in case of error
      })
},[])
return {
    news,
    loading,
    error,
  };
}
export default NewsService;