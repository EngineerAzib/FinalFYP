import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

const CreateTeacherForm = ({ navigation }) => {
  // Initialize form state with teacher-specific fields
  const [formData, setFormData] = useState({
    teacherName: '',
    qualification: '',
    employeeId: '',
    department: '',
    profilePhoto: '',
    dateOfBirth: '',
    specialization: '',
    cnicNo: '',
    phoneNo: '',
    email: '',
    designation: '',
    joiningDate: '',
  });

  const handleSubmit = async () => {
    console.log('Teacher Data:', formData);
    // TODO: Implement API call to save teacher
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
              label="Teacher Name"
              placeholder="Enter teacher's name"
              required
              value={formData.teacherName}
              onChangeText={(text) => setFormData({ ...formData, teacherName: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              blurOnSubmit={false}
            />

            <FormField
              label="Qualification"
              placeholder="Enter highest qualification"
              required
              value={formData.qualification}
              onChangeText={(text) => setFormData({ ...formData, qualification: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              blurOnSubmit={false}
            />

            <FormField
              label="Employee ID"
              placeholder="Enter employee ID"
              required
              value={formData.employeeId}
              onChangeText={(text) => setFormData({ ...formData, employeeId: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
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
              blurOnSubmit={false}
            />

            <FormField
              label="Designation"
              placeholder="Enter designation"
              required
              value={formData.designation}
              onChangeText={(text) => setFormData({ ...formData, designation: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              blurOnSubmit={false}
            />

            <FormField
              label="Specialization"
              placeholder="Enter specialization"
              required
              value={formData.specialization}
              onChangeText={(text) => setFormData({ ...formData, specialization: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
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
              blurOnSubmit={false}
            />

            <FormField
              label="Joining Date"
              placeholder="Select Date"
              type="date"
              required
              value={formData.joiningDate}
              onChangeText={(text) => setFormData({ ...formData, joiningDate: text })}
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
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
              blurOnSubmit={false}
            />

            <FormField
              label="Phone No"
              placeholder="e.g +44xxxxxxxxxx"
              required
              value={formData.phoneNo}
              onChangeText={(text) => setFormData({ ...formData, phoneNo: text })}
              keyboardType="phone-pad"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              blurOnSubmit={false}
            />

            <FormField
              label="Email"
              placeholder="Enter email address"
              required
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              editable={true}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              enablesReturnKeyAutomatically
              returnKeyType="done"
              blurOnSubmit={false}
            />
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Register Teacher", onPress: handleSubmit, variant: "primary" },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateTeacherForm;