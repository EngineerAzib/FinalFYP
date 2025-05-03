import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetSemesterList from '../Services/CoursesService/SemesterList';
import GetCourseList from '../Services/CoursesService/GetCourseList';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

const SemesterRegistration = ({ navigation, route }) => {
  const [subjects, setSubjects] = useState([{
    departmentId: '',
    semesterId: '',
    courseId: '',
    studentRegistred: null,
    maxStudent: null,
    startDate: null,
    endDate: null
  }]);

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [depts, sems, crses] = await Promise.all([
          GetDepartmentList(),
          GetSemesterList(),
          GetCourseList()
        ]);
        setDepartments(depts);
        setSemesters(sems);
        setCourses(crses);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load registration data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addMoreSubjects = () => {
    setSubjects([...subjects, {
      departmentId: '',
      semesterId: '',
      courseId: '',
      studentRegistred: null,
      maxStudent: null,
      startDate: null,
      endDate: null
    }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects);
    }
  };

  const validateSubject = (subject) => {
    if (!subject.departmentId) throw new Error('Department is required');
    if (!subject.semesterId) throw new Error('Semester is required');
    if (!subject.courseId) throw new Error('Course is required');
    if (subject.maxStudent !== null && isNaN(subject.maxStudent)) {
      throw new Error('Max students must be a number');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const subject of subjects) {
        validateSubject(subject);

        const payload = {
          departmentId: parseInt(subject.departmentId, 10),
          semesterId: parseInt(subject.semesterId, 10),
          courseId: subject.courseId,
         
          maxStudent: subject.maxStudent,
          startDate: subject.startDate,
          endDate: subject.endDate
        };
        console.log('Payload:', payload);

        const response = await axios.post(
          `${API_BASE_URL}/api/Registration/CreateAddRegistration`, 
          payload,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Registration successful:', response.data);
      }

      Alert.alert('Success', 'Registration completed successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Failed to complete registration');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.CreateSubjectsScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Course Registration"
        currentScreen="Semester Registration"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateSubjectsScreencontentContainer}>
        <ScrollView contentContainerStyle={styles.CreateSubjectsScreenscrollContent}>
          <Text style={styles.CreateSubjectsScreenformTitle}>Semester Registration</Text>

          {subjects.map((subject, index) => (
            <SectionContainer key={index} sectionNumber={index+1} title={`Course ${index+1}`}>
              <FormField
                label="Department*"
                placeholder="Select Department"
                type="select"
                value={subject.departmentId}
                onChangeText={(value) => handleInputChange(index, 'departmentId', value)}
                options={departments.map(dept => ({
                  label: dept.departmentName,
                  value: dept.id.toString()
                }))}
              />

              <FormField
                                label="Semester"
                                placeholder="Select Semester"
                                type="select"
                                required
                                value={subject.semesterId}
                                onChangeText={(value) => handleInputChange(index, 'semesterId', value)}
                                options={semesters.map((sem) => ({
                                  label: sem.semesterName,
                                  value: sem.id.toString(),
                                }))}
                              />
              <FormField
                label="Course*"
                  placeholder="Select Course"
                type="select"
                value={subject.courseId}
                onChangeText={(value) => handleInputChange(index, 'courseId', value)}
                options={courses.map(course => ({
                  label: course.name,
                  value: course.id.toString()
                }))}
              />

              <FormField
                label="Max Students"
                value={subject.maxStudent?.toString() || ''}
                onChangeText={(value) => handleInputChange(index, 'maxStudent', value)}
                placeholder="Enter maximum students"
                keyboardType="numeric"
              />
              

              <FormField
                label="Start Date"
                type="date"
                value={subject.startDate}
                onChangeText={(value) => handleInputChange(index, 'startDate', value)}
              />

              <FormField
                label="End Date"
                type="date"
                value={subject.endDate}
                onChangeText={(value) => handleInputChange(index, 'endDate', value)}
              />

              {subjects.length > 1 && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeSubject(index)}
                >
                  <Text style={styles.removeButtonText}>Remove Course</Text>
                </TouchableOpacity>
              )}
            </SectionContainer>
          ))}

          <TouchableOpacity 
            style={styles.addButton}
            onPress={addMoreSubjects}
          >
            <Text style={styles.addButtonText}>+ Add Another Course</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Register", onPress: handleSubmit, variant: "primary" },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default SemesterRegistration;