import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { TitleText } from '../components/CustomText'
import axios from 'axios';


const ViewReservesScreen = () => {
  const [reservations, setReservations] = useState([]);

  useFocusEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.48.144:3000/reserves/1');
      console.log(response.data)
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TitleText text={"LISTA DE RESERVAS"} />
      {reservations.map((reservation, index) => (
        <View key={index} style={styles.reservationContainer}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.info}>{formatDate(reservation.startDate)}</Text>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.info}>{formatDate(reservation.endDate)}</Text>
          <Text style={styles.label}>Hotel:</Text>
          <Text style={styles.info}>{reservation.hotel}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  reservationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  info: {
    marginBottom: 10,
    color: '#333',
  },
});

export default ViewReservesScreen;
