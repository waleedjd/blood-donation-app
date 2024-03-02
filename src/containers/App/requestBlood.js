import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
import CustomTextInput from '../../components/CustomTextInput';
import Icons from '../../assets/Icons';
import CustomButton from '../../components/CustomButton';
import bloodGroups from '../../config/Utils/bloodGroups';
import TextWithActionSheet from '../../components/TextWithActionSheet';
import cities from '../../config/Utils/cities';
import {requestDonation} from '../../redux/apis';
import {useSelector} from 'react-redux';

const RequestBlood = () => {
  const userData = useSelector(state => state.user.userData);
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [mobile, setMobile] = useState('');
  const [note, setNote] = useState('');

  return (
    <AppBackground title={'Create A Request'}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <TextWithActionSheet
          icon={Icons.pin}
          placeholder="City"
          value={city}
          onSelect={text => setCity(text)}
          dataset={cities}
        />
        <CustomTextInput
          icon={Icons.city}
          value={hospital}
          onChangeText={text => setHospital(text)}
          placeholder={'Hospital'}
        />
        <TextWithActionSheet
          icon={Icons.bloodDrop}
          placeholder="Blood Group"
          value={bloodGroup}
          onSelect={text => setBloodGroup(text)}
          dataset={bloodGroups}
        />
        <CustomTextInput
          icon={Icons.phone}
          value={mobile}
          onChangeText={text => setMobile(text)}
          placeholder={'Mobile Number'}
          keyboardType="phone-pad"
          maxLength={13}
        />
        <CustomTextInput
          icon={Icons.note}
          value={note}
          onChangeText={text => setNote(text)}
          placeholder={'Note'}
          multiline
          inputStyle={{textAlignVertical: 'top'}}
          containerStyle={{
            width: '100%',
            height: 100,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        />
        <CustomButton
          title={'Request'}
          onPress={() =>
            requestDonation(
              city,
              hospital,
              bloodGroup,
              mobile,
              note,
              userData?.phone,
              userData?.name,
            )
          }
        />
      </View>
    </AppBackground>
  );
};

export default RequestBlood;
