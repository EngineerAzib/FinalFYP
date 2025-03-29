import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { DepartmentCard2 } from '../Components/DepartmentCard2';
import { CourseCard } from '../Components/CourseCard';

import styles from '../AdminPortal_Css';

const EnhancedCustomHeader = ({ navigation }) => (
  <View style={styles.DepartmentListScreen2enhancedHeader}>
    <CustomHeader
      title="Courses"
      currentScreen="Departments List"
      showSearch={true}
      showRefresh={false}
      navigation={navigation}
    />
  </View>
);
export const DepartmentListScreen2 = ({ navigation }) => {
  const departments = [
    { id: 1, name: 'Software Engineering', totalSemesters: 8 },
    { id: 2, name: 'Computer Science', totalSemesters: 8 },
  ];

  return (
    <View style={styles.DepartmentListScreen2container}>
      <Header />
      <EnhancedCustomHeader />
      <ScrollView style={styles.DepartmentListScreen2scrollView}>
        {departments.map((dept) => (
          <DepartmentCard2
            key={dept.id}
            department={dept}
            onPress={() => navigation.navigate('DepartmentSemestersScreen', { department: dept })}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddDepartmentScreen')}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};


