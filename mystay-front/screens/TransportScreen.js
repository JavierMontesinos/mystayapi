import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRANSPORTE</Text>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Taxi</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Transporte al aeropuerto</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>BILLETES</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
});

export default TransportScreen;