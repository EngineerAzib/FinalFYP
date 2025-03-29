import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { EventCard } from '../Components/EventCard';
import { EditEventScreen } from './EditEventScreen';
import { CreateEventScreen } from './CreateEventScreen';
import styles from '../AdminPortal_Css';

export const EventListScreen = ({ navigation }) => {
  // Sample data - replace with your API call
  const events = [
    {
      id: 1,
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
    },
    {
      id: 2,
      title: 'AI Workshop',
      description: 'Hands-on AI/ML workshop',
      date: '2025-03-20',
      time: '14:00',
      venue: 'Lab 101',
      organizer: 'AI Club',
      maxParticipants: '50',
      registrationDeadline: '2025-03-18',
      eventType: 'Workshop',
      image: null
    }
  ];

  return (
    <View style={styles.EventListScreencontainer}>
      <Header />
      <CustomHeader
        title="Events"
        currentScreen="Events List"
        showSearch={true}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView style={styles.EventListScreenscrollView}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.EventListScreenfab}
        onPress={() => navigation.navigate('CreateEventScreen', { eventData: null })}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
// CreateDepartmentScreenmainContainer: {
//   flex: 1,
//   backgroundColor: '#FFFFFF',
// },
// CreateDepartmentScreencontentContainer: {
//   flex: 1,
//   backgroundColor: '#F8F9FA',
// },
// CreateDepartmentScreenscrollContent: {
//   paddingHorizontal: 20,
//   paddingTop: 20,
//   paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
// },