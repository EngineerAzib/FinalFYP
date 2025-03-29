import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Alert,
    StyleSheet
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import StudentCourseCard from '../Components/StudentCourseCard';

const StudentRegistrationSuccessScreen = ({ route, navigation }) => {
    const { courseCount, creditHours } = route.params;
    const scaleAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.successContent}>
                <Animated.View style={[
                    styles.successCard,
                    { transform: [{ scale: scaleAnim }] }
                ]}>
                    <View style={styles.successIconContainer}>
                        <FontAwesome5 name="check-circle" size={60} color="#22C55E" />
                    </View>

                    <Text style={styles.successTitle}>Registration Complete!</Text>
                    <Text style={styles.successSubtitle}>
                        You have successfully registered for the Spring 2025 semester
                    </Text>

                    <View style={styles.successStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{courseCount}</Text>
                            <Text style={styles.statLabel}>Courses</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{creditHours}</Text>
                            <Text style={styles.statLabel}>Credit Hours</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.viewScheduleButton}
                        onPress={() => navigation.navigate('MyCoursesScreen')}
                    >
                        <Text style={styles.viewScheduleText}>View Courses</Text>
                        <FontAwesome5 name="arrow-right" size={16} color="#6C63FF" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    confirmationCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    confirmationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    selectedCourseCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    creditBadge: {
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    creditText: {
        color: '#6C63FF',
        fontWeight: '600',
        fontSize: 14,
    },
    courseSchedule: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
    },
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    scheduleText: {
        marginLeft: 8,
        color: '#6B7280',
        fontSize: 14,
    },
    warningCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
    },
    warningText: {
        flex: 1,
        marginLeft: 12,
        color: '#92400E',
        fontSize: 14,
    },
    submitContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        padding: 16,
    },
    progressBar: {
        height: 2,
        backgroundColor: '#6C63FF',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    successContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    successCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    successIconContainer: {
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    successStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#E5E7EB',
    },
    viewScheduleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    viewScheduleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6C63FF',
    },
});
export default StudentRegistrationSuccessScreen;
