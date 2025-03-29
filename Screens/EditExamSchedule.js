import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { CustomButton } from '../Components/CustomButton';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';

export const EditExamSchedule = ({ route, navigation }) => {
  // Extract parameters from route
  const { deptCode, year, yearData } = route.params;

  // Initialize form state with existing schedule data
  const [examSchedule, setExamSchedule] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  // Initialize form data when component mounts
  useEffect(() => {
    if (yearData && yearData.examSchedule) {
      setExamSchedule(yearData.examSchedule.map(schedule => ({
        ...schedule,
        slots: [...schedule.slots]
      })));
    } else {
      // If no existing schedule, add a default day
      setExamSchedule([{
        date: '',
        day: '',
        slots: [{
          time: '',
          course: '',
          courseCode: '',
          venue: ''
        }]
      }]);
    }
  }, [yearData]);

  // Handlers for updating form data
  const handleUpdateSchedule = (scheduleIndex, field, value) => {
    setIsModified(true);
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex] = {
      ...updatedSchedule[scheduleIndex],
      [field]: value
    };
    setExamSchedule(updatedSchedule);
  };

  const handleUpdateSlot = (scheduleIndex, slotIndex, field, value) => {
    setIsModified(true);
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex] = {
      ...updatedSchedule[scheduleIndex],
      slots: [...updatedSchedule[scheduleIndex].slots]
    };
    updatedSchedule[scheduleIndex].slots[slotIndex] = {
      ...updatedSchedule[scheduleIndex].slots[slotIndex],
      [field]: value
    };
    setExamSchedule(updatedSchedule);
  };

  const handleAddSlot = (scheduleIndex) => {
    setIsModified(true);
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.push({
      time: '',
      course: '',
      courseCode: '',
      venue: ''
    });
    setExamSchedule(updatedSchedule);
  };

  const handleRemoveSlot = (scheduleIndex, slotIndex) => {
    setIsModified(true);
    const updatedSchedule = [...examSchedule];
    updatedSchedule[scheduleIndex].slots.splice(slotIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  const handleAddDay = () => {
    setIsModified(true);
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

  const handleRemoveDay = (scheduleIndex) => {
    setIsModified(true);
    const updatedSchedule = [...examSchedule];
    updatedSchedule.splice(scheduleIndex, 1);
    setExamSchedule(updatedSchedule);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    examSchedule.forEach((schedule, scheduleIndex) => {
      // Validate date
      if (!schedule.date) {
        newErrors[`schedule_${scheduleIndex}_date`] = 'Date is required';
        isValid = false;
      }

      // Validate day
      if (!schedule.day) {
        newErrors[`schedule_${scheduleIndex}_day`] = 'Day is required';
        isValid = false;
      }

      // Validate slots
      schedule.slots.forEach((slot, slotIndex) => {
        if (!slot.time) {
          newErrors[`slot_${scheduleIndex}_${slotIndex}_time`] = 'Time is required';
          isValid = false;
        }
        if (!slot.courseCode) {
          newErrors[`slot_${scheduleIndex}_${slotIndex}_code`] = 'Course code is required';
          isValid = false;
        }
        if (!slot.course) {
          newErrors[`slot_${scheduleIndex}_${slotIndex}_course`] = 'Course name is required';
          isValid = false;
        }
        if (!slot.venue) {
          newErrors[`slot_${scheduleIndex}_${slotIndex}_venue`] = 'Venue is required';
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically make an API call to update the data
      navigation.goBack();
    }
  };

  return (

    <View style={styles.CreateSemesterRegistrationmainContainer}>
      <Header />
      <CustomHeader
        title="Exam Schedule"
        currentScreen="Edit Schedule"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateSemesterRegistrationcontentContainer}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateSemesterRegistrationscrollContent}
        >
          <View style={styles.EditExamScheduleheaderInfo}>
            <View style={styles.EditExamScheduleinfoItem}>
              <MaterialIcons name="domain" size={24} color="#6C63FF" />
              <Text style={styles.EditExamScheduleinfoText}>{yearData?.name || deptCode}</Text>
            </View>
            <View style={styles.EditExamScheduleinfoItem}>
              <MaterialIcons name="school" size={24} color="#6C63FF" />
              <Text style={styles.EditExamScheduleinfoText}>{yearData?.year}</Text>
            </View>
          </View>

          <SectionContainer title="Edit Exam Schedule">
            {examSchedule.map((schedule, scheduleIndex) => (
              <View key={scheduleIndex} style={styles.EditExamSchedulescheduleContainer}>
                <View style={styles.EditExamScheduledayHeader}>
                  <Text style={styles.EditExamScheduledayTitle}>Day {scheduleIndex + 1}</Text>
                  {examSchedule.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveDay(scheduleIndex)}
                      style={styles.EditExamScheduleremoveButton}
                    >
                      <MaterialIcons name="remove-circle" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.EditExamScheduleformGroup}>
                  <Text style={styles.EditExamSchedulelabel}>Date</Text>
                  <FormField
                    value={schedule.date}
                    onChangeText={(text) => handleUpdateSchedule(scheduleIndex, 'date', text)}
                    placeholder="YYYY-MM-DD"
                    error={errors[`schedule_${scheduleIndex}_date`]}
                  />
                </View>

                <View style={styles.EditExamScheduleformGroup}>
                  <Text style={styles.EditExamSchedulelabel}>Day</Text>
                  <FormField
                    value={schedule.day}
                    onChangeText={(text) => handleUpdateSchedule(scheduleIndex, 'day', text)}
                    placeholder="e.g., Monday"
                    error={errors[`schedule_${scheduleIndex}_day`]}
                  />
                </View>

                {schedule.slots.map((slot, slotIndex) => (
                  <View key={slotIndex} style={styles.EditExamScheduleslotContainer}>
                    <View style={styles.EditExamScheduleslotHeader}>
                      <Text style={styles.EditExamScheduleslotTitle}>Slot {slotIndex + 1}</Text>
                      {schedule.slots.length > 1 && (
                        <TouchableOpacity
                          onPress={() => handleRemoveSlot(scheduleIndex, slotIndex)}
                          style={styles.EditExamScheduleremoveButton}
                        >
                          <MaterialIcons name="remove-circle" size={24} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.EditExamScheduleformGroup}>
                      <Text style={styles.EditExamSchedulelabel}>Time</Text>
                      <FormField
                        value={slot.time}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'time', text)}
                        placeholder="e.g., 09:00 AM - 12:00 PM"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_time`]}
                      />
                    </View>

                    <View style={styles.EditExamScheduleformGroup}>
                      <Text style={styles.EditExamSchedulelabel}>Course Code</Text>
                      <FormField
                        value={slot.courseCode}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'courseCode', text)}
                        placeholder="e.g., CS101"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_code`]}
                      />
                    </View>

                    <View style={styles.EditExamScheduleformGroup}>
                      <Text style={styles.EditExamSchedulelabel}>Course Name</Text>
                      <FormField
                        value={slot.course}
                        onChangeText={(text) => handleUpdateSlot(scheduleIndex, slotIndex, 'course', text)}
                        placeholder="e.g., Programming Fundamentals"
                        error={errors[`slot_${scheduleIndex}_${slotIndex}_course`]}
                      />
                    </View>

                    <View style={styles.EditExamScheduleformGroup}>
                      <Text style={styles.EditExamSchedulelabel}>Venue</Text>
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
                  style={styles.EditExamScheduleaddButton}
                  onPress={() => handleAddSlot(scheduleIndex)}
                >
                  <MaterialIcons name="add-circle" size={24} color="#6C63FF" />
                  <Text style={styles.EditExamScheduleaddButtonText}>Add Slot</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.EditExamScheduleaddButton}
              onPress={handleAddDay}
            >
              <MaterialIcons name="add-circle" size={24} color="#6C63FF" />
              <Text style={styles.EditExamScheduleaddButtonText}>Add Day</Text>
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
                title: "Edit Schedule",
                onPress: handleSave,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>
    </View>

  );
};