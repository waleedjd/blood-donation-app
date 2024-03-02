import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './onboarding';
import Login from './login';
import Register from './register';
import Verification from './verification';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Success from './success';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        animation: 'simple_push',
        headerShown: false,
      }}
      initialRouteName={'Onboarding'}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default AuthStack;
