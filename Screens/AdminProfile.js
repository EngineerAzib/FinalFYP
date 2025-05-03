import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, TouchableOpacity, Text, Image, Animated, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import HeaderBackground from '../Components/HeaderBackground ';
import styles from '../AdminPortal_Css';

const { width } = Dimensions.get('window');

// Enhanced AnimatedStatCard with light theme colors
const AnimatedStatCard = ({ title, value, icon, color, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 150,
      tension: 50,
      friction: 6,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <View style={[styles.AdminProfileglassCard, { backgroundColor: '#FFFFFF' }]}>
        <View style={[styles.AdminProfilestatIconContainer, { backgroundColor: color }]}>
          <MaterialIcons name={icon} size={22} color="#fff" />
        </View>
        <Text style={[styles.AdminProfilestatValue, { color: '#1a2b4b' }]}>{value}</Text>
        <Text style={[styles.AdminProfilestatTitle, { color: '#64748b' }]}>{title}</Text>
      </View>
    </Animated.View>
  );
};

// Enhanced ProfileSection with logout button
const ProfileSection = ({ scrollY, navigation }) => {
  const imageScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp'
  });



  return (
    <Animated.View style={[styles.AdminProfileprofileContainer, { opacity: headerOpacity }]}>


      <Animated.View style={[styles.AdminProfileavatarContainer, { transform: [{ scale: imageScale }] }]}>
        <Image source={require('../Assets/profileicon.png')} style={styles.AdminProfileavatar} />
        <View style={[styles.AdminProfilebadgeContainer, { backgroundColor: '#FFFFFF' }]}>
          <MaterialIcons name="verified" size={20} color="#6C63FF" />
        </View>
      </Animated.View>
      <Text style={[styles.AdminProfileuserName, { color: '#1a2b4b' }]}>Mr. Admin</Text>
    </Animated.View>
  );
};

// Enhanced DetailSection with light theme
const DetailSection = ({ title, icon, children, isExpanded, onToggle }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.timing(contentHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const maxHeight = contentHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return (
    <View style={[styles.AdminProfiledetailSection, { backgroundColor: '#FFFFFF' }]}>
      <TouchableOpacity onPress={onToggle} style={styles.AdminProfilesectionHeader} activeOpacity={0.7}>
        <View style={styles.AdminProfileheaderLeft}>
          <LinearGradient
            colors={['#6C63FF40', '#6C63FF20']}
            style={styles.AdminProfileheaderIcon}
          >
            <MaterialIcons name={icon} size={24} color="#6C63FF" />
          </LinearGradient>
          <Text style={[styles.AdminProfileheaderTitle, { color: '#1a2b4b' }]}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#6C63FF" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.AdminProfilesectionContent, { maxHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const AdminProfile = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expandedSection, setExpandedSection] = useState(null);

  const stats = [
    { title: 'Users Managed', value: '1,240', icon: 'group', color: '#6C63FF' },
    { title: 'Active Sessions', value: '320', icon: 'exit-to-app', color: '#6C63FF' },
    { title: 'Total Applications', value: '85', icon: 'event-note', color: '#6C63FF' }
  ];

  const personalInfo = [
    { label: 'Admin ID', value: 'ADMIN-00123' },
    { label: 'Email', value: 'admin@application.com' },
    { label: 'Phone', value: '+1 800 555 1234' },
    { label: 'Date Joined', value: 'Jan 1, 2022' }
  ];
 

  return (
    <View style={[styles.AdminProfilecontainer, { backgroundColor: '#F5F6FA' }]}>
      <StatusBar barStyle="dark-content" />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBackground
          imageSource={require('../Assets/bg.jpg')}
          overlayOpacity={0.3}
        />

        <ProfileSection scrollY={scrollY} navigation={navigation} />

        <View style={styles.AdminProfilestatsContainer}>
          {stats.map((stat, index) => (
            <AnimatedStatCard key={index} {...stat} index={index} />
          ))}
        </View>

        <View style={styles.AdminProfiledetailsContainer}>
          {/* Personal Information Section */}
          <DetailSection
            title="Personal Information"
            icon="person"
            isExpanded={expandedSection === 'personal'}
            onToggle={() => setExpandedSection(
              expandedSection === 'personal' ? null : 'personal'
            )}
          >
            {personalInfo.map((info, index) => (
              <View key={index} style={[styles.AdminProfileinfoRow, {
                borderBottomColor: '#E2E8F0'
              }]}>
                <Text style={[styles.AdminProfileinfoLabel, { color: '#64748b' }]}>{info.label}</Text>
                <Text style={[styles.AdminProfileinfoValue, { color: '#1a2b4b' }]}>{info.value}</Text>
              </View>
            ))}
          </DetailSection>

          {/* New Account Settings Section with Logout */}
          <DetailSection
            title="Account Settings"
            icon="settings"
            isExpanded={expandedSection === 'settings'}
            onToggle={() => setExpandedSection(
              expandedSection === 'settings' ? null : 'settings'
            )}
          >
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.AdminProfilelogoutRow}
            >
              <View style={styles.AdminProfilelogoutLeft}>
                <MaterialIcons name="logout" size={20} color="#ef4444" />
                <Text style={styles.AdminProfilelogoutText}>Logout</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
          </DetailSection>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
export default AdminProfile;

