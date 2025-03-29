import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import styles from '../AdminPortal_Css';

const { height } = Dimensions.get('window');

const HeaderBackground = ({ imageSource, overlayOpacity = 0.5 }) => {
  return (
    <>
      <Image
        source={imageSource || require('../Assets/bg.jpg')}
        style={styles.backgroundImage}
        blurRadius={2}
      />
      <View
        style={[
          styles.overlay,
          { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }
        ]}
      />
    </>
  );
};



export default HeaderBackground;