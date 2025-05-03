import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
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
import { API_BASE_URL } from '../Services/Config';
import { CurrentSemester } from '../Services/StudentService/CurrentSemester';
import  CurrentSemesterCourse  from '../Services/StudentService/CurrentSemesterCourse';

export const AddAttendance = ({ route, navigation }) => {
  const { studentId } = route.params || {};
  const [formData, setFormData] = useState({
    semesterId: '',
    attendance: [{ courseId: '', totalClasses: '', attendedClasses: '' }]
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
  
        // Get current semester ID
        const semester = await CurrentSemester(studentId);
  console.log(semester,"semester");
  console.log(semester.id,"semester");
        // Get courses for this semester
        const courses = await CurrentSemesterCourse(studentId, semester);
  
        // Set state
        setSemesters(semester); // If this is supposed to be an array, wrap in [semester]
        setAvailableCourses(courses);
        setFormData(prev => ({
          ...prev,
          semesterId: semester?.toString() ?? ''
        }));
  
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Error", "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
  
    if (studentId) fetchData();
  }, [studentId]);
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.semesterId) {
      newErrors.semesterId = 'Semester selection is required';
    }

    formData.attendance.forEach((record, index) => {
      if (!record.courseId) {
        newErrors[`attendance_${index}_course`] = 'Course selection is required';
      }
      if (!record.totalClasses) {
        newErrors[`attendance_${index}_total`] = 'Total classes is required';
      } else if (isNaN(parseInt(record.totalClasses)) || parseInt(record.totalClasses) < 1) {
        newErrors[`attendance_${index}_total`] = 'Must be at least 1';
      }
      if (!record.attendedClasses) {
        newErrors[`attendance_${index}_attended`] = 'Attended classes is required';
      } else if (isNaN(parseInt(record.attendedClasses)) || parseInt(record.attendedClasses) < 0) {
        newErrors[`attendance_${index}_attended`] = 'Cannot be negative';
      } else if (parseInt(record.attendedClasses) > parseInt(record.totalClasses || 0)) {
        newErrors[`attendance_${index}_attended`] = 'Cannot exceed total classes';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCourse = () => {
    setFormData(prev => ({
      ...prev,
      attendance: [...prev.attendance, { courseId: '', totalClasses: '', attendedClasses: '' }]
    }));
  };

  const updateAttendanceField = (index, field, value) => {
    setFormData(prev => {
      const newAttendance = [...prev.attendance];
      newAttendance[index][field] = value;
      
      if (field === 'totalClasses' && newAttendance[index].attendedClasses > value) {
        newAttendance[index].attendedClasses = value;
      }
      
      return { ...prev, attendance: newAttendance };
    });
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const payload = {
          studentId: parseInt(studentId),
          semesterId: parseInt(formData.semesterId),
          attendanceRecords: formData.attendance.map(record => ({
            courseId: parseInt(record.courseId),
            totalClasses: parseInt(record.totalClasses),
            attendedClasses: parseInt(record.attendedClasses)
          }))
        };
console.log(payload)
        const response = await axios.post(
          `${API_BASE_URL}/api/AcademicDetail/AddAttendance`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      
        if (response.data?.success) {
          Alert.alert('Success', 'Attendance records added!');
          navigation.goBack();
        } else {
          throw new Error(response.data?.message || 'Failed to save attendance');
        }
      } catch (error) {
        console.error('Error saving attendance:', error);
        Alert.alert('Error', error.message || 'Failed to save attendance');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const removeAttendanceRecord = (index) => {
    if (formData.attendance.length > 1) {
      setFormData(prev => ({
        ...prev,
        attendance: prev.attendance.filter((_, i) => i !== index)
      }));
    } else {
      Alert.alert('Cannot remove', 'You must have at least one course');
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
        title="Attendance Records"
        currentScreen="Add Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView contentContainerStyle={styles.EditDepartmentScreenscrollContent}>
          <Text style={styles.EditStudentAttendanceformTitle}>Add Attendance Records</Text>
          
          {/* <SectionContainer sectionNumber="1" title="Semester Information">
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Semester*</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.semesterId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, semesterId: value }))}
                  style={styles.picker}
                  mode="dropdown"
                  dropdownIconColor="#6C63FF"
                >
                  <Picker.Item label="Select a semester" value="" />
                  {semesters.map(semester => (
                    <Picker.Item 
                      key={semester.id} 
                      label={`Semester ${semester.semesterName}`} 
                      value={semester.id.toString()} 
                    />
                  ))}
                </Picker>
              </View>
              {errors.semesterId && <Text style={styles.errorText}>{errors.semesterId}</Text>}
            </View>
          </SectionContainer> */}

          <SectionContainer sectionNumber="2" title="Attendance Records">
            {formData.attendance.map((record, index) => (
              <View key={`attendance-${index}`} style={styles.EditStudentAttendancecourseCard}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Select Course*</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={record.courseId}
                      onValueChange={(value) => updateAttendanceField(index, 'courseId', value)}
                      style={styles.picker}
                      mode="dropdown"
                      dropdownIconColor="#6C63FF"
                    >
                      <Picker.Item label="Select a course" value="" />
                      {availableCourses.map(course => (
                        <Picker.Item 
                          key={course.id} 
                          label={course.name} 
                          value={course.id.toString()} 
                        />
                      ))}
                    </Picker>
                  </View>
                  {errors[`attendance_${index}_course`] && (
                    <Text style={styles.errorText}>{errors[`attendance_${index}_course`]}</Text>
                  )}
                </View>

                <View style={styles.EditStudentAttendancerowContainer}>
                  <View style={styles.EditStudentAttendanceinputHalf}>
                    <Text style={styles.label}>Total Classes*</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={record.totalClasses}
                        onValueChange={(value) => updateAttendanceField(index, 'totalClasses', value)}
                        style={styles.picker}
                        mode="dropdown"
                      >
                        <Picker.Item label="Select total" value="" />
                        {Array.from({ length: 45 }, (_, i) => (
                          <Picker.Item key={`total-${i}`} label={`${i + 1}`} value={`${i + 1}`} />
                        ))}
                      </Picker>
                    </View>
                    {errors[`attendance_${index}_total`] && (
                      <Text style={styles.errorText}>{errors[`attendance_${index}_total`]}</Text>
                    )}
                  </View>

                  <View style={styles.EditStudentAttendanceinputHalf}>
                    <Text style={styles.label}>Attended Classes*</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={record.attendedClasses}
                        onValueChange={(value) => updateAttendanceField(index, 'attendedClasses', value)}
                        style={styles.picker}
                        mode="dropdown"
                      >
                        <Picker.Item label="Select attended" value="" />
                        {Array.from({ length: record.totalClasses ? parseInt(record.totalClasses) + 1 : 1 }, (_, i) => (
                          <Picker.Item key={`attended-${i}`} label={`${i}`} value={`${i}`} />
                        ))}
                      </Picker>
                    </View>
                    {errors[`attendance_${index}_attended`] && (
                      <Text style={styles.errorText}>{errors[`attendance_${index}_attended`]}</Text>
                    )}
                  </View>
                </View>

                {formData.attendance.length > 1 && (
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeAttendanceRecord(index)}
                  >
                    <MaterialIcons name="delete" size={20} color="#EF4444" />
                    <Text style={styles.removeButtonText}>Remove Course</Text>
                  </TouchableOpacity>
                )}
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
              { title: "Save Attendance", onPress: handleSave, variant: "primary", disabled: isSubmitting },
            ]}
          />
        </View>
      </View>
    </View>
  );
};