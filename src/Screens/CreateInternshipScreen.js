import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetYearlist from '../Services/ExaminationSchedule/GetYearlist';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

export const CreateInternshipScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    duration: '',
    stippend: '',
    position: '',
    applicationDeadline: '',
    description: '',
    year: '',
    departmentId: ''
  });

  const [departments, setDepartments] = useState([]); // State for departments dropdown
  const [years, setYears] = useState([]); // State for years dropdown
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch departments and years data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await GetDepartmentList();
        const yearsData = await GetYearlist();

        setDepartments(departmentsData || []);
        setYears(yearsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      setLoading(true); // Show loading indicator
      setError(null); // Clear previous errors

      const payload = {
        title: formData.title,
        companyName: formData.companyName,
        location: formData.location,
        duration: formData.duration,
        stippend: parseFloat(formData.stippend), // Convert to number
        position: parseInt(formData.position, 10), // Convert to number
        applicationDeadline: new Date(formData.applicationDeadline).toISOString(), // Format as ISO string
        description: formData.description,
        year: parseInt(formData.year, 10), // Convert to number
        departmentId: parseInt(formData.departmentId, 10) // Convert to number
      };

      console.log('Payload:', payload);

      // Send payload to API
      const response = await axios.post(`${API_BASE_URL}/api/Interenship/AddInternship`, payload);
      console.log('Internship created successfully:', response.data);

      // Navigate back or show success message
      navigation.goBack();
    } catch (error) {
      console.error('Error creating internship:', error.response ? error.response.data : error.message);
      setError('Failed to create internship. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.CreateInternshipScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Internships"
        currentScreen="Create Internship"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateInternshipScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateInternshipScreenscrollContent}
        >
          <Text style={styles.CreateInternshipScreenformTitle}>Create New Internship</Text>

          <View style={styles.CreateInternshipScreenlegendContainer}>
            <View style={styles.CreateInternshipScreenlegendItem}>
              <View style={[styles.CreateInternshipScreenlegendDot, styles.CreateInternshipScreenrequiredDot]} />
              <Text style={styles.CreateInternshipScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateInternshipScreenlegendItem}>
              <View style={[styles.CreateInternshipScreenlegendDot, styles.CreateInternshipScreenoptionalDot]} />
              <Text style={styles.CreateInternshipScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Basic Information">
            <FormField
              label="Internship Title"
              placeholder="Enter internship title"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Company Name"
              placeholder="Enter company name"
              value={formData.companyName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, companyName: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Location"
              placeholder="Enter location"
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
              required={true}
              type="text"
            />
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="Internship Details">
            <FormField
              label="Duration"
              placeholder="Enter duration (e.g., 6 months)"
              value={formData.duration}
              onChangeText={(text) => setFormData(prev => ({ ...prev, duration: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Stipend"
              placeholder="Enter stipend amount"
              value={formData.stippend}
              onChangeText={(text) => setFormData(prev => ({ ...prev, stippend: text }))}
              required={true}
              type="text"
              keyboardType="numeric"
            />

            <FormField
              label="Number of Positions"
              placeholder="Enter number of positions"
              value={formData.position}
              onChangeText={(text) => setFormData(prev => ({ ...prev, position: text }))}
              required={true}
              type="text"
              keyboardType="numeric"
            />

            <FormField
              label="Application Deadline"
              placeholder="Select deadline"
              value={formData.applicationDeadline}
              onChangeText={(date) => setFormData(prev => ({ ...prev, applicationDeadline: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Year"
              placeholder="Select year"
              value={formData.year}
              onChangeText={(value) => setFormData(prev => ({ ...prev, year: value }))}
              required={true}
              type="select"
              options={years.map(year => ({
                label: year.yearName || 'Unknown Year', // Fallback for undefined
                value: year.yearId ? year.yearId.toString() : '', // Ensure id is defined
              }))}
            />

            <FormField
              label="Department"
              placeholder="Select department"
              value={formData.departmentId}
              onChangeText={(value) => setFormData(prev => ({ ...prev, departmentId: value }))}
              required={true}
              type="select"
              options={departments.map(dept => ({
                label: dept.departmentName || 'Unknown Department', // Fallback for undefined
                value: dept.id ? dept.id.toString() : '', // Ensure id is defined
              }))}
            />
          </SectionContainer>

          <SectionContainer sectionNumber="3" title="Detailed Information">
            <FormField
              label="Description"
              placeholder="Enter detailed internship description"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
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
              {
                title: "Cancel",
                onPress: () => navigation.goBack(),
                variant: "secondary",
              },
              {
                title: loading ? "Creating..." : "Create Internship",
                onPress: handleCreate,
                variant: "primary",
                disabled: loading, // Disable button when loading
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
};