import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';


export const EditDepartmentScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    totalStudents: '',
    boysCount: '',
    girlsCount: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // In a real app, you would fetch the department data using the ID
    // For this example, I'll simulate fetching data
    const fetchedDepartment = {
      id: 1,
      name: 'Computer Science',
      totalStudents: 120,
      genderStats: {
        boys: { percentage: 60, count: 72 },
        girls: { percentage: 40, count: 48 }
      }
    };

    setFormData({
      name: fetchedDepartment.name,
      totalStudents: fetchedDepartment.totalStudents.toString(),
      boysCount: fetchedDepartment.genderStats.boys.count.toString(),
      girlsCount: fetchedDepartment.genderStats.girls.count.toString(),
    });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }

    const totalStudents = parseInt(formData.totalStudents);
    const boysCount = parseInt(formData.boysCount);
    const girlsCount = parseInt(formData.girlsCount);

    if (isNaN(totalStudents) || totalStudents <= 0) {
      newErrors.totalStudents = 'Please enter a valid number of students';
    }

    if (isNaN(boysCount) || boysCount < 0) {
      newErrors.boysCount = 'Please enter a valid number of male students';
    }

    if (isNaN(girlsCount) || girlsCount < 0) {
      newErrors.girlsCount = 'Please enter a valid number of female students';
    }

    if (boysCount + girlsCount !== totalStudents) {
      newErrors.totalStudents = 'Total students should equal sum of boys and girls';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      // Calculate percentages
      const totalStudents = parseInt(formData.totalStudents);
      const boysCount = parseInt(formData.boysCount);
      const girlsCount = parseInt(formData.girlsCount);

      const updatedDepartment = {
        id,
        name: formData.name,
        totalStudents,
        genderStats: {
          boys: {
            count: boysCount,
            percentage: Math.round((boysCount / totalStudents) * 100),
          },
          girls: {
            count: girlsCount,
            percentage: Math.round((girlsCount / totalStudents) * 100),
          },
        },
      };

      // Here you would typically make an API call to update the department
      console.log('Updated Department Data:', updatedDepartment);
      Alert.alert('Success', 'Department updated successfully!');
      navigation.goBack();
    }
  };

  return (

    <View style={styles.EditDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Departments"
        currentScreen="Edit Department"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditDepartmentScreenscrollContent}
        >
          <Text style={styles.EditDepartmentScreenformTitle}>Edit Department</Text>

          <View style={styles.EditDepartmentScreenlegendContainer}>
            <View style={styles.EditDepartmentScreenlegendItem}>
              <View style={[styles.EditDepartmentScreenlegendDot, styles.EditDepartmentScreenrequiredDot]} />
              <Text style={styles.EditDepartmentScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.EditDepartmentScreenlegendItem}>
              <View style={[styles.EditDepartmentScreenlegendDot, styles.EditDepartmentScreenoptionalDot]} />
              <Text style={styles.EditDepartmentScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Department Information">

            <FormField
              label="Department Name"
              placeholder="Enter department name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              error={errors.name}
              required
            />

            <FormField
              label="Total Students"
              placeholder="Enter total number of students"
              value={formData.totalStudents}
              onChangeText={(text) => setFormData({ ...formData, totalStudents: text })}
              keyboardType="numeric"
              error={errors.totalStudents}
              required
            />

            <FormField
              label="Number of Boys"
              placeholder="Enter number of male students"
              value={formData.boysCount}
              onChangeText={(text) => setFormData({ ...formData, boysCount: text })}
              keyboardType="numeric"
              error={errors.boysCount}
              required
            />

            <FormField
              label="Number of Girls"
              placeholder="Enter number of female students"
              value={formData.girlsCount}
              onChangeText={(text) => setFormData({ ...formData, girlsCount: text })}
              keyboardType="numeric"
              error={errors.girlsCount}
              required
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
                title: "Edit Dept",
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


