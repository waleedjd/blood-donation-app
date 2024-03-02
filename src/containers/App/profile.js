import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import AppBackground from '../../components/AppBackground';
import {Colors, NavService, Shadows} from '../../config';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';
import {saveIsDonor} from '../../redux/actions';
import {changeAvailability, deleteUser, logout} from '../../redux/apis';

const Profile = () => {
  const userData = useSelector(state => state.user.userData);
  const isDonor = useSelector(state => state.user.isDonor);
  return (
    <AppBackground title={'Profile'}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
              color: Colors.text,
            }}>
            {userData.name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              source={Icons.pin}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: Colors.darkGrey,
                marginLeft: 5,
                textAlign: 'center',
              }}>
              {userData.address}, {userData.city}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
              color: Colors.text,
              marginTop: 35,
            }}>
            {userData.bloodGroup}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.darkGrey,
              marginTop: 5,
            }}>
            Blood Type
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 55,
              width: '100%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              ...Shadows.shadow5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Icons.user}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                }}>
                Donor Mode
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                LayoutAnimation.linear();
                saveIsDonor(!isDonor);
              }}
              style={{
                width: 45,
                height: 20,
                backgroundColor: isDonor ? Colors.primary : Colors.darkGrey,
                borderRadius: 10,
                padding: 2.5,
                alignItems: isDonor ? 'flex-end' : 'flex-start',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  backgroundColor: Colors.white,
                }}
              />
            </TouchableOpacity>
          </View>
          {isDonor && (
            <View
              style={{
                height: 55,
                width: '100%',
                backgroundColor: Colors.white,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop: 20,
                ...Shadows.shadow5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.calendar}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '500',
                    color: Colors.darkGrey,
                  }}>
                  Available for donate
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={async () => {
                  changeAvailability(userData);
                }}
                style={{
                  width: 45,
                  height: 20,
                  backgroundColor: userData?.isAvailableToDonate
                    ? Colors.primary
                    : Colors.darkGrey,
                  borderRadius: 10,
                  padding: 2.5,
                  alignItems: userData?.isAvailableToDonate
                    ? 'flex-end'
                    : 'flex-start',
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => logout()}
            activeOpacity={0.8}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 20,
              ...Shadows.shadow5,
            }}>
            <Image
              source={Icons.logout}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '500',
                color: Colors.darkGrey,
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title={'Edit Profile'}
          onPress={() => NavService.navigate('EditProfile')}
        />
        <CustomButton
          title={'Delete Profile'}
          onPress={() =>
            Alert.alert(
              'Delete Profile',
              'Are you sure you want to delete your profile?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => deleteUser(userData?.phone)},
              ],
            )
          }
        />
      </View>
    </AppBackground>
  );
};

export default Profile;
