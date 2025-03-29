import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const ExamScheduleYearScreen = ({ navigation, route }) => {
  const { deptCode, deptName } = route.params;

  const years = {
    1: "First Year",
    2: "Second Year",
    3: "Third Year",
    4: "Fourth Year"
  };

  const handleYearPress = (yearNum, yearName) => {
    navigation.navigate('ExamScheduleDetailsScreen', {
      deptCode,
      deptName,
      yearNum,
      yearName
    });
  };

  return (
    <View style={styles.ExamScheduleViewcontainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="Select Year"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.EditSemesterRegistrationheaderInfo}>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="domain" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>{`${deptName || deptCode} - Year?`}</Text>
          </View>
        </View>

        {Object.entries(years).map(([yearNum, yearName], index) => (
          <View key={yearNum}>
            {/* {index > 0 && <View style={styles.ExamScheduleViewseparator} />} */}
            <TouchableOpacity
              style={styles.ExamScheduleViewyearCard}
              onPress={() => handleYearPress(yearNum, yearName)}
            >
              <View style={styles.ExamScheduleViewyearHeader}>
                <View style={styles.ExamScheduleViewyearTitleContainer}>
                  <View style={styles.ExamScheduleViewyearIconContainer}>
                    <MaterialIcons name="event" size={24} color="#6C63FF" />
                  </View>
                  <Text style={styles.ExamScheduleViewyearTitle}>{yearName}</Text>
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