import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Config";

const AcedmicDetail = (stdId) => {
  const [academics, setacademics] = useState(null); // Default to null instead of []
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stdId) return; // Prevent API call if stdId is undefined
    console.log(stdId,"std")
    axios
      .get(`${API_BASE_URL}/api/AcademicDetail/GetAcademicDetail`, {
        params: { stdId }, // Corrected from stdid to stdId
      })
      .then((response) => {
        setAcademicDetail(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        setError(error);
      });
  }, [stdId]); // Add stdId to the dependency array

  return {
    academics,
    
  };
};

export default AcedmicDetail;
