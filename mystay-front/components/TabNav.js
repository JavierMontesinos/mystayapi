
import ProfileScreen from '../screens/ProfileScreen';
import TransportScreen from '../screens/TransportScreen';
import CafeteriaScreen from '../screens/CafeteriaScreen';
import PremiumScreen from '../screens/PremiumScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

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
  
export default TabNavigator;  