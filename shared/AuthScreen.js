import React, { useState, useEffect, useRef } from 'react';
import { RegisterForPushNotificationsAsync } from '../Src_std/StdServices/RegisterForPushNotificationsAsync';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';  
import { MaterialIcons } from '@expo/vector-icons';

import { API_BASE_URL } from '../src/Services/Config'; 
import { useAuth } from './AuthContext';

const PASSWORD_REGEX = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AuthScreen = ({ navigation }) => {
    const { signIn } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        employeeId: '',
        studentId: '',
        department: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const hasAnimated = useRef(false);
   
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

    const validateForm = async () => {
        const newErrors = {};

        if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!PASSWORD_REGEX.test(formData.password)) {
            newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
        }

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
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
          // 1. Perform login request
          const response = await fetch(`${API_BASE_URL}/api/Account/Login`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
              email: formData.email.toLowerCase(),
              password: formData.password,
            }),
          });
      
          // 2. Handle response errors
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login failed. Please try again.');
          }
      
          // 3. Parse successful response
          const data = await response.json();
          console.log('Login API Response:', data);
      
          // 4. Validate response structure
          if (!data?.token || !data?.role) {
            throw new Error('Server returned invalid response format');
          }
      
          // 5. Parse JWT to get user ID
          const parseJwt = (token) => {
            try {
              const base64Url = token.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              return JSON.parse(atob(base64));
            } catch (e) {
              throw new Error('Failed to parse authentication token');
            }
          };
      
          const decodedToken = parseJwt(data.token);
          const userId = decodedToken.sub; // Get user ID from JWT
          console.log('Decoded user ID:', userId);
      
          // 6. Register for push notifications (if not already done)
          let expoPushToken;
          try {
            expoPushToken = await RegisterForPushNotificationsAsync();
            if (expoPushToken) {
              console.log('Expo Push Token:', expoPushToken);
              await registerDeviceWithBackend(data.token, userId, expoPushToken);
            }
          } catch (notificationError) {
            console.warn('Push notification registration failed:', notificationError);
            // Continue with login even if notifications fail
          }
      
          // 7. Complete the login process
          await signIn(data.token, data.role.toLowerCase());
          
          // 8. Navigate based on role
          const roleRoutes = {
            STUDENT: 'StudentDashboard',
            TEACHER: 'TeacherDashboard',
            ADMIN: 'AdminDashboard'
          };
          console.log(data.role);
          if (roleRoutes[data.role]) {
            navigation.navigate(roleRoutes[data.role]);
          }
      
        } catch (error) {
          console.error('Login error:', error);
          Alert.alert(
            'Login Failed',
            error.message || 'An error occurred during login'
          );
        } finally {
          setIsLoading(false);
        }
      };
    const handleRoleSelection = (roleId) => {
        Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            setSelectedRole(roleId);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        });
    };

    const handleAuthToggle = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
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
                            source={require('../src/Assets/logo.jpg')}
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