import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepartmentListScreen } from './src/Screens/DepartmentListScreen';
import { EditDepartmentScreen } from './src/Screens/EditDepartmentScreen';
import { CreateDepartmentScreen } from './src/Screens/CreateDepartmentScreen';
import AddStudentForm from './src/Screens/AddStudentForm';
import AllStudentsScreen from './src/Screens/AllStudentsScreen';
import CreateSubjectsScreen from './src/Screens/CreateSubjectsScreen';
import { DepartmentListScreen2 } from './src/Screens/DepartmentListScreen2';
import { EditCourseScreen } from './src/Screens/EditCourseScreen';
import { DepartmentSemestersScreen } from './src/Screens/DepartmentSemestersScreen';
import { SemesterCoursesScreen } from './src/Screens/SemesterCoursesScreen';
import { EditEventScreen } from './src/Screens/EditEventScreen';
import { EventListScreen } from './src/Screens/EventListScreen';
import { CreateEventScreen } from './src/Screens/CreateEventScreen';
import { NewsListScreen } from './src/Screens/NewsListScreen';
import { EditNewsScreen } from './src/Screens/EditNewsScreen';
import { CreateNewsScreen } from './src/Screens/CreateNewsScreen';
import { InternshipListScreen } from './src/Screens/InternshipListScreen';
import { EditInternshipScreen } from './src/Screens/EditInternshipScreen';
import { CreateInternshipScreen } from './src/Screens/CreateInternshipScreen';
import { StudentProfileView } from './src/Screens/StudentProfileView';
import { EditStudentBasicInfo } from './src/Screens/EditStudentBasicInfo';
import { EditStudentAcademics } from './src/Screens/EditStudentAcademics';
import { EditStudentAttendance } from './src/Screens/EditStudentAttendance';
import { TeacherViewScreen } from './src/Screens/TeacherViewScreen';
import { EditTeacherAttendance } from './src/Screens/EditTeacherAttendance';
import { EditTeacherFeedback } from './src/Screens/EditTeacherFeedback';
import { EditTeacherSchedule } from './src/Screens/EditTeacherSchedule';
import { EditTeacherBasicInfo } from './src/Screens/EditTeacherBasicInfo';
import { ExamScheduleView } from './src/Screens/ExamScheduleView';
import { CreateExamSchedule } from './src/Screens/CreateExamSchedule';
import { EditExamSchedule } from './src/Screens/EditExamSchedule';
import AllTeachersScreen from './src/Screens/AllTeacherScreen';
import Dashboard from './src/Screens/Dashboard';
import AdminProfile from './src/Screens/AdminProfile';
import { ExamScheduleYearScreen } from './src/Screens/ExamScheduleYearScreen ';
import { ExamScheduleDetailsScreen } from './src/Screens/ExamScheduleDetailsScreen ';
import { ExamScheduleDepartmentScreen } from './src/Screens/ExamScheduleDepartmentScreen';
import CreateSemesterRegistration from './src/Screens/CreateSemesterRegistration';
import { SemesterDetailsScreen } from './src/Screens/SemesterDetailsScreen';
import { EditSemesterRegistration } from './src/Screens/EditSemesterRegistration';
import { SemesterListScreen } from './src/Screens/SemesterListScreen';
import { NotificationScreen } from './src/Screens/NotificationScreen';
import CreateTeacherForm from './src/Screens/CreateTeacherForm';

import { CreateNotificationScreen } from './src/Screens/CreateNotificationScreen';
import { CreateTeachingScheduleScreen } from './src/Screens/CreateTeachingScheduleScreen';
import { CreateClassAttendanceScreen } from './src/Screens/CreateClassAttendanceScreen';
import { CreateStudentFeedbackScreen } from './src/Screens/CreateStudentFeedbackScreen';

import { CreateAcademicRecordScreen } from './src/Screens/CreateAcademicRecordScreen';
import { CreateSemesterAttendanceScreen } from './src/Screens/CreateSemesterAttendanceScreen';
import { SemesterReg_DepartmentListScreen } from './src/Screens/SemesterReg_DepartmentListScreen';

import { AddSemester } from './src/Screens/AddSemester';
import { AddAttendance } from './src/Screens/AddAttendance';
import { AddTeacherSchedule } from './src/Screens/AddTeacherSchedule';
import { AddTeacherAttendance } from './src/Screens/AddTeacherAttendance';
//student portal screens

import { createRef } from 'react';
import StudentAcademicsView from './Src_std/Screens/StudentAcademicsView';
import StudentSemesterRegistrationScreen from './Src_std/Screens/StudentSemesterRegistrationScreen';
import StudentRegistrationSuccessScreen from './Src_std/Screens/StudentRegistrationSuccessScreen';
import StudentRegistrationConfirmationScreen from './Src_std/Screens/StudentRegistrationConfirmationScreen';
import StudentAttendanceScreen from './Src_std/Screens/StudentAttendanceScreen';
import MyCoursesScreen from './Src_std/Screens/MyCoursesScreen';
import StudentExamScheduleScreen from './Src_std/Screens/StudentExamScheduleScreen';
import StudentNewsScreen from './Src_std/Screens/StudentNewsScreen';
import StudentDashboardScreen from './Src_std/Screens/StudentDashboardScreen';
import StudentInternshipScreen from './Src_std/Screens/StudentInternshipScreen';
import InternshipDetailScreen from './Src_std/Screens/InternshipDetailScreen';
import InternshipApplicationScreen from './Src_std/Screens/InternshipApplicationScreen';
import ApplicationSuccessScreen from './Src_std/Screens/ApplicationSuccessScreen';
import EventsScreen from './Src_std/Screens/EventsScreen';
import { navigationRef } from './src/Screens/RootNavigation'; 
//Shared folder 
import { AuthScreen } from './shared/AuthScreen';
import { AuthProvider } from './shared/AuthContext';
import { useAuth } from './shared/AuthContext';


const Stack = createNativeStackNavigator();


// AdminStack - for admin screensS

const AdminStack = () => (
  
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  

  {/* <Stack.Screen name="AuthScreen" component={AuthScreen} /> */}
    <Stack.Screen name="Dashboard" component={Dashboard} />


    <Stack.Screen name="AdminProfile" component={AdminProfile} />
    <Stack.Screen name="DepartmentListScreen" component={DepartmentListScreen} />
    <Stack.Screen name="EditDepartmentScreen" component={EditDepartmentScreen} />
    <Stack.Screen name="CreateDepartmentScreen" component={CreateDepartmentScreen} />


    <Stack.Screen name="SemesterReg_DepartmentListScreen" component={SemesterReg_DepartmentListScreen} />
    <Stack.Screen name="SemesterListScreen" component={SemesterListScreen} />
    <Stack.Screen name="SemesterDetailsScreen" component={SemesterDetailsScreen} />
    <Stack.Screen name="EditSemesterRegistration" component={EditSemesterRegistration} />
    <Stack.Screen name="CreateSemesterRegistration" component={CreateSemesterRegistration} />
    <Stack.Screen name="AddSemester" component={AddSemester} />
    <Stack.Screen name="AddAttendance" component={AddAttendance} />
    <Stack.Screen name="AddTeacherSchedule" component={AddTeacherSchedule} />
    <Stack.Screen name="AddTeacherAttendance" component={AddTeacherAttendance} />

    <Stack.Screen name="AllTeachersScreen" component={AllTeachersScreen} />
    <Stack.Screen name="TeacherViewScreen" component={TeacherViewScreen} />
    <Stack.Screen name="EditTeacherBasicInfo" component={EditTeacherBasicInfo} />
    <Stack.Screen name="EditTeacherAttendance" component={EditTeacherAttendance} />
    <Stack.Screen name="EditTeacherFeedback" component={EditTeacherFeedback} />
    <Stack.Screen name="EditTeacherSchedule" component={EditTeacherSchedule} />
    <Stack.Screen name="CreateTeacherForm" component={CreateTeacherForm} />


    <Stack.Screen name="StudentProfileView" component={StudentProfileView} />
    <Stack.Screen name="EditStudentBasicInfo" component={EditStudentBasicInfo} />
    <Stack.Screen name="EditStudentAcademics" component={EditStudentAcademics} />
    <Stack.Screen name="EditStudentAttendance" component={EditStudentAttendance} />
    <Stack.Screen name="AllStudentsScreen" component={AllStudentsScreen} />
    <Stack.Screen name="AddStudentForm" component={AddStudentForm} />

    <Stack.Screen name="InternshipListScreen" component={InternshipListScreen} />
    <Stack.Screen name="EditInternshipScreen" component={EditInternshipScreen} />
    <Stack.Screen name="CreateInternshipScreen" component={CreateInternshipScreen} />

    <Stack.Screen name="NewsListScreen" component={NewsListScreen} />
    <Stack.Screen name="EditNewsScreen" component={EditNewsScreen} />
    <Stack.Screen name="CreateNewsScreen" component={CreateNewsScreen} />


    <Stack.Screen name="EventListScreen" component={EventListScreen} />
    <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
    <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />


    <Stack.Screen name="DepartmentListScreen2" component={DepartmentListScreen2} />
    <Stack.Screen name="SemesterCoursesScreen" component={SemesterCoursesScreen} />
    <Stack.Screen name="CreateSubjectsScreen" component={CreateSubjectsScreen} />
    <Stack.Screen name="DepartmentSemestersScreen" component={DepartmentSemestersScreen} />
    <Stack.Screen name="EditCourseScreen" component={EditCourseScreen} />


    <Stack.Screen name="ExamScheduleDepartmentScreen" component={ExamScheduleDepartmentScreen} />
    <Stack.Screen name="ExamScheduleYearScreen" component={ExamScheduleYearScreen} />
    <Stack.Screen name="ExamScheduleDetailsScreen" component={ExamScheduleDetailsScreen} />
    <Stack.Screen name="CreateExamSchedule" component={CreateExamSchedule} />
    <Stack.Screen name="EditExamSchedule" component={EditExamSchedule} />

    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

    <Stack.Screen name="CreateTeachingScheduleScreen" component={CreateTeachingScheduleScreen} />

    <Stack.Screen name="CreateNotificationScreen" component={CreateNotificationScreen} />

    <Stack.Screen name="CreateClassAttendanceScreen" component={CreateClassAttendanceScreen} />
    <Stack.Screen name="CreateStudentFeedbackScreen" component={CreateStudentFeedbackScreen} />

    <Stack.Screen name="CreateAcademicRecordScreen" component={CreateAcademicRecordScreen} />

    <Stack.Screen name="CreateSemesterAttendanceScreen" component={CreateSemesterAttendanceScreen} />
  </Stack.Navigator>
);


// StudentStack - for student screens
const StudentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  {/* <Stack.Screen name="AuthScreen" component={AuthScreen} /> */}
    <Stack.Screen name="StudentDashboardScreen" component={StudentDashboardScreen} />
    <Stack.Screen name="AdminProfile" component={AdminProfile} />

    <Stack.Screen name="StudentAcademicsView" component={StudentAcademicsView} />

    <Stack.Screen name="StudentSemesterRegistrationScreen" component={StudentSemesterRegistrationScreen} />
    <Stack.Screen name="StudentRegistrationSuccessScreen" component={StudentRegistrationSuccessScreen} />
    <Stack.Screen name="StudentRegistrationConfirmationScreen" component={StudentRegistrationConfirmationScreen} />

    <Stack.Screen name="StudentInternshipScreen" component={StudentInternshipScreen} />
    <Stack.Screen name="InternshipDetailScreen" component={InternshipDetailScreen} />
    <Stack.Screen name="InternshipApplicationScreen" component={InternshipApplicationScreen} />
    <Stack.Screen name="ApplicationSuccessScreen" component={ApplicationSuccessScreen} />

    <Stack.Screen name="EventsScreen" component={EventsScreen} />

    <Stack.Screen name="StudentAttendanceScreen" component={StudentAttendanceScreen} />

    <Stack.Screen name="MyCoursesScreen" component={MyCoursesScreen} />

    <Stack.Screen name="StudentExamScheduleScreen" component={StudentExamScheduleScreen} />

    <Stack.Screen name="StudentNewsScreen" component={StudentNewsScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
);
// AuthStack - for authentication



// Main navigation container with conditional rendering based on auth state
// AppNavigator.js (or wherever you define AppNavigator)
const AppNavigator = () => {
  const { userToken, userRole, isLoading } = useAuth();
console.log(userToken,userRole)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Remove NavigationContainer here - just return the appropriate stack
  return userToken ? (
    userRole === 'student' ? (
      <StudentStack />
    ) : (
      <AdminStack />
    )
  ) : (
    <AuthStack />
  );
};


const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;