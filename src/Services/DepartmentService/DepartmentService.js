import { API_BASE_URL } from '../Config';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DepartmentService = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
// Check if useEffect is triggered
    axios.get(`${API_BASE_URL}/api/Department/GetDepartment`)
      .then(response => {
        console.log(response.data, "Data 1");
        setDepartments(response.data); // Store the fetched data
        setLoading(false); // Data is fetched, so set loading to false
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError('Error fetching data'); // Set error message
        setLoading(false); // Stop loading even in case of error
      });
  }, []);

  return {
    departments,
    loading,
    error,
  };
};

export default DepartmentService;
