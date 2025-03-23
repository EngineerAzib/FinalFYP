// toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ToastConfig = {
  success: ({ text1, props }) => (
    <View style={styles.successToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({ text1, props }) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    width: '90%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorToast: {
    width: '90%',
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});