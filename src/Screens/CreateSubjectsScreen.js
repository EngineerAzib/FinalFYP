import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetTeacherList from '../Services/CoursesService/GetTeacherList';
import GetSemesterList from '../Services/CoursesService/SemesterList';
import GetCourseList from '../Services/CoursesService/GetCourseList';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

const CreateSubjectsScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([
    {
      name: '',
      initialName: '',
      isElective: false,
      credits: '',
      departmentId: '',
      semesterId: '',
      teacherId: '',
      prerequisiteIds: [], // Ensure this is always an array
    },
  ]);

  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await GetDepartmentList();
        const teachersData = await GetTeacherList();
        const semestersData = await GetSemesterList();
        const coursesData = await GetCourseList();

        setDepartments(departmentsData);
        setTeachers(teachersData);
        setSemesters(semestersData);
        setPrerequisites(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    if (field === 'prerequisiteIds') {
      // Ensure prerequisiteIds is always an array
      updatedSubjects[index][field] = Array.isArray(value) ? value : [];
    } else {
      updatedSubjects[index][field] = value;
    }
    setSubjects(updatedSubjects);
  };

  const addMoreSubjects = () => {
    setSubjects([
      ...subjects,
      {
        name: '',
        initialName: '',
        isElective: false,
        credits: '',
        departmentId: '',
        semesterId: '',
        teacherId: '',
        prerequisiteIds: [], // Ensure this is always an array
      },
    ]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const validateSubject = (subject) => {
    if (!subject.name || !subject.initialName) {
      throw new Error('Subject name and initial name are required.');
    }
    if (isNaN(subject.credits)) {
      throw new Error('Credits must be a number.');
    }
    if (isNaN(subject.departmentId)) {
      throw new Error('Department ID must be a number.');
    }
    if (isNaN(subject.semesterId)) {
      throw new Error('Semester ID must be a number.');
    }
    if (isNaN(subject.teacherId)) {
      throw new Error('Teacher ID must be a number.');
    }
    if (!Array.isArray(subject.prerequisiteIds)) {
      throw new Error('Prerequisite IDs must be an array.');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const subject of subjects) {
        validateSubject(subject);

        const payload = {
          name: subject.name,
          initialName: subject.initialName,
          isElective: subject.isElective,
          credits: parseInt(subject.credits, 10),
          departmentId: parseInt(subject.departmentId, 10),
          semesterId: parseInt(subject.semesterId, 10),
          teacherId: parseInt(subject.teacherId, 10),
          prerequisiteIds: Array.isArray(subject.prerequisiteIds)
            ? subject.prerequisiteIds.map((id) => parseInt(id, 10))
            : [], // Default to an empty array
        };
        console.log('Payload:', payload);

        const response = await axios.post(`${API_BASE_URL}/api/Course/add-course`, payload);
        console.log('Subject created successfully:', response.data);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error creating subjects:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.CreateSubjectsScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Courses"
        currentScreen="Create Course"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateSubjectsScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateSubjectsScreenscrollContent}
        >
          <Text style={styles.CreateSubjectsScreenformTitle}>Add New Courses</Text>

          <View style={styles.CreateSubjectsScreenlegendContainer}>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenrequiredDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenoptionalDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Course Information">
            {subjects.map((subject, index) => (
              <View key={index}>
                <FormField
                  label="Subject Name"
                  required
                  value={subject.name}
                  onChangeText={(value) => handleInputChange(index, 'name', value)}
                  placeholder="Enter subject name"
                />

                <FormField
                  label="Initial Name"
                  required
                  value={subject.initialName}
                  onChangeText={(value) => handleInputChange(index, 'initialName', value)}
                  placeholder="Enter subject code (e.g., CS101)"
                />

                <FormField
                  label="Credits"
                  required
                  value={subject.credits}
                  onChangeText={(value) => handleInputChange(index, 'credits', value)}
                  placeholder="Enter number of credits"
                  keyboardType="numeric"
                />

                <FormField
                  label="Department"
                  placeholder="Select Department"
                  type="select"
                  required
                  value={subject.departmentId}
                  onChangeText={(value) => handleInputChange(index, 'departmentId', value)}
                  options={departments.map((dept) => ({
                    label: dept.departmentName,
                    value: dept.id.toString(),
                  }))}
                />

                <FormField
                  label="Semester"
                  placeholder="Select Semester"
                  type="select"
                  required
                  value={subject.semesterId}
                  onChangeText={(value) => handleInputChange(index, 'semesterId', value)}
                  options={semesters.map((sem) => ({
                    label: sem.semesterName,
                    value: sem.id.toString(),
                  }))}
                />

                <FormField
                  label="Teacher"
                  placeholder="Select Teacher"
                  type="select"
                  required
                  value={subject.teacherId}
                  onChangeText={(value) => handleInputChange(index, 'teacherId', value)}
                  options={teachers.map((teacher) => ({
                    label: teacher.name,
                    value: teacher.id.toString(),
                  }))}
                />

<FormField
  label="Prerequisites"
  placeholder="Select Prerequisites"
  type="select"
  multiple // Allow multiple selections
  value={subject.prerequisiteIds || []} // Ensure value is always an array
  onChangeText={(value) => handleInputChange(index, 'prerequisiteIds', value)}
  options={prerequisites.map((course) => ({
    label: course.name, // Display course name
    value: course.id.toString(), // Save course ID as a string
  }))}
/>
              </View>
            ))}
          </SectionContainer>

          <View style={styles.CreateSubjectsScreenbuttonContainer}>
            <TouchableOpacity
              style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenaddButton]}
              onPress={addMoreSubjects}
            >
              <Text style={styles.CreateSubjectsScreenbuttonText}>+ Add More</Text>
            </TouchableOpacity>

            {subjects.length > 1 && (
              <TouchableOpacity
                style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenremoveButton]}
                onPress={() => removeSubject(subjects.length - 1)}
              >
                <Text style={styles.CreateSubjectsScreenremoveButtonText}>− Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              {
                title: 'Cancel',
                onPress: () => navigation.goBack(),
                variant: 'secondary',
              },
              {
                title: 'Create Course',
                onPress: handleSubmit,
                variant: 'primary',
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateSubjectsScreen;