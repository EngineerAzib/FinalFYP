
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StudentMenuDrawer from './StudentMenuDrawer';
import styles from '../AdminPortal_Css';
import { NotificationScreen } from '../Screens/NotificationScreen';

export const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Animation values
  const bellRotation = new Animated.Value(0);
  const menuScale = new Animated.Value(1);

  // Notification bell animation
  const animateBell = () => {
    Animated.sequence([
      Animated.timing(bellRotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bellRotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Menu icon animation
  const animateMenu = () => {
    Animated.sequence([
      Animated.timing(menuScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(menuScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const spin = bellRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });

  return (
    <>
      <View style={[styles.Headercontainer, { paddingTop: insets.top }]}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        <View style={styles.Headercontent}>
          {/* Menu Button with Scale Animation */}
          <Animated.View style={[{ transform: [{ scale: menuScale }] }]}>
            <TouchableOpacity
              style={styles.HeadericonButton}
              onPress={() => {
                animateMenu();
                setIsMenuVisible(true);
              }}
            >
              <Ionicons name="menu-outline" size={26} color="#1a1a1a" />
            </TouchableOpacity>
          </Animated.View>

          {/* Logo Section */}
          <View style={styles.HeaderlogoContainer}>
            <Text style={styles.HeaderlogoText}>Asaan Campus</Text>
          </View>

          {/* Right Icons Section */}
          <View style={styles.HeaderrightIcons}>
            {/* Notification Icon with Bell Animation */}
            <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
              <TouchableOpacity
                style={styles.HeadericonButton}
                onPress={() => {
                  animateBell();
                  navigation.navigate('NotificationScreen');
                }}
              >
                <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
                <View style={styles.Headerbadge}>
                  <Text style={styles.HeaderbadgeText}>2</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Admin Profile Picture */}
            <TouchableOpacity
              style={styles.HeaderprofileButton}
              onPress={() => navigation.navigate('AdminProfile')}
            >
              <Image
                source={require('../Assets/profileicon.png')} 
                style={styles.HeaderprofileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StudentMenuDrawer
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        navigation={navigation}
      />
    </>
  );
};
