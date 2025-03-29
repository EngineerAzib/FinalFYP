import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { CustomButton } from '../Components/CustomButton';

export const CreateNewsScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    tags: '',
    image: null
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


      navigation.goBack();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleCreate = async () => {
    try {


      navigation.goBack();
    } catch (error) {
      console.error('Error creating news:', error);
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
              style={styles.CreateNewsScreencontentInput}
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
              helperText="Add relevant tags to help with categorization"
            />

            <FormField
              label="Featured Image"
              placeholder="Upload news image"
              value={formData.image}
              onChangeText={(uri) => setFormData(prev => ({ ...prev, image: uri }))}
              type="file"
              maxSize="5MB"
              helperText="Recommended size: 1200x630px"
            />
          </SectionContainer>
          <SectionContainer sectionNumber="1" title="News Preview">

            <View style={styles.CreateNewsScreenpreviewContainer}>
              <View style={styles.CreateNewsScreenpreviewCard}>
                {formData.image ? (
                  <Image
                    source={{ uri: formData.image }}
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
                    {formData.title || 'Your title will appear here'}
                  </Text>
                  <Text style={styles.CreateNewsScreenpreviewText} numberOfLines={3}>
                    {formData.content || 'Your content preview will appear here'}
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
                onPress: handleUpdate,
                variant: "primary",
              }
            ]}
          />
        </View>
      </View>

    </View >
  );
};

