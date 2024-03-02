import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from '../../assets/Icons';
import {Colors} from '../../config';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {errorToast, getMessage, sendMessages} from '../../redux/apis';
import moment from 'moment';

const Chat = ({route}) => {
  const userData = useSelector(state => state.user.userData);
  const chatroomId = route.params?.chatroomId;

  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState('');

  const sendMessage = async () => {
    if (!textMessage) {
      errorToast('Please enter message');
      return;
    }

    await sendMessages(userData.phone, textMessage, chatroomId);
    setTextMessage('');
  };

  useEffect(() => {
    getMessage(chatroomId, setMessages);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Header title={'Chat'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={props => <SingleChat {...props} />}
        style={{flex: 1, width: '100%', paddingHorizontal: 20}}
        keyExtractor={(_, index) => index.toString()}
        inverted
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: Colors.background,
        }}>
        <CustomTextInput
          placeholder="Type your message"
          rightIcon={Icons.send}
          onRightIconPress={() => sendMessage()}
          value={textMessage}
          onChangeText={text => setTextMessage(text)}
        />
      </View>
    </View>
  );
};

export default Chat;

const SingleChat = ({item}) => {
  const userData = useSelector(state => state.user.userData);
  const sentByMe = item.sentBy === userData.phone;

  return (
    <View
      style={{
        alignItems: sentByMe ? 'flex-end' : 'flex-start',
        marginBottom: 15,
      }}>
      <View
        style={{
          backgroundColor: sentByMe ? Colors.lightGrey : Colors.primary,
          paddingVertical: 15,
          paddingHorizontal: 20,
          maxWidth: '90%',
          borderRadius: 15,
        }}>
        <Text
          style={{
            color: sentByMe ? Colors.text : Colors.white,
            fontSize: 14,
          }}>
          {item.message}
        </Text>
      </View>
      <Text
        style={{
          color: Colors.darkGrey,
          fontSize: 12,
          marginTop: 10,
          marginRight: sentByMe ? 10 : 0,
          marginLeft: sentByMe ? 0 : 10,
        }}>
        {moment(item.time).fromNow()}
      </Text>
    </View>
  );
};
