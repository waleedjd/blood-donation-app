import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
import Logo from '../../components/Logo';
import CustomTextInput from '../../components/CustomTextInput';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import {Colors, NavService} from '../../config';
import {login} from '../../redux/apis';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 40}}>
        <Logo />
        <View style={{flex: 1, marginTop: 40, justifyContent: 'space-between'}}>
          <View>
            <CustomTextInput
              icon={Icons.phone}
              placeholder="Phone Number"
              value={phone}
              onChangeText={text => setPhone(text)}
              keyboardType="phone-pad"
              maxLength={13}
            />
            <CustomTextInput
              icon={Icons.lock}
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              isPassword
            />
            <CustomButton
              title={'LOG IN'}
              onPress={() => login(phone, password)}
              buttonStyle={{marginTop: 60}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.navigate('ForgotPassword')}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 18,
                  color: Colors.primary,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity disabled>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: Colors.darkGrey,
                }}>
                Don't have an account?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: Colors.primary,
                  marginLeft: 5,
                }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

export default Login;
