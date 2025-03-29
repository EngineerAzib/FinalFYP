import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

const AddStudentForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    rollNo: '',
    enrollmentNo: '',
    department: '',
    profilePhoto: '',
    dateOfBirth: '',
    semesterNo: '',
    cnicNo: '',
    phoneNo: '',
  });

  const handleSubmit = async () => {
    console.log('Student Data:', formData);
    // TODO: Implement API call to save student
  };

  return (
    <View style={styles.EditDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Student Registration"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditDepartmentScreenscrollContent}
        >
          <Text style={styles.AddStudentFormformTitle}>Add New Student</Text>

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

          <SectionContainer sectionNumber="1" title="Student Information">
            <FormField
              label="Student Name"
              placeholder="Enter student's name"
              required
              value={formData.studentName}
              onChangeText={(text) => setFormData({ ...formData, studentName: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Father Name"
              placeholder="Enter father's name"
              required
              value={formData.fatherName}
              onChangeText={(text) => setFormData({ ...formData, fatherName: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Roll No"
              placeholder="Enter student roll number"
              required
              value={formData.rollNo}
              onChangeText={(text) => setFormData({ ...formData, rollNo: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Enrollment No"
              placeholder="Enter student enrollment number"
              required
              value={formData.enrollmentNo}
              onChangeText={(text) => setFormData({ ...formData, enrollmentNo: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Department"
              placeholder="Select Department"
              type="select"
              required
              value={formData.department}
              onChangeText={(text) => setFormData({ ...formData, department: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Date of Birth"
              placeholder="Select Date"
              type="date"
              required
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Semester No"
              placeholder="Enter current semester"
              required
              value={formData.semesterNo}
              onChangeText={(text) => setFormData({ ...formData, semesterNo: text })}
              keyboardType="numeric"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="CNIC No"
              placeholder="00000-0000000-0"
              required
              value={formData.cnicNo}
              onChangeText={(text) => setFormData({ ...formData, cnicNo: text })}
              keyboardType="numeric"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />

            <FormField
              label="Phone No"
              placeholder="e.g +44xxxxxxxxxx"
              value={formData.phoneNo}
              onChangeText={(text) => setFormData({ ...formData, phoneNo: text })}
              keyboardType="phone-pad"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              // Critical for Android
              blurOnSubmit={false}
            />
          </SectionContainer>
        </ScrollView>

        {/* ✅ Fixed Button Placement */}
        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Register Student", onPress: handleSubmit, variant: "primary" },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default AddStudentForm;
