import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * A reusable footer button container that can hold single or multiple buttons.
 * @param {Object} props
 * @param {Object} props.buttons - Object containing button configurations
 * @param {Object} [props.style] - Additional styles for the footer container
 */
export const CustomButton = ({ buttons = [], style }) => { // Default to empty array if buttons is undefined
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={[styles.buttonContainer, style]}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              button.variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
              button.disabled && styles.disabledButton,
              index === 0 ? styles.cancelButton : styles.createButton,
            ]}
            onPress={button.onPress}
            disabled={button.disabled}
          >
            {button.icon && (
              <View style={styles.iconContainer}>
                <button.icon 
                  size={20} 
                  color={button.variant === 'primary' ? '#FFFFFF' : '#6C63FF'} 
                />
              </View>
            )}
            <Text
              style={[
                styles.buttonText,
                button.variant === 'primary' ? styles.primaryText : styles.secondaryText,
                button.disabled && styles.disabledText
              ]}
            >
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#6C63FF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  cancelButton: {
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  createButton: {
    marginLeft: 8,
    backgroundColor: '#6C63FF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#6C63FF',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  iconContainer: {
    marginRight: 8,
  },
});
