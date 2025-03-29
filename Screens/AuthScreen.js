import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import * as Crypto from 'expo-crypto';

// Secure password validation regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthScreen = ({ navigation }) => {
    // State management
    const [isLogin, setIsLogin] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        employeeId: '', // For teachers and admin
        studentId: '', // For students
        department: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const hasAnimated = useRef(false);

    // Role options with their respective icons and descriptions
    const roles = [
        {
            id: 'student',
            title: 'Student',
            icon: 'school',
            description: 'Access your courses, grades, and academic resources',
            color: '#6C63FF',
            bgColor: '#EEF0FB'
        },
        {
            id: 'teacher',
            title: 'Teacher',
            icon: 'person',
            description: 'Manage courses, grades, and student progress',
            color: '#10B981',
            bgColor: '#F0FDF4'
        },
        {
            id: 'admin',
            title: 'Administrator',
            icon: 'admin-panel-settings',
            description: 'Full system access and management capabilities',
            color: '#F59E0B',
            bgColor: '#FEF3C7'
        }
    ];

    // Animation effects
    useEffect(() => {
        if (!hasAnimated.current) {
            hasAnimated.current = true;
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, []);


    // Form validation
    const validateForm = async () => {
        const newErrors = {};

        // Email validation
        if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!PASSWORD_REGEX.test(formData.password)) {
            newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
        }

        // Additional signup validations
        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            if (!formData.fullName?.trim()) {
                newErrors.fullName = 'Full name is required';
            }

            if (selectedRole === 'student' && !formData.studentId) {
                newErrors.studentId = 'Student ID is required';
            }

            if (['teacher', 'admin'].includes(selectedRole) && !formData.employeeId) {
                newErrors.employeeId = 'Employee ID is required';
            }

            if (!formData.department?.trim()) {
                newErrors.department = 'Department is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const isValid = await validateForm();
            if (!isValid) {
                setIsLoading(false);
                return;
            }

            // Hash password before sending to server
            const hashedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                formData.password
            );

            // Prepare data for API call
            const authData = {
                email: formData.email.toLowerCase(),
                password: hashedPassword,
                role: selectedRole,
                ...(isLogin ? {} : {
                    fullName: formData.fullName,
                    department: formData.department,
                    ...(selectedRole === 'student'
                        ? { studentId: formData.studentId }
                        : { employeeId: formData.employeeId }
                    )
                })
            };

            // For development/testing, simulate API call
            console.log('Auth Data:', authData);

            // Temporary: Show alert instead of navigation
            Alert.alert(
                isLogin ? 'Login Successful' : 'Registration Successful',
                `Welcome ${formData.email}!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Only attempt navigation if we have the screens set up
                            if (navigation?.navigate) {
                                navigation.navigate(`${selectedRole}Dashboard`);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    const handleRoleSelection = (roleId) => {
        // Fade out current content
        Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            // Update role and fade back in
            setSelectedRole(roleId);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        });
    };
    const handleAuthToggle = () => {
        // Fade out current content
        Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            // Reset form and toggle mode
            setIsLogin(!isLogin);
            setSelectedRole(null);
            setErrors({});
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                fullName: '',
                employeeId: '',
                studentId: '',
                department: '',
            });

            // Fade back in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.authContainer}
        >
            <ScrollView
                contentContainerStyle={styles.authScrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Animated.View
                    style={[
                        styles.authContent,
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0]
                                    })
                                },
                                { scale: scaleAnim }
                            ]
                        }
                    ]}
                >
                    {/* Logo and Header */}
                    <View style={styles.authHeader}>
                        <Image
                            source={require('../Assets/logo.jpg')}
                            style={styles.authLogo}
                        />
                        <Text style={styles.authTitle}>
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </Text>
                        <Text style={styles.authSubtitle}>
                            {isLogin
                                ? 'Sign in to continue to your portal'
                                : 'Join us to access your educational portal'
                            }
                        </Text>
                    </View>

                    {/* Role Selection */}
                    {(!isLogin || !selectedRole) && (
                        <View style={styles.roleSelectionContainer}>
                            <Text style={styles.roleSelectionTitle}>Select Your Role</Text>
                            <View style={styles.rolesGrid}>
                                {roles.map((role) => (
                                    <TouchableOpacity
                                        key={role.id}
                                        style={[
                                            styles.roleCard,
                                            selectedRole === role.id && styles.roleCardSelected,
                                            { backgroundColor: role.bgColor }
                                        ]}
                                        onPress={() => handleRoleSelection(role.id)}
                                    >
                                        <View style={[
                                            styles.roleIconContainer,
                                            { backgroundColor: role.color }
                                        ]}>
                                            <MaterialIcons
                                                name={role.icon}
                                                size={24}
                                                color="#FFFFFF"
                                            />
                                        </View>
                                        <Text style={styles.roleTitle}>{role.title}</Text>
                                        <Text style={styles.roleDescription}>
                                            {role.description}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Authentication Form */}
                    <View style={styles.authForm}>
                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputContainer}>
                                <MaterialIcons name="email" size={20} color="#6B7280" />
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputContainer}>
                                <MaterialIcons name="lock" size={20} color="#6B7280" />
                                <TextInput
                                    style={styles.input}
                                    value={formData.password}
                                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                                    placeholder="Enter your password"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.showPasswordButton}
                                >
                                    <MaterialIcons
                                        name={showPassword ? 'visibility-off' : 'visibility'}
                                        size={20}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                        </View>

                        {/* Additional Signup Fields */}
                        {!isLogin && (
                            <>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Confirm Password</Text>
                                    <View style={styles.inputContainer}>
                                        <MaterialIcons name="lock" size={20} color="#6B7280" />
                                        <TextInput
                                            style={styles.input}
                                            value={formData.confirmPassword}
                                            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                            placeholder="Confirm your password"
                                            secureTextEntry={!showPassword}
                                        />
                                    </View>
                                    {errors.confirmPassword && (
                                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                    )}
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Full Name</Text>
                                    <View style={styles.inputContainer}>
                                        <MaterialIcons name="person" size={20} color="#6B7280" />
                                        <TextInput
                                            style={styles.input}
                                            value={formData.fullName}
                                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                            placeholder="Enter your full name"
                                        />
                                    </View>
                                    {errors.fullName && (
                                        <Text style={styles.errorText}>{errors.fullName}</Text>
                                    )}
                                </View>

                                {selectedRole === 'student' ? (
                                    <View style={styles.formGroup}>
                                        <Text style={styles.inputLabel}>Student ID</Text>
                                        <View style={styles.inputContainer}>
                                            <MaterialIcons name="badge" size={20} color="#6B7280" />
                                            <TextInput
                                                style={styles.input}
                                                value={formData.studentId}
                                                onChangeText={(text) => setFormData({ ...formData, studentId: text })}
                                                placeholder="Enter your student ID"
                                            />
                                        </View>
                                        {errors.studentId && (
                                            <Text style={styles.errorText}>{errors.studentId}</Text>
                                        )}
                                    </View>
                                ) : (
                                    <View style={styles.formGroup}>
                                        <Text style={styles.inputLabel}>Employee ID</Text>
                                        <View style={styles.inputContainer}>
                                            <MaterialIcons name="badge" size={20} color="#6B7280" />
                                            <TextInput
                                                style={styles.input}
                                                value={formData.employeeId}
                                                onChangeText={(text) => setFormData({ ...formData, employeeId: text })}
                                                placeholder="Enter your employee ID"
                                            />
                                        </View>
                                        {errors.employeeId && (
                                            <Text style={styles.errorText}>{errors.employeeId}</Text>
                                        )}
                                    </View>
                                )}

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Department</Text>
                                    <View style={styles.inputContainer}>
                                        <MaterialIcons name="business" size={20} color="#6B7280" />
                                        <TextInput
                                            style={styles.input}
                                            value={formData.department}
                                            onChangeText={(text) => setFormData({ ...formData, department: text })}
                                            placeholder="Enter your department"
                                        />
                                    </View>
                                    {errors.department && (
                                        <Text style={styles.errorText}>{errors.department}</Text>
                                    )}
                                </View>
                            </>
                        )}

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                isLoading && styles.submitButtonDisabled
                            ]}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.submitButtonText}>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Toggle Login/Signup */}
                        {/* Toggle Login/Signup */}
                        <TouchableOpacity
                            style={styles.toggleAuthButton}
                            onPress={handleAuthToggle}
                        >
                            <Text style={styles.toggleAuthText}>
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : 'Already have an account? Sign In'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        backgroundColor: '#F9FAFB'
    },
    authScrollContainer: {
        flexGrow: 1,
        paddingBottom: 24
    },
    authContent: {
        flex: 1,
        padding: 24
    },
    authHeader: {
        alignItems: 'center',
        marginBottom: 32
    },
    authLogo: {
        width: 120,
        height: 120,
        marginBottom: 16
    },
    authTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8
    },
    authSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24
    },
    roleSelectionContainer: {
        marginBottom: 32
    },
    roleSelectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16
    },
    rolesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8
    },
    roleCard: {
        flex: 1,
        minWidth: '45%',
        margin: 8,
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent'
    },
    roleCardSelected: {
        borderColor: '#6C63FF'
    },
    roleIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8
    },
    roleDescription: {
        fontSize: 14,
        color: '#6B7280'
    },
    authForm: {
        width: '100%'
    },
    formGroup: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#1F2937'
    },
    showPasswordButton: {
        padding: 8
    },
    errorText: {
        fontSize: 14,
        color: '#EF4444',
        marginTop: 4
    },
    submitButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    submitButtonDisabled: {
        opacity: 0.7
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    },
    toggleAuthButton: {
        marginTop: 16,
        alignItems: 'center'
    },
    toggleAuthText: {
        fontSize: 14,
        color: '#6C63FF',
        fontWeight: '500'
    }
});

