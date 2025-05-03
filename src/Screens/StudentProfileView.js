import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import StudentById from '../Services/StudentService/StudentById';
import styles from '../AdminPortal_Css';

export const StudentProfileView = ({ route, navigation }) => {
  const { student } = route.params;
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAcademicExpanded, setIsAcademicExpanded] = useState(true);
  const [isAttendanceExpanded, setIsAttendanceExpanded] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await StudentById(student.id);
      setStudentData(data);
      console.log("Full API response:", JSON.stringify(data, null, 2)); 
    } catch (err) {
      setError(err.message || 'Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [student.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  // Navigation handlers
  const handleEditBasicInfo = () => {
    navigation.navigate('EditStudentBasicInfo', { studentData: studentData.basicInfo });
  };

  const handleAddSemester = () => {
    navigation.navigate('AddSemester', { 
      studentId: student.id,
      currentSemester: studentData.basicInfo.semester 
    });
  };

  const handleEditAcademicRecord = () => {
    navigation.navigate('EditAcademicRecord', { 
      studentId: student.id,
      academics: studentData.academics 
    });
  };

  const handleAddAttendance = () => {
    navigation.navigate('AddAttendance', { 
      studentId: student.id,
      semester: studentData.basicInfo.semester 
    });
  };

  const handleEditAttendance = () => {
    navigation.navigate('EditAttendance', { 
      studentId: student.id,
      attendance: studentData.attendance 
    });
  };

  // Utility functions
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

  // Academic Section Component
  const AcademicRecordContent = ({ academics }) => {
    console.log("Academic data received:", JSON.stringify(academics, null, 2));
    const [expandedSemesters, setExpandedSemesters] = useState(new Set());

    const toggleSemester = (semesterName) => {
        setExpandedSemesters(prev => {
            const newSet = new Set(prev);
            newSet.has(semesterName) ? newSet.delete(semesterName) : newSet.add(semesterName);
            return newSet;
        });
    };

    if (!academics?.semesterGPAs?.length) {
        return (
            <View style={styles.StudentProfileViewcardContent}>
                <Text style={styles.StudentProfileViewnoDataText}>No academic data available.</Text>
                <TouchableOpacity 
                    style={styles.StudentProfileViewbutton}
                    onPress={handleAddSemester}
                >
                    <MaterialIcons name="add" size={20} color="white" />
                    <Text style={styles.StudentProfileViewbuttonText}>Add Semester</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

            {academics.semesterGPAs.map((semester) => (
                <View key={semester.semester} style={styles.StudentProfileViewsemesterContainer}>
                    <TouchableOpacity
                        style={styles.StudentProfileViewsemesterHeader}
                        onPress={() => toggleSemester(semester.semester)}
                    >
                        <View style={styles.StudentProfileViewsemesterTitleContainer}>
                            <Text style={styles.StudentProfileViewsemesterTitle}>{semester.semester}</Text>
                            <MaterialIcons
                                name={expandedSemesters.has(semester.semester) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
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

                    {expandedSemesters.has(semester.semester) && (
                        <View style={styles.StudentProfileViewcoursesContainer}>
                            {semester.courses?.map((course, courseIndex) => (
                                <View key={`${semester.semester}-course-${courseIndex}`} style={styles.StudentProfileViewcourseItem}>
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

            <TouchableOpacity 
                style={[styles.StudentProfileViewbutton, {marginTop: 20}]}
                onPress={handleAddSemester}
            >
                <MaterialIcons name="add" size={20} color="white" />
                <Text style={styles.StudentProfileViewbuttonText}>Add New Semester</Text>
            </TouchableOpacity>
        </View>
    );
};

  // Attendance Section Component
  const AttendanceContent = ({ attendance }) => {
    if (!attendance?.currentSemester?.courses?.length) {
      return (
        <View style={styles.StudentProfileViewcardContent}>
          <Text style={styles.StudentProfileViewnoDataText}>No attendance data available.</Text>
          <TouchableOpacity 
            style={styles.StudentProfileViewbutton}
            onPress={handleAddAttendance}
          >
            <MaterialIcons name="add" size={20} color="white" />
            <Text style={styles.StudentProfileViewbuttonText}>Add Attendance</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.StudentProfileViewcardContent}>
        {attendance.currentSemester.courses.map((course, index) => (
          <View key={`attendance-${index}`} style={styles.StudentProfileViewattendanceItem}>
            <View style={styles.StudentProfileViewattendanceHeader}>
              <View>
                <Text style={styles.StudentProfileViewcourseCode}>{course.code}</Text>
                <Text style={styles.StudentProfileViewcourseName}>{course.name}</Text>
              </View>
              <View style={[styles.StudentProfileViewattendancePercentage, {
                backgroundColor: `${getAttendanceColor(course.percentage)}20`
              }]}>
                <Text style={[styles.StudentProfileViewpercentageText, {
                  color: getAttendanceColor(course.percentage)
                }]}>
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
    );
  };

  // Card Header Component
  const CardHeader = ({ title, icon, isExpanded, setIsExpanded, hasData, onEdit, onAdd }) => (
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
      <TouchableOpacity onPress={hasData ? onEdit : onAdd}>
        <MaterialIcons 
          name={hasData ? "edit" : "add"} 
          size={24} 
          color="#6C63FF" 
        />
      </TouchableOpacity>
    </View>
  );

  // Loading and Error States
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchData}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!studentData) {
    return null;
  }

  const hasAcademicData = studentData.academics?.semesterGPAs?.length > 0;
  const hasAttendanceData = studentData.attendance?.currentSemester?.courses?.length > 0;

  return (
    <View style={styles.StudentProfileViewcontainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Student Details"
        showSearch={false}
        showRefresh={true}
        navigation={navigation}
        onRefresh={fetchData}
      />

      <ScrollView style={styles.StudentProfileViewscrollView}>
        {/* Basic Info Card */}
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
                  source={{ uri: studentData.basicInfo?.profilePhoto || 'https://via.placeholder.com/150' }}
                  style={styles.StudentProfileViewprofileImage}
                />
              </View>
              <Text style={styles.StudentProfileViewstudentName}>
                {studentData.basicInfo?.fullName || 'No name available'}
              </Text>
            </View>
            <View style={styles.StudentProfileViewinfoRow}>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Enrollment No.</Text>
                <Text style={styles.StudentProfileViewinfoValue}>
                  {studentData.basicInfo?.endrollementNo || 'N/A'}
                </Text>
              </View>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Roll No.</Text>
                <Text style={styles.StudentProfileViewinfoValue}>
                  {studentData.basicInfo?.rollNo || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.StudentProfileViewinfoRow}>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Department</Text>
                <Text style={styles.StudentProfileViewinfoValue}>
                  {studentData.basicInfo?.department || 'N/A'}
                </Text>
              </View>
              <View style={styles.StudentProfileViewinfoItem}>
                <Text style={styles.StudentProfileViewinfoLabel}>Semester</Text>
                <Text style={styles.StudentProfileViewinfoValue}>
                  {studentData.basicInfo?.semester || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Academic Record Card */}
        <View style={styles.StudentProfileViewcard}>
          <CardHeader
            title="Academic Record"
            icon="school"
            isExpanded={isAcademicExpanded}
            setIsExpanded={setIsAcademicExpanded}
            hasData={hasAcademicData}
            onEdit={handleEditAcademicRecord}
            onAdd={handleAddSemester}
          />
          {isAcademicExpanded && <AcademicRecordContent academics={studentData.academics} />}
        </View>

        {/* Attendance Card */}
        <View style={styles.StudentProfileViewcard}>
          <CardHeader
            title="Current Semester Attendance"
            icon="date-range"
            isExpanded={isAttendanceExpanded}
            setIsExpanded={setIsAttendanceExpanded}
            hasData={hasAttendanceData}
            onEdit={handleEditAttendance}
            onAdd={handleAddAttendance}
          />
          {isAttendanceExpanded && <AttendanceContent attendance={studentData.attendance} />}
        </View>
      </ScrollView>
    </View>
  );
};