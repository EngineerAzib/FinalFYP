


import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import styles from '../AdminPortal_Css';

const StudentInternApplicationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        university: '',
        major: '',
        graduationYear: '',
        experience: '',
        whyInterested: '',
        resume: null,
        coverLetter: null
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.fullName) {
            tempErrors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.phone) {
            tempErrors.phone = 'Phone number is required';
            isValid = false;
        }

        if (!formData.university) {
            tempErrors.university = 'University is required';
            isValid = false;
        }

        if (!formData.major) {
            tempErrors.major = 'Major is required';
            isValid = false;
        }

        if (!formData.graduationYear) {
            tempErrors.graduationYear = 'Graduation year is required';
            isValid = false;
        }

        if (!formData.whyInterested) {
            tempErrors.whyInterested = 'Please explain your interest';
            isValid = false;
        }

        if (!formData.resume) {
            tempErrors.resume = 'Resume is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
        } else {
            Alert.alert(
                'Incomplete Application',
                'Please fill in all required fields correctly.',
                [{ text: 'OK' }]
            );
        }
    };

    const pickDocument = async (type) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true
            });

            if (result.type === 'success') {
                setFormData(prev => ({
                    ...prev,
                    [type]: {
                        uri: result.uri,
                        name: result.name,
                        size: result.size
                    }
                }));
                setErrors(prev => ({ ...prev, [type]: null }));
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to upload document');
        }
    };

    const InputField = ({ label, value, onChangeText, error, multiline, keyboardType = 'default' }) => (
        <View style={styles.StudentInternshipScreeninputContainer}>
            <Text style={styles.StudentInternshipScreeninputLabel}>{label}</Text>
            <TextInput
                style={[
                    styles.StudentInternshipScreentextInput,
                    multiline && styles.StudentInternshipScreentextArea,
                    error && { borderColor: '#EF4444' }
                ]}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                keyboardType={keyboardType}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
            {error && (
                <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{error}</Text>
            )}
        </View>
    );

    const DocumentUpload = ({ label, onPress, file, error }) => (
        <View style={styles.StudentInternshipScreeninputContainer}>
            <Text style={styles.StudentInternshipScreeninputLabel}>{label}</Text>
            <TouchableOpacity
                style={[
                    styles.StudentInternshipScreendocumentUpload,
                    error && { borderColor: '#EF4444' }
                ]}
                onPress={onPress}
            >
                <FontAwesome5 name="file-pdf" size={24} color={file ? '#6C63FF' : '#9CA3AF'} />
                <Text style={[
                    styles.StudentInternshipScreendocumentUploadText,
                    file && { color: '#6C63FF' }
                ]}>
                    {file ? file.name : `Upload your ${label.toLowerCase()}`}
                </Text>
            </TouchableOpacity>
            {error && (
                <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{error}</Text>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.StudentInternshipScreenformContainer}>
                <InputField
                    label="Full Name"
                    value={formData.fullName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                    error={errors.fullName}
                />

                <InputField
                    label="Email"
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    error={errors.email}
                    keyboardType="email-address"
                />

                <InputField
                    label="Phone Number"
                    value={formData.phone}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                    error={errors.phone}
                    keyboardType="phone-pad"
                />

                <InputField
                    label="University"
                    value={formData.university}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, university: text }))}
                    error={errors.university}
                />

                <InputField
                    label="Major"
                    value={formData.major}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, major: text }))}
                    error={errors.major}
                />

                <InputField
                    label="Expected Graduation Year"
                    value={formData.graduationYear}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, graduationYear: text }))}
                    error={errors.graduationYear}
                    keyboardType="numeric"
                />

                <InputField
                    label="Relevant Experience"
                    value={formData.experience}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, experience: text }))}
                    error={errors.experience}
                    multiline
                />

                <InputField
                    label="Why are you interested in this position?"
                    value={formData.whyInterested}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, whyInterested: text }))}
                    error={errors.whyInterested}
                    multiline
                />

                <DocumentUpload
                    label="Resume"
                    onPress={() => pickDocument('resume')}
                    file={formData.resume}
                    error={errors.resume}
                />

                <DocumentUpload
                    label="Cover Letter"
                    onPress={() => pickDocument('coverLetter')}
                    file={formData.coverLetter}
                    error={errors.coverLetter}
                />

                <View style={styles.StudentInternshipScreensubmitContainer}>
                    <TouchableOpacity
                        style={styles.StudentInternshipScreensubmitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.StudentInternshipScreensubmitButtonText}>Submit Application</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};



export default StudentInternApplicationForm;