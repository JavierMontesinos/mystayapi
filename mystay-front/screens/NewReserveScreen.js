import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TitleText, SubTitleText } from '../components/CustomText'
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const NewReserveScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const sendReservation = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reserve/1', {
        startDate,
        endDate,
      });

      console.log('Reservation sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending reservation:', error.message);
    }
  };

  const handleSelectDate = (date) => {
    const newDate = date.dateString;
    if (!startDate) {
      setStartDate(newDate);
    } else if (startDate && !endDate) {
      if (newDate > startDate) {
        setEndDate(newDate);
      } else {
        setStartDate(newDate);
      }
    } else {
      setStartDate('');
      setEndDate('');
    }
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <TitleText text={"Reserva"} style={{textAlign: "center"}} />
      
      <Calendar
        // ...other calendar props (e.g., month, current, minDate, maxDate)
        onDayPress={handleSelectDate}
        theme={{
          calendarBackground: '#36454F', // Light gray background
          selectedDayBackgroundColor: '#F59B00', // Orange for selected day
          selectedDayTextColor: '#fff',
          dayTextColor: '#fff', // Dark gray day text color
          textDayHeaderFontWeight: 'bold', // Bold day header text
        }}
      />
      <View style={styles.dateLabelsContainer}>
        <Text style={styles.dateLabel}>Fecha Entrada:</Text>
        <Text style={styles.dateValue}>{startDate || 'Sin fecha seleccionada'}</Text>
      </View>
      <View style={styles.dateLabelsContainer}>
        <Text style={styles.dateLabel}>Fecha Salida:</Text>
        <Text style={styles.dateValue}>{endDate || 'Sin fecha seleccionada'}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 20}}>
        <CustomButton icon={""} text={"Submit"} func={sendReservation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateLabelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dateLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dateValue: {
    flex: 2,
    fontSize: 16,
    color: '#666',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#F59B00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59B00',
    marginRight: 10,
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: '#888',
  },
});

export default NewReserveScreen;
