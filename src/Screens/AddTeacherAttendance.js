import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import axios from 'axios';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetCourseList from '../Services/CoursesService/GetCourseList';
import { API_BASE_URL } from '../Services/Config';
export const AddTeacherAttendance = ({ route, navigation }) => {
  const { teacherId, teacherName } = route.params;
  console.log(teacherId,"teacherId")
  // Constants
  const DEFAULT_SECTIONS = ['A', 'B', 'C', 'D'];

  // State management
  const [attendanceRecords, setAttendanceRecords] = useState([{
    TeacherId: teacherId,
    CourseId: '',
    TotalClasses: '',
    ClassesTaken: '',
    DepartmentID: '',
    Section: ''
  }]);

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [depts, crses] = await Promise.all([
          GetDepartmentList(),
          GetCourseList()
        ]);
        
        setDepartments(depts);
        setCourses(crses);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load registration data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...attendanceRecords];
    updatedRecords[index][field] = value;
    setAttendanceRecords(updatedRecords);
  };

  // Add new attendance record
  const addRecord = () => {
    setAttendanceRecords([...attendanceRecords, {
      TeacherId: teacherId,
      CourseId: '',
      TotalClasses: '',
      ClassesTaken: '',
      DepartmentID: '',
      Section: ''
    }]);
  };

  // Remove attendance record
  const removeRecord = (index) => {
    if (attendanceRecords.length <= 1) return;
    const updatedRecords = [...attendanceRecords];
    updatedRecords.splice(index, 1);
    setAttendanceRecords(updatedRecords);
  };

  // Validate form data
  const validateForm = () => {
    for (const record of attendanceRecords) {
      if (!record.CourseId || !record.TotalClasses || !record.ClassesTaken || 
          !record.DepartmentID || !record.Section) {
        return false;
      }
      
      // Validate numeric fields
      if (isNaN(record.TotalClasses) || isNaN(record.ClassesTaken)) {
        return false;
      }
      
      if (parseInt(record.ClassesTaken) > parseInt(record.TotalClasses)) {
        return false;
      }
    }
    return true;
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill all required fields with valid values');
      return;
    }

    try {
      setSubmitting(true);
      
      // Format the data for API
      const payload = attendanceRecords.map(record => ({
        TeacherId: record.TeacherId,
        CourseId: record.CourseId,
        TotalClasses: parseInt(record.TotalClasses),
        ClassesTaken: parseInt(record.ClassesTaken),
        DepartmentID: record.DepartmentID,
        Section: record.Section
      }));

      console.log('Submitting attendance:', payload);
      
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${API_BASE_URL}/api/Teacher/AddTeacherAttendance`, 
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      Alert.alert('Success', 'Attendance records saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving attendance:', error);
      let errorMessage = 'Failed to save attendance records';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid data submitted';
        } else if (error.response.status === 409) {
          errorMessage = 'Attendance record already exists for this course';
        }
      }

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
          title="Teacher Attendance"
          currentScreen="Add Attendance"
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
          title="Teacher Attendance"
          currentScreen="Add Attendance"
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
        title="Teacher Attendance"
        currentScreen="Add Attendance"
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
            Add Attendance for {teacherName}
          </Text>

          <View style={styles.CreateSubjectsScreenlegendContainer}>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenrequiredDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Required*</Text>
            </View>
          </View>

          {attendanceRecords.map((record, index) => (
            <SectionContainer key={index} sectionNumber={index + 1} title="Attendance Record">
              <FormField
                label="Department*"
                placeholder="Select Department"
                required
                type="select"
                value={record.DepartmentID}
                onChangeText={(value) => handleInputChange(index, 'DepartmentID', value)}
                options={departments.map(dept => ({
                  label: dept.departmentName,
                  value: dept.id.toString()
                }))}
              />

              <FormField
                label="Course*"
                placeholder="Select Course"
                required
                type="select"
                value={record.CourseId}
                onChangeText={(value) => handleInputChange(index, 'CourseId', value)}
                options={courses.map(course => ({
                  label: course.name,
                  value: course.id.toString()
                }))}
              />

              <FormField
                label="Section*"
                placeholder="Select Section"
                required
                type="select"
                value={record.Section}
                onChangeText={(value) => handleInputChange(index, 'Section', value)}
                options={DEFAULT_SECTIONS.map(section => ({ 
                  label: section, 
                  value: section 
                }))}
              />

              <FormField
                label="Total Classes*"
                placeholder="Enter total classes"
                required
                keyboardType="numeric"
                value={record.TotalClasses}
                onChangeText={(value) => handleInputChange(index, 'TotalClasses', value)}
              />

              <FormField
                label="Classes Taken*"
                placeholder="Enter classes taken"
                required
                keyboardType="numeric"
                value={record.ClassesTaken}
                onChangeText={(value) => handleInputChange(index, 'ClassesTaken', value)}
              />
            </SectionContainer>
          ))}

          <View style={styles.CreateSubjectsScreenbuttonContainer}>
            <TouchableOpacity
              style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenaddButton]}
              onPress={addRecord}
            >
              <Text style={styles.CreateSubjectsScreenbuttonText}>+ Add More</Text>
            </TouchableOpacity>

            {attendanceRecords.length > 1 && (
              <TouchableOpacity
                style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenremoveButton]}
                onPress={() => removeRecord(attendanceRecords.length - 1)}
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
                title: submitting ? 'Saving...' : 'Save Attendance',
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