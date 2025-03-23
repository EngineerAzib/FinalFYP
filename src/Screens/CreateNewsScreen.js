import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';
import GetNewsCategory from '../Services/NewsService/GetNewsCategory';
import axios from 'axios';
import { API_BASE_URL } from '../Services/Config';

export const CreateNewsScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    ImageUrl: null,
    PublishedDate: new Date().toISOString().split('T')[0],
    PublishedTime: new Date().toLocaleTimeString(),
    CategoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetNewsCategory();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    try {
      const formDataData = new FormData();
  
      // Append standard fields
      formDataData.append('Title', formData.Title);
      formDataData.append('Description', formData.Description);
      formDataData.append('CategoryId', parseInt(formData.CategoryId, 10)); // Ensure it's a number
  
      if (formData.PublishedDate) {
        console.log('PublishedDate:', formData.PublishedDate); // Debug the date format
  
        // Split the date into Year, Month, and Day
        const [year, month, day] = formData.PublishedDate.split('-'); // Assumes YYYY-MM-DD format
        console.log('Year:', year, 'Month:', month, 'Day:', day); // Debug the split values
  
        if (year && month && day) {
          formDataData.append('PublishedDate.Year', parseInt(year, 10));
          formDataData.append('PublishedDate.Month', parseInt(month, 10)); // Months are 1-based
          formDataData.append('PublishedDate.Day', parseInt(day, 10));
        } else {
          console.error('Invalid date format. Expected YYYY-MM-DD.');
          throw new Error('Invalid date format. Expected YYYY-MM-DD.');
        }
      }
      // 🟢 FIX: Append PublishedTime fields
      if (formData.PublishedTime) {
        const [hour, minute] = formData.PublishedTime.split(':');
        formDataData.append('PublishedTime.Hour', parseInt(hour, 10));
        formDataData.append('PublishedTime.Minute', parseInt(minute, 10));
      }
  
      // Handle image upload
      if (formData.ImageUrl) {
        formDataData.append('image', {
          uri: formData.ImageUrl,
          type: 'image/jpeg', // Change based on actual image type
          name: 'news_image.jpg',
        });
      }
      console.log('FormData:', {
        Title: formData.Title,
        Description: formData.Description,
        CategoryId: formData.CategoryId,
        PublishedDate: {
          Year: new Date(formData.PublishedDate).getFullYear(),
          Month: new Date(formData.PublishedDate).getMonth() + 1,
          Day: new Date(formData.PublishedDate).getDate(),
        },
        PublishedTime: {
          Hour: formData.PublishedTime.split(':')[0],
          Minute: formData.PublishedTime.split(':')[1],
        },
        ImageUrl: formData.ImageUrl,
      });
      // Send request
      const response = await axios.post(`${API_BASE_URL}/api/News/AddNews`, formDataData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('News created successfully:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating news:', error.response ? error.response.data : error);
    }
  };
  
  

  return (
    <View style={styles.CreateNewsScreenmainContainer}>
      <Header />
      <CustomHeader
        title="News"
        currentScreen="Create News"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.CreateNewsScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CreateNewsScreenscrollContent}
        >
          <Text style={styles.CreateNewsScreenformTitle}>Add News</Text>

          <View style={styles.CreateNewsScreenlegendContainer}>
            <View style={styles.CreateNewsScreenlegendItem}>
              <View style={[styles.CreateNewsScreenlegendDot, styles.CreateNewsScreenrequiredDot]} />
              <Text style={styles.CreateNewsScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateNewsScreenlegendItem}>
              <View style={[styles.CreateNewsScreenlegendDot, styles.CreateNewsScreenoptionalDot]} />
              <Text style={styles.CreateNewsScreenlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Publish News">
            <FormField
              label="Title"
              placeholder="Enter news title"
              value={formData.Title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, Title: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Category"
              placeholder="Select news category"
              value={formData.CategoryId}
              onChangeText={(text) => setFormData(prev => ({ ...prev, CategoryId: text }))}
              required={true}
              type="select"
              options={categories.map(category => ({
                label: category.title,
                value: category.id.toString(),
              }))}
            />

            <FormField
              label="Description"
              placeholder="Enter news content"
              value={formData.Description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, Description: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              style={styles.CreateNewsScreencontentInput}
            />

            <FormField
              label="Published Date"
              placeholder="Select publish date"
              value={formData.PublishedDate}
              onChangeText={(date) => setFormData(prev => ({ ...prev, PublishedDate: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Published Time"
              placeholder="Select publish time"
              value={formData.PublishedTime}
              onChangeText={(time) => setFormData(prev => ({ ...prev, PublishedTime: time }))}
              required={true}
              type="time"
            />

            <FormField
              label="Featured Image"
              placeholder="Upload news image"
              value={formData.ImageUrl}
              onChangeText={(uri) => setFormData(prev => ({ ...prev, ImageUrl: uri }))}
              type="file"
              maxSize="5MB"
              helperText="Recommended size: 1200x630px"
            />
          </SectionContainer>

          <SectionContainer sectionNumber="2" title="News Preview">
            <View style={styles.CreateNewsScreenpreviewContainer}>
              <View style={styles.CreateNewsScreenpreviewCard}>
                {formData.ImageUrl ? (
                  <Image
                    source={{ uri: formData.ImageUrl }}
                    style={styles.CreateNewsScreenpreviewImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.CreateNewsScreenpreviewImagePlaceholder}>
                    <MaterialIcons name="image" size={40} color="#6C63FF" />
                    <Text style={styles.CreateNewsScreenplaceholderText}>Featured image preview</Text>
                  </View>
                )}
                <View style={styles.CreateNewsScreenpreviewContent}>
                  <Text style={styles.CreateNewsScreenpreviewTitle} numberOfLines={2}>
                    {formData.Title || 'Your title will appear here'}
                  </Text>
                  <Text style={styles.CreateNewsScreenpreviewText} numberOfLines={3}>
                    {formData.Description || 'Your content preview will appear here'}
                  </Text>
                  <Text style={styles.CreateNewsScreenpreviewDate}>
                    {formData.PublishedDate} {formData.PublishedTime}
                  </Text>
                </View>
              </View>
            </View>
          </SectionContainer>
        </ScrollView>

        <View style={styles.CreateExamSchedulebuttonContainer}>
          <CustomButton
            buttons={[
              {
                title: "Cancel",
                onPress: () => navigation.goBack(),
                variant: "secondary",
              },
              {
                title: "Create News",
                onPress: handleCreate,
                variant: "primary",
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};