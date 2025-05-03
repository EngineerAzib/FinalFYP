import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetSemesterList from '../Services/CoursesService/SemesterList';
import GetCourseList from '../Services/CoursesService/GetCourseList';

import { API_BASE_URL } from '../Services/Config';

export const AddSemester = ({ route, navigation }) => {
  const { studentId } = route.params || {};
  const [formData, setFormData] = useState({
    semesterId: '',
    courses: [{ courseId: '', gpa: '' }]
  });
  const [semesters, setSemesters] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [semesterData, courseData] = await Promise.all([
          GetSemesterList(),
          GetCourseList()
        ]);
        setSemesters(semesterData);
        setAvailableCourses(courseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert('Error', 'Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.semesterId) {
      newErrors.semesterId = 'Semester selection is required';
    }

    formData.courses.forEach((course, index) => {
      if (!course.courseId) {
        newErrors[`course_${index}_id`] = 'Course selection is required';
      }
      if (!course.gpa) {
        newErrors[`course_${index}_gpa`] = 'GPA is required';
      } else if (isNaN(parseFloat(course.gpa)) || parseFloat(course.gpa) < 0 || parseFloat(course.gpa) > 4) {
        newErrors[`course_${index}_gpa`] = 'GPA must be between 0 and 4';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, { courseId: '', gpa: '' }]
    }));
  };

  const updateCourseField = (index, field, value) => {
    setFormData(prev => {
      const newCourses = [...prev.courses];
      newCourses[index][field] = value;
      return { ...prev, courses: newCourses };
    });
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          studentId: parseInt(studentId),
          semesterId: parseInt(formData.semesterId),
          acadmicDetail: formData.courses.map(course => ({
            courseId: parseInt(course.courseId),
            gpa: parseFloat(course.gpa)
          }))
        };

        const response = await axios.post(
          `${API_BASE_URL}/api/AcademicDetail/AddAcedemicDetail`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      
        if (response.data && response.data.success) {

          Alert.alert('Success', 'Academic details added successfully!');
          navigation.goBack();
        } 
      } catch (error) {
        console.error('Error saving academic details:', error);
        Alert.alert('Error', error.message || 'Failed to save academic details. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
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
    <View style={styles.EditStudentAttendancemainContainer}>
      <Header />
      <CustomHeader
        title="Academic Records"
        currentScreen="Add New Semester"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView contentContainerStyle={styles.EditDepartmentScreenscrollContent}>
          <Text style={styles.EditStudentAttendanceformTitle}>Add New Semester</Text>
          
          <SectionContainer sectionNumber="1" title="Semester Information">
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Semester*</Text>
              <Picker
                selectedValue={formData.semesterId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, semesterId: value }))}
                style={styles.picker}
              >
                <Picker.Item label="Select a semester" value="" />
                {semesters.map(semester => (
                  <Picker.Item 
                    key={semester.id} 
                    label={`Semester ${semester.semesterName}`} 
                    value={semester.id} 
                  />
                ))}
              </Picker>
              {errors.semesterId && (
                <Text style={styles.errorText}>{errors.semesterId}</Text>
              )}
            </View>
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="Courses">
            {formData.courses.map((course, index) => (
              <View key={index} style={styles.EditStudentAttendancecourseCard}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Select Course*</Text>
                  <Picker
                    selectedValue={course.courseId}
                    onValueChange={(value) => updateCourseField(index, 'courseId', value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a course" value="" />
                    {availableCourses.map(course => (
                      <Picker.Item 
                        key={course.id} 
                        label={course.name} 
                        value={course.id} 
                      />
                    ))}
                  </Picker>
                  {errors[`course_${index}_id`] && (
                    <Text style={styles.errorText}>{errors[`course_${index}_id`]}</Text>
                  )}
                </View>

                <FormField
                  label="GPA"
                  value={course.gpa}
                  onChangeText={(text) => updateCourseField(index, 'gpa', text)}
                  placeholder="0.0 - 4.0"
                  required
                  keyboardType="numeric"
                  error={errors[`course_${index}_gpa`]}
                />
              </View>
            ))}

            <TouchableOpacity 
              style={styles.addCourseButton}
              onPress={handleAddCourse}
            >
              <MaterialIcons name="add" size={20} color="#6C63FF" />
              <Text style={styles.addCourseButtonText}>Add Another Course</Text>
            </TouchableOpacity>
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Save Semester", onPress: handleSave, variant: "primary", disabled: isSubmitting },
            ]}
          />
        </View>
      </View>
    </View>
  );
};