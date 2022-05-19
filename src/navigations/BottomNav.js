import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Map from '../screens/Map';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen'
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const BottomNav = () => {

    const ACTIVE = '#8a2be2'
    const INACTIVE = '#dcdcdc'

    return (
        <Tab.Navigator
            initialRouteName='Map'
            screenOptions={{
                tabBarActiveTintColor: '#8a2be2',
                tabBarInactiveTintColor: '#dcdcdc',
                headerShown: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 15,
                    marginHorizontal: 10,
                    height: 60,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 20,
                }
            }}
        >
            <Tab.Screen
                name='Map'
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign name="home" size={24} color={focused ? ACTIVE : INACTIVE} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='Employee'
                component={EmployeeDetailScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign name="user" size={24} color={focused ? ACTIVE : INACTIVE} />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNav

const styles = StyleSheet.create({})