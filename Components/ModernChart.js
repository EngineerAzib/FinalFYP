import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ChevronRight } from 'lucide-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../AdminPortal_Css';

const ModernChart = ({ title, type = 'line', data, onDetailsPress }) => {
  const screenWidth = Dimensions.get('window').width - 30; // Increased padding

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(134, 134, 134, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // Solid lines
      strokeWidth: 0.5,
      stroke: 'rgba(134, 134, 134, 0.1)',
    },
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <LineChart
          data={data}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.ModernChartchart}
          withHorizontalLabels={true}
          withVerticalLabels={true}
          withDots={true}
          withShadow={false}
          withInnerLines={true}
          withOuterLines={false}
        />
      );
    } else {
      return (
        <BarChart
          data={data}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          style={styles.ModernChartchart}
          withHorizontalLabels={true}
          showBarTops={false}
          flatColor={true}
        />
      );
    }
  };

  return (
    <View style={styles.ModernChartcontainer}>
      <View style={styles.ModernChartheader}>
        <Text style={styles.ModernCharttitle}>{title}</Text>
        <Ionicons
          name="chevron-forward"  // Use Ionicons' 'chevron-forward' icon
          size={20}
          color="#6B7280"
          onPress={onDetailsPress} // Use onPress for handling the click event
        />
      </View>
      {renderChart()}
    </View>
  );
};


export default ModernChart;