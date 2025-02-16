import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Config";

const useTeacherById = (teacherId) => {
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("🚀 Hook initialized with teacherId:", teacherId);

    useEffect(() => {
        if (!teacherId) {
            console.warn("🚨 No teacherId provided, skipping API call.");
            return;
        }

        console.log("🔥 useEffect running, teacherId:", teacherId);

        const fetchTeacherData = async () => {
            try {
                console.log("azib")
                const response = await axios.get(`${API_BASE_URL}/api/Teacher/GetTeacher`, {
                    params: { teacherId }
                });
                console.log("✅ API Response:", response.data);
                setTeacherData(response.data);
            } catch (err) {
                console.error("❌ Error fetching teacher data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, [teacherId]);

    return { teacherData, loading, error };
};

export default useTeacherById;
