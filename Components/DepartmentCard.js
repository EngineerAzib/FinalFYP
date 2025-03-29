import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';  // Correct import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';


export const DepartmentCard = ({
  name,
  studentCount,
  genderStats,
  onEdit,
  onDelete
}) => (
  <View style={styles.DepartmentCardcardContainer}>
    <View style={styles.DepartmentCardcardHeader}>
      <Text style={styles.DepartmentCarddepartmentName}>{name}</Text>
      <View style={styles.DepartmentCardactionButtons}>
        <TouchableOpacity onPress={onEdit} style={styles.DepartmentCardiconButton}>
          <MaterialCommunityIcons name="pencil" size={20} color="#4B6BFB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.DepartmentCardiconButton}>
          <MaterialCommunityIcons name="delete" size={20} color="#FF4B55" />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.DepartmentCardstatsContainer}>
      <View style={styles.DepartmentCardstudentCount}>
        <Text style={styles.DepartmentCardcountNumber}>{studentCount}</Text>
        <Text style={styles.DepartmentCardcountLabel}>STUDENTS</Text>
      </View>
      <View style={styles.DepartmentCardgenderStats}>
        {Object.entries(genderStats).map(([gender, { percentage, count }]) => (
          <View key={gender} style={styles.DepartmentCardgenderItem}>
            <View style={styles.DepartmentCardpercentageRing}>
              <Text style={styles.DepartmentCardpercentageText}>{percentage}%</Text>
            </View>
            <Text style={styles.DepartmentCardgenderLabel}>{gender}</Text>
            <Text style={styles.DepartmentCardgenderCount}>{count}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);


export default DepartmentCard;