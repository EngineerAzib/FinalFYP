import React from 'react';
import { View, ScrollView, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import DepartmentStats from '../Components/DepartmentStats';
import { EmptyState } from '../Components/EmptyState';

import styles from '../AdminPortal_Css';

import DepartmentService from '../Services/DepartmentService/DepartmentService';

export const DepartmentListScreen = ({ navigation }) => {
  // Call DepartmentService to get data
  const { departments, loading, error } = DepartmentService();

  const handleAddDepartment = () => {
    navigation.navigate('CreateDepartmentScreen');
    console.log("Azib");
  };

  const handleEditDepartment = (id) => {
    navigation.navigate('EditDepartmentScreen', { id });
  };

  const handleDeleteDepartment = (id) => {
    console.log('Delete department:', id);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.DepartmentListScreensafeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.DepartmentListScreensafeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
