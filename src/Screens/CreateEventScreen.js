// src/screens/CreateEventScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';

export const CreateEventScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    maxParticipants: '',
    registrationDeadline: '',
    eventType: '',
    image: null
  });

  const eventTypes = [
    'Conference',
    'Workshop',
    'Seminar',
    'Competition',
    'Cultural Event',
    'Sports Event',
    'Other'
  ];

  const handleSubmit = async () => {
    try {
      // Here you would make your API call to create a new event
      // await createEvent(formData);

      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  return (
    // IMPORTANT: The root View must have flex: 1 to fill the screen
    // This allows us to properly position the footer at the bottom
    <View style={styles.CreateEventScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Events"
        currentScreen="Create New Event"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      {/* Content container needs flex: 1 to properly fill available space */}
      <View style={styles.CreateEventScreencontentContainer}>
        {/* ScrollView should not have flex: 1 in its style prop */}
        {/* Instead, it should naturally fill the space between header and footer */}
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
          <SectionContainer sectionNumber="1" title="Publish Event">

            <FormField
              label="Event Title"
              placeholder="Enter event title"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              // required={true}
              type="text"
            />

            <FormField
              label="Event Type"
              placeholder="Select event type"
              value={formData.eventType}
              onChangeText={(text) => setFormData(prev => ({ ...prev, eventType: text }))}
              required={true}
              type="select"
              options={eventTypes}
            />

            <FormField
              label="Event Description"
              placeholder="Enter event description"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Event Date"
              placeholder="Select event date"
              value={formData.date}
              onChangeText={(date) => setFormData(prev => ({ ...prev, date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Event Time"
              placeholder="Select event time"
              value={formData.time}
              onChangeText={(time) => setFormData(prev => ({ ...prev, time }))}
              required={true}
              type="text"
            />

            <FormField
              label="Venue"
              placeholder="Enter event venue"
              value={formData.venue}
              onChangeText={(text) => setFormData(prev => ({ ...prev, venue: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Organizer"
              placeholder="Enter organizer name"
              value={formData.organizer}
              onChangeText={(text) => setFormData(prev => ({ ...prev, organizer: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Maximum Participants"
              placeholder="Enter maximum participants"
              value={formData.maxParticipants}
              onChangeText={(text) => setFormData(prev => ({ ...prev, maxParticipants: text }))}
              required={true}
              type="text"
              keyboardType="numeric"
            />

            <FormField
              label="Registration Deadline"
              placeholder="Select registration deadline"
              value={formData.registrationDeadline}
              onChangeText={(date) => setFormData(prev => ({ ...prev, registrationDeadline: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Event Banner"
              placeholder="Upload event banner"
              value={formData.image}
              onChangeText={(uri) => setFormData(prev => ({ ...prev, image: uri }))}
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
              }
            ]}
          />
        </View>
      </View >

    </View >
  );
};

