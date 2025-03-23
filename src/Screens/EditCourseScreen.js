import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import { CustomButton } from '../Components/CustomButton';
import { CourseCard } from '../Components/CourseCard';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';

export const EditCourseScreen = ({ department, route, navigation }) => {
  const { courseData, departmentName, semester } = route.params;
  const [formData, setFormData] = useState({
    name: courseData.name,
    code: courseData.code,
    creditHours: courseData.creditHours.toString(),
    instructor: courseData.instructor,
  });
  const EnhancedCustomHeader = ({ route, navigation }) => (
    <View style={styles.EditCourseScreenenhancedHeader}>
      <CustomHeader
        title="Courses"
        currentScreen={`${departmentName} - Semester ${semester}`}
        showSearch={false}
        showRefresh={false}
      // navigation={navigation}
      />
    </View>);

  const handleUpdate = async () => {
    try {
      // Here you would make your API call
      // await updateCourse(courseData.id, formData);

      // Show success message or handle response
      navigation.goBack();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <View style={styles.EditCourseScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Courses"
        currentScreen="Edit Course"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditCourseScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditCourseScreenscrollContent}
        >
          <Text style={styles.EditCourseScreenformTitle}>Edit Course</Text>

          <View style={styles.EditCourseScreenlegendContainer}>
            <View style={styles.EditCourseScreenlegendItem}>
              <View style={[styles.EditCourseScreenlegendDot, styles.EditCourseScreenrequiredDot]} />
              <Text style={styles.EditCourseScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.EditCourseScreenlegendItem}>
              <View style={[styles.EditCourseScreenlegendDot, styles.EditCourseScreenoptionalDot]} />
              <Text style={styles.EditCourseScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Edit Details">

            <FormField
              label="Course Code"
              placeholder="Enter course code"
              value={formData.code}
              onChangeText={(text) => setFormData(prev => ({ ...prev, code: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Course Name"
              placeholder="Enter course name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Credit Hours"
              placeholder="Enter credit hours"
              value={formData.creditHours}
              onChangeText={(text) => setFormData(prev => ({ ...prev, creditHours: text }))}
              required={true}
              type="text"
              keyboardType="numeric"
            />

            <FormField
              label="Instructor Name"
              placeholder="Enter instructor name"
              value={formData.instructor}
              onChangeText={(text) => setFormData(prev => ({ ...prev, instructor: text }))}
              required={true}
              type="text"
            />


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
                  title: "Edit Course",
                  onPress: handleUpdate,
                  variant: "primary",
                }
              ]}
            />
          </View>
      </View>
    </View>

  );
};

