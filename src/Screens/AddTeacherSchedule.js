import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import { API_BASE_URL } from '../Services/Config';
export const AddTeacherSchedule = ({ route, navigation }) => {
  const { teacherId, teacherName } = route.params;
  
  // Constants
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const TIME_SLOTS = [
    '8:00 AM - 9:30 AM',
    '9:30 AM - 11:00 AM',
    '11:00 AM - 12:30 PM',
    '1:30 PM - 3:00 PM',
    '3:00 PM - 4:30 PM'
  ];
  const DEFAULT_SECTIONS = ['A', 'B', 'C', 'D'];

  // State management
  const [schedules, setSchedules] = useState([{
    teacherId,
    day: DAYS[0],
    timeSlot: '',
    departmentId: '',
    section: ''
  }]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetDepartmentList();
        
        if (!response || !Array.isArray(response)) {
          throw new Error('Invalid department data format');
        }
        
        setDepartments(response);
        setError(null);
      } catch (err) {
        console.error('Failed to load departments:', err);
        setError('Failed to load department data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;
    setSchedules(updatedSchedules);
  };

  // Add new schedule slot
  const addSchedule = () => {
    setSchedules([...schedules, {
      teacherId,
      day: DAYS[0],
      timeSlot: '',
      departmentId: '',
      section: ''
    }]);
  };

  // Remove schedule slot
  const removeSchedule = (index) => {
    if (schedules.length <= 1) return;
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  // Validate form data
  const validateForm = () => {
    for (const schedule of schedules) {
      if (!schedule.day || !schedule.timeSlot || !schedule.departmentId || !schedule.section) {
        return false;
      }
    }
    return true;
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
  
    try {
      setSubmitting(true);
      
      // Format the payload to match your API requirements
      const payload = schedules.map(schedule => ({
        TeacherId: schedule.teacherId,
        Day: schedule.day,
        TimeSlot: schedule.timeSlot,
        DepartmentID: schedule.departmentId,
        Section: schedule.section
      }));
  
      console.log('Submitting payload:', payload); // For debugging
      
      // Replace with your actual API endpoint
      const response = await axios.post(`${API_BASE_URL}/api/Teacher/AddTeacherSchedule`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      Alert.alert('Success', 'Schedule saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving schedule:', error);
      let errorMessage = 'Failed to save schedule';
      
     
  
      Alert.alert('Error', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <CustomHeader
          title="Teacher Schedule"
          currentScreen="Add Schedule"
          showSearch={false}
          showRefresh={false}
          navigation={navigation}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <CustomHeader
          title="Teacher Schedule"
          currentScreen="Add Schedule"
          showSearch={false}
          showRefresh={false}
          navigation={navigation}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              fetchData();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.CreateSubjectsScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Teacher Schedule"
        currentScreen="Add Schedule"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateSubjectsScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateSubjectsScreenscrollContent}
        >
          <Text style={styles.CreateSubjectsScreenformTitle}>
            Add Schedule for {teacherName}
          </Text>

          <View style={styles.CreateSubjectsScreenlegendContainer}>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenrequiredDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Required*</Text>
            </View>
          </View>

          {schedules.map((schedule, index) => (
            <SectionContainer key={index} sectionNumber={index + 1} title="Schedule Information">
              <FormField
                label="Department*"
                placeholder="Select Department"
                required
                type="select"
                value={schedule.departmentId}
                onChangeText={(value) => handleInputChange(index, 'departmentId', value)}
                options={departments.map(dept => ({
                  label: dept.departmentName,
                  value: dept.id.toString()
                }))}
              />

              <FormField
                label="Day*"
                required
                placeholder="Select Day"
                type="select"
                value={schedule.day}
                onChangeText={(value) => handleInputChange(index, 'day', value)}
                options={DAYS.map(day => ({ label: day, value: day }))}
              />

              <FormField
                label="Time Slot*"
                placeholder="Select Time Slot"
                required
                type="select"
                value={schedule.timeSlot}
                onChangeText={(value) => handleInputChange(index, 'timeSlot', value)}
                options={TIME_SLOTS.map(slot => ({ label: slot, value: slot }))}
              />

              <FormField
                label="Section*"
                placeholder="Select Section"
                required
                type="select"
                value={schedule.section}
                onChangeText={(value) => handleInputChange(index, 'section', value)}
                options={DEFAULT_SECTIONS.map(section => ({ 
                  label: section, 
                  value: section 
                }))}
              />
            </SectionContainer>
          ))}

          <View style={styles.CreateSubjectsScreenbuttonContainer}>
            <TouchableOpacity
              style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenaddButton]}
              onPress={addSchedule}
            >
              <Text style={styles.CreateSubjectsScreenbuttonText}>+ Add More</Text>
            </TouchableOpacity>

            {schedules.length > 1 && (
              <TouchableOpacity
                style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenremoveButton]}
                onPress={() => removeSchedule(schedules.length - 1)}
              >
                <Text style={styles.CreateSubjectsScreenremoveButtonText}>− Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              {
                title: 'Cancel',
                onPress: () => navigation.goBack(),
                variant: 'secondary',
              },
              {
                title: submitting ? 'Saving...' : 'Save Schedule',
                onPress: handleSubmit,
                variant: 'primary',
                disabled: submitting,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};