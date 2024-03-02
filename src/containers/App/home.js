import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../components/AppBackground';
import {Colors, NavService, Shadows} from '../../config';
import Icons from '../../assets/Icons';
import {useSelector} from 'react-redux';
import {deleteRequest, getMyRequests} from '../../redux/apis';
import moment from 'moment';

const Home = () => {
  const isDonor = useSelector(state => state.user.isDonor);

  return (
    <AppBackground title={'Dashboard'} back={false}>
      {isDonor ? <Donor /> : <Seeker />}
    </AppBackground>
  );
};

export default Home;

const Donor = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <HomeBox
            icon={Icons.drip}
            title={'Donation Requests'}
            onPress={() => NavService.navigate('DonationRequests')}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <HomeBox
            icon={Icons.doctor}
            title={'Chat'}
            onPress={() => NavService.navigate('ChatStack')}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 25,
          alignItems: 'center',
        }}>
        <HomeBox
          icon={Icons.bloodBag}
          title={'Edit Profile'}
          onPress={() =>
            NavService.navigate('ProfileStack', {screen: 'EditProfile'})
          }
        />
      </View>
    </View>
  );
};

const Seeker = () => {
  const userData = useSelector(state => state.user.userData);

  const [ShowModal, setShowModal] = useState(false);
  const [request, setRequest] = useState(null);

  const getData = async () => {
    const data = await getMyRequests(userData?.phone);
    if (data.length > 0) {
      setRequest(data[0]);
      setShowModal(true);
    }
  };

  const deleteRequestHandler = async id => {
    setShowModal(false);
    await deleteRequest(id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Modal visible={ShowModal} transparent style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowModal(false);
          }}
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <View style={{backgroundColor: Colors.primary, padding: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.white,
                }}>
                Request Details
              </Text>
            </View>
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: Colors.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: Colors.darkGrey,
                    }}>
                    Hospital
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: Colors.text,
                      fontWeight: '500',
                    }}>
                    {request?.hospital}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: Colors.darkGrey,
                    }}>
                    Location
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 5,
                      color: Colors.text,
                      fontWeight: '500',
                    }}>
                    {request?.city}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 15,
                    color: Colors.darkGrey,
                    fontWeight: '500',
                  }}>
                  {moment(request?.date).fromNow()}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <ImageBackground
                  source={Icons.bloodGroup}
                  imageStyle={{
                    width: 40,
                    height: 60,
                    resizeMode: 'contain',
                  }}
                  style={{
                    width: 40,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      color: Colors.white,
                    }}>
                    {request?.bloodGroup}
                  </Text>
                </ImageBackground>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                paddingHorizontal: 15,
                paddingBottom: 15,
              }}>
              Have you received the blood? If yes, Do you want to delete this
              request?
            </Text>
            <View style={{flexDirection: 'row', height: 50}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.grey,
                }}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.red,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  NO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  deleteRequestHandler(request?.id);
                }}
                style={{
                  flex: 1,
                  backgroundColor: Colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.white,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  YES
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <HomeBox
            icon={Icons.drip}
            title={'Find Donors'}
            onPress={() => NavService.navigate('FindDonors')}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <HomeBox
            icon={Icons.doctor}
            title={'Chat'}
            onPress={() => NavService.navigate('ChatStack')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}>
          <HomeBox
            icon={Icons.bloodBag}
            title={'Request Blood'}
            onPress={() => NavService.navigate('RequestBlood')}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 25,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <HomeBox
            icon={Icons.user}
            title={'Edit Profile'}
            onPress={() =>
              NavService.navigate('ProfileStack', {screen: 'EditProfile'})
            }
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 25,
          alignItems: 'center',
        }}>
        <HomeBox
          icon={Icons.bloodBag}
          title={'My Requests'}
          onPress={() => NavService.navigate('MyRequests')}
        />
      </View>
    </View>
  );
};

const HomeBox = ({icon, title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: Colors.white,
        height: 120,
        width: 120,
        borderRadius: 10,
        padding: 15,
        ...Shadows.shadow5,
      }}>
      <Image
        source={icon}
        style={{
          height: 50,
          width: 90,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          color: Colors.darkGrey,
          width: 90,
          fontSize: 15,
          fontWeight: '500',
          textAlign: 'center',
          marginTop: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
