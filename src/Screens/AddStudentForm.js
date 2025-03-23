import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';
import { CustomButton } from '../Components/CustomButton';
import  GetDepartmentList  from '../Services/DepartmentService/GetDepartmentList';
import  CreateStudentInfo  from '../Services/StudentService/CreateStudentInfo'; // Import the API function
import Toast from 'react-native-toast-message';

const AddStudentForm = ({ navigation }) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    father_Name: '',
    rollNo: '',
    cnic: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    departmentId: '',
    email: '', // Add email field
    password: '', // Add password field
  });

  const [errors, setErrors] = useState({});

  // Fetch department list on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await GetDepartmentList(); 
  
        if (Array.isArray(data)) {
          setDepartmentData(data);
        } else {
          console.error("Department data is not an array:", data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);
  

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.father_Name.trim()) newErrors.father_Name = 'Father name is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.departmentId.trim()) newErrors.departmentId = 'Department is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      const studentData = {
        name: formData.name,
        father_Name: formData.father_Name,
        rollNo: formData.rollNo,
        cnic: formData.cnic,
        phone: formData.phone,
        address: formData.address,
        dob: formData.dob,
        gender: formData.gender,
        departmentId: formData.departmentId,
        email: formData.email, // Include email
        password: formData.password, // Include password
      };

      try {
        await CreateStudentInfo(studentData); // Call the API
        Toast.show({
          type: 'success',
          text1: 'Student created successfully!',
          onHide: () => navigation.goBack(),
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error.message || 'An error occurred while creating the student',
        });
      }
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  // Show error message if fetching data fails
  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>Error fetching department data. Please try again later.</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.EditDepartmentScreenmainContainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Student Registration"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditDepartmentScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditDepartmentScreenscrollContent}
        >
          <Text style={styles.AddStudentFormformTitle}>Add New Student</Text>

          <View style={styles.AddStudentFormlegendContainer}>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormrequiredDot]} />
              <Text style={styles.AddStudentFormlegendText}>Required*</Text>
            </View>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormoptionalDot]} />
              <Text style={styles.AddStudentFormlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Student Information">
            <FormField
              label="Student Name"
              placeholder="Enter student's name"
              required
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              error={errors.name}
            />

            <FormField
              label="Father Name"
              placeholder="Enter father's name"
              required
              value={formData.father_Name}
              onChangeText={(text) => setFormData({ ...formData, father_Name: text })}
              error={errors.father_Name}
            />

            <FormField
              label="Roll No"
              placeholder="Enter student roll number"
              required
              value={formData.rollNo}
              onChangeText={(text) => setFormData({ ...formData, rollNo: text })}
              error={errors.rollNo}
            />

            <FormField
              label="CNIC No"
              placeholder="00000-0000000-0"
              required
              value={formData.cnic}
              onChangeText={(text) => setFormData({ ...formData, cnic: text })}
              keyboardType="numeric"
              error={errors.cnic}
            />

            <FormField
              label="Phone No"
              placeholder="e.g +44xxxxxxxxxx"
              required
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <FormField
              label="Address"
              placeholder="Enter student's address"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />

            <FormField
              label="Date of Birth"
              placeholder="Select Date"
              type="date"
              required
              value={formData.dob}
              onChangeText={(text) => setFormData({ ...formData, dob: text })}
              error={errors.dob}
            />

            <FormField
              label="Gender"
              placeholder="Select Gender"
              type="select"
              options={[
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
]}
              required
              value={formData.gender}
              onChangeText={(text) => setFormData({ ...formData, gender: text })}
              error={errors.gender}
            />

<FormField
  label="Department"
  placeholder="Select Department"
  type="select"
  options={departmentData.map(dept => ({
    label: dept.departmentName, 
    value: dept.id?.toString() // Ensure value is a string
  }))} 
  required
  value={formData.departmentId}
  onChangeText={(text) => setFormData({ ...formData, departmentId: text })}
  error={errors.departmentId}
/>


            {/* Add Email Field */}
            <FormField
              label="Email"
              placeholder="Enter student's email"
              required
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              error={errors.email}
            />

            {/* Add Password Field */}
            <FormField
              label="Password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry // Hide password input
              error={errors.password}
            />
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              { title: "Cancel", onPress: () => navigation.goBack(), variant: "secondary" },
              { title: "Register Student", onPress: handleSubmit, variant: "primary" },
            ]}
          />
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default AddStudentForm;