import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const ExamScheduleDepartmentScreen = ({ navigation }) => {
  const departments = {
    SE: "Software Engineering",
    CS: "Computer Science",
    EE: "Electrical Engineering"
  };

  const handleDepartmentPress = (deptCode, deptName) => {
    navigation.navigate('ExamScheduleYearScreen', {
      deptCode,
      deptName
    });
  };

  return (
    <View style={styles.ExamScheduleViewcontainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="Select Department"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView style={styles.ExamScheduleViewscrollView}>
        {Object.entries(departments).map(([deptCode, deptName], index) => (
          <View key={deptCode}>
            {index > 0 && <View style={styles.ExamScheduleViewseparator} />}
            <TouchableOpacity
              style={styles.ExamScheduleViewdepartmentCard}
              onPress={() => handleDepartmentPress(deptCode, deptName)}
            >
              <View style={styles.ExamScheduleViewdepartmentHeader}>
                <View style={styles.ExamScheduleViewdepartmentTitleContainer}>
                  <View style={styles.ExamScheduleViewiconContainer}>
                  <MaterialIcons name="date-range" size={24} color="#6C63FF" />
                  </View>
                  <Text style={styles.ExamScheduleViewdepartmentTitle}>{deptName}</Text>
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
