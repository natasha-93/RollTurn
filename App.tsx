import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Color} from './models/color';
import HomeScreen from './HomeScreen';
import Sidebar from './Sidebar';
import {PlayerProvider} from './context/player';

export type Player = {
  name: string;
  color: Color;
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PlayerProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={Sidebar} />
        </Tab.Navigator>
      </PlayerProvider>
    </NavigationContainer>
  );
}
