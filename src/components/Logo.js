import React from 'react';
import {Image} from 'react-native';
import Images from '../assets/Images';

export default ({size = 170}) => {
  return (
    <Image
      source={Images.logoSmall}
      style={{height: size, width: size}}
      resizeMode="contain"
    />
  );
};
