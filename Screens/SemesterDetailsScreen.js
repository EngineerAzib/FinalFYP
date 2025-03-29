import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterDetailsScreen = ({ navigation, route }) => {
  const { deptCode, deptName, semesterNumber, semesterData } = route.params || {};

  const handleEditRegistration = () => {
    navigation.navigate('EditSemesterRegistration', {
      deptCode,
      semesterNumber,
      semesterData
    });
  };


  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registeration"
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
            <Text style={styles.EditSemesterRegistrationinfoText}>{semesterData.semester}</Text>
          </View>
        </View>
        <View style={styles.SemesterRegistrationViewcard}>
          <View style={styles.SemesterRegistrationViewcardHeader}>
            <View style={styles.SemesterRegistrationViewtitleToggleContainer}>
              <MaterialIcons name="event-note" size={24} color="#6C63FF" />
              <View style={styles.SemesterRegistrationViewsemesterInfoContainer}>
                <Text style={styles.SemesterRegistrationViewcardTitle}>
                  {semesterData.semester}
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
            {semesterData.courses.map((course, index) => (
              <View key={index} style={styles.SemesterRegistrationViewcourseContainer}>
                <View style={styles.SemesterRegistrationViewcourseHeader}>
                  <View style={styles.SemesterRegistrationViewcourseCodeContainer}>
                    <Text style={styles.SemesterRegistrationViewcourseCode}>{course.code}</Text>
                    <View style={[
                      styles.SemesterRegistrationViewcourseTypeTag,
                      { backgroundColor: course?.type?.includes('Lab') ? '#EEF0FB' : '#F0FDF4' }
                    ]}>
                      <Text style={[
                        styles.SemesterRegistrationViewcourseTypeText,
                        { color: course?.type?.includes('Lab') ? '#6C63FF' : '#10B981' }
                      ]}>
                        {course.type}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.SemesterRegistrationViewcreditHoursContainer}>
                    <MaterialIcons name="access-time" size={16} color="#6B7280" />
                    <Text style={styles.SemesterRegistrationViewcreditHoursText}>
                      {course.creditHours} Credit Hours
                    </Text>
                  </View>
                </View>
                <Text style={styles.SemesterRegistrationViewcourseName}>{course.name}</Text>
                <View style={styles.SemesterRegistrationViewinstructorContainer}>
                  <MaterialIcons name="person" size={16} color="#6B7280" />
                  <Text style={styles.SemesterRegistrationViewinstructorText}>
                    {course.instructor}
                  </Text>
                </View>
                {course.labInstructor && (
                  <View style={styles.SemesterRegistrationViewinstructorContainer}>
                    <MaterialIcons name="person" size={16} color="#6B7280" />
                    <Text style={styles.SemesterRegistrationViewinstructorText}>
                      Lab Instructor: {course.labInstructor}
                    </Text>
                  </View>
                )}
                {course?.prerequisites?.length > 0 && (
                  <View style={styles.SemesterRegistrationViewprerequisitesContainer}>
                    <Text style={styles.SemesterRegistrationViewprerequisitesLabel}>
                      Prerequisites:
                    </Text>
                    <View style={styles.SemesterRegistrationViewprerequisitesList}>
                      {course?.prerequisites?.map((prereq, pIndex) => (
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
                    Max Students: {course.maxStudents}
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