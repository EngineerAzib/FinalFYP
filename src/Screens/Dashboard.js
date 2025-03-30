import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  RefreshControl,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { Header } from '../Components/Header';

const { width, height } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [currentPeriod, setCurrentPeriod] = useState('weekly');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data (replace with real data from your API)
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 4587,
    totalTeachers: 234,
    totalDepartments: 12,
    totalCourses: 348,
    pendingRequests: 18,
    studentGenderDistribution: {
      male: 2543,
      female: 2044
    },
    departmentStrength: [
      { name: 'Computer Science', students: 782, color: '#4F46E5' },
      { name: 'Electrical Eng.', students: 654, color: '#10B981' },
      { name: 'Mechanical Eng.', students: 587, color: '#F59E0B' },
      { name: 'Civil Eng.', students: 492, color: '#EF4444' },
      { name: 'Business Admin', students: 712, color: '#8B5CF6' }
    ],
    attendance: {
      present: 87.2,
      absent: 8.5,
      leave: 4.3
    },
    examSchedules: [
      { id: 'ES001', department: 'Computer Science', year: '2nd Year', date: '2025-04-15', status: 'Upcoming' },
      { id: 'ES002', department: 'Electrical Engineering', year: '3rd Year', date: '2025-04-18', status: 'Upcoming' },
      { id: 'ES003', department: 'Business Admin', year: '4th Year', date: '2025-04-20', status: 'Upcoming' }
    ],
    semesterRegistrations: [
      { id: 'SR001', department: 'Computer Science', semester: 'Spring 2025', status: 'Open', courses: 24, students: 178 },
      { id: 'SR002', department: 'Mechanical Engineering', semester: 'Spring 2025', status: 'Open', courses: 18, students: 142 }
    ],
    recentActivities: [
      { id: 'ACT001', type: 'course', action: 'New Course Added', details: 'Advanced Machine Learning (CS-412)', time: '2 hours ago' },
      { id: 'ACT002', type: 'student', action: 'Student Registration', details: 'John Smith registered to Computer Science', time: '3 hours ago' },
      { id: 'ACT003', type: 'teacher', action: 'Teacher Allocation', details: 'Dr. Emily Johnson allocated to Database Systems', time: '5 hours ago' },
      { id: 'ACT004', type: 'news', action: 'News Published', details: 'Annual Career Fair Announcement', time: '1 day ago' },
      { id: 'ACT005', type: 'event', action: 'Event Created', details: 'Technical Workshop: Web 3.0 & Blockchain', time: '1 day ago' }
    ],
    notifications: [
      { id: 'NOT001', title: 'Course Registration Deadline', message: 'Spring 2025 registration closes tomorrow', time: '20 minutes ago', read: false },
      { id: 'NOT002', title: 'System Maintenance', message: 'System will be down for maintenance on Sunday, 2AM-4AM', time: '2 hours ago', read: false },
      { id: 'NOT003', title: 'Report Generated', message: 'Student Performance Report is ready to download', time: '1 day ago', read: true },
      { id: 'NOT004', title: 'New Policy Update', message: 'Student attendance policy has been updated', time: '2 days ago', read: true }
    ],
    performanceMetrics: {
      weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [65, 72, 84, 78, 90, 82, 76],
            color: () => '#4F46E5',
          }
        ]
      },
      monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            data: [78, 82, 85, 89],
            color: () => '#10B981',
          }
        ]
      },
      yearly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [65, 68, 72, 75, 78, 82, 85, 89, 92, 90, 88, 91],
            color: () => '#8B5CF6',
          }
        ]
      }
    }
  });

  // Animation effect
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
    }, 1500);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refreshing data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Helper function to render activity icon based on type
  const renderActivityIcon = (type) => {
    switch (type) {
      case 'course':
        return <MaterialIcons name="menu-book" size={18} color="#4F46E5" style={styles.activityIcon} />;
      case 'student':
        return <MaterialIcons name="person" size={18} color="#10B981" style={styles.activityIcon} />;
      case 'teacher':
        return <MaterialIcons name="person" size={18} color="#F59E0B" style={styles.activityIcon} />;
      case 'news':
        return <MaterialIcons name="article" size={18} color="#EF4444" style={styles.activityIcon} />;
      case 'event':
        return <MaterialIcons name="event" size={18} color="#8B5CF6" style={styles.activityIcon} />;
      default:
        return <MaterialIcons name="info" size={18} color="#6B7280" style={styles.activityIcon} />;
    }
  };

  // Helper function to render status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'completed':
        return '#10B981';
      case 'upcoming':
        return '#F59E0B';
      case 'urgent':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  // Chart configurations
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4F46E5'
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../Assets/Lottie Lego.json')} // Correct relative path
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Header/>
      


      {/* Navigation Tabs */}
      {/* <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollView}
        >
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
            onPress={() => setSelectedTab('overview')}
          >
            <MaterialIcons
              name="dashboard"
              size={22}
              color={selectedTab === 'overview' ? '#4F46E5' : '#6B7280'}
            />
            <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'academics' && styles.tabActive]}
            onPress={() => setSelectedTab('academics')}
          >
            <MaterialIcons
              name="school"
              size={22}
              color={selectedTab === 'academics' ? '#4F46E5' : '#6B7280'}
            />
            <Text style={[styles.tabText, selectedTab === 'academics' && styles.tabTextActive]}>
              Academics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'people' && styles.tabActive]}
            onPress={() => setSelectedTab('people')}
          >
            <MaterialIcons
              name="people"
              size={22}
              color={selectedTab === 'people' ? '#4F46E5' : '#6B7280'}
            />
            <Text style={[styles.tabText, selectedTab === 'people' && styles.tabTextActive]}>
              People
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'schedule' && styles.tabActive]}
            onPress={() => setSelectedTab('schedule')}
          >
            <MaterialIcons
              name="event"
              size={22}
              color={selectedTab === 'schedule' ? '#4F46E5' : '#6B7280'}
            />
            <Text style={[styles.tabText, selectedTab === 'schedule' && styles.tabTextActive]}>
              Schedule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reports' && styles.tabActive]}
            onPress={() => setSelectedTab('reports')}
          >
            <MaterialIcons
              name="insert-chart"
              size={22}
              color={selectedTab === 'reports' ? '#4F46E5' : '#6B7280'}
            />
            <Text style={[styles.tabText, selectedTab === 'reports' && styles.tabTextActive]}>
              Reports
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View> */}

      {/* Main Dashboard Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4F46E5']}
            tintColor="#4F46E5"
          />
        }
      >

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Quick Stats Grid */}
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <TouchableOpacity
              style={styles.statsCard}
              onPress={() => navigation.navigate('AllStudentsScreen')}
            >
              <View style={[styles.statsIconContainer, { backgroundColor: '#EEF2FF' }]}>
                <MaterialIcons name="people" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.statsValue}>{dashboardData.totalStudents.toLocaleString()}</Text>
              <Text style={styles.statsLabel}>Students</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statsCard}
              onPress={() => navigation.navigate('AllTeachersScreen')}
            >
              <View style={[styles.statsIconContainer, { backgroundColor: '#ECFDF5' }]}>
                <MaterialIcons name="person" size={24} color="#10B981" />
              </View>
              <Text style={styles.statsValue}>{dashboardData.totalTeachers}</Text>
              <Text style={styles.statsLabel}>Teachers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statsCard}
              onPress={() => navigation.navigate('DepartmentListScreen')}
            >
              <View style={[styles.statsIconContainer, { backgroundColor: '#FEF3C7' }]}>
                <MaterialIcons name="account-balance" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.statsValue}>{dashboardData.totalDepartments}</Text>
              <Text style={styles.statsLabel}>Departments</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statsCard}
              onPress={() => navigation.navigate('DepartmentListScreen2')}
            >
              <View style={[styles.statsIconContainer, { backgroundColor: '#FEE2E2' }]}>
                <MaterialIcons name="menu-book" size={24} color="#EF4444" />
              </View>
              <Text style={styles.statsValue}>{dashboardData.totalCourses}</Text>
              <Text style={styles.statsLabel}>Courses</Text>
            </TouchableOpacity>
          </View>

          {/* Pending Actions */}
          <View style={styles.alertBox}>
            <View style={styles.alertIconContainer}>
              <MaterialIcons name="error-outline" size={28} color="#F59E0B" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Pending Approvals</Text>
              <Text style={styles.alertText}>
                {dashboardData.pendingRequests} items need your attention
              </Text>
            </View>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => navigation.navigate('NotificationScreen')}
            >
              <Text style={styles.alertButtonText}>View</Text>
            </TouchableOpacity>
          </View>

          {/* Gender Distribution */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Student Gender Distribution</Text>
              <TouchableOpacity onPress={() => { }}>
                <MaterialIcons name="more-vert" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.distributionContainer}>
              <View style={styles.pieChartContainer}>
                <PieChart
                  data={[
                    {
                      name: 'Male',
                      population: dashboardData.studentGenderDistribution.male,
                      color: '#4F46E5',
                      legendFontColor: '#7F7F7F',
                      legendFontSize: 13,
                    },
                    {
                      name: 'Female',
                      population: dashboardData.studentGenderDistribution.female,
                      color: '#EC4899',
                      legendFontColor: '#7F7F7F',
                      legendFontSize: 13,
                    },
                  ]}
                  width={width * 0.4}
                  height={180}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="10"
                  absolute
                />
              </View>

              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#4F46E5' }]} />
                  <Text style={styles.legendLabel}>Male</Text>
                  <Text style={styles.legendValue}>{dashboardData.studentGenderDistribution.male}</Text>
                  <Text style={styles.legendPercentage}>
                    {Math.round(dashboardData.studentGenderDistribution.male /
                      (dashboardData.studentGenderDistribution.male +
                        dashboardData.studentGenderDistribution.female) * 100)}%
                  </Text>
                </View>

                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#EC4899' }]} />
                  <Text style={styles.legendLabel}>Female</Text>
                  <Text style={styles.legendValue}>{dashboardData.studentGenderDistribution.female}</Text>
                  <Text style={styles.legendPercentage}>
                    {Math.round(dashboardData.studentGenderDistribution.female /
                      (dashboardData.studentGenderDistribution.male +
                        dashboardData.studentGenderDistribution.female) * 100)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Department Strength */}
          <View style={[styles.card, { marginBottom: 20 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Department Strength</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('DepartmentListScreen')}
              >
                <Text style={styles.viewAllButtonText}>View All</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View style={styles.departmentList}>
              {dashboardData.departmentStrength.map((dept, index) => (
                <View key={index} style={styles.departmentItem}>
                  <View style={styles.departmentInfo}>
                    <View
                      style={[
                        styles.departmentColorIndicator,
                        { backgroundColor: dept.color }
                      ]}
                    />
                    <Text style={styles.departmentName}>{dept.name}</Text>
                  </View>
                  <Text style={styles.departmentValue}>{dept.students}</Text>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${(dept.students / Math.max(...dashboardData.departmentStrength.map(d => d.students))) * 100}%`,
                          backgroundColor: dept.color
                        }
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Performance Chart */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Performance Overview</Text>
              <View style={styles.periodSelector}>
                <TouchableOpacity
                  style={[
                    styles.periodOption,
                    currentPeriod === 'weekly' && styles.periodOptionActive
                  ]}
                  onPress={() => setCurrentPeriod('weekly')}
                >
                  <Text
                    style={[
                      styles.periodOptionText,
                      currentPeriod === 'weekly' && styles.periodOptionTextActive
                    ]}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.periodOption,
                    currentPeriod === 'monthly' && styles.periodOptionActive
                  ]}
                  onPress={() => setCurrentPeriod('monthly')}
                >
                  <Text
                    style={[
                      styles.periodOptionText,
                      currentPeriod === 'monthly' && styles.periodOptionTextActive
                    ]}
                  >
                    Monthly
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.periodOption,
                    currentPeriod === 'yearly' && styles.periodOptionActive
                  ]}
                  onPress={() => setCurrentPeriod('yearly')}
                >
                  <Text
                    style={[
                      styles.periodOptionText,
                      currentPeriod === 'yearly' && styles.periodOptionTextActive
                    ]}
                  >
                    Yearly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={dashboardData.performanceMetrics[currentPeriod]}
                width={Math.max(width - 40, width * 0.8 * dashboardData.performanceMetrics[currentPeriod].labels.length / 4)}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  strokeWidth: 2,
                  useShadowColorFromDataset: true,
                }}
                bezier
                style={styles.chart}
              />
            </ScrollView>
          </View>

          {/* Upcoming Exam Schedules */}
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Upcoming Exams</Text>
          <View style={styles.examContainer}>
            {dashboardData.examSchedules.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                style={styles.examItem}
                onPress={() => navigation.navigate('ExamScheduleDepartmentScreen', { examId: exam.id })}
              >
                <View style={styles.examIconContainer}>
                  <MaterialIcons name="event-note" size={22} color="#4F46E5" />
                </View>
                <View style={styles.examContent}>
                  <Text style={styles.examDepartment}>{exam.department}</Text>
                  <Text style={styles.examYear}>{exam.year}</Text>
                  <View style={styles.examDateContainer}>
                    <MaterialIcons name="calendar-today" size={12} color="#6B7280" />
                    <Text style={styles.examDate}>
                      {new Date(exam.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                  </View>
                </View>
                <View style={[styles.examStatus, { backgroundColor: getStatusColor(exam.status) + '20' }]}>
                  <Text style={[styles.examStatusText, { color: getStatusColor(exam.status) }]}>
                    {exam.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.viewAllExams}
              onPress={() => navigation.navigate('AllExamSchedules')}
            >
              <Text style={styles.viewAllExamsText}>View All Exams</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          {/* Active Semester Registrations */}
          <Text style={styles.sectionTitle}>Active Registrations</Text>
          <View style={styles.regContainer}>
            {dashboardData.semesterRegistrations.map((reg) => (
              <TouchableOpacity
                key={reg.id}
                style={styles.regItem}
                onPress={() => navigation.navigate('SemesterReg_DepartmentListScreen', { regId: reg.id })}
              >
                <View style={styles.regHeader}>
                  <Text style={styles.regDepartment}>{reg.department}</Text>
                  <View
                    style={[
                      styles.regStatus,
                      { backgroundColor: getStatusColor(reg.status) + '20' }
                    ]}
                  >
                    <Text
                      style={[
                        styles.regStatusText,
                        { color: getStatusColor(reg.status) }
                      ]}
                    >
                      {reg.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.regSemester}>{reg.semester}</Text>

                <View style={styles.regStats}>
                  <View style={styles.regStatItem}>
                    <MaterialIcons name="menu-book" size={16} color="#4F46E5" />
                    <Text style={styles.regStatValue}>{reg.courses}</Text>
                    <Text style={styles.regStatLabel}>Courses</Text>
                  </View>

                  <View style={styles.regStatItem}>
                    <MaterialIcons name="people" size={16} color="#10B981" />
                    <Text style={styles.regStatValue}>{reg.students}</Text>
                    <Text style={styles.regStatLabel}>Students</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.viewAllRegs}
              onPress={() => navigation.navigate('SemesterReg_DepartmentListScreen')}
            >
              <Text style={styles.viewAllRegsText}>View All Registrations</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          {/* Recent Activities */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Activities</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationScreen')}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllButtonText}>View All</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View style={styles.activitiesList}>
              {dashboardData.recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityIconWrapper}>
                    {renderActivityIcon(activity.type)}
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                    <Text style={styles.activityDetails}>{activity.details}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Attendance Overview */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Attendance Overview</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllStudentsScreen')}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllButtonText}>Full Report</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View style={styles.attendanceStats}>
              <View style={styles.attendanceItem}>
                <View style={[styles.attendanceIconContainer, { backgroundColor: '#ECFDF5' }]}>
                  <MaterialIcons name="check-circle" size={24} color="#10B981" />
                </View>
                <Text style={styles.attendanceValue}>{dashboardData.attendance.present}%</Text>
                <Text style={styles.attendanceLabel}>Present</Text>
              </View>

              <View style={styles.attendanceItem}>
                <View style={[styles.attendanceIconContainer, { backgroundColor: '#FEE2E2' }]}>
                  <MaterialIcons name="cancel" size={24} color="#EF4444" />
                </View>
                <Text style={styles.attendanceValue}>{dashboardData.attendance.absent}%</Text>
                <Text style={styles.attendanceLabel}>Absent</Text>
              </View>

              <View style={styles.attendanceItem}>
                <View style={[styles.attendanceIconContainer, { backgroundColor: '#FEF3C7' }]}>
                  <MaterialIcons name="event-busy" size={24} color="#F59E0B" />
                </View>
                <Text style={styles.attendanceValue}>{dashboardData.attendance.leave}%</Text>
                <Text style={styles.attendanceLabel}>On Leave</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.attendanceActionButton}
              onPress={() => navigation.navigate('AttendanceManagement')}
            >
              <Text style={styles.attendanceActionButtonText}>Manage Attendance</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('NotificationScreen')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#EEF2FF' }]}>
                <MaterialIcons name="campaign" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.quickActionText}>Announcement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('AddStudentForm')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#ECFDF5' }]}>
                <MaterialIcons name="person-add" size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CreateTeacherForm')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <MaterialIcons name="person-add" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.quickActionText}>Add Teacher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CreateEventScreen')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}>
                <MaterialIcons name="event-available" size={24} color="#EF4444" />
              </View>
              <Text style={styles.quickActionText}>Create Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CreateSubjectsScreen')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#F3E8FF' }]}>
                <MaterialIcons name="add-box" size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.quickActionText}>Add Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('GenerateReports')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E0F2FE' }]}>
                <MaterialIcons name="analytics" size={24} color="#0EA5E9" />
              </View>
              <Text style={styles.quickActionText}>Reports</Text>
            </TouchableOpacity>
          </View>

          {/* System Status */}
          <View style={styles.systemStatusCard}>
            <View style={styles.systemStatusHeader}>
              <Text style={styles.systemStatusTitle}>System Status</Text>
              <View style={styles.systemStatusBadge}>
                <Text style={styles.systemStatusBadgeText}>Healthy</Text>
              </View>
            </View>

            <View style={styles.systemStatusItems}>
              <View style={styles.systemStatusItem}>
                <Text style={styles.systemStatusItemLabel}>Database</Text>
                <View style={styles.systemProgressContainer}>
                  <View style={[styles.systemProgressBar, { width: '62%', backgroundColor: '#10B981' }]} />
                </View>
                <Text style={styles.systemStatusItemValue}>62% Usage</Text>
              </View>

              <View style={styles.systemStatusItem}>
                <Text style={styles.systemStatusItemLabel}>Storage</Text>
                <View style={styles.systemProgressContainer}>
                  <View style={[styles.systemProgressBar, { width: '78%', backgroundColor: '#F59E0B' }]} />
                </View>
                <Text style={styles.systemStatusItemValue}>78% Usage</Text>
              </View>

              <View style={styles.systemStatusItem}>
                <Text style={styles.systemStatusItemLabel}>Performance</Text>
                <View style={styles.systemProgressContainer}>
                  <View style={[styles.systemProgressBar, { width: '93%', backgroundColor: '#4F46E5' }]} />
                </View>
                <Text style={styles.systemStatusItemValue}>93% Optimal</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.systemMonitorButton}
              onPress={() => navigation.navigate('SystemMonitoring')}
            >
              <MaterialIcons name="speed" size={18} color="#4F46E5" />
              <Text style={styles.systemMonitorButtonText}>System Monitoring</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Campus Management System</Text>
            <Text style={styles.footerVersion}>v2.4.1</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// Define the StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 18,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  notificationPanel: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 98 : 64,
    right: 16,
    backgroundColor: '#FFFFFF',
    width: 300,
    maxHeight: 400,
    borderRadius: 12,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  notificationHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  notificationHeaderBtn: {
    padding: 4,
  },
  notificationHeaderBtnText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  notificationList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadNotification: {
    backgroundColor: '#F3F4F6',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabsScrollView: {
    paddingHorizontal: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 6,
  },
  tabTextActive: {
    color: '#4F46E5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: (width - 48) / 2,
    padding: 16,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertIconContainer: {
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#92400E',
  },
  alertButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
    marginRight: 4,
  },
  distributionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieChartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
    color: '#4B5563',
    width: 60,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  legendPercentage: {
    fontSize: 14,
    color: '#6B7280',
  },
  departmentList: {
    marginTop: 8,
  },
  departmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  departmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },
  departmentColorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  departmentName: {
    fontSize: 14,
    color: '#1F2937',
  },
  departmentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    width: 40,
    textAlign: 'right',
    marginRight: 16,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  periodOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  periodOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  periodOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodOptionTextActive: {
    color: '#4F46E5',
  },
  chart: {
    borderRadius: 16,
    marginTop: 8,
  },
  examContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  examItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  examIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  examContent: {
    flex: 1,
  },
  examDepartment: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  examYear: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  examDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examDate: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  examStatus: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  examStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllExams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllExamsText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
    marginRight: 8,
  },
  regContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  regItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  regHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  regDepartment: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  regStatus: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  regStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  regSemester: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  regStats: {
    flexDirection: 'row',
  },
  regStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  regStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
    marginRight: 4,
  },
  regStatLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  viewAllRegs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllRegsText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
    marginRight: 8,
  },
  activitiesList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIconWrapper: {
    marginRight: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  attendanceItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  attendanceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendanceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  attendanceLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  attendanceActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  attendanceActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    marginBottom: 24,
  },
  quickActionCard: {
    width: (width - 56) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 13,
    color: '#1F2937',
    textAlign: 'center',
  },
  systemStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  systemStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  systemStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  systemStatusBadge: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  systemStatusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
  },
  systemStatusItems: {
    marginBottom: 16,
  },
  systemStatusItem: {
    marginBottom: 12,
  },
  systemStatusItemLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  systemProgressContainer: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  systemProgressBar: {
    height: '100%',
    borderRadius: 4,
  },
  systemStatusItemValue: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
  },
  systemMonitorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  systemMonitorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  }
});

export default AdminDashboard;