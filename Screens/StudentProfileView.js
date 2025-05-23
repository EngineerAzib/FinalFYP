import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import styles from '../AdminPortal_Css';
import { studentData } from '../Components/studentData';

export const StudentProfileView = ({ route, navigation }) => {
  // Get student data from route params or use default empty structure
  const student = route?.params?.studentData || studentData; 

  const [isAcademicExpanded, setIsAcademicExpanded] = useState(true);
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(true);

  // Check if each component has data
  const hasAcademicData = student.academics && student.academics.semesterGPAs && 
                          student.academics.semesterGPAs.length > 0;
  const hasAttendanceData = student.attendance && student.attendance.currentSemester && 
                            student.attendance.currentSemester.courses && 
                            student.attendance.currentSemester.courses.length > 0;

  const AcademicRecordContent = ({ academics }) => {
    const [expandedSemesters, setExpandedSemesters] = useState(new Set());

    const toggleSemester = (semesterIndex) => {
      setExpandedSemesters(prev => {
        const newSet = new Set(prev);
        if (newSet.has(semesterIndex)) {
          newSet.delete(semesterIndex);
        } else {
          newSet.add(semesterIndex);
        }
        return newSet;
      });
    };

    return (
      <View style={styles.StudentProfileViewcardContent}>
        <View style={styles.StudentProfileViewcgpaContainer}>
          <CircularProgress
            value={academics.currentCGPA}
            size={180}
            strokeWidth={12}
            duration={5000}
            label="CGPA"
            color="#6C63FF"
          />
          <Text style={styles.StudentProfileViewcgpaScale}>out of 4.00</Text>
        </View>

        {academics.semesterGPAs.map((semester, index) => (
          <View key={index} style={styles.StudentProfileViewsemesterContainer}>
            <TouchableOpacity
              style={styles.StudentProfileViewsemesterHeader}
              onPress={() => toggleSemester(index)}
            >
              <View style={styles.StudentProfileViewsemesterTitleContainer}>
                <Text style={styles.StudentProfileViewsemesterTitle}>Semester {semester.semester}</Text>
                <MaterialIcons
                  name={expandedSemesters.has(index) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#6C63FF"
                />
              </View>
              <CircularProgress
                value={semester.gpa}
                size={80}
                strokeWidth={8}
                duration={5000}
                color="#6C63FF"
              />
            </TouchableOpacity>

            {expandedSemesters.has(index) && (
              <View style={styles.StudentProfileViewcoursesContainer}>
                {semester.courses.map((course, courseIndex) => (
                  <View key={courseIndex} style={styles.StudentProfileViewcourseItem}>
                    <View style={styles.StudentProfileViewcourseInfo}>
                      <Text style={styles.StudentProfileViewcourseCode}>{course.code}</Text>
                      <Text style={styles.StudentProfileViewcourseName}>{course.name}</Text>
                      <Text style={styles.StudentProfileViewcreditHours}>{course.creditHours} Credit Hours</Text>
                    </View>
                    <View style={[styles.StudentProfileViewgradeContainer, {
                      backgroundColor: `${getGradeColor(course.grade)}20`
                    }]}>
                      <Text style={[styles.StudentProfileViewgradeText, {
                        color: getGradeColor(course.grade)
                      }]}>
                        {course.grade}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Reusable card header component with toggle - made consistent with TeacherViewScreen
  const CardHeader = ({ title, icon, isExpanded, setIsExpanded, onEdit }) => (
    <View style={styles.StudentProfileViewcardHeader}>
      <TouchableOpacity
        style={styles.StudentProfileViewcardTitleContainer}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <MaterialIcons name={icon} size={24} color="#6C63FF" />
        <Text style={styles.StudentProfileViewcardTitle}>{title}</Text>
        <MaterialIcons
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#6C63FF"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <MaterialIcons name="edit" size={24} color="#6C63FF" />
      </TouchableOpacity>
    </View>
  );

  // Placeholder component for missing data sections - made consistent with TeacherViewScreen
  const PlaceholderSection = ({ title, navigateTo }) => (
    <TouchableOpacity 
      style={styles.placeholderContainer}
      onPress={() => navigation.navigate(navigateTo, { studentData: student })}
    >
      <MaterialIcons name="add-circle-outline" size={36} color="#6C63FF" />
      <Text style={styles.placeholderText}>Add {title}</Text>
      <Text style={styles.placeholderSubText}>
        Click here to create {title.toLowerCase()} for {student.basicInfo.name}
      </Text>
    </TouchableOpacity>
  );

  const handleEditBasicInfo = () => {
    navigation.navigate('EditStudentBasicInfo', { studentData: student.basicInfo });
  };

  const handleEditAcademics = () => {
    navigation.navigate('EditStudentAcademics', { studentData: student.academics || {} });
  };

  const handleEditAttendance = () => {
    navigation.navigate('EditStudentAttendance', { 
      studentData: student.attendance || {} // Pass the attendance data or empty object
    });
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#10B981';
    if (percentage >= 75) return '#6366F1';
    return '#EF4444';
  };

  const getGradeColor = (grade) => {
    switch (grade[0]) {
      case 'A': return '#10B981';
      case 'B': return '#6366F1';
      case 'C': return '#F59E0B';
      default: return '#EF4444';
    }
  };

  return (
    <View style={styles.StudentProfileViewcontainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Student Details"
        showSearch={false}
        showRefresh={true}
        navigation={navigation}
      />
      <ScrollView style={styles.StudentProfileViewscrollView}>
        {/* Basic Info card - Always expanded */}
        <View style={styles.StudentProfileViewcard}>
          <View style={styles.StudentProfileViewcardHeader}>
            <View style={styles.StudentProfileViewcardTitleContainer}>
              <MaterialIcons name="person" size={24} color="#6C63FF" />
              <Text style={styles.StudentProfileViewcardTitle}>Basic Information</Text>
            </View>
            <TouchableOpacity onPress={handleEditBasicInfo}>
              <MaterialIcons name="edit" size={24} color="#6C63FF" />
            </TouchableOpacity>
          </View>
          <View style={styles.StudentProfileViewcardContent}>
            <View style={styles.StudentProfileViewbasicInfoContent}>
              <View style={styles.StudentProfileViewprofileImageContainer}>
                <Image
                  source={{ uri: student.basicInfo.profilePhoto }}
                  style={styles.StudentProfileViewprofileImage}
                />
              </View>
              <Text style={styles.StudentProfileViewstudentName}>{student.basicInfo.name}</Text>
            </View>
            <View style={styles.StudentProfileViewinfoRow}>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Enrollment No.</Text>
                <Text style={styles.StudentProfileViewinfoValue}>{student.basicInfo.enrollmentNo}</Text>
              </View>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Roll No.</Text>
                <Text style={styles.StudentProfileViewinfoValue}>{student.basicInfo.rollNo}</Text>
              </View>
            </View>
            <View style={styles.StudentProfileViewinfoRow}>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Department</Text>
                <Text style={styles.StudentProfileViewinfoValue}>{student.basicInfo.department}</Text>
              </View>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Semester</Text>
                <Text style={styles.StudentProfileViewinfoValue}>{student.basicInfo.semester}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Academic Record Card - Either show data or placeholder */}
        <View style={styles.StudentProfileViewcard}>
          {hasAcademicData ? (
            <>
              <CardHeader
                title="Academic Record"
                icon="school"
                isExpanded={isAcademicExpanded}
                setIsExpanded={setIsAcademicExpanded}
                onEdit={handleEditAcademics}
              />
              {isAcademicExpanded && <AcademicRecordContent academics={student.academics} />}
            </>
          ) : (
            <PlaceholderSection 
              title="Academic Record" 
              navigateTo="CreateAcademicRecordScreen"
            />
          )}
        </View>

        {/* Attendance Card - Either show data or placeholder */}
        <View style={styles.StudentProfileViewcard}>
          {hasAttendanceData ? (
            <>
              <CardHeader
                title="Current Semester Attendance"
                icon="date-range"
                isExpanded={isAttendanceExpanded}
                setIsExpanded={setIsAttendanceExpanded}
                onEdit={handleEditAttendance}
              />
              {isAttendanceExpanded && (
                <View style={styles.StudentProfileViewcardContent}>
                  {student.attendance.currentSemester.courses.map((course, index) => (
                    <View key={index} style={styles.StudentProfileViewattendanceItem}>
                      <View style={styles.StudentProfileViewattendanceHeader}>
                        <View>
                          <Text style={styles.StudentProfileViewcourseCode}>{course.code}</Text>
                          <Text style={styles.StudentProfileViewcourseName}>{course.name}</Text>
                        </View>
                        <View style={[styles.StudentProfileViewattendancePercentage,
                        { backgroundColor: `${getAttendanceColor(course.percentage)}20` }]}>
                          <Text style={[styles.StudentProfileViewpercentageText,
                          { color: getAttendanceColor(course.percentage) }]}>
                            {course.percentage.toFixed(2)}%
                          </Text>
                        </View>
                      </View>
                      <View style={styles.StudentProfileViewattendanceDetails}>
                        <Text style={styles.StudentProfileViewattendanceText}>
                          Classes Attended: {course.attendedClasses} / {course.totalClasses}
                        </Text>
                        <Text style={styles.StudentProfileViewcreditHours}>{course.creditHours} Credit Hours</Text>
                      </View>
                      <View style={styles.StudentProfileViewprogressBar}>
                        <View style={[styles.StudentProfileViewprogressFill, {
                          width: `${course.percentage}%`,
                          backgroundColor: getAttendanceColor(course.percentage)
                        }]} />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : (
            <PlaceholderSection 
              title="Current Semester Attendance" 
              navigateTo="CreateSemesterAttendanceScreen"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};