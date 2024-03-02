import {View} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
import Logo from '../../components/Logo';
import CustomTextInput from '../../components/CustomTextInput';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import {resetPassword} from '../../redux/apis';

const ResetPassword = ({route}) => {
  const {user} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 40}}>
        <Logo />
        <View style={{flex: 1, marginTop: 40}}>
          <CustomTextInput
            icon={Icons.lock}
            placeholder="New Password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            isPassword
          />
          <CustomTextInput
            icon={Icons.lock}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            isPassword
          />
          <CustomButton
            title={'RESET'}
            onPress={() => resetPassword(newPassword, confirmPassword, user)}
            buttonStyle={{marginTop: 60}}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default ResetPassword;
