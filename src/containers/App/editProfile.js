import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AppBackground from '../../components/AppBackground';
// import Logo from '../../components/Logo';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import Icons from '../../assets/Icons';
import {updateProfile} from '../../redux/apis';
import TextWithActionSheet from '../../components/TextWithActionSheet';
import bloodGroups from '../../config/Utils/bloodGroups';
import cities from '../../config/Utils/cities';
import {useSelector} from 'react-redux';

const EditProfile = () => {
  const userData = useSelector(state => state.user.userData);

  const [name, setName] = useState(userData.name);
  const [bloodGroup, setBloodGroup] = useState(userData.bloodGroup);
  const [city, setCity] = useState(userData.city);
  const [address, setAddress] = useState(userData.address);

  return (
    <AppBackground title={'Edit Profile'}>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>
        {/* <Logo /> */}
        <View style={{flex: 1, marginTop: 10}}>
          <CustomTextInput
            icon={Icons.user}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <CustomTextInput
            icon={Icons.phone}
            placeholder="Phone Number"
            value={userData.phone}
            keyboardType="phone-pad"
            editable={false}
          />
          <TextWithActionSheet
            icon={Icons.bloodDrop}
            placeholder="Blood Group"
            value={bloodGroup}
            onSelect={text => setBloodGroup(text)}
            dataset={bloodGroups}
          />
          <TextWithActionSheet
            icon={Icons.pin}
            placeholder="City"
            value={city}
            onSelect={text => setCity(text)}
            dataset={cities}
          />
          <CustomTextInput
            icon={Icons.pin}
            placeholder="Address"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <CustomButton
            title={'UPDATE PROFILE'}
            onPress={() =>
              updateProfile(name, bloodGroup, city, address, userData)
            }
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default EditProfile;
