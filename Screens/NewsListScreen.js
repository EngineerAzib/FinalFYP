
import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Header} from '../Components/Header';
import {CustomHeader} from '../Components/CustomHeader';
import { NewsCard } from '../Components/NewsCard';
import { EditNewsScreen} from './EditNewsScreen';
import { CreateNewsScreen } from './CreateNewsScreen';
import styles from '../AdminPortal_Css';

export const NewsListScreen = ({ navigation }) => {
  // Sample data - replace with your API call
  const news = [
    {
      id: 1,
      title: 'New Campus Library Opening Soon',
      content: 'We are excited to announce the grand opening of our new state-of-the-art library facility. The new building will feature modern study spaces, advanced technology resources, and an expanded collection of books and digital media.',
      category: 'Announcement',
      author: 'Admin Team',
      publishDate: '2025-02-15',
      image: null,
      tags: ['campus', 'library', 'facilities']
    },
    {
      id: 2,
      title: 'Important Schedule Changes',
      content: 'Due to the upcoming renovation work, there will be temporary changes to class schedules starting next week. Please check your student portal for updated information.',
      category: 'Alert',
      author: 'Academic Affairs',
      publishDate: '2025-02-14',
      image: null,
      tags: ['schedule', 'classes', 'important']
    }
  ];

  return (
    <View style={styles.NewsListScreencontainer}>
      <Header />
      <CustomHeader 
      title="News"
      currentScreen="News List"
      showSearch={true}
      showRefresh={false}
      navigation={navigation}      
      />
      <ScrollView style={styles.NewsListScreenscrollView}>
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.NewsListScreenfab}
        onPress={() => navigation.navigate('CreateNewsScreen')} 
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
