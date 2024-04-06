import React from "react";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from "./TabNav";
import NewReserveScreen from '../screens/NewReserveScreen'


const Drawer = createDrawerNavigator();

const CustomDrawerNav = (props) => {
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}>
            <DrawerItem label="Check-out" onPress={() => alert("a")} />
            <DrawerItem label="Nueva reserva" onPress={() => alert("a")} />
            <DrawerItem label="Servicios confort" onPress={() => alert("a")} />
            <DrawerItem label="Incidencias" onPress={() => alert("a")} />
            <DrawerItem label="Otros servicios" onPress={() => alert("a")} />
        </DrawerItemList>
    </DrawerContentScrollView>
}

const DrawerNav = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerNav {...props} />}
        screenOptions={({ route }) => ({
            headerTitle: ""
            })}
        >
        <Drawer.Screen name="(tabnav)" options={{ }} component={TabNavigator} />
        <Drawer.Screen name="AD" component={NewReserveScreen} />
      </Drawer.Navigator>
    );
  }

export default DrawerNav;