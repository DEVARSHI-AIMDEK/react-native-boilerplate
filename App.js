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

const Stack = createStackNavigator()

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Signup' component={SignupScreen} />
          <Stack.Screen name='Employee' component={EmployeeDetailScreen} />
          <Stack.Screen name='ShowEmp' component={ShowEmployees} />
          <Stack.Screen name="EmpDetails" component={EmployeeData} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App