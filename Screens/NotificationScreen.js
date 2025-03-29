// NotificationScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';

export const NotificationScreen = ({ navigation }) => {
    // State for animation and filter
    const [fadeAnim] = useState(new Animated.Value(0));
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Sample notification data
    const notifications = [
        {
            id: 1,
            type: 'academic',
            title: 'Mid-Term Examination Schedule',
            message: 'Mid-term examinations for Fall 2024 will commence from March 15th, 2025. Please check your portal for detailed schedule.',
            timestamp: '2025-02-08T09:30:00',
            isRead: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'registration',
            title: 'Course Registration Deadline',
            message: 'The deadline for Spring 2025 course registration is approaching. Complete your registration by February 20th, 2025.',
            timestamp: '2025-02-07T14:15:00',
            isRead: true,
            priority: 'high'
        },
        {
            id: 3,
            type: 'general',
            title: 'Campus Event: Tech Talk Series',
            message: 'Join us for an inspiring tech talk by industry experts on "Future of AI" on February 12th, 2025 at 2:00 PM in the Main Auditorium.',
            timestamp: '2025-02-06T11:45:00',
            isRead: false,
            priority: 'medium'
        },
        {
            id: 4,
            type: 'academic',
            title: 'Assignment Submission Reminder',
            message: 'Reminder: The deadline for submitting Software Engineering project documentation is February 10th, 2025.',
            timestamp: '2025-02-05T16:20:00',
            isRead: true,
            priority: 'medium'
        },        {
            id: 5,
            type: 'academic',
            title: 'Assignment Submission Reminder',
            message: 'Reminder: The deadline for submitting Software Engineering project documentation is February 10th, 2025.',
            timestamp: '2025-02-05T16:20:00',
            isRead: true,
            priority: 'medium'
        },        

    ];

    // Filter options
    const filters = [
        { id: 'all', label: 'All', icon: 'notifications' },
        { id: 'academic', label: 'Academic', icon: 'school' },
        { id: 'registration', label: 'Registration', icon: 'how-to-reg' },
        { id: 'general', label: 'General', icon: 'campaign' }
    ];

    // Animation effect on mount
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    // Format timestamp to relative time
    const getRelativeTime = (timestamp) => {
        const now = new Date();
        const notificationDate = new Date(timestamp);
        const diffInHours = Math.floor((now - notificationDate) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return diffInHours === 0
                ? 'Just now'
                : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        }
    };

    // Get icon and color based on notification type
    const getNotificationStyle = (type, priority) => {
        const styles = {
            academic: {
                icon: 'school',
                color: '#6C63FF',
                bgColor: '#EEF0FB'
            },
            registration: {
                icon: 'how-to-reg',
                color: '#10B981',
                bgColor: '#F0FDF4'
            },
            general: {
                icon: 'campaign',
                color: '#F59E0B',
                bgColor: '#FEF3C7'
            }
        };

        const priorityColors = {
            high: '#DC2626',
            medium: '#F59E0B',
            low: '#10B981'
        };

        return {
            ...styles[type] || styles.general,
            priorityColor: priorityColors[priority]
        };
    };

    // Filter notifications
    const filteredNotifications = notifications.filter(notification =>
        selectedFilter === 'all' || notification.type === selectedFilter
    );

    return (
        <View style={styles.notificationScreenContainer}>
            <Header />

            {/* Filter Section */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.notificationFilterContainer}
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter.id}
                        onPress={() => setSelectedFilter(filter.id)}
                        style={[
                            styles.notificationFilterButton,
                            selectedFilter === filter.id && styles.notificationFilterButtonActive
                        ]}
                    >
                        <MaterialIcons
                            name={filter.icon}
                            size={20}
                            color={selectedFilter === filter.id ? '#FFFFFF' : '#6C63FF'}
                        />
                        <Text style={[
                            styles.notificationFilterText,
                            selectedFilter === filter.id && styles.notificationFilterTextActive
                        ]}>
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Notifications List */}
            <ScrollView style={styles.notificationListContainer}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    {filteredNotifications.map((notification) => {
                        const notificationStyle = getNotificationStyle(notification.type, notification.priority);

                        return (
                            <TouchableOpacity
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    !notification.isRead && styles.notificationCardUnread
                                ]}
                            >
                                <View style={[
                                    styles.notificationIconContainer,
                                    { backgroundColor: notificationStyle.bgColor }
                                ]}>
                                    <MaterialIcons
                                        name={notificationStyle.icon}
                                        size={24}
                                        color={notificationStyle.color}
                                    />
                                </View>

                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeader}>
                                        <Text style={styles.notificationTitle}>
                                            {notification.title}
                                        </Text>
                                        <View style={styles.notificationMetaContainer}>
                                            {!notification.isRead && (
                                                <View style={[
                                                    styles.notificationPriorityDot,
                                                    { backgroundColor: notificationStyle.priorityColor }
                                                ]} />
                                            )}
                                            <Text style={styles.notificationTime}>
                                                {getRelativeTime(notification.timestamp)}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.notificationMessage}>
                                        {notification.message}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationScreenContainer: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        // marginBottom:20,
    },
    notificationFilterContainer: {
        flexGrow: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    notificationFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        borderRadius: 20,
        backgroundColor: '#F3F4F6'
    },
    notificationFilterButtonActive: {
        backgroundColor: '#6C63FF'
    },
    notificationFilterText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#6C63FF'
    },
    notificationFilterTextActive: {
        color: '#FFFFFF'
    },
    notificationListContainer: {
        flex: 1,
        padding: 16
    },
    notificationCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
    },
    notificationCardUnread: {
        backgroundColor: '#F8FAFF'
    },
    notificationIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    notificationContent: {
        flex: 1
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    notificationTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginRight: 12
    },
    notificationMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationPriorityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8
    },
    notificationTime: {
        fontSize: 12,
        color: '#6B7280'
    },
    notificationMessage: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20
    },
});
