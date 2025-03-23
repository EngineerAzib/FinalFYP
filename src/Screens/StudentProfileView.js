import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import styles from '../AdminPortal_Css';
import StudentById from '../Services/StudentService/StudentById';
import AcedmicDetail from '../Services/AcedmicDetail/AcedmicDetail';

export const StudentProfileView = ({ route, navigation }) => {
  const { student } = route.params;
  const { academics, error: academicError } = AcedmicDetail(student.id) || {};
  const { studentByID, error: studentError } = StudentById(student.id) || {};
  
  const [isAcademicExpanded, setIsAcademicExpanded] = useState(true);
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(true);

  if (!studentByID || !academics) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text>Loading Student Details...</Text>
      </View>
    );
  }

  const AcademicRecordContent = ({ academics }) => {
    const [expandedSemesters, setExpandedSemesters] = useState(new Set());

    const toggleSemester = (index) => {
      setExpandedSemesters(prev => {
        const newSet = new Set(prev);
        newSet.has(index) ? newSet.delete(index) : newSet.add(index);
        return newSet;
      });
    };

    return (
      <View style={styles.StudentProfileViewcardContent}>
        <View style={styles.StudentProfileViewcgpaContainer}>
          <CircularProgress
            value={academics.currentCGPA || 0}
            size={180}
            strokeWidth={12}
            duration={5000}
            label="CGPA"
            color="#6C63FF"
          />
          <Text style={styles.StudentProfileViewcgpaScale}>out of 4.00</Text>
        </View>

        {academics.semesterGPAs?.map((semester, index) => (
          <View key={index} style={styles.StudentProfileViewsemesterContainer}>
            <TouchableOpacity
              style={styles.StudentProfileViewsemesterHeader}
              onPress={() => toggleSemester(index)}
            >
              <Text style={styles.StudentProfileViewsemesterTitle}>{semester.semester}</Text>
              <MaterialIcons name={expandedSemesters.has(index) ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#6C63FF" />
            </TouchableOpacity>

            {expandedSemesters.has(index) && (
              <View style={styles.StudentProfileViewcoursesContainer}>
                {semester.courses.map((course, idx) => (
                  <View key={idx} style={styles.StudentProfileViewcourseItem}>
                    <Text>{course.code} - {course.name} ({course.creditHours} Credit Hours)</Text>
                    <Text style={{ color: getGradeColor(course.grade) }}>{course.grade}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };
  const studentData = {
    basicInfo: {
      name: "John Doe",
      profilePhoto: "https://example.com/placeholder.jpg", // Add profile photo URL
      enrollmentNo: "2021-SE-01",
      rollNo: "21SW01",
      department: "Software Engineering",
      semester: 4,
      section: "A"
    },
    academics: {
      currentCGPA: 3.75,
      semesterGPAs: [
        {
          semester: 1,
          gpa: 3.80,
          courses: [
            { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
            { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
            { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
          ]
        },
        {
          semester: 2,
          gpa: 3.70,
          courses: [
            { code: "CS102", name: "Object Oriented Programming", creditHours: 3, grade: "A-" },
            { code: "DS101", name: "Data Structures", creditHours: 3, grade: "A" },
            { code: "MT102", name: "Linear Algebra", creditHours: 3, grade: "B+" }
          ]
        },
        {
          semester: 3,
          gpa: 3.75,
          courses: [
            { code: "CS201", name: "Database Systems", creditHours: 3, grade: "A" },
            { code: "SE201", name: "Software Requirements", creditHours: 3, grade: "A-" },
            { code: "CS203", name: "Computer Networks", creditHours: 3, grade: "A-" }
          ]
        }
      ]
    },
    attendance: {
      currentSemester: {
        overallAttendance: 90.5,
        courses: [
          {
            code: "SE301",
            name: "Software Design & Architecture",
            creditHours: 3,
            totalClasses: 44,
            attendedClasses: 40,
            percentage: 90.91, // This field is named "percentage"
          },
          {
            code: "SE301",
            name: "Software Design & Architecture",
            creditHours: 3,
            totalClasses: 44,
            attendedClasses: 40,
            percentage: 90.91, // This field is named "percentage"
          },
          {
            code: "SE301",
            name: "Software Design & Architecture",
            creditHours: 3,
            totalClasses: 44,
            attendedClasses: 40,
            percentage: 90.91, // This field is named "percentage"
          },
        ]
      }
    }
  };

  //Component for Toggle 
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

  const handleEditBasicInfo = () => {
    navigation.navigate('EditStudentBasicInfo', { studentData: studentData.basicInfo });
  };


  const handleEditAcademics = () => {
    navigation.navigate('EditStudentAcademics', { studentData: studentData.academics });
  };

  const handleEditAttendance = () => {
    navigation.navigate('EditStudentAttendance', { 
      studentData: studentData.attendance // Pass the attendance data
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
      <CustomHeader title="Students" currentScreen="Student Details" showSearch={false} showRefresh={true} navigation={navigation} />
      <ScrollView style={styles.StudentProfileViewscrollView}>
        <View style={styles.StudentProfileViewcard}>
          <Text style={styles.StudentProfileViewstudentName}>{studentByID.fullName}</Text>
          <Image source={{ uri: studentByID.profilePhoto }} style={styles.StudentProfileViewprofileImage} />
          <Text>Enrollment No: {studentByID.enrollmentNo}</Text>
          <Text>Roll No: {studentByID.rollNo}</Text>
          <Text>Department: {studentByID.department}</Text>
          <Text>Semester: {studentByID.semester}</Text>
        </View>

        <View style={styles.StudentProfileViewcard}>
          <TouchableOpacity onPress={() => setIsAcademicExpanded(!isAcademicExpanded)}>
            <Text>Academic Record</Text>
            <MaterialIcons name={isAcademicExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#6C63FF" />
          </TouchableOpacity>
          {isAcademicExpanded && <AcademicRecordContent academics={academics} />}
        </View>
      </ScrollView>
    </View>
  );
};
