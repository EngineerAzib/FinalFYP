import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

const CreateTeacherForm = ({ navigation }) => {
  // Initialize form state with teacher-specific fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    departmentID: '',
    designation: '',
    expertise: '',
    gender: ''
  });

  const [departments, setDepartments] = useState([]); // State for departments dropdown
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch departments data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await GetDepartmentList();
        setDepartments(departmentsData || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true); // Show loading indicator
      setError(null); // Clear previous errors

      // Validate password
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setError('Password must contain at least 1 capital letter, 1 special character, and 1 number.');
        return;
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        departmentID: parseInt(formData.departmentID, 10), // Convert to number
        designation: formData.designation,
        expertise: formData.expertise,
        gender: formData.gender
      };

      console.log('Payload:', payload);

      // Send payload to API
      const response = await axios.post(`${API_BASE_URL}/api/Teacher/AddTeacher`, payload);
      console.log('Teacher created successfully:', response.data);

      // Navigate back or show success message
      navigation.goBack();
    } catch (error) {
      console.error('Error creating teacher:', error.response ? error.response.data : error.message);
      setError('Failed to create teacher. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.EditDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Teacher Registration"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditDepartmentScreenscrollContent}
        >
          <Text style={styles.AddStudentFormformTitle}>Add New Teacher</Text>

          <View style={styles.AddStudentFormlegendContainer}>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormrequiredDot]} />
              <Text style={styles.AddStudentFormlegendText}>Required*</Text>
            </View>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormoptionalDot]} />
              <Text style={styles.AddStudentFormlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Teacher Information">
            <FormField
              label="Name"
              placeholder="Enter teacher's name"
              required
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <FormField
              label="Email"
              placeholder="Enter email address"
              required
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />

            <FormField
              label="Password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />

            <FormField
              label="Department"
              placeholder="Select Department"
              type="select"
              required
              value={formData.departmentID}
              onChangeText={(value) => setFormData({ ...formData, departmentID: value })}
              options={departments.map(dept => ({
                label: dept.departmentName || 'Unknown Department', // Fallback for undefined
                value: dept.id ? dept.id.toString() : '', // Ensure id is defined
              }))}
            />

            <FormField
              label="Designation"
              placeholder="Enter designation"
              required
              value={formData.designation}
              onChangeText={(text) => setFormData({ ...formData, designation: text })}
            />

            <FormField
              label="Expertise"
              placeholder="Enter expertise"
              required
              value={formData.expertise}
              onChangeText={(text) => setFormData({ ...formData, expertise: text })}
            />

            <FormField
              label="Gender"
              placeholder="Select gender"
              type="select"
              required
              value={formData.gender}
              onChangeText={(value) => setFormData({ ...formData, gender: value })}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
              ]}
            />
          </SectionContainer>
        </ScrollView>

        {/* Error Message */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: loading ? "Registering..." : "Register Teacher", onPress: handleSubmit, variant: "primary", disabled: loading },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateTeacherForm;