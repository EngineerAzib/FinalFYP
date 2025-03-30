import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const DepartmentSemestersScreen = ({ route, navigation }) => {
  const { department } = route.params;
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <View style={styles.DepartmentSemestersScreencontainer}>
      <Header />
      <CustomHeader
        title="Courses"
        currentScreen={`${department.name}`}
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView style={styles.DepartmentSemestersScreenscrollView}>
        <View style={styles.DepartmentSemestersScreensemesterGrid}>
          {semesters.map((semester) => (
            <TouchableOpacity
              key={semester}
              style={styles.DepartmentSemestersScreensemesterCard}
              onPress={() => navigation.navigate('SemesterCoursesScreen', {
                department,
                semester
              })}
            >
              <View style={styles.DepartmentSemestersScreensemesterIconContainer}>
                <FontAwesome5 name="book-reader" size={24} color="#4A6BD6" />
              </View>
              <Text style={styles.DepartmentSemestersScreensemesterTitle}>Semester {semester}</Text>
              <Text style={styles.DepartmentSemestersScreencourseCount}>5 Courses</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
