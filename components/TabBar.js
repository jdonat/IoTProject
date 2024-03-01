import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import HomePage from './screens/HomePage'
import Admin from './screens/Admin'
import Coffre from './screens/Coffre'

const Tab = createBottomTabNavigator();

export default function TabBar() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'darksalmon', },
        tabBarLabelStyle: {fontSize: 14,},
        tabBarInactiveBackgroundColor: 'lightsalmon',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'darkslategrey',
      }}
      initialRouteName='HomePage'
    >
      <Tab.Screen name="HomePage" component={HomePage} options={{ tabBarLabel: 'Home', 
      headerShown: false, 
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
        ), 
      }}/>
      <Tab.Screen name="Admin" component={Favorites} options={{ tabBarLabel: 'Admin', headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="admin-panel-settings" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Coffre" component={Search} options={{ tabBarLabel: 'Coffre', headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="safe-square" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}