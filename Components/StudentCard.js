import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

export const StudentCard = ({ name, department, onView, onEdit, onDelete }) => {
  return (
    <View style={styles.StudentCardcardContainer}>
      <View style={styles.StudentCardavatarSection}>
        <View style={styles.StudentCardavatar}>
          <Ionicons name="person-outline" size={40} color="#4B6BFB" />
        </View>
        <View style={styles.StudentCardstudentInfo}>
          <Text style={styles.StudentCardstudentName}>{name}</Text>
          <Text style={styles.StudentCardstudentDepartment}>{department}</Text>
        </View>
      </View>
      <View style={styles.StudentCardcardActions}>
        <TouchableOpacity style={styles.StudentCardactionButton} onPress={onView}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.StudentCardactionButton} onPress={onEdit}>
          <Ionicons name="create-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.StudentCardactionButton, styles.StudentCarddeleteButton]} onPress={onDelete}>
          <Ionicons name="trash-outline" size={20} color="#FF4B55" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

