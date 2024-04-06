import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CheckOutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHECK-OUT</Text>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Pagar</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Ver factura</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Anular llave</Text>
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

export default CheckOutScreen;