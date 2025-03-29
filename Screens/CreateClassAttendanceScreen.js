import React, { useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateClassAttendanceScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    date: '',
    courses: [
      { 
        code: '', 
        name: '', 
        department: '',
        section: '',
        totalStudents: '',
        presentStudents: '',
        absentStudents: '',
        topic: '',
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate date
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    // Validate courses
    formData.courses.forEach((course, index) => {
      if (!course.code.trim()) {
        newErrors[`course${index}Code`] = 'Course code is required';
      }
      
      if (!course.name.trim()) {
        newErrors[`course${index}Name`] = 'Course name is required';
      }
      
      if (!course.department.trim()) {
        newErrors[`course${index}Department`] = 'Department is required';
      }
      
      if (!course.section.trim()) {
        newErrors[`course${index}Section`] = 'Section is required';
      }
      
      const totalStudents = parseInt(course.totalStudents);
      if (isNaN(totalStudents) || totalStudents <= 0) {
        newErrors[`course${index}TotalStudents`] = 'Please enter a valid number of total students';
      }
      
      const presentStudents = parseInt(course.presentStudents);
      if (isNaN(presentStudents) || presentStudents < 0) {
        newErrors[`course${index}PresentStudents`] = 'Please enter a valid number of present students';
      }
      
      if (presentStudents > totalStudents) {
        newErrors[`course${index}PresentStudents`] = 'Present students cannot exceed total students';
      }
      
      const absentStudents = parseInt(course.absentStudents);
      if (absentStudents !== (totalStudents - presentStudents)) {
        newErrors[`course${index}AbsentStudents`] = 'Absent students should equal (total - present)';
      }
      
      if (!course.topic.trim()) {
        newErrors[`course${index}Topic`] = 'Class topic is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePercentage = (present, total) => {
    if (!present || !total) return 0;
    const presentNum = parseInt(present);
    const totalNum = parseInt(total);
    if (isNaN(presentNum) || isNaN(totalNum) || totalNum === 0) return 0;
    return ((presentNum / totalNum) * 100).toFixed(2);
  };

  const calculateAbsentStudents = (totalStudents, presentStudents) => {
    const total = parseInt(totalStudents) || 0;
    const present = parseInt(presentStudents) || 0;
    return Math.max(0, total - present);
  };

  const handleStudentCountChange = (index, field, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value
    };
    
    // Auto-calculate absent students when total or present changes
    if (field === 'totalStudents' || field === 'presentStudents') {
      const total = field === 'totalStudents' ? parseInt(value) || 0 : parseInt(updatedCourses[index].totalStudents) || 0;
      const present = field === 'presentStudents' ? parseInt(value) || 0 : parseInt(updatedCourses[index].presentStudents) || 0;
      updatedCourses[index].absentStudents = String(Math.max(0, total - present));
    }
    
    setFormData({
      ...formData,
      courses: updatedCourses
    });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Format the data
      const attendanceData = {
        teacherAttendance: {
          date: formData.date,
          courses: formData.courses.map(course => {
            const totalStudents = parseInt(course.totalStudents);
            const presentStudents = parseInt(course.presentStudents);
            return {
              code: course.code,
              name: course.name,
              department: course.department,
              section: course.section,
              totalStudents,
              presentStudents,
              absentStudents: totalStudents - presentStudents,
              topic: course.topic,
              attendancePercentage: parseFloat(calculatePercentage(presentStudents, totalStudents))
            };
          })
        }
      };

      // Here you would typically make an API call to save the attendance record
      console.log('Class Attendance Record Data:', attendanceData);
      Alert.alert('Success', 'Class attendance record created successfully!');
      navigation.goBack();
    }
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [
        ...formData.courses, 
        { 
          code: '', 
          name: '', 
          department: '',
          section: '',
          totalStudents: '',
          presentStudents: '',
          absentStudents: '0',
          topic: '',
        }
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
    if (field === 'totalStudents' || field === 'presentStudents') {
      handleStudentCountChange(index, field, value);
    } else {
      const updatedCourses = [...formData.courses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value
      };
      setFormData({
        ...formData,
        courses: updatedCourses
      });
    }
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Attendance Records"
        currentScreen="Create Class Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Class Attendance</Text>

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

          <SectionContainer sectionNumber="1" title="Date Information">
            <FormField
              label="Class Date"
              placeholder="Enter date (e.g., YYYY-MM-DD)"
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              error={errors.date}
              required
            />
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
                  placeholder="Enter course code (e.g., CS301)"
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
                  label="Department"
                  placeholder="Enter department name"
                  value={course.department}
                  onChangeText={(text) => updateCourseField(index, 'department', text)}
                  error={errors[`course${index}Department`]}
                  required
                />

                <FormField
                  label="Section"
                  placeholder="Enter section (e.g., A, B, C)"
                  value={course.section}
                  onChangeText={(text) => updateCourseField(index, 'section', text)}
                  error={errors[`course${index}Section`]}
                  required
                />

                <FormField
                  label="Total Students"
                  placeholder="Enter total number of students"
                  value={course.totalStudents}
                  onChangeText={(text) => updateCourseField(index, 'totalStudents', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}TotalStudents`]}
                  required
                />

                <FormField
                  label="Present Students"
                  placeholder="Enter number of present students"
                  value={course.presentStudents}
                  onChangeText={(text) => updateCourseField(index, 'presentStudents', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}PresentStudents`]}
                  required
                />

                <FormField
                  label="Absent Students"
                  placeholder="Auto-calculated (total - present)"
                  value={course.absentStudents}
                  onChangeText={(text) => updateCourseField(index, 'absentStudents', text)}
                  keyboardType="numeric"
                  error={errors[`course${index}AbsentStudents`]}
                  editable={false}
                  required
                />

                <FormField
                  label="Class Topic"
                  placeholder="Enter the topic covered in this class"
                  value={course.topic}
                  onChangeText={(text) => updateCourseField(index, 'topic', text)}
                  error={errors[`course${index}Topic`]}
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
                    Attendance Percentage: {calculatePercentage(course.presentStudents, course.totalStudents)}%
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