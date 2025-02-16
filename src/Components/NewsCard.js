import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../AdminPortal_Css';
import Downloadpdf from '../Services/DownloadPDF/Downloadpdf';  // Import your download function

export const NewsCard = ({ news }) => {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditNewsScreen', { newsData: news });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDownload = () => {
    // Call Downloadpdf function with the filename from news
    Downloadpdf(news.imageUrl);  // Ensure the filename exists in the 'news' object
  };

  return (
    <View style={styles.NewsCardcard}>
      {/* {news.image ? (
        <Image
          source={{ uri: news.image }}
          style={styles.NewsCardnewsImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.NewsCardplaceholderImage}>
          <MaterialIcons name="article" size={40} color="#6C63FF" />
        </View>
      )} */}

      <View style={styles.NewsCardcontentContainer}>
        <View style={styles.NewsCardheaderRow}>
          <View style={styles.NewsCardcategoryContainer}>
            <MaterialIcons
              name={
                news.categoryTitle === 'Announcement' ? 'campaign' :
                news.categoryTitle === 'Update' ? 'update' :
                news.categoryTitle === 'Alert' ? 'warning' : 'article'
              }
              size={16}
              color="#6C63FF"
            />
            <Text style={styles.NewsCardcategory}>{news.categoryTitle}</Text>
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
          {news.description}
        </Text>

        <View style={styles.NewsCardfooter}>
          <TouchableOpacity onPress={handleDownload}>
            <Text style={styles.NewsCardcategory}>Download</Text>
          </TouchableOpacity>

          <View style={styles.NewsCarddateContainer}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.NewsCarddateText}>{formatDate(news.publishedDate)}</Text>
            <Text style={styles.NewsCardauthorText}>{news.publishedTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
