import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

const AllStudentsScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockStudents = [
    {
      id: 1,
      name: 'Hshdhd',
      department: 'Vssb',
      profileImage: null
    },
    {
      id: 2,
      name: 'Bdbdid',
      department: 'Ehbdbd',
      profileImage: null
    },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    // Example API call:
    /*
    const fetchStudents = async () => {
      try {
        const response = await fetch('your-api-endpoint/students');
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };
    fetchStudents();
    */

    // Using mock data for now
    setStudents(mockStudents);
    setLoading(false);
  }, []);

  const handleAddNew = () => {
    // Navigate to add new student screen
    navigation.navigate('AddStudentForm');
  };



  const handleView = (studentId) => {
    // Navigate to view student details screen
    navigation.navigate('StudentProfileView', { studentId });
  };

  const handleDelete = async (studentId) => {
    // TODO: Implement delete functionality with API
    /* Example implementation:
    try {
      await fetch(`your-api-endpoint/students/${studentId}`, {
        method: 'DELETE',
      });
      setStudents(students.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
    */
  };

  const StudentCard = ({ student }) => (
    <View style={styles.AllStudentsScreenstudentCard}>
      <View style={styles.AllStudentsScreenprofileImageContainer}>
        {student.profileImage ? (
          <Image source={{ uri: student.profileImage }} style={styles.AllStudentsScreenprofileImage} />
        ) : (
          <View style={styles.AllStudentsScreendefaultProfileImage}>
            <Ionicons name="person" size={40} color="#6B7280" />
          </View>
        )}
      </View>
      <Text style={styles.AllStudentsScreenstudentName}>{student.name}</Text>
      <Text style={styles.AllStudentsScreendepartmentName}>{student.department}</Text>
      <View style={styles.AllStudentsScreenactionButtons}>
        <TouchableOpacity onPress={() => handleView(student.id)} style={styles.AllStudentsScreenactionButton}>
          <Ionicons name="search" size={22} color="#6B7280" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleEdit(student.id)} style={styles.AllStudentsScreenactionButton}>
          <Ionicons name="pencil" size={22} color="#6B7280" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => handleDelete(student.id)} style={[styles.AllStudentsScreenactionButton, styles.AllStudentsScreendeleteButton]}>
          <Ionicons name="trash" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const AddNewCard = () => (
    <TouchableOpacity onPress={handleAddNew} style={styles.AllStudentsScreenaddNewCard}>
      <Ionicons name="add" size={32} color="#3B82F6" />
      <Text style={styles.AllStudentsScreenaddNewText}>Add New</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.AllStudentsScreencontainer}>
      <Header />
      <CustomHeader title="Students" currentScreen="All Students" />
      <ScrollView contentContainerStyle={styles.AllStudentsScreenscrollContent}>
        <View style={styles.AllStudentsScreencardsContainer}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
          <AddNewCard />
        </View>
      </ScrollView>
    </View>
  );
};



export default AllStudentsScreen;