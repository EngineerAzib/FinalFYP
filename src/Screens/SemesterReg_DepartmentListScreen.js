import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

import { ExaminationScheduleDepList } from '../Services/ExaminationSchedule/ExaminationScheduleDepList';

export const SemesterReg_DepartmentListScreen = ({ navigation }) => {
  const [departments, setDepartments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await ExaminationScheduleDepList(); // Call the function with ()
        setDepartments(data);
        console.log(data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching department data. Please try again later.</Text>
      </View>
    );
  }

  const handleDepartmentPress = (deptCode, deptName) => {
    navigation.navigate('SemesterListScreen', {
      deptCode,
      deptName,
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
        {departments &&
          Object.entries(departments).map(([deptCode, deptName], index) => (
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