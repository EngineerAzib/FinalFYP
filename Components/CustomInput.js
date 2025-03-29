import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import styles from '../AdminPortal_Css';

export const CustomInput = ({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
}) => {
  return (
    <View style={styles.CustomInputcontainer}>
      <View style={styles.CustomInputlabelContainer}>
        <Text style={styles.CustomInputlabel}>{label}</Text>
        {required && <Text style={styles.CustomInputrequired}>*</Text>}
      </View>
      <View style={styles.CustomInputinputContainer}>
        <TextInput
          style={styles.CustomInputinput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

