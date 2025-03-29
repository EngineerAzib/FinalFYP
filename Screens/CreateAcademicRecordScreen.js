import React, { useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateAcademicRecordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    currentCGPA: '',
    semesters: [
      {
        semester: '',
        gpa: '',
        courses: [
          { code: '', name: '', creditHours: '', grade: '' }
        ]
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate CGPA
    const cgpa = parseFloat(formData.currentCGPA);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
      newErrors.currentCGPA = 'Please enter a valid CGPA (0.0-4.0)';
    }

    // Validate semesters
    formData.semesters.forEach((semesterData, semIndex) => {
      // Validate semester number
      const semester = parseInt(semesterData.semester);
      if (isNaN(semester) || semester <= 0) {
        newErrors[`semester${semIndex}Number`] = 'Please enter a valid semester number';
      }

      // Validate semester GPA
      const semesterGPA = parseFloat(semesterData.gpa);
      if (isNaN(semesterGPA) || semesterGPA < 0 || semesterGPA > 4.0) {
        newErrors[`semester${semIndex}GPA`] = 'Please enter a valid GPA (0.0-4.0)';
      }

      // Validate courses
      semesterData.courses.forEach((course, courseIndex) => {
        if (!course.code.trim()) {
          newErrors[`semester${semIndex}Course${courseIndex}Code`] = 'Course code is required';
        }
        
        if (!course.name.trim()) {
          newErrors[`semester${semIndex}Course${courseIndex}Name`] = 'Course name is required';
        }
        
        const creditHours = parseFloat(course.creditHours);
        if (isNaN(creditHours) || creditHours <= 0) {
          newErrors[`semester${semIndex}Course${courseIndex}CreditHours`] = 'Please enter valid credit hours';
        }
        
        if (!course.grade.trim()) {
          newErrors[`semester${semIndex}Course${courseIndex}Grade`] = 'Grade is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateGPA = (courses) => {
    if (!courses || courses.length === 0) return 0;
    
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCreditHours = 0;
    
    courses.forEach(course => {
      const creditHours = parseFloat(course.creditHours);
      if (!isNaN(creditHours) && course.grade && gradePoints[course.grade.toUpperCase()]) {
        totalPoints += creditHours * gradePoints[course.grade.toUpperCase()];
        totalCreditHours += creditHours;
      }
    });
    
    if (totalCreditHours === 0) return 0;
    return (totalPoints / totalCreditHours).toFixed(2);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCreditHours = 0;
    
    formData.semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const gradePoints = {
          'A+': 4.0, 'A': 4.0, 'A-': 3.7,
          'B+': 3.3, 'B': 3.0, 'B-': 2.7,
          'C+': 2.3, 'C': 2.0, 'C-': 1.7,
          'D+': 1.3, 'D': 1.0, 'F': 0.0
        };
        
        const creditHours = parseFloat(course.creditHours);
        if (!isNaN(creditHours) && course.grade && gradePoints[course.grade.toUpperCase()]) {
          totalPoints += creditHours * gradePoints[course.grade.toUpperCase()];
          totalCreditHours += creditHours;
        }
      });
    });
    
    if (totalCreditHours === 0) return "0.00";
    return (totalPoints / totalCreditHours).toFixed(2);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Format the data
      const academicData = {
        academics: {
          currentCGPA: parseFloat(formData.currentCGPA || calculateCGPA()),
          semesterGPAs: formData.semesters.map(semesterData => ({
            semester: parseInt(semesterData.semester),
            gpa: parseFloat(semesterData.gpa || calculateGPA(semesterData.courses)),
            courses: semesterData.courses.map(course => ({
              code: course.code,
              name: course.name,
              creditHours: parseFloat(course.creditHours),
              grade: course.grade
            }))
          }))
        }
      };

      // Here you would typically make an API call to save the academic record
      console.log('New Academic Record Data:', academicData);
      Alert.alert('Success', 'Academic record created successfully!');
      navigation.goBack();
    }
  };

  const addSemester = () => {
    setFormData({
      ...formData,
      semesters: [
        ...formData.semesters,
        {
          semester: '',
          gpa: '',
          courses: [
            { code: '', name: '', creditHours: '', grade: '' }
          ]
        }
      ]
    });
  };

  const removeSemester = (index) => {
    if (formData.semesters.length > 1) {
      const updatedSemesters = [...formData.semesters];
      updatedSemesters.splice(index, 1);
      setFormData({
        ...formData,
        semesters: updatedSemesters
      });
    }
  };

  const updateSemesterField = (semesterIndex, field, value) => {
    const updatedSemesters = [...formData.semesters];
    updatedSemesters[semesterIndex] = {
      ...updatedSemesters[semesterIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      semesters: updatedSemesters
    });
  };

  const addCourse = (semesterIndex) => {
    const updatedSemesters = [...formData.semesters];
    updatedSemesters[semesterIndex].courses.push({ code: '', name: '', creditHours: '', grade: '' });
    setFormData({
      ...formData,
      semesters: updatedSemesters
    });
  };

  const removeCourse = (semesterIndex, courseIndex) => {
    if (formData.semesters[semesterIndex].courses.length > 1) {
      const updatedSemesters = [...formData.semesters];
      updatedSemesters[semesterIndex].courses.splice(courseIndex, 1);
      setFormData({
        ...formData,
        semesters: updatedSemesters
      });
    }
  };

  const updateCourseField = (semesterIndex, courseIndex, field, value) => {
    const updatedSemesters = [...formData.semesters];
    updatedSemesters[semesterIndex].courses[courseIndex] = {
      ...updatedSemesters[semesterIndex].courses[courseIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      semesters: updatedSemesters
    });
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Academic Records"
        currentScreen="Create Academic Record"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Academic Record</Text>

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

          <SectionContainer sectionNumber="1" title="CGPA Information">
            <FormField
              label="Current CGPA"
              placeholder="Enter current CGPA (auto-calculated if left empty)"
              value={formData.currentCGPA}
              onChangeText={(text) => setFormData({ ...formData, currentCGPA: text })}
              keyboardType="numeric"
              error={errors.currentCGPA}
            />

            {formData.semesters.length > 0 && (
              <View style={{ padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  Calculated CGPA: {calculateCGPA()}
                </Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: '#666' }}>
                  Based on {formData.semesters.length} semester(s)
                </Text>
              </View>
            )}
          </SectionContainer>

          {formData.semesters.map((semesterData, semesterIndex) => (
            <SectionContainer 
              key={semesterIndex} 
              sectionNumber={`${semesterIndex + 2}`} 
              title={`Semester ${semesterData.semester || semesterIndex + 1} Information`}
            >
              <View style={{ 
                marginBottom: 15, 
                borderWidth: 1, 
                borderColor: '#e0e0e0', 
                borderRadius: 8, 
                padding: 15,
                backgroundColor: '#f8f9fa'
              }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 15 
                }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Semester Details</Text>
                  
                  {formData.semesters.length > 1 && (
                    <TouchableOpacity 
                      onPress={() => removeSemester(semesterIndex)}
                      style={{
                        backgroundColor: '#ff6b6b',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove Semester</Text>
                    </TouchableOpacity>
                  )}
                </View>
              
                <FormField
                  label="Semester Number"
                  placeholder="Enter semester number"
                  value={semesterData.semester}
                  onChangeText={(text) => updateSemesterField(semesterIndex, 'semester', text)}
                  keyboardType="numeric"
                  error={errors[`semester${semesterIndex}Number`]}
                  required
                />

                <FormField
                  label="Semester GPA"
                  placeholder="Enter semester GPA (auto-calculated if left empty)"
                  value={semesterData.gpa}
                  onChangeText={(text) => updateSemesterField(semesterIndex, 'gpa', text)}
                  keyboardType="numeric"
                  error={errors[`semester${semesterIndex}GPA`]}
                />

                {semesterData.courses.length > 0 && (
                  <View style={{ padding: 10, backgroundColor: '#e3f2fd', borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      Calculated GPA: {calculateGPA(semesterData.courses)}
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 5, color: '#666' }}>
                      Based on {semesterData.courses.length} course(s)
                    </Text>
                  </View>
                )}
              </View>

              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 15 }}>
                Courses ({semesterData.courses.length})
              </Text>
              
              {semesterData.courses.map((course, courseIndex) => (
                <View key={courseIndex} style={{ 
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
                    <Text style={{ fontWeight: 'bold' }}>Course {courseIndex + 1}</Text>
                    
                    {semesterData.courses.length > 1 && (
                      <TouchableOpacity 
                        onPress={() => removeCourse(semesterIndex, courseIndex)}
                        style={{
                          backgroundColor: '#ff9800',
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
                    placeholder="Enter course code (e.g., CS101)"
                    value={course.code}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'code', text)}
                    error={errors[`semester${semesterIndex}Course${courseIndex}Code`]}
                    required
                  />

                  <FormField
                    label="Course Name"
                    placeholder="Enter course name"
                    value={course.name}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'name', text)}
                    error={errors[`semester${semesterIndex}Course${courseIndex}Name`]}
                    required
                  />

                  <FormField
                    label="Credit Hours"
                    placeholder="Enter credit hours"
                    value={course.creditHours}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'creditHours', text)}
                    keyboardType="numeric"
                    error={errors[`semester${semesterIndex}Course${courseIndex}CreditHours`]}
                    required
                  />

                  <FormField
                    label="Grade"
                    placeholder="Enter grade (e.g., A, B+)"
                    value={course.grade}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'grade', text)}
                    error={errors[`semester${semesterIndex}Course${courseIndex}Grade`]}
                    required
                  />
                </View>
              ))}

              <View style={{ marginTop: 10, marginBottom: 20 }}>
                <TouchableOpacity 
                  onPress={() => addCourse(semesterIndex)}
                  style={{
                    backgroundColor: '#2196f3',
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
          ))}

          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity 
              onPress={addSemester}
              style={{
                backgroundColor: '#4caf50',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add Another Semester</Text>
            </TouchableOpacity>
          </View>

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
                title: "Create Academic Record",
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