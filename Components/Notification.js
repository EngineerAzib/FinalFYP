import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import styles from '../AdminPortal_Css';

const Notification = ({ message, actionText, onAction }) => {
  return (
    <View style={styles.Notificationcontainer}>
      <View style={styles.Notificationcontent}>
        {/* Icon/Image for the notification */}
        <Image
          source={require('../Assets/welcome.jpg')} // Replace with your icon path
          style={styles.Notificationicon}
        />
        <View style={styles.NotificationtextContainer}>
          <Text style={styles.Notificationtitle}>Welcome to</Text>
          <Text style={styles.NotificationsubTitle}>Admin Dashboard</Text>
          <Text style={styles.Notificationmessage}>{message}</Text>
        </View>
      </View>
      {actionText && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.NotificationactionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};



export default Notification;
