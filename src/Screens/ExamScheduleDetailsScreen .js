import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const ExamScheduleDetailsScreen = ({ navigation, route }) => {
  const { deptCode, deptName, yearNum, yearName } = route.params;

  const examSchedule = [
    {
      date: "2025-02-01",
      day: "Monday",
      slots: [
        {
          time: "09:00 AM - 12:00 PM",
          course: "Programming Fundamentals",
          courseCode: "CS101",
          venue: "Block A - Room 101"
        },
        {
          time: "02:00 PM - 05:00 PM",
          course: "Calculus",
          courseCode: "MT101",
          venue: "Block B - Room 201"
        }
      ]
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEdit = () => {
    navigation.navigate('EditExamSchedule', {
      deptCode,
      deptName,
      yearNum,
      yearName,
      examSchedule
    });
  };

  return (
    <View style={styles.ExamScheduleViewcontainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="Exam Schedule Details"
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
            <Text style={styles.EditSemesterRegistrationinfoText}>{yearName}</Text>
          </View>
        </View>

        {examSchedule.map((schedule, scheduleIndex) => (
          <View key={scheduleIndex} style={styles.ExamScheduleViewdateSchedule}>
            <View style={styles.ExamScheduleViewdateHeader}>
              <MaterialIcons name="calendar-today" size={20} color="#6C63FF" />
              <Text style={styles.ExamScheduleViewdateText}>
                {formatDate(schedule.date)} - {schedule.day}
              </Text>
              <TouchableOpacity
                style={styles.ExamScheduleVieweditButton}
                onPress={handleEdit}
              >
                <MaterialIcons name="edit" size={24} color="#6C63FF" />
              </TouchableOpacity>
            </View>

            <View style={styles.ExamScheduleViewslotsContainer}>
              {schedule.slots.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.ExamScheduleViewexamSlot}>
                  <View style={styles.ExamScheduleViewtimeColumn}>
                    <Text style={styles.ExamScheduleViewtimeText}>
                      {slot.time.split('-')[0].trim()}
                    </Text>
                    <View style={styles.ExamScheduleViewtimelineDot} />
                    {slotIndex !== schedule.slots.length - 1 && (
                      <View style={styles.ExamScheduleViewtimelineLine} />
                    )}
                  </View>

                  <View style={styles.ExamScheduleViewexamDetails}>
                    <Text style={styles.ExamScheduleViewcourseCode}>
                      {slot.courseCode}
                    </Text>
                    <Text style={styles.ExamScheduleViewcourseName}>
                      {slot.course}
                    </Text>
                    <View style={styles.ExamScheduleViewvenueRow}>
                      <MaterialIcons name="room" size={16} color="#6B7280" />
                      <Text style={styles.ExamScheduleViewvenueText}>
                        {slot.venue}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};