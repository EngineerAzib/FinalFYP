import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../AdminPortal_Css';
import Downloadpdf from '../Services/DownloadPDF/Downloadpdf';  // Import your download function


export const EventCard = ({ event }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditEventScreen', { eventData: event });
  };
  const handleDownload = () => {
    // Call Downloadpdf function with the filename from news
    Downloadpdf(event.imageUrl);  // Ensure the filename exists in the 'news' object
  };
  return (
    <View style={styles.EventCardcard}>
      {/* {event.image ? (
        <Image
          source={{ uri: event.image }}
          style={styles.EventCardeventImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.EventCardplaceholderImage}>
          <MaterialIcons name="event" size={40} color="#6C63FF" />
        </View>
      )} */}

      <View style={styles.EventCardcontentContainer}>
        <View style={styles.EventCardheaderRow}>
          <View style={styles.EventCardtypeContainer}>
            <Text style={styles.EventCardeventType}>{event.categoryTitle}</Text>
          </View>
          <TouchableOpacity
            onPress={handleEdit}
            style={styles.EventCardeditButton}
          >
            <MaterialIcons name="edit" size={20} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.EventCardtitle}>{event.name}</Text>

        <View style={styles.EventCarddetailsContainer}>
          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="calendar-today" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.startDate} </Text><Text style={styles.EventCarddetailText}>{event.endDate}</Text>
          </View>

          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.startTime} </Text><Text style={styles.EventCarddetailText}>{event.endTime}</Text>
          </View>

          <View style={styles.EventCarddetailItem}>
            <MaterialIcons name="location-on" size={16} color="#6B7280" />
            <Text style={styles.EventCarddetailText}>{event.location}</Text>

            <TouchableOpacity onPress={handleDownload}>
            <Text style={{paddingLeft:150}}>Download</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
