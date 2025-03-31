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

const StudentMenuDrawer = ({ isVisible, onClose, navigation }) => {
  const [slideAnim] = useState(new Animated.Value(-width));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Menu items specifically for students
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      screen: 'StudentDashboardScreen',
      color: '#4F46E5'
    },
    {
      id: 'my-courses',
      title: 'My Courses',
      icon: 'school',
      screen: 'MyCoursesScreen',
      color: '#10B981'
    },
    {
      id: 'my-academics',
      title: 'My Academics',
      icon: 'menu-book',
      screen: 'StudentAcademicsView',
      color: '#F59E0B'
    },
    {
      id: 'attendance',
      title: 'My Attendance',
      icon: 'event-available',
      screen: 'StudentAttendanceScreen',
      color: '#EF4444'
    },
    {
      id: 'semester-registration',
      title: 'Semester Registration',
      icon: 'how-to-reg',
      screen: 'StudentSemesterRegistrationScreen',
      color: '#8B5CF6'
    },
    {
      id: 'exam-schedule',
      title: 'Exam Schedule',
      icon: 'event-note',
      screen: 'StudentExamScheduleScreen',
      color: '#EC4899'
    },
    {
      id: 'internships',
      title: 'Internships',
      icon: 'work',
      screen: 'StudentInternshipScreen',
      color: '#06B6D4'
    },
    {
      id: 'news',
      title: 'News',
      icon: 'article',
      screen: 'StudentNewsScreen',
      color: '#2563EB'
    },
    {
      id: 'events',
      title: 'Events',
      icon: 'event',
      screen: 'Events',
      color: '#7C3AED'
    }
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

    return (
      <View key={item.id}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: 'white' }
          ]}
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
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileDetails}>Computer Science - 6th Semester</Text>
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
                onPress={() => handleNavigation('AIAssistant')}
                activeOpacity={0.8}
              >
                <View style={styles.chatbotContent}>
                  <View style={styles.chatbotIconContainer}>
                    <MaterialIcons name="support-agent" size={24} color="#4F46E5" />
                  </View>
                  <View style={styles.chatbotTextContainer}>
                    <Text style={styles.chatbotTitle}>AI Assistant</Text>
                    <Text style={styles.chatbotSubtitle}>Get help with your studies</Text>
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

export default StudentMenuDrawer;