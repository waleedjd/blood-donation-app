import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icons from '../assets/Icons';
import {Colors, Fonts} from '../config';
const {width} = Dimensions.get('window');

export default function CustomTextInput(props) {
  const [showText, setShowText] = useState(
    props?.isPassword == true ? true : false,
  );
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        width: width - 40,
        height: 55,
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: 15,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: isFocused ? Colors.primary : Colors.lightGrey,
        marginTop: 15,
        ...props.containerStyle,
      }}>
      {props.icon && (
        <View
          style={{
            paddingRight: 15,
            borderRightWidth: 1,
            borderRightColor: Colors.grey,
            height: '75%',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            alignSelf: 'center',
          }}>
          <Image
            source={props?.icon}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              tintColor: Colors.primary,
              ...props.iconStyle,
            }}
          />
        </View>
      )}
      <TextInput
        style={{
          flex: 1,
          color: Colors.text,
          fontSize: 16,
          ...props.inputStyle,
        }}
        placeholderTextColor={Colors.darkGrey}
        secureTextEntry={showText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {props.rightIcon && (
        <TouchableOpacity
          onPress={props.onRightIconPress}
          activeOpacity={0.8}
          style={{
            marginLeft: 10,
          }}>
          <Image
            source={props.rightIcon}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              tintColor: Colors.border,
              marginLeft: 10,
              ...props.rightIconStyle,
            }}
          />
        </TouchableOpacity>
      )}
      {props.isPassword && (
        <TouchableOpacity
          onPress={() => setShowText(!showText)}
          activeOpacity={0.8}
          style={{
            marginLeft: 10,
          }}>
          <Image
            source={showText ? Icons.eyeHidden : Icons.eyeShown}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              tintColor: Colors.grey,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      )}
      {props.optional && (
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 12,
              color: Colors.darkPink,
              fontFamily: Fonts.tomatoRegular,
            }}>
            (Optional)
          </Text>
        </View>
      )}
    </View>
  );
}
