import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Config";

const useTeacherById = (teacherId) => {
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teacherId) {
            console.warn("No teacherId provided, skipping API call.");
            return;
        }

        console.log("Fetching data for teacherId:", teacherId);

        axios.get(`${API_BASE_URL}/api/Teacher/GetTeacher`, {
            params: { teacherId } 
        })
        .then(response => {
            console.log("API Response:", response.data);
            setTeacherData(response.data); 
        })
        .catch(error => {
            setError(error);
            console.error("Error fetching teacher data:", error);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [teacherId]);

    return { teacherData, loading, error };
};

export default useTeacherById;
