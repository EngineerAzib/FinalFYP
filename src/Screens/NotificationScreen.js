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
import GetNotification from '../Services/Notification/getNotification';

export const NotificationScreen = ({ navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [notifications, setNotifications] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetNotification(); // Call GetNotification as a function
                setNotifications(data || []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filters = [
        { id: 'all', label: 'All', icon: 'notifications' },
        { id: 'academic', label: 'Academic', icon: 'school' },
        { id: 'registration', label: 'Registration', icon: 'how-to-reg' },
        { id: 'general', label: 'General', icon: 'campaign' }
    ];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

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

    const filteredNotifications = notifications.filter(notification =>
        selectedFilter === 'all' || notification.type === selectedFilter
    );

    return (
        <View style={styles.notificationScreenContainer}>
            <Header />

            <TouchableOpacity
                style={styles.floatingAddButton}
                onPress={() => navigation.navigate('CreateNotificationScreen')}
            >
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>

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
                        <Text
                            style={[
                                styles.notificationFilterText,
                                selectedFilter === filter.id && styles.notificationFilterTextActive
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={styles.notificationListContainer}>
                <Animated.View style={{ opacity: fadeAnim, paddingBottom: 100 }}>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading notifications...</Text>
                    ) : filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => {
                            const notificationStyle = getNotificationStyle(notification.type, notification.priority);

                            return (
                                <TouchableOpacity
                                    key={notification.id}
                                    style={[
                                        styles.notificationCard,
                                        !notification.isRead && styles.notificationCardUnread
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.notificationIconContainer,
                                            { backgroundColor: notificationStyle.bgColor }
                                        ]}
                                    >
                                        <MaterialIcons
                                            name={notificationStyle.icon}
                                            size={24}
                                            color={notificationStyle.color}
                                        />
                                    </View>

                                    <View style={styles.notificationContent}>
                                        <View style={styles.notificationHeader}>
                                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                                            <View style={styles.notificationMetaContainer}>
                                                {!notification.isRead && (
                                                    <View
                                                        style={[
                                                            styles.notificationPriorityDot,
                                                            { backgroundColor: notificationStyle.priorityColor }
                                                        ]}
                                                    />
                                                )}
                                                <Text style={styles.notificationTime}>
                                                    {getRelativeTime(notification.timestamp)}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text style={styles.noNotificationsText}>No notifications available.</Text>
                    )}
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
