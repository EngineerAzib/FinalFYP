import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

export const EditStudentAttendance = ({ route, navigation }) => {
  const { studentData } = route.params;
  const [formData, setFormData] = useState({
    overallAttendance: studentData.currentSemester?.overallAttendance?.toString() || '',
    courses: studentData.currentSemester?.courses?.map(course => ({
      code: course.code || '',
      name: course.name || '',
      totalClasses: course.totalClasses?.toString() || '',
      attendedClasses: course.attendedClasses?.toString() || '',
      percentage: course.percentage?.toString() || '', 
    })) || [],
  });

  useEffect(() => {
    if (studentData && studentData.currentSemester) {
      setFormData({
        overallAttendance: studentData.currentSemester.overallAttendance?.toString() || '',
        courses: studentData.currentSemester.courses.map(course => ({
          code: course.code || '',
          name: course.name || '',
          totalClasses: course.totalClasses?.toString() || '',
          attendedClasses: course.attendedClasses?.toString() || '',
          percentage: course.percentage?.toString() || '', 
        })),
      });
    }
  }, [studentData]);
  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate overall attendance
    const overallAttendance = parseFloat(formData.overallAttendance);
    if (!formData.overallAttendance) {
      newErrors.overallAttendance = 'Overall attendance is required';
    } else if (isNaN(overallAttendance) || overallAttendance < 0 || overallAttendance > 100) {
      newErrors.overallAttendance = 'Attendance must be between 0 and 100';
    }

    // Validate each course
    formData.courses.forEach((course, index) => {
      const totalClasses = parseInt(course.totalClasses);
      const attendedClasses = parseInt(course.attendedClasses);
      const percentage = parseFloat(course.percentage);

      if (!course.totalClasses) newErrors[`course_${index}_total`] = 'Required';
      else if (isNaN(totalClasses) || totalClasses < 0) newErrors[`course_${index}_total`] = 'Invalid';

      if (!course.attendedClasses) newErrors[`course_${index}_attended`] = 'Required';
      else if (isNaN(attendedClasses) || attendedClasses < 0) newErrors[`course_${index}_attended`] = 'Invalid';

      if (attendedClasses > totalClasses) newErrors[`course_${index}_attended`] = 'Cannot exceed total classes';

      if (!course.percentage) newErrors[`course_${index}_percentage`] = 'Required';
      else if (isNaN(percentage) || percentage < 0 || percentage > 100)
        newErrors[`course_${index}_percentage`] = 'Invalid percentage';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulated API delay
        console.log('Updated Attendance Data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.goBack();
      } catch (error) {
        console.error('Error updating attendance:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateCourseField = (index, field, value) => {
    setFormData(prev => {
      const newCourses = [...prev.courses];
      newCourses[index][field] = value;

      // Auto-calculate attendance percentage
      if (field === 'totalClasses' || field === 'attendedClasses') {
        const total = parseInt(newCourses[index].totalClasses) || 0;
        const attended = parseInt(newCourses[index].attendedClasses) || 0;
        newCourses[index].percentage = total > 0 ? ((attended / total) * 100).toFixed(1) : '';
      }

      return { ...prev, courses: newCourses };
    });
  };

  return (
    <View style={styles.EditStudentAttendancemainContainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Edit Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditDepartmentScreenscrollContent}
        >
          <Text style={styles.EditStudentAttendanceformTitle}>Edit Student Attendance</Text>

          <SectionContainer sectionNumber="1" title="Overall Attendance">
            <FormField
              label="Current Semester Attendance (%)"
              value={formData.overallAttendance}
              onChangeText={(text) => setFormData(prev => ({ ...prev, overallAttendance: text }))}
              placeholder="0.0"
              required
              keyboardType="decimal-pad"
              error={errors.overallAttendance}
            />
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="Course-wise Attendance">
            {formData.courses.map((course, index) => (
              <View key={index} style={styles.EditStudentAttendancecourseCard}>
                <View style={styles.EditStudentAttendancecourseHeader}>
                  <Text style={styles.EditStudentAttendancecourseCode}>{course.code}</Text>
                  <Text style={styles.EditStudentAttendancecourseName}>{course.name}</Text>
                </View>

                <FormField
                  label="Total Classes"
                  value={course.totalClasses}
                  onChangeText={(text) => updateCourseField(index, 'totalClasses', text)}
                  placeholder="0"
                  required
                  keyboardType="numeric"
                  error={errors[`course_${index}_total`]}
                />

                <FormField
                  label="Classes Attended"
                  value={course.attendedClasses}
                  onChangeText={(text) => updateCourseField(index, 'attendedClasses', text)}
                  placeholder="0"
                  required
                  keyboardType="numeric"
                  error={errors[`course_${index}_attended`]}
                />

                <FormField
                  label="Attendance %"
                  value={course.percentage}
                  placeholder="0.0"
                  required
                  keyboardType="decimal-pad"
                  editable={false}
                  error={errors[`course_${index}_percentage`]}
                />

                <View style={styles.EditStudentAttendancestatusBar}>
                  <MaterialIcons
                    name={parseFloat(course.percentage) >= 75 ? "check-circle" : "warning"}
                    size={20}
                    color={parseFloat(course.percentage) >= 75 ? "#22C55E" : "#EF4444"}
                  />
                  <Text
                    style={[
                      styles.EditStudentAttendancestatusText,
                      { color: parseFloat(course.percentage) >= 75 ? "#22C55E" : "#EF4444" },
                    ]}
                  >
                    {parseFloat(course.percentage) >= 75 ? "Attendance criteria met" : "Low attendance"}
                  </Text>
                </View>
              </View>
            ))}
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Edit Attendance", onPress: handleSave, variant: "primary", disabled: isSubmitting },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
