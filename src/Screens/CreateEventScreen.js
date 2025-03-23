import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header } from '../Components/Header';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import GetNewsCategory from '../Services/NewsService/GetNewsCategory';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';


export const CreateEventScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '', // Name of the event
    description: '', // Description of the event
    location: '', // Location of the event
    startDate: '', // Start date of the event
    endDate: '', // End date of the event
    startTime: '', // Start time of the event
    endTime: '', // End time of the event
    eventCategoryId: '', // ID of the selected event category
    imageUrl: null, // URL or base64 string for the image
  });

  const [eventCategories, setEventCategories] = useState([]); // State to store event categories
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch event categories on component mount
  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const data = await GetNewsCategory();
        setEventCategories(data); // Set fetched categories
      } catch (error) {
        console.error('Error fetching event categories:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchEventCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
  
      // Append standard fields
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Description', formData.description);
      formDataToSend.append('Location', formData.location);
      formDataToSend.append('EventCategoryId', parseInt(formData.eventCategoryId, 10)); // Ensure it's a number
  
      // Append Start Date fields
      if (formData.startDate) {
        const [year, month, day] = formData.startDate.split('-'); // Assumes YYYY-MM-DD format
        formDataToSend.append('StartDate.Year', parseInt(year, 10));
        formDataToSend.append('StartDate.Month', parseInt(month, 10)); // Months are 1-based
        formDataToSend.append('StartDate.Day', parseInt(day, 10));
      }
  
      // Append End Date fields
      if (formData.endDate) {
        const [year, month, day] = formData.endDate.split('-'); // Assumes YYYY-MM-DD format
        formDataToSend.append('EndDate.Year', parseInt(year, 10));
        formDataToSend.append('EndDate.Month', parseInt(month, 10)); // Months are 1-based
        formDataToSend.append('EndDate.Day', parseInt(day, 10));
      }
  
      // Append Start Time fields
      if (formData.startTime) {
        const [hour, minute] = formData.startTime.split(':');
        formDataToSend.append('StartTime.Hour', parseInt(hour, 10));
        formDataToSend.append('StartTime.Minute', parseInt(minute, 10));
      }
  
      // Append End Time fields
      if (formData.endTime) {
        const [hour, minute] = formData.endTime.split(':');
        formDataToSend.append('EndTime.Hour', parseInt(hour, 10));
        formDataToSend.append('EndTime.Minute', parseInt(minute, 10));
      }
  
      // Handle image upload
      if (formData.imageUrl) {
        formDataToSend.append('image', {
          uri: formData.imageUrl, // URI of the image
          type: 'image/jpeg', // Change based on actual image type
          name: 'event_image.jpg', // Name of the file
        });
      } else {
        console.error('Image is required.');
        throw new Error('Image is required.');
      }
  
      // Debug the FormData
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
  
      // Send request
      const response = await axios.post(`${API_BASE_URL}/api/Events/AddEvents`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });
  
      console.log('Event created successfully:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <View style={styles.CreateEventScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Events"
        currentScreen="Create New Event"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateEventScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateEventScreenscrollContent}
        >
          <Text style={styles.CreateEventScreenformTitle}>Add Event</Text>

          <View style={styles.CreateEventScreenlegendContainer}>
            <View style={styles.CreateEventScreenlegendItem}>
              <View style={[styles.CreateEventScreenlegendDot, styles.CreateEventScreenrequiredDot]} />
              <Text style={styles.CreateEventScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateEventScreenlegendItem}>
              <View style={[styles.CreateEventScreenlegendDot, styles.CreateEventScreenoptionalDot]} />
              <Text style={styles.CreateEventScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Event Details">
            <FormField
              label="Event Name"
              placeholder="Enter event name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Event Description"
              placeholder="Enter event description"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              required={true}
              type="textarea"
            />

            <FormField
              label="Location"
              placeholder="Enter event location"
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Start Date"
              placeholder="Select start date"
              value={formData.startDate}
              onChangeText={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="End Date"
              placeholder="Select end date"
              value={formData.endDate}
              onChangeText={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Start Time"
              placeholder="Select start time"
              value={formData.startTime}
              onChangeText={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
              required={true}
              type="time"
            />

            <FormField
              label="End Time"
              placeholder="Select end time"
              value={formData.endTime}
              onChangeText={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
              required={true}
              type="time"
            />

            <FormField
              label="Event Category"
              placeholder="Select event category"
              value={formData.eventCategoryId}
              onChangeText={(text) => setFormData(prev => ({ ...prev, eventCategoryId: text }))}
              required={true}
              type="select"
              options={eventCategories.map(category => ({
                label: category.title, // Display category name
                value: category.id.toString(), // Save category ID
              }))}
            />

            <FormField
              label="Event Banner"
              placeholder="Upload event banner"
              value={formData.imageUrl}
              onChangeText={(uri) => setFormData(prev => ({ ...prev, imageUrl: uri }))}
              type="file"
              maxSize="5MB"
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
                title: "Create Event",
                onPress: handleSubmit,
                variant: "primary",
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};