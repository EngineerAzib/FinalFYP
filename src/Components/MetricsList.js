// Components/MetricsList.js
import React from 'react';
import { View, Text,  Animated, TouchableOpacity } from 'react-native';
import styles from '../AdminPortal_Css';

const MetricsList = ({ metrics = [], onMetricPress }) => {
  // Animation value for loading bar
  const loadingAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(loadingAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.MetricsListcontainer}>
      {metrics.map((metric, index) => {
        const animatedWidth = loadingAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', `${metric.percentage}%`],
        });

        return (
          <TouchableOpacity
            key={index}
            style={styles.MetricsListmetricItem}
            onPress={() => onMetricPress && onMetricPress(metric)}
          >
            <View style={styles.MetricsListmetricContent}>
              <Text style={styles.MetricsListmetricTitle}>{metric.title}</Text>
              <Text style={styles.MetricsListpercentageText}>{metric.percentage}%</Text>
            </View>

            <View style={styles.MetricsListprogressBarContainer}>
              <Animated.View
                style={[
                  styles.MetricsListprogressBar,
                  { width: animatedWidth },
                  metric.color && { backgroundColor: metric.color }
                ]}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};



export default MetricsList;