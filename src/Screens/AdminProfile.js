import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, TouchableOpacity, Text, Image, Animated, StatusBar, Alert,ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import HeaderBackground from '../Components/HeaderBackground ';
import styles from '../AdminPortal_Css';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import { API_BASE_URL } from '../Services/Config';
import { useAuth } from '../../shared/AuthContext';

// Profile API Service (moved to the same file for clarity)
const fetchProfile = async () => {
  try {
    console.log("Fetching profile...");
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');
    
    const cleanToken = token.replace(/['"]/g, '').trim();
    console.log("Using Token:", cleanToken);

    const response = await axios({
      method: 'get',
      url: `${API_BASE_URL}/api/Dashboard/GetProfileInfo`,
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log("API Response:", response.data);
    return response.data;

  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userToken');
      Alert.alert("Session Expired", "Your session has expired. Please login again");
    }
    
    throw error;
  }
};

// AnimatedStatCard component remains the same
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

// ProfileSection component remains the same
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

// DetailSection component remains the same
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
  const [personalInfo, setPersonalInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signOut } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expandedSection, setExpandedSection] = useState(null);

  const stats = [
    { title: 'Users Managed', value: '1,240', icon: 'group', color: '#6C63FF' },
    { title: 'Active Sessions', value: '320', icon: 'exit-to-app', color: '#6C63FF' },
    { title: 'Total Applications', value: '85', icon: 'event-note', color: '#6C63FF' }
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfile();
      console.log("API Data:", data);
      
      // Transform API response to match your UI structure
      const formattedData = [
        { label: 'Admin ID', value: data.adminID || 'N/A' },
        { label: 'Email', value: data.email || 'N/A' },
        { label: 'Phone', value: data.phone || 'N/A' }
      ];
      
      setPersonalInfo(formattedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || 'Failed to load profile data');
      Alert.alert("Error", "Failed to load profile information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        await axios.post(`${API_BASE_URL}/api/Account/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      try {
        await AsyncStorage.multiRemove(['userToken', 'userRole']);
        await signOut();
        navigation.navigate('AuthScreen');
      } catch (err) {
        console.error('Error clearing storage:', err);
      }
    }
  };

  return (
    <View style={[styles.AdminProfilecontainer, { backgroundColor: '#F5F6FA' }]}>
      <StatusBar barStyle="dark-content" />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchData}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

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