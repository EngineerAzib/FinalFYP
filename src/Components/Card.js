import React from 'react';
import { View, Text,  Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2; 

const Card = ({ title, value, subtitle, additionalValue, backgroundColor, icon }) => {
  return (
    <View style={[styles.Cardcard, { backgroundColor }]}>
      <View style={styles.CardiconContainer}>
        <MaterialIcons name={icon} size={32} color="#fff" />
      </View>
      <View style={styles.CardcontentContainer}>
        <Text style={styles.Cardtitle}>{title}</Text>
        <Text style={styles.Cardvalue}>{value}</Text>
        <Text style={styles.Cardsubtitle}>{subtitle}</Text>
        {additionalValue !== undefined && (
          <Text style={styles.CardadditionalValue}>{additionalValue}</Text>
        )}
      </View>
    </View>
  );
};


export default Card;
