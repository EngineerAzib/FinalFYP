import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterReg_DepartmentListScreen = ({ navigation }) => {
  const departments = {
    SE: "Software Engineering",
    CS: "Computer Science",
    EE: "Electrical Engineering",
  };

  const handleDepartmentPress = (deptCode, deptName) => {
    navigation.navigate('SemesterListScreen', {
      deptCode,
      deptName,
    });
  };

  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registration"
        currentScreen="Select Dept"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView style={styles.SemesterRegistrationViewscrollView}>
        {Object.entries(departments).map(([deptCode, deptName], index) => (
          <View key={deptCode}>
            {index > 0 && <View style={styles.SemesterRegistrationViewdepartmentSeparator} />}
            <TouchableOpacity
              style={styles.SemesterRegistrationViewdepartmentContainer}
              onPress={() => handleDepartmentPress(deptCode, deptName)}
            >
              <View style={styles.SemesterRegistrationViewdepartmentHeader}>
                <View style={styles.SemesterRegistrationViewdepartmentTitleContainer}>
                  <MaterialIcons name="domain" size={24} color="#6C63FF" />
                  <Text style={styles.SemesterRegistrationViewdepartmentTitle}>{deptName}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#6C63FF" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};