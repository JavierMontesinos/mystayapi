import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.userInfo}>Nombre: John Doe</Text>
      <Text style={styles.userInfo}>Email: johndoe@example.com</Text>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="pencil" size={20} color="white" style={styles.icon} />
        <Text style={styles.text}>Edita tus datos personales</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#1d2b42',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
