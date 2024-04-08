import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText, SubTitleText } from '../components/CustomText'
import axios from 'axios';


const PayScreen = ({ navigation }) => {
    const [bank, setBank] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    
    const handlePayment = async (navigation) => {
      try {
        const response = await axios.post('http://192.168.1.128:3000/pay/1', {
          bank,
          cvv,
        });
        alert("Se ha pagado correctamente")
        
        navigation.navigate("Profile")
      } catch (error) {
        alert(error.response.data.message)
        console.error('Payment failed:', error.message);
        // Handle error scenario (e.g., display an error message to the user)
      }
    };

    return (
        <View style={styles.container}>
            <TitleText text={"PAGO DE LA CUENTA"} />
            <SubTitleText text="Introduce tus datos de pago" />
            <View style={styles.buttonContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Bank Account Number"
                    value={bank}
                    onChangeText={setBank}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    value={cvv}
                    onChangeText={setCvv}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton icon={""} text={"Confirm"} func={() => handlePayment(navigation)} />
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
  input: {
    width: 260,
    height: 40,
    backgroundColor: '#dddddd',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PayScreen;