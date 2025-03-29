import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { InternshipCard } from '../Components/InternshipCard';
import { CreateInternshipScreen } from './CreateInternshipScreen';
import { EditInternshipScreen } from './EditInternshipScreen';
import styles from '../AdminPortal_Css';

export const InternshipListScreen = ({ navigation }) => {
  // Sample data - replace with your API call
  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      duration: '6 months',
      stipend: '$2000/month',
      positions: 3,
      deadline: 'Mar 30, 2025',
      status: 'Active',
      postedDate: '2 days ago',
      requirements: 'React, JavaScript, HTML/CSS',
      description: 'Join our dynamic team as a Frontend Developer Intern...',
      responsibilities: 'Develop user interfaces, implement features...',
      qualifications: 'Bachelor\'s in Computer Science or related field...'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'DataMinds Analytics',
      location: 'Remote',
      type: 'Part-time',
      duration: '3 months',
      stipend: '$1500/month',
      positions: 2,
      deadline: 'Apr 15, 2025',
      status: 'Upcoming',
      postedDate: '1 week ago',
      requirements: 'Python, Machine Learning, SQL',
      description: 'Work on exciting data science projects...',
      responsibilities: 'Analyze data, build models...',
      qualifications: 'Strong background in statistics...'
    }
  ];

  return (
    <View style={styles.InternshipListScreencontainer}>
      <Header />
      <CustomHeader
        title="Internships"
        currentScreen="Internship List"
        showSearch={true}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView style={styles.InternshipListScreenscrollView}>
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.InternshipListScreenfab}
        onPress={() => navigation.navigate('CreateInternshipScreen')}
      >

        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
