import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterListScreen = ({ navigation, route }) => {
    const { deptCode, deptName, semesters } = route.params || {};
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const handleSemesterPress = (semesterNumber, semesterData) => {
        navigation.navigate('SemesterDetailsScreen', {
            deptCode,
            deptName,
            semesterNumber,
            semesterData,
        });
    };

    return (
        <View style={styles.SemesterRegistrationViewcontainer}>
            <Header />
            <CustomHeader
                title="Semesters"
                currentScreen="Select Semester"
                showSearch={false}
                showRefresh={false}
                navigation={navigation}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.EditSemesterRegistrationheaderInfo}>
                    <View style={styles.EditSemesterRegistrationinfoItem}>
                        <MaterialIcons name="domain" size={24} color="#6C63FF" />
                        <Text style={styles.EditSemesterRegistrationinfoText}>{`${deptName || deptCode} - Semester?`}</Text>
                    </View>
                </View>

                {Object.entries(semesters).map(([semesterNumber, semesterData], index) => (
                    <View key={semesterNumber}>
                        <TouchableOpacity
                            style={styles.SemesterRegistrationViewcard}
                            onPress={() => handleSemesterPress(semesterNumber, semesterData)}
                        >
                            <View style={styles.SemesterRegistrationViewcardHeader}>
                                <View style={styles.SemesterRegistrationViewtitleToggleContainer}>
                                    <MaterialIcons name="event-note" size={24} color="#6C63FF" />
                                    <View style={styles.SemesterRegistrationViewsemesterInfoContainer}>
                                        <Text style={styles.SemesterRegistrationViewcardTitle}>
                                            {semesterData.semester}
                                        </Text>
                                        <Text style={styles.SemesterRegistrationViewdateInfo}>
                                            Registration Deadline: {formatDate(semesterData.registrationDeadline)}
                                        </Text>
                                    </View>
                                    <MaterialIcons name="chevron-right" size={24} color="#6C63FF" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
