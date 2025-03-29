import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';

// Mock data for current semester exam schedule
const currentSemesterExams = {
    semester: 6,
    department: "SE",
    examType: "Final",
    schedule: [
        {
            date: "2025-02-01",
            day: "Monday",
            slots: [
                {
                    time: "09:00 AM - 12:00 PM",
                    course: "Computer Networks",
                    courseCode: "SE601",
                    venue: "Block A - Room 101",
                    instructor: "Dr. Sarah Wilson",
                    type: "Theory"
                }
            ]
        },
        {
            date: "2025-02-03",
            day: "Wednesday",
            slots: [
                {
                    time: "09:00 AM - 12:00 PM",
                    course: "Software Design Patterns",
                    courseCode: "SE501",
                    venue: "Block B - Room 201",
                    instructor: "Dr. Michael Brown",
                    type: "Theory"
                },
                {
                    time: "02:00 PM - 05:00 PM",
                    course: "Computer Networks Lab",
                    courseCode: "SE601L",
                    venue: "Lab 201",
                    instructor: "Dr. Sarah Wilson",
                    type: "Practical"
                }
            ]
        }
    ]
};

// Exam Countdown Component
const ExamCountdown = ({ nextExam }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const examDate = new Date(nextExam.date + "T" + nextExam.slots[0].time.split(" - ")[0]);
        const now = new Date();
        const difference = examDate - now;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60)
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const scaleAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.05,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }, [timeLeft.minutes]);

    return (
        <Animated.View style={[styles.countdownContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.nextExamTitle}>Next Exam</Text>
            <Text style={styles.nextExamCourse}>{nextExam.slots[0].course}</Text>
            <View style={styles.timeContainer}>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.days}</Text>
                    <Text style={styles.timeLabel}>Days</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.hours}</Text>
                    <Text style={styles.timeLabel}>Hours</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.minutes}</Text>
                    <Text style={styles.timeLabel}>Mins</Text>
                </View>
            </View>
        </Animated.View>
    );
};

// Exam Card Component
const ExamCard = ({ exam, slot, isNextExam }) => {
    const [expanded, setExpanded] = useState(false);
    const rotateAnim = useState(new Animated.Value(0))[0];
    const heightAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.parallel([
            Animated.spring(rotateAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: true
            }),
            Animated.spring(heightAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: false
            })
        ]).start();
    }, [expanded]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <Animated.View style={[
            styles.examCard,
            isNextExam && styles.nextExamCard
        ]}>
            <TouchableOpacity
                style={styles.examCardHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.examBasicInfo}>
                    <View style={styles.courseCodeContainer}>
                        <Text style={styles.courseCode}>{slot.courseCode}</Text>
                        <View style={[
                            styles.typeBadge,
                            { backgroundColor: slot.type === 'Theory' ? '#EEF0FB' : '#DCFCE7' }
                        ]}>
                            <FontAwesome5
                                name={slot.type === 'Theory' ? 'book' : 'flask'}
                                size={12}
                                color={slot.type === 'Theory' ? '#6C63FF' : '#22C55E'}
                            />
                            <Text style={[
                                styles.typeText,
                                { color: slot.type === 'Theory' ? '#6C63FF' : '#22C55E' }
                            ]}>
                                {slot.type}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.courseName}>{slot.course}</Text>
                    <View style={styles.timeVenueContainer}>
                        <View style={styles.infoItem}>
                            <FontAwesome5 name="clock" size={14} color="#6B7280" />
                            <Text style={styles.infoText}>{slot.time}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <FontAwesome5 name="map-marker-alt" size={14} color="#6B7280" />
                            <Text style={styles.infoText}>{slot.venue}</Text>
                        </View>
                    </View>
                </View>

                <Animated.View style={{ transform: [{ rotate }] }}>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="#6B7280"
                    />
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.examDetailsContainer,
                {
                    maxHeight: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200]
                    }),
                    opacity: heightAnim
                }
            ]}>
                <View style={styles.examDetails}>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="calendar-alt" size={14} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {exam.day}, {new Date(exam.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="user-tie" size={14} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {slot.instructor}
                        </Text>
                    </View>
                    <View style={styles.importantNotesContainer}>
                        <Text style={styles.importantNotesTitle}>Important Notes:</Text>
                        <View style={styles.noteItem}>
                            <FontAwesome5 name="info-circle" size={14} color="#6C63FF" />
                            <Text style={styles.noteText}>Please arrive 30 minutes before the exam</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <FontAwesome5 name="id-card" size={14} color="#6C63FF" />
                            <Text style={styles.noteText}>Bring your student ID card</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
};

// Date Header Component
const DateHeader = ({ date, day }) => {
    return (
        <View style={styles.dateHeader}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    {new Date(date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </Text>
                <Text style={styles.dayText}>{day}</Text>
            </View>
            <View style={styles.dateLine} />
        </View>
    );
};

// Main Exam Schedule Screen
const StudentExamScheduleScreen = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const slideAnim = useState(new Animated.Value(0))[0];

    const filterOptions = [
        { id: 'all', label: 'All Exams' },
        { id: 'theory', label: 'Theory' },
        { id: 'practical', label: 'Practical' }
    ];

    const filteredSchedule = currentSemesterExams.schedule.map(day => ({
        ...day,
        slots: day.slots.filter(slot =>
            selectedFilter === 'all' ||
            slot.type.toLowerCase() === selectedFilter
        )
    })).filter(day => day.slots.length > 0);

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Exam Schedule"
                subtitle={`Semester ${currentSemesterExams.semester} - ${currentSemesterExams.examType} Exams`}
                showBack
                navigation={navigation}
            />

            <ExamCountdown nextExam={currentSemesterExams.schedule[0]} />

            <View style={styles.filterContainer}>
                {filterOptions.map((option, index) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.filterButton,
                            selectedFilter === option.id && styles.activeFilterButton
                        ]}
                        onPress={() => setSelectedFilter(option.id)}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedFilter === option.id && styles.activeFilterText
                        ]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.content}>
                {filteredSchedule.map((examDay, dayIndex) => (
                    <View key={examDay.date}>
                        <DateHeader date={examDay.date} day={examDay.day} />
                        {examDay.slots.map((slot, slotIndex) => (
                            <ExamCard
                                key={`${examDay.date}-${slot.courseCode}`}
                                exam={examDay}
                                slot={slot}
                                isNextExam={dayIndex === 0 && slotIndex === 0}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
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
    countdownContainer: {
        backgroundColor: '#6C63FF',
        margin: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    nextExamTitle: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.9,
        marginBottom: 4,
    },
    nextExamCourse: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeBlock: {
        alignItems: 'center',
    },
    timeValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    timeLabel: {
        fontSize: 12,
        color: '#ffffff',
        opacity: 0.9,
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginHorizontal: 8,
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 12,
        padding: 4,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeFilterButton: {
        backgroundColor: '#EEF0FB',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    activeFilterText: {
        color: '#6C63FF',
        fontWeight: '600',
    },
    dateHeader: {
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        marginRight: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    dayText: {
        fontSize: 14,
        color: '#6B7280',
    },
    dateLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    examCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    nextExamCard: {
        borderColor: '#6C63FF',
        borderWidth: 2,
    },
    examCardHeader: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    examBasicInfo: {
        flex: 1,
        marginRight: 12,
    },
    courseCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    courseCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    typeText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    courseName: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    timeVenueContainer: {
        gap: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#6B7280',
    },
    examDetailsContainer: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        overflow: 'hidden',
    },
    examDetails: {
        gap: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#374151',
    },
    importantNotesContainer: {
        marginTop: 8,
        padding: 12,
        backgroundColor: '#EEF0FB',
        borderRadius: 8,
        gap: 8,
    },
    importantNotesTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6C63FF',
        marginBottom: 4,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    noteText: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    }
});

export default StudentExamScheduleScreen;