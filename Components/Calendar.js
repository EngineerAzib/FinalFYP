import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Render week days
    weekDays.forEach(day => {
      days.push(
        <Text key={`weekday-${day}`} style={styles.CalendarweekDay}>
          {day}
        </Text>
      );
    });

    // Add empty spaces for first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.CalendardayCell} />);
    }

    // Render month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[styles.CalendardayCell, isToday && styles.CalendartodayCell]}
        >
          <Text style={[styles.CalendardayText, isToday && styles.CalendartodayText]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.Calendarcontainer}>
      <View style={styles.Calendarheader}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.CalendarnavButton}>
          <MaterialIcons name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <View>
          <Text style={styles.Calendarmonth}>{monthNames[currentDate.getMonth()]}</Text>
          <Text style={styles.Calendaryear}>{`TUE ${currentDate.getDate()} ${currentDate.getFullYear()}`}</Text>
        </View>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.CalendarnavButton}>
          <MaterialIcons name="chevron-right" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.Calendarcalendar}>
        {renderCalendarDays()}
      </View>
    </View>
  );
};



export default Calendar;
