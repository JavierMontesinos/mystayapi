import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago de la cuenta</Text>
      <Text style={styles.subTitle}>Introduce tus datos de pago</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Bank Account Number"
      />
      <TextInput
        style={styles.textInput}
        placeholder="CVV"
        secureTextEntry={true}
      />
      <Button title="CONFIRMAR" onPress={() => {}} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  subTitle: {
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default PaymentScreen;
