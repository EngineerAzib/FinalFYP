import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { InternshipCard } from '../Components/InternshipCard';
import { CreateInternshipScreen } from './CreateInternshipScreen';
import { EditInternshipScreen } from './EditInternshipScreen';
import styles from '../AdminPortal_Css';
import InternshipService from '../Services/InternshipService/InternshipService';
export const InternshipListScreen = ({ navigation }) => {
  // Sample data - replace with your API call
  
  const{internship,error}=InternshipService();
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
        {internship.map((item) => (
          <InternshipCard key={item.id} internship={item} />
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
