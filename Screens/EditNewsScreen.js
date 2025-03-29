// src/screens/EditNewsScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';


export const EditNewsScreen = ({ route, navigation }) => {
  const { newsData } = route.params;

  const [formData, setFormData] = useState({
    title: newsData?.title || '',
    content: newsData?.content || '',
    category: newsData?.category || '',
    author: newsData?.author || '',
    publishDate: newsData?.publishDate || new Date().toISOString().split('T')[0],
    tags: newsData?.tags?.join(', ') || '',
    image: newsData?.image || null
  });

  const categories = [
    'Announcement',
    'Update',
    'Alert',
    'News',
    'Other'
  ];

  const handleUpdate = async () => {
    try {
      // Here you would make your API call
      // await updateNews(newsData.id, formData);

      navigation.goBack();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  return (
    <View style={styles.EditNewsScreenmainContainer}>
      <Header />
      <CustomHeader
        title="News"
        currentScreen="Edit News"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <View style={styles.EditNewsScreencontentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.EditNewsScreenscrollContent}
        >
          <Text style={styles.EditNewsScreenformTitle}>Revise News</Text>

          <View style={styles.EditNewsScreenlegendContainer}>
            <View style={styles.EditNewsScreenlegendItem}>
              <View style={[styles.EditNewsScreenlegendDot, styles.EditNewsScreenrequiredDot]} />
              <Text style={styles.EditNewsScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.EditNewsScreenlegendItem}>
              <View style={[styles.EditNewsScreenlegendDot, styles.EditNewsScreenoptionalDot]} />
              <Text style={styles.EditNewsScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Edit Details">

            <FormField
              label="Title"
              placeholder="Enter news title"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Category"
              placeholder="Select news category"
              value={formData.category}
              onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
              required={true}
              type="select"
              options={categories}
            />

            <FormField
              label="Content"
              placeholder="Enter news content"
              value={formData.content}
              onChangeText={(text) => setFormData(prev => ({ ...prev, content: text }))}
              required={true}
              type="textarea"
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />

            <FormField
              label="Author"
              placeholder="Enter author name"
              value={formData.author}
              onChangeText={(text) => setFormData(prev => ({ ...prev, author: text }))}
              required={true}
              type="text"
            />

            <FormField
              label="Publish Date"
              placeholder="Select publish date"
              value={formData.publishDate}
              onChangeText={(date) => setFormData(prev => ({ ...prev, publishDate: date }))}
              required={true}
              type="date"
            />

            <FormField
              label="Tags"
              placeholder="Enter tags (comma separated)"
              value={formData.tags}
              onChangeText={(text) => setFormData(prev => ({ ...prev, tags: text }))}
              type="text"
            />

            <FormField
              label="Featured Image"
              placeholder="Upload news image"
              value={formData.image}
              onChangeText={(uri) => setFormData(prev => ({ ...prev, image: uri }))}
              type="file"
              maxSize="5MB"
            />
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
                title: "Edit News",
                onPress: handleUpdate,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>
    </View>

  );
};

