import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, NavService, Shadows} from '../../config';
import moment from 'moment';
import Icons from '../../assets/Icons';
import {useSelector} from 'react-redux';
import AppBackground from '../../components/AppBackground';
import {deleteRequest, getMyRequests} from '../../redux/apis';

const MyRequests = () => {
  const userData = useSelector(state => state.user.userData);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const data = await getMyRequests(userData?.phone);
    setRequests(data);
    setLoading(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const Requests = ({item}) => {
    return (
      <View
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
          ...Shadows.shadow5,
        }}>
        <View>
          <View>
            <Text style={{fontSize: 14, marginTop: 5, color: Colors.darkGrey}}>
              Hospital
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                color: Colors.text,
                fontWeight: '500',
              }}>
              {item?.hospital}
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
              {item?.city}
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
          <TouchableOpacity
            onPress={async () => {
              await deleteRequest(item?.id);
              getData();
            }}
            activeOpacity={0.8}>
            <Text
              style={{fontSize: 14, color: Colors.primary, fontWeight: '500'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <AppBackground title={'My Requests'}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 5}}>
        {requests?.length
          ? requests.map((item, index) => {
              return <Requests key={index} item={item} />;
            })
          : loading && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: Colors.darkGrey,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                No requests found
              </Text>
            )}
      </View>
    </AppBackground>
  );
};

export default MyRequests;
