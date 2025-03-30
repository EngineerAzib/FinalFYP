import React, { useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { Header } from '../Components/Header';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateTeachingScheduleScreen = ({ navigation }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  const [scheduleData, setScheduleData] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  });
  
  const [currentDay, setCurrentDay] = useState('monday');
  const [currentSession, setCurrentSession] = useState({
    time: '',
    department: '',
    section: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateSession = () => {
    const newErrors = {};
    
    if (!currentSession.time.trim()) {
      newErrors.time = 'Time slot is required';
    }
    
    if (!currentSession.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!currentSession.section.trim()) {
      newErrors.section = 'Section is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSession = () => {
    if (validateSession()) {
      setScheduleData({
        ...scheduleData,
        [currentDay]: [...scheduleData[currentDay], { ...currentSession }]
      });
      
      // Reset current session after adding
      setCurrentSession({
        time: '',
        department: '',
        section: ''
      });
    }
  };

  const removeSession = (day, index) => {
    const updatedSessions = [...scheduleData[day]];
    updatedSessions.splice(index, 1);
    
    setScheduleData({
      ...scheduleData,
      [day]: updatedSessions
    });
  };

  const handleSubmit = () => {
    // Check if at least one session is added
    const hasAnySession = Object.values(scheduleData).some(daySessions => daySessions.length > 0);
    
    if (!hasAnySession) {
      Alert.alert('Error', 'Please add at least one teaching session');
      return;
    }
    
    // Create the final schedule object
    const teachingSchedule = {
      schedule: { ...scheduleData }
    };
    
    // Here you would typically make an API call to save the schedule
    console.log('New Teaching Schedule:', teachingSchedule);
    Alert.alert('Success', 'Teaching schedule created successfully!');
    navigation.goBack();
  };

  const renderSessionList = (day) => {
    if (scheduleData[day].length === 0) {
      return (
        <Text style={styles.noSessionsText}>No sessions added for {day.charAt(0).toUpperCase() + day.slice(1)}</Text>
      );
    }
    
    return scheduleData[day].map((session, index) => (
      <View key={index} style={styles.sessionItem}>
        <View style={styles.sessionDetails}>
          <Text style={styles.sessionTime}>{session.time}</Text>
          <Text style={styles.sessionInfo}>
            {session.department} - Section {session.section}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeSession(day, index)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.CreateDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Teaching Schedule"
        currentScreen="Create Schedule"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateDepartmentScreenscrollContent}
        >
          <Text style={styles.CreateDepartmentScreenformTitle}>Create Teaching Schedule</Text>

          <View style={styles.CreateDepartmentScreenlegendContainer}>
            <View style={styles.CreateDepartmentScreenlegendItem}>
              <View style={[styles.CreateDepartmentScreenlegendDot, styles.CreateDepartmentScreenrequiredDot]} />
              <Text style={styles.CreateDepartmentScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateDepartmentScreenlegendItem}>
              <View style={[styles.CreateDepartmentScreenlegendDot, styles.CreateDepartmentScreenoptionalDot]} />
              <Text style={styles.CreateDepartmentScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Add Teaching Session">
            <View style={styles.daySelectionContainer}>
              <Text style={styles.daySelectionLabel}>Select Day:</Text>
              <View style={styles.dayButtonsContainer}>
                {daysOfWeek.map(day => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      currentDay === day && styles.selectedDayButton
                    ]}
                    onPress={() => setCurrentDay(day)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      currentDay === day && styles.selectedDayButtonText
                    ]}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <FormField
              label="Time Slot"
              placeholder="e.g. 09:00 AM - 10:30 AM"
              value={currentSession.time}
              onChangeText={(text) => setCurrentSession({ ...currentSession, time: text })}
              error={errors.time}
              required
            />

            <FormField
              label="Department"
              placeholder="Enter department name"
              value={currentSession.department}
              onChangeText={(text) => setCurrentSession({ ...currentSession, department: text })}
              error={errors.department}
              required
            />

            <FormField
              label="Section"
              placeholder="Enter section (e.g. A, B, C)"
              value={currentSession.section}
              onChangeText={(text) => setCurrentSession({ ...currentSession, section: text })}
              error={errors.section}
              required
            />

            <View style={styles.addSessionButtonContainer}>
              <FormField
                type="button"
                label="Add Session"
                onPress={addSession}
              />
            </View>
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="Current Schedule">
            {daysOfWeek.map(day => (
              <View key={day} style={styles.dayScheduleContainer}>
                <Text style={styles.dayTitle}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Text>
                {renderSessionList(day)}
              </View>
            ))}
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