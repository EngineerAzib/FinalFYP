
import axios from "axios";
import { API_BASE_URL } from '../Config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const GetStudentNotification = async () => {
  try {
    // 1. Get and verify token
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');
    
    const cleanToken = token.replace(/['"]/g, '').trim();
    console.log("Using Token:", cleanToken);

    // 2. Make request with identical headers to curl
    const response = await axios({
      method: 'get',
      url: `${API_BASE_URL}/api/Notification/GetStudentNotification`,
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log("API Response:", response.data);
    return response.data;

  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    if (error.response?.status === 401) {
      // Token is invalid - clear it
      await AsyncStorage.removeItem('userToken');
      Alert.alert("Session has expired. Please login again")
    }
    
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
  }
};

export default GetStudentNotification;