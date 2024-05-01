import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText } from '../components/CustomText'
import axios from 'axios';

const CheckOutScreen = ({ navigation }) => {
  const handleFactura = async () => {
    try {
      const response = await axios.get('http://192.168.1.139:8443/factura/1');
      alert(`Pagado: ${response.data.message}`)
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  return (
  <View style={styles.container}>
    <TitleText text={"CHECK-OUT"} />
    <View style={styles.buttonContainer}>
      <CustomButton icon={""} text={"Pagar"} style={styles.text} func={() => navigation.navigate('(pay)')} /> 
    </View>
    <View style={styles.buttonContainer}>
      <CustomButton icon={""} text={"Ver factura"} func={handleFactura} />
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