import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';
import GetAllTeacher from '../Services/Teacher/GetAllTeacher.js';

const AllTeachersScreen = ({ navigation }) => {
const{teacher}=GetAllTeacher();
console.log(teacher,"Az");

  // Mock data for demonstration - expanded to include teacher-specific fields
  const mockTeachers = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      department: 'Computer Science',
      designation: 'Associate Professor',
      expertise: 'Machine Learning',
      profileImage: null
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      department: 'Software Engineering',
      designation: 'Assistant Professor',
      expertise: 'Software Architecture',
      profileImage: null
    },
  ];

  

  const handleAddNew = () => {
    // Navigate to add new teacher screen
    navigation.navigate('AddTeacher');
  };



  const handleView = (teacherId) => {
    // Navigate to view teacher details screen
    navigation.navigate('TeacherViewScreen', { teacherId });
    console.log(teacherId,"Azi")
  };

  const handleDelete = async (teacherId) => {
    // TODO: Implement delete functionality with API
    /* Example implementation:
    try {
      await fetch(`your-api-endpoint/teachers/${teacherId}`, {
        method: 'DELETE',
      });
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
    */
  };

  const TeacherCard = ({ teacher }) => (
    <View style={styles.AllTeacherScreenteacherCard}>
      <View style={styles.AllTeacherScreenprofileImageContainer}>
        {teacher.profileImage ? (
          <Image source={{ uri: teacher.profileImage }} style={styles.AllTeacherScreenprofileImage} />
        ) : (
          <View style={styles.AllTeacherScreendefaultProfileImage}>
            <Ionicons name="person" size={40} color="#6B7280" />
          </View>
        )}
      </View>
      <Text style={styles.AllTeacherScreenteacherName}>{teacher.name}</Text>
      <Text style={styles.AllTeacherScreendepartmentName}>{teacher.department}</Text>
      <Text style={styles.AllTeacherScreendesignationText}>{teacher.designation}</Text>
      <Text style={styles.AllTeacherScreenexpertiseText}>{teacher.expertise}</Text>
      <View style={styles.AllTeacherScreenactionButtons}>
        <TouchableOpacity onPress={() => handleView(teacher.id)} style={styles.AllTeacherScreenactionButton}>
          <Ionicons name="search" size={22} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(teacher.id)} style={[styles.AllTeacherScreenactionButton, styles.AllTeacherScreendeleteButton]}>
          <Ionicons name="trash" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const AddNewCard = () => (
    <TouchableOpacity onPress={handleAddNew} style={styles.AllTeacherScreenaddNewCard}>
      <Ionicons name="add" size={32} color="#3B82F6" />
      <Text style={styles.AllTeacherScreenaddNewText}>Add New</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.AllTeacherScreencontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="All Teachers"
        showSearch={true}
        showRefresh={false}
      />
      <ScrollView contentContainerStyle={styles.AllTeacherScreenscrollContent}>
        <View style={styles.AllTeacherScreencardsContainer}>
          {teacher.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
          <AddNewCard />
        </View>
      </ScrollView>
    </View>
  );
};



export default AllTeachersScreen;