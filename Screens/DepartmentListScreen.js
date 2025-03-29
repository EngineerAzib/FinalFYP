import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import DepartmentStats from '../Components/DepartmentStats';
import { EmptyState } from '../Components/EmptyState';
import CustomMenuDrawer from '../Components/CustomMenuDrawer';

import styles from '../AdminPortal_Css';


export const DepartmentListScreen = ({ navigation }) => {
  const departments = [
    {
      id: 1,
      name: 'Computer Science',
      totalStudents: 120,
      genderStats: {
        boys: { percentage: 60, count: 72 },
        girls: { percentage: 40, count: 48 }
      }
    },
    {
      id: 2,
      name: 'Mechanical Engineering',
      totalStudents: 95,
      genderStats: {
        boys: { percentage: 75, count: 71 },
        girls: { percentage: 25, count: 24 }
      }
    },
    {
      id: 3,
      name: 'Civil Engineering',
      totalStudents: 150,
      genderStats: {
        boys: { percentage: 80, count: 120 },
        girls: { percentage: 20, count: 30 }
      }
    },
    {
      id: 4,
      name: 'Computer Science',
      totalStudents: 120,
      genderStats: {
        boys: { percentage: 60, count: 72 },
        girls: { percentage: 40, count: 48 }
      }
    },
    {
      id: 5,
      name: 'Mechanical Engineering',
      totalStudents: 95,
      genderStats: {
        boys: { percentage: 75, count: 71 },
        girls: { percentage: 25, count: 24 }
      }
    },
    {
      id: 6,
      name: 'Civil Engineering',
      totalStudents: 150,
      genderStats: {
        boys: { percentage: 80, count: 120 },
        girls: { percentage: 20, count: 30 }
      }
    },
  ];

  const handleAddDepartment = () => {
    navigation.navigate('CreateDepartmentScreen');
  };

  const handleEditDepartment = (id) => {
    navigation.navigate('EditDepartmentScreen', { id });
  };

  const handleDeleteDepartment = (id) => {
    console.log('Delete department:', id);
  };
  const toggleCard = (id) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return (
    <SafeAreaView style={styles.DepartmentListScreensafeArea}>
      <Header />
      <CustomHeader
        title="Departments"
        currentScreen="All Departments"
        showSearch={true}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.DepartmentListScreencontainer}>
        {departments.length === 0 ? (
          <EmptyState onPress={handleAddDepartment} />
        ) : (
          <ScrollView
            style={styles.DepartmentListScreenscrollView}
            contentContainerStyle={styles.DepartmentListScreenscrollContent}
            showsVerticalScrollIndicator={false}
          >
            {departments.map((department) => (
              <DepartmentStats
                key={department.id}
                department={department}
                onEdit={() => handleEditDepartment(department.id)}
                onDelete={() => handleDeleteDepartment(department.id)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
