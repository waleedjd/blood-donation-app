import React from 'react';
import {View, Image, TouchableOpacity, Keyboard} from 'react-native';
import Colors from '../Colors';
import Icons from '../../assets/Icons';
import NavService from './NavService';
import Shadows from './Shadows';
import {useSelector} from 'react-redux';

const DonorRoutes = [
  {id: 0, name: 'HomeStack', icon: Icons.home},
  {id: 2, name: 'DonationRequests', icon: Icons.request},
  {id: 4, name: 'ProfileStack', icon: Icons.user},
];

const SeekerRoutes = [
  {id: 0, name: 'HomeStack', icon: Icons.home},
  {id: 3, name: 'FindDonors', icon: Icons.request},
  {id: 4, name: 'ProfileStack', icon: Icons.user},
];

const TabBarComp = ({state}) => {
  const isDonor = useSelector(state => state.user.isDonor);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (keyboardOpen) return null;

  const renderItem = (route, index) => {
    const isFocused = state.index === route.id;
    const onPress = () => NavService.navigate(route?.name);

    return (
      <TouchableOpacity
        key={index}
        disabled={isFocused}
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flex: 1,
          paddingVertical: 15,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          source={route.icon}
          style={{
            height: 25,
            width: 25,
            tintColor: isFocused ? Colors.primary : Colors.darkGrey,
          }}
          resizeMode="contain"
        />

        {/* {isFocused ? (
      <View
        style={{
          height: 6,
          width: 6,
          borderRadius: 6,
          backgroundColor: Colors.primary,
          position: 'absolute',
          bottom: 5,
        }}
      />
    ) : null} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{paddingTop: 5}}>
      <View
        style={{
          backgroundColor: Colors.white,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingBottom: 10,
          ...Shadows.shadow5,
        }}>
        {isDonor ? DonorRoutes.map(renderItem) : SeekerRoutes.map(renderItem)}
      </View>
    </View>
  );
};
export default TabBarComp;
