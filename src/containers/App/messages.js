import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../components/AppBackground';
import {Colors, NavService, Shadows} from '../../config';
import {getChats} from '../../redux/apis';
import {useSelector} from 'react-redux';
import Icons from '../../assets/Icons';

const Messages = ({navigation}) => {
  const myUid = useSelector(state => state.user.userData?.phone);

  const [messages, setMessages] = useState([]);

  const getData = async () => {
    const data = await getChats(myUid);
    setMessages(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);

  return (
    <AppBackground title={'Chat'}>
      <View style={{flex: 1, paddingTop: 5}}>
        {messages.map((item, index) => (
          <Message item={item} />
        ))}
      </View>
    </AppBackground>
  );
};

export default Messages;

const Message = ({item}) => {
  const myUid = useSelector(state => state.user.userData?.phone);
  const otherUser =
    item.users.receiver.phone === myUid
      ? item.users.sender
      : item.users.receiver;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => NavService.navigate('Chat', {chatroomId: item.id})}
      style={{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        ...Shadows.shadow5,
      }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: 'space-between',
          height: 40,
        }}>
        <Text style={{fontSize: 17, color: Colors.text}}>{otherUser.name}</Text>
        <Text style={{fontSize: 12, color: Colors.darkGrey}}>
          {otherUser.city}
        </Text>
      </View>
      <ImageBackground
        source={Icons.bloodGroup}
        imageStyle={{
          width: 40 / 1.5,
          height: 60 / 1.5,
          resizeMode: 'contain',
        }}
        style={{
          width: 40 / 1.5,
          height: 60 / 1.5,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 10 / 1.5,
        }}>
        <Text
          style={{
            fontSize: 18 / 1.5,
            fontWeight: '500',
            color: Colors.white,
          }}>
          {otherUser?.bloodGroup}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
