import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const CafeteriaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SERVICIOS DE CAFETERIA</Text>
      <View style={styles.buttonContainer}>
        <Button title="Desayuno" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Comida" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cena" onPress={() => {}} />
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

export default CafeteriaScreen;
