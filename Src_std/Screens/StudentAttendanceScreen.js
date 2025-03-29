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
import CircularProgress from '../Components/CircularProgress';
import { LineChart } from 'react-native-chart-kit';

// Animated Wave Background Component
const WaveBackground = ({ percentage }) => {
    const animation = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.waveContainer,
                {
                    transform: [{
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }]
                }
            ]}
        >
            <View style={[
                styles.wave,
                { height: `${100 - percentage}%` }
            ]} />
        </Animated.View>
    );
};

// Course Attendance Card Component
const CourseAttendanceCard = ({ course, onPress }) => {
    const scaleAnim = useState(new Animated.Value(0))[0];
    const progressAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true
        }).start();

        Animated.timing(progressAnim, {
            toValue: course.percentage / 100,
            duration: 1500,
            useNativeDriver: false
        }).start();
    }, []);

    const getStatusColor = (percentage) => {
        if (percentage >= 90) return '#22C55E';
        if (percentage >= 75) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <Animated.View style={[
            styles.courseCard,
            { transform: [{ scale: scaleAnim }] }
        ]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.courseHeader}>
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseCode}>{course.code}</Text>
                        <Text style={styles.courseName}>{course.name}</Text>
                    </View>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(course.percentage)}20` }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: getStatusColor(course.percentage) }
                        ]}>
                            {course.percentage}% Present
                        </Text>
                    </View>
                </View>

                <View style={styles.attendanceStats}>
                    <Animated.View style={[
                        styles.progressBar,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            }),
                            backgroundColor: getStatusColor(course.percentage)
                        }
                    ]} />
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#22C55E" />
                            <Text style={styles.statText}>
                                {course.attendedClasses} Classes Attended
                            </Text>
                        </View>
                        <View style={styles.statItem}>
                            <FontAwesome5 name="calendar-alt" size={16} color="#6C63FF" />
                            <Text style={styles.statText}>
                                {course.totalClasses} Total Classes
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// Main Attendance Screen
const StudentAttendanceScreen = ({ navigation }) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('semester');
    const [showChart, setShowChart] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const attendanceData = {
        week: {
            overallAttendance: 85, // Example weekly percentage
            courses: [
                { code: "SE301", name: "Software Design & Architecture", percentage: 85.2 },
                { code: "SE302", name: "Algorithms", percentage: 78.6 },
                { code: "SE303", name: "Operating Systems", percentage: 92.3 },
            ],
        },
        month: {
            overallAttendance: 88, // Example monthly percentage
            courses: [
                { code: "SE301", name: "Software Design & Architecture", percentage: 88.1 },
                { code: "SE302", name: "Algorithms", percentage: 80.4 },
                { code: "SE303", name: "Operating Systems", percentage: 93.5 },
            ],
        },
        semester: {
            overallAttendance: 90.5, // Current semester's overall attendance
            courses: [
                {
                    code: "SE301",
                    name: "Software Design & Architecture",
                    creditHours: 3,
                    totalClasses: 44,
                    attendedClasses: 40,
                    percentage: 90.91,
                },
                {
                    code: "SE302",
                    name: "Algorithms",
                    creditHours: 3,
                    totalClasses: 44,
                    attendedClasses: 40,
                    percentage: 75.04,
                },
                {
                    code: "SE303",
                    name: "Operating Systems",
                    creditHours: 3,
                    totalClasses: 44,
                    attendedClasses: 40,
                    percentage: 30.05,
                },
                {
                    code: "SE304",
                    name: "Database Systems",
                    creditHours: 3,
                    totalClasses: 44,
                    attendedClasses: 40,
                    percentage: 90.91,
                },
                {
                    code: "SE305",
                    name: "Computer Networks",
                    creditHours: 3,
                    totalClasses: 44,
                    attendedClasses: 40,
                    percentage: 40.01,
                },
            ],
        },
    };


    useEffect(() => {
        Animated.sequence([
            Animated.delay(500),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start(() => setShowChart(true));
    }, []);

    // Mock data for the attendance trend chart
    const [chartData, setChartData] = useState({
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        datasets: [{
            datasets: [{ data: [85, 88, 92, 90, 87, 90.5] }],
            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`
        }]
    });

    useEffect(() => {
        let newChartData;
        if (selectedTimeframe === 'week') {
            newChartData = [80, 85, 87, 86, 88, 85]; // Example weekly trend
        } else if (selectedTimeframe === 'month') {
            newChartData = [82, 85, 88, 90, 87, 89]; // Example monthly trend
        } else {
            newChartData = [85, 88, 92, 90, 87, 90.5]; // Example semester trend
        }

        setChartData({
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
            datasets: [{ data: newChartData }],
        });
    }, [selectedTimeframe]);
    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Attendance Record"
                subtitle="Spring 2025"
                showBack
                navigation={navigation}
            />

            <ScrollView style={styles.content}>
                <Animated.View
                    style={[styles.overallCard, { opacity: fadeAnim }]}
                >
                    <WaveBackground percentage={attendanceData[selectedTimeframe]?.overallAttendance || 0} />
                    <View style={styles.overallContent}>
                        <Text style={styles.overallTitle}>Overall Attendance</Text>
                        <View style={styles.circularProgressContainer}>
                            <CircularProgress
                                value={attendanceData[selectedTimeframe]?.overallAttendance || 0} // ✅ Ensures it's never undefined
                                size={100}
                                strokeWidth={6}
                                duration={3000}
                                scale={100}
                                color="#6C63FF"
                            />


                        </View>

                        <View style={styles.timeframeSelector}>
                            {['week', 'month', 'semester'].map(timeframe => (
                                <TouchableOpacity
                                    key={timeframe}
                                    style={[
                                        styles.timeframeButton,
                                        selectedTimeframe === timeframe && styles.timeframeButtonActive
                                    ]}
                                    onPress={() => setSelectedTimeframe(timeframe)}
                                >
                                    <Text style={[
                                        styles.timeframeText,
                                        selectedTimeframe === timeframe && styles.timeframeTextActive
                                    ]}>
                                        {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Animated.View>

                {showChart && (
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Attendance Trend</Text>
                        <LineChart
                            data={chartData}
                            width={Dimensions.get('window').width - 48}
                            height={180}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                )}

                <Text style={styles.sectionTitle}>Course-wise Attendance</Text>
                {(attendanceData[selectedTimeframe]?.courses || []).map((course, index) => (
                    <CourseAttendanceCard
                        key={`${course.code}-${index}`}
                        course={course}
                        onPress={() => navigation.navigate('CourseAttendanceDetail', { course })}
                    />
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
    overallCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        height: 280,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    waveContainer: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    wave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#6C63FF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    overallContent: {
        alignItems: 'center',
        zIndex: 1,
    },
    overallTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    circularProgressContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    overallPercentage: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        top: '50%',
        transform: [{ translateY: -30 }],
    },
    timeframeSelector: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
    },
    timeframeButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    timeframeButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    timeframeText: {
        fontSize: 14,
        color: '#6B7280',
    },
    timeframeTextActive: {
        color: '#1F2937',
        fontWeight: '600',
    },
    chartCard: {
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
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    chart: {
        borderRadius: 16,
        marginVertical: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    courseCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
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
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    attendanceStats: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 12,
    },
    progressBar: {
        height: 4,
        borderRadius: 2,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statText: {
        fontSize: 14,
        color: '#6B7280',
    },
});

export default StudentAttendanceScreen;