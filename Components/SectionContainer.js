import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
import styles from '../AdminPortal_Css';

export const SectionContainer = ({
  sectionNumber,
  title,
  children,
  isLast = false,
  containerStyle,
  // Add new props for more styling control
  contentPadding = 20,
  widthOffset = 0,
}) => {
  return (
    <View style={[styles.SectionContainersectionContainer, containerStyle]}>
      <View style={styles.SectionContainersectionHeader}>
        <View style={styles.SectionContainersectionNumberWrapper}>
          <View style={styles.SectionContainersectionNumberBadge}>
            <Text style={styles.SectionContainersectionNumberText}>{sectionNumber}</Text>
          </View>
          {!isLast && <View style={styles.SectionContainersectionConnector} />}
        </View>
        <View style={styles.SectionContainersectionTitleContainer}>
          <Text style={styles.SectionContainersectionTitleText}>{title}</Text>
          <View style={styles.SectionContainersectionTitleUnderline} />
        </View>
      </View>
      <View style={[
        styles.SectionContainersectionContent,
        { paddingLeft: contentPadding }
      ]}>
        {children}
      </View>
    </View>
  );
};

