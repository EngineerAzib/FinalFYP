import React, { useState, useEffect } from 'react';
import StudentSemesterRegistrationScreen from '../Screens/StudentSemesterRegistrationScreen';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Alert,
    StyleSheet
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const StudentRegistrationStatusCard = ({ status, deadline, startDate }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'open': return '#22C55E';
            case 'upcoming': return '#F59E0B';
            case 'closed': return '#EF4444';
            default: return '#6B7280';
        }
    };

    return (
        <View style={[styles.statusCard, { borderLeftColor: getStatusColor() }]}>
            <View style={styles.statusHeader}>
                <FontAwesome5
                    name={status === 'open' ? 'calendar-check' : 'calendar-alt'}
                    size={24}
                    color={getStatusColor()}
                />
                <View style={styles.statusInfo}>
                    <Text style={styles.statusTitle}>
                        Registration {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                    <Text style={styles.statusDate}>
                        Deadline: {new Date(deadline).toLocaleDateString()}
                    </Text>
                </View>
            </View>
            <View style={styles.timelineContainer}>
                <View style={styles.timeline}>
                    <View style={[styles.timelinePoint, { backgroundColor: getStatusColor() }]} />
                    <View style={[styles.timelineLine, { backgroundColor: getStatusColor() }]} />
                    <View style={[styles.timelinePoint, { backgroundColor: getStatusColor() }]} />
                </View>
                <View style={styles.timelineDates}>
                    <Text style={styles.timelineDate}>Starts: {new Date(startDate).toLocaleDateString()}</Text>
                    <Text style={styles.timelineDate}>Ends: {new Date(deadline).toLocaleDateString()}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        padding: 16,
    },
    statusCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusInfo: {
        marginLeft: 12,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    statusDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    timelineContainer: {
        marginTop: 8,
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timelinePoint: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    timelineLine: {
        flex: 1,
        height: 2,
        marginHorizontal: 4,
    },
    timelineDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timelineDate: {
        fontSize: 12,
        color: '#6B7280',
    },
});

export default StudentRegistrationStatusCard;