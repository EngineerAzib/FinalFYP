import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { FormField } from './FormField';
import { useNavigation } from '@react-navigation/native';
import styles from '../AdminPortal_Css';

export const CourseCard = ({ course, route, departmentName, semester }) => {
  const navigation = useNavigation();



  const handleEdit = () => {
    navigation.navigate('EditCourseScreen', {
      courseData: {
        name: course.name,
        creditHours: course.creditHours,
        instructor: course.instructor,
        code: course.code,
        id: course.id,

      },
      departmentName,
      semester,
    });
  };

  return (
    <View style={styles.CourseCardcourseCard}>
      <View style={styles.CourseCardcourseHeader}>
        <View style={styles.CourseCardcourseIconContainer}>
          <MaterialIcons name="book" size={24} color="#4A6BD6" />
        </View>
        <View style={styles.CourseCardcourseInfo}>
          <Text style={styles.CourseCardcourseCode}>{course.code}</Text>
          <Text style={styles.CourseCardcourseName}>{course.name}</Text>
        </View>
        <TouchableOpacity
          onPress={handleEdit}
          style={styles.CourseCardeditButton}
        >
          <MaterialIcons name="edit" size={20} color="#4A6BD6" />
        </TouchableOpacity>
      </View>
      <View style={styles.CourseCardcourseDetails}>
        <View style={styles.CourseCarddetailItem}>
          <MaterialIcons name="access-time" size={20} color="#6B7280" />
          <Text style={styles.CourseCarddetailText}>{course.creditHours} Credit Hours</Text>
        </View>
        <View style={styles.CourseCarddetailItem}>
          <MaterialIcons name="person" size={20} color="#6B7280" />
          <Text style={styles.CourseCarddetailText}>{course.instructor}</Text>
        </View>
      </View>
    </View>
  );
};


