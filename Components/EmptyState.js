import React from 'react';
import { View, Text, TouchableOpacity, Stylesheet } from 'react-native';  // Correct import
import { Ionicons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

export const EmptyState = ({ onPress, message = "No departments added yet" }) => (
  <TouchableOpacity
    style={styles.EmptyStateemptyContainer}
    onPress={onPress}
  >
    <View style={styles.EmptyStatedottedBox}>
      <Ionicons name="add-circle-outline" size={40} color="#4B6BFB" />
      <Text style={styles.EmptyStateaddText}>Add New</Text>
    </View>
    <Text style={styles.EmptyStatehelperText}>{message}</Text>
  </TouchableOpacity>
);


export default EmptyState;
