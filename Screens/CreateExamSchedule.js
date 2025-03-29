import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';

export const CreateExamSchedule = ({ navigation }) => {
  // Selected Department and Year State
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Form Data State
  const [examSchedule, setExamSchedule] = useState([{
    date: '',
    day: '',
    slots: [{
      time: '',
      course: '',
      courseCode: '',
      venue: ''
    }]
  }]);

  // Toggle States
  const [showDepartments, setShowDepartments] = useState(true);
  const [showYears, setShowYears] = useState(false);

  // Validation State
  const [errors, setErrors] = useState({});

  // Available Departments
  const departments = [
    { code: 'SE', name: 'Software Engineering' },
    { code: 'CS', name: 'Computer Science' },
    { code: 'EE', name: 'Electrical Engineering' }
  ];

  // Available Years
  const years = [
    { id: '1', name: 'First Year' },
    { id: '2', name: 'Second Year' },
    { id: '3', name: 'Third Year' },
    { id: '4', name: 'Fourth Year' }
  ];

  const handleAddSlot = (scheduleIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.push({
      time: '',
      course: '',
      courseCode: '',
      venue: ''
    });
    setExamSchedule(updatedSchedule);
  };

  const handleAddDay = () => {
    setExamSchedule([...examSchedule, {
      date: '',
      day: '',
      slots: [{
        time: '',
        course: '',
        courseCode: '',
        venue: ''
      }]
    }]);
  };

  const handleRemoveSlot = (scheduleIndex, slotIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.splice(slotIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  const handleRemoveDay = (scheduleIndex) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule.splice(scheduleIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  const handleUpdateSchedule = (scheduleIndex, field, value) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex][field] = value;
    setExamSchedule(updatedSchedule);
  };

  const handleUpdateSlot = (scheduleIndex, slotIndex, field, value) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots[slotIndex][field] = value;
    setExamSchedule(updatedSchedule);
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
          </View>        {/* Department Selection Section */}
          <SectionContainer
            title="Select Department"
            expanded={showDepartments}
            onToggle={() => setShowDepartments(!showDepartments)}
          >
            <View style={styles.CreateExamScheduleoptionsContainer}>
              {departments.map((dept) => (
                <TouchableOpacity
                  key={dept.code}
                  style={[
                    styles.CreateExamScheduleoptionButton,
                    selectedDepartment === dept.code && styles.CreateExamScheduleoptionButtonSelected
                  ]}
                  onPress={() => setSelectedDepartment(dept.code)}
                >
                  <MaterialIcons
                    name="domain"
                    size={24}
                    color={selectedDepartment === dept.code ? '#FFFFFF' : '#6C63FF'}
                  />
                  <Text style={[
                    styles.CreateExamScheduleoptionText,
                    selectedDepartment === dept.code && styles.CreateExamScheduleoptionTextSelected
                  ]}>
                    {dept.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SectionContainer>

          {/* Year Selection Section */}
          <SectionContainer
            title="Select Year"
            expanded={showYears}
            onToggle={() => setShowYears(!showYears)}
          >
            <View style={styles.CreateExamScheduleoptionsContainer}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year.id}
                  style={[
                    styles.CreateExamScheduleoptionButton,
                    selectedYear === year.id && styles.CreateExamScheduleoptionButtonSelected
                  ]}
                  onPress={() => setSelectedYear(year.id)}
                >
                  <MaterialIcons
                    name="school"
                    size={24}
                    color={selectedYear === year.id ? '#FFFFFF' : '#6C63FF'}
                  />
                  <Text style={[
                    styles.CreateExamScheduleoptionText,
                    selectedYear === year.id && styles.CreateExamScheduleoptionTextSelected
                  ]}>
                    {year.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SectionContainer>

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

                <View style={styles.CreateExamScheduleformGroup}>
                  <Text style={styles.CreateExamSchedulelabel}>Date</Text>
                  <FormField
                    value={schedule.date}
                    onChangeText={(text) => handleUpdateSchedule(scheduleIndex, 'date', text)}
                    placeholder="YYYY-MM-DD"
                    error={errors[`schedule_${scheduleIndex}_date`]}
                  />
                </View>

                <View style={styles.CreateExamScheduleformGroup}>
                  <Text style={styles.CreateExamSchedulelabel}>Day</Text>
                  <FormField
                    value={schedule.day}
                    onChangeText={(text) => handleUpdateSchedule(scheduleIndex, 'day', text)}
                    placeholder="e.g., Monday"
                    error={errors[`schedule_${scheduleIndex}_day`]}
                  />
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
                      <Text style={styles.CreateExamSchedulelabel}>Course Code</Text>
                      <FormField
                        value={slot.courseCode}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'courseCode', text)}
                        placeholder="e.g., CS101"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_code`]}
                      />
                    </View>

                    <View style={styles.CreateExamScheduleformGroup}>
                      <Text style={styles.CreateExamSchedulelabel}>Course Name</Text>
                      <FormField
                        value={slot.course}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'course', text)}
                        placeholder="e.g., Programming Fundamentals"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_course`]}
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
                onPress: handleUpdateSchedule,
                variant: "primary",
              }
            ]}
          />
        </View>

      </View>
    </View>

  );
};

