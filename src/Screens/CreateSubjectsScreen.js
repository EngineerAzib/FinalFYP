import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

const CreateSubjectsScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([
    {
      departmentId: '',
      year: '',
      semester: '',
      subjectName: '',
      theoryMarks: '',
      practicalMarks: '',
    }
  ]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching departments (Replace with API call)
    setDepartments([
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Electrical Engineering' },
    ]);
    setLoading(false);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addMoreSubjects = () => {
    setSubjects([
      ...subjects,
      {
        departmentId: '',
        year: '',
        semester: '',
        subjectName: '',
        theoryMarks: '',
        practicalMarks: '',
      }
    ]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async () => {
    // TODO: Implement API call to save subjects
    console.log('Subjects:', subjects);
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
                  label="Department"
                  placeholder="Select Department"
                  type="select"
                  required
                  value={subject.departmentId}  // ✅ Fixed value
                  onChangeText={(value) => handleInputChange(index, 'departmentId', value)} // ✅ Fixed handler
                />
                <FormField
                  required
                  label="Year"
                  dropdown
                  value={subject.year}
                  onValueChange={(value) => handleInputChange(index, 'year', value)} // ✅ Fixed handler
                  items={[
                    { label: '1st Year', value: '1' },
                    { label: '2nd Year', value: '2' },
                    { label: '3rd Year', value: '3' },
                    { label: '4th Year', value: '4' },
                  ]}
                  placeholder="Select Year"
                />

                <FormField
                  label="Semester"
                  required
                  dropdown
                  value={subject.semester}
                  onValueChange={(value) => handleInputChange(index, 'semester', value)} // ✅ Fixed handler
                  items={[
                    { label: '1st Semester', value: '1' },
                    { label: '2nd Semester', value: '2' },
                  ]}
                  placeholder="Select Semester"
                />

                <FormField
                  label="Subject Name"
                  required
                  value={subject.subjectName}
                  onChangeText={(value) => handleInputChange(index, 'subjectName', value)}
                  placeholder="Name Of Subject"
                />

                <FormField
                  label="Theory Marks"
                  required
                  value={subject.theoryMarks}
                  onChangeText={(value) => handleInputChange(index, 'theoryMarks', value)}
                  placeholder="Total Theory Marks"
                  keyboardType="numeric"
                />

                <FormField
                  label="Practical Marks"
                  value={subject.practicalMarks}
                  onChangeText={(value) => handleInputChange(index, 'practicalMarks', value)}
                  placeholder="Total Practical Marks (if any)"
                  keyboardType="numeric"
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
                  title: "Cancel",
                  onPress: () => navigation.goBack(),
                  variant: "secondary",
                },
                {
                  title: "Create Course",
                  onPress: handleSubmit,
                  variant: "primary",
                }
              ]}
            />
          </View>
      </View>
    </View>
  );
};

export default CreateSubjectsScreen;
