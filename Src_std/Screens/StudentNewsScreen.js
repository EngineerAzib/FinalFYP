import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Search,
    Calendar,
    Tag,
    ChevronRight,
    BookOpen,
    Bell,
    Filter,
    Clock
} from 'lucide-react-native';

// Enhanced FadeInView with useRef
const FadeInView = ({ children, delay = 0, duration = 500 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay, duration]);

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY }]
        }}>
            {children}
        </Animated.View>
    );
};

// CategoryBadge Component
const CategoryBadge = ({ category }) => {
    const getBadgeColor = () => {
        switch (category.toLowerCase()) {
            case 'announcement':
                return styles.announcementBadge;
            case 'alert':
                return styles.alertBadge;
            default:
                return styles.defaultBadge;
        }
    };

    return (
        <View style={[styles.categoryBadge, getBadgeColor()]}>
            <Text style={styles.categoryText}>{category}</Text>
        </View>
    );
};

// NewsCard Component
const NewsCard = ({ item, onPress, index }) => {
    return (
        <FadeInView delay={index * 100}>
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={styles.newsCard}
                activeOpacity={0.7}
            >
                <View style={styles.newsCardHeader}>
                    <CategoryBadge category={item.category} />
                    <View style={styles.dateContainer}>
                        <Clock size={14} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.dateText}>
                            {new Date(item.publishDate).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsContent} numberOfLines={3}>
                    {item.content}
                </Text>

                <View style={styles.tagsContainer}>
                    {item.tags.map((tag, index) => (
                        <View key={index} style={styles.tagChip}>
                            <Tag size={12} color="#666" style={{ marginRight: 4 }} />
                            <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.newsCardFooter}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorInitials}>
                                {item.author.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <Text style={styles.authorText}>
                            {item.author}
                        </Text>
                    </View>
                    <ChevronRight size={20} color="#2196F3" />
                </View>
            </TouchableOpacity>
        </FadeInView>
    );
};

// FilterBar Component
const FilterBar = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const filters = [
        { id: 'all', label: 'All News', icon: BookOpen },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'alerts', label: 'Alerts', icon: Filter },
    ];

    return (
        <Animated.View style={[styles.filterBarContainer, { opacity: fadeAnim }]}>
            <FlatList
                horizontal
                data={filters}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const Icon = item.icon;
                    const isActive = activeFilter === item.id;
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setActiveFilter(item.id);
                                onFilterChange(item.id);
                            }}
                            style={[
                                styles.filterButton,
                                isActive && styles.filterButtonActive
                            ]}
                        >
                            <Icon
                                size={16}
                                color={isActive ? 'white' : '#666'}
                                style={styles.filterIcon}
                            />
                            <Text style={[
                                styles.filterText,
                                isActive && styles.filterTextActive
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.filterList}
            />
        </Animated.View>
    );
};

// Main StudentNewsScreen Component
const StudentNewsScreen = () => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNews, setFilteredNews] = useState(news);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = news.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredNews(filtered);
    };

    const handleFilter = (filterType) => {
        setLoading(true);
        setTimeout(() => {
            let filtered = [...news];
            if (filterType !== 'all') {
                filtered = news.filter(item =>
                    item.category.toLowerCase() === filterType.slice(0, -1).toLowerCase()
                );
            }
            setFilteredNews(filtered);
            setLoading(false);
        }, 500);
    };

    const handleNewsPress = (item) => {
        // Navigation to news detail screen would go here
        console.log('Pressed news item:', item.id);
    };
    const news = [
        {
            id: 1,
            title: 'New Campus Library Opening Soon',
            content: 'We are excited to announce the grand opening of our new state-of-the-art library facility. The new building will feature modern study spaces, advanced technology resources, and an expanded collection of books and digital media.',
            category: 'Announcement',
            author: 'Admin Team',
            publishDate: '2025-02-15',
            image: null,
            tags: ['campus', 'library', 'facilities']
        },
        {
            id: 2,
            title: 'Important Schedule Changes',
            content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
            category: 'Alert',
            author: 'Academic Affairs',
            publishDate: '2025-02-14',
            image: null,
            tags: ['schedule', 'classes', 'important']
        },
        {
            id: 3,
            title: 'Important Schedule Changes',
            content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
            category: 'Alert',
            author: 'Academic Affairs',
            publishDate: '2025-02-14',
            image: null,
            tags: ['schedule', 'classes', 'important']
        },
        {
            id: 4,
            title: 'Important Schedule Changes',
            content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
            category: 'Alert',
            author: 'Academic Affairs',
            publishDate: '2025-02-14',
            image: null,
            tags: ['schedule', 'classes', 'important']
        },
        {
            id: 5,
            title: 'Important Schedule Changes',
            content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
            category: 'Alert',
            author: 'Academic Affairs',
            publishDate: '2025-02-14',
            image: null,
            tags: ['schedule', 'classes', 'important']
        },
        {
            id: 6,
            title: 'Important Schedule Changes',
            content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
            category: 'Alert',
            author: 'Academic Affairs',
            publishDate: '2025-02-14',
            image: null,
            tags: ['schedule', 'classes', 'important']
        },

    ];
    // ... rest of the component logic remains the same ...

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="News & Updates"
                subtitle="Stay informed with the latest campus news"
            />

            <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
                <FadeInView>
                    <View style={styles.searchContainer}>
                        <Search size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            ref={searchInputRef}
                            placeholder="Search news and announcements..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                            style={styles.searchInput}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <FilterBar onFilterChange={handleFilter} />

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#2196F3" />
                            <Text style={styles.loadingText}>Loading news...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredNews}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <NewsCard
                                    item={item}
                                    onPress={handleNewsPress}
                                    index={index}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.newsList,
                                { paddingBottom: insets.bottom + 16 }
                            ]}
                            ListEmptyComponent={() => (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>
                                        No news found matching your search
                                    </Text>
                                </View>
                            )}
                        />
                    )}
                </FadeInView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        paddingVertical: 8,
    },
    filterBarContainer: {
        marginBottom: 16,
    },
    filterList: {
        paddingRight: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        marginRight: 12,
    },
    filterButtonActive: {
        backgroundColor: '#2196F3',
    },
    filterIcon: {
        marginRight: 8,
    },
    filterText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextActive: {
        color: 'white',
    },
    newsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    newsCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    announcementBadge: {
        backgroundColor: '#4CAF50',
    },
    alertBadge: {
        backgroundColor: '#FF5722',
    },
    defaultBadge: {
        backgroundColor: '#2196F3',
    },
    categoryText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#666',
        fontSize: 12,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
        lineHeight: 24,
    },
    newsContent: {
        color: '#444',
        marginBottom: 12,
        lineHeight: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    tagChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        color: '#666',
        fontSize: 12,
    },
    newsCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    authorInitials: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    authorText: {
        color: '#666',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default StudentNewsScreen;














