import React, { useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateNotificationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    message: '',
    priority: 'medium',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type.trim()) {
      newErrors.type = 'Notification type is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Notification title is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Notification message is required';
    }
    
    if (!formData.priority.trim()) {
      newErrors.priority = 'Priority level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Create timestamp for the new notification
      const timestamp = new Date().toISOString();
      
      const notificationData = {
        id: Math.floor(Math.random() * 10000), // Generate a random ID (would be handled by backend)
        type: formData.type,
        title: formData.title,
        message: formData.message,
        timestamp: timestamp,
        isRead: false,
        priority: formData.priority
      };

      // Here you would typically make an API call to save the notification
      console.log('New Notification Data:', notificationData);
      Alert.alert('Success', 'Notification created successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Notifications"
        currentScreen="Create Notification"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Add Notification</Text>

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

          <SectionContainer sectionNumber="1" title="Notification Details">
            <FormField
              label="Notification Type"
              placeholder="Enter notification type (academic, registration, etc.)"
              value={formData.type}
              onChangeText={(text) => setFormData({ ...formData, type: text })}
              error={errors.type}
              required
            />

            <FormField
              label="Notification Title"
              placeholder="Enter notification title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              error={errors.title}
              required
            />

            <FormField
              label="Notification Message"
              placeholder="Enter notification message"
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              error={errors.message}
              multiline={true}
              numberOfLines={4}
              required
            />

            <FormField
              label="Priority Level"
              placeholder="Select priority level"
              value={formData.priority}
              onChangeText={(text) => setFormData({ ...formData, priority: text })}
              error={errors.priority}
              type="select"
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' }
              ]}
              required
            />

            <View style={styles.CreateDepartmentScreensubmitButton}>
              <FormField
                type="button"
                label="Create Notification"
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
                title: "Create Notification",
                onPress: handleSubmit,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
};