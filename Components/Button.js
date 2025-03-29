import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../AdminPortal_Css';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  size = 'medium',
  style,
  textStyle,
  leftIcon,
  rightIcon
}) => {
  // Create animated value for press feedback
  const [pressAnim] = React.useState(new Animated.Value(1));

  // Handle press animation
  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Get dynamic styles based on variant and size
  const getButtonStyle = () => {
    const baseStyles = [
      styles.Buttonbutton,
      styles[`${size}Button`],
      styles[`${variant}Button`],
      disabled && styles[`disabled${variant.charAt(0).toUpperCase() + variant.slice(1)}Button`],
      style
    ];

    return baseStyles;
  };

  const getTextStyle = () => {
    return [
      styles.ButtonbuttonText,
      styles[`${size}ButtonText`],
      styles[`${variant}ButtonText`],
      disabled && styles[`disabled${variant.charAt(0).toUpperCase() + variant.slice(1)}ButtonText`],
      textStyle
    ];
  };

  // Get loader color based on variant
  const getLoaderColor = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
        return '#6C63FF';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Animated.View
      style={[
        styles.ButtonbuttonContainer,
        { transform: [{ scale: pressAnim }] }
      ]}
    >
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {loading ? (
          <ActivityIndicator
            color={getLoaderColor()}
            size={size === 'large' ? 'large' : 'small'}
          />
        ) : (
          <React.Fragment>
            {leftIcon && <View style={styles.ButtoniconLeft}>{leftIcon}</View>}
            <Text style={getTextStyle()}>{title}</Text>
            {rightIcon && <View style={styles.ButtoniconRight}>{rightIcon}</View>}
          </React.Fragment>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};


Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
};

export default Button;