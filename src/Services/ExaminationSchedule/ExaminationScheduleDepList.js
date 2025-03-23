import axios from 'axios';
import { API_BASE_URL } from '../Config';

// Fetch department list
export const ExaminationScheduleDepList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ExamSchedule/GetExamScheduleDepartment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching department list:", error);
    throw error;
  }
};

// Fetch year list based on department ID
export const ExaminationScheduleYearList = async (depId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ExamSchedule/GetExamScheduleYear`, {
      params: { depId } // Pass depId as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching year list:", error);
    throw error;
  }
};
export const ExaminationScheduleDepYearList = async (depId,yearId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ExamSchedule/GetExamScheduleDepYear`, {
        params: { depId,yearId} // Pass depId as a query parameter
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching year list:", error);
      throw error;
    }
  };