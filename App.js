import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './shared/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import ShowEmployees from './src/screens/ShowEmployees';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import EmployeeData from './src/screens/EmployeeData';
import 'react-native-gesture-handler';
import BottomNav from './src/navigations/BottomNav';

const Stack = createStackNavigator()

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Signup' component={SignupScreen} />
          <Stack.Screen name='BottomNav' options={{ headerShown: false }} component={BottomNav} />
          <Stack.Screen name='Dashboard' option={{ headerShown: false }} component={EmployeeDetailScreen} />
          <Stack.Screen name='Employee List' options={{ headerShown: true }} component={ShowEmployees} />
          <Stack.Screen name='Employee Detail' option={{ headerShown: false }} component={EmployeeData} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App