import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterExtraScreen from '../screens/RegisterExtraScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityFeedScreen from '../screens/ActivityFeedScreen';
import ActivityScreen from '../screens/ActivityScreen'; // Importar correctamente
import ActivityMap from '../screens/ActivityMap'; // Importar correctamente
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackActivity = createStackNavigator();

const ActivityStack = () => {
  return (
    <StackActivity.Navigator initialRouteName='Eventos'>
      <StackActivity.Screen name='Eventos' component={ActivityFeedScreen} />
      <StackActivity.Screen name='Evento' component={ActivityScreen} />
      <StackActivity.Screen name='Mapa' component={ActivityMap} />
    </StackActivity.Navigator>
  );
};

const NavigationTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Eventos'>
      <Tab.Screen 
        name='ActivityStack' 
        component={ActivityStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name='grid-outline' 
              size={size} 
              color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="HomeScreen">
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="Register" component={RegisterScreen} />
      <AppStack.Screen name="RegisterExtra" component={RegisterExtraScreen} />
      <AppStack.Screen 
        name="NavigationTabs" 
        component={NavigationTabs} 
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppNavigator">
        <Stack.Screen 
          name="AppNavigator" 
          component={AppNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
