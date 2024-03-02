import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import AppBackground from '../../components/AppBackground';
import {Colors, NavService, Shadows} from '../../config';
import moment from 'moment';
import Icons from '../../assets/Icons';
import cities from '../../config/Utils/cities';
import TextWithActionSheet from '../../components/TextWithActionSheet';
import {getDonationRequests} from '../../redux/apis';
import {useSelector} from 'react-redux';

const DonationRequests = ({navigation}) => {
  const userData = useSelector(state => state.user.userData);

  const [city, setCity] = React.useState('');
  const [requests, setRequests] = React.useState([]);
  const [filteredRequests, setFilteredRequests] = React.useState([]);
  const [isApply, setIsApply] = React.useState(false);

  const getData = async () => {
    const data = await getDonationRequests(userData?.phone);
    setRequests(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);

  const onApply = async () => {
    const newData = requests.filter(item => item.city === city);
    setIsApply(true);
    setFilteredRequests(newData);
  };

  const onClear = () => {
    setCity('');
    setIsApply(false);
    setFilteredRequests([]);
  };

  return (
    <AppBackground title={'Donation Requests'}>
      {/* <TextWithActionSheet
        icon={Icons.bloodDrop}
        placeholder="Blood Group"
        value={bloodGroup}
        onSelect={text => setBloodGroup(text)}
        dataset={bloodGroups}
      /> */}
      <TextWithActionSheet
        icon={Icons.pin}
        placeholder="City"
        value={city}
        onSelect={text => setCity(text)}
        dataset={cities}
      />
      <View
        style={{
          height: 50,
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          disabled={
            // bloodGroup === '' &&
            city === ''
          }
          activeOpacity={0.8}
          style={{
            height: 40,
            width: '48%',
            borderRadius: 50,
            backgroundColor:
              // bloodGroup === '' &&
              city === '' ? Colors.darkGrey : Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onClear}>
          <Text style={{color: Colors.white, fontSize: 16, fontWeight: '500'}}>
            Clear
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={city === ''}
          activeOpacity={0.8}
          style={{
            height: 40,
            width: '48%',
            borderRadius: 50,
            backgroundColor: city === '' ? Colors.darkGrey : Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onApply}>
          <Text style={{color: Colors.white, fontSize: 16, fontWeight: '500'}}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 5,
        }}
        data={isApply ? filteredRequests : requests}
        renderItem={props => <DonorDetails {...props} />}
        ListEmptyComponent={() => {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                }}>
                No Requests Found
              </Text>
            </View>
          );
        }}
      />
    </AppBackground>
  );
};

export default DonationRequests;

const DonorDetails = ({item}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      activeOpacity={0.8}
      style={{
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        ...Shadows.shadow5,
      }}>
      <Modal visible={modalVisible} transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              paddingVertical: 20,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, fontWeight: '500', color: Colors.text}}>
              {item?.name}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                source={Icons.pin}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                  marginLeft: 5,
                }}>
                {item?.hospital}, {item?.city}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`tel:${'+923123456789'}`)}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                source={Icons.phone}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                  marginLeft: 5,
                }}>
                {item?.phone}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                  marginLeft: 5,
                  textAlign: 'center',
                }}>
                {item?.note}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: Colors.darkGrey,
                marginTop: 25,
              }}>
              Blood Type -{' '}
              <Text style={{color: Colors.primary}}>{item?.bloodGroup}</Text>
            </Text>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setTimeout(() => {
                  NavService.navigate('ChatStack', {
                    screen: 'Chat',
                  });
                }, 100);
              }}
              activeOpacity={0.8}
              style={{
                marginTop: 25,
                width: '80%',
                backgroundColor: Colors.primary,
                paddingVertical: 15,
                borderRadius: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
                Chat Now
              </Text>
            </TouchableOpacity> */}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <View>
        <View>
          <Text style={{fontSize: 14, marginTop: 5, color: Colors.darkGrey}}>
            Name
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: Colors.text,
              fontWeight: '500',
            }}>
            {item?.name}
          </Text>
          <Text style={{fontSize: 14, marginTop: 5, color: Colors.darkGrey}}>
            Location
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 5,
              color: Colors.text,
              fontWeight: '500',
            }}>
            {item?.hospital}, {item?.city}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            marginTop: 15,
            color: Colors.darkGrey,
            fontWeight: '500',
          }}>
          {moment(item?.date).fromNow()}
        </Text>
      </View>
      <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
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
            {item?.bloodGroup}
          </Text>
        </ImageBackground>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: Colors.primary,
          }}>
          Donate
        </Text>
      </View>
    </TouchableOpacity>
  );
};
