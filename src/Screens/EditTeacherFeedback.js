import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import { SectionContainer } from '../Components/SectionContainer';


export const EditTeacherFeedback = ({ route, navigation }) => {
  const teacherData = route?.params?.teacherData || {};
  const [feedback, setFeedback] = useState(
    teacherData.feedback?.map(item => ({
      ...item,
      rating: item.rating.toString(),
      teachingRating: item.teachingRating.toString(),
      knowledgeRating: item.knowledgeRating.toString(),
      communicationRating: item.communicationRating.toString(),
    })) || []
  );

  const handleSave = () => {
    // Validate ratings are between 1 and 5
    const isValid = feedback.every(item =>
      Number(item.rating) >= 1 && Number(item.rating) <= 5 &&
      Number(item.teachingRating) >= 1 && Number(item.teachingRating) <= 5 &&
      Number(item.knowledgeRating) >= 1 && Number(item.knowledgeRating) <= 5 &&
      Number(item.communicationRating) >= 1 && Number(item.communicationRating) <= 5
    );

    if (!isValid) {
      Alert.alert('Invalid Data', 'All ratings must be between 1 and 5');
      return;
    }

    // Handle save logic here
    Alert.alert('Success', 'Feedback data updated successfully');
    navigation.goBack();
  };

  const updateFeedback = (index, field, value) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index] = {
      ...updatedFeedback[index],
      [field]: value,
    };
    setFeedback(updatedFeedback);
  };

  return (
    <View style={styles.EditTeacherFeedbackcontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Edit Feedback"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.EditTeacherFeedbackformTitle}>Edit Teacher's Feedback</Text>

        <View style={styles.EditTeacherFeedbacklegendContainer}>
          <View style={styles.EditTeacherFeedbacklegendItem}>
            <View style={[styles.EditTeacherFeedbacklegendDot, styles.EditTeacherFeedbackrequiredDot]} />
            <Text style={styles.EditTeacherFeedbacklegendText}>Required*</Text>
          </View>
          <View style={styles.EditTeacherFeedbacklegendItem}>
            <View style={[styles.EditTeacherFeedbacklegendDot, styles.EditTeacherFeedbackoptionalDot]} />
            <Text style={styles.EditTeacherFeedbacklegendText}>Optional</Text>
          </View>
        </View>
        {feedback.map((item, index) => (
          <View key={index} style={styles.EditTeacherFeedbackcard}>

            <SectionContainer
              sectionNumber={index + 1}
              title={`Course Feedback (${item.course.code})`}
            >
              <FormField
                label="Course Code"
                value={item.course.code}
                onChangeText={(value) => updateFeedback(index, 'course', { ...item.course, code: value })}
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Course Name"
                value={item.course.name}
                onChangeText={(value) => updateFeedback(index, 'course', { ...item.course, name: value })}
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Department"
                value={item.department}
                onChangeText={(value) => updateFeedback(index, 'department', value)}
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Section"
                value={item.section}
                onChangeText={(value) => updateFeedback(index, 'section', value)}
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Overall Rating (1-5)"
                value={item.rating}
                onChangeText={(value) => updateFeedback(index, 'rating', value)}
                keyboardType="numeric"
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Teaching Rating (1-5)"
                value={item.teachingRating}
                onChangeText={(value) => updateFeedback(index, 'teachingRating', value)}
                keyboardType="numeric"
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Knowledge Rating (1-5)"
                value={item.knowledgeRating}
                onChangeText={(value) => updateFeedback(index, 'knowledgeRating', value)}
                keyboardType="numeric"
                style={styles.EditTeacherFeedbackfullWidthInput}
              />

              <FormField
                label="Communication Rating (1-5)"
                value={item.communicationRating}
                onChangeText={(value) => updateFeedback(index, 'communicationRating', value)}
                keyboardType="numeric"
                style={styles.EditTeacherFeedbackfullWidthInput}
              />
            </SectionContainer>
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
              title: "Edit feedback",
              onPress: handleSave,
              variant: "primary",
            }
          ]}
        />
      </View>
    </View>
  );
};
