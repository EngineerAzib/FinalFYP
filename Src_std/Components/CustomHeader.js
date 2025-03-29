import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../AdminPortal_Css';

export const CustomHeader = ({
  title = "Students",
  showSearch = true,
  showRefresh = true,
  currentScreen = 'all',
  onSearch = () => {},
}) => {
  const insets = useSafeAreaInsets();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarHeight = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (isSearchActive) {
      // Collapse search bar
      Animated.parallel([
        Animated.timing(searchBarHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsSearchActive(false);
        setSearchQuery('');
        Keyboard.dismiss();
      });
    } else {
      // Expand search bar
      setIsSearchActive(true);
      Animated.parallel([
        Animated.timing(searchBarHeight, {
          toValue: 50,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View style={[styles.CustomHeadercustomHeaderContainer, { paddingTop: insets.top }]}>
      {/* Main Header Content */}
      <View style={styles.CustomHeadercustomHeaderContent}>
        {/* Title and Screen Info Section */}
        <View style={styles.CustomHeaderleftSection}>
          <Text style={styles.CustomHeaderheaderTitle}>{title}</Text>
          <Text style={styles.CustomHeaderseparator}>|</Text>
          <View style={[
            styles.CustomHeaderscreenIndicator,
            currentScreen === 'all' && styles.CustomHeaderactiveScreenIndicator
          ]}>
            <Ionicons
              name="home-outline"
              size={20}
              color={currentScreen === 'all' ? '#4B6BFB' : '#666'}
            />
            <Text style={[
              styles.CustomHeaderscreenText,
              currentScreen === 'all' && styles.CustomHeaderactiveScreenText
            ]}>
              {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
            </Text>
          </View>
        </View>

        {/* Icons Section */}
        <View style={styles.CustomHeaderrightSection}>
          {showRefresh && (
            <View style={styles.CustomHeadericonContainer}>
              <Ionicons name="refresh-outline" size={20} color="#666" />
            </View>
          )}

          {showSearch && (
            <TouchableOpacity 
              style={styles.CustomHeadersearchContainer}
              onPress={toggleSearch}
            >
              <Ionicons 
                name={isSearchActive ? "close-outline" : "search-outline"} 
                size={20} 
                color="#666" 
              />
              {!isSearchActive && (
                <Text style={styles.CustomHeadersearchText}>Search</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Expandable Search Bar */}
      <Animated.View style={{
        height: searchBarHeight,
        opacity: searchBarOpacity,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
          paddingHorizontal: 12,
          height: 36,
        }}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 16,
              color: '#1F2937',
            }}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={isSearchActive}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};