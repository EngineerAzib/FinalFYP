import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterReg_DepartmentListScreen = ({ navigation, route }) => {
  // Using the same data structure from the original code
  const registrationData = {
    SE: {
      name: "Software Engineering",
      semesters: {
        5: {
          semester: "5th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "SE501",
              name: "Software Design Patterns",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. John Smith",
              maxStudents: 50,
              prerequisites: ["SE401", "SE402"]
            },
            {
              code: "SE502",
              name: "Web Engineering",
              creditHours: 4,
              type: "Theory + Lab",
              instructor: "Dr. Sarah Wilson",
              labInstructor: "Mr. David Brown",
              maxStudents: 40,
              prerequisites: ["SE403"]
            },
            {
              code: "SE503",
              name: "Software Quality Assurance",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Michael Johnson",
              maxStudents: 45,
              prerequisites: []
            },
            {
              code: "SE504",
              name: "Cloud Computing",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Emily Davis",
              maxStudents: 50,
              prerequisites: ["SE401"]
            },
            {
              code: "SE505",
              name: "Machine Learning",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Robert Wilson",
              maxStudents: 45,
              prerequisites: ["SE402", "MT401"]
            }
          ]
        },
        6: {
          semester: "6th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "SE601",
              name: "Software Project Management",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Alice Johnson",
              maxStudents: 50,
              prerequisites: ["SE501"]
            }
          ]
        }
      }
    },
    CS: {
      name: "Computer Science",
      semesters: {
        5: {
          semester: "5th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "CS501",
              name: "Advanced Algorithms",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. James Wilson",
              maxStudents: 45,
              prerequisites: ["CS401"]
            }
          ]
        }
      }
    }
  };


  const handleDepartmentPress = (deptCode, deptName) => {
    if (!registrationData[deptCode]) {
      console.error(`Error: Department ${deptCode} not found in registrationData`);
      return;
    }

    navigation.navigate('SemesterListScreen', {
      deptCode,
      deptName,
      semesters: registrationData[deptCode].semesters // Ensure semesters exist
    });
  };


  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registeration "
        currentScreen="Select Dept"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView style={styles.SemesterRegistrationViewscrollView}>
        {Object.entries(registrationData).map(([deptCode, deptData], index) => (
          <View key={deptCode}>
            {index > 0 && <View style={styles.SemesterRegistrationViewdepartmentSeparator} />}
            <TouchableOpacity
              style={styles.SemesterRegistrationViewdepartmentContainer}
              onPress={() => handleDepartmentPress(deptCode, deptData.name)}
            >
              <View style={styles.SemesterRegistrationViewdepartmentHeader}>
                <View style={styles.SemesterRegistrationViewdepartmentTitleContainer}>
                  <MaterialIcons name="domain" size={24} color="#6C63FF" />
                  <Text style={styles.SemesterRegistrationViewdepartmentTitle}>{deptData.name}</Text>
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