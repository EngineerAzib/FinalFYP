import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterListScreen = ({ navigation, route }) => {
  const { deptCode, deptName } = route.params;

  const semesters = {
    1: "1th Semester",
    2: "2th Semester",
    3: "3th Semester",
    4: "4th Semester",
    5: "5th Semester",
    6: "6th Semester",
    7: "7th Semester",
    8: "8th Semester",
  };

  const handleSemesterPress = (semesterNumber, semesterName) => {
    navigation.navigate('SemesterDetailsScreen', {
      deptCode,
      deptName,
      semesterNumber,
      semesterName,
    });
  };

  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semesters"
        currentScreen="Select Semester"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.EditSemesterRegistrationheaderInfo}>
          <View style={styles.EditSemesterRegistrationinfoItem}>
            <MaterialIcons name="domain" size={24} color="#6C63FF" />
            <Text style={styles.EditSemesterRegistrationinfoText}>
              {deptName || deptCode}
            </Text>
          </View>
        </View>

        {Object.entries(semesters).map(([semesterNumber, semesterName], index) => (
          <View key={semesterNumber}>
            <TouchableOpacity
              style={styles.SemesterRegistrationViewcard}
              onPress={() => handleSemesterPress(semesterNumber, semesterName)}
            >
              <View style={styles.SemesterRegistrationViewcardHeader}>
                <View style={styles.SemesterRegistrationViewtitleToggleContainer}>
                  <MaterialIcons name="event-note" size={24} color="#6C63FF" />
                  <View style={styles.SemesterRegistrationViewsemesterInfoContainer}>
                    <Text style={styles.SemesterRegistrationViewcardTitle}>
                      {semesterName}
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#6C63FF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};