import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import { SectionContainer } from '../Components/SectionContainer';

export const EditTeacherBasicInfo = ({ route, navigation }) => {
  // Get teacher data from navigation params or use dummy data
  const teacherData = route?.params?.teacherData || {};

  // Initialize state with current teacher data
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    registrationNo: '',
    designation: '',
    status: '',
    gender: '',
    profilePhoto: '',
  });

  // Use useEffect to properly set initial data when the component mounts
  useEffect(() => {
    if (teacherData) {
      setBasicInfo({
        name: teacherData.name || '',
        registrationNo: teacherData.registrationNo || '',
        designation: teacherData.designation || '',
        status: teacherData.status || '',
        gender: teacherData.gender || '',
        profilePhoto: teacherData.profilePhoto || 'https://placeholder.com/user',
      });
    }
  }, [teacherData]);

  const updateBasicInfo = (field, value) => {
    setBasicInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = () => {
    Alert.alert('Upload Photo', 'Image upload functionality to be implemented');
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['name', 'registrationNo', 'designation'];
    const missingFields = requiredFields.filter(field => !basicInfo[field]);

    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Here you would typically update the teacher data in your backend
    // For now, we'll just show a success message and go back
    Alert.alert(
      'Success',
      'Teacher information updated successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            // Pass the updated data back to the previous screen
            navigation.navigate('TeacherViewScreen', {
              teacherData: basicInfo,
              refresh: true,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.EditTeacherBasicInfocontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Edit Basic Information"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView>
        {/* Main form card */}
        <View style={styles.EditTeacherBasicInfocard}>

          {/* Profile Image Section */}
          <View style={styles.EditTeacherBasicInfoprofileImageContainer}>
            <Image
              source={{ uri: basicInfo.profilePhoto }}
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
          <SectionContainer sectionNumber="1" title="Teachers Information">
            <FormField
              label="Full Name"
              value={basicInfo.name}
              onChangeText={(value) => updateBasicInfo('name', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
              placeholder="Enter full name"
            />

            <FormField
              label="Registration Number"
              value={basicInfo.registrationNo}
              onChangeText={(value) => updateBasicInfo('registrationNo', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
              placeholder="Enter registration number"
            />

            <FormField
              label="Designation"
              value={basicInfo.designation}
              onChangeText={(value) => updateBasicInfo('designation', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
              placeholder="Enter designation"
            />

            <FormField
              label="Status"
              value={basicInfo.status}
              onChangeText={(value) => updateBasicInfo('status', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              placeholder="Enter status"
            />

            <FormField
              label="Gender"
              value={basicInfo.gender}
              onChangeText={(value) => updateBasicInfo('gender', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              placeholder="Enter gender"
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
              title: "Save Changes",
              onPress: handleSave,
              variant: "primary",
            }
          ]}
        />
      </View>
    </View>
  );
};