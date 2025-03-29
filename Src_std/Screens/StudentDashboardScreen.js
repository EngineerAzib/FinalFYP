import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    RefreshControl
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import CircularProgress from '../Components/CircularProgress';

// Quick Actions Component
const QuickActionButton = ({ icon, label, onPress, color }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Animated.View style={[
                styles.quickActionButton,
                { transform: [{ scale: scaleAnim }] }
            ]}>
                <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                    <FontAwesome5 name={icon} size={20} color={color} />
                </View>
                <Text style={styles.quickActionLabel}>{label}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Academic Calendar Component
const AcademicCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    // Mock calendar events
    const markedDates = {
        '2025-02-20': { marked: true, dotColor: '#EF4444', type: 'exam' },
        '2025-02-22': { marked: true, dotColor: '#F59E0B', type: 'assignment' },
        '2025-02-25': { marked: true, dotColor: '#6C63FF', type: 'event' },
        [selectedDate]: { selected: true, selectedColor: '#6C63FF' }
    };

    const events = {
        '2025-02-20': [{ type: 'exam', title: 'Database Systems Mid-Term', time: '09:00 AM' }],
        '2025-02-22': [{ type: 'assignment', title: 'Networks Lab Report Due', time: '11:59 PM' }],
        '2025-02-25': [{ type: 'event', title: 'Career Fair', time: '02:00 PM' }]
    };

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    return (
        <View style={styles.calendarCard}>
            <TouchableOpacity
                style={styles.calendarHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={styles.calendarTitle}>Academic Calendar</Text>
                <MaterialIcons
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#6B7280"
                />
            </TouchableOpacity>

            <Animated.View style={{
                maxHeight: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500]
                }),
                overflow: 'hidden'
            }}>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={day => setSelectedDate(day.dateString)}
                    theme={{
                        todayTextColor: '#6C63FF',
                        selectedDayBackgroundColor: '#6C63FF',
                        dotColor: '#6C63FF',
                        arrowColor: '#6C63FF',
                    }}
                />

                {events[selectedDate] && (
                    <View style={styles.selectedDateEvents}>
                        <Text style={styles.selectedDateTitle}>
                            {moment(selectedDate).format('MMMM D, YYYY')}
                        </Text>
                        {events[selectedDate].map((event, index) => (
                            <View key={index} style={styles.calendarEventItem}>
                                <View style={[
                                    styles.eventDot,
                                    { backgroundColor: getEventColor(event.type) }
                                ]} />
                                <View style={styles.calendarEventInfo}>
                                    <Text style={styles.calendarEventTitle}>{event.title}</Text>
                                    <Text style={styles.calendarEventTime}>{event.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </Animated.View>
        </View>
    );
};
// Academic Performance Overview Component
const PerformanceOverview = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedMetric, setSelectedMetric] = useState('gpa');

    const performanceData = {
        gpa: {
            current: 3.75,
            trend: [3.5, 3.6, 3.7, 3.75],
            label: 'CGPA'
        },
        credits: {
            completed: 85,
            total: 130,
            trend: [65, 72, 78, 85],
            label: 'Credit Hours'
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.performanceCard, { opacity: fadeAnim }]}>
            <View style={styles.performanceHeader}>
                <Text style={styles.performanceTitle}>Academic Performance</Text>
                <View style={styles.metricToggle}>
                    <TouchableOpacity
                        style={[
                            styles.metricButton,
                            selectedMetric === 'gpa' && styles.metricButtonActive
                        ]}
                        onPress={() => setSelectedMetric('gpa')}
                    >
                        <Text style={[
                            styles.metricButtonText,
                            selectedMetric === 'gpa' && styles.metricButtonTextActive
                        ]}>GPA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.metricButton,
                            selectedMetric === 'credits' && styles.metricButtonActive
                        ]}
                        onPress={() => setSelectedMetric('credits')}
                    >
                        <Text style={[
                            styles.metricButtonText,
                            selectedMetric === 'credits' && styles.metricButtonTextActive
                        ]}>Credits</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.performanceContent}>
                <View style={styles.performanceMetrics}>
                    <View style={styles.mainMetric}>
                        <Text style={styles.mainMetricValue}>
                            {selectedMetric === 'gpa'
                                ? performanceData.gpa.current
                                : `${performanceData.credits.completed}/${performanceData.credits.total}`
                            }
                        </Text>
                        <Text style={styles.mainMetricLabel}>
                            {performanceData[selectedMetric].label}
                        </Text>
                    </View>
                    <BarChart
                        data={{
                            labels: ['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                            datasets: [{
                                data: performanceData[selectedMetric].trend
                            }]
                        }}
                        width={200}
                        height={100}
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            decimalPlaces: selectedMetric === 'gpa' ? 2 : 0,
                            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={styles.performanceChart}
                        showValuesOnTopOfBars
                        fromZero
                    />
                </View>
            </View>
        </Animated.View>
    );
};
// Resource Center Component
const ResourceCenter = () => {
    const resources = [
        {
            type: 'library',
            title: 'Digital Library Access',
            description: 'Access to online journals and research papers',
            icon: 'book-reader'
        },
        {
            type: 'course',
            title: 'Course Materials',
            description: 'Lecture slides and reading materials',
            icon: 'file-pdf'
        },
        {
            type: 'tool',
            title: 'Development Tools',
            description: 'Software and tools for practical work',
            icon: 'tools'
        }
    ];

    const getResourceColor = (type) => {
        switch (type) {
            case 'library': return '#6C63FF';
            case 'course': return '#22C55E';
            case 'tool': return '#F59E0B';
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.resourcesCard}>
            <Text style={styles.resourcesTitle}>Resource Center</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.resourcesScroll}
            >
                {resources.map((resource, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.resourceItem}
                    >
                        <View style={[
                            styles.resourceIcon,
                            { backgroundColor: `${getResourceColor(resource.type)}20` }
                        ]}>
                            <FontAwesome5
                                name={resource.icon}
                                size={24}
                                color={getResourceColor(resource.type)}
                            />
                        </View>
                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                        <Text style={styles.resourceDescription}>
                            {resource.description}
                        </Text>
                        <View style={[
                            styles.resourceAccess,
                            { backgroundColor: getResourceColor(resource.type) }
                        ]}>
                            <Text style={styles.resourceAccessText}>Access Now</Text>
                            <FontAwesome5 name="arrow-right" size={12} color="white" />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

// Educational Progress Insights Component
const ProgressInsights = () => {
    const [activeInsight, setActiveInsight] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const insights = [
        {
            title: "Course Completion",
            value: "65%",
            description: "You've completed 85 out of 130 required credit hours",
            trend: "up",
            trendValue: "+5% from last semester"
        },
        {
            title: "Learning Goals",
            value: "8/10",
            description: "You've achieved 8 out of your 10 learning objectives",
            trend: "up",
            trendValue: "2 remaining goals"
        },
        {
            title: "Skills Development",
            value: "4",
            description: "New technical skills acquired this semester",
            trend: "up",
            trendValue: "Above average progress"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();

            setActiveInsight((prev) => (prev + 1) % insights.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>Progress Insights</Text>

            <Animated.View style={[styles.insightContent, { opacity: fadeAnim }]}>
                <Text style={styles.insightMainValue}>
                    {insights[activeInsight].value}
                </Text>
                <Text style={styles.insightTitle}>
                    {insights[activeInsight].title}
                </Text>
                <Text style={styles.insightDescription}>
                    {insights[activeInsight].description}
                </Text>
                <View style={styles.trendContainer}>
                    <FontAwesome5
                        name={`trend-${insights[activeInsight].trend}`}
                        size={14}
                        color={insights[activeInsight].trend === 'up' ? '#22C55E' : '#EF4444'}
                    />
                    <Text style={[
                        styles.trendText,
                        { color: insights[activeInsight].trend === 'up' ? '#22C55E' : '#EF4444' }
                    ]}>
                        {insights[activeInsight].trendValue}
                    </Text>
                </View>
            </Animated.View>

            <View style={styles.insightIndicators}>
                {insights.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            index === activeInsight && styles.indicatorActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};
// Semester Progress Card Component
const SemesterProgressCard = ({ semesterInfo }) => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: semesterInfo.progress / 100,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View style={styles.semesterCard}>
            <View style={styles.semesterHeader}>
                <View>
                    <Text style={styles.semesterTitle}>Current Semester</Text>
                    <Text style={styles.semesterSubtitle}>
                        Semester {semesterInfo.semester} • {semesterInfo.year}
                    </Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>In Progress</Text>
                </View>
            </View>

            <View style={styles.progressSection}>
                <CircularProgress
                    value={semesterInfo.progress}
                    size={60}
                    strokeWidth={6}
                    duration={1500}
                    color="#6C63FF"
                />
                <View style={styles.progressInfo}>
                    <Text style={styles.progressTitle}>Semester Progress</Text>
                    <Text style={styles.progressStats}>
                        {semesterInfo.completedCredits} / {semesterInfo.totalCredits} Credits Completed
                    </Text>
                </View>
            </View>

            <View style={styles.coursesContainer}>
                {semesterInfo.courses.map((course, index) => (
                    <View key={index} style={styles.courseItem}>
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseCode}>{course.code}</Text>
                            <Text style={styles.courseName}>{course.name}</Text>
                        </View>
                        <View style={[
                            styles.courseStatus,
                            { backgroundColor: course.status === 'On Track' ? '#DCFCE7' : '#FEF3C7' }
                        ]}>
                            <Text style={[
                                styles.courseStatusText,
                                { color: course.status === 'On Track' ? '#22C55E' : '#F59E0B' }
                            ]}>
                                {course.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

// Upcoming Events Card Component
const UpcomingEventsCard = ({ events }) => {
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    const getEventIcon = (type) => {
        switch (type) {
            case 'exam': return 'file-alt';
            case 'assignment': return 'tasks';
            case 'event': return 'calendar-alt';
            default: return 'bell';
        }
    };

    const getEventColor = (type) => {
        switch (type) {
            case 'exam': return '#EF4444';
            case 'assignment': return '#F59E0B';
            case 'event': return '#6C63FF';
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.eventsCard}>
            <TouchableOpacity
                style={styles.eventsHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.eventsHeaderLeft}>
                    <Text style={styles.eventsTitle}>Upcoming Events</Text>
                    <View style={styles.eventCount}>
                        <Text style={styles.eventCountText}>{events.length}</Text>
                    </View>
                </View>
                <MaterialIcons
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#6B7280"
                />
            </TouchableOpacity>

            <Animated.View style={[
                styles.eventsContent,
                {
                    maxHeight: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 1000]
                    })
                }
            ]}>
                {events.map((event, index) => (
                    <View key={index} style={styles.eventItem}>
                        <View style={[
                            styles.eventIcon,
                            { backgroundColor: `${getEventColor(event.type)}20` }
                        ]}>
                            <FontAwesome5
                                name={getEventIcon(event.type)}
                                size={16}
                                color={getEventColor(event.type)}
                            />
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventTime}>{event.time}</Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.eventAction,
                                { backgroundColor: getEventColor(event.type) }
                            ]}
                        >
                            <Text style={styles.eventActionText}>View</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

// Attendance Overview Component
const AttendanceOverview = ({ attendanceData }) => {
    const [chartVisible, setChartVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setChartVisible(true), 500);
    }, []);

    return (
        <View style={styles.attendanceCard}>
            <Text style={styles.attendanceTitle}>Attendance Overview</Text>

            <View style={styles.attendanceStats}>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.overallPercentage}%</Text>
                    <Text style={styles.statLabel}>Overall</Text>
                </View>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.presentDays}</Text>
                    <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.totalClasses}</Text>
                    <Text style={styles.statLabel}>Total Classes</Text>
                </View>
            </View>

            {chartVisible && (
                <LineChart
                    data={{
                        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        datasets: [{
                            data: attendanceData.weeklyTrend
                        }]
                    }}
                    width={Dimensions.get('window').width - 48}
                    height={180}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={styles.chart}
                />
            )}
        </View>
    );
};

// Main Dashboard Screen
const StudentDashboardScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Mock data
    const semesterInfo = {
        semester: 6,
        year: "2025",
        progress: 75,
        completedCredits: 12,
        totalCredits: 16,
        courses: [
            { code: "SE601", name: "Software Design Patterns", status: "On Track" },
            { code: "SE602", name: "Computer Networks", status: "Needs Attention" },
            { code: "SE603", name: "Database Systems", status: "On Track" }
        ]
    };

    const upcomingEvents = [
        {
            type: "exam",
            title: "Software Design Patterns Mid-Term",
            time: "Tomorrow, 9:00 AM"
        },
        {
            type: "assignment",
            title: "Computer Networks Lab Report",
            time: "Due in 2 days"
        },
        {
            type: "event",
            title: "Tech Talk: Future of AI",
            time: "Friday, 2:00 PM"
        }
    ];

    const attendanceData = {
        overallPercentage: 85,
        presentDays: 68,
        totalClasses: 80,
        weeklyTrend: [75, 80, 85, 82]
    };

    const quickActions = [
        { icon: "calendar-check", label: "Attendance", color: "#6C63FF", screen: "Attendance" },
        { icon: "tasks", label: "Courses", color: "#22C55E", screen: "Courses" },
        { icon: "file-alt", label: "Exams", color: "#F59E0B", screen: "ExamSchedule" },
        { icon: "building", label: "Internships", color: "#EF4444", screen: "Internships" }
    ];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate data refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Animated.View style={{ opacity: fadeAnim }}>
                    <View style={styles.welcomeSection}>
                        <View>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.userName}>John Doe</Text>
                        </View>

                    </View>

                    <View style={styles.quickActions}>
                        {quickActions.map((action, index) => (
                            <QuickActionButton
                                key={index}
                                {...action}
                                onPress={() => navigation.navigate(action.screen)}
                            />
                        ))}
                    </View>

                    <ProgressInsights />
                    <SemesterProgressCard semesterInfo={semesterInfo} />
                    <PerformanceOverview />
                    <AttendanceOverview attendanceData={attendanceData} />

                    <UpcomingEventsCard events={upcomingEvents} />
                    <ResourceCenter />
                    <AcademicCalendar />

                </Animated.View>
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
        flex: 1,
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    welcomeText: {
        fontSize: 16,
        color: '#6B7280',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    notificationButton: {
        position: 'relative',
        width: 40,
        height: 40,
        backgroundColor: '#EEF0FB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationCount: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
        justifyContent: 'space-between',
    },
    quickActionButton: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickActionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    semesterCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    semesterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    semesterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    semesterSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    statusBadge: {
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6C63FF',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    progressInfo: {
        marginLeft: 16,
        flex: 1,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    progressStats: {
        fontSize: 14,
        color: '#6B7280',
    },
    coursesContainer: {
        gap: 12,
    },
    courseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    courseInfo: {
        flex: 1,
    },
    courseCode: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    courseName: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    courseStatus: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    courseStatusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    eventsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    eventsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    eventsHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    eventCount: {
        backgroundColor: '#EEF0FB',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    eventCountText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6C63FF',
    },
    eventsContent: {
        overflow: 'hidden',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    eventIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 12,
        color: '#6B7280',
    },
    eventAction: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginLeft: 12,
    },
    eventActionText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
    attendanceCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    attendanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    attendanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    attendanceStat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    calendarCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    calendarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    selectedDateEvents: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    selectedDateTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    calendarEventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
    },
    eventDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    calendarEventInfo: {
        flex: 1,
    },
    calendarEventTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 4,
    },
    calendarEventTime: {
        fontSize: 12,
        color: '#6B7280',
    },

    // Styles for Performance Overview
    performanceCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    performanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    metricToggle: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
    },
    metricButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    metricButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    metricButtonText: {
        fontSize: 14,
        color: '#6B7280',
    },
    metricButtonTextActive: {
        color: '#1F2937',
        fontWeight: '500',
    },
    performanceContent: {
        alignItems: 'center',
    },
    performanceMetrics: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainMetric: {
        alignItems: 'center',
    },
    mainMetricValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    mainMetricLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    performanceChart: {
        marginLeft: 16,
        borderRadius: 16,
    },

    // Styles for Resource Center
    resourcesCard: {
        margin: 16,
    },
    resourcesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    resourcesScroll: {
        paddingRight: 16,
    },
    resourceItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginRight: 16,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resourceIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    resourceDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },
    resourceAccess: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        padding: 12,
    },
    resourceAccessText: {
        color: 'white',
        fontWeight: '500',
        marginRight: 8,
    },

    // Styles for Progress Insights
    insightsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    insightsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    insightContent: {
        alignItems: 'center',
        marginBottom: 16,
    },
    insightMainValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 8,
    },
    insightDescription: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 12,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        marginLeft: 8,
        fontSize: 14,
    },
    insightIndicators: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: '#6C63FF',
    }
});


export default StudentDashboardScreen;