import { Fullscreen } from 'lucide-react';
import React from 'react';
import { Dimensions } from 'react-native';

import { View, StyleSheet, ScrollView, SafeAreaView, Image, Platform, Animated, TouchableOpacity, Text } from 'react-native';
const cardWidth = (width - 30) / 2;
const { width: WINDOW_WIDTH } = Dimensions.get('window');

const { width, height } = Dimensions.get('window');


const AdminPortal_Css = StyleSheet.create({
  //add student form
  AddStudentFormmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  AddStudentFormcontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  AddStudentFormscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  AddStudentFormcontainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  AddStudentFormenhancedHeader: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  AddStudentFormheaderButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    gap: 12,
  },
  AddStudentFormcustomizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6584',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  AddStudentFormimportButton: {

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  AddStudentFormbuttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  AddStudentFormscrollView: {
    flex: 1,
  },

  AddStudentFormcontentContainer: {
    padding: 0,
  },
  AddStudentFormformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  AddStudentFormlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  AddStudentFormlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  AddStudentFormlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  AddStudentFormrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  AddStudentFormoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  AddStudentFormlegendText: {
    color: '#495057',
    fontSize: 14,
  },


  //AdminProfile screen


  AdminProfilecontainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  AdminProfileprofileContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  AdminProfileavatarContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  AdminProfilelogoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  AdminProfilelogoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  AdminProfilelogoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '500',
    marginLeft: 8,
  },
  AdminProfilelogoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 30,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AdminProfileavatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4ade80',
  },
  AdminProfilebadgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4ade80',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AdminProfileuserName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  AdminProfilestatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: -20,
  },
  AdminProfileglassCard: {
    width: width / 3.5,
    aspectRatio: 1,
    borderRadius: 20,
    padding: -20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1e293b',
    overflow: 'hidden',

  },
  AdminProfilestatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  AdminProfilestatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  AdminProfilestatTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  AdminProfiledetailsContainer: {
    padding: 16,
    marginTop: 20,
  },
  AdminProfiledetailSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  AdminProfilesectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  AdminProfileheaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AdminProfileheaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  AdminProfileheaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  AdminProfilesectionContent: {
    overflow: 'hidden',
  },
  AdminProfileinfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  AdminProfileinfoLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  AdminProfileinfoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },


  //All student 
  AllStudentsScreencontainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  AllStudentsScreenscrollContent: {
    padding: 16,
  },
  AllStudentsScreencardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  AllStudentsScreenstudentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get('window').width - 48) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  AllStudentsScreenprofileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  AllStudentsScreenprofileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  AllStudentsScreendefaultProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllStudentsScreenstudentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  AllStudentsScreendepartmentName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  AllStudentsScreenactionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  AllStudentsScreenactionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllStudentsScreendeleteButton: {
    backgroundColor: '#FEE2E2',
  },
  AllStudentsScreenaddNewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get('window').width - 48) / 2,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3B82F6',
  },
  AllStudentsScreenaddNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 8,
  },

  //all teacher 
  AllTeacherScreencontainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  AllTeacherScreenscrollContent: {
    padding: 16,
  },
  AllTeacherScreencardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  AllTeacherScreenteacherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get('window').width - 48) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  AllTeacherScreenprofileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  AllTeacherScreenprofileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  AllTeacherScreendefaultProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllTeacherScreenteacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  AllTeacherScreendepartmentName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  AllTeacherScreendesignationText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
    textAlign: 'center',
  },
  AllTeacherScreenexpertiseText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  AllTeacherScreenactionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  AllTeacherScreenactionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllTeacherScreendeleteButton: {
    backgroundColor: '#FEE2E2',
  },
  AllTeacherScreenaddNewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (Dimensions.get('window').width - 48) / 2,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3B82F6',
  },
  AllTeacherScreenaddNewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 8,
  },


  //create department 

  CreateDepartmentScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateDepartmentScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateDepartmentScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  CreateDepartmentScreenContainer: {
    gap: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  CreateDepartmentScreensubmitButton: {
    marginTop: 12,
  },
  CreateDepartmentScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateDepartmentScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8
  },
  CreateDepartmentScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateDepartmentScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateDepartmentScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateDepartmentScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateDepartmentScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },
  // create event screen
  CreateEventScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateEventScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateEventScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },



  CreateEventScreenformContainer: {
    padding: 16,
  },
  CreateEventScreencreateButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    marginTop: 24,
    marginBottom: 16,
    height: 55,
    gap: 8,
  },
  CreateEventScreencreateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  CreateEventScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  CreateEventScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateEventScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateEventScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateEventScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateEventScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateEventScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // create exam scedule
  CreateExamSchedulemainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateExamSchedulecontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateExamSchedulescrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  CreateExamScheduleoptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16,
  },
  CreateExamScheduleoptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0FB',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    minWidth: '45%',
  },
  CreateExamScheduleoptionButtonSelected: {
    backgroundColor: '#6C63FF',
  },
  CreateExamScheduleoptionText: {
    fontSize: 16,
    color: '#1A1F36',
    fontWeight: '500',
  },
  CreateExamScheduleoptionTextSelected: {
    color: '#FFFFFF',
  },
  CreateExamSchedulescheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF0FB',
  },
  CreateExamScheduledayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  CreateExamScheduledayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  CreateExamScheduleslotContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  CreateExamScheduleslotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  CreateExamScheduleslotTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1F36',
  },
  CreateExamScheduleformGroup: {
    marginBottom: 16,
  },
  CreateExamSchedulelabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  CreateExamScheduleaddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
    backgroundColor: '#EEF0FB',
    borderRadius: 8,
    marginTop: 8,
  },

  CreateExamScheduleaddButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C63FF',
  },
  CreateExamScheduleremoveButton: {
    padding: 4,
  },


  CreateExamScheduleformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  CreateExamSchedulelegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateExamSchedulelegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateExamSchedulelegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateExamSchedulerequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateExamScheduleoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateExamSchedulelegendText: {
    color: '#495057',
    fontSize: 14,
  },
  //create internship screen
  CreateInternshipScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateInternshipScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateInternshipScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  CreateInternshipScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  CreateInternshipScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  CreateInternshipScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  CreateInternshipScreenscrollView: {
    flex: 1,
  },

  CreateInternshipScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  CreateInternshipScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateInternshipScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateInternshipScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateInternshipScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateInternshipScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateInternshipScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },
  CreateInternshipScreencreateButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  CreateInternshipScreenbuttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  CreateInternshipScreencreateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  //create news screen 
  CreateNewsScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateNewsScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateNewsScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  CreateNewsScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  CreateNewsScreenscrollView: {
    flex: 1,
  },

  CreateNewsScreencontentInput: {
    height: 150,
    paddingTop: 12,
  },
  CreateNewsScreenpreviewContainer: {
    marginTop: 24,
    marginBottom: 16,
    flex: -5,
  },
  CreateNewsScreenpreviewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 12,
  },
  CreateNewsScreenpreviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  CreateNewsScreenpreviewImage: {
    width: '100%',
    height: 200,
  },
  CreateNewsScreenpreviewImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateNewsScreenplaceholderText: {
    color: '#6B7280',
    marginTop: 8,
    fontSize: 14,
  },
  CreateNewsScreenpreviewContent: {
    padding: 16,
  },
  CreateNewsScreenpreviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 8,
  },
  CreateNewsScreenpreviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  CreateNewsScreencreateButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    marginTop: 24,
    marginBottom: 16,
    height: 55,
    gap: 8,
  },
  CreateNewsScreencreateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  CreateNewsScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  CreateNewsScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateNewsScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateNewsScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateNewsScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateNewsScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateNewsScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },


  //Create semester registeration

  CreateSemesterRegistrationmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateSemesterRegistrationcontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateSemesterRegistrationscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  CreateSemesterRegistrationcontainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  CreateSemesterRegistrationscrollView: {
    flex: 1,
    padding: 16,
  },

  // Course section styles
  CreateSemesterRegistrationcourseContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  CreateSemesterRegistrationcourseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  CreateSemesterRegistrationcourseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  CreateSemesterRegistrationremoveButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },

  // Input group styles
  CreateSemesterRegistrationinputGroup: {
    marginBottom: 16,
  },
  CreateSemesterRegistrationlabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  // Course type selection styles
  CreateSemesterRegistrationtypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  CreateSemesterRegistrationtypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  CreateSemesterRegistrationtypeButtonActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6C63FF',
  },
  CreateSemesterRegistrationtypeButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  CreateSemesterRegistrationtypeButtonTextActive: {
    color: '#6C63FF',
  },

  // Prerequisites styles
  CreateSemesterRegistrationprerequisitesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  CreateSemesterRegistrationprerequisiteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  CreateSemesterRegistrationprerequisiteText: {
    color: '#6C63FF',
    fontSize: 14,
    marginRight: 4,
  },
  CreateSemesterRegistrationremovePrereqButton: {
    padding: 2,
  },
  CreateSemesterRegistrationaddPrereqContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateSemesterRegistrationprereqInput: {
    flex: 1,
  },
  CreateSemesterRegistrationaddPrereqButton: {
    padding: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },

  // Add course button styles
  CreateSemesterRegistrationaddCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  CreateSemesterRegistrationaddCourseButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },

  // Submit button styles
  CreateSemesterRegistrationsubmitButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  CreateSemesterRegistrationsubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  CreateSemesterRegistrationformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  CreateSemesterRegistrationlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateSemesterRegistrationlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateSemesterRegistrationlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateSemesterRegistrationrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateSemesterRegistrationoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateSemesterRegistrationlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // create subject screen
  CreateSubjectsScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CreateSubjectsScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateSubjectsScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  CreateSubjectsScreencontainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  CreateSubjectsScreenscrollView: {
    flex: 1,
  },


  CreateSubjectsScreenformContainer: {
    padding: 16,
  },
  CreateSubjectsScreentitleContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  CreateSubjectsScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8
  },
  CreateSubjectsScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateSubjectsScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateSubjectsScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateSubjectsScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateSubjectsScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateSubjectsScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },
  // CreateSubjectsScreensubjectForm: {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 12,
  //   padding: 16,
  //   marginHorizontal: 8,
  //   marginBottom: 16,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  CreateSubjectsScreenbuttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  CreateSubjectsScreenbutton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CreateSubjectsScreenaddButton: {
    backgroundColor: '#9CA3AF',
  },
  CreateSubjectsScreenremoveButton: {
    backgroundColor: '#1F2937',
  },
  CreateSubjectsScreenbuttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  CreateSubjectsScreenremoveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  // CreateSubjectsScreensubmitButton: {
  //   backgroundColor: '#FFB340',
  //   paddingVertical: 16,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginBottom: 24,
  //   marginHorizontal: 8,

  // },
  // CreateSubjectsScreensubmitButtonText: {
  //   color: '#000000',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },

  CreateSubjectsScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  CreateSubjectsScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  CreateSubjectsScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CreateSubjectsScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  CreateSubjectsScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  CreateSubjectsScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  CreateSubjectsScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },


  //Dashboard screen
  Dashboardcontainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  DashboardcardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 3,
    marginTop: 20,
    marginBottom: 24,
  },
  DashboardcardContainer: {
    width: '50%', // each card takes up 48% of the row width
    marginBottom: 8, // spacing between rows
  },
  DashboardlistsContainer: {
    marginHorizontal: 3,
    marginVertical: 24,
  },


  //   //DepartmentListScreen
  DepartmentListScreensafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  DepartmentListScreencontainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  DepartmentListScreenscrollView: {
    flex: 1,
  },
  DepartmentListScreenscrollContent: {
    padding: 16,
  },
  DepartmentListScreendepartmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 20,
  },
  DepartmentListScreencardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  DepartmentListScreenheaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  DepartmentListScreendepartmentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentListScreenheaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  DepartmentListScreenactionButton: {
    padding: 8,
    borderRadius: 8,
  },
  DepartmentListScreeneditButton: {
    backgroundColor: '#EEF2FF',
  },
  DepartmentListScreendeleteButton: {
    backgroundColor: '#FEE2E2',
  },
  DepartmentListScreencardContent: {
    gap: 24,
  },
  DepartmentListScreentotalStudentsSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  DepartmentListScreentotalStudentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  DepartmentListScreentotalStudentsLabel: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  DepartmentListScreentotalStudentsCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  DepartmentListScreengenderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  DepartmentListScreenstatColumn: {
    alignItems: 'center',
    flex: 1,
  },
  DepartmentListScreenringWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  DepartmentListScreensvg: {
    position: 'absolute',
  },
  DepartmentListScreenpercentageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  DepartmentListScreenpercentageText: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentListScreenstatInfo: {
    alignItems: 'center',
  },
  DepartmentListScreenstatLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  DepartmentListScreenstatCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentListScreentoggleIcon: {
    fontSize: 18,
    color: '#4B5563',
  },
  // department list screen 2
  DepartmentListScreen2container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    marginHorizontal: -10,
  },
  DepartmentListScreen2scrollView: {
    flex: 1,
    padding: 16,
  },
  DepartmentListScreen2fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4A6BD6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  DepartmentListScreen2semesterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  DepartmentListScreen2semesterCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  DepartmentListScreen2semesterIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  DepartmentListScreen2semesterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  DepartmentListScreen2courseCount: {
    fontSize: 14,
    color: '#4A6BD6',
  },
  //department semester screen
  DepartmentSemestersScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  DepartmentSemestersScreenscrollView: {
    flex: 1,
    padding: 16,
  },
  DepartmentSemestersScreenfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4A6BD6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  DepartmentSemestersScreensemesterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  DepartmentSemestersScreensemesterCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  DepartmentSemestersScreensemesterIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  DepartmentSemestersScreensemesterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  DepartmentSemestersScreencourseCount: {
    fontSize: 14,
    color: '#4A6BD6',
  },
  // edit course screen
  EditCourseScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditCourseScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditCourseScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  EditCourseScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditCourseScreenscrollView: {
    flex: 1,
  },
  EditCourseScreenformContainer: {
    padding: 16,
  },




  EditCourseScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },


  EditCourseScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },

  EditCourseScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },

  EditCourseScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditCourseScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  EditCourseScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditCourseScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit department screeen

  EditDepartmentScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditDepartmentScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditDepartmentScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  EditDepartmentScreensafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditDepartmentScreencontainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditDepartmentScreen: {
    padding: 16,
  },
  EditDepartmentScreenformContainer: {
    gap: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  EditDepartmentScreensubmitButton: {
    marginTop: 12,
  },
  EditDepartmentScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditDepartmentScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8
  },
  EditDepartmentScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditDepartmentScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditDepartmentScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditDepartmentScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditDepartmentScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  EditDepartmentScreenbuttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  // EditDepartmentScreencontentContainer: {
  //   padding: 16,
  //   width: '100%',

  // },

  // edit event screen
  EditEventScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditEventScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditEventScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  EditEventScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditEventScreenscrollView: {
    flex: 1,
  },
  EditEventScreenformContainer: {
    padding: 16,
  },
  EditEventScreenupdateButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    marginTop: 24,
    marginBottom: 16,
    height: 55,
    gap: 8,
  },
  EditEventScreenupdateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  EditEventScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditEventScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditEventScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditEventScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditEventScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditEventScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditEventScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit exam schedule screen
  EditExamSchedulemainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditExamSchedulecontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditExamSchedulescrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },


  EditExamScheduleheaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EditExamScheduleinfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditExamScheduleinfoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1F36',
  },
  EditExamSchedulescheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF0FB',
  },
  EditExamScheduledayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  EditExamScheduledayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  EditExamScheduleslotContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },


  EditExamScheduleaddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
    backgroundColor: '#EEF0FB',
    borderRadius: 8,
    marginTop: 8,
  },
  EditExamScheduleaddButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C63FF',
  },
  EditExamScheduleremoveButton: {
    padding: 4,
  },


  EditExamScheduleformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditExamSchedulelegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditExamSchedulelegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditExamSchedulelegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditExamSchedulerequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditExamScheduleoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditExamSchedulelegendText: {
    color: '#495057',
    fontSize: 14,
  },


  // edit internship screen
  EditInternshipScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditInternshipScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditInternshipScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  EditInternshipScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },

  EditInternshipScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditInternshipScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditInternshipScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditInternshipScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditInternshipScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditInternshipScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },
  // edit news 
  EditNewsScreenmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditNewsScreencontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditNewsScreenscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  EditNewsScreenscrollView: {
    flex: 1,
  },
  EditNewsScreenformContainer: {
    padding: 16,
  },
  EditNewsScreenupdateButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    marginTop: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  EditNewsScreenbuttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: 55,
    gap: 8,
  },
  EditNewsScreenupdateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  EditNewsScreenformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditNewsScreenlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditNewsScreenlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditNewsScreenlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditNewsScreenrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditNewsScreenoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditNewsScreenlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit semester registeration
  EditSemesterRegistrationheaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EditSemesterRegistrationinfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditSemesterRegistrationinfoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1F36',
  },
  EditSemesterRegistrationmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditSemesterRegistrationcontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditSemesterRegistrationscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  EditSemesterRegistrationcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditSemesterRegistrationscrollView: {
    flex: 1,
    padding: 16,
  },
  EditSemesterRegistrationsemesterInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EditSemesterRegistrationsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 16,
  },
  EditSemesterRegistrationdatePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  EditSemesterRegistrationdatePickerButtonText: {
    fontSize: 16,
    color: '#1A1F36',
  },
  EditSemesterRegistrationcoursesSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EditSemesterRegistrationcourseContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  EditSemesterRegistrationcourseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  EditSemesterRegistrationcourseHeaderLeft: {
    flex: 1,
  },
  EditSemesterRegistrationcourseHeaderRight: {
    flexDirection: 'row',
    gap: 12,
  },
  EditSemesterRegistrationcourseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  EditSemesterRegistrationcourseCodeInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    borderBottomWidth: 1,
    borderBottomColor: '#6C63FF',
    paddingVertical: 4,
  },
  EditSemesterRegistrationcourseEditForm: {
    gap: 12,
  },
  EditSemesterRegistrationinput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  EditSemesterRegistrationrowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  EditSemesterRegistrationhalfWidth: {
    flex: 1,
  },
  EditSemesterRegistrationcourseDetails: {
    gap: 8,
  },
  EditSemesterRegistrationcourseName: {
    fontSize: 16,
    color: '#1A1F36',
    marginBottom: 8,
  },
  EditSemesterRegistrationdetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditSemesterRegistrationdetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  EditSemesterRegistrationaddCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#EEF0FB',
    borderRadius: 8,
    gap: 8,
  },
  EditSemesterRegistrationaddCourseButtonText: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '500',
  },
  EditSemesterRegistrationsaveButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  EditSemesterRegistrationsaveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  EditSemesterRegistrationformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditSemesterRegistrationlegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditSemesterRegistrationlegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditSemesterRegistrationlegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditSemesterRegistrationrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditSemesterRegistrationoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditSemesterRegistrationlegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit student academics
  EditStudentAcademicsmainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditStudentAcademicscontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditStudentAcademicsscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  EditStudentAcademicscontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditStudentAcademicsscrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  EditStudentAcademicsformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  EditStudentAcademicssemesterSection: {
    marginBottom: 16,
  },
  EditStudentAcademicssemesterHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  EditStudentAcademicscourseContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  EditStudentAcademicscourseLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 16,
  },
  EditStudentAcademicsfullWidthInput: {
    marginBottom: 16,
  },
  EditStudentAcademicscreditGradeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  EditStudentAcademicscgpaInput: {
    width: '100%',
  },
  EditStudentAcademicsgpaInput: {
    width: '100%',
  },
  EditStudentAcademicscreditInput: {
    flex: 1,
  },
  EditStudentAcademicsgradeInput: {
    flex: 1,
  },
  EditStudentAcademicsbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  EditStudentAcademicsbutton: {
    flex: 1,
    maxWidth: 160,
  },
  EditStudentAcademicsrequiredDot: {
    backgroundColor: '#6C63FF',
  },

  EditStudentAcademicsformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },

  EditStudentAcademicslegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditStudentAcademicslegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  EditStudentAcademicsoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditStudentAcademicslegendText: {
    color: '#495057',
    fontSize: 14,
  },
  EditStudentAcademicslegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },


  // edit student attendance
  EditStudentAttendanceformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8
  },
  EditStudentAttendancelegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditStudentAttendancelegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditStudentAttendancelegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditStudentAttendancerequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditStudentAttendanceoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditStudentAttendancelegendText: {
    color: '#495057',
    fontSize: 14,
  },
  EditStudentAttendancemainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditStudentAttendancecontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditStudentAttendancescrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  EditStudentAttendancecontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditStudentAttendancescrollView: {
    flex: 1,
    padding: 16,
  },
  EditStudentAttendancepageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginVertical: 24,
  },
  EditStudentAttendancesection: {
    marginBottom: 24,
  },
  // EditStudentAttendancesectionTitle: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: '#1A1F36',
  //   marginBottom: 16,
  // },
  EditStudentAttendanceformField: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  EditStudentAttendancecourseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  EditStudentAttendancecourseHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  EditStudentAttendancecourseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  EditStudentAttendancecourseName: {
    fontSize: 14,
    color: '#6B7280',
  },
  EditStudentAttendancestatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  EditStudentAttendancestatusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  EditStudentAttendancebuttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  EditStudentAttendancebutton: {
    flex: 1,
    maxWidth: 160,
  },


  // edit student basic info
  EditStudentBasicInfomainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  EditStudentBasicInfocontentContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  EditStudentBasicInfoscrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
  },
  EditStudentBasicInfocontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  EditStudentBasicInfobuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  EditStudentBasicInfobutton: {
    flex: 1,
    maxWidth: 160,
  }, contentContainer: {
    padding: 0,
  },
  EditStudentBasicInfoformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditStudentBasicInfolegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditStudentBasicInfolegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditStudentBasicInfolegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditStudentBasicInforequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditStudentBasicInfooptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditStudentBasicInfolegendText: {
    color: '#495057',
    fontSize: 14,
  },
  EditStudentBasicInfoprofilePhotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderStyle: 'dashed',
  },
  EditStudentBasicInfoprofilePhotoPlaceholderText: {
    color: '#6C63FF',
    marginTop: 8,
    fontSize: 14,
  },


  // edit teacher attendance
  EditTeacherAttendancecontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditTeacherAttendancescrollView: {
    flex: 1,
    padding: 16,
  },
  EditTeacherAttendancecard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  EditTeacherAttendancecardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  EditTeacherAttendanceformContainer: {
    gap: 16,
  },
  EditTeacherAttendancefullWidthInput: {
    width: '100%',
  },
  EditTeacherAttendancefooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  EditTeacherAttendancesaveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  EditTeacherAttendancesaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  EditTeacherAttendanceformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditTeacherAttendancelegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditTeacherAttendancelegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditTeacherAttendancelegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditTeacherAttendancerequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditTeacherAttendanceoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditTeacherAttendancelegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit teacher basic info
  EditTeacherBasicInfocontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditTeacherBasicInfoscrollView: {
    flex: 1,
    padding: 16,
  },
  EditTeacherBasicInfocard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  EditTeacherBasicInfocardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  EditTeacherBasicInfoprofileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  EditTeacherBasicInfoprofileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6C63FF',
  },
  EditTeacherBasicInfoimageUploadButton: {
    position: 'absolute',
    right: '35%',
    bottom: -10,
    backgroundColor: '#6C63FF',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  EditTeacherBasicInfoformContainer: {
    gap: 16,
  },
  EditTeacherBasicInfofullWidthInput: {
    width: '100%',
  },
  EditTeacherBasicInfodayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  EditTeacherBasicInfoaddButton: {
    padding: 8,
  },
  EditTeacherBasicInfoslotContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 16,
  },
  EditTeacherBasicInforemoveButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginTop: 8,
  },
  EditTeacherBasicInfofooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  EditTeacherBasicInfosaveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  EditTeacherBasicInfosaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  EditTeacherBasicInfoformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditTeacherBasicInfolegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditTeacherBasicInfolegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditTeacherBasicInfolegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditTeacherBasicInforequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditTeacherBasicInfooptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditTeacherBasicInfolegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit teacher feedback
  EditTeacherFeedbackcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditTeacherFeedbackcrollView: {
    flex: 1,
    padding: 16,
  },
  EditTeacherFeedbackcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  EditTeacherFeedbackcardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  EditTeacherFeedbackformContainer: {
    gap: 16,
  },
  EditTeacherFeedbackfullWidthInput: {
    width: '100%',
  },
  EditTeacherFeedbackfooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  EditTeacherFeedbacksaveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  EditTeacherFeedbacksaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  EditTeacherFeedbackformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditTeacherFeedbacklegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditTeacherFeedbacklegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditTeacherFeedbacklegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditTeacherFeedbackrequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditTeacherFeedbackoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditTeacherFeedbacklegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // edit teacher schedule 
  EditTeacherSchedulecontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EditTeacherSchedulescrollView: {
    flex: 1,
    padding: 16,
  },
  EditTeacherSchedulecard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  EditTeacherSchedulecardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  EditTeacherScheduleprofileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  EditTeacherScheduleprofileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6C63FF',
  },
  EditTeacherScheduleimageUploadButton: {
    position: 'absolute',
    right: '35%',
    bottom: -10,
    backgroundColor: '#6C63FF',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  EditTeacherScheduleformContainer: {
    gap: 16,
    
  },
  EditTeacherSchedulefullWidthInput: {
    width: '100%',
  },
  EditTeacherScheduledayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  EditTeacherScheduleaddButton: {
    padding: 8,
  },
  EditTeacherScheduleslotContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginTop: 16,
  },
  EditTeacherScheduleemoveButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginTop: 8,
  },
  EditTeacherSchedulefooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  EditTeacherSchedulesaveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  EditTeacherSchedulesaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  EditTeacherScheduleformTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,

  },
  EditTeacherSchedulelegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 32,
  },
  EditTeacherSchedulelegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EditTeacherSchedulelegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  EditTeacherSchedulerequiredDot: {
    backgroundColor: '#6C63FF',
  },
  EditTeacherScheduleoptionalDot: {
    backgroundColor: '#ADB5BD',
  },
  EditTeacherSchedulelegendText: {
    color: '#495057',
    fontSize: 14,
  },

  // event list screen
  EventListScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EventListScreenscrollView: {
    flex: 1,
    padding: 16,
  },
  EventListScreenfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  EventListScreencard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EventListScreeneventImage: {
    width: '100%',
    height: 150,
  },
  EventListScreenplaceholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  EventListScreencontentContainer: {
    padding: 16,
  },
  EventListScreenheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  EventListScreentypeContainer: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  EventListScreeneventType: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '500',
  },
  EventListScreeneditButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF0FB',
  },
  EventListScreentitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 12,
  },
  EventListScreendetailsContainer: {
    gap: 8,
  },
  EventListScreendetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EventListScreendetailText: {
    fontSize: 14,
    color: '#6B7280',
  },

  //exam schedule view
  ExamScheduleViewcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  ExamScheduleViewscrollView: {
    flex: 1,
    padding: 16,
  },
  // Department card styles - aligned with semester registration
  ExamScheduleViewdepartmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 5,
  },
  ExamScheduleViewdepartmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EEF0FB',
  },
  ExamScheduleViewdepartmentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ExamScheduleViewdepartmentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1F36',
  },
  // Year card styles
  ExamScheduleViewyearCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEF0FB',
    marginBottom: 20,
  },
  ExamScheduleViewyearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0FB',
  },
  ExamScheduleViewyearTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ExamScheduleViewyearTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  // Edit button styles - consistent across screens
  ExamScheduleVieweditButton: {
    padding: 4,
    backgroundColor: '#EEF0FB',
    borderRadius: 8,
    marginLeft: 90,
  },
  // Date schedule styles
  ExamScheduleViewdateSchedule: {
    marginBottom: 24,
  },
  ExamScheduleViewdateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EEF0FB',
  },
  ExamScheduleViewdateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1F36',
  },
  // Exam slot styles
  ExamScheduleViewslotsContainer: {
    gap: 16,
  },
  ExamScheduleViewexamSlot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  ExamScheduleViewtimeColumn: {
    width: 80,
    alignItems: 'center',
    position: 'relative',
  },
  ExamScheduleViewtimeText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  ExamScheduleViewtimelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C63FF',
  },
  ExamScheduleViewtimelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#EEF0FB',
    position: 'absolute',
    top: 32,
    left: '50%',
    marginLeft: -1,
  },
  ExamScheduleViewexamDetails: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF0FB',
  },
  ExamScheduleViewseparator: {
    height: 24,
    backgroundColor: '#F5F6FA',
  },
  ExamScheduleViewcourseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  ExamScheduleViewcourseName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ExamScheduleViewvenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ExamScheduleViewvenueText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // internship list screen
  InternshipListScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  InternshipListScreenscrollView: {
    flex: 1,
  },
  InternshipListScreenfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // news list screen
  NewsListScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  NewsListScreenscrollView: {
    flex: 1,
    margin: 20,

  },
  NewsListScreenfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  NewsListScreenformContainer: {
    padding: 16,
  },
  NewsListScreenactionButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    marginTop: 24,
    marginBottom: 16,
    height: 55,
    gap: 8,
  },
  NewsListScreenactionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // semester course screen
  SemesterCoursesScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  SemesterCoursesScreenscrollView: {
    flex: 1,
    padding: 16,
  },
  SemesterCoursesScreenfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4A6BD6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  SemesterCoursesScreensemesterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  SemesterCoursesScreensemesterCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  SemesterCoursesScreensemesterIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  SemesterCoursesScreensemesterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  SemesterCoursesScreencourseCount: {
    fontSize: 14,
    color: '#4A6BD6',
  },


  // semester registration view
  SemesterRegistrationViewcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  SemesterRegistrationViewscrollView: {
    flex: 1,
    padding: 16,
  },
  SemesterRegistrationViewdepartmentSeparator: {
    height: 24,
    backgroundColor: '#F5F6FA',
  },
  SemesterRegistrationViewdepartmentContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 5,

  },
  SemesterRegistrationViewdepartmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EEF0FB',
  },
  SemesterRegistrationViewdepartmentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  SemesterRegistrationViewdepartmentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1F36',
  },
  SemesterRegistrationViewsemestersContainer: {
    padding: 16,
    gap: 16,
  },
  SemesterRegistrationViewcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF0FB',
    marginBottom: 20,
  },
  SemesterRegistrationViewcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0FB',
  },
  SemesterRegistrationViewtitleToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  SemesterRegistrationViewsemesterInfoContainer: {
    flex: 1,
  },
  SemesterRegistrationViewcardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  SemesterRegistrationViewdateInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  SemesterRegistrationVieweditButton: {
    padding: 4,
  },
  SemesterRegistrationViewcardContent: {
    padding: 16,
  },
  SemesterRegistrationViewcourseContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  SemesterRegistrationViewcourseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  SemesterRegistrationViewcourseCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  SemesterRegistrationViewcourseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  SemesterRegistrationViewcourseTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  SemesterRegistrationViewcourseTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  SemesterRegistrationViewcourseName: {
    fontSize: 14,
    color: '#1A1F36',
    marginBottom: 12,
  },
  SemesterRegistrationViewcreditHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  SemesterRegistrationViewcreditHoursText: {
    fontSize: 14,
    color: '#6B7280',
  },
  SemesterRegistrationViewinstructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  SemesterRegistrationViewinstructorText: {
    fontSize: 14,
    color: '#6B7280',
  },
  SemesterRegistrationViewprerequisitesContainer: {
    marginTop: 8,
  },
  SemesterRegistrationViewprerequisitesLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  SemesterRegistrationViewprerequisitesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  SemesterRegistrationViewprerequisiteTag: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  SemesterRegistrationViewprerequisiteText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '500',
  },
  SemesterRegistrationViewmaxStudentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  SemesterRegistrationViewmaxStudentsText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // student profile view
  StudentProfileViewcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  StudentProfileViewscrollView: {
    flex: 1,
    padding: 16,
  },
  StudentProfileViewcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  StudentProfileViewcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0FB',
  },
  StudentProfileViewcardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  StudentProfileViewcardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  StudentProfileViewcardContent: {
    padding: 16,
  },
  StudentProfileViewinfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  StudentProfileViewinfoItem: {
    flex: 1,
  },
  StudentProfileViewinfoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  StudentProfileViewinfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1F36',
  },
  StudentProfileViewcgpaContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#EEF0FB',
    borderRadius: 12,
  },
  StudentProfileViewcgpaLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  StudentProfileViewcgpaValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6C63FF',
  },
  StudentProfileViewcgpaScale: {
    fontSize: 14,
    color: '#6B7280',
  },
  StudentProfileViewsemesterContainer: {
    marginBottom: 24,
  },
  StudentProfileViewsemesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  StudentProfileViewsemesterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  StudentProfileViewsemesterGPA: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C63FF',
  },
  StudentProfileViewcoursesContainer: {
    gap: 12,
  },
  StudentProfileViewcourseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  StudentProfileViewcourseInfo: {
    flex: 1,
  },
  StudentProfileViewcourseCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F36',
  },
  StudentProfileViewcourseName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  StudentProfileViewcreditHours: {
    fontSize: 12,
    color: '#6B7280',
  },
  StudentProfileViewgradeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  StudentProfileViewgradeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  StudentProfileViewattendanceItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  StudentProfileViewattendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  StudentProfileViewattendancePercentage: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  StudentProfileViewpercentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  StudentProfileViewattendanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  StudentProfileViewattendanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  StudentProfileViewprogressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  StudentProfileViewprogressFill: {
    height: '100%',
    borderRadius: 2,
  },
  StudentProfileViewcgpaContainer: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  StudentProfileViewsemesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  StudentProfileViewsemesterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
  },
  StudentProfileViewsemesterTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  StudentProfileViewbasicInfoContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  StudentProfileViewprofileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#6C63FF',
    backgroundColor: '#F5F6FA',
  },
  StudentProfileViewprofileImage: {
    width: '100%',
    height: '100%',
  },
  StudentProfileViewstudentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 16,
  },
  StudentProfileViewtitleToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },


  // teacher view screen
  TeacherViewScreencontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  TeacherViewScreenscrollView: {
    flex: 1,
    padding: 16,
  },
  TeacherViewScreencard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  TeacherViewScreencardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  TeacherViewScreencardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  TeacherViewScreenbasicInfoContent: {
    alignItems: 'center',
  },
  TeacherViewScreenprofileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#6C63FF',
  },
  TeacherViewScreenprofileImage: {
    width: '100%',
    height: '100%',
  },
  TeacherViewScreeninfoGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  TeacherViewScreeninfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '45%',
  },
  TeacherViewScreeninfoLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  TeacherViewScreeninfoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  TeacherViewScreenscheduleContainer: {
    gap: 16,
  },
  TeacherViewScreenscheduleDay: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  TeacherViewScreendayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  TeacherViewScreenscheduleSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  TeacherViewScreenslotTime: {
    fontSize: 14,
    color: '#6B7280',
    width: '30%',
  },
  TeacherViewScreenslotDept: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    width: '40%',
  },
  TeacherViewScreenslotSection: {
    fontSize: 14,
    color: '#6B7280',
    width: '30%',
    textAlign: 'right',
  },
  TeacherViewScreenattendanceContainer: {
    gap: 16,
  },
  TeacherViewScreenattendanceItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  TeacherViewScreencourseHeader: {
    marginBottom: 8,
  },
  TeacherViewScreencourseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  TeacherViewScreencourseName: {
    fontSize: 14,
    color: '#6B7280',
  },
  TeacherViewScreenattendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  TeacherViewScreenattendanceDetail: {
    alignItems: 'center',
  },
  TeacherViewScreenstatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  TeacherViewScreenstatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  TeacherViewScreendeptSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  TeacherViewScreendeptText: {
    fontSize: 14,
    color: '#6B7280',
  },
  TeacherViewScreensectionText: {
    fontSize: 14,
    color: '#6B7280',
  },
  TeacherViewScreenfeedbackContainer: {
    gap: 16,
  },
  TeacherViewScreenfeedbackItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  TeacherViewScreenfeedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  TeacherViewScreenfeedbackCourse: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  TeacherViewScreenratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  TeacherViewScreenratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  TeacherViewScreenfeedbackDeptSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  TeacherViewScreenfeedbackStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
  },
  TeacherViewScreenfeedbackStat: {
    alignItems: 'center',
  },
  TeacherViewScreencardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  TeacherViewScreencardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isExpanded => isExpanded ? 16 : 0,
    paddingVertical: 8,
  },
  // components started from here

  //Add new button( contains no styling)

  //button
  ButtonbuttonContainer: {
    alignSelf: 'stretch',
  },
  Buttonbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Size variations
  ButtonsmallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  ButtonmediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  ButtonlargeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },

  // Primary button styles
  ButtonprimaryButton: {
    backgroundColor: '#6C63FF',
    borderWidth: 0,
  },
  ButtondisabledPrimaryButton: {
    backgroundColor: '#A5B4FC',
  },
  ButtonprimaryButtonText: {
    color: '#FFFFFF',
  },
  ButtondisabledPrimaryButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // Secondary button styles
  ButtonsecondaryButton: {
    backgroundColor: '#EEF2FF',
    borderWidth: 0,
  },
  ButtondisabledSecondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  ButtonsecondaryButtonText: {
    color: '#6C63FF',
  },
  ButtondisabledSecondaryButtonText: {
    color: '#A5B4FC',
  },

  // Outline button styles
  ButtonoutlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  ButtondisabledOutlineButton: {
    borderColor: '#A5B4FC',
    backgroundColor: 'transparent',
  },
  ButtonoutlineButtonText: {
    color: '#6C63FF',
  },
  ButtondisabledOutlineButtonText: {
    color: '#A5B4FC',
  },

  // Text styles for different sizes
  ButtonbuttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  ButtonsmallButtonText: {
    fontSize: 14,
  },
  ButtonmediumButtonText: {
    fontSize: 16,
  },
  ButtonlargeButtonText: {
    fontSize: 18,
  },

  // Icon styles
  ButtoniconLeft: {
    marginRight: 8,
  },
  ButtoniconRight: {
    marginLeft: 8,
  },


  // //calender
  Calendarcontainer: {
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  Calendarheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  Calendarmonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
  },
  Calendaryear: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  CalendarnavButton: {
    padding: 8,
  },
  Calendarcalendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  CalendarweekDay: {
    width: '14.28%',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
  },
  CalendardayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  CalendardayText: {
    fontSize: 14,
    color: '#333',
  },
  CalendartodayCell: {
    backgroundColor: '#FF4444',
    borderRadius: 20,
  },
  CalendartodayText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // //card
  Cardcard: {
    width: cardWidth,
    borderRadius: 12,
    padding: 16,
    margin: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  CardiconContainer: {
    marginBottom: 8,
  },
  CardcontentContainer: {
    alignItems: 'flex-start',
  },
  Cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  Cardvalue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  Cardsubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  CardadditionalValue: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },

  // //circular progress(contains none)

  // coursecard
  CourseCardcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  CourseCardcardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CourseCardiconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  CourseCardtextContainer: {
    flex: 1,
  },
  CourseCarddepartmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  CourseCardsemesterCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  CourseCardcourseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  CourseCardcourseHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  CourseCardcourseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  CourseCardcourseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  CourseCardcourseCode: {
    fontSize: 14,
    color: '#4A6BD6',
    marginBottom: 4,
  },
  CourseCardcourseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  CourseCardcourseDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    gap: 12,
  },
  CourseCarddetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CourseCarddetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  CourseCardeditButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF0FB',
    position: 'absolute',
    right: 0,
    top: 0,
  },


  // //custom header
  CustomHeadercustomHeaderContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  CustomHeadercustomHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    paddingVertical: 10,
    height: 60,
  },
  CustomHeaderleftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  CustomHeaderheaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.3,
    marginLeft: 5,
  },
  CustomHeaderseparator: {
    marginHorizontal: 5,
    color: '#e0e0e0',
    fontSize: 24,
    fontWeight: '200',
  },
  CustomHeaderscreenIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  CustomHeaderactiveScreenIndicator: {
    backgroundColor: '#EBF0FF',
  },
  CustomHeaderscreenText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  CustomHeaderactiveScreenText: {
    color: '#4B6BFB',
  },
  CustomHeaderrightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  CustomHeadericonContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CustomHeadersearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 6,
  },
  CustomHeadersearchText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },

  // // custom input
  // CustomInputcardContainer: {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 12,
  //   padding: 16,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  // CustomInputavatarContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // CustomInputavatar: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: '#EEF2FF',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // CustomInputstudentInfo: {
  //   marginLeft: 12,
  //   flex: 1,
  // },
  // CustomInputname: {
  //   fontSize: 16,
  //   fontWeight: '600',
  //   color: '#1a1a1a',
  // },
  // CustomInputdepartment: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginTop: 4,
  // },

  // CustomInputactionButton: {
  //   width: 36,
  //   height: 36,
  //   borderRadius: 18,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 8,
  // },
  // CustomInputviewButton: {
  //   backgroundColor: '#EEF2FF',
  // },
  // CustomInputeditButton: {
  //   backgroundColor: '#EEF2FF',
  // },
  // CustomInputdeleteButton: {
  //   backgroundColor: '#FFEBEE',
  // },

  CustomInputcontainer: {
    marginBottom: 16,
  },
  CustomInputlabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  CustomInputlabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  CustomInputrequired: {
    color: '#FF4B55',
    marginLeft: 4,
  },
  CustomInputinputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  CustomInputinput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },

  // custom menu drawer( menu bar)
  CustomMenuDrawercontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.85,
    height: height,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  CustomMenuDrawerprofileSection: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  CustomMenuDrawerprofileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
    overflow: 'hidden',
  },
  CustomMenuDrawerprofileImage: {
    width: '100%',
    height: '100%',
  },
  CustomMenuDrawerprofileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  CustomMenuDrawerprofileRole: {
    fontSize: 14,
    color: '#4B5563',
  },
  CustomMenuDrawermenuContainer: {
    flex: 1,
    paddingTop: 12,
  },
  CustomMenuDrawermenuItemContainer: {
    marginBottom: 4,
  },
  CustomMenuDrawermenuItem: {
    flexDirection: 'row',
    alignItems: '',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  CustomMenuDrawermenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CustomMenuDrawermenuItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  CustomMenuDrawermenuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  CustomMenuDrawersubMenuContainer: {
    paddingLeft: 56,
    backgroundColor: '#F8F9FA',
  },
  CustomMenuDrawersubMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  CustomMenuDrawersubMenuDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4F46E5',
    marginRight: 12,
  },
  CustomMenuDrawersubMenuTitle: {
    fontSize: 14,
    color: '#4B5563',
  },
  CustomMenuDrawerchatbotSection: {
    padding: 20,
    borderTopWidth: 30,
    borderTopColor: '#E5E7EB',
  },
  CustomMenuDrawerchatbotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
  },
  CustomMenuDrawerchatbotTextContainer: {
    marginLeft: 12,
  },
  CustomMenuDrawerchatbotTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  CustomMenuDrawerchatbotSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },

  //department Card
  DepartmentCardemptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  DepartmentCarddottedBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4B6BFB',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DepartmentCardaddText: {
    color: '#4B6BFB',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  DepartmentCardhelperText: {
    marginTop: 16,
    color: '#666',
    fontSize: 14,
  },
  DepartmentCardcardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  DepartmentCardcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  DepartmentCarddepartmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentCardactionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  DepartmentCardiconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  DepartmentCardstatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DepartmentCardstudentCount: {
    alignItems: 'flex-start',
  },
  DepartmentCardcountNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  DepartmentCardcountLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  DepartmentCardgenderStats: {
    flexDirection: 'row',
    gap: 16,
  },
  DepartmentCardgenderItem: {
    alignItems: 'center',
  },
  DepartmentCardpercentageRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#4B6BFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DepartmentCardpercentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B6BFB',
  },
  DepartmentCardgenderLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  DepartmentCardgenderCount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1A1A1A',
  },

  //department card 2
  DepartmentCard2card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  DepartmentCard2cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DepartmentCard2iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  DepartmentCard2textContainer: {
    flex: 1,
  },
  DepartmentCard2departmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 4,
  },
  DepartmentCard2semesterCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  DepartmentCard2courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  DepartmentCard2courseHeader: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  DepartmentCard2courseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  DepartmentCard2courseInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  DepartmentCard2courseCode: {
    fontSize: 14,
    color: '#4A6BD6',
    marginBottom: 4,
  },
  DepartmentCard2courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  DepartmentCard2courseDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    gap: 12,
  },
  DepartmentCard2detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  DepartmentCard2detailText: {
    fontSize: 14,
    color: '#6B7280',
  },


  // // department stats 
  DepartmentStatssafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  DepartmentStatscontainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  DepartmentStatsscrollView: {
    flex: 1,
  },
  DepartmentStatsscrollContent: {
    padding: 16,
  },
  DepartmentStatsdepartmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 20,
  },
  DepartmentStatscardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  DepartmentStatsheaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  DepartmentStatsdepartmentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentStatsheaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  DepartmentStatsactionButton: {
    padding: 8,
    borderRadius: 8,
  },
  DepartmentStatseditButton: {
    backgroundColor: '#EEF2FF',
  },
  DepartmentStatsdeleteButton: {
    backgroundColor: '#FEE2E2',
  },
  DepartmentStatscardContent: {
    gap: 24,
  },
  DepartmentStatstotalStudentsSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  DepartmentStatstotalStudentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  DepartmentStatstotalStudentsLabel: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  DepartmentStatstotalStudentsCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  DepartmentStatsgenderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  DepartmentStatsstatColumn: {
    alignItems: 'center',
    flex: 1,
  },
  DepartmentStatsringWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  DepartmentStatssvg: {
    position: 'absolute',
  },
  DepartmentStatspercentageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  DepartmentStatspercentageText: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  DepartmentStatsstatInfo: {
    alignItems: 'center',
  },
  DepartmentStatsstatLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  DepartmentStatsstatCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // // dummy teacher data(contain no styling )

  // // empty state 
  EmptyStateemptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  EmptyStatedottedBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4B6BFB',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmptyStateaddText: {
    color: '#4B6BFB',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  EmptyStatehelperText: {
    marginTop: 16,
    color: '#666',
    fontSize: 14,
  },

  // event card
  EventCardcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  EventCardscrollView: {
    flex: 1,
    padding: 16,
  },
  EventCardfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  EventCardcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  EventCardeventImage: {
    width: '100%',
    height: 150,
  },
  EventCardplaceholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  EventCardcontentContainer: {
    padding: 16,
  },
  EventCardheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  EventCardtypeContainer: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  EventCardeventType: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '500',
  },
  EventCardeditButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF0FB',
  },
  EventCardtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 12,
  },
  EventCarddetailsContainer: {
    gap: 8,
  },
  EventCarddetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  EventCarddetailText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // form field
  FormFieldformFieldContainer: {
    marginVertical: 20,
    width: '100%',
    
  },
  FormFieldlabelContainer: {
    position: 'absolute',
    top: -10,
    left: 16,
    zIndex: 1,
    
  },
  FormFieldlabelText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: 'white',
  },
  FormFieldrequiredLabel: {
    backgroundColor: '#6C63FF',
  },
  FormFieldoptionalLabel: {
    backgroundColor: '#ADB5BD',
  },
  FormFieldinputWrapper: {
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  FormFieldinputWrapperFocused: {
    borderColor: '#6C63FF',

  },
  FormFieldtextInput: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  FormFieldplaceholderText: {
    color: '#ADB5BD',
    fontSize: 16,
  },
  FormFieldinputText: {
    color: '#212529',
    fontSize: 16,
  },
  FormFieldlastValueContainer: {
    position: 'absolute',
    top: -24,
    right: 0,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  FormFieldinputError: {
  borderColor: 'red', // Example: Change border color for error
},
FormFieldinputWrapperError: {
  borderColor: 'red', // Example: Change border color for error
},
FormFielderrorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
},
  FormFieldlastValueText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '500',
  },
  dateInputContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FormFieldfileInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  FormFieldfileChooseButton: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  FormFieldfileChooseText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  FormFieldfileStatusText: {
    color: '#ADB5BD',
    flex: 1,
  },
  // // header(main)

  Headercontainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  Headercontent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    height: 60,
  },
  HeaderlogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  HeaderlogoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B6BFB',
    letterSpacing: 0.5,
  },
  HeaderrightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  HeadericonButton: {
    padding: 8,
    position: 'relative',
  },
  HeaderprofileButton: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4B6BFB',
  },
  HeaderprofileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  Headerbadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  HeaderbadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  //Header Background(component for Adminportal)

  HeaderBackgroundbackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: height * 0.4,
    top: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  HeaderBackgroundoverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  // internship card
  InternshipCardcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  InternshipCardscrollView: {
    flex: 1,
  },
  InternshipCardcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginBottom: 0,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  InternshipCardheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0FB',
  },
  InternshipCardcompanySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  InternshipCardcompanyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InternshipCardcompanyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F36',
  },
  InternshipCardlocation: {
    fontSize: 14,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InternshipCardeditButton: {
    padding: 8,
  },
  InternshipCardcontent: {
    padding: 16,
  },
  InternshipCardtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1F36',
    marginBottom: 12,
  },
  InternshipCardtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  InternshipCardtag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  InternshipCardtagText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  InternshipCarddetailsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  InternshipCarddetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  InternshipCarddetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  InternshipCardfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InternshipCardstatusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  InternshipCardstatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  InternshipCardstatusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  InternshipCardpostedDate: {
    fontSize: 14,
    color: '#6B7280',
  },

  // list.js

  Listcontainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  Listheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ListtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListiconCircle: {
    backgroundColor: '#E8EAFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  Listtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  Listdate: {
    fontSize: 16,
    color: '#6C63FF',
  },
  ListemptyContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  Listillustration: {
    width: '80%',
    height: 200,
    marginBottom: 20,
  },
  ListmessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ListsearchIcon: {
    marginRight: 8,
  },
  Listmessage: {
    fontSize: 16,
    color: '#6C63FF',
  },
  ListaddButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '80%',
    justifyContent: 'center',
  },
  ListbuttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  ListuserContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ListuserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Listavatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ListuserInfo: {
    justifyContent: 'center',
  },
  ListuserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ListuserRole: {
    fontSize: 14,
    color: '#666666',
  },
  ListmessageButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  ListmessageButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },


  // metrics list
  MetricsListcontainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  MetricsListmetricItem: {
    marginBottom: 27,
  },
  MetricsListmetricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  MetricsListmetricTitle: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  MetricsListpercentageText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '600',
  },
  MetricsListprogressBarContainer: {
    height: 4,
    backgroundColor: '#EDF2F7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  MetricsListprogressBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },


  // modern chart
  ModernChartcontainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 12,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  ModernChartheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ModernCharttitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'System',
  },
  ModernChartchart: {
    marginVertical: 8,
    borderRadius: 16,
  },

  // News card
  NewsCardcontainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  NewsCardscrollView: {
    flex: 1,
  },
  NewsCardfab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  NewsCardcard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  NewsCardnewsImage: {
    width: '100%',
    height: 200,
  },
  NewsCardplaceholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewsCardcontentContainer: {
    padding: 16,
  },
  NewsCardheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  NewsCardcategoryContainer: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  NewsCardcategory: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '500',
  },
  NewsCardeditButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF0FB',
  },
  NewsCardtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 8,
    lineHeight: 24,
  },
  NewsCardpreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  NewsCardfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEF0FB',
    paddingTop: 12,
  },
  NewsCardauthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  NewsCardauthorText: {
    fontSize: 14,
    color: '#6B7280',
  },
  NewsCarddateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  NewsCarddateText: {
    fontSize: 14,
    color: '#6B7280',
  },


  // Notification
  Notificationcontainer: {
    backgroundColor: '#FFEDEE',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  Notificationcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  Notificationicon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  NotificationtextContainer: {
    flex: 1,
  },
  Notificationtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E57373',
    marginBottom: 4,
  },
  NotificationsubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  Notificationmessage: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  NotificationactionText: {
    color: '#1E88E5',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },

  // section container
  SectionContainersectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    width: WINDOW_WIDTH - 10, 
    alignSelf: 'center', 
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  SectionContainersectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  SectionContainersectionNumberWrapper: {
    alignItems: 'center',
    marginRight: 20,
  },
  SectionContainersectionNumberBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#212529',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  SectionContainersectionNumberText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  SectionContainersectionConnector: {
    width: 3,
    height: 40,
    marginBottom: 30,
    backgroundColor: '#E9ECEF',
    position: 'absolute',
    top: 48,
    zIndex: -1,
  },
  SectionContainersectionTitleContainer: {
    flex: 1,
  },
  SectionContainersectionTitleText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  SectionContainersectionTitleUnderline: {
    height: 4,
    width: 64,
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  SectionContainersectionContent: {
  },

  //student card
  StudentCardheaderContainer: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  StudentCardheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  StudentCardtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StudentCardtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  StudentCarddivider: {
    marginHorizontal: 8,
    color: '#000',
    fontSize: 20,
  },
  StudentCardsubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StudentCardsubtitle: {
    marginLeft: 4,
    fontSize: 16,
    color: '#000',
  },
  StudentCardactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StudentCardiconButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginRight: 8,
  },
  StudentCardsearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
  },
  StudentCardsearchText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#000',
  },
  StudentCardaddButtonContainer: {
    margin: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#4B6BFB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  StudentCardaddButton: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  StudentCardaddButtonText: {
    marginTop: 8,
    fontSize: 16,
    color: '#4B6BFB',
    fontWeight: '500',
  },
  StudentCardcardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  StudentCardavatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  StudentCardavatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StudentCardstudentInfo: {
    marginLeft: 12,
  },
  StudentCardstudentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  StudentCardstudentDepartment: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  StudentCardcardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  StudentCardactionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  StudentCarddeleteButton: {
    backgroundColor: '#FEE2E2',
  },
  //Custom menu drawer

  CustomMenuDraweroverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  CustomMenuDrawerbackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  CustomMenuDrawercontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.85,
    height: height,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  CustomMenuDrawerprofileSection: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  CustomMenuDrawerprofileImageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  CustomMenuDrawerprofileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  CustomMenuDrawerstatusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  CustomMenuDrawerprofileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  CustomMenuDrawerprofileRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  CustomMenuDrawermenuContainer: {
    flex: 1,
    paddingTop: 12,
  },
  CustomMenuDrawermenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  CustomMenuDrawermenuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CustomMenuDrawericonContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  CustomMenuDrawermenuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  CustomMenuDrawersubMenuContainer: {
    paddingLeft: 56,
    backgroundColor: '#F8FAFC',
  },
  CustomMenuDrawersubMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  CustomMenuDrawersubMenuIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  CustomMenuDrawersubMenuTitle: {
    fontSize: 14,
    color: '#4B5563',
  },
  CustomMenuDrawerseparator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
    marginHorizontal: 20,
  },
  CustomMenuDrawerchatbotSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  CustomMenuDrawerchatbotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
  },
  CustomMenuDrawerchatbotIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  CustomMenuDrawerchatbotTextContainer: {
    flex: 1,
  },
  CustomMenuDrawerchatbotTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  CustomMenuDrawerchatbotSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },

});



export default AdminPortal_Css;