import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetSemesterList from '../Services/CoursesService/SemesterList';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../AdminPortal_Css';

export const CreateNotificationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    message: '',
    date:'',
    departmentId: '',
    semesterId: '',
    // date: new Date(), // Add date field
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsData, semestersData] = await Promise.all([
          GetDepartmentList(),
          GetSemesterList(),
        ]);
        setDepartments(departmentsData);
        setSemesters(semestersData);
      } catch (error) {
        Alert.alert('Error', 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event, selectedDate) => {
    // Always close the picker on Android when a date is selected
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  
    // Only update the date if one was selected (not cancelled)
    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        departmentId: formData.departmentId || null,
        semesterId: formData.semesterId || null,
        date: formData.date, // Include date in payload
        timestamp: new Date().toISOString()
      };
      console.log(payload);
      const response = await axios.post(
        `${API_BASE_URL}/api/notifications`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Notification created!');
        navigation.goBack();
      } else {
        throw new Error(response.data.message || 'Failed to create');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create notification');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <CustomHeader
        title="Notifications"
        currentScreen="Create Notification"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <SectionContainer sectionNumber="1" title="Notification Information">
              <FormField
                label="Notification Type"
                placeholder="Select Type"
                type="select"
                required
                value={formData.type}
                onChangeText={(value) => setFormData({ ...formData, type: value })}
                options={[
                  { label: 'Announcement', value: 'announcement' },
                  { label: 'Alert', value: 'alert' },
                  { label: 'Reminder', value: 'reminder' },
                ]}
              />

              <FormField
                label="Title*"
                placeholder="Enter title"
                required
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                error={errors.title}
              />

              <FormField
                label="Message*"
                placeholder="Enter message"
                required
                value={formData.message}
                onChangeText={(text) => setFormData({ ...formData, message: text })}
                multiline
                numberOfLines={4}
                error={errors.message}
              />

                <FormField
              label="Date"
              placeholder="Select  date"
              value={formData.date}
              onChangeText={(date) => setFormData(prev => ({ ...prev, date: date }))}
              required={true}
              type="date"
            />

              <FormField
                label="Department (Optional)"
                placeholder="Select Department"
                type="select"
                required
                value={formData.departmentId}
                onChangeText={(value) => setFormData({ ...formData, departmentId: value })}
                options={[
                  { label: 'All Departments', value: '' },
                  ...departments.map((dept) => ({
                    label: dept.departmentName,
                    value: dept.id.toString(),
                  })),
                ]}
              />

              <FormField
                label="Semester (Optional)"
                placeholder="Select Semester"
                type="select"
                required
                value={formData.semesterId}
                onChangeText={(value) => setFormData({ ...formData, semesterId: value })}
                options={[
                  { label: 'All Semesters', value: '' },
                  ...semesters.map((sem) => ({
                    label: sem.semesterName,
                    value: sem.id.toString(),
                  })),
                ]}
              />
            </SectionContainer>
          </ScrollView>

          {/* Fixed button container at the bottom */}
          <View style={localStyles.buttonContainer}>
            <CustomButton
              buttons={[
                {
                  title: 'Cancel',
                  onPress: () => navigation.goBack(),
                  variant: 'secondary',
                },
                {
                  title: submitting ? 'Creating...' : 'Create Notification',
                  onPress: handleSubmit,
                  variant: 'primary',
                  disabled: submitting,
                },
              ]}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      {submitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});