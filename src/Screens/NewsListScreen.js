
import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Header} from '../Components/Header';
import {CustomHeader} from '../Components/CustomHeader';
import { NewsCard } from '../Components/NewsCard';
import { EditNewsScreen} from './EditNewsScreen';
import { CreateNewsScreen } from './CreateNewsScreen';
import styles from '../AdminPortal_Css';
import NewsService from '../Services/NewsService/NewsService'
export const NewsListScreen = ({ navigation }) => {
  // Sample data - replace with your API call
 const{news,loading, error }=NewsService();

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
