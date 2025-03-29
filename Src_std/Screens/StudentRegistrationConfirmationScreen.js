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
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import StudentCourseCard from '../Components/StudentCourseCard';
import StudentRegistrationStatusCard from '../Components/StudentRegistrationStatusCard';
import StudentRegistrationSuccessScreen from './StudentRegistrationSuccessScreen';
import StudentSemesterRegistrationScreen from './StudentSemesterRegistrationScreen';
import ConfettiCannon from 'react-native-confetti-cannon';

const StudentRegistrationConfirmationScreen = ({ route, navigation }) => {
  const { selectedCourses, registrationData } = route.params || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const submitProgress = useState(new Animated.Value(0))[0];

  // Get course details from the registration data
  // Debugging logs to check received data
  useEffect(() => {
    console.log("Received selectedCourses:", selectedCourses);
    console.log("Received registrationData:", registrationData);
  }, [selectedCourses, registrationData]);

  // Ensure registrationData exists before filtering
  const selectedCourseDetails = registrationData?.SE?.semesters?.[5]?.courses?.filter(course =>
    selectedCourses?.includes(course.code)
  ) || [];

  console.log("Filtered selectedCourseDetails:", selectedCourseDetails);

  // Calculate total credit hours safely
  const totalCreditHours = selectedCourseDetails.reduce((sum, course) =>
    sum + (course.creditHours || 0), 0
  );

  console.log("Total Credit Hours:", totalCreditHours);


  const handleSubmit = () => {
    setIsSubmitting(true);

    // Animate the progress
    Animated.timing(submitProgress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false
    }).start(() => {
      setShowConfetti(true);
      setTimeout(() => {
        navigation.navigate('StudentRegistrationSuccessScreen', {
          courseCount: selectedCourses.length,
          creditHours: totalCreditHours
        });
      }, 1500);
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <CustomHeader
        title="Confirm Registration"
        subtitle="Review and Submit"
        showBack
        navigation={navigation}
      />

      <ScrollView style={styles.content}>
        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationTitle}>Registration Summary</Text>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <CircularProgress
                value={selectedCourses.length}
                size={60}
                strokeWidth={6}
                duration={5000}
                color="#6C63FF"
              />
              <Text style={styles.summaryLabel}>Courses Selected</Text>
            </View>
            <View style={styles.summaryItem}>
              <CircularProgress
                value={totalCreditHours}
                size={60}
                strokeWidth={6}
                duration={5000}
                color="#22C55E"
              />
              <Text style={styles.summaryLabel}>Credit Hours</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Selected Courses Preview</Text>
        {selectedCourseDetails.map(course => (
          <View key={course.code} style={styles.selectedCourseCard}>
            <View style={styles.courseHeader}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseName}>{course.name}</Text>
              </View>
              <View style={styles.creditBadge}>
                <Text style={styles.creditText}>{course.creditHours} CH</Text>
              </View>
            </View>

            <View style={styles.courseSchedule}>
              <View style={styles.scheduleItem}>
                <FontAwesome5 name="clock" size={16} color="#6C63FF" />
                <Text style={styles.scheduleText}>
                  {course.schedule.days.join(", ")} • {course.schedule.time}
                </Text>
              </View>
              <View style={styles.scheduleItem}>
                <FontAwesome5 name="map-marker-alt" size={16} color="#6C63FF" />
                <Text style={styles.scheduleText}>{course.schedule.room}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.warningCard}>
          <FontAwesome5 name="exclamation-circle" size={20} color="#F59E0B" />
          <Text style={styles.warningText}>
            Please review your course selection carefully. Once submitted, changes will require approval from your academic advisor.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.submitContainer}>
        {isSubmitting && (
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: submitProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]}
          />
        )}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Confirm Registration'}
          </Text>
        </TouchableOpacity>
      </View>

      {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  confirmationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  selectedCourseCard: {
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
  creditBadge: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  creditText: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 14,
  },
  courseSchedule: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleText: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 14,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    color: '#92400E',
    fontSize: 14,
  },
  submitContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
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
});


export default StudentRegistrationConfirmationScreen;