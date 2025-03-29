import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import {
    Search,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Calendar,
    Users,
    Filter as FilterIcon,
    BookmarkPlus,
    ChevronRight,
    Building2,
    Tag
} from 'lucide-react-native';

// Enhanced animation component with spring effect
const SpringFadeIn = ({ children, delay = 0, duration = 500 }) => {
    const springAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(springAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                tension: 30,
                friction: 7,
                delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay]);

    return (
        <Animated.View style={{
            opacity: springAnim,
            transform: [{ translateY }]
        }}>
            {children}
        </Animated.View>
    );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
    const getStatusStyle = () => {
        switch (status.toLowerCase()) {
            case 'active':
                return styles.statusActive;
            case 'upcoming':
                return styles.statusUpcoming;
            default:
                return styles.statusDefault;
        }
    };

    return (
        <View style={[styles.statusBadge, getStatusStyle()]}>
            <View style={[styles.statusDot, getStatusStyle()]} />
            <Text style={styles.statusText}>{status}</Text>
        </View>
    );
};

// Quick Filters Component with Horizontal Scroll
const QuickFilters = ({ onFilterChange, activeFilter }) => {
    const filters = [
        { id: 'all', label: 'All Internships', icon: Briefcase },
        { id: 'fulltime', label: 'Full-time', icon: Clock },
        { id: 'remote', label: 'Remote', icon: MapPin },
        { id: 'active', label: 'Active', icon: Calendar }
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickFiltersContainer}
        >
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                    <TouchableOpacity
                        key={filter.id}
                        onPress={() => onFilterChange(filter.id)}
                        style={[
                            styles.filterChip,
                            isActive && styles.filterChipActive
                        ]}
                    >
                        <Icon
                            size={16}
                            color={isActive ? '#FFFFFF' : '#6B7280'}
                            style={styles.filterIcon}
                        />
                        <Text style={[
                            styles.filterLabel,
                            isActive && styles.filterLabelActive
                        ]}>
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

// Internship Card Component
const InternshipCard = ({ item, onPress, onSave, index }) => {
    const [isSaved, setIsSaved] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start(() => onPress(item));
    };

    return (
        <SpringFadeIn delay={index * 100}>
            <Animated.View style={[
                styles.cardContainer,
                { transform: [{ scale: scaleAnim }] }
            ]}>
                <TouchableOpacity
                    onPress={handlePress}
                    activeOpacity={0.9}
                    style={styles.card}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.companyBadge}>
                            <Text style={styles.companyInitials}>
                                {item.company.split(' ').map(word => word[0]).join('')}
                            </Text>
                        </View>
                        <View style={styles.headerInfo}>
                            <Text style={styles.companyName}>{item.company}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsSaved(!isSaved);
                                onSave(item);
                            }}
                            style={styles.saveButton}
                        >
                            <BookmarkPlus
                                size={20}
                                color={isSaved ? '#6C63FF' : '#6B7280'}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.jobTitle}>{item.title}</Text>

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <MapPin size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.location}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Clock size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.duration}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <DollarSign size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.stipend}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Users size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.positions} positions</Text>
                        </View>
                    </View>

                    <View style={styles.skillsContainer}>
                        {item.requirements.split(', ').map((skill, index) => (
                            <View key={index} style={styles.skillChip}>
                                <Tag size={12} color="#6C63FF" />
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.cardFooter}>
                        <View style={styles.deadline}>
                            <Calendar size={14} color="#EF4444" />
                            <Text style={styles.deadlineText}>
                                Apply by {item.deadline}
                            </Text>
                        </View>
                        <Text style={styles.postedDate}>{item.postedDate}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </SpringFadeIn>
    );
};

// Main Internship Screen
const StudentInternshipScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredInternships, setFilteredInternships] = useState(internships || []);

    // ... continuing from previous part

    const [showFilters, setShowFilters] = useState(false);
    const filterSheetAnim = useRef(new Animated.Value(0)).current;
    const searchInputRef = useRef(null);
    const internships = [
        {
            id: 1,
            company: 'Tech Innovators',
            title: 'Frontend Developer Intern',
            status: 'Active',
            location: 'Remote',
            duration: '6 months',
            stipend: '$2000/month',
            positions: 3,
            requirements: 'React, JavaScript, CSS',
            deadline: 'March 15, 2025',
            postedDate: '2 days ago',
            type: 'Full-time'
        },
        {
            id: 2,
            company: 'Data Systems',
            title: 'Data Science Intern',
            status: 'Upcoming',
            location: 'New York, NY',
            duration: '3 months',
            stipend: '$2500/month',
            positions: 2,
            requirements: 'Python, SQL, Machine Learning',
            deadline: 'March 20, 2025',
            postedDate: '1 week ago',
            type: 'Full-time'
        },
        {
            id: 3,
            company: 'Cloud Solutions',
            title: 'DevOps Engineering Intern',
            status: 'Active',
            location: 'Remote',
            duration: '4 months',
            stipend: '$1800/month',
            positions: 5,
            requirements: 'AWS, Docker, Linux',
            deadline: 'March 25, 2025',
            postedDate: '3 days ago',
            type: 'Part-time'
        }
    ];
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = internships.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.company.toLowerCase().includes(query.toLowerCase()) ||
            item.requirements.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInternships(filtered);
    };

    const handleFilterChange = (filterType) => {
        setActiveFilter(filterType);
        let filtered = [...internships];

        switch (filterType) {
            case 'fulltime':
                filtered = internships.filter(item => item.type === 'Full-time');
                break;
            case 'remote':
                filtered = internships.filter(item => item.location === 'Remote');
                break;
            case 'active':
                filtered = internships.filter(item => item.status === 'Active');
                break;
            default:
                filtered = internships;
        }

        setFilteredInternships(filtered);
    };

    const handleSaveInternship = (internship) => {
        // Implementation for saving internship
        console.log('Saved internship:', internship.id);
    };

    const toggleFilterSheet = () => {
        const toValue = showFilters ? 0 : 1;
        setShowFilters(!showFilters);

        Animated.spring(filterSheetAnim, {
            toValue,
            tension: 30,
            friction: 8,
            useNativeDriver: true,
        }).start();
    };

    // Advanced Filter Sheet Component
    const FilterSheet = () => {
        const translateY = filterSheetAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [600, 0],
        });

        return (
            <Animated.View
                style={[
                    styles.filterSheet,
                    { transform: [{ translateY }] }
                ]}
            >
                <View style={styles.filterSheetHeader}>
                    <Text style={styles.filterSheetTitle}>Advanced Filters</Text>
                    <TouchableOpacity
                        onPress={toggleFilterSheet}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.filterContent}>
                    <FilterSection
                        title="Internship Type"
                        options={['Full-time', 'Part-time', 'Remote']}
                    />
                    <FilterSection
                        title="Duration"
                        options={['1-3 months', '3-6 months', '6+ months']}
                    />
                    <FilterSection
                        title="Stipend Range"
                        options={['$0-1000', '$1000-2000', '$2000+']}
                    />

                    <View style={styles.filterActions}>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={() => {
                                // Reset filters logic
                                toggleFilterSheet();
                            }}
                        >
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                // Apply filters logic
                                toggleFilterSheet();
                            }}
                        >
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animated.View>
        );
    };

    // Filter Section Component for Filter Sheet
    const FilterSection = ({ title, options }) => (
        <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{title}</Text>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.filterOption}
                >
                    <View style={styles.checkbox} />
                    <Text style={styles.filterOptionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Internship Opportunities"
                showSearch={false}
                showRefresh={false}
            />

            <View style={[styles.content]}>
                <FlatList
                    ListHeaderComponent={() => (
                        <View>
                            <SpringFadeIn delay={100}>
                                <View style={styles.searchBar}>
                                    <Search size={20} color="#666" style={styles.searchIcon} />
                                    <TextInput
                                        ref={searchInputRef}
                                        placeholder="Search internships, companies, skills..."
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                        style={styles.searchInput}
                                        placeholderTextColor="#999"
                                    />
                                    <TouchableOpacity
                                        onPress={toggleFilterSheet}
                                        style={styles.filterButton}
                                    >
                                        <FilterIcon size={20} color="#6C63FF" />
                                    </TouchableOpacity>
                                </View>

                                <QuickFilters
                                    onFilterChange={handleFilterChange}
                                    activeFilter={activeFilter}
                                />

                                <View style={styles.resultsHeader}>
                                    <Text style={styles.resultsCount}>
                                        {filteredInternships.length} opportunities found
                                    </Text>
                                    <TouchableOpacity style={styles.sortButton}>
                                        <Text style={styles.sortButtonText}>Sort by: Recent</Text>
                                        <ChevronRight size={16} color="#6B7280" />
                                    </TouchableOpacity>
                                </View>
                            </SpringFadeIn>
                        </View>
                    )}
                    data={filteredInternships}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <InternshipCard
                            item={item}
                            onPress={(internship) => {
                                navigation.navigate('InternshipDetail', { internship });
                            }}
                            onSave={handleSaveInternship}
                            index={index}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                No internships found matching your criteria
                            </Text>
                        </View>
                    )}
                />
            </View>

            {showFilters && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleFilterSheet}
                >
                    <FilterSheet />
                </TouchableOpacity>
            )}
        </View>
    );
};
const InternshipDetailScreen = ({ route, navigation }) => {
    const { internship } = route.params;

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <View style={styles.detailContent}>
                    <CompanyHeader company={internship.company} />
                    <InternshipOverview internship={internship} />
                    <JobDescription internship={internship} />
                    <RequirementsSection internship={internship} />
                    <BenefitsSection internship={internship} />

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => handleSaveInternship(internship)}
                        >
                            <BookmarkPlus size={20} color="#6C63FF" />
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => navigation.navigate('ApplicationForm', { internship })}
                        >
                            <Text style={styles.applyButtonText}>Quick Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// Application Form Screen:
const InternshipApplicationScreen = ({ route, navigation }) => {
    const { internship } = route.params;
    const [formData, setFormData] = useState({
        resumeUrl: '',
        coverLetter: '',
        portfolioUrl: '',
        availability: '',
    });

    const handleSubmit = async () => {
        try {
            // Submit application logic here
            navigation.navigate('ApplicationSuccess', {
                internship,
                applicationId: 'some-id'
            });
        } catch (error) {
            // Handle error
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <View style={styles.formContent}>
                    <ApplicationForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

// Application Success Screen:
const ApplicationSuccessScreen = ({ route, navigation }) => {
    const { internship, applicationId } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.successContent}>
                <SuccessAnimation />
                <Text style={styles.successTitle}>Application Submitted!</Text>
                <Text style={styles.successMessage}>
                    Your application for {internship.title} at {internship.company} has been submitted successfully.
                </Text>
                <View style={styles.successActions}>
                    <TouchableOpacity
                        style={styles.viewApplicationButton}
                        onPress={() => navigation.navigate('MyApplications')}
                    >
                        <Text style={styles.viewApplicationText}>View My Applications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('InternshipList')}
                    >
                        <Text style={styles.backButtonText}>Back to Internships</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchBar: {
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
    filterButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    quickFiltersContainer: {
        marginBottom: 16,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        marginRight: 12,
    },
    filterChipActive: {
        backgroundColor: '#6C63FF',
    },
    filterIcon: {
        marginRight: 8,
    },
    filterLabel: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    filterLabelActive: {
        color: '#FFFFFF',
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    resultsCount: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    sortButtonText: {
        color: '#6B7280',
        fontSize: 14,
        marginRight: 4,
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    companyInitials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6C63FF',
    },
    headerInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusActive: {
        backgroundColor: '#DEF7EC',
    },
    statusUpcoming: {
        backgroundColor: '#FEF3C7',
    },
    statusDefault: {
        backgroundColor: '#F3F4F6',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    saveButton: {
        padding: 8,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 12,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#4B5563',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#6C63FF',
        fontWeight: '500',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    deadline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#EF4444',
        fontWeight: '500',
    },
    postedDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 8,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
    filterSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filterSheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#6B7280',
    },
    filterContent: {
        padding: 16,
    },
    filterSection: {
        marginBottom: 24,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        marginRight: 12,
    },
    filterOptionText: {
        fontSize: 14,
        color: '#4B5563',
    },
    filterActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    resetButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6C63FF',
        marginRight: 12,
    },
    resetButtonText: {
        color: '#6C63FF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    applyButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#6C63FF',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});



export default StudentInternshipScreen;