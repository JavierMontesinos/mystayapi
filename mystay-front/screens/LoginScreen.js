import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TitleText } from '../components/CustomText';
import CustomButton from '../components/CustomButton';

import AuthContext from '../utils/AuthProvider';

const LoginScreen = () => {
  const [dni, setDni] = React.useState('');
  const [nhab, setNhab] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TitleText text={"MYSTAY"} />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de habitación"
        value={nhab}
        onChangeText={setNhab}
      />
      <CustomButton text="Login" func={() => signIn({ dni, nhab })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default LoginScreen;
