import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/TransportScreen';

import * as SecureStore from 'expo-secure-store';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import TransportScreen from './screens/TransportScreen';
import CafeteriaScreen from './screens/CafeteriaScreen';
import PremiumScreen from './screens/PremiumScreen';

import AuthContext from './utils/AuthProvider';
import CheckOutScreen from './screens/CheckOutScreen';
import ComfortServiceScreen from './screens/ComfortServiceScreen';
import NewReserveScreen from './screens/NewReserveScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.error("Can't restore token: ", e)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // TODO: Hacer API request a nuestro springboot
        console.log(data);
        const dummyToken = 'dummy-auth-token';
        await SecureStore.setItemAsync('userToken', dummyToken);
        dispatch({ type: 'SIGN_IN', token: dummyToken });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={({ route }) => ({
            headerShown: false,
          })}
        >
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="RootNav" component={HamburguerMenu} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


const HamburguerMenu = () => {
  return (
    <Drawer.Navigator 
      screenOptions={({ route }) => ({
          headerTitle: ""
      })}
    >
      <Drawer.Screen name="a" options={{ title: "" }} component={TabNavigator} />
      <Drawer.Screen name="Check-out" component={CheckOutScreen} />
      <Drawer.Screen name="Nueva reserva" component={NewReserveScreen} />
      <Drawer.Screen name="Servicios confort" component={ComfortServiceScreen} />
      <Drawer.Screen name="Incidencias" component={ProfileScreen} />
      <Drawer.Screen name="Otros servicios" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          let iconName;
    
          if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Transport') {
            iconName = 'bus';
          } else if (route.name === 'Cafeteria') {
            iconName = 'food';
          } else {
            iconName = 'star';
          }
    
          return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        },
        tabBarActiveBackgroundColor: "#1d2b42",
        tabBarActiveTintColor: "white",

        tabBarInactiveTintColor: "#1d2b42",
        tabBarInactiveBackgroundColor: "white"
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen name="Transport" component={TransportScreen} />
      <Tab.Screen name="Cafeteria" component={CafeteriaScreen} />
      <Tab.Screen name="Premium" component={PremiumScreen} />
    </Tab.Navigator>
  );
}

export default App;
