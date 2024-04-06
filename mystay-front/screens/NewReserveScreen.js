import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const NewReserveScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectDate = (date) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva</Text>
      <Calendar
        // ...calendar props
        onDayPress={handleSelectDate}
      />
      {selectedDate ? (
        <Button title="Reservar" onPress={() => {}} disabled={false} style={styles.button} />
      ) : (
        <Button title="Reservar" onPress={() => {}} disabled={true} style={styles.buttonDisabled} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  buttonDisabled: {
    marginTop: 20,
    opacity: 0.5,
  },
});

export default NewReserveScreen;
