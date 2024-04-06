import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.userInfo}>Nombre: John Doe</Text>
      <Text style={styles.userInfo}>Email: johndoe@example.com</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edita tus datos personales" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Consulta tus reservas" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Hazte premium" onPress={() => {}} />
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

export default ProfileScreen;
