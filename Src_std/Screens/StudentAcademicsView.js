import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';

// GPA Trend Chart Component
const GPATrendChart = ({ semesters }) => {
    const data = {
        labels: semesters.map(sem => `Sem ${sem.semester}`),
        datasets: [{
            data: semesters.map(sem => sem.gpa),
            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`, // Primary color
            strokeWidth: 2
        }]
    };

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>GPA Progression</Text>
                <Text style={styles.chartSubtitle}>Semester-wise Performance</Text>
            </View>
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#6C63FF"
                    },
                    propsForLabels: {
                        fontSize: 12,
                        fontWeight: '600'
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                withDots={true}
                withShadow={true}
                withInnerLines={true}
                withOuterLines={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                horizontalLabelRotation={0}
                verticalLabelRotation={0}
                fromZero={true}
                segments={4}
            />
        </View>
    );
};
const getGradeColor = (grade, background = false) => {
    const gradeColors = {
        A: "#4CAF50",  // Green
        "A-": "#66BB6A",
        B: "#FFEB3B",  // Yellow
        "B-": "#FDD835",
        C: "#FF9800",  // Orange
        "C-": "#FB8C00",
        D: "#F44336",  // Red
        F: "#D32F2F"   // Dark Red
    };

    return background ? (gradeColors[grade] || "#E0E0E0") : "#FFFFFF"; // Default to gray if grade not found
};


// Semester Course List Component
const SemesterCourseList = ({ courses, isCurrentSemester }) => {
    return (
      <View style={styles.courseListContainer}>
        {courses.map((course, index) => (
          <View key={course.code} style={styles.courseItem}>
            <View style={styles.courseDetails}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.creditHours}>{course.creditHours} Credit Hours</Text>
            </View>
            {isCurrentSemester ? (
              <View style={styles.currentEnrollmentBadge}>
                <Text style={styles.currentEnrollmentText}>Currently Enrolled</Text>
              </View>
            ) : (
              <View style={[styles.gradeBadge, { 
                backgroundColor: getGradeColor(course.grade, true),
              }]}>
                <Text style={[styles.gradeText, { 
                  color: getGradeColor(course.grade) 
                }]}>{course.grade}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };
// Semester Card Component with Toggle
const SemesterCard = ({ semester, isCurrentSemester }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);

        Animated.timing(animatedHeight, {
            toValue: newState ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.semesterCard}>
            <TouchableOpacity onPress={toggleExpand} style={styles.semesterHeader}>
                <View style={styles.semesterInfo}>
                    <Text style={styles.semesterTitle}>
                        {isCurrentSemester ? 'Spring 2025 (Current)' : `Semester ${semester.semester}`}
                    </Text>
                    <Text style={styles.courseCount}>{semester.courses.length} Courses</Text>
                </View>
                <View style={styles.headerRight}>
                    {!isCurrentSemester && (
                        <CircularProgress
                            value={semester.gpa}
                            size={60}
                            strokeWidth={6}
                            duration={1000}
                            color="#6C63FF"
                            label="GPA"
                        />
                    )}
                    <MaterialIcons
                        name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color="#6C63FF"
                    />
                </View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.coursesContainer,
                {
                    height: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 500],
                    }),
                    opacity: animatedHeight,
                },
            ]}>
                <SemesterCourseList
                    courses={semester.courses}
                    isCurrentSemester={isCurrentSemester}
                />
            </Animated.View>
        </View>
    );
};


// Main Component
const StudentAcademicsView = () => {
    const [academicData, setAcademicData] = useState({
        currentCGPA: 3.75,
        totalCredits: 45,
        currentSemester: {
            semester: 4,
            courses: [
                { code: "CS401", name: "Advanced Programming", creditHours: 3 },
                { code: "SE401", name: "Software Engineering", creditHours: 3 },
                { code: "CS402", name: "Artificial Intelligence", creditHours: 3 },
                { code: "CS403", name: "Web Technologies", creditHours: 3 }
            ]
        },
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
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 3,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 4,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 5,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 6,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            // Add more past semesters...
        ]
    });
    const AchievementBadge = ({ icon, value, label, color }) => {
        return (
            <View style={[styles.achievementBadge, { backgroundColor: 'white' }]}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                    <FontAwesome5 name={icon} size={24} color="white" />
                </View>
                <Text style={styles.achievementValue}>{value}</Text>
                <Text style={styles.achievementLabel}>{label}</Text>
            </View>
        );
    };
    return (
        <ScrollView style={styles.container}>
            <Header />
            <CustomHeader
                title="Academic Records"
                subtitle="Track your academic journey"
            />

            <View style={styles.content}>
                {/* Achievement Stats */}
                <View style={styles.achievementsContainer}>
                    <AchievementBadge
                        icon="graduation-cap"
                        value={academicData.currentCGPA.toFixed(2)}
                        label="Current CGPA"
                        color="#6C63FF"
                    />
                    <AchievementBadge
                        icon="book"
                        value={academicData.totalCredits}
                        label=" Total Credit Hours"
                        color="#22C55E"
                    />
                    <AchievementBadge
                        icon="award"
                        value={academicData.currentSemester.courses.length}
                        label="Registered Courses"
                        color="#F59E0B"
                    />
                    <AchievementBadge
                        icon="book"
                        value="Spring 2025"
                        label="Active Semester"
                        color="#EC4899"
                    />
                </View>

                {/* CGPA Display */}
                <View style={styles.cgpaContainer}>
                    <CircularProgress
                        value={academicData.currentCGPA}
                        size={180}
                        strokeWidth={12}
                        duration={1500}
                        color="#6C63FF"
                        label="CGPA"
                    />
                    <Text style={styles.cgpaScale}>out of 4.00</Text>
                </View>

                {/* GPA Trend Chart */}
                <GPATrendChart semesters={academicData.semesterGPAs} />

                {/* Current Semester */}
                <SemesterCard
                    semester={academicData.currentSemester}
                    isCurrentSemester={true}
                />

                {/* Past Semesters */}
                {academicData.semesterGPAs.map((semester, index) => (
                    <SemesterCard
                        key={semester.semester}
                        semester={semester}
                        isCurrentSemester={false}
                    />
                ))}
            </View>
        </ScrollView>
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
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    achievementsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    achievementBadge: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 50,
        marginBottom: 8,
    },
    achievementValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    achievementLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    cgpaContainer: {
        alignItems: 'center',
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#EEF0FB',
        borderRadius: 12,
    },
    cgpaScale: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
    },
    semestersContainer: {
        gap: 16,
    },
    semesterCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    semesterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    semesterInfo: {
        flex: 1,
    },
    semesterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    courseCount: {
        fontSize: 14,
        color: '#6B7280',
    },
    coursesContainer: {
        overflow: 'hidden',
    },
    gradeCard: {
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    gradeCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseInfo: {
        flex: 1,
    },
    courseCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    courseName: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    creditHours: {
        fontSize: 12,
        color: '#6B7280',
    },
    gradeContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    gradeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
    },
    chartContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    currentEnrollmentBadge: {
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    currentEnrollmentText: {
        color: '#6C63FF',
        fontSize: 14,
        fontWeight: '600',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    chartHeader: {
        marginBottom: 16,
    },
    chartSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    courseItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    courseListContainer: {
        padding: 16,
    },
    courseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    enrollmentStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#6C63FF',
        marginRight: 6,
    },
    currentEnrollmentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    }
});

export default StudentAcademicsView;