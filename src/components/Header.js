import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icons from '../assets/Icons';
import {Colors, NavService} from '../config';

export function Header({title, back = true}) {
  return (
    <View
      style={{
        marginTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
        height: 45,
      }}>
      {title?.length && (
        <View style={{position: 'absolute', left: 0, right: 0}}>
          <Text
            style={{
              color: Colors.text,
              fontSize: 22,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      )}

      {back && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={NavService.goBack}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.lightGrey,
            borderRadius: 5,
          }}>
          <Image
            source={Icons.back}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: Colors.text,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Header;
