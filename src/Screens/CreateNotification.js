import React, { useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateNotification = ({ navigation }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    message: '',
    timestamp: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Notification name is required';
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

  const handleSubmit = () => {
    if (validateForm()) {
      // Calculate percentages
      const totalStudents = parseInt(formData.totalStudents);
      const boysCount = parseInt(formData.boysCount);
      const girlsCount = parseInt(formData.girlsCount);

      const NotificationData = {
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

      // Here you would typically make an API call to save the Notification
      console.log('New Notification Data:', NotificationData);
      Alert.alert('Success', 'Notification created successfully!');
      navigation.goBack();
    }
  };
  const handleUpdate = async () => {
    try {
      // Here you would make your API call
      // await updateEvent(eventData.id, formData);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (

    <View style={styles.CreateNotificationScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Notifications"
        currentScreen="Create Notification"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateNotificationScreencontentContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateNotificationScreenscrollContent}
        >
          <Text style={styles.CreateNotificationScreenformTitle}>Add Notification</Text>

          <View style={styles.CreateNotificationScreenlegendContainer}>
            <View style={styles.CreateNotificationScreenlegendItem}>
              <View style={[styles.CreateNotificationScreenlegendDot, styles.CreateNotificationScreenrequiredDot]} />
              <Text style={styles.CreateNotificationScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateNotificationScreenlegendItem}>
              <View style={[styles.CreateNotificationScreenlegendDot, styles.CreateNotificationScreenoptionalDot]} />
              <Text style={styles.CreateNotificationScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Notification Information">

            <FormField
              label="Notification Name"
              placeholder="Enter Notification name"
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

            <View style={styles.CreateNotificationScreensubmitButton}>
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
}
