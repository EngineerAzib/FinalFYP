import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../AdminPortal_Css';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const FormField = ({
  label,
  placeholder,
  required = false,
  value,
  onChangeText,
  type = 'text',
  maxSize,
  lastValue,
  options = [],
  keyboardType,
  containerStyle,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Render label
  const renderLabel = () => (
    <View style={styles.FormFieldlabelContainer}>
      <Text
        style={[
          styles.FormFieldlabelText,
          required ? styles.FormFieldrequiredLabel : styles.FormFieldoptionalLabel,
        ]}
      >
        {label}
        {required ? ' *' : ' (Optional)'}
      </Text>
    </View>
  );

  // Render last value
  const renderLastValue = () => (
    lastValue && (
      <View style={styles.FormFieldlastValueContainer}>
        <Text style={styles.FormFieldlastValueText}>
          Previous: {lastValue}
        </Text>
      </View>
    )
  );

  // Render input based on type
  const renderInput = () => {
    switch (type) {
      case 'date':
        return (
          <TouchableOpacity
            style={styles.FormFielddateInputContent}
            onPress={() => setShowPicker(true)}
          >
            <Text style={value ? styles.FormFieldinputText : styles.FormFieldplaceholderText}>
              {value || placeholder}
            </Text>
            <Ionicons name="calendar-outline" size={24} color="#6C63FF" />
            {Platform.OS === 'android' && showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    onChangeText(selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
          </TouchableOpacity>
        );

      case 'file':
        return (
          <View style={styles.FormFieldfileInputContent}>
            <TouchableOpacity
              style={styles.FormFieldfileChooseButton}
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });

                if (!result.canceled) {
                  onChangeText(result.assets[0].uri);
                }
              }}
            >
              <Text style={styles.FormFieldfileChooseText}>Choose File</Text>
            </TouchableOpacity>
            <Text style={styles.FormFieldfileStatusText}>
              {value ? 'File selected' : 'No file chosen'}
            </Text>
          </View>
        );

      default:
        return (
          <TextInput
            style={[styles.FormFieldtextInput, inputStyle]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#ADB5BD"
            keyboardType={keyboardType || 'default'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        );
    }
  };

  return (
    <View style={[styles.FormFieldformFieldContainer, containerStyle]}>
      {renderLabel()}
      {renderLastValue()}
      <View
        style={[
          styles.FormFieldinputWrapper,
          isFocused && styles.FormFieldinputWrapperFocused,
        ]}
      >
        {renderInput()}
      </View>
    </View>
  );
};