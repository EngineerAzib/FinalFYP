import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window');

const CustomMenuDrawer = ({ isVisible, onClose, navigation }) => {
  const [slideAnim] = useState(new Animated.Value(-width));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [expandedItems, setExpandedItems] = useState({});

  // Menu items data structure
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      screen: 'Dashboard',
      color: '#4F46E5',
      isDashboard: true
    },
    {
      id: 'courses',
      title: 'Courses',
      icon: 'school',
      color: '#10B981',
      subItems: [
        { id: 'all-courses', title: 'Departments --> All Courses', screen: 'DepartmentListScreen2', icon: 'book' },
        { id: 'create-course', title: 'Create Course', screen: 'CreateSubjectsScreen', icon: 'add' },
      ],
    },
    {
      id: 'departments',
      title: 'Departments',
      icon: 'account-balance',
      color: '#F59E0B',
      subItems: [
        { id: 'all-departments', title: 'All Departments', screen: 'DepartmentListScreen', icon: 'list' },
        { id: 'create-department', title: 'Create Department', screen: 'CreateDepartmentScreen', icon: 'add' },
      ],
    },
    {
      id: 'teachers',
      title: 'Teachers',
      icon: 'groups',
      color: '#EF4444',
      subItems: [
        { id: 'all-teachers', title: 'All Teachers', screen: 'AllTeachersScreen', icon: 'people' },
        { id: 'create-teachers', title: 'Create Teachers', screen: 'CreateTeacherForm', icon: 'add' },
      ],
    },
    {
      id: 'students',
      title: 'Students',
      icon: 'groups',
      color: '#8B5CF6',
      subItems: [
        { id: 'all-students', title: 'All Students', screen: 'AllStudentsScreen', icon: 'people' },
        { id: 'add-student', title: 'Create Student', screen: 'AddStudentForm', icon: 'add' },
      ],
    },
    {
      id: 'news',
      title: 'News',
      icon: 'article',
      color: '#EC4899',
      subItems: [
        { id: 'all-news', title: 'All News', screen: 'NewsListScreen', icon: 'article' },
        { id: 'create-news', title: 'Create News', screen: 'CreateNewsScreen', icon: 'add' },
      ],
    },
    {
      id: 'internship',
      title: 'Internships',
      icon: 'work',
      color: '#06B6D4',
      subItems: [
        { id: 'all-internships', title: 'All Internships', screen: 'InternshipListScreen', icon: 'work' },
        { id: 'create-internship', title: 'Create Internship', screen: 'CreateInternshipScreen', icon: 'add' },
      ],
    },
    {
      id: 'events',
      title: 'Events',
      icon: 'event',
      color: '#2563EB',
      subItems: [
        { id: 'all-events', title: 'All Events', screen: 'EventListScreen', icon: 'list' },
        { id: 'create-event', title: 'Create Event', screen: 'CreateEventScreen', icon: 'add' },
      ],
    },
    {
      id: 'exam_schedule',
      title: 'Exam Schedule',
      icon: 'date-range',
      color: '#7C3AED',
      subItems: [
        { id: 'exam-schedule', title: 'Department->Year->Exam Schedules', screen: 'ExamScheduleDepartmentScreen', icon: 'list' },
        { id: 'create-exam-schedule', title: 'Create Exam Schedule', screen: 'CreateExamSchedule', icon: 'add' },
      ],
    },
    {
      id: 'semester_reg',
      title: 'Semester Registration',
      icon: 'domain',
      color: '#DC2626',
      subItems: [
        { id: 'semester-registeration', title: 'Semester Registerations', screen: 'SemesterReg_DepartmentListScreen', icon: 'assignment' },
        { id: 'create-semester-registeration', title: 'Create Semester Registeration ', screen: 'CreateSemesterRegistration', icon: 'add' },
      ],
    },
    {
      id: 'Notifify',
      title: 'Notifications',
      icon: 'work',
      color: '#06B6D4',
      subItems: [
        { id: 'all-Notifications', title: 'All Notifications', screen: 'NotificationScreen', icon: 'work' },
        { id: 'create-Notification', title: 'Create Notification', screen: 'CreateNotificationScreen', icon: 'add' },
      ],
    },
  ];

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleNavigation = (screen) => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(screen);
      onClose();
    });
  };

  const renderMenuItem = (item, index) => {
    const isLastItem = index === menuItems.length - 1;

    if (item.isDashboard) {
      return (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigation(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <MaterialIcons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
      );
    }

    return (
      <View key={item.id}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
              <MaterialIcons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
          </View>
          <MaterialIcons 
            name={expandedItems[item.id] ? "expand-less" : "expand-more"} 
            size={20} 
            color="#9CA3AF" 
          />
        </TouchableOpacity>

        {expandedItems[item.id] && (
          <View style={styles.subMenuContainer}>
            {item.subItems?.map((subItem) => (
              <TouchableOpacity
                key={subItem.id}
                style={styles.subMenuItem}
                onPress={() => handleNavigation(subItem.screen)}
                activeOpacity={0.7}
              >
                <View style={styles.subMenuIconWrapper}>
                  <MaterialIcons name={subItem.icon} size={18} color={item.color} />
                </View>
                <Text style={styles.subMenuTitle}>{subItem.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isLastItem && <View style={styles.separator} />}
      </View>
    );
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, { display: isVisible ? 'flex' : 'none' }]}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />

          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={{ uri: '/api/placeholder/80/80' }}
                    style={styles.profileImage}
                  />
                  <View style={styles.statusIndicator} />
                </View>
                <Text style={styles.profileName}>Admin Dashboard</Text>
                <Text style={styles.profileDetails}>Administrator</Text>
              </View>

              {/* Menu Items */}
              <ScrollView
                style={styles.menuContainer}
                showsVerticalScrollIndicator={false}
              >
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </ScrollView>

              {/* AI Assistant Section */}
              <TouchableOpacity
                style={styles.chatbotSection}
                onPress={() => handleNavigation('Chatbot')}
                activeOpacity={0.8}
              >
                <View style={styles.chatbotContent}>
                  <View style={styles.chatbotIconContainer}>
                    <MaterialIcons name="support-agent" size={24} color="#4F46E5" />
                  </View>
                  <View style={styles.chatbotTextContainer}>
                    <Text style={styles.chatbotTitle}>AI Assistant</Text>
                    <Text style={styles.chatbotSubtitle}>Get help instantly</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.85,
    height: height,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileSection: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  subMenuContainer: {
    paddingLeft: 52,
    paddingRight: 20,
    marginBottom: 8,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subMenuIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subMenuTitle: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  chatbotSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  chatbotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
  },
  chatbotIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotTextContainer: {
    marginLeft: 12,
  },
  chatbotTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  chatbotSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default CustomMenuDrawer;