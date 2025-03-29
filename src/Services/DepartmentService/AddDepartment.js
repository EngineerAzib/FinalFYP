import { API_BASE_URL } from '../Config';
import axios from 'axios';

export const CreateDepartment = async (departmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Department/AddDepartment`, departmentData);
    return response.data; // Automatically parses JSON
  } catch (error) {
    console.error('Error creating department:', error);
    throw new Error(error.response?.data?.message || 'Failed to create department');
  }
};