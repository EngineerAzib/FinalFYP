import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { dummyTeacherData } from '../Components/dummyTeacherData';
import styles from '../AdminPortal_Css';
import useTeacherById from '../Services/Teacher/useTeacherById';




export const TeacherViewScreen = ({ route, navigation }) => {
  const { teacherId } = route.params; 

  console.log(teacherId,"teacherId1")
  const { teacherData, loading, error } = useTeacherById(teacherId)|| {};
  
      const teacher = teacherData?.teacherData; // Extract the nested "teacherData"

  // const teacherData = route?.params?.teacherData || dummyTeacherData;
console.log(teacherData,"Tec")
  // Add toggle states for each card
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(true);
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(true);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(true);
  // ✅ Handle Missing `teacherData`
  if (loading) {
    return (
      <View style={styles.TeacherViewScreencontainer}>
        <Text style={{ textAlign: "center" }}>⏳ Loading Teacher Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.TeacherViewScreencontainer}>
        <Text style={{ color: "red", textAlign: "center" }}>❌ Error fetching teacher data</Text>
      </View>
    );
  }

  if (!teacherData) {
    return (
      <View style={styles.TeacherViewScreencontainer}>
        <Text style={{ color: "red", textAlign: "center" }}>❌ No Data Available for this Teacher</Text>
      </View>
    );
  }

  const renderValue = (value) => (value ? value : "N/A");

  const renderWeeklySchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return days.map(day => (
      <View key={day} style={styles.TeacherViewScreenscheduleDay}>
        <Text style={styles.TeacherViewScreendayText}>{day}</Text>
        {teacherData.schedule[day.toLowerCase()]?.map((slot, index) => (
          <View key={index} style={styles.TeacherViewScreenscheduleSlot}>
            <Text style={styles.TeacherViewScreenslotTime}>{slot.time}</Text>
            <Text style={styles.TeacherViewScreenslotDept}>{slot.department}</Text>
            <Text style={styles.TeacherViewScreenslotSection}>Section {slot.section}</Text>
          </View>
        ))}
      </View>
    ));
  };

  const calculateAttendancePercentage = (taken, total) => {
    return ((taken / total) * 100).toFixed(2);
  };

  // Add a reusable card header component with toggle
  const CardHeader = ({ title, isExpanded, setIsExpanded, onEdit }) => (
    <View style={styles.TeacherViewScreencardHeader}>
      <TouchableOpacity
        style={styles.TeacherViewScreencardTitleContainer}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.TeacherViewScreencardTitle}>{title}</Text>
        <MaterialIcons
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#6C63FF"
        />
      </TouchableOpacity>
      <MaterialIcons
        name="edit"
        size={24}
        color="#6C63FF"
        onPress={onEdit}
      />
    </View>
  );
  const handleAddSchedule = () => {
    navigation.navigate('AddTeacherSchedule', { 
      teacherId: teacherId,
      teacherName: teacher?.name // Optional: pass teacher name for display
    });
  };
  const handleAddAttendance = () => {
    navigation.navigate('AddTeacherAttendance', { 
      teacherId: teacherId,
      teacherName: teacher?.name // Optional: pass teacher name for display
    });
  };
  return (
    <View style={styles.TeacherViewScreencontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Teacher Profile"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView style={styles.TeacherViewScreenscrollView}>
        {/* Basic Info Card - Always expanded */}
        <View style={styles.TeacherViewScreencard}>
          <View style={styles.TeacherViewScreencardHeader}>
            <Text style={styles.TeacherViewScreencardTitle}>Basic Information</Text>
            <MaterialIcons
              name="edit"
              size={24}
              color="#6C63FF"
              onPress={() => navigation.navigate('EditTeacherBasicInfo', { teacherData })}
            />
          </View>

          <View style={styles.TeacherViewScreenbasicInfoContent}>
            <View style={styles.TeacherViewScreenprofileImageContainer}>
              {/* <Image
                source={{ uri: teacherData.profilePhoto }}
                style={styles.TeacherViewScreenprofileImage}
              /> */}
            </View>

            <View style={styles.TeacherViewScreeninfoGrid}>
              <View style={styles.TeacherViewScreeninfoItem}>
                <Ionicons name="person" size={20} color="#6B7280" />
                <View>
                  <Text style={styles.TeacherViewScreeninfoLabel}>Name</Text>
                  <Text style={styles.TeacherViewScreeninfoValue}>{teacher?.name}</Text>
                </View>
              </View>

              <View style={styles.TeacherViewScreeninfoItem}>
                <MaterialIcons name="badge" size={20} color="#6B7280" />
                <View>
                  <Text style={styles.TeacherViewScreeninfoLabel}>Registration No.</Text>
                  <Text style={styles.TeacherViewScreeninfoValue}>{teacher?.registrationNo}</Text>
                </View>
              </View>

              <View style={styles.TeacherViewScreeninfoItem}>
                <FontAwesome5 name="user-tie" size={20} color="#6B7280" />
                <View>
                  <Text style={styles.TeacherViewScreeninfoLabel}>Designation</Text>
                  <Text style={styles.TeacherViewScreeninfoValue}>{teacher?.designation}</Text>
                </View>
              </View>

              <View style={styles.TeacherViewScreeninfoItem}>
                <MaterialIcons name="work" size={20} color="#6B7280" />
                <View>
                  <Text style={styles.TeacherViewScreeninfoLabel}>Status</Text>
                  <Text style={styles.TeacherViewScreeninfoValue}>{teacher?.status}</Text>
                </View>
              </View>

              <View style={styles.TeacherViewScreeninfoItem}>
                <Ionicons name="male-female" size={20} color="#6B7280" />
                <View>
                  <Text style={styles.TeacherViewScreeninfoLabel}>Gender</Text>
                  <Text style={styles.TeacherViewScreeninfoValue}>{teacher?.gender}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Teaching Schedule Card - Collapsible */}
        <View style={styles.TeacherViewScreencard}>
          <CardHeader
            title="Teaching Schedule"
            isExpanded={isScheduleExpanded}
            setIsExpanded={setIsScheduleExpanded}
            onEdit={() => navigation.navigate('EditTeacherSchedule', { teacherData })}
          />

          {isScheduleExpanded && (
            <View style={styles.TeacherViewScreenscheduleContainer}>
              {renderWeeklySchedule()}
            </View>
          )}
        </View>

        <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddSchedule}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
        {/* Attendance Card - Collapsible */}
<View style={styles.TeacherViewScreencard}>
  <CardHeader
    title="Classes Attendance"
    isExpanded={isAttendanceExpanded}
    setIsExpanded={setIsAttendanceExpanded}
    onEdit={() => navigation.navigate('EditTeacherAttendance', { teacherData })}
  />

  {isAttendanceExpanded && (
    <View style={styles.TeacherViewScreenattendanceContainer}>
      {(teacherData.coursesAttendance || []).map((course, index) => (
        <View key={index} style={styles.TeacherViewScreenattendanceItem}>
          <View style={styles.TeacherViewScreencourseHeader}>
            <Text style={styles.TeacherViewScreencourseCode}>{course.code}</Text>
            <Text style={styles.TeacherViewScreencourseName}>{course.name}</Text>
          </View>

          <View style={styles.TeacherViewScreenattendanceStats}>
            <View style={styles.TeacherViewScreenattendanceDetail}>
              <Text style={styles.TeacherViewScreenstatLabel}>Total Classes</Text>
              <Text style={styles.TeacherViewScreenstatValue}>{course.totalClasses}</Text>
            </View>

            <View style={styles.TeacherViewScreenattendanceDetail}>
              <Text style={styles.TeacherViewScreenstatLabel}>Classes Taken</Text>
              <Text style={styles.TeacherViewScreenstatValue}>{course.classesTaken}</Text>
            </View>

            <View style={styles.TeacherViewScreenattendanceDetail}>
              <Text style={styles.TeacherViewScreenstatLabel}>Percentage</Text>
              <Text style={[
                styles.TeacherViewScreenstatValue,
                { color: parseFloat(calculateAttendancePercentage(course.classesTaken, course.totalClasses)) < 75 ? '#DC2626' : '#059669' }
              ]}>
                {calculateAttendancePercentage(course.classesTaken, course.totalClasses)}%
              </Text>
            </View>
          </View>

          <View style={styles.TeacherViewScreendeptSection}>
            <Text style={styles.TeacherViewScreendeptText}>{course.department}</Text>
            <Text style={styles.TeacherViewScreensectionText}>Section {course.section}</Text>
          </View>
        </View>
        
      ))}
    </View>
  )}
</View>

 <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddAttendance}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Class Attendance</Text>
      </TouchableOpacity>
        {/* Feedback Card - Collapsible */}
       
<View style={styles.TeacherViewScreencard}>
  <CardHeader
    title="Student Feedback"
    isExpanded={isFeedbackExpanded}
    setIsExpanded={setIsFeedbackExpanded}
    onEdit={() => navigation.navigate('EditTeacherFeedback', { teacherData })}
  />

  {isFeedbackExpanded && (
    <View style={styles.TeacherViewScreenfeedbackContainer}>
      {(teacherData.feedbacks || []).map((item, index) => (
        <View key={index} style={styles.TeacherViewScreenfeedbackItem}>
          <View style={styles.TeacherViewScreenfeedbackHeader}>
            <Text style={styles.TeacherViewScreenfeedbackCourse}>{item.course?.code}: {item.course?.name}</Text>
            <View style={styles.TeacherViewScreenratingContainer}>
              <MaterialIcons name="star" size={20} color="#FCD34D" />
              <Text style={styles.TeacherViewScreenratingText}>{item.rating.toFixed(1)}/5.0</Text>
            </View>
          </View>

          <View style={styles.TeacherViewScreenfeedbackDeptSection}>
            <Text style={styles.TeacherViewScreendeptText}>{item.department}</Text>
            <Text style={styles.TeacherViewScreensectionText}>Section {item.section}</Text>
          </View>

          <View style={styles.TeacherViewScreenfeedbackStats}>
            <View style={styles.TeacherViewScreenfeedbackStat}>
              <Text style={styles.TeacherViewScreenstatLabel}>Teaching</Text>
              <Text style={styles.TeacherViewScreenstatValue}>{item.teachingRating}/5</Text>
            </View>
            <View style={styles.TeacherViewScreenfeedbackStat}>
              <Text style={styles.TeacherViewScreenstatLabel}>Knowledge</Text>
              <Text style={styles.TeacherViewScreenstatValue}>{item.knowledgeRating}/5</Text>
            </View>
            <View style={styles.TeacherViewScreenfeedbackStat}>
              <Text style={styles.TeacherViewScreenstatLabel}>Communication</Text>
              <Text style={styles.TeacherViewScreenstatValue}>{item.communicationRating}/5</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )}
</View>

      </ScrollView>
    </View>
  );
};
