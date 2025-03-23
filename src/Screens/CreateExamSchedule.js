import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import GetYearlist from '../Services/ExaminationSchedule/GetYearlist';
import GetDepartmentList from '../Services/CoursesService/GetDepartmentList';
import GetSemesterList from '../Services/CoursesService/SemesterList';
import GetCourseList from '../Services/CoursesService/GetCourseList';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

export const CreateExamSchedule = ({ navigation }) => {
  // State for dropdown options
  const [departments, setDepartments] = useState([]);
  const [year, setYear] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Data State
  const [examDate, setExamDate] = useState(new Date()); // State for examDate (initialized to current date)
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility
  const [examDay, setExamDay] = useState(''); // State for examDay
  const [examSchedule, setExamSchedule] = useState([{
    slots: [{
      time: '',
      courseId: '', // Updated to courseId
      venue: ''
    }]
  }]);

  // Selected Dropdown Values
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  // Validation State
  const [errors, setErrors] = useState({});

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await GetDepartmentList();
        const yearData = await GetYearlist();
        const semestersData = await GetSemesterList();
        const coursesData = await GetCourseList();

        // Set default values if data is undefined
        setDepartments(departmentsData || []);
        setYear(yearData || []);
        setSemesters(semestersData || []);
        setCourse(coursesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle date change from date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Hide the date picker on iOS after selection
    if (selectedDate) {
      setExamDate(selectedDate); // Update the examDate state
    }
  };

  // Add a new slot to a specific day
  const handleAddSlot = (scheduleIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.push({
      time: '',
      courseId: '', // Updated to courseId
      venue: ''
    });
    setExamSchedule(updatedSchedule);
  };

  // Add a new day to the exam schedule
  const handleAddDay = () => {
    setExamSchedule([...examSchedule, {
      slots: [{
        time: '',
        courseId: '', // Updated to courseId
        venue: ''
      }]
    }]);
  };

  // Remove a slot from a specific day
  const handleRemoveSlot = (scheduleIndex, slotIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.splice(slotIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  // Remove a day from the exam schedule
  const handleRemoveDay = (scheduleIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule.splice(scheduleIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  // Update a specific field in a slot
  const handleUpdateSlot = (scheduleIndex, slotIndex, field, value) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots[slotIndex][field] = value;
    setExamSchedule(updatedSchedule);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Format examDate as ISO 8601 string
      const formattedExamDate = examDate.toISOString();

      const payload = {
        examDate: formattedExamDate, // Use the formatted examDate
        examDay: examDay, // Use the examDay state
        yearId: parseInt(selectedYear, 10),
        departmentID: parseInt(selectedDepartment, 10),
        semesterID: parseInt(selectedSemester, 10),
        examslots: examSchedule[0].slots.map(slot => ({
          timeSlot: slot.time,
          courseId: parseInt(slot.courseId, 10),
          venue: slot.venue
        }))
      };

      console.log('Payload:', payload);

      // Send payload to API
      const response = await axios.post(`${API_BASE_URL}/api/ExamSchedule/AddExamSchedule`, payload);
      console.log('Exam schedule created successfully:', response.data);

      // Navigate back or show success message
      navigation.goBack();
    } catch (error) {
      console.error('Error creating exam schedule:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.CreateExamSchedulemainContainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="Create Schedule"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateExamSchedulecontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateExamSchedulescrollContent}
        >
          <Text style={styles.CreateExamScheduleformTitle}>Create Exam Schedule</Text>

          <View style={styles.CreateExamSchedulelegendContainer}>
            <View style={styles.CreateExamSchedulelegendItem}>
              <View style={[styles.CreateExamSchedulelegendDot, styles.CreateExamSchedulerequiredDot]} />
              <Text style={styles.CreateExamSchedulelegendText}>Required*</Text>
            </View>
            <View style={styles.CreateExamSchedulelegendItem}>
              <View style={[styles.CreateExamSchedulelegendDot, styles.CreateExamScheduleoptionalDot]} />
              <Text style={styles.CreateExamSchedulelegendText}>Optional</Text>
            </View>
          </View>

          {/* Exam Date Input */}
          <View style={styles.CreateExamScheduleformGroup}>
            <Text style={styles.CreateExamSchedulelabel}>Exam Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.CreateExamScheduleinput}
            >
              <Text>{examDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={examDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Exam Day Input */}
          <FormField
            label="Exam Day"
            placeholder="e.g., Monday"
            value={examDay}
            onChangeText={(text) => setExamDay(text)}
            error={errors.examDay}
          />

          {/* Department Dropdown */}
          <FormField
            label="Department"
            placeholder="Select Department"
            type="select"
            required
            value={selectedDepartment}
            onChangeText={(value) => setSelectedDepartment(value)}
            options={departments.map(dept => ({
              label: dept.departmentName || 'Unknown Department', // Fallback for undefined
              value: dept.id ? dept.id.toString() : '', // Ensure id is defined
            }))}
          />

          {/* Year Dropdown */}
          <FormField
            label="Year"
            placeholder="Select Year"
            type="select"
            required
            value={selectedYear}
            onChangeText={(value) => setSelectedYear(value)}
            options={year.map(y => ({
              label: y.yearName || 'Unknown Year', // Fallback for undefined
              value: y.yearId ? y.yearId.toString() : '', // Ensure id is defined
            }))}
          />

          {/* Semester Dropdown */}
          <FormField
            label="Semester"
            placeholder="Select Semester"
            type="select"
            required
            value={selectedSemester}
            onChangeText={(value) => setSelectedSemester(value)}
            options={semesters.map(sem => ({
              label: sem.semesterName || 'Unknown Semester', // Fallback for undefined
              value: sem.id ? sem.id.toString() : '', // Ensure id is defined
            }))}
          />

          {/* Exam Schedule Section */}
          <SectionContainer title="Exam Schedule">
            {examSchedule.map((schedule, scheduleIndex) => (
              <View key={scheduleIndex} style={styles.CreateExamSchedulescheduleContainer}>
                <View style={styles.CreateExamScheduledayHeader}>
                  <Text style={styles.CreateExamScheduledayTitle}>Day {scheduleIndex + 1}</Text>
                  {scheduleIndex > 0 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveDay(scheduleIndex)}
                      style={styles.CreateExamScheduleremoveButton}
                    >
                      <MaterialIcons name="remove-circle" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>

                {schedule.slots.map((slot, slotIndex) => (
                  <View key={slotIndex} style={styles.CreateExamScheduleslotContainer}>
                    <View style={styles.CreateExamScheduleslotHeader}>
                      <Text style={styles.CreateExamScheduleslotTitle}>Slot {slotIndex + 1}</Text>
                      {slotIndex > 0 && (
                        <TouchableOpacity
                          onPress={() => handleRemoveSlot(scheduleIndex, slotIndex)}
                          style={styles.CreateExamScheduleremoveButton}
                        >
                          <MaterialIcons name="remove-circle" size={24} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.CreateExamScheduleformGroup}>
                      <Text style={styles.CreateExamSchedulelabel}>Time</Text>
                      <FormField
                        value={slot.time}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'time', text)}
                        placeholder="e.g., 09:00 AM - 12:00 PM"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_time`]}
                      />
                    </View>

                    <View style={styles.CreateExamScheduleformGroup}>
                      <Text style={styles.CreateExamSchedulelabel}>Course</Text>
                      <FormField
                        label="Course"
                        placeholder="Select Course"
                        type="select"
                        required
                        value={slot.courseId}
                        onChangeText={(value) => handleUpdateSlot(scheduleIndex, slotIndex, 'courseId', value)}
                        options={course.map(c => ({
                          label: c.name || 'Unknown Course', // Fallback for undefined
                          value: c.id ? c.id.toString() : '', // Ensure id is defined
                        }))}
                      />
                    </View>

                    <View style={styles.CreateExamScheduleformGroup}>
                      <Text style={styles.CreateExamSchedulelabel}>Venue</Text>
                      <FormField
                        value={slot.venue}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'venue', text)}
                        placeholder="e.g., Block A - Room 101"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_venue`]}
                      />
                    </View>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.CreateExamScheduleaddButton}
                  onPress={() => handleAddSlot(scheduleIndex)}
                >
                  <MaterialIcons name="add-circle" size={24} color="#6C63FF" />
                  <Text style={styles.CreateExamScheduleaddButtonText}>Add Slot</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.CreateExamScheduleaddButton}
              onPress={handleAddDay}
            >
              <MaterialIcons name="add-circle" size={24} color="#6C63FF" />
              <Text style={styles.CreateExamScheduleaddButtonText}>Add Day</Text>
            </TouchableOpacity>
          </SectionContainer>
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
                title: "Create Schedule",
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