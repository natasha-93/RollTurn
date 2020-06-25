import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import React from 'react';
import {Color} from './models/color';
import HomeScreen from './HomeScreen';
import Sidebar from './Sidebar';
import {PlayerProvider} from './context/player';
import {SettingsProvider} from './context/settings';

export type Player = {
  name: string;
  color: Color;
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PlayerProvider>
        <SettingsProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <Icon name="home" type="ionicons" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Sidebar}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color, size}) => (
                  <Icon
                    name="settings"
                    type="ionicons"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </SettingsProvider>
      </PlayerProvider>
    </NavigationContainer>
  );
}
