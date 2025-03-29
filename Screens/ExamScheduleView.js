import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const ExamScheduleView = ({ navigation }) => {
  const [expandedDepartments, setExpandedDepartments] = useState(new Set(['SE']));
  const [expandedYears, setExpandedYears] = useState(new Set());

  const departmentSchedules = {
    SE: {
      name: "Software Engineering",
      years: {
        1: {
          year: "First Year",
          examSchedule: [
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
          ]
        },
        2: {
          year: "Second Year",
          examSchedule: [
            {
              date: "2025-02-02",
              day: "Tuesday",
              slots: [
                {
                  time: "09:00 AM - 12:00 PM",
                  course: "Data Structures",
                  courseCode: "CS201",
                  venue: "Block A - Room 102"
                }
              ]
            }
          ]
        }
      }
    },
    CS: {
      name: "Computer Science",
      years: {
        1: {
          year: "First Year",
          examSchedule: [
            {
              date: "2025-02-03",
              day: "Wednesday",
              slots: [
                {
                  time: "09:00 AM - 12:00 PM",
                  course: "Introduction to Computing",
                  courseCode: "CS102",
                  venue: "Block C - Room 301"
                }
              ]
            }
          ]
        },
        2: {
          year: "Second Year",
          examSchedule: [
            {
              date: "2025-02-04",
              day: "Thursday",
              slots: [
                {
                  time: "09:00 AM - 12:00 PM",
                  course: "Operating Systems",
                  courseCode: "CS301",
                  venue: "Block D - Room 401"
                }
              ]
            }
          ]
        }
      }
    },
    EE: {
      name: "Electrical Engineering",
      years: {
        1: {
          year: "First Year",
          examSchedule: [
            {
              date: "2025-02-05",
              day: "Friday",
              slots: [
                {
                  time: "09:00 AM - 12:00 PM",
                  course: "Circuit Analysis",
                  courseCode: "EE101",
                  venue: "Block E - Room 501"
                }
              ]
            }
          ]
        },
        2: {
          year: "Second Year",
          examSchedule: [
            {
              date: "2025-02-06",
              day: "Saturday",
              slots: [
                {
                  time: "09:00 AM - 12:00 PM",
                  course: "Digital Logic Design",
                  courseCode: "EE201",
                  venue: "Block F - Room 601"
                }
              ]
            }
          ]
        }
      }
    }
  };

  const toggleYear = (deptCode, year) => {
    const key = `${deptCode}-${year}`;
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.ExamScheduleViewcontainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="View Schedule"
        showSearch={false}
        showRefresh={true}
        navigation={navigation}
      />
      <ScrollView style={styles.ExamScheduleViewscrollView}>
        {Object.entries(departmentSchedules).map(([deptCode, deptData], index) => (
          <View key={deptCode} style={styles.ExamScheduleViewdepartmentWrapper}>
            {index > 0 && (
              <View style={styles.ExamScheduleViewseparator}>
                <View style={styles.ExamScheduleViewseparatorLine} />
              </View>
            )}

            <View style={styles.ExamScheduleViewdepartmentCard}>
              <View style={styles.ExamScheduleViewdepartmentHeader}>
                <View style={styles.ExamScheduleViewdepartmentTitleContainer}>
                  <View style={styles.ExamScheduleViewiconContainer}>
                    <MaterialIcons name="date-range" size={24} color="#F5F6FA" />
                  </View>
                  <Text style={styles.ExamScheduleViewdepartmentTitle}>{deptData.name}</Text>
                </View>
              </View>

              <View style={styles.ExamScheduleViewyearsContainer}>
                {Object.entries(deptData.years).map(([year, yearData]) => (
                  <View key={year} style={styles.ExamScheduleViewyearWrapper}>
                    <View style={[
                      styles.ExamScheduleViewyearCard,
                      expandedYears.has(`${deptCode}-${year}`) && styles.ExamScheduleViewyearCardExpanded
                    ]}>
                      <TouchableOpacity
                        style={styles.ExamScheduleViewyearHeader}
                        onPress={() => toggleYear(deptCode, year)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.ExamScheduleViewyearTitleContainer}>
                          <View style={styles.ExamScheduleViewyearIconContainer}>
                            <MaterialIcons name="event" size={20} color="#F5F6FA" />
                          </View>
                          <Text style={styles.ExamScheduleViewyearTitle}>{yearData.year}</Text>
                        </View>
                        <View style={styles.ExamScheduleViewyearActions}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('EditExamSchedule', {
                              deptCode,
                              year,
                              yearData
                            })}
                            style={styles.ExamScheduleVieweditButton}
                          >
                            <MaterialIcons name="edit" size={20} color="#F5F6FA" />
                          </TouchableOpacity>
                          <MaterialIcons
                            name={expandedYears.has(`${deptCode}-${year}`) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color="#F5F6FA"
                          />
                        </View>
                      </TouchableOpacity>

                      {expandedYears.has(`${deptCode}-${year}`) && (
                        <View style={styles.ExamScheduleViewscheduleContainer}>
                          {yearData.examSchedule.map((schedule, scheduleIndex) => (
                            <View key={scheduleIndex} style={styles.ExamScheduleViewdateSchedule}>
                              <View style={styles.ExamScheduleViewdateHeader}>
                                <MaterialIcons name="calendar-today" size={20} color="#6C63FF" />
                                <Text style={styles.ExamScheduleViewdateText}>
                                  {formatDate(schedule.date)} - {schedule.day}
                                </Text>
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
                                        <MaterialIcons
                                          name="room"
                                          size={16}
                                          color="#6B7280"
                                        />
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
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


