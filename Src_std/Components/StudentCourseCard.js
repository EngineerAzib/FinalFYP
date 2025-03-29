import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  StyleSheet
} from 'react-native';
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons';

import StudentSemesterRegistrationScreen from "../Screens/StudentSemesterRegistrationScreen";

const StudentCourseCard = ({ course, onSelect, isSelected, isPrerequisiteMet }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        duration: 100
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      })
    ]).start();

    if (!isPrerequisiteMet) {
      Alert.alert(
        "Prerequisites Not Met",
        `You need to complete ${course.prerequisites.join(", ")} first.`,
        [{ text: "OK" }]
      );
      return;
    }
    onSelect(course);
  };

  return (
    <Animated.View style={[
      styles.courseCard,
      { transform: [{ scale: scaleAnim }] },
      isSelected && styles.courseCardSelected,
      !isPrerequisiteMet && styles.courseCardDisabled
    ]}>
      <TouchableOpacity onPress={handlePress} disabled={!isPrerequisiteMet}>
        <View style={styles.courseHeader}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.courseName}>{course.name}</Text>
          </View>
          {isSelected && (
            <MaterialIcons name="check-circle" size={24} color="#22C55E" />
          )}
        </View>

        <View style={styles.courseDetails}>
          <View style={styles.detailItem}>
            <FontAwesome5 name="clock" size={16} color="#6C63FF" />
            <Text style={styles.detailText}>{course.creditHours} Credit Hours</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome5 name="chalkboard-teacher" size={16} color="#6C63FF" />
            <Text style={styles.detailText}>{course.instructor}</Text>
          </View>
          {course.type.includes("Lab") && (
            <View style={styles.detailItem}>
              <FontAwesome5 name="flask" size={16} color="#6C63FF" />
              <Text style={styles.detailText}>{course.labInstructor}</Text>
            </View>
          )}
        </View>

        {course.prerequisites.length > 0 && (
          <View style={styles.prerequisites}>
            <Text style={styles.prerequisiteTitle}>Prerequisites:</Text>
            <View style={styles.prerequisiteList}>
              {course.prerequisites.map(prereq => (
                <View key={prereq} style={[
                  styles.prerequisiteTag,
                  { backgroundColor: isPrerequisiteMet ? '#EEF0FB' : '#FEE2E2' }
                ]}>
                  <Text style={[
                    styles.prerequisiteText,
                    { color: isPrerequisiteMet ? '#6C63FF' : '#EF4444' }
                  ]}>{prereq}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({

  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseCardSelected: {
    borderColor: '#22C55E',
    borderWidth: 2,
  },
  courseCardDisabled: {
    opacity: 0.7,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  courseName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  courseDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  prerequisites: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  prerequisiteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  prerequisiteList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  prerequisiteTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  prerequisiteText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
export default StudentCourseCard;