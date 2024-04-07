import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText } from '../components/CustomText'

const CheckOutScreen = ({ navigation }) => {
  return (
  <View style={styles.container}>
    <TitleText text={"CHECK-OUT"} />
    <View style={styles.buttonContainer}>
      <CustomButton icon={""} text={"Pagar"} style={styles.text} func={() => navigation.navigate('(pay)')} /> 
    </View>
    <View style={styles.buttonContainer}>
      <CustomButton icon={""} text={"Ver factura"} func={() => alert("Para obtener su factura debe haber realizado el pago de su estencia antes")} />
    </View>
    <View style={styles.buttonContainer}>
      <CustomButton icon={""} text={"Anular llave"} />
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
});

export default CheckOutScreen;