import React from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

export const DepartmentCard2 = ({ department, onPress }) => {
  return (
    <TouchableOpacity style={styles.DepartmentCard2card} onPress={onPress}>
      <View style={styles.DepartmentCard2cardContent}>
        <View style={styles.DepartmentCard2iconContainer}>
          <MaterialIcons name="school" size={24} color="#4A6BD6" />
        </View>
        <View style={styles.DepartmentCard2textContainer}>
          <Text style={styles.DepartmentCard2departmentName}>{department.name}</Text>
          <Text style={styles.DepartmentCard2semesterCount}>
           8 Semesters
          </Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
    </TouchableOpacity>
  );
};

