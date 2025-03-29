import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Stylesheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import styles from '../AdminPortal_Css';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedRing = ({ percentage, color, size = 80 }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const radius = size * 0.4; 
  const strokeWidth = size * 0.1;

  React.useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [percentage]);

  const circleCircumference = 2 * Math.PI * radius;
  const dashOffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circleCircumference, 0],
  });

  return (
    <View style={[styles.DepartmentStatsringWrapper, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.DepartmentStatssvg}>
        {/* Background circle with gradient */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F0F2F5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circleCircumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.DepartmentStatspercentageContainer}>
        <Animated.Text style={[styles.DepartmentStatspercentageText, { fontSize: size * 0.2 }]}>
          {animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0', percentage.toString()],
          })}%
        </Animated.Text>
      </View>
    </View>
  );
};

const DepartmentStats = ({ department, onEdit, onDelete }) => {
  const { name, totalStudents, genderStats } = department;

  return (
    <View style={styles.DepartmentStatsdepartmentCard}>
      <View style={styles.DepartmentStatscardHeader}>
        <View style={styles.DepartmentStatsheaderLeft}>
          <MaterialCommunityIcons name="domain" size={28} color="#4B6BFB" />
          <Text style={styles.DepartmentStatsdepartmentName}>{name}</Text>
        </View>
        <View style={styles.DepartmentStatsheaderActions}>
          <TouchableOpacity 
            onPress={onEdit} 
            style={[styles.DepartmentStatsactionButton, styles.DepartmentStatseditButton]}
          >
            <MaterialCommunityIcons name="pencil" size={20} color="#4B6BFB" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onDelete} 
            style={[styles.DepartmentStatsactionButton, styles.DepartmentStatsdeleteButton]}
          >
            <MaterialCommunityIcons name="delete" size={20} color="#FF4B55" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.DepartmentStatscardContent}>
        <View style={styles.DepartmentStatstotalStudentsSection}>
          <View style={styles.DepartmentStatstotalStudentsHeader}>
            <MaterialCommunityIcons name="school" size={24} color="#4B6BFB" />
            <Text style={styles.DepartmentStatstotalStudentsLabel}>Total Students</Text>
          </View>
          <Text style={styles.DepartmentStatstotalStudentsCount}>{totalStudents}</Text>
        </View>

        <View style={styles.DepartmentStatsgenderStats}>
          <View style={styles.DepartmentStatsstatColumn}>
            <AnimatedRing percentage={genderStats.boys.percentage} color="#4B6BFB" size={90} />
            <View style={styles.DepartmentStatsstatInfo}>
              <Text style={styles.DepartmentStatsstatLabel}>Male Students</Text>
              <Text style={styles.DepartmentStatsstatCount}>{genderStats.boys.count}</Text>
            </View>
          </View>

          <View style={styles.DepartmentStatsstatColumn}>
            <AnimatedRing percentage={genderStats.girls.percentage} color="#FF69B4" size={90} />
            <View style={styles.DepartmentStatsstatInfo}>
              <Text style={styles.DepartmentStatsstatLabel}>Female Students</Text>
              <Text style={styles.DepartmentStatsstatCount}>{genderStats.girls.count}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DepartmentStats;
