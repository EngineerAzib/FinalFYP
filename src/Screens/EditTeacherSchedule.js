import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import { SectionContainer } from '../Components/SectionContainer';


export const EditTeacherSchedule = ({ route, navigation }) => {
  const teacherData = route?.params?.teacherData || {};
  const [schedule, setSchedule] = useState(
    teacherData.schedule || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    }
  );

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const handleSave = () => {
    // Validate schedule entries
    const isValid = Object.values(schedule).every(daySchedule =>
      daySchedule.every(slot => slot.time && slot.department && slot.section)
    );

    if (!isValid) {
      Alert.alert('Invalid Schedule', 'Please fill in all schedule details');
      return;
    }

    // Handle save logic here
    Alert.alert('Success', 'Schedule updated successfully');
    navigation.goBack();
  };

  const addSlot = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], { time: '', department: '', section: '' }],
    }));
  };

  const removeSlot = (day, index) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateSlot = (day, index, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  return (
    <View style={styles.EditTeacherSchedulecontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Edit Schedule"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.EditTeacherScheduleformTitle}>Edit Teacher's Schedule</Text>

        <View style={styles.EditTeacherSchedulelegendContainer}>
          <View style={styles.EditTeacherSchedulelegendItem}>
            <View style={[styles.EditTeacherSchedulelegendDot, styles.EditTeacherSchedulerequiredDot]} />
            <Text style={styles.EditTeacherSchedulelegendText}>Required*</Text>
          </View>
          <View style={styles.EditTeacherSchedulelegendItem}>
            <View style={[styles.EditTeacherSchedulelegendDot, styles.EditTeacherScheduleoptionalDot]} />
            <Text style={styles.EditTeacherSchedulelegendText}>Optional</Text>
          </View>
        </View>
        {days.map((day) => (
          <View key={day} style={styles.EditTeacherSchedulecard}>
            <View style={styles.EditTeacherScheduledayHeader}>
              {/* <Text style={styles.EditTeacherSchedulecardTitle}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text> */}
              <TouchableOpacity
                style={styles.EditTeacherScheduleaddButton}
                onPress={() => addSlot(day)}
              >
                <MaterialIcons name="add" size={24} color="#6C63FF" />
              </TouchableOpacity>
            </View>

            {schedule[day].map((slot, index) => (
              <View key={index} style={styles.EditTeacherScheduleslotContainer}>
                {/* <View style={styles.EditTeacherScheduleformContainer}> */}
                <SectionContainer
                  sectionNumber={index + 1}
                  title={`Teacher's Schedule (${day.charAt(0).toUpperCase() + day.slice(1)})`}
                >

                  <FormField
                    label="Time"
                    value={slot.time}
                    onChangeText={(value) => updateSlot(day, index, 'time', value)}
                    style={styles.EditTeacherSchedulefullWidthInput}
                    placeholder="e.g., 9:00 AM - 10:30 AM"
                  />

                  <FormField
                    label="Department"
                    value={slot.department}
                    onChangeText={(value) => updateSlot(day, index, 'department', value)}
                    style={styles.EditTeacherSchedulefullWidthInput}
                  />

                  <FormField
                    label="Section"
                    value={slot.section}
                    onChangeText={(value) => updateSlot(day, index, 'section', value)}
                    style={styles.EditTeacherSchedulefullWidthInput}
                  />
                </SectionContainer>

                {/* </View> */}

                <TouchableOpacity
                  style={styles.EditTeacherScheduleremoveButton}
                  onPress={() => removeSlot(day, index)}
                >
                  <MaterialIcons name="delete" size={24} color="#DC2626" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
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
              title: "Edit Schedule",
              onPress: handleSave,
              variant: "primary",
            }
          ]}
        />
      </View>
    </View>
  );
};

