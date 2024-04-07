import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CustomButton from '../components/CustomButton';
import TitleText from '../components/TitleText'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TitleText text={"MI PERFIL"} />
      <View style={styles.buttonContainer}>
        <CustomButton icon={"pencil"} text={"Edita tus datos personales"} /> 
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton icon={"book"} text={"Consulta tus reservas"} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton icon={"star"} text={"Hazte premium"} />
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
  buttonContainer: {
    marginTop: 20,
  }
});

export default ProfileScreen;
