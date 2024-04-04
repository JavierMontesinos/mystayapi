import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MI PERFIL</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edita tus datos personales" onPress={() => { /* Handle button 1 press */ }} />
        <Button title="Consulta tus reservas" onPress={() => { /* Handle button 2 press */ }} />
        <Button title="Hazte premium" onPress={() => { /* Handle button 3 press */ }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute buttons evenly
    width: '80%', // Adjust width as needed
  },
});

export default ProfileScreen;
