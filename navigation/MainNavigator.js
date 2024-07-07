import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterExtraScreen from '../screens/RegisterExtraScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityFeedScreen from '../screens/ActivityFeedScreen';
import ActivityScreen from '../screens/ActivityScreen'; 
import ActivityMap from '../screens/ActivityMap'; 
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ProfileScreen } from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen'; 
import CreateActivityScreen from '../screens/CreateActivityScreen';
import SucursalesFeedScreen from '../screens/SucursalesFeedScreen';
import MyPetsFeedScreen from '../screens/MyPetsFeedScreen';
import { PetFeedScreen } from '../screens/PetFeedScreen';
import { PetScreen } from '../screens/PetScreen';
import { CreatePetScreen } from '../screens/CreatePetScreen';
import { MySubscriptionsFeedScreen } from '../screens/MySubscriptionsFeedScreen';
import SubscriptorsFeedScreen from '../screens/SubscriptorsFeedScreen';
import {MyPetsCompanyScreen} from '../screens/MyPetsCompanyScreen'
import { ChangeProfilePhotoScreen } from '../screens/ChangeProfilePhotoScreen';
import { AddCompanyLocationScreen } from '../screens/AddCompanyLocationScreen';
import { PublicCompanyProfileScreen } from '../screens/PublicCompanyProfileScreen';
import { ChangeBannerScreen } from '../screens/ChangeBannerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackActivity = createStackNavigator();
const StackProfile = createStackNavigator();
const StackPet = createStackNavigator();

const ActivityStack = () => {
  return (
    <StackActivity.Navigator initialRouteName='Eventos'>
      <StackActivity.Screen name='Eventos' component={ActivityFeedScreen} />
      <StackActivity.Screen name='Evento' component={ActivityScreen} />
      <StackActivity.Screen name='Mapa' component={ActivityMap} />
      <StackActivity.Screen name='CreateActivity' component={CreateActivityScreen} />
    </StackActivity.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <StackProfile.Navigator initialRouteName='Profile'>
      <StackProfile.Screen name='Profile' component={ProfileScreen} />
      <StackProfile.Screen name='EditProfile' component={EditProfileScreen} /> 
      <StackProfile.Screen name='SucursalesFeedScreen' component={SucursalesFeedScreen} />
      <StackProfile.Screen name='SubscriptorsFeedScreen' component={SubscriptorsFeedScreen} />
      <StackProfile.Screen name='MyPetsFeedScreen' component={MyPetsFeedScreen} />
      <StackProfile.Screen name='MySubscriptionsFeedScreen' component={MySubscriptionsFeedScreen} />
      <StackProfile.Screen name='MyPetsCompanyScreen' component={MyPetsCompanyScreen} />
      <StackProfile.Screen name='ChangeProfilePhoto' component={ChangeProfilePhotoScreen} />
      <StackProfile.Screen name='AddCompanyLocation' component={AddCompanyLocationScreen} />
      <StackProfile.Screen name='ChangeBanner' component={ChangeBannerScreen} />
    </StackProfile.Navigator>
  )
}

const PetStack = () => {
  return (
    <StackPet.Navigator initialRouteName='PetFeed'>
      <StackPet.Screen name='PetFeed' component={PetFeedScreen} />
      <StackPet.Screen name='Pet' component={PetScreen} />
      <StackPet.Screen name='CreatePet' component={CreatePetScreen} />
    </StackPet.Navigator>
  )
}

const NavigationTabs = () => {
  return (
    <Tab.Navigator 
      initialRouteName='Eventos'
      screenOptions={{
        tabBarActiveTintColor:'#00CED1',
        tabBarInactiveTintColor:'#808080'
      }}
      >
      <Tab.Screen 
        name='ActivityStack' 
        component={ActivityStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name='grid-outline' 
              size={size} 
              color={color}
              style={{marginBottom:-10}} />
          ),
          tabBarLabel:''
        }} 
      />
      <Tab.Screen
        name='PetStack'
        component={PetStack}
        options= {{
          headerShown: false,
          tabBarIcon:({color, size}) => (
            <Ionicons 
            name="paw-outline" 
            size={size} 
            color={color} 
            style={{marginBottom:-10}}/>
          ),
          tabBarLabel:''
        }} />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign 
            name="user" 
            size={size} 
            color={color} 
            style={{marginBottom:-10}}/>
          ),
          tabBarLabel:''
        }} />
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
      <AppStack.Screen name="PublicCompanyProfile" component={PublicCompanyProfileScreen} />
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
