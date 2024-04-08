import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText, SubTitleText } from '../components/CustomText'
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (navigation) => {
    try {
        const user = { firstName, lastName, address, zip, email };
        const response = await axios.put('http://192.168.1.141:3000/clients/1', user);
        console.log('PUT request successful:', response.data);

        alert('Datos actualizados');
        navigation.goBack();
      } catch (error) {
        console.error('Error sending PUT request:', error);
      }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get('http://192.168.1.141:3000/clients/1');
      const user = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setZip(user.zip);
      setEmail(user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data!');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <TitleText text={"MIS DATOS"} />
      <SubTitleText text={"Escribe tus datos personales y de contacto"} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { marginRight: 10}]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { marginRight: 10}]}
          placeholder="Full Address"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput style={styles.textInput} placeholder="ZIP" value={zip} onChangeText={setZip} />
      </View>
      
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>
      <CustomButton text={"Submit"} icon={""} func={() => handleSubmit(navigation)} />
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // space out the input fields
    margin: 10
  },
  textInput: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    flex: 1, // equally distribute space between the two inputs in this container
  },
  fullAddressInput: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 40
  },
  emailInput: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    flex: 2, // make the email input take twice the space of the ZIP input
  },
  emailContainer: {
    flexDirection: "row",
    margin: 10,
  }
});

export default EditProfileScreen;
