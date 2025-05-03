import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';
import RegistrationDetail from '../Services/Registration/RegistrationDetail';

export const SemesterDetailsScreen = ({ navigation, route }) => {
  const [semesterDetails, setSemesterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { deptCode, deptName, semesterNumber, semesterName } = route.params;
  
  useEffect(() => {
    const fetchSemesterDetails = async () => {
      try {
        setLoading(true);
        const response = await RegistrationDetail(deptCode, semesterNumber);
        
        // Transform the API response to match our expected structure
        const transformedData = Array.isArray(response) ? response[0] : response;
        
        // Ensure courses is always an array
        const courses = transformedData.courses ? [transformedData.courses] : [];
        
        setSemesterDetails({
          ...transformedData,
          courses
        });
      } catch (err) {
        console.error("Failed to fetch semester details:", err);
        setError("Failed to load semester details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSemesterDetails();
  }, [deptCode, semesterNumber]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEditRegistration = () => {
    if (!semesterDetails) return;
    
    navigation.navigate('EditSemesterRegistration', {
      deptCode,
      deptName,
      semesterNumber,
      semesterName,
      semesterDetails,
    });
  };

  if (loading) {
    return (
      <View style={styles.SemesterRegistrationViewcontainer}>
        <Header />
        <CustomHeader
          title="Semester Registration"
          currentScreen="Reg_ Details"
          showSearch={false}
          showRefresh={false}
          navigation={navigation}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.SemesterRegistrationViewcontainer}>
        <Header />
        <CustomHeader
          title="Semester Registration"
          currentScreen="Reg_ Details"
          showSearch={false}
          showRefresh={false}
          navigation={navigation}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              fetchSemesterDetails();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!semesterDetails || !semesterDetails.courses || semesterDetails.courses.length === 0) {
    return (
      <View style={styles.SemesterRegistrationViewcontainer}>
        <Header />
        <CustomHeader
          title="Semester Registration"
          currentScreen="Reg_ Details"
          showSearch={false}
          showRefresh={false}
          navigation={navigation}
        />
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No course details available for this semester.</Text>
          <TouchableOpacity
            onPress={handleEditRegistration}
            style={styles.addCoursesButton}
          >
            <Text style={styles.addCoursesButtonText}>Add Courses</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registration"
        currentScreen="Reg_ Details"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.EditSemesterRegistrationheaderInfo}>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="domain" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>{deptName || deptCode}</Text>
          </View>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="school" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>{semesterName}</Text>
          </View>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="event" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>
              Registration Deadline: {formatDate(semesterDetails.registrationDeadline)}
            </Text>
          </View>
        </View>
        <View style={styles.SemesterRegistrationViewcard}>
          <View style={styles.SemesterRegistrationViewcardHeader}>
            <View style={styles.SemesterRegistrationViewtitleToggleContainer}>
              <MaterialIcons name="event-note" size={24} color="#6C63FF" />
              <View style={styles.SemesterRegistrationViewsemesterInfoContainer}>
                <Text style={styles.SemesterRegistrationViewcardTitle}>
                  {semesterName}
                </Text>
                <Text style={styles.SemesterRegistrationViewcardSubtitle}>
                  Start Date: {formatDate(semesterDetails.startDate)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleEditRegistration}
              style={styles.SemesterRegistrationVieweditButton}
            >
              <MaterialIcons name="edit" size={24} color="#6C63FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.SemesterRegistrationViewcardContent}>
            {semesterDetails.courses.map((course, index) => (
              <View key={index} style={styles.SemesterRegistrationViewcourseContainer}>
                <View style={styles.SemesterRegistrationViewcourseHeader}>
                  <View style={styles.SemesterRegistrationViewcourseCodeContainer}>
                    <Text style={styles.SemesterRegistrationViewcourseCode}>
                      {course?.code || 'N/A'}
                    </Text>
                    <View
                      style={[
                        styles.SemesterRegistrationViewcourseTypeTag,
                        { backgroundColor: '#F0FDF4' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.SemesterRegistrationViewcourseTypeText,
                          { color: '#10B981' },
                        ]}
                      >
                        {course?.type || 'Theory'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.SemesterRegistrationViewcreditHoursContainer}>
                    <MaterialIcons name="access-time" size={16} color="#6B7280" />
                    <Text style={styles.SemesterRegistrationViewcreditHoursText}>
                      {course?.creditHours || 0} Credit Hours
                    </Text>
                  </View>
                </View>
                <Text style={styles.SemesterRegistrationViewcourseName}>
                  {course?.name || 'Unnamed Course'}
                </Text>
                <View style={styles.SemesterRegistrationViewinstructorContainer}>
                  <MaterialIcons name="person" size={16} color="#6B7280" />
                  <Text style={styles.SemesterRegistrationViewinstructorText}>
                    {course?.instructor || 'Instructor not specified'}
                  </Text>
                </View>
                {course?.prerequisites?.length > 0 && (
                  <View style={styles.SemesterRegistrationViewprerequisitesContainer}>
                    <Text style={styles.SemesterRegistrationViewprerequisitesLabel}>
                      Prerequisites:
                    </Text>
                    <View style={styles.SemesterRegistrationViewprerequisitesList}>
                      {course.prerequisites.map((prereq, pIndex) => (
                        <View key={pIndex} style={styles.SemesterRegistrationViewprerequisiteTag}>
                          <Text style={styles.SemesterRegistrationViewprerequisiteText}>
                            {prereq}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                <View style={styles.SemesterRegistrationViewmaxStudentsContainer}>
                  <MaterialIcons name="group" size={16} color="#6B7280" />
                  <Text style={styles.SemesterRegistrationViewmaxStudentsText}>
                    Max Students: {course?.maxStudents || 0}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};