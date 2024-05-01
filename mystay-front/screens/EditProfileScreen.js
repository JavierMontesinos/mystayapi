import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { TitleText, SubTitleText } from '../components/CustomText'
import axios from 'axios';
import AuthContext from '../utils/AuthProvider';
import { get, put } from '../utils/Requests';

const EditProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [premium, setPremium] = useState('No premium');
  const [correo, setCorreo] = useState('');

  const { getUserId } = React.useContext(AuthContext);

  const handleSubmit = async (navigation) => {
    try {
        const response = await put(`clientes/${getUserId()}`, { nombre, telefono, dni, correo, gasto: 0.0});
        
        console.log('PUT request successful:', response.data);

        alert('Datos actualizados');
        navigation.goBack();
      } catch (error) {

        console.error('Error sending PUT request:', error.response);
      }
  };

  const getUserData = async () => {
    try {
      const response = await get(`clientes/${getUserId()}`);
      const user = response.data;
      console.log(user);

      setNombre(user.nombre);
      setTelefono(user.telefono);
      setDni(user.dni);
      setPremium(user.premium ? 'Premium' : 'No premium');
      setCorreo(user.correo);
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.log(error.response.data)
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
          placeholder="Nombre"r
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nº de Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { marginRight: 10}]}
          placeholder="DNI"
          value={dni}
          onChangeText={setDni}
        />

        <Text style={styles.textInput}>{premium}</Text>
      </View>
      
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} placeholder="Email" value={correo} onChangeText={setCorreo} />
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
  fulldniInput: {
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
