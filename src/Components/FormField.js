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
import { Picker } from '@react-native-picker/picker';
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
  error,
  multiple = false, // Add multiple prop
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
  const renderLastValue = () =>
    lastValue && (
      <View style={styles.FormFieldlastValueContainer}>
        <Text style={styles.FormFieldlastValueText}>Previous: {lastValue}</Text>
      </View>
    );

  // Handle multiple selections for the Picker
  const handleMultipleSelect = (selectedValue) => {
    if (multiple) {
      // If multiple selections are allowed, update the value as an array
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(selectedValue)) {
        // If the value is already selected, remove it
        onChangeText(currentValues.filter((val) => val !== selectedValue));
      } else {
        // If the value is not selected, add it
        onChangeText([...currentValues, selectedValue]);
      }
    } else {
      // If single selection is allowed, update the value directly
      onChangeText(selectedValue);
    }
  };

  // Render input based on type
  const renderInput = () => {
    switch (type) {
      case 'date':
        return (
          <>
            <TouchableOpacity
              style={styles.FormFielddateInputContent}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={value ? styles.FormFieldinputText : styles.FormFieldplaceholderText}>
                {value || placeholder}
              </Text>
              <Ionicons name="calendar-outline" size={24} color="#6C63FF" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChangeText(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
                  }
                }}
              />
            )}
          </>
        );

      case 'time':
        return (
          <>
            <TouchableOpacity
              style={styles.FormFielddateInputContent}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={value ? styles.FormFieldinputText : styles.FormFieldplaceholderText}>
                {value || placeholder}
              </Text>
              <Ionicons name="time-outline" size={24} color="#6C63FF" />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    const hours = selectedTime.getHours().toString().padStart(2, '0');
                    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                    onChangeText(`${hours}:${minutes}`); // Format: HH:mm
                  }
                }}
              />
            )}
          </>
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

      case 'select':
        return (
          <View style={styles.FormFieldselectContainer}>
            <Picker
              selectedValue={multiple ? null : value} // Disable selectedValue for multiple selections
              onValueChange={handleMultipleSelect}
              style={styles.FormFieldselectInput}
              mode={multiple ? 'multiple' : 'dropdown'} // Add mode for multiple selections
            >
              <Picker.Item label={placeholder} value="" />
              {options.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>

            {/* Display selected values for multiple selections */}
            {multiple && Array.isArray(value) && value.length > 0 && (
              <View style={styles.FormFieldselectedValuesContainer}>
                {value.map((selectedValue, index) => (
                  <Text key={index} style={styles.FormFieldselectedValueText}>
                    {options.find((opt) => opt.value === selectedValue)?.label || selectedValue}
                  </Text>
                ))}
              </View>
            )}
          </View>
        );

      default:
        return (
          <TextInput
            style={[
              styles.FormFieldtextInput,
              inputStyle,
              error && styles.FormFieldinputError,
            ]}
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

  // Render error message
  const renderError = () =>
    error && <Text style={styles.FormFielderrorText}>{error}</Text>;

  return (
    <View style={[styles.FormFieldformFieldContainer, containerStyle]}>
      {renderLabel()}
      {renderLastValue()}
      <View
        style={[
          styles.FormFieldinputWrapper,
          isFocused && styles.FormFieldinputWrapperFocused,
          error && styles.FormFieldinputWrapperError,
        ]}
      >
        {renderInput()}
      </View>
      {renderError()}
    </View>
  );
};