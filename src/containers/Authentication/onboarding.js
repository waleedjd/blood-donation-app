import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import AppBackground from '../../components/AppBackground';
import Images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import {Colors, NavService} from '../../config';

const {width, height} = Dimensions.get('window');

const Onboarding = () => {
  return (
    <AppBackground showHeader={false}>
      <View
        style={{
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={Images.logoLarge}
          style={{
            width: width / 2,
            height: width / 2,
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            height: 170,
            marginTop: 40,
            justifyContent: 'space-between',
          }}>
          <CustomButton
            title={'LOG IN'}
            textStyle={{color: Colors.primary}}
            onPress={() => NavService.navigate('Login')}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: Colors.primary,
            }}
          />
          <CustomButton
            title={'REGISTER'}
            onPress={() => NavService.navigate('Register')}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Onboarding;
