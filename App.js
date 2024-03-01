import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabBar from './components/TabBar'
import HomePage from './screens/HomePage'
import Admin from './screens/Admin'
import Coffre from './screens/Coffre'

export default function App() {

   const Stack = createNativeStackNavigator()

    return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={HomePage} screenOptions={{headerShown: false}}>
              <Stack.Screen name="TabBar" component={TabBar}/>
              <Stack.Screen name="HomePage" component={HomePage}/>
              <Stack.Screen name="Admin" component={Admin}/>
              <Stack.Screen name="Coffre" component={Coffre}/>
            </Stack.Navigator>
          </NavigationContainer>
  )
}