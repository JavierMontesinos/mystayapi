import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const PremiumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERVICIOS DE CAFETERIA</Text>
      <View style={styles.buttonContainer}>
        <Button title="Reserva en restaurantes" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Entradas de espectáculos" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Guias turísticos" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Compra de articulos" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Concierge service" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginTop: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PremiumScreen;
