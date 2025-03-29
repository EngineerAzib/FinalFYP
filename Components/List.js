import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../AdminPortal_Css';

const List = ({ 
  title, 
  date, 
  attendanceMarked, 
  userInfo,
  onAddAttendance, 
  onSendMessage,
  illustration 
}) => {
  const IconComponent = () => (
    <View style={styles.ListiconCircle}>
      <Icon 
        name={title.toLowerCase().includes('student') ? 'person' : 'work'} 
        size={20} 
        color="#6C63FF" 
      />
    </View>
  );

  return (
    <View style={styles.Listcontainer}>
      <View style={styles.Listheader}>
        <View style={styles.ListtitleContainer}>
          <IconComponent />
          <Text style={styles.Listtitle}>{title}</Text>
        </View>
        <Text style={styles.Listdate}>{date}</Text>
      </View>

      {!attendanceMarked ? (
        // Empty State
        <View style={styles.ListemptyContent}>
          {illustration && (
            <Image
              source={illustration}
              style={styles.Listillustration}
              resizeMode="contain"
            />
          )}
          
          <View style={styles.ListmessageContainer}>
            <Icon name="search" size={20} color="#6C63FF" style={styles.ListsearchIcon} />
            <Text style={styles.Listmessage}>Attendance Not Found.</Text>
          </View>

          <TouchableOpacity 
            style={styles.ListaddButton}
            onPress={onAddAttendance}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
            <Text style={styles.ListbuttonText}>Add Attendance</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Attendance Marked State
        <View style={styles.ListuserContent}>
          <View style={styles.ListuserContainer}>
            <Image 
              source={userInfo.avatar} 
              style={styles.Listavatar} 
            />
            <View style={styles.ListuserInfo}>
              <Text style={styles.ListuserName}>{userInfo.name}</Text>
              <Text style={styles.ListuserRole}>{userInfo.role}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.ListmessageButton}
            onPress={onSendMessage}
          >
            <Icon name="mail" size={20} color="#FFFFFF" />
            <Text style={styles.ListmessageButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};



export default List;