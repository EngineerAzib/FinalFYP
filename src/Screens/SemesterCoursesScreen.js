import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { CourseCard } from '../Components/CourseCard';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import SemesterCourse from '../Services/CoursesService/SemesterCourse';



export const SemesterCoursesScreen = ({ route }) => {
    const { department, semester } = route.params;
    console.log(department.id,"dept");
    console.log(semester.semesterId,"sem");

  const{course,error}=SemesterCourse({depId:department.id,semId:semester.semesterId})
    return (
      <View style={styles.SemesterCoursesScreencontainer}>
        <Header />
        <CustomHeader
          title="Courses"
          currentScreen={`${department.name}-Semester${semester}`}
          showSearch={false}
          showRefresh={false}
          // navigation={navigation}
        />
        <ScrollView style={styles.SemesterCoursesScreenscrollView}>
          {course.map((item) => (
            <CourseCard 
            key={item.id} 
            course={item} 
            departmentName={department.name} 
            semester={semester} 
          />

        ))}
      </ScrollView>
    </View>
  );
};
