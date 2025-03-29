import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

export const CreateInternshipScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    duration: '',
    stipend: '',
    positions: '',
    deadline: '',
    status: '',
    requirements: '',
    description: '',
    responsibilities: '',
    qualifications: ''
  });

  const internshipTypes = [
    'Full-time',
    'Part-time',
    'Remote',
    'Hybrid'
  ];

  const statusOptions = [
    'Active',
    'Upcoming',
    'Closed'
  ];

  const handleCreate = async () => {
    try {
      // Here you would make your API call to create the internship
      // await createInternship(formData);

      navigation.goBack();
    } catch (error) {
      console.error('Error creating internship:', error);
    }
  };

  return (
    // IMPORTANT: The root View must have flex: 1 to fill the screen
    // This allows us to properly position the footer at the bottom
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
              value={formData.company}
              onChangeText={(text) => setFormData(prev => ({ ...prev, company: text }))}
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
              label="Internship Type"
              placeholder="Select internship type"
              value={formData.type}
              onChangeText={(text) => setFormData(prev => ({ ...prev, type: text }))}
              required={true}
              type="select"
              options={internshipTypes}
            />

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
              value={formData.stipend}
              onChangeText={(text) => setFormData(prev => ({ ...prev, stipend: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Number of Positions"
              placeholder="Enter number of positions"
              value={formData.positions}
              onChangeText={(text) => setFormData(prev => ({ ...prev, positions: text }))}
              required={true}
              type="text"
              keyboardType="numeric"
            />

            <FormField
              label="Application Deadline"
              placeholder="Select deadline"
              value={formData.deadline}
              onChangeText={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Status"
              placeholder="Select status"
              value={formData.status}
              onChangeText={(text) => setFormData(prev => ({ ...prev, status: text }))}
              required={true}
              type="select"
              options={statusOptions}
            />
          </SectionContainer>

          <SectionContainer sectionNumber="3" title="Detailed Information">
            <FormField
              label="Requirements"
              placeholder="Enter technical requirements, skills needed"
              value={formData.requirements}
              onChangeText={(text) => setFormData(prev => ({ ...prev, requirements: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

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

            <FormField
              label="Responsibilities"
              placeholder="Enter key responsibilities and expectations"
              value={formData.responsibilities}
              onChangeText={(text) => setFormData(prev => ({ ...prev, responsibilities: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <FormField
              label="Qualifications"
              placeholder="Enter required qualifications and experience"
              value={formData.qualifications}
              onChangeText={(text) => setFormData(prev => ({ ...prev, qualifications: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />


          </SectionContainer>

        </ScrollView >

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              {
                title: "Cancel",
                onPress: () => navigation.goBack(),
                variant: "secondary",
              },
              {
                title: "Create Internship",
                onPress: handleCreate,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View >

    </View >


  );
};

