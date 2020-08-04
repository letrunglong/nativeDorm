import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, TabActions, StackActions } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Components/Screens/HomeScreens';
import LoginScreen from './Components/Screens/LoginScreen';
import DetailRooms from './Components/Screens/DetailRooms';
import ManageScreen from './Components/Screens/ManageScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Taolao from './Components/Screens/TaoLaoScreens';


// const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        
        <NavigationContainer>
          <Tab.Navigator
           activeColor="#f0edf6"
           inactiveColor="#3e2465"
           barStyle={{ backgroundColor: '#2196F3' }}>
              <Tab.Screen name = "Home" options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Entypo name="home" size={20} color="black" />
          ),
        }} component = {HomeScreen}>
        </Tab.Screen>
              <Tab.Screen name = "Manage" options = {{tabBarLabel: 'Manage', tabBarIcon:() =>(<MaterialIcons name="account-balance" size={20} color="black" />)}} component = {ManageScreen}/>
              <Tab.Screen name = "Login" options = {{tabBarLabel: 'Account', tabBarVisible: false,tabBarIcon:() =>(<MaterialIcons name="account-circle" size={20} color="black" />)}} component = {LoginScreen}/>
              <Tab.Screen name = "Details" options={{
visible: false , tabBarLabel: 'Details' , tabBarIcon:() =>(<MaterialIcons name="account-balance" size={20} color="black" />)
}}  component = {DetailRooms}/>
          </Tab.Navigator>
          
        </NavigationContainer>
    );
  }
