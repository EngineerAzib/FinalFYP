import React, { useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateStudentFeedbackScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    department: '',
    section: '',
    teachingRating: '',
    knowledgeRating: '',
    communicationRating: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required';
    }
    
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }

    const validateRating = (field, label) => {
      const rating = parseFloat(formData[field]);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        newErrors[field] = `${label} must be between 1.0 and 5.0`;
      }
    };

    validateRating('teachingRating', 'Teaching rating');
    validateRating('knowledgeRating', 'Knowledge rating');
    validateRating('communicationRating', 'Communication rating');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateOverallRating = () => {
    const teachingRating = parseFloat(formData.teachingRating) || 0;
    const knowledgeRating = parseFloat(formData.knowledgeRating) || 0;
    const communicationRating = parseFloat(formData.communicationRating) || 0;
    
    if (teachingRating && knowledgeRating && communicationRating) {
      return ((teachingRating + knowledgeRating + communicationRating) / 3).toFixed(1);
    }
    
    return "-";
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const feedbackData = {
        course: {
          code: formData.courseCode,
          name: formData.courseName
        },
        department: formData.department,
        section: formData.section,
        rating: parseFloat(calculateOverallRating()),
        teachingRating: parseFloat(formData.teachingRating),
        knowledgeRating: parseFloat(formData.knowledgeRating),
        communicationRating: parseFloat(formData.communicationRating)
      };

      // Here you would typically make an API call to save the feedback
      console.log('New Student Feedback Data:', feedbackData);
      Alert.alert('Success', 'Student feedback created successfully!');
      navigation.goBack();
    }
  };

  const renderRatingField = (field, label, value) => {
    return (
      <View style={styles.CreateDepartmentScreenratingContainer}>
        <FormField
          label={label}
          placeholder="Enter rating (1.0 - 5.0)"
          value={value}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          keyboardType="decimal-pad"
          error={errors[field]}
          required
        />
        <View style={styles.CreateDepartmentScreenratingScale}>
          {[1, 2, 3, 4, 5].map(num => (
            <Text 
              key={num} 
              style={[
                styles.CreateDepartmentScreenratingNumber,
                parseFloat(value) === num && styles.CreateDepartmentScreenselectedRating
              ]}
            >
              {num}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Student Feedback"
        currentScreen="Create Feedback"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Student Feedback</Text>

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

          <SectionContainer sectionNumber="1" title="Course Information">
            <FormField
              label="Course Code"
              placeholder="Enter course code (e.g. CS301)"
              value={formData.courseCode}
              onChangeText={(text) => setFormData({ ...formData, courseCode: text })}
              error={errors.courseCode}
              required
            />

            <FormField
              label="Course Name"
              placeholder="Enter course name"
              value={formData.courseName}
              onChangeText={(text) => setFormData({ ...formData, courseName: text })}
              error={errors.courseName}
              required
            />

            <FormField
              label="Department"
              placeholder="Enter department name"
              value={formData.department}
              onChangeText={(text) => setFormData({ ...formData, department: text })}
              error={errors.department}
              required
            />

            <FormField
              label="Section"
              placeholder="Enter section (e.g. A, B, C)"
              value={formData.section}
              onChangeText={(text) => setFormData({ ...formData, section: text })}
              error={errors.section}
              required
            />
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="Rating Details">
            <Text style={styles.CreateDepartmentScreenratingInstructions}>
              Please rate on a scale of 1.0 (lowest) to 5.0 (highest)
            </Text>
            
            {renderRatingField('teachingRating', 'Teaching Quality', formData.teachingRating)}
            {renderRatingField('knowledgeRating', 'Subject Knowledge', formData.knowledgeRating)}
            {renderRatingField('communicationRating', 'Communication Skills', formData.communicationRating)}

            <View style={styles.CreateDepartmentScreenoverallRating}>
              <Text style={styles.CreateDepartmentScreenoverallRatingLabel}>Overall Rating:</Text>
              <Text style={styles.CreateDepartmentScreenoverallRatingValue}>{calculateOverallRating()}</Text>
            </View>

            <View style={styles.CreateDepartmentScreensubmitButton}>
              <FormField
                type="button"
                label="Submit Feedback"
                onPress={handleSubmit}
              />
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
                title: "Submit Feedback",
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