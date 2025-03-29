import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import Button from '../Components/Button';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

export const EditStudentAcademics = ({ route, navigation }) => {
  const { studentData } = route.params;

  const [formData, setFormData] = useState({
    currentCGPA: studentData.currentCGPA?.toString() || '',
    semesterGPAs: studentData.semesterGPAs?.map(semester => ({
      ...semester,
      gpa: semester.gpa?.toString() || '',
      courses: semester.courses.map(course => ({
        ...course,
        creditHours: course.creditHours?.toString() || ''
      }))
    })) || []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate CGPA
    const cgpa = parseFloat(formData.currentCGPA);
    if (!formData.currentCGPA) {
      newErrors.currentCGPA = 'CGPA is required';
    } else if (isNaN(cgpa) || cgpa < 0 || cgpa > 4) {
      newErrors.currentCGPA = 'CGPA must be between 0 and 4';
    }

    // Validate each semester
    formData.semesterGPAs.forEach((semester, semesterIndex) => {
      const gpa = parseFloat(semester.gpa);
      if (!semester.gpa) {
        newErrors[`semester_${semesterIndex}_gpa`] = 'GPA required';
      } else if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        newErrors[`semester_${semesterIndex}_gpa`] = 'GPA must be between 0 and 4';
      }

      semester.courses.forEach((course, courseIndex) => {
        if (!course.code) {
          newErrors[`semester_${semesterIndex}_course_${courseIndex}_code`] = 'Required';
        }
        if (!course.name) {
          newErrors[`semester_${semesterIndex}_course_${courseIndex}_name`] = 'Required';
        }
        if (!course.creditHours) {
          newErrors[`semester_${semesterIndex}_course_${courseIndex}_credits`] = 'Required';
        }
        if (!course.grade) {
          newErrors[`semester_${semesterIndex}_course_${courseIndex}_grade`] = 'Required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.goBack();
      } catch (error) {
        console.error('Error updating academics:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateCourseField = (semesterIndex, courseIndex, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.semesterGPAs[semesterIndex].courses[courseIndex][field] = value;
      return newData;
    });
  };

  return (
    <View style={styles.EditStudentAcademicsmainContainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Edit Academics"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditStudentAcademicscontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditStudentAcademicsscrollContent}
        >
          <Text style={styles.EditStudentAcademicsformTitle}>Edit Student Academics</Text>

          <View style={styles.EditStudentAcademicslegendContainer}>
            <View style={styles.EditStudentAcademicslegendItem}>
              <View style={[styles.EditStudentAcademicslegendDot, styles.EditStudentAcademicsrequiredDot]} />
              <Text style={styles.EditStudentAcademicslegendText}>Required*</Text>
            </View>
            <View style={styles.EditStudentAcademicslegendItem}>
              <View style={[styles.EditStudentAcademicslegendDot, styles.EditStudentAcademicsoptionalDot]} />
              <Text style={styles.EditStudentAcademicslegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Overall Performance">
            <FormField
              label="Current CGPA"
              value={formData.currentCGPA}
              onChangeText={(text) => setFormData(prev => ({ ...prev, currentCGPA: text }))}
              placeholder="0.00"
              required
              keyboardType="decimal-pad"
              containerStyle={styles.EditStudentAcademicscgpaInput}
            />
          </SectionContainer>

          {formData.semesterGPAs.map((semester, semesterIndex) => (
            <SectionContainer
              key={semesterIndex}
              sectionNumber={`${semester.semester + 1}`}
              title={`Semester ${semester.semester}`}
              style={styles.EditStudentAcademicssemesterSection}
            >
              <View style={styles.EditStudentAcademicssemesterHeader}>
                <FormField
                  label="GPA"
                  value={semester.gpa}
                  onChangeText={(text) => {
                    const newData = { ...formData };
                    newData.semesterGPAs[semesterIndex].gpa = text;
                    setFormData(newData);
                  }}
                  placeholder="0.00"
                  required
                  keyboardType="decimal-pad"
                  containerStyle={styles.EditStudentAcademicsgpaInput}
                />
              </View>

              {semester.courses.map((course, courseIndex) => (
                <View key={courseIndex} style={styles.EditStudentAcademicscourseContainer}>
                  <Text style={styles.EditStudentAcademicscourseLabel}>Course {courseIndex + 1}</Text>

                  <FormField
                    label="Course Code"
                    value={course.code}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'code', text)}
                    placeholder="Enter course code"
                    required
                    containerStyle={styles.EditStudentAcademicsfullWidthInput}
                  />

                  <FormField
                    label="Course Name"
                    value={course.name}
                    onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'name', text)}
                    placeholder="Enter course name"
                    required
                    containerStyle={styles.EditStudentAcademicsfullWidthInput}
                  />

                  <View style={styles.EditStudentAcademicscreditGradeContainer}>
                    <FormField
                      label="Credit Hours"
                      value={course.creditHours}
                      onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'creditHours', text)}
                      placeholder="0"
                      required
                      keyboardType="numeric"
                      containerStyle={styles.EditStudentAcademicscreditInput}
                    />

                    <FormField
                      label="Grade"
                      value={course.grade}
                      onChangeText={(text) => updateCourseField(semesterIndex, courseIndex, 'grade', text.toUpperCase())}
                      placeholder="Grade"
                      required
                      containerStyle={styles.EditStudentAcademicsgradeInput}
                    />
                  </View>
                </View>
              ))}
            </SectionContainer>
          ))}


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
                  title: "Edit Academics",
                  onPress: handleSave,
                  variant: "primary",
                }
              ]}
            />
          </View>
      </View>

    </View>


  );
};


