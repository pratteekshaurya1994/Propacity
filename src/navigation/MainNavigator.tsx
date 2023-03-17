import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigateTo} from '../constants';
import StartupScreen from '../screens/StartupScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName={NavigateTo.StartupScreen}>
      <MainStack.Screen
        name={NavigateTo.StartupScreen}
        component={StartupScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name={NavigateTo.DashboardScreen}
        component={DashboardScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
