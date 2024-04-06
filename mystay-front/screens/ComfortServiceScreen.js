import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ComfortServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>SERVICIOS</Text>
      <View style={styles.serviceList}>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceName}>Ropa de cama</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceName}>Toallas de baño</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceName}>Almohadas</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceName}>Productos de baño</Text>
        </View>
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
    serviceList: {
      width: '80%',
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      padding: 10,
    },
    serviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    serviceName: {
      fontSize: 16,
    },
});

export default ComfortServiceScreen;
