import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import styles from '../AdminPortal_Css';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ value, size, strokeWidth, duration, label, scale, color }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const maxValue = scale || 4.0;
    const clampedValue = Math.min(value, maxValue); 
    const percentage = (clampedValue / maxValue) * 100;

    animatedValue.setValue(0);

    setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: percentage,
        duration: duration || 5000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start();
    }, 500);
  }, [value]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotateZ: '-90deg' }] }}>
        <G>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EEF0FB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <AnimatedCircle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color || '#6C63FF'}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      <View style={{
        position: 'absolute',
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: size * 0.25,
          fontWeight: '700',
          color: color || '#6C63FF',
        }}>
          {value.toFixed(2)}
        </Text>
        {label && (
          <Text style={{
            fontSize: size * 0.12,
            color: '#6B7280',
            marginTop: 4,
          }}>
            {label}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CircularProgress;