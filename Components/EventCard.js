import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../AdminPortal_Css';

export const EventCard = ({ event }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditEventScreen', { eventData: event });
  };

  return (
    <View style={styles.EventCardcard}>
      {event.image ? (
        <Image
          source={{ uri: event.image }}
          style={styles.EventCardeventImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.EventCardplaceholderImage}>
          <MaterialIcons name="event" size={40} color="#6C63FF" />
        </View>
      )}

      <View style={styles.EventCardcontentContainer}>
        <View style={styles.EventCardheaderRow}>
          <View style={styles.EventCardtypeContainer}>
            <Text style={styles.EventCardeventType}>{event.eventType}</Text>
          </View>
          <TouchableOpacity
            onPress={handleEdit}
            style={styles.EventCardeditButton}
          >
            <MaterialIcons name="edit" size={20} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.EventCardtitle}>{event.title}</Text>

        <View style={styles.EventCarddetailsContainer}>
          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="calendar-today" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.date}</Text>
          </View>

          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.time}</Text>
          </View>

          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="location-on" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.venue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
