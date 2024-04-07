import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText } from '../components/CustomText';

const TransportScreen = () => {
  return (
    <View style={styles.container}>
      <TitleText text={"TRANSPORTE"} />
      <View style={styles.buttonContainer}>
        <CustomButton icon={""} text={"Taxi"} style={styles.text} /> 
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton icon={""} text={"Transporte al aeropuerto"} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton icon={""} text={"Billetes"} />
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
  },
  text: {
    textAlign: 'center',
  }
});

export default TransportScreen;