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


const StudentSemesterRegistrationScreen = ({ navigation }) => {
    const [selectedCourses, setSelectedCourses] = useState(new Set());
    const [completedCourses] = useState(new Set(['SE401', 'SE402', 'SE403', 'MT401', 'CS401']));
    const registrationData = {
        SE: {
            name: "Software Engineering",
            semesters: {
                5: {
                    semester: "5th Semester",
                    registrationDeadline: "2025-02-15",
                    startDate: "2025-02-01",
                    courses: [
                        {
                            code: "SE501",
                            name: "Software Design Patterns",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. John Smith",
                            maxStudents: 50,
                            prerequisites: ["SE401", "SE402"],
                            schedule: { days: ["Mon", "Wed"], time: "10:00 AM - 11:30 AM", room: "Room 101" }
                        },
                        {
                            code: "SE502",
                            name: "Web Engineering",
                            creditHours: 4,
                            type: "Theory + Lab",
                            instructor: "Dr. Sarah Wilson",
                            labInstructor: "Mr. David Brown",
                            maxStudents: 40,
                            prerequisites: ["SE403"],
                            schedule: { days: ["Tue", "Thu"], time: "2:00 PM - 3:30 PM", room: "Room 202" }
                        },
                        {
                            code: "SE503",
                            name: "Software Quality Assurance",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. Michael Johnson",
                            maxStudents: 45,
                            prerequisites: ["SE403"],
                            schedule: { days: ["Mon", "Wed"], time: "1:00 PM - 2:30 PM", room: "Room 303" }
                        },
                        {
                            code: "SE504",
                            name: "Cloud Computing",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. Emily Davis",
                            maxStudents: 50,
                            prerequisites: ["SE401"],
                            schedule: { days: ["Fri"], time: "10:00 AM - 12:00 PM", room: "Room 404" }
                        },
                        {
                            code: "SE505",
                            name: "Machine Learning",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. Robert Wilson",
                            maxStudents: 45,
                            prerequisites: ["SE402", "MT401"],
                            schedule: { days: ["Wed", "Fri"], time: "3:00 PM - 4:30 PM", room: "Room 505" }
                        }
                    ]
                },
                6: {
                    semester: "6th Semester",
                    registrationDeadline: "2025-02-15",
                    startDate: "2025-02-01",
                    courses: [
                        {
                            code: "SE601",
                            name: "Software Project Management",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. Alice Johnson",
                            maxStudents: 50,
                            prerequisites: [],
                            schedule: { days: ["Mon", "Thu"], time: "9:00 AM - 10:30 AM", room: "Room 606" }
                        }
                    ]
                }
            }
        },
        CS: {
            name: "Computer Science",
            semesters: {
                5: {
                    semester: "5th Semester",
                    registrationDeadline: "2025-02-15",
                    startDate: "2025-02-01",
                    courses: [
                        {
                            code: "CS501",
                            name: "Advanced Algorithms",
                            creditHours: 3,
                            type: "Theory",
                            instructor: "Dr. James Wilson",
                            maxStudents: 45,
                            prerequisites: ["CS401"],
                            schedule: { days: ["Tue", "Thu"], time: "11:00 AM - 12:30 PM", room: "Room 707" }
                        }
                    ]
                }
            }
        }
    };
    const handleCourseSelect = (course) => {
        setSelectedCourses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(course.code)) {
                newSet.delete(course.code);
            } else {
                newSet.add(course.code);
            }
            return newSet;
        });
    };

    const checkPrerequisites = (prerequisites) => {
        return prerequisites.every(prereq => completedCourses.has(prereq));
    };

    const handleSubmitRegistration = () => {
        if (selectedCourses.size === 0) {
            Alert.alert("Error", "Please select at least one course.");
            return;
        }

        // Navigate to confirmation screen and pass registrationData
        navigation.navigate('StudentRegistrationConfirmationScreen', {
            selectedCourses: Array.from(selectedCourses), 
            registrationData,
        });
    };


    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Semester Registration"
                subtitle="Spring 2025"
                showBack
                navigation={navigation}
            />

            <ScrollView style={styles.content}>
                <StudentRegistrationStatusCard
                    status="open"
                    deadline="2025-02-15"
                    startDate="2025-02-01"
                />

                <View style={styles.registrationSummary}>
                    <Text style={styles.summaryTitle}>Registration Summary</Text>
                    <View style={styles.summaryGrid}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{selectedCourses.size}</Text>
                            <Text style={styles.summaryLabel}>Selected Courses</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>
                                {Array.from(selectedCourses).reduce((acc, code) => {
                                    const course = registrationData.SE.semesters[5].courses
                                        .find(c => c.code === code);
                                    return acc + (course ? course.creditHours : 0);
                                }, 0)}
                            </Text>
                            <Text style={styles.summaryLabel}>Credit Hours</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Available Courses</Text>
                {registrationData.SE.semesters[5].courses.map(course => (
                    <StudentCourseCard
                        key={course.code}
                        course={course}
                        onSelect={handleCourseSelect}
                        isSelected={selectedCourses.has(course.code)}
                        isPrerequisiteMet={checkPrerequisites(course.prerequisites)}
                    />
                ))}
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    selectedCourses.size === 0 && styles.submitButtonDisabled
                ]}
                onPress={handleSubmitRegistration}
                disabled={selectedCourses.size === 0}
            >
                <Text style={styles.submitButtonText}>
                    Continue to Registration
                </Text>
            </TouchableOpacity>
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
    statusCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusInfo: {
        marginLeft: 12,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    statusDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    timelineContainer: {
        marginTop: 8,
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timelinePoint: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    timelineLine: {
        flex: 1,
        height: 2,
        marginHorizontal: 4,
    },
    timelineDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timelineDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    registrationSummary: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    courseCard: {
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
    courseCardSelected: {
        borderColor: '#22C55E',
        borderWidth: 2,
    },
    courseCardDisabled: {
        opacity: 0.7,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    courseInfo: {
        flex: 1,
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
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
    },
    prerequisites: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
    },
    prerequisiteTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    prerequisiteList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    prerequisiteTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    prerequisiteText: {
        fontSize: 12,
        fontWeight: '600',
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
});
export default StudentSemesterRegistrationScreen;
