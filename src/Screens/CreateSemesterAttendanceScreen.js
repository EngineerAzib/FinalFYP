import React, { useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateSemesterAttendanceScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    semesterNumber: '',
    overallAttendance: '',
    courses: [
      { 
        code: '', 
        name: '', 
        creditHours: '', 
        totalClasses: '', 
        attendedClasses: '',
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate semester number
    const semesterNumber = parseInt(formData.semesterNumber);
    if (isNaN(semesterNumber) || semesterNumber <= 0) {
      newErrors.semesterNumber = 'Please enter a valid semester number';
    }

    // Validate overall attendance
    const overallAttendance = parseFloat(formData.overallAttendance);
    if (isNaN(overallAttendance) || overallAttendance < 0 || overallAttendance > 100) {
      newErrors.overallAttendance = 'Please enter a valid attendance percentage (0-100)';
    }

    // Validate courses
    formData.courses.forEach((course, index) => {
      if (!course.code.trim()) {
        newErrors[`course${index}Code`] = 'Course code is required';
      }
      
      if (!course.name.trim()) {
        newErrors[`course${index}Name`] = 'Course name is required';
      }
      
      const creditHours = parseFloat(course.creditHours);
      if (isNaN(creditHours) || creditHours <= 0) {
        newErrors[`course${index}CreditHours`] = 'Please enter valid credit hours';
      }
      
      const totalClasses = parseInt(course.totalClasses);
      if (isNaN(totalClasses) || totalClasses <= 0) {
        newErrors[`course${index}TotalClasses`] = 'Please enter a valid number of total classes';
      }
      
      const attendedClasses = parseInt(course.attendedClasses);
      if (isNaN(attendedClasses) || attendedClasses < 0) {
        newErrors[`course${index}AttendedClasses`] = 'Please enter a valid number of attended classes';
      }
      
      if (attendedClasses > totalClasses) {
        newErrors[`course${index}AttendedClasses`] = 'Attended classes cannot exceed total classes';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePercentage = (attended, total) => {
    if (!attended || !total) return 0;
    const attendedNum = parseInt(attended);
    const totalNum = parseInt(total);
    if (isNaN(attendedNum) || isNaN(totalNum) || totalNum === 0) return 0;
    return ((attendedNum / totalNum) * 100).toFixed(2);
  };

  const calculateOverallAttendance = () => {
    let totalAttendedClasses = 0;
    let totalClasses = 0;
    
    formData.courses.forEach(course => {
      const attended = parseInt(course.attendedClasses);
      const total = parseInt(course.totalClasses);
      
      if (!isNaN(attended) && !isNaN(total)) {
        totalAttendedClasses += attended;
        totalClasses += total;
      }
    });
    
    if (totalClasses === 0) return "0.00";
    return ((totalAttendedClasses / totalClasses) * 100).toFixed(2);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Format the data
      const attendanceData = {
        attendance: {
          currentSemester: {
            semesterNumber: parseInt(formData.semesterNumber),
            overallAttendance: parseFloat(formData.overallAttendance || calculateOverallAttendance()),
            courses: formData.courses.map(course => {
              const totalClasses = parseInt(course.totalClasses);
              const attendedClasses = parseInt(course.attendedClasses);
              return {
                code: course.code,
                name: course.name,
                creditHours: parseFloat(course.creditHours),
                totalClasses,
                attendedClasses,
                percentage: parseFloat(calculatePercentage(attendedClasses, totalClasses))
              };
            })
          }
        }
      };

      // Here you would typically make an API call to save the attendance record
      console.log('New Attendance Record Data:', attendanceData);
      Alert.alert('Success', 'Semester attendance record created successfully!');
      navigation.goBack();
    }
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [
        ...formData.courses, 
        { code: '', name: '', creditHours: '', totalClasses: '', attendedClasses: '' }
      ]
    });
  };

  const removeCourse = (index) => {
    if (formData.courses.length > 1) {
      const updatedCourses = [...formData.courses];
      updatedCourses.splice(index, 1);
      setFormData({
        ...formData,
        courses: updatedCourses
      });
    }
  };

  const updateCourseField = (index, field, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value
    };
    setFormData({
      ...formData,
      courses: updatedCourses
    });
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Attendance Records"
        currentScreen="Create Semester Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Semester Attendance</Text>

          <View style={styles.CreateDepartmentScreenlegendContainer}>
            <View style={styles.CreateDepartmentScreenlegendItem}>
              <View style={[styles.CreateDepartmentScreenlegendDot, styles.CreateDepartmentScreenrequiredDot]} />
              <Text style={styles.CreateDepartmentScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateDepartmentScreenlegendItem}>
              <View style={[styles.CreateDepartmentScreenlegendDot, styles.CreateDepartmentScreenoptionalDot]} />
              <Text style={styles.CreateDepartmentScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Semester Information">
            <FormField
              label="Semester Number"
              placeholder="Enter semester number"
              value={formData.semesterNumber}
              onChangeText={(text) => setFormData({ ...formData, semesterNumber: text })}
              keyboardType="numeric"
              error={errors.semesterNumber}
              required
            />

            <FormField
              label="Overall Attendance Percentage"
              placeholder="Enter overall attendance percentage (auto-calculated if left empty)"
              value={formData.overallAttendance}
              onChangeText={(text) => setFormData({ ...formData, overallAttendance: text })}
              keyboardType="numeric"
              error={errors.overallAttendance}
            />

            {formData.courses.length > 0 && (
              <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  Calculated Overall Attendance: {calculateOverallAttendance()}%
                </Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: '#666' }}>
                  Based on {formData.courses.length} course(s)
                </Text>
              </View>
            )}
          </SectionContainer>

          <SectionContainer 
            sectionNumber="2" 
            title={`Course Attendance (${formData.courses.length} ${formData.courses.length === 1 ? 'Course' : 'Courses'})`}
          >
            {formData.courses.map((course, index) => (
              <View key={index} style={{ 
                marginBottom: 20, 
                borderWidth: 1, 
                borderColor: '#e0e0e0', 
                borderRadius: 8, 
                padding: 15,
                backgroundColor: '#fafafa'
              }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 15 
                }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Course {index + 1}</Text>
                  
                  {formData.courses.length > 1 && (
                    <TouchableOpacity 
                      onPress={() => removeCourse(index)}
                      style={{
                        backgroundColor: '#ff6b6b',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <FormField
                  label="Course Code"
                  placeholder="Enter course code (e.g., SE301)"
                  value={course.code}
                  onChangeText={(text) => updateCourseField(index, 'code', text)}
                  error={errors[`course${index}Code`]}
                  required
                />

                <FormField
                  label="Course Name"
                  placeholder="Enter course name"
                  value={course.name}
                  onChangeText={(text) => updateCourseField(index, 'name', text)}
                  error={errors[`course${index}Name`]}
                  required
                />

                <FormField
                  label="Credit Hours"
                  placeholder="Enter credit hours"
                  value={course.creditHours}
                  onChangeText={(text) => updateCourseField(index, 'creditHours', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}CreditHours`]}
                  required
                />

                <FormField
                  label="Total Classes"
                  placeholder="Enter total number of classes"
                  value={course.totalClasses}
                  onChangeText={(text) => updateCourseField(index, 'totalClasses', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}TotalClasses`]}
                  required
                />

                <FormField
                  label="Attended Classes"
                  placeholder="Enter number of attended classes"
                  value={course.attendedClasses}
                  onChangeText={(text) => updateCourseField(index, 'attendedClasses', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}AttendedClasses`]}
                  required
                />

                <View style={{ 
                  padding: 10, 
                  backgroundColor: '#e0f7fa', 
                  borderRadius: 5, 
                  marginTop: 10,
                  borderLeftWidth: 4,
                  borderLeftColor: '#00bcd4'
                }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    Course Attendance: {calculatePercentage(course.attendedClasses, course.totalClasses)}%
                  </Text>
                </View>
              </View>
            ))}

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <TouchableOpacity 
                onPress={addCourse}
                style={{
                  backgroundColor: '#4caf50',
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add Another Course</Text>
              </TouchableOpacity>
            </View>
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              {
                title: "Cancel",
                onPress: () => navigation.goBack(),
                variant: "secondary",
              },
              {
                title: "Create Attendance Record",
                onPress: handleSubmit,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
};