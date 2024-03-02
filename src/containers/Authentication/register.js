import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
import Logo from '../../components/Logo';
import CustomTextInput from '../../components/CustomTextInput';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import {Colors, NavService} from '../../config';
import {register} from '../../redux/apis';
import TextWithActionSheet from '../../components/TextWithActionSheet';
import bloodGroups from '../../config/Utils/bloodGroups';
import cities from '../../config/Utils/cities';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>
        <Logo />
        <View style={{flex: 1, marginTop: 10, justifyContent: 'space-between'}}>
          <View>
            <CustomTextInput
              icon={Icons.user}
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
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
            <CustomTextInput
              icon={Icons.lock}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              isPassword
            />
            <TextWithActionSheet
              icon={Icons.bloodDrop}
              placeholder="Blood Group"
              value={bloodGroup}
              onSelect={text => setBloodGroup(text)}
              dataset={bloodGroups}
            />
            <TextWithActionSheet
              icon={Icons.pin}
              placeholder="City"
              value={city}
              onSelect={text => setCity(text)}
              dataset={cities}
            />
            <CustomTextInput
              icon={Icons.pin}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <CustomButton
              title={'REGISTER'}
              onPress={() =>
                register(
                  name,
                  phone,
                  password,
                  confirmPassword,
                  bloodGroup,
                  city,
                  address,
                )
              }
            />
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
                Already have an account?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.navigate('Login')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: Colors.primary,
                  marginLeft: 5,
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

export default Register;
