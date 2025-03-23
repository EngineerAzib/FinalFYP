import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const EditSemesterRegistration = ({ route, navigation }) => {
  const { deptCode, semesterNumber, semesterData } = route.params;

  // Initialize state with existing semester data
  const [registrationData, setRegistrationData] = useState({
    semester: semesterData.semester,
    registrationDeadline: new Date(semesterData.registrationDeadline),
    startDate: new Date(semesterData.startDate),
    courses: semesterData.courses.map(course => ({
      ...course,
      isEditing: false
    }))
  });

  // State for date picker visibility
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const handleSaveChanges = () => {
    if (!registrationData.semester || !registrationData.registrationDeadline || !registrationData.startDate) {
      Alert.alert('Validation Error', 'Please fill in all semester details');
      return;
    }

    const hasInvalidCourses = registrationData.courses.some(course =>
      !course.code || !course.name || !course.creditHours || !course.instructor
    );

    if (hasInvalidCourses) {
      Alert.alert('Validation Error', 'Please fill in all course details');
      return;
    }

    // Here you would typically make an API call to save the changes
    Alert.alert(
      'Success',
      'Registration details updated successfully',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const toggleCourseEdit = (index) => {
    const newCourses = [...registrationData.courses];
    newCourses[index].isEditing = !newCourses[index].isEditing;
    setRegistrationData({ ...registrationData, courses: newCourses });
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...registrationData.courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setRegistrationData({ ...registrationData, courses: newCourses });
  };

  const addNewCourse = () => {
    const newCourse = {
      code: '',
      name: '',
      creditHours: 3,
      type: 'Theory',
      instructor: '',
      maxStudents: 40,
      prerequisites: [],
      isEditing: true
    };
    setRegistrationData({
      ...registrationData,
      courses: [...registrationData.courses, newCourse]
    });
  };

  const removeCourse = (index) => {
    Alert.alert(
      'Remove Course',
      'Are you sure you want to remove this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const newCourses = registrationData.courses.filter((_, i) => i !== index);
            setRegistrationData({ ...registrationData, courses: newCourses });
          }
        }
      ]
    );
  };

  const renderCourse = (course, index) => (
    <View key={index} style={styles.EditSemesterRegistrationcourseContainer}>
      <View style={styles.EditSemesterRegistrationcourseHeader}>
        <View style={styles.EditSemesterRegistrationcourseHeaderLeft}>
          {course.isEditing ? (
            <TextInput
              style={styles.EditSemesterRegistrationcourseCodeInput}
              value={course.code}
              onChangeText={(text) => updateCourse(index, 'code', text)}
              placeholder="Course Code"
            />
          ) : (
            <Text style={styles.EditSemesterRegistrationcourseCode}>{course.code}</Text>
          )}
        </View>
        <View style={styles.EditSemesterRegistrationcourseHeaderRight}>
          <TouchableOpacity onPress={() => toggleCourseEdit(index)}>
            <MaterialIcons
              name={course.isEditing ? "check" : "edit"}
              size={24}
              color="#6C63FF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeCourse(index)}>
            <MaterialIcons name="delete" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {course.isEditing ? (
        <View style={styles.EditSemesterRegistrationcourseEditForm}>
          <TextInput
            style={styles.EditSemesterRegistrationinput}
            value={course.name}
            onChangeText={(text) => updateCourse(index, 'name', text)}
            placeholder="Course Name"
          />
          <View style={styles.EditSemesterRegistrationrowContainer}>
            <TextInput
              style={[styles.EditSemesterRegistrationinput, styles.EditSemesterRegistrationhalfWidth]}
              value={String(course.creditHours)}
              onChangeText={(text) => updateCourse(index, 'creditHours', parseInt(text) || 0)}
              keyboardType="numeric"
              placeholder="Credit Hours"
            />
            <TextInput
              style={[styles.EditSemesterRegistrationinput, styles.EditSemesterRegistrationhalfWidth]}
              value={String(course.maxStudents)}
              onChangeText={(text) => updateCourse(index, 'maxStudents', parseInt(text) || 0)}
              keyboardType="numeric"
              placeholder="Max Students"
            />
          </View>
          <TextInput
            style={styles.EditSemesterRegistrationinput}
            value={course.instructor}
            onChangeText={(text) => updateCourse(index, 'instructor', text)}
            placeholder="Instructor"
          />
          {course.type.includes('Lab') && (
            <TextInput
              style={styles.EditSemesterRegistrationinput}
              value={course.labInstructor}
              onChangeText={(text) => updateCourse(index, 'labInstructor', text)}
              placeholder="Lab Instructor"
            />
          )}
          <TextInput
            style={styles.EditSemesterRegistrationinput}
            value={course.prerequisites.join(', ')}
            onChangeText={(text) => updateCourse(index, 'prerequisites', text.split(',').map(p => p.trim()))}
            placeholder="Prerequisites (comma-separated)"
          />
        </View>
      ) : (
        <View style={styles.EditSemesterRegistrationcourseDetails}>
          <Text style={styles.EditSemesterRegistrationcourseName}>{course.name}</Text>
          <View style={styles.EditSemesterRegistrationdetailRow}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.EditSemesterRegistrationdetailText}>{course.creditHours} Credit Hours</Text>
          </View>
          <View style={styles.EditSemesterRegistrationdetailRow}>
            <MaterialIcons name="person" size={16} color="#6B7280" />
            <Text style={styles.EditSemesterRegistrationdetailText}>{course.instructor}</Text>
          </View>
          {course.labInstructor && (
            <View style={styles.EditSemesterRegistrationdetailRow}>
              <MaterialIcons name="person" size={16} color="#6B7280" />
              <Text style={styles.EditSemesterRegistrationdetailText}>Lab: {course.labInstructor}</Text>
            </View>
          )}
          <View style={styles.EditSemesterRegistrationdetailRow}>
            <MaterialIcons name="group" size={16} color="#6B7280" />
            <Text style={styles.EditSemesterRegistrationdetailText}>Max Students: {course.maxStudents}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <CustomHeader
        title="Semester Registration"
        currentScreen="Edit Reg_"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.EditSemesterRegistrationheaderInfo}>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="domain" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>{semesterData?.name || deptCode}</Text>
          </View>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="school" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>{semesterData?.semester}</Text>
          </View>
        </View>

        <View style={styles.EditSemesterRegistrationcontentContainer}>
          <SectionContainer title="Edit Semester Registration">
            <View style={styles.EditSemesterRegistrationInfoContainer}>
              <Text style={styles.EditSemesterRegistrationsectionTitle}>Semester Information</Text>
              <TouchableOpacity
                style={styles.EditSemesterRegistrationdatePickerButton}
                onPress={() => setShowDeadlinePicker(true)}
              >
                <MaterialIcons name="event" size={24} color="#6C63FF" />
                <Text style={styles.EditSemesterRegistrationdatePickerButtonText}>
                  Registration Deadline: {registrationData.registrationDeadline.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.EditSemesterRegistrationdatePickerButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <MaterialIcons name="event" size={24} color="#6C63FF" />
                <Text style={styles.EditSemesterRegistrationdatePickerButtonText}>
                  Start Date: {registrationData.startDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.EditSemesterRegistrationcoursesSection}>
              <Text style={styles.EditSemesterRegistrationsectionTitle}>Courses</Text>
              {registrationData.courses.map((course, index) => renderCourse(course, index))}

              <TouchableOpacity style={styles.EditSemesterRegistrationaddCourseButton} onPress={addNewCourse}>
                <MaterialIcons name="add" size={24} color="#6C63FF" />
                <Text style={styles.EditSemesterRegistrationaddCourseButtonText}>Add New Course</Text>
              </TouchableOpacity>
            </View>
          </SectionContainer>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.CreateExamSchedulebuttonContainer}>
        <CustomButton
          buttons={[
            { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
            { title: "Edit Registeration", onPress: handleSaveChanges, variant: "primary" }
          ]}
        />
      </View>

      {/* Date Pickers */}
      {(showDeadlinePicker || showStartDatePicker) && (
        <DateTimePicker
          value={showDeadlinePicker ? registrationData.registrationDeadline : registrationData.startDate}
          mode="date"
          onChange={(event, selectedDate) => {
            if (showDeadlinePicker) {
              setShowDeadlinePicker(false);
              if (selectedDate) {
                setRegistrationData({ ...registrationData, registrationDeadline: selectedDate });
              }
            } else {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setRegistrationData({ ...registrationData, startDate: selectedDate });
              }
            }
          }}
        />
      )}
    </View>
  );
};
