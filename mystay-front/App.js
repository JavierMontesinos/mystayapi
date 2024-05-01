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
  let userToken = null;
  let userId = null;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userId: action.id,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.id,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userId = await SecureStore.getItemAsync('userId');
        console.log(userId)
      } catch (e) {
        console.error("Can't restore token: ", e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, id: userId });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (postData) => {
        try {
          const response = await axios.post('http://192.168.1.139:8443/login', postData);

          let data = response.data;

          await SecureStore.setItemAsync('userToken', data.token);
          await SecureStore.setItemAsync('userId', data.id.toString());

          userToken = data.token;
          userId = data.id.toString();

          dispatch({ type: 'SIGN_IN', token: data.token, id: data.id.toString() });
        } catch (error) {
          console.log('Error:', error.message);
          alert(error.response.data);
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userId');
        userToken = null;
        userId = null;
        dispatch({ type: 'SIGN_OUT' });
      },
      getUserToken: () => {
        return userToken;        
      },
      getUserId: () => {
        return userId;
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
          {(state.userToken == null && state.userId == null) ? (
          
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