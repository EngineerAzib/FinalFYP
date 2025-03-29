import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

export const EditInternshipScreen = ({ route, navigation }) => {
  const { internshipData } = route.params;

  const [formData, setFormData] = useState({
    title: internshipData?.title || '',
    company: internshipData?.company || '',
    location: internshipData?.location || '',
    type: internshipData?.type || '',
    duration: internshipData?.duration || '',
    stipend: internshipData?.stipend || '',
    positions: internshipData?.positions?.toString() || '',
    deadline: internshipData?.deadline || '',
    status: internshipData?.status || '',
    requirements: internshipData?.requirements || '',
    description: internshipData?.description || '',
    responsibilities: internshipData?.responsibilities || '',
    qualifications: internshipData?.qualifications || ''
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

  const handleUpdate = async () => {
    try {
      // Here you would make your API call
      // await updateInternship(internshipData.id, formData);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating internship:', error);
    }
  };

  return (
    // IMPORTANT: The root View must have flex: 1 to fill the screen
    // This allows us to properly position the footer at the bottom
    <View style={styles.EditInternshipScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Internships"
        currentScreen="Edit Internship"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditInternshipScreencontentContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditInternshipScreenscrollContent}
        >
          <Text style={styles.EditInternshipScreenformTitle}>Revise Internship</Text>

          <View style={styles.EditInternshipScreenlegendContainer}>
            <View style={styles.EditInternshipScreenlegendItem}>
              <View style={[styles.EditInternshipScreenlegendDot, styles.EditInternshipScreenrequiredDot]} />
              <Text style={styles.EditInternshipScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.EditInternshipScreenlegendItem}>
              <View style={[styles.EditInternshipScreenlegendDot, styles.EditInternshipScreenoptionalDot]} />
              <Text style={styles.EditInternshipScreenlegendText}>Optional</Text>
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
              placeholder="Enter requirements"
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
              placeholder="Enter internship description"
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
              placeholder="Enter responsibilities"
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
              placeholder="Enter required qualifications"
              value={formData.qualifications}
              onChangeText={(text) => setFormData(prev => ({ ...prev, qualifications: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
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
                title: "Edit Internship",
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
