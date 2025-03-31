import React, { useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';
import { CreateDepartment } from '../Services/DepartmentService/AddDepartment.js'; // Import the API function
import Toast from 'react-native-toast-message';
import { ToastConfig } from '../Components/ToastConfig.js';
export const CreateDepartmentScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    departmentName: '',
    departmentCode: '',
    maleStudent: '',
    femaleStudent: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.departmentName.trim()) {
      newErrors.departmentName = 'Department name is required';
    }
    if (!formData.departmentCode.trim()) {
      newErrors.departmentCode = 'Department code is required';
    }
    if (!formData.maleStudent.trim()) {
      newErrors.maleStudent = 'Number of male students is required';
    }
    if (!formData.femaleStudent.trim()) {
      newErrors.femaleStudent = 'Number of female students is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const departmentData = {
        departmentName: formData.departmentName,
        departmentCode: formData.departmentCode,
        maleStudent: parseInt(formData.maleStudent, 10),
        femaleStudent: parseInt(formData.femaleStudent, 10),
      };

      try {
        await CreateDepartment(departmentData); // Use the API function
        Toast.show({
          type: 'success',
          text1: 'Department created successfully!',
          onHide: () => navigation.goBack(),
        });
  
        // navigation.goBack();
      } catch (error) {
        // Show error toast
        Toast.show({
          type: 'error',
          text1: error.message || 'An error occurred while creating the department',
        });
      }
    }
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Departments"
        currentScreen="Create Department"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Department</Text>

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

          <SectionContainer sectionNumber="1" title="Department Information">
            <FormField
              label="Department Name"
              placeholder="Enter department name"
              value={formData.departmentName}
              onChangeText={(text) => setFormData({ ...formData, departmentName: text })}
              error={errors.departmentName}
              required
            />

            <FormField
              label="Department Code"
              placeholder="Enter department code"
              value={formData.departmentCode}
              onChangeText={(text) => setFormData({ ...formData, departmentCode: text })}
              error={errors.departmentCode}
              required
            />

            <FormField
              label="Number of Male Students"
              placeholder="Enter number of male students"
              value={formData.maleStudent}
              onChangeText={(text) => setFormData({ ...formData, maleStudent: text })}
              keyboardType="numeric"
              error={errors.maleStudent}
              required
            />

            <FormField
              label="Number of Female Students"
              placeholder="Enter number of female students"
              value={formData.femaleStudent}
              onChangeText={(text) => setFormData({ ...formData, femaleStudent: text })}
              keyboardType="numeric"
              error={errors.femaleStudent}
              required
            />

            <View style={styles.CreateDepartmentScreensubmitButton}>
              <FormField
                type="button"
                label="Create Department"
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
                title: "Create Department",
                onPress: handleSubmit,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>
      <Toast config={ToastConfig} />
    </View>
  );
};