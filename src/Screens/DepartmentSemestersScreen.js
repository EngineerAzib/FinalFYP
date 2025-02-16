import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';
import SemesterDepartment from '../Services/CoursesService/SemesterDepartment';

export const DepartmentSemestersScreen = ({ route, navigation }) => {
  // Extract department from route.params
  const { department } = route.params;  // department is passed from the previous screen

  const { semesterDepartment, error } = SemesterDepartment({ deptId: department.id });

  const [semesterList, setSemesterList] = useState([]);

  useEffect(() => {
    if (semesterDepartment && Array.isArray(semesterDepartment)) {
      setSemesterList(semesterDepartment);  // Assuming semesterDepartment is an array
    }
  }, [semesterDepartment]);

  return (
    <View style={styles.DepartmentSemestersScreencontainer}>
      <Header />
      <CustomHeader
        title="Courses"
        currentScreen={department.name || "Department Name"}  // Safely use department name
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView style={styles.DepartmentSemestersScreenscrollView}>
        <View style={styles.DepartmentSemestersScreensemesterGrid}>
          {semesterList.length > 0 ? (
            semesterList.map((semester, index) => (
              <TouchableOpacity
                key={index}
                style={styles.DepartmentSemestersScreensemesterCard}
                onPress={() => 
                  navigation.navigate('SemesterCoursesScreen', {
                    department,  // Pass department object
                    semester     // Pass semester object
                  })
                }
              >
                <View style={styles.DepartmentSemestersScreensemesterIconContainer}>
                  <FontAwesome5 name="book-reader" size={24} color="#4A6BD6" />
                </View>
                <Text style={styles.DepartmentSemestersScreensemesterTitle}>
                 {semester.semesterName}
                </Text>
                <Text style={styles.DepartmentSemestersScreencourseCount}>
                  {semester.courseCount} Courses
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.DepartmentSemestersNoDataText}>No semesters available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
