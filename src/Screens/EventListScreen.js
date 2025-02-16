import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { EventCard } from '../Components/EventCard';
import { EditEventScreen } from './EditEventScreen';
import { CreateEventScreen } from './CreateEventScreen';
import styles from '../AdminPortal_Css';
import EventService from '../Services/EventService/EventService'

export const EventListScreen = ({ navigation }) => {
  // Fetch events, error, and loading state from the EventService custom hook
  const { event, error, loading } = EventService();

  if (loading) {
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
        {/* Add loading indicator or spinner here */}
      </View>
    );
  }

  if (error) {
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
        <Text>Error loading events: {error}</Text>
      </View>
    );
  }

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
        {event.map((eventItem) => (
          // Ensure event.id is unique and passed as key
          <EventCard key={eventItem.id} event={eventItem} />
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
