// src/screens/EditEventScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { EventCard } from '../Components/EventCard';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';


export const EditEventScreen = ({ route, navigation }) => {
  const { eventData = {
    title: 'Tech Conference 2025',
    description: 'Annual technology conference',
    date: '2025-03-15',
    time: '09:00',
    venue: 'Main Auditorium',
    organizer: 'CS Department',
    maxParticipants: '200',
    registrationDeadline: '2025-03-10',
    eventType: 'Conference',
    image: null
  } } = route.params;

  const [formData, setFormData] = useState({
    title: eventData.title,
    description: eventData.description,
    date: eventData.date,
    time: eventData.time,
    venue: eventData.venue,
    organizer: eventData.organizer,
    maxParticipants: eventData.maxParticipants.toString(),
    registrationDeadline: eventData.registrationDeadline,
    eventType: eventData.eventType,
    image: eventData.image
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

    <View style={styles.EditEventScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Events"
        currentScreen="Edit Event"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditEventScreencontentContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditEventScreenscrollContent}
        >
          <Text style={styles.EditEventScreenformTitle}>Edit Event</Text>

          <View style={styles.EditEventScreenlegendContainer}>
            <View style={styles.EditEventScreenlegendItem}>
              <View style={[styles.EditEventScreenlegendDot, styles.EditEventScreenrequiredDot]} />
              <Text style={styles.EditEventScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.EditEventScreenlegendItem}>
              <View style={[styles.EditEventScreenlegendDot, styles.EditEventScreenoptionalDot]} />
              <Text style={styles.EditEventScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Edit Details">

            <FormField
              label="Event Title"
              placeholder="Enter event title"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              required={true}
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
                title: "Edit Event",
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

