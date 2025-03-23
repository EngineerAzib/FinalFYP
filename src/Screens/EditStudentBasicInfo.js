import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import { CustomButton } from '../Components/CustomButton';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';

export const EditStudentBasicInfo = ({ route, navigation }) => {
  // Get student data from navigation params or use empty defaults
  const studentData = route?.params?.studentData || {};

  // Initialize state with all required student fields
  const [basicInfo, setBasicInfo] = useState({
    name: studentData.name || '',
    enrollmentNo: studentData.enrollmentNo || '',
    rollNo: studentData.rollNo || '',
    department: studentData.department || '',
    semester: studentData.semester?.toString() || '',
    section: studentData.section || '',
    profilePhoto: studentData.profilePhoto || '',
  });

  // Handle form field updates
  const updateBasicInfo = (field, value) => {
    setBasicInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle image upload functionality
  const handleImageUpload = () => {
    Alert.alert('Upload Photo', 'Image upload functionality to be implemented');
  };

  // Validate and save the form data
  const handleSave = () => {
    // Check for required fields
    const requiredFields = ['name', 'enrollmentNo', 'rollNo', 'department', 'semester'];
    const missingFields = requiredFields.filter(field => !basicInfo[field]);

    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Additional validation for semester (must be a number)
    if (isNaN(basicInfo.semester)) {
      Alert.alert('Invalid Input', 'Semester must be a number');
      return;
    }

    // Handle successful save
    Alert.alert('Success', 'Student information updated successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.EditTeacherBasicInfocontainer}>
      {/* Header Components */}
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Edit Basic Information"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>


        {/* Main Form Card */}
        <View style={styles.EditTeacherBasicInfocard}>

          {/* Profile Image Section */}
          <View style={styles.EditTeacherBasicInfoprofileImageContainer}>
            <Image
              source={{ uri: basicInfo.profilePhoto || 'https://placeholder.com/user' }}
              style={styles.EditTeacherBasicInfoprofileImage}
            />
            <TouchableOpacity
              style={styles.EditTeacherBasicInfoimageUploadButton}
              onPress={handleImageUpload}
            >
              <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <SectionContainer sectionNumber="1" title="Edit Information">

            <FormField
              label="Full Name"
              value={basicInfo.name}
              onChangeText={(value) => updateBasicInfo('name', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Enrollment Number"
              value={basicInfo.enrollmentNo}
              onChangeText={(value) => updateBasicInfo('enrollmentNo', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Roll Number"
              value={basicInfo.rollNo}
              onChangeText={(value) => updateBasicInfo('rollNo', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Department"
              value={basicInfo.department}
              onChangeText={(value) => updateBasicInfo('department', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Semester"
              value={basicInfo.semester}
              onChangeText={(value) => updateBasicInfo('semester', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
              keyboardType="numeric"
            />

            <FormField
              label="Section"
              value={basicInfo.section}
              onChangeText={(value) => updateBasicInfo('section', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
            />
          </SectionContainer>

        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.CreateExamSchedulebuttonContainer}>
        <CustomButton
          buttons={[
            {
              title: "Cancel",
              onPress: () => navigation.goBack(),
              variant: "secondary",
            },
            {
              title: "Edit Info",
              onPress: handleSave,
              variant: "primary",
            }
          ]}
        />
      </View>
    </View>
  );
};