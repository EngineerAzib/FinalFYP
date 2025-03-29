import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../AdminPortal_Css';

export const NewsCard = ({ news }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditNewsScreen', { newsData: news });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.NewsCardcard}>
      {news.image ? (
        <Image
          source={{ uri: news.image }}
          style={styles.NewsCardnewsImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.NewsCardplaceholderImage}>
          <MaterialIcons name="article" size={40} color="#6C63FF" />
        </View>
      )}

      <View style={styles.NewsCardcontentContainer}>
        <View style={styles.NewsCardheaderRow}>
          <View style={styles.NewsCardcategoryContainer}>
            <MaterialIcons name={
              news.category === 'Announcement' ? 'campaign' :
                news.category === 'Update' ? 'update' :
                  news.category === 'Alert' ? 'warning' : 'article'
            } size={16} color="#6C63FF" />
            <Text style={styles.NewsCardcategory}>{news.category}</Text>
          </View>
          <TouchableOpacity
            onPress={handleEdit}
            style={styles.NewsCardeditButton}
          >
            <MaterialIcons name="edit" size={20} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.NewsCardtitle}>{news.title}</Text>
        <Text style={styles.NewsCardpreview} numberOfLines={2}>
          {news.content}
        </Text>

        <View style={styles.NewsCardfooter}>
          <View style={styles.NewsCardauthorContainer}>
            <MaterialIcons name="person" size={16} color="#6B7280" />
            <Text style={styles.NewsCardauthorText}>{news.author}</Text>
          </View>

          <View style={styles.NewsCarddateContainer}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.NewsCarddateText}>{formatDate(news.publishDate)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
