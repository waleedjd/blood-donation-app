import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../Colors';

const {width, height} = Dimensions.get('screen');

const LoadingIndicator = ({color}) => {
  const loader = useSelector(state => state?.loader || false);
  if (!loader) return null;
  return (
    <View
      style={{
        zIndex: 99,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={color?.length ? color : Colors.primary}
        />
      </View>
    </View>
  );
};

export default LoadingIndicator;
