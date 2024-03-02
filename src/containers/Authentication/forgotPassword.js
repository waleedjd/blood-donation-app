import {View} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
import Logo from '../../components/Logo';
import CustomTextInput from '../../components/CustomTextInput';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import {forgotPassword} from '../../redux/apis';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 40}}>
        <Logo />
        <View style={{flex: 1, marginTop: 40}}>
          <CustomTextInput
            icon={Icons.phone}
            placeholder="Phone Number"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="phone-pad"
            maxLength={13}
          />

          <CustomButton
            title={'SEND OTP'}
            onPress={() => forgotPassword(phone)}
            buttonStyle={{marginTop: 60}}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default ForgotPassword;
