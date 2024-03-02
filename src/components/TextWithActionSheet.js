import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../config';
import Icons from '../assets/Icons';
import ActionSheet from 'react-native-actions-sheet';

const {width} = Dimensions.get('window');

export default function TextWithActionSheet({
  placeholder = '',
  value = '',
  dataset = [],
  onSelect = () => {},
  containerStyle = {},
  textStyle = {},
  iconStyle = {},
  icon = null,
  rightIconStyle = {},
  disabled = false,
}) {
  const ref = React.useRef(null);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <ActionSheet ref={ref} containerStyle={{backgroundColor: 'transparent'}}>
        <View style={{padding: 10, paddingBottom: 20}}>
          <View
            style={{
              backgroundColor: 'rgba(241,241,241,0.9)',
              borderRadius: 10,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
            {placeholder?.length && (
              <View
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: '#ccc',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: 'rgb(0,88,200)',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  {placeholder}
                </Text>
              </View>
            )}
            <ScrollView
              bounces={false}
              style={{maxHeight: 200}}
              showsVerticalScrollIndicator={false}>
              {dataset?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      ref.current.hide();
                      onSelect(item);
                    }}
                    style={{
                      paddingVertical: 12,
                      alignItems: 'center',
                      borderBottomWidth: index == dataset.length - 1 ? 0 : 1.5,
                      borderBottomColor: '#ccc',
                    }}>
                    <Text
                      style={{color: '#000', fontSize: 16}}
                      numberOfLines={1}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => ref.current.hide()}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'rgb(0,88,200)',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={() => ref.current.show()}
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
          borderColor: Colors.lightGrey,
          marginTop: 15,
          ...containerStyle,
        }}>
        {icon && (
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
              source={icon}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
                tintColor: Colors.primary,
                ...iconStyle,
              }}
            />
          </View>
        )}

        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: value?.length ? Colors.text : Colors.darkGrey,
            ...textStyle,
          }}>
          {value?.length ? value : placeholder}
        </Text>

        <Image
          source={Icons.dropDown}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: Colors.primary,
            ...rightIconStyle,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
