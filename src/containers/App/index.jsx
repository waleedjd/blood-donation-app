import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarComp from '../../config/Helpers/TabBarComp';

//Screens
import Home from './home';
import DonationRequests from './donationRequests';
import Messages from './messages';
import Chat from './chat';
import Profile from './profile';
import EditProfile from './editProfile';
import FindDonors from './findDonors';
import RequestBlood from './requestBlood';
import MyRequests from './myRequests';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Extra Stacks
const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName={'Messages'}>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
      <Stack.Screen name="RequestBlood" component={RequestBlood} />
      <Stack.Screen name="MyRequests" component={MyRequests} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{animation: 'simple_push', headerShown: false}}
      tabBar={props => <TabBarComp {...props} />}
      initialRouteName={'HomeScreen'}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="SearchStack" component={HomeStack} />
      <Tab.Screen name="DonationRequests" component={DonationRequests} />
      <Tab.Screen name="FindDonors" component={FindDonors} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppStack;
