import {View, Text, Image} from 'react-native';
import React from 'react';
import AppBackground from '../../components/AppBackground';
import Images from '../../assets/Images';
import CustomButton from '../../components/CustomButton';
import {NavService} from '../../config';
import {saveUser} from '../../redux/actions';

const Success = ({route}) => {
  return (
    <AppBackground showHeader={false}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={Images.success}
          style={{width: '90%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
      <View style={{flex: 0.7}}>
        <CustomButton
          title={'FINISH'}
          onPress={() => {
            saveUser(route.params.user);
            NavService.reset(0, [{name: 'AppStack'}]);
          }}
        />
      </View>
    </AppBackground>
  );
};

export default Success;
