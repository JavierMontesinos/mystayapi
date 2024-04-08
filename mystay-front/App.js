import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import LoginScreen from './screens/LoginScreen';

import AuthContext from './utils/AuthProvider';
import DrawerNav from './components/DrawerNav';
import axios from 'axios';


const Stack = createNativeStackNavigator();

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
      signIn: async (postData) => {
        try {
          console.log(postData)
          const response = await axios.post('http://192.168.1.141:3000/login', postData);

          // Save the authToken to SecureStore
          let authToken = response.data.authToken
          await SecureStore.setItemAsync('userToken', authToken);
          dispatch({ type: 'SIGN_IN', token: authToken });

          console.log('Auth token:', authToken);
      } catch (error) {
        alert(error.response.data.message)
        console.error('Error:', error.message);
      }

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
              <Stack.Screen name="Dnav" component={DrawerNav} />
          )}
        </Stack.Navigator>  
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;